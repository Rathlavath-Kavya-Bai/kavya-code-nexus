import { useEffect, useState } from "react";
import { Download, Mail, Briefcase, ArrowRight, Sparkles } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "React Developer",
  "AI Enthusiast",
  "Startup Innovator",
  "Problem Solver",
];

function TypingText() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = roles[i];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDel(false);
          setI((i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-gradient">
      {text}
      <span className="animate-blink text-neon-purple">|</span>
    </span>
  );
}

function Particles() {
  const dots = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Particles />

      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-neon-purple/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-neon-blue/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono mb-8">
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="text-muted-foreground">Available for opportunities</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Rathlavath <br />
          <span className="text-gradient">Kavya Bai</span>
        </h1>

        <div className="h-8 md:h-10 text-xl md:text-2xl font-mono mb-6">
          <TypingText />
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 italic">
          "Turning Ideas into Meaningful Technology Solutions."
        </p>

        <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Passionate Computer Science Engineering student with expertise in modern web development,
          AI-driven solutions, and innovative technology. Dedicated to building impactful
          applications that solve real-world problems.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white animate-glow-pulse"
            style={{ background: "var(--gradient-primary)" }}
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium glass hover:neon-border transition-all"
          >
            <Download className="w-4 h-4" /> Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium glass hover:neon-border transition-all"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium neon-border hover:neon-glow transition-all"
          >
            <Briefcase className="w-4 h-4" /> Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}
