import { SectionHeader } from "./About";
import { Trophy, Users, Sprout, Target, Award } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "3rd Prize — RTIH", desc: "Ratan Tata Innovation Hub Startup Idea Presentation" },
  { icon: Users, title: "Coding Club Coordinator", desc: "Leading peer programming sessions and events" },
  { icon: Sprout, title: "Founder — Farmer's Friendly", desc: "AI-powered agriculture startup idea" },
  { icon: Target, title: "Hackathon Participant", desc: "Active across multiple technical events" },
];

const certs = [
  "Introduction to Python — Infosys Springboard",
  "Database Management Systems — NPTEL",
  "JavaScript Fundamentals — Simplilearn",
  "HTML for Beginners — Udemy",
  "National AgriTech Hackathon",
  "X-Horizon Participation Certificate",
  "ServiceNow Micro-Certification",
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="04 — Achievements" title="Wins and recognition" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {achievements.map((a) => (
            <div key={a.title} className="glass rounded-2xl p-6 hover:neon-border hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                <a.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{a.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Certifications</h3>
          <p className="text-sm text-muted-foreground">Continuous learning across technologies.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certs.map((c) => (
            <div key={c} className="glass rounded-xl p-4 flex items-start gap-3 hover:neon-border transition-all">
              <Award className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
              <span className="text-sm">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
