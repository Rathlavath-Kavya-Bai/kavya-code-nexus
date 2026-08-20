import { useEffect } from "react";
import { X, ExternalLink, Download } from "lucide-react";

export type ViewerSource = {
  title: string;
  url: string;
  isImage: boolean;
  fileName: string;
};

export function CertificateViewer({
  source,
  onClose,
}: {
  source: ViewerSource | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!source) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [source, onClose]);

  if (!source) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${source.title} certificate`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] glass-strong rounded-2xl overflow-hidden flex flex-col neon-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold truncate">{source.title}</h3>
          <div className="flex items-center gap-2">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open certificate in a new tab"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:neon-border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={source.url}
              download={source.fileName}
              aria-label="Download certificate"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:neon-border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close certificate viewer"
              autoFocus
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-destructive/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-black/40 overflow-auto flex items-center justify-center">
          {source.isImage ? (
            <img
              src={source.url}
              alt={`${source.title} certificate`}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <iframe src={source.url} title={`${source.title} certificate`} className="w-full h-full" />
          )}
        </div>
      </div>
    </div>
  );
}
