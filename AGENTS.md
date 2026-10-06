# Architecture rules

- Store owner-managed portfolio media in Lovable Cloud Storage and keep only its metadata in `portfolio_assets`, so files persist across devices and deployments.
- Restrict portfolio media writes to the configured owner email through database and storage policies, while public visitors receive expiring read-only file links.