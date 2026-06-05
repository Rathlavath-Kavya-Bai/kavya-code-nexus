import { useEffect, useState, useCallback } from "react";

// Tiny event bus so all hooks update across components
const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export type StoredFile = {
  name: string;
  type: string;
  dataUrl: string;
};

export function useLocalFile(key: string) {
  const read = (): StoredFile | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as StoredFile) : null;
    } catch {
      return null;
    }
  };

  const [file, setFile] = useState<StoredFile | null>(read);

  useEffect(() => {
    const update = () => setFile(read());
    listeners.add(update);
    window.addEventListener("storage", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("storage", update);
    };
  }, [key]);

  const save = useCallback(
    async (f: File) => {
      const dataUrl: string = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = rej;
        r.readAsDataURL(f);
      });
      const payload: StoredFile = { name: f.name, type: f.type, dataUrl };
      localStorage.setItem(key, JSON.stringify(payload));
      setFile(payload);
      emit();
    },
    [key],
  );

  const clear = useCallback(() => {
    localStorage.removeItem(key);
    setFile(null);
    emit();
  }, [key]);

  return { file, save, clear };
}

const EDIT_KEY = "portfolio.editMode";

export function useEditMode() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(EDIT_KEY) === "1";
  });

  useEffect(() => {
    const update = () => setEnabled(localStorage.getItem(EDIT_KEY) === "1");
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !(localStorage.getItem(EDIT_KEY) === "1");
    localStorage.setItem(EDIT_KEY, next ? "1" : "0");
    setEnabled(next);
    emit();
  }, []);

  return { enabled, toggle };
}

export function downloadStored(file: StoredFile) {
  const a = document.createElement("a");
  a.href = file.dataUrl;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function openStored(file: StoredFile) {
  // Open in a new tab; works for PDFs and images
  const w = window.open();
  if (!w) return;
  if (file.type.startsWith("image/")) {
    w.document.write(
      `<title>${file.name}</title><body style="margin:0;background:#0a0a0f;display:flex;align-items:center;justify-content:center;min-height:100vh"><img src="${file.dataUrl}" style="max-width:100%;max-height:100vh"/></body>`,
    );
  } else {
    w.location.href = file.dataUrl;
  }
}
