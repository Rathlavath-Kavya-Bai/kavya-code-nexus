import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const matchRole = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ description: z.string().trim().min(10).max(5000) }).parse(data))
  .handler(async ({ data }) => {
    const { runMatch } = await import("./ai/matcher.server");
    return runMatch(data.description);
  });