import { useRef, useState } from "react";
import { FileText, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { usePortfolioAssets } from "@/lib/portfolio-assets";

export function ResumeButton({ compact = false }: { compact?: boolean }) {
  const { assets, isOwner, uploadingKey, upload, signIn, error } = usePortfolioAssets();
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const resume = assets.resume;
  const busy = uploadingKey === "resume";
  const cls = compact
    ? "rounded-full neon-border text-xs px-4 py-2 h-auto"
    : "rounded-full glass text-sm px-6 py-3 h-auto hover:neon-border";
  return <>
    {resume ? <Button variant="ghost" asChild className={cls}><a href={resume.url} target="_blank" rel="noopener noreferrer"><FileText />Resume</a></Button>
      : <Button variant="ghost" className={cls} onClick={() => setOpen(true)}><FileText />Resume</Button>}
    {isOwner && resume && !compact && <Button variant="ghost" className={cls} onClick={() => setOpen(true)}><Upload />Resume Management</Button>}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md neon-border">
        <DialogTitle>{resume ? "Resume Management" : "Add Resume"}</DialogTitle>
        <DialogDescription>{isOwner ? "Upload a PDF up to 10 MB. The new resume becomes active after saving." : "The portfolio owner can sign in to upload the resume PDF."}</DialogDescription>
        {isOwner ? <Button variant="outline" disabled={busy} onClick={() => input.current?.click()}>{busy ? <Loader2 className="animate-spin" /> : <Upload />}{busy ? "Uploading…" : resume ? "Upload New Resume" : "Upload Resume PDF"}</Button>
          : <Button onClick={() => void signIn()}>Owner sign in</Button>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <input ref={input} type="file" accept="application/pdf" className="hidden" aria-label="Upload resume PDF" onChange={async e => { const file = e.target.files?.[0]; e.target.value = ""; if (file && await upload("resume", file)) setOpen(false); }} />
      </DialogContent>
    </Dialog>
  </>;
}