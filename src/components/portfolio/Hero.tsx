import { useEffect, useRef, useState } from "react";
import { Mail, Briefcase, ArrowRight, Sparkles, Upload, FileText } from "lucide-react";
import { usePortfolioAssets } from "@/lib/portfolio-assets";

const roles = [
  "Software Developer",
  "AI Enthusiast",
  "Startup Innovator",
  "Problem Solver",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const HOLD_MS = 1800;

function TypingText() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  const current = roles[index];

  useEffect(() => {
    let delay = TYPE_SPEED;
    if (phase === "holding") delay = HOLD_MS;
    else if (phase === "deleting") delay = DELETE_SPEED;

    const timer = setTimeout(() => {
      if (phase === "typing") {
        if (count < current.length) setCount(count + 1);
        else setPhase("holding");
      } else if (phase === "holding") {
        setPhase("deleting");
      } else {
        if (count > 0) setCount(count - 1);
        else {
          setIndex((i) => (i + 1) % roles.length);
          setPhase("typing");
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, count, current]);

  return (
    <span className="text-gradient" aria-label={current}>
      {current.slice(0, count)}
      <span className="animate-blink text-neon-purple" aria-hidden="true">|</span>
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 ? "oklch(0.7 0.22 230)" : "oklch(0.65 0.28 295)",
            boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
            color: i % 2 ? "oklch(0.7 0.22 230)" : "oklch(0.65 0.28 295)",
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <Particles />

      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-neon-purple/20 blur-3xl animate-float" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-neon-blue/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-6 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono mb-8">
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="text-muted-foreground">Available for opportunities</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Rathlavath <br />
          <span className="text-gradient">Kavya Bai</span>
        </h1>

        <div className="h-8 md:h-10 text-lg sm:text-xl md:text-2xl font-mono mb-6">
          <TypingText />
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 italic">
          "Turning Ideas into Meaningful Technology Solutions."
        </p>

        <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          A passionate Computer Science Engineering student with hands-on experience in modern web
          development, AI-driven solutions and innovative technology — dedicated to building
          impactful applications that solve real-world problems.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white animate-glow-pulse focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            style={{ background: "var(--gradient-primary)" }}
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <ResumeButtons />

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium glass hover:neon-border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </a>
          <a
            href="#contact"
            onClick={() => window.dispatchEvent(new CustomEvent("portfolio:hire"))}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium neon-border hover:neon-glow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          >
            <Briefcase className="w-4 h-4" /> Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}

const btn =
  "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium glass hover:neon-border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan";

function ResumeButtons() {
  const { assets, isOwner, uploadingKey, upload } = usePortfolioAssets();
  const inputRef = useRef<HTMLInputElement>(null);
  const resume = assets.resume;
  const busy = uploadingKey === "resume";

  return (
    <>
      {resume ? (
        <a href={resume.url} target="_blank" rel="noopener noreferrer" className={btn}>
          <FileText className="w-4 h-4" /> Resume
        </a>
      ) : isOwner ? (
        <button type="button" onClick={() => inputRef.current?.click()} className={btn}>
          <Upload className="w-4 h-4" /> Add Resume
        </button>
      ) : null}
      {isOwner && (
        <>
          {resume && <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium neon-border hover:neon-glow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          >
            <Upload className="w-4 h-4" /> {busy ? "Uploading…" : "Replace Resume"}
          </button>}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            aria-label="Upload resume file"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload("resume", f);
              e.target.value = "";
            }}
          />
        </>
      )}
    </>
  );
}
