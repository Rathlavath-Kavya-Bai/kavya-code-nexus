import { SectionHeader } from "./About";
import { GraduationCap, Target } from "lucide-react";

const timeline = [
  {
    school: "Mohan Babu University",
    degree: "B.Tech, Computer Science Engineering",
    period: "2023 – 2027",
    score: "CGPA: 8.81 / 10",
  },
  {
    school: "Rao's Junior College for Girls",
    degree: "Intermediate (MPC)",
    period: "2021 – 2023",
    score: "Percentage: 93%",
  },
  {
    school: "ZP High School, Giddalur",
    degree: "SSC",
    period: "—",
    score: "Percentage: 96%",
  },
];

export function Education() {
  return (
    <section id="education" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="06 — Education" title="Academic journey" />

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-neon-purple via-neon-blue to-transparent" />
          {timeline.map((t, i) => (
            <div key={t.school} className="relative mb-8 last:mb-0">
              <div className="absolute -left-[26px] md:-left-[34px] top-2 w-4 h-4 rounded-full bg-background border-2 border-neon-purple animate-glow-pulse" />
              <div className="glass rounded-2xl p-6 hover:neon-border transition-all">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-neon-cyan mt-1" />
                  <div className="flex-1">
                    <div className="text-xs font-mono text-muted-foreground">{t.period}</div>
                    <h3 className="text-lg font-semibold mt-1">{t.school}</h3>
                    <p className="text-sm text-muted-foreground">{t.degree}</p>
                    <div className="mt-2 inline-block px-3 py-1 text-xs font-mono rounded-full bg-neon-purple/15 text-neon-cyan">
                      {t.score}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 glass-strong neon-border rounded-2xl p-8 flex items-start gap-4">
          <Target className="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">Career Objective</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seeking opportunities as a Software Developer where I can apply my programming, web
              development, problem-solving, and emerging AI skills, contribute to real-world
              projects, and continue growing as a technology professional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
