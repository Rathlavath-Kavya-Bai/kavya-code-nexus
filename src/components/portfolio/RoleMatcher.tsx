import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, FolderGit2, Wrench, AlertCircle } from "lucide-react";
import { SectionHeader } from "./About";
import { matchRole, type MatchResult } from "@/lib/match.functions";
import { PROJECTS } from "@/lib/portfolio-data";

export function RoleMatcher() {
  const run = useServerFn(matchRole);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (text.trim().length < 10) {
      setError("Please enter a role or job description (at least 10 characters).");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await run({ data: { text } });
      if (res.ok) setResult(res.result);
      else setError(res.error);
    } catch {
      setError("Couldn't analyze the role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="match" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="For Recruiters — AI Match" title="Is Kavya a fit for your role?" />
        <form onSubmit={submit} className="glass-strong rounded-2xl p-5 sm:p-7 space-y-4">
          <label htmlFor="role-text" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Role or job description
          </label>
          <textarea
            id="role-text"
            rows={5}
            maxLength={4000}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Junior Software Developer — Java, SQL, Git, building customer-facing web apps…"
            className="w-full bg-input/40 border-2 border-muted-foreground/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-purple/70 focus:ring-1 focus:ring-neon-purple/40 transition-all"
          />
          {error && (
            <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white disabled:opacity-60"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Analyzing…" : "Find relevant work"}
          </button>
        </form>

        {result && (
          <div className="mt-6 space-y-5 animate-fade-in">
            <p className="glass rounded-2xl p-5 text-sm leading-relaxed">{result.summary}</p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="glass rounded-2xl p-5">
                <h3 className="flex items-center gap-2 font-semibold mb-3">
                  <FolderGit2 className="w-4 h-4 text-neon-cyan" /> Relevant projects
                </h3>
                {result.projects.length === 0 && <p className="text-sm text-muted-foreground">No close project match.</p>}
                <ul className="space-y-3">
                  {result.projects.map((p) => {
                    const proj = PROJECTS.find((x) => x.id === p.id);
                    if (!proj) return null;
                    return (
                      <li key={p.id}>
                        <a href="#projects" className="text-sm font-medium hover:text-neon-cyan">{proj.title}</a>
                        <p className="text-xs text-muted-foreground">{p.reason}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="glass rounded-2xl p-5">
                <h3 className="flex items-center gap-2 font-semibold mb-3">
                  <Wrench className="w-4 h-4 text-neon-cyan" /> Matching skills
                </h3>
                {result.skills.length === 0 && <p className="text-sm text-muted-foreground">No direct skill match.</p>}
                <ul className="space-y-3">
                  {result.skills.map((s) => (
                    <li key={s.name}>
                      <span className="px-2.5 py-1 text-xs font-mono rounded-full glass border border-border">{s.name}</span>
                      <p className="text-xs text-muted-foreground mt-1">{s.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
