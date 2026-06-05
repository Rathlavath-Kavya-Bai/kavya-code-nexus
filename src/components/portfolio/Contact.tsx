import { useState } from "react";
import { SectionHeader } from "./About";
import { Mail, Phone, Linkedin, Github, Send, Briefcase } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="06 — Contact" title="Let's build something" />

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm open to internships, full-time roles, freelance projects and collaborations.
              Drop a message — I'll get back within 24 hours.
            </p>
            {[
              { icon: Mail, label: "Email", value: "kavyabairathlavth@gmail.com", href: "mailto:kavyabairathlavth@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 9391601350", href: "tel:+919391601350" },
              { icon: Linkedin, label: "LinkedIn", value: "rathlavath-kavya-bai", href: "https://linkedin.com/in/rathlavath-kavya-bai-2a534a376" },
              { icon: Github, label: "GitHub", value: "Rathlavth-Kavya-Bai", href: "https://github.com/Rathlavth-Kavya-Bai" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:neon-border transition-all group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="text-sm truncate group-hover:text-neon-cyan transition-colors">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form
            className="lg:col-span-3 glass-strong rounded-2xl p-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3500);
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" name="name" type="text" />
              <Field label="Email" name="email" type="email" />
            </div>
            <Field label="Subject" name="subject" type="text" />
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                required
                name="message"
                rows={5}
                maxLength={1000}
                className="mt-2 w-full bg-input/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-purple/60 focus:ring-1 focus:ring-neon-purple/40 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white animate-glow-pulse"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Send className="w-4 h-4" />
                {sent ? "Message sent!" : "Send Message"}
              </button>
              <a
                href="mailto:kavyabairathlavth@gmail.com?subject=Hiring%20Opportunity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium neon-border hover:neon-glow transition-all"
              >
                <Briefcase className="w-4 h-4" /> Hire Me
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        required
        name={name}
        type={type}
        maxLength={255}
        className="mt-2 w-full bg-input/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-purple/60 focus:ring-1 focus:ring-neon-purple/40 transition-all"
      />
    </div>
  );
}
