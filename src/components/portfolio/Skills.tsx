import { SectionHeader } from "./About";
import { Layout, Server, Database, Wrench, Heart } from "lucide-react";

const groups = [
  { icon: Layout, title: "Frontend", items: ["HTML5", "CSS3", "Bootstrap", "JavaScript (Basics)"] },
  { icon: Server, title: "Backend", items: ["Java", "Python (Basics)"] },
  { icon: Database, title: "Database & APIs", items: ["SQL"] },
  { icon: Wrench, title: "Tools", items: ["Git", "GitHub", "VS Code"] },
  { icon: Heart, title: "Soft Skills", items: ["Problem Solving", "Teamwork", "Leadership", "Communication", "Fast Learning"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="02 — Skills" title="Tools of the craft" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div
              key={g.title}
              className="glass rounded-2xl p-6 hover:neon-border transition-all hover:-translate-y-1 duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                  <g.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="px-3 py-1.5 text-xs font-mono rounded-full glass border border-border hover:border-neon-purple/50 hover:text-neon-cyan transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
