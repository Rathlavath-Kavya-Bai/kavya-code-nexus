import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SectionHeader } from "./About";
import { Mail, Phone, Linkedin, Github, Send, Briefcase } from "lucide-react";
import { EMAIL, PHONE, PHONE_DISPLAY, GITHUB_PROFILE, LINKEDIN_PROFILE } from "@/lib/portfolio-data";
import { sendContactMessage } from "@/lib/contact.functions";

const HIRE_SUBJECT = "Job Opportunity / Hiring Inquiry";

export function Contact() {
  const send = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [note, setNote] = useState("");
  const [subject, setSubject] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const prefillHire = useCallback(() => {
    setSubject(HIRE_SUBJECT);
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
  }, []);

  useEffect(() => {
    window.addEventListener("portfolio:hire", prefillHire);
    return () => window.removeEventListener("portfolio:hire", prefillHire);
  }, [prefillHire]);

  return (
    <section id="contact" className="relative py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="06 — Contact" title="Let's build something" />

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm open to internships, full-time roles, freelance projects and collaborations.
              Drop a message — I'll get back within 24 hours.
            </p>
            {[
              { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE}` },
              { icon: Linkedin, label: "LinkedIn", value: "rathlavath-kavya-bai", href: LINKEDIN_PROFILE },
              { icon: Github, label: "GitHub", value: "Rathlavath-Kavya-Bai", href: GITHUB_PROFILE },
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
            ref={formRef}
            noValidate
            className="lg:col-span-3 glass-strong rounded-2xl p-5 sm:p-7 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (status === "sending") return;
              const form = e.currentTarget;
              const fd = new FormData(form);
              const values = {
                name: String(fd.get("name") || "").trim(),
                email: String(fd.get("email") || "").trim(),
                subject: subject.trim(),
                message: String(fd.get("message") || "").trim(),
              };
              if (!values.name || !values.email || !values.subject || !values.message) {
                setStatus("error");
                setNote("Please fill in all fields.");
                return;
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                setStatus("error");
                setNote("Please enter a valid email address.");
                return;
              }
              setStatus("sending");
              setNote("");
              try {
                const res = await send({ data: values });
                if (res.ok) {
                  setStatus("success");
                  setNote("Message sent successfully!");
                  form.reset();
                  setSubject("");
                } else {
                  setStatus("error");
                  setNote(res.error);
                }
              } catch {
                setStatus("error");
                setNote("Could not send your message. Please try again.");
              }
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" name="name" type="text" inputRef={nameRef} />
              <Field label="Email" name="email" type="email" />
            </div>
            <div>
              <label htmlFor="f-subject" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Subject</label>
              <input
                id="f-subject"
                required
                name="subject"
                type="text"
                maxLength={150}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="f-message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                id="f-message"
                required
                name="message"
                rows={5}
                maxLength={2000}
                className={inputCls}
              />
            </div>
            {note && (
              <p
                role="status"
                className={`text-sm ${status === "success" ? "text-neon-cyan" : "text-destructive"}`}
              >
                {note}
              </p>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white animate-glow-pulse disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Send className="w-4 h-4" />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              <button
                type="button"
                onClick={prefillHire}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium neon-border hover:neon-glow transition-all"
              >
                <Briefcase className="w-4 h-4" /> Hire Me
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "mt-2 w-full bg-input/40 border-2 border-muted-foreground/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-purple/70 focus:ring-1 focus:ring-neon-purple/40 transition-all";

function Field({
  label,
  name,
  type,
  inputRef,
}: {
  label: string;
  name: string;
  type: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        id={`f-${name}`}
        ref={inputRef}
        required
        name={name}
        type={type}
        maxLength={255}
        className={inputCls}
      />
    </div>
  );
}
