import { useRef, useState } from "react";
import { SectionHeader } from "./About";
import { Trophy, Users, Sprout, Target, Award, Upload, Eye, Trash2, Download } from "lucide-react";
import { useEditMode, useLocalFile } from "@/lib/local-files";
import { CERTIFICATES, isImageUrl, type Certificate } from "@/lib/portfolio-data";
import { CertificateViewer, type ViewerSource } from "./CertificateViewer";

const achievements = [
  {
    icon: Trophy,
    title: "3rd Prize — RTIH",
    desc: "Awarded third place at the Ratan Tata Innovation Hub startup idea presentation.",
    highlight: true,
  },
  {
    icon: Users,
    title: "Coding Club Coordinator",
    desc: "Coordinate peer programming sessions and technical events on campus.",
  },
  {
    icon: Sprout,
    title: "Founder — Farmer's Friendly",
    desc: "Founded an AI-powered agriculture platform supporting farmers with data-driven guidance.",
  },
  {
    icon: Target,
    title: "Hackathon Participant",
    desc: "Active participant across multiple technical hackathons and innovation events.",
  },
];

export function Achievements() {
  const [viewer, setViewer] = useState<ViewerSource | null>(null);

  return (
    <section id="achievements" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="04 — Achievements" title="Wins and recognition" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`glass rounded-2xl p-6 hover:-translate-y-1 transition-all ${
                a.highlight ? "neon-border sm:col-span-2 lg:col-span-1" : "hover:neon-border"
              }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                <a.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              {a.highlight && (
                <span className="inline-block mb-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-cyan uppercase tracking-wider">
                  Top achievement
                </span>
              )}
              <h3 className="font-semibold mb-1">{a.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <div id="certificates" className="mb-6 scroll-mt-24">
          <h3 className="text-2xl font-bold mb-2">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            Click a certificate to view it. Owner edit mode (bottom-right) lets you attach files instantly.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CERTIFICATES.map((c) => (
            <CertCard key={c.id} cert={c} onOpen={setViewer} />
          ))}
        </div>
      </div>

      <CertificateViewer source={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}

function CertCard({ cert, onOpen }: { cert: Certificate; onOpen: (s: ViewerSource) => void }) {
  const { enabled } = useEditMode();
  const { file, save, clear } = useLocalFile(`portfolio.cert.${cert.id}`);
  const inputRef = useRef<HTMLInputElement>(null);

  const label = `${cert.title} — ${cert.issuer}`;
  const source: ViewerSource | null = cert.fileUrl
    ? {
        title: label,
        url: cert.fileUrl,
        isImage: isImageUrl(cert.fileUrl),
        fileName: cert.fileUrl.split("/").pop() || `${cert.id}.pdf`,
      }
    : file
      ? {
          title: label,
          url: file.dataUrl,
          isImage: file.type.startsWith("image/"),
          fileName: file.name,
        }
      : null;

  const open = () => source && onOpen(source);

  return (
    <div
      className={`glass rounded-xl p-4 flex items-start gap-3 transition-all ${
        source ? "hover:neon-border cursor-pointer" : "hover:border-border/80"
      }`}
      role={source ? "button" : undefined}
      tabIndex={source ? 0 : undefined}
      aria-label={source ? `View certificate: ${label}` : undefined}
      onClick={open}
      onKeyDown={(e) => {
        if (source && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          open();
        }
      }}
    >
      <Award className={`w-5 h-5 flex-shrink-0 mt-0.5 ${source ? "text-neon-cyan" : "text-muted-foreground"}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="text-sm">{cert.title}</div>
        <div className="text-[11px] text-muted-foreground">{cert.issuer}</div>
        {source && (
          <div className="text-[10px] font-mono text-neon-cyan mt-1 flex items-center gap-1.5">
            <Eye className="w-3 h-3" /> View Certificate
          </div>
        )}
        {!source && !enabled && (
          <div className="text-[10px] font-mono text-muted-foreground mt-1">Certificate pending upload</div>
        )}
        {enabled && (
          <div className="mt-2 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-neon-purple/60"
            >
              <Upload className="w-3 h-3" /> {file ? "Replace" : "Upload"}
            </button>
            {file && (
              <>
                <a
                  href={file.dataUrl}
                  download={file.name}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-neon-purple/60"
                >
                  <Download className="w-3 h-3" /> Download
                </a>
                <button
                  onClick={clear}
                  aria-label={`Remove uploaded file for ${cert.title}`}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-destructive/60"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/png,image/jpeg,image/webp"
              className="hidden"
              aria-label={`Upload certificate for ${cert.title}`}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) save(f);
                e.target.value = "";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
