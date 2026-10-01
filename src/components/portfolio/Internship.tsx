import { SectionHeader } from "./About";
import { Briefcase } from "lucide-react";

const internships = [
  {
    title: "ServiceNow Virtual Internship",
    org: "SmartBridge",
    desc: "Completed training in ServiceNow Administration, Flows, Reports, ATF, and Agentic AI. Gained exposure to ServiceNow Micro-Certification and CSA exam preparation.",
    tags: ["ServiceNow Administration", "Flows", "Reports", "ATF", "Agentic AI", "CSA Preparation"],
  },
  {
    title: "Salesforce Virtual Internship",
    org: "SmartBridge",
    desc: "Completed a 2-month virtual internship in Salesforce Certified Administrator with AI Agentforce Specialization. Gained foundational exposure to Salesforce Administration and AI Agentforce.",
    tags: ["Salesforce Administration", "AI Agentforce"],
  },
];

export function Internship() {
  return (
    <section id="internship" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="03 — Internship" title="Internship" />
        <div className="grid md:grid-cols-2 gap-6">
          {internships.map((i) => (
            <article key={i.title} className="glass rounded-2xl p-7 hover:neon-border transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Briefcase className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold break-words">{i.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{i.org}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{i.desc}</p>
              <div className="flex flex-wrap gap-2">
                {i.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-full glass border border-border hover:border-neon-purple/50">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
