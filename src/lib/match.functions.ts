import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PROJECTS } from "./portfolio-data";
import { SKILL_GROUPS } from "./skills-data";

const resultSchema = z.object({
  summary: z.string(),
  projects: z.array(z.object({ id: z.string(), reason: z.string() })),
  skills: z.array(z.object({ name: z.string(), reason: z.string() })),
});

export type MatchResult = z.infer<typeof resultSchema>;

export const matchRole = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ text: z.string().trim().min(10).max(4000) }).parse(d))
  .handler(async ({ data }): Promise<{ ok: true; result: MatchResult } | { ok: false; error: string }> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false, error: "The AI matcher isn't configured yet." };

    const allSkills = SKILL_GROUPS.flatMap((g) => g.items);
    const context = {
      projects: PROJECTS.map((p) => ({ id: p.id, title: p.title, description: p.description, technologies: p.technologies })),
      skills: allSkills,
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions:
          "You match a candidate's portfolio to a role. Use ONLY the provided projects and skills; never invent any. Pick up to 3 most relevant projects (by id) and up to 6 skills (exact names). Keep each reason to one short sentence. Summary: 1-2 sentences, honest about gaps.",
        input: `Portfolio:\n${JSON.stringify(context)}\n\nRole / job description:\n${data.text}`,
        text: {
          format: {
            type: "json_schema",
            name: "match",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["summary", "projects", "skills"],
              properties: {
                summary: { type: "string" },
                projects: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["id", "reason"],
                    properties: { id: { type: "string", enum: PROJECTS.map((p) => p.id) }, reason: { type: "string" } },
                  },
                },
                skills: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["name", "reason"],
                    properties: { name: { type: "string", enum: allSkills }, reason: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      }),
    });

    if (!res.ok || !res.body) {
      const body = await res.text().catch(() => "");
      console.error("AI gateway error", res.status, body);
      if (res.status === 429) return { ok: false, error: "Too many requests right now. Please try again in a minute." };
      if (res.status === 402) return { ok: false, error: "The AI matcher is temporarily unavailable." };
      return { ok: false, error: "Couldn't analyze the role. Please try again." };
    }

    // Consume the SSE stream and accumulate output text
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let text = "";
    let failed = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let idx;
      while ((idx = buf.indexOf("\n\n")) !== -1) {
        const frame = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        for (const line of frame.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const ev = JSON.parse(payload);
            if (ev.type === "response.output_text.delta") text += ev.delta ?? "";
            else if (ev.type === "response.refusal.delta" || ev.type === "response.failed" || ev.type === "error")
              failed = ev.type;
          } catch {
            /* ignore partial */
          }
        }
      }
    }
    if (failed || !text) return { ok: false, error: "The AI couldn't produce a match for this input." };
    try {
      return { ok: true, result: resultSchema.parse(JSON.parse(text)) };
    } catch {
      return { ok: false, error: "The AI returned an unexpected answer. Please try again." };
    }
  });
