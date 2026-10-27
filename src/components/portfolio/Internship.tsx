import { useRef } from "react";
import { SectionHeader } from "./About";
import { Briefcase, Eye, Upload, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioAssets } from "@/lib/portfolio-assets";

const internships = [
  {
    id: "servicenow",
    title: "ServiceNow Virtual Internship",
    org: "SmartBridge",
    desc: "Completed training in ServiceNow Administration, Flows, Reports, ATF, and Agentic AI. Gained exposure to ServiceNow Micro-Certification and CSA exam preparation.",
    tags: ["ServiceNow Administration", "Flows", "Reports", "ATF", "Agentic AI", "CSA Preparation"],
  },
  {
    id: "salesforce",
    title: "Salesforce Virtual Internship",
    org: "SmartBridge",
    desc: "Completed a 2-month virtual internship in Salesforce Certified Administrator with AI Agentforce Specialization. Gained foundational exposure to Salesforce Administration and AI Agentforce.",
    tags: ["Salesforce Administration", "AI Agentforce"],
  },
];

export function Internship() {
  return (
    <section id="internship" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="03 — Internship" title="Internship" />
        <div className="grid md:grid-cols-2 gap-6">
          {internships.map((i) => (
            <article key={i.id} className="glass rounded-2xl p-7 hover:neon-border transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Briefcase className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold break-words">{i.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{i.org}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{i.desc}</p>
              <div className="flex flex-wrap gap-2">
                {i.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-full glass border border-border hover:border-neon-purple/50">
                    {t}
                  </span>
                ))}
              </div>
              <InternshipCertificate internshipId={i.id} title={i.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InternshipCertificate({ internshipId, title }: { internshipId: string; title: string }) {
  const { assets, isOwner, uploadingKey, upload } = usePortfolioAssets();
  const inputRef = useRef<HTMLInputElement>(null);
  const key = `internship-${internshipId}`;
  const source = assets[key];
  const busy = uploadingKey === key;

  return (
    <div className="mt-4 pt-4 border-t border-border/60 flex items-start gap-3">
      <FileText className={`w-5 h-5 flex-shrink-0 mt-0.5 ${source ? "text-neon-cyan" : "text-muted-foreground"}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground mb-1">Internship completion certificate</div>
        {source ? (
          <Button variant="link" asChild className="text-[10px] font-mono text-neon-cyan h-auto p-0">
            <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`View Internship Certificate — ${title}`}>
              <Eye className="w-3 h-3" /> View Certificate
            </a>
          </Button>
        ) : (
          <>
            <Button variant="link" disabled className="text-[10px] font-mono h-auto p-0" aria-label={`View Internship Certificate — ${title}`}>
              <Eye />View Certificate
            </Button>
            <p className="text-[11px] text-muted-foreground mt-1">Certificate not uploaded yet</p>
          </>
        )}
        {isOwner && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-neon-purple/60"
            >
              {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />} {source ? "Replace" : "Upload"}
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/png,image/jpeg,image/webp"
              className="hidden"
              aria-label={`Upload internship certificate for ${title}`}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(key, f);
                e.target.value = "";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
