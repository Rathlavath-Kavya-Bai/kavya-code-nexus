import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { matchRole } from "@/lib/match.functions";
import { PROJECTS } from "@/lib/portfolio-data";
import { SectionHeader } from "./About";

const samples = [
  { role: "Junior Java Developer", description: "Junior Java Developer: Java fundamentals, SQL, problem solving, Git and teamwork. Seeking an early-career developer who can learn quickly and contribute to application development." },
  { role: "Frontend React Intern", description: "Frontend React Intern: build web interfaces with React, HTML, CSS and JavaScript, integrate REST APIs, and collaborate using Git. E-commerce project experience is a plus." },
  { role: "Full Stack Developer", description: "Full Stack Developer: develop web applications with frontend interfaces, backend logic, SQL databases, REST APIs and authentication. Looking for practical projects, teamwork and problem solving." },
  { role: "AI / ML Associate", description: "AI / ML Associate: Python fundamentals, AI-powered applications, machine learning concepts, automation and analytical problem solving. Interested in applied AI projects with real-world impact." },
];
type Match = { summary: string; projects: { id: string; reason: string }[]; skills: { name: string; reason: string }[] };

export function RoleMatcher() {
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Match | null>(null);
  const lock = useRef(false);
  const run = useServerFn(matchRole);
  return <section id="match" className="relative py-24 px-6 scroll-mt-24">
    <div className="max-w-6xl mx-auto">
      <SectionHeader eyebrow="For Recruiters — AI Match" title="Find the right fit" />
      <form onSubmit={async event => {
        event.preventDefault();
        if (lock.current) return;
        if (description.trim().length < 10) { setError("Enter a role or job description with at least 10 characters."); return; }
        lock.current = true; setBusy(true); setError(""); setResult(null);
        try { const response = await run({ data: { description } }); if (response.ok) setResult(response.result); else setError(response.error); }
        catch { setError("AI matching could not finish. Please try again."); }
        finally { lock.current = false; setBusy(false); }
      }} className="space-y-5">
        <div role="group" aria-label="Sample roles" className="flex flex-wrap gap-3">
          {samples.map(sample => <Button key={sample.role} type="button" variant="outline" disabled={busy}
            aria-pressed={description === sample.description}
            className={description === sample.description ? "neon-border bg-accent text-accent-foreground" : "glass hover:neon-border"}
            onClick={() => { setDescription(sample.description); setError(""); setResult(null); }}>
            <Sparkles className="size-4" />{sample.role}
          </Button>)}
        </div>
        <label htmlFor="role-description" className="block text-sm font-medium">Role or job description</label>
        <textarea id="role-description" rows={5} maxLength={5000} value={description} disabled={busy}
          onChange={event => { setDescription(event.target.value); setError(""); setResult(null); }}
          className="w-full rounded-lg border border-border bg-background p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          aria-invalid={!!error} />
        <Button type="submit" disabled={busy} className="neon-border">{busy ? <Loader2 className="animate-spin" /> : <Sparkles />}{busy ? "Matching…" : "Find Matches"}</Button>
        {busy && <p role="status" className="text-muted-foreground text-sm">Finding relevant projects and skills…</p>}
        {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
      </form>
      {result && <div className="mt-10 space-y-6" aria-live="polite">
        <p className="text-muted-foreground">{result.summary}</p>
        <h3 className="text-xl font-semibold">Relevant projects</h3>
        <div className="grid md:grid-cols-3 gap-4">{result.projects.map(item => <article key={item.id} className="glass rounded-lg p-5">
          <h4 className="font-semibold">{PROJECTS.find(project => project.id === item.id)?.title}</h4>
          <p className="text-muted-foreground text-sm mt-3">{item.reason}</p>
          <Button asChild variant="ghost" className="mt-3"><a href="#projects">View project<ArrowRight /></a></Button>
        </article>)}</div>
        <h3 className="text-xl font-semibold">Relevant skills</h3>
        <div className="grid md:grid-cols-2 gap-4">{result.skills.map(item => <article key={item.name} className="border-b border-border pb-4"><h4 className="font-semibold">{item.name}</h4><p className="text-sm text-muted-foreground mt-2">{item.reason}</p></article>)}</div>
      </div>}
    </div>
  </section>;
}