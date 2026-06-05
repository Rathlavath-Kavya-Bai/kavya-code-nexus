import { SectionHeader } from "./About";
import { ExternalLink, Github, ShoppingBag, Search, Sprout, Bot, Briefcase } from "lucide-react";

const projects = [
  {
    icon: ShoppingBag,
    title: "Nxt Trendz E-Commerce Application",
    description:
      "A modern e-commerce platform with product search, filtering, sorting, authentication and secure JWT login.",
    tech: ["React.js", "JavaScript", "Bootstrap", "CSS", "REST APIs", "JWT"],
  },
  {
    icon: Search,
    title: "Wikipedia Search Application",
    description:
      "Responsive search platform that fetches and displays Wikipedia results in real time via API integration.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "REST APIs"],
  },
  {
    icon: Sprout,
    title: "Green Farm Coach",
    description:
      "Farmer-support application providing crop prediction, weather updates and fertilizer recommendations.",
    tech: ["HTML", "CSS", "Python", "AI Concepts"],
  },
  {
    icon: Bot,
    title: "Farmer's Friendly (Startup)",
    description:
      "AI-powered agriculture platform: crop recommendations, weather alerts, livestock guidance, government schemes, market prices, expert support and a chatbot.",
    tech: ["AI", "Machine Learning", "Python", "React", "APIs"],
    featured: true,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="03 — Projects" title="Things I've built" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className={`relative glass rounded-2xl p-7 hover:neon-border transition-all group overflow-hidden ${
                p.featured ? "md:col-span-2 neon-border" : ""
              }`}
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-neon-purple/10 blur-3xl group-hover:bg-neon-purple/20 transition-all" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <p.icon className="w-6 h-6 text-white" />
                  </div>
                  {p.featured && (
                    <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-neon-purple/20 text-neon-cyan uppercase tracking-wider">
                      Startup
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-secondary/50 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer">
                    <Github className="w-3.5 h-3.5" /> Source
                  </span>
                  <span className="inline-flex items-center gap-1.5 hover:text-foreground cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Internship */}
        <div id="internship" className="mt-10 glass rounded-2xl p-7 hover:neon-border transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">ServiceNow Virtual Internship</h3>
              <p className="text-xs text-muted-foreground font-mono">Training & Certification</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["ServiceNow Administration", "Flow Automation", "Reporting", "Agentic AI", "ATF Testing", "CSA Preparation"].map((t) => (
              <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-full glass border border-border hover:border-neon-purple/50">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
