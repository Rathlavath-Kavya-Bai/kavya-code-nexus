import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

const OWNER_EMAIL = "kavyabairathlavath@gmail.com";
const BUCKET = "portfolio-files";

export type PortfolioAsset = {
  key: string;
  url: string;
  fileName: string;
  mimeType: string;
};

type PortfolioAssetsContextValue = {
  assets: Record<string, PortfolioAsset>;
  user: User | null;
  isOwner: boolean;
  loading: boolean;
  uploadingKey: string | null;
  error: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  upload: (key: string, file: File) => Promise<boolean>;
};

const PortfolioAssetsContext = createContext<PortfolioAssetsContextValue | null>(null);

function extensionFor(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (fromName) return fromName;
  if (file.type === "application/pdf") return "pdf";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

export function PortfolioAssetsProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Record<string, PortfolioAsset>>({});
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadAssets = useCallback(async () => {
    const { data, error: readError } = await supabase
      .from("portfolio_assets")
      .select("asset_key, storage_path, file_name, mime_type");
    if (readError) {
      setError("Portfolio files could not be loaded. Please refresh the page.");
      return;
    }
    const next: Record<string, PortfolioAsset> = {};
    await Promise.all(
      (data ?? []).map(async (row) => {
        const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(row.storage_path, 3600);
        if (signed?.signedUrl) {
          next[row.asset_key] = {
            key: row.asset_key,
            url: signed.signedUrl,
            fileName: row.file_name,
            mimeType: row.mime_type,
          };
        }
      }),
    );
    setAssets(next);
  }, []);

  useEffect(() => {
    let active = true;
    void Promise.all([supabase.auth.getUser(), loadAssets()]).then(([auth]) => {
      if (!active) return;
      setUser(auth.data.user ?? null);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setUser(session?.user ?? null);
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [loadAssets]);

  const isOwner = user?.email?.toLowerCase() === OWNER_EMAIL;

  const signIn = useCallback(async () => {
    setError("");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
      extraParams: { login_hint: OWNER_EMAIL, prompt: "select_account" },
    });
    if (result.error) setError("Owner sign-in could not be completed. Please try again.");
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const upload = useCallback(
    async (key: string, file: File) => {
      if (!isOwner || !user) {
        setError("Sign in with the portfolio owner account to update files.");
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Please choose a file smaller than 10 MB.");
        return false;
      }
      setUploadingKey(key);
      setError("");
      const path = `${key}.${extensionFor(file)}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (uploadError) {
        setError("The file could not be uploaded. Please try again.");
        setUploadingKey(null);
        return false;
      }
      const { error: saveError } = await supabase.from("portfolio_assets").upsert({
        asset_key: key,
        storage_path: path,
        public_url: "private",
        file_name: file.name,
        mime_type: file.type,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      });
      if (saveError) {
        setError("The uploaded file could not be activated. Please try again.");
        setUploadingKey(null);
        return false;
      }
      await loadAssets();
      setUploadingKey(null);
      return true;
    },
    [isOwner, loadAssets, user],
  );

  const value = useMemo(
    () => ({ assets, user, isOwner, loading, uploadingKey, error, signIn, signOut, upload }),
    [assets, user, isOwner, loading, uploadingKey, error, signIn, signOut, upload],
  );

  return <PortfolioAssetsContext.Provider value={value}>{children}</PortfolioAssetsContext.Provider>;
}

export function usePortfolioAssets() {
  const context = useContext(PortfolioAssetsContext);
  if (!context) throw new Error("usePortfolioAssets must be used inside PortfolioAssetsProvider");
  return context;
}