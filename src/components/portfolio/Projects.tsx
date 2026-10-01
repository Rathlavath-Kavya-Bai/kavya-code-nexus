import { SectionHeader } from "./About";
import { ExternalLink, Github, ShoppingBag, Leaf, Bot, Headset, Lock } from "lucide-react";
import { PROJECTS } from "@/lib/portfolio-data";

const icons: Record<string, typeof ShoppingBag> = {
  "ai-customer-support": Headset,
  "nxt-trendz": ShoppingBag,
  "zero-food-wastage": Leaf,
  "farmers-friendly": Bot,
};

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="04 — Projects" title="Things I've built" />
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => {
            const Icon = icons[p.id] ?? Bot;
            return (
              <article
                key={p.id}
                className={`relative glass rounded-2xl p-7 hover:neon-border transition-all group overflow-hidden ${
                  p.featured ? "md:col-span-2 neon-border" : ""
                }`}
              >
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-neon-purple/10 blur-3xl group-hover:bg-neon-purple/20 transition-all" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-neon-purple/20 text-neon-cyan uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 break-words">{p.title}</h3>
                  {p.role && (
                    <p className="text-xs font-mono text-neon-cyan mb-2">{p.role}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-secondary/50 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {p.githubUrl ? (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${p.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-border hover:border-neon-purple/60 hover:text-neon-cyan transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
                      >
                        <Github className="w-3.5 h-3.5" /> View on GitHub
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-border text-muted-foreground/70 cursor-not-allowed"
                        title="Repository link not published yet"
                      >
                        <Lock className="w-3.5 h-3.5" /> Repository unavailable
                      </span>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo of ${p.title}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-border hover:border-neon-purple/60 hover:text-neon-cyan transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
