import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 right-20 z-50 w-11 h-11 rounded-full glass-strong border border-neon-purple/40 hover:neon-glow flex items-center justify-center transition-all"
    >
      <ArrowUp className="w-4 h-4 text-neon-cyan" />
    </button>
  );
}
