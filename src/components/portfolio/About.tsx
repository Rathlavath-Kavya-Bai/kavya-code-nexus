import { useRef } from "react";
import { GraduationCap, Award, Code2, Sparkles, Rocket, Users, Trophy, Brain, Camera, Loader2, UserRound } from "lucide-react";
import { usePortfolioAssets } from "@/lib/portfolio-assets";

const stats = [
  { icon: GraduationCap, label: "B.Tech CSE Student", value: "Mohan Babu University" },
  { icon: Award, label: "CGPA", value: "8.81 / 10" },
  { icon: Sparkles, label: "Graduation", value: "2027" },
  { icon: Code2, label: "Role", value: "Software Developer" },
  { icon: Brain, label: "Focus", value: "AI Enthusiast" },
  { icon: Rocket, label: "Identity", value: "Startup Innovator" },
  { icon: Users, label: "Position", value: "Coding Club Coordinator" },
  { icon: Trophy, label: "Recognition", value: "RTIH Prize Winner" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="01 — About" title="Building tech with purpose" />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Hi, I'm <span className="text-foreground font-semibold">Rathlavath Kavya Bai</span>,
              a Computer Science and Engineering student with hands-on experience in software
              development, web technologies, AI-powered solutions, and platform-based applications.
            </p>
            <p>
              I am interested in building practical solutions, solving real-world problems, and
              continuously learning new technologies.
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

          <div className="lg:col-span-2 space-y-5">
            <ProfilePhoto />
            <div className="grid grid-cols-2 gap-3">
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
      </div>
    </section>
  );
}

function ProfilePhoto() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { assets, isOwner, uploadingKey, upload } = usePortfolioAssets();
  const photo = assets.profilePhoto;
  const busy = uploadingKey === "profilePhoto";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-72 aspect-square rounded-full neon-border overflow-hidden glass-strong">
        {photo ? (
          <img src={photo.url} alt="Rathlavath Kavya Bai" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center" aria-label="Profile photo not added">
            <UserRound className="w-24 h-24 text-muted-foreground/50" />
          </div>
        )}
        {busy && <div className="absolute inset-0 glass-strong flex items-center justify-center"><Loader2 className="w-7 h-7 animate-spin text-neon-cyan" /></div>}
      </div>
      {isOwner && (
        <>
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium neon-border hover:neon-glow disabled:opacity-60">
            <Camera className="w-4 h-4" /> {photo ? "Update Photo" : "Add Photo"}
          </button>
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" aria-label={photo ? "Update profile photo" : "Add profile photo"} onChange={(e) => { const file = e.target.files?.[0]; if (file) void upload("profilePhoto", file); e.target.value = ""; }} />
        </>
      )}
    </div>
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
