import { Settings, LogOut, Loader2 } from "lucide-react";
import { usePortfolioAssets } from "@/lib/portfolio-assets";

export function EditToggle() {
  const { user, isOwner, loading, error, signIn, signOut } = usePortfolioAssets();
  return (
    <>
    <button
      onClick={() => void (user ? signOut() : signIn())}
      title={user ? "Sign out of owner mode" : "Owner sign in"}
      aria-label={user ? "Sign out of owner mode" : "Owner sign in"}
      className={`fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center glass-strong border transition-all ${
        isOwner ? "border-neon-purple/70 neon-glow" : "border-border hover:border-neon-purple/50"
      }`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-neon-cyan" />
      ) : user ? (
        <LogOut className="w-4 h-4 text-neon-cyan" />
      ) : (
        <Settings className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
    {error && <div role="alert" className="fixed bottom-20 right-5 z-50 max-w-xs glass-strong border border-destructive/50 rounded-xl px-4 py-3 text-xs text-destructive">{error}</div>}
    </>
  );
}
