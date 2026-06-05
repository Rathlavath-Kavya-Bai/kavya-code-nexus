import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-1.5">
          © 2027 Rathlavath Kavya Bai. Built with{" "}
          <Heart className="w-3.5 h-3.5 text-neon-purple fill-current" />, Innovation, and Code.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Rathlavth-Kavya-Bai" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/rathlavath-kavya-bai-2a534a376" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:kavyabairathlavth@gmail.com" className="hover:text-neon-cyan transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
