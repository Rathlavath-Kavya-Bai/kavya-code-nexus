import { Settings, Check } from "lucide-react";
import { useEditMode } from "@/lib/local-files";

export function EditToggle() {
  const { enabled, toggle } = useEditMode();
  return (
    <button
      onClick={toggle}
      title={enabled ? "Exit edit mode" : "Owner edit mode"}
      className={`fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center glass-strong border transition-all ${
        enabled ? "border-neon-purple/70 neon-glow" : "border-border hover:border-neon-purple/50"
      }`}
    >
      {enabled ? (
        <Check className="w-4 h-4 text-neon-cyan" />
      ) : (
        <Settings className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}
