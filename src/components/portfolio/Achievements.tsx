import { useRef } from "react";
import { SectionHeader } from "./About";
import { Trophy, Users, Sprout, Target, Award, Upload, Eye, Trash2, Download } from "lucide-react";
import { useEditMode, useLocalFile, openStored, downloadStored } from "@/lib/local-files";

const achievements = [
  { icon: Trophy, title: "3rd Prize — RTIH", desc: "Ratan Tata Innovation Hub Startup Idea Presentation" },
  { icon: Users, title: "Coding Club Coordinator", desc: "Leading peer programming sessions and events" },
  { icon: Sprout, title: "Founder — Farmer's Friendly", desc: "AI-powered agriculture startup idea" },
  { icon: Target, title: "Hackathon Participant", desc: "Active across multiple technical events" },
];

const certs = [
  { id: "python-infosys", name: "Introduction to Python — Infosys Springboard" },
  { id: "dbms-nptel", name: "Database Management Systems — NPTEL" },
  { id: "js-simplilearn", name: "JavaScript Fundamentals — Simplilearn" },
  { id: "html-udemy", name: "HTML for Beginners — Udemy" },
  { id: "agritech-hackathon", name: "National AgriTech Hackathon" },
  { id: "x-horizon", name: "X-Horizon Participation Certificate" },
  { id: "servicenow", name: "ServiceNow Micro-Certification" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="04 — Achievements" title="Wins and recognition" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {achievements.map((a) => (
            <div key={a.title} className="glass rounded-2xl p-6 hover:neon-border hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                <a.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{a.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>

        <div id="certificates" className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            Click any certificate to open it. Enable owner edit mode (bottom-right) to upload your files.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certs.map((c) => (
            <CertCard key={c.id} id={c.id} name={c.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ id, name }: { id: string; name: string }) {
  const { enabled } = useEditMode();
  const { file, save, clear } = useLocalFile(`portfolio.cert.${id}`);
  const inputRef = useRef<HTMLInputElement>(null);

  const clickable = !!file;

  return (
    <div
      className={`glass rounded-xl p-4 flex items-start gap-3 transition-all ${
        clickable
          ? "hover:neon-border cursor-pointer"
          : "hover:border-border/80"
      }`}
      onClick={() => file && openStored(file)}
    >
      <Award className={`w-5 h-5 flex-shrink-0 mt-0.5 ${file ? "text-neon-cyan" : "text-muted-foreground"}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm">{name}</div>
        {file && (
          <div className="text-[10px] font-mono text-muted-foreground mt-1 flex items-center gap-2">
            <Eye className="w-3 h-3" /> Click to view
          </div>
        )}
        {!file && !enabled && (
          <div className="text-[10px] font-mono text-muted-foreground mt-1">Available on request</div>
        )}
        {enabled && (
          <div
            className="mt-2 flex flex-wrap gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-neon-purple/60"
            >
              <Upload className="w-3 h-3" /> {file ? "Replace" : "Upload"}
            </button>
            {file && (
              <>
                <button
                  onClick={() => downloadStored(file)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-neon-purple/60"
                >
                  <Download className="w-3 h-3" /> Download
                </button>
                <button
                  onClick={clear}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-md glass border border-border hover:border-destructive/60"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
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
