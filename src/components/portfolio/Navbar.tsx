import { useEffect, useState } from "react";
import { Code2, Sun, Moon, FileText, Linkedin, Github } from "lucide-react";
import { usePortfolioAssets } from "@/lib/portfolio-assets";
import { GITHUB_PROFILE, LINKEDIN_PROFILE } from "@/lib/portfolio-data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#internship", label: "Internship" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certifications" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio.theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
      setLight(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("portfolio.theme", next ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <Code2 className="w-6 h-6 text-neon-purple" />
          <span className="text-gradient">Kavya.dev</span>
        </a>
        <ul className="hidden lg:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-neon-purple to-neon-blue group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href={LINKEDIN_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full glass flex items-center justify-center hover:neon-border hover:text-neon-cyan transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full glass flex items-center justify-center hover:neon-border hover:text-neon-cyan transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <ResumeNavButton />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full glass flex items-center justify-center hover:neon-border transition-all"
          >
            {light ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-6 h-0.5 bg-foreground mb-1.5" />
          <div className="w-6 h-0.5 bg-foreground mb-1.5" />
          <div className="w-4 h-0.5 bg-foreground" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-strong mt-3 mx-6 rounded-xl p-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function ResumeNavButton() {
  const { assets } = usePortfolioAssets();
  const resume = assets.resume;
  if (resume) {
    return (
      <a
        href={resume.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium neon-border hover:neon-glow transition-all"
      >
        <FileText className="w-3.5 h-3.5" /> Resume
      </a>
    );
  }
  return null;
}
