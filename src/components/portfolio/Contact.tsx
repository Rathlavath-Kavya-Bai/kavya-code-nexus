import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SectionHeader } from "./About";
import { Mail, Phone, Linkedin, Github, Send, Briefcase, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { EMAIL, PHONE, PHONE_DISPLAY, GITHUB_PROFILE, LINKEDIN_PROFILE } from "@/lib/portfolio-data";
import { sendContactMessage } from "@/lib/contact.functions";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function validate(v: { name: string; email: string; subject: string; message: string }): Errors {
  const e: Errors = {};
  if (!v.name) e.name = "Please enter your name.";
  else if (v.name.length < 2) e.name = "Name must be at least 2 characters.";
  if (!v.email) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email, like name@example.com.";
  if (!v.subject) e.subject = "Please add a subject.";
  if (!v.message) e.message = "Please write a message.";
  else if (v.message.length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

const HIRE_SUBJECT = "Job Opportunity / Hiring Inquiry";

export function Contact() {
  const send = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [note, setNote] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState<Errors>({});
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
              const errs = validate(values);
              setErrors(errs);
              if (Object.keys(errs).length) {
                setStatus("error");
                setNote("Please fix the highlighted fields below.");
                form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
                return;
              }
              setStatus("sending");
              setNote("");
              try {
                const res = await send({ data: values });
                if (res.ok) {
                  setStatus("success");
                  setNote("Message sent successfully! I'll get back to you soon.");
                  form.reset();
                  setSubject("");
                } else {
                  setStatus("error");
                  setNote(res.error);
                }
              } catch {
                setStatus("error");
                setNote("Could not send your message. Please check your connection and try again.");
              }
            }}
            onChange={(e) => {
              const n = (e.target as unknown as HTMLInputElement).name as keyof Errors;
              if (errors[n]) setErrors((p) => ({ ...p, [n]: undefined }));
              if (status === "success") { setStatus("idle"); setNote(""); }
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name" name="name" type="text" inputRef={nameRef} error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
            </div>
            <div>
              <label htmlFor="f-subject" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Subject</label>
              <input
                id="f-subject"
                name="subject"
                type="text"
                maxLength={150}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "f-subject-err" : undefined}
                className={`${inputCls} ${errors.subject ? errCls : ""}`}
              />
              <FieldError id="f-subject-err" msg={errors.subject} />
            </div>
            <div>
              <label htmlFor="f-message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                id="f-message"
                name="message"
                rows={5}
                maxLength={2000}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "f-message-err" : undefined}
                className={`${inputCls} ${errors.message ? errCls : ""}`}
              />
              <FieldError id="f-message-err" msg={errors.message} />
            </div>
            {note && (
              <div
                role={status === "success" ? "status" : "alert"}
                className={`flex items-start gap-2 rounded-xl border-2 px-4 py-3 text-sm ${
                  status === "success"
                    ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan"
                    : "border-destructive/50 bg-destructive/10 text-destructive"
                }`}
              >
                {status === "success" ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                <span>{note}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white animate-glow-pulse disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "var(--gradient-primary)" }}
              >
                {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
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

const errCls = "border-destructive/70 focus:border-destructive";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {msg}
    </p>
  );
}

function Field({
  label,
  name,
  type,
  inputRef,
  error,
}: {
  label: string;
  name: string;
  type: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        id={`f-${name}`}
        ref={inputRef}
        name={name}
        type={type}
        maxLength={255}
        aria-invalid={!!error}
        aria-describedby={error ? `f-${name}-err` : undefined}
        className={`${inputCls} ${error ? errCls : ""}`}
      />
      <FieldError id={`f-${name}-err`} msg={error} />
    </div>
  );
}
