CREATE TABLE public.portfolio_assets (
  asset_key TEXT PRIMARY KEY,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  updated_by UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_assets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.portfolio_assets TO authenticated;
GRANT ALL ON public.portfolio_assets TO service_role;
ALTER TABLE public.portfolio_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Portfolio assets are publicly readable"
ON public.portfolio_assets FOR SELECT
TO anon, authenticated
USING (true);
CREATE POLICY "Portfolio owner can insert assets"
ON public.portfolio_assets FOR INSERT
TO authenticated
WITH CHECK (lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com' AND updated_by = auth.uid());
CREATE POLICY "Portfolio owner can update assets"
ON public.portfolio_assets FOR UPDATE
TO authenticated
USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com')
WITH CHECK (lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com' AND updated_by = auth.uid());
CREATE POLICY "Portfolio owner can delete assets"
ON public.portfolio_assets FOR DELETE
TO authenticated
USING (lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com');