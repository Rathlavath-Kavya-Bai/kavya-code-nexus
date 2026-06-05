import { GraduationCap, Award, Code2, Sparkles, Rocket, Users, Trophy, Brain } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "B.Tech CSE Student", value: "Mohan Babu University" },
  { icon: Award, label: "CGPA", value: "8.9 / 10" },
  { icon: Sparkles, label: "Graduation", value: "2027" },
  { icon: Code2, label: "Role", value: "Full Stack Developer" },
  { icon: Brain, label: "Focus", value: "AI Enthusiast" },
  { icon: Rocket, label: "Identity", value: "Startup Innovator" },
  { icon: Users, label: "Position", value: "Coding Club Coordinator" },
  { icon: Trophy, label: "Recognition", value: "RTIH Prize Winner" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="01 — About" title="Building tech with purpose" />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Hi, I'm <span className="text-foreground font-semibold">Rathlavath Kavya Bai</span>,
              a Computer Science Engineering student from Andhra Pradesh with a strong passion for
              software development, artificial intelligence, and innovation.
            </p>
            <p>
              I enjoy building modern web applications that solve real-world problems. My interests
              include Full Stack Development, AI-powered solutions, and technology for social impact.
            </p>
            <p>
              I am the creator of{" "}
              <span className="text-gradient font-semibold">Farmer's Friendly</span>, a startup idea
              focused on helping farmers through technology — crop guidance, weather updates,
              government schemes, livestock support, and AI-powered recommendations.
            </p>
            <p>
              I continuously improve my skills through projects, internships, certifications, and
              hands-on development experience.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl p-4 hover:neon-border transition-all group"
              >
                <s.icon className="w-5 h-5 text-neon-purple mb-2 group-hover:text-neon-cyan transition-colors" />
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                  {s.label}
                </div>
                <div className="text-sm font-semibold text-foreground mt-1">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14">
      <div className="text-xs font-mono text-neon-cyan tracking-widest mb-3">{eyebrow}</div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        <span className="text-gradient">{title}</span>
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-neon-purple to-transparent" />
    </div>
  );
}
