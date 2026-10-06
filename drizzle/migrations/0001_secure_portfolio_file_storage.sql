CREATE POLICY "Portfolio files are publicly readable"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'portfolio-files');
CREATE POLICY "Portfolio owner can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-files' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com');
CREATE POLICY "Portfolio owner can replace files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-files' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com')
WITH CHECK (bucket_id = 'portfolio-files' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com');
CREATE POLICY "Portfolio owner can remove files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-files' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'kavyabairathlavath@gmail.com');