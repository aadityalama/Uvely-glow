# Environment Variables

## Web app variables

### `NEXT_PUBLIC_SITE_URL`

- Required for production SEO, JSON-LD, sitemap, robots, payment callbacks, and canonical URLs.
- Example: `https://uvelyglow.com`
- Local default: `http://localhost:3000`
- Set in Vercel Production and Preview.

### `NEXT_PUBLIC_SUPABASE_URL`

- Required for live Supabase auth, database reads/writes, storage image host allowlisting, and middleware sessions.
- Example: `https://your-project.supabase.co`
- Set in Vercel Production and Preview.

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- Required for browser/server Supabase clients using RLS.
- This is the Supabase anon/public key, not the service role key.
- Supabase projects may label this as the `anon` key or a publishable key. Either public key type is valid; do not paste a `service_role`, `sb_secret_...`, JWT secret, or placeholder value.
- Set in Vercel Production and Preview.

## Mobile app variables

These are used by the Phase 5 Expo scaffold and should be configured in the mobile build pipeline.

### `EXPO_PUBLIC_API_BASE_URL`

- Public base URL for the deployed web/API host.
- Example: `https://uvelyglow.com`

### `EXPO_PUBLIC_SUPABASE_URL`

- Supabase project URL for the mobile app.
- Example: `https://your-project.supabase.co`

## Variables to add before broad production launch

These are not currently consumed by the codebase, but they are recommended as live integrations are completed:

### Payments

- `ESEWA_MERCHANT_ID`
- `ESEWA_SECRET_KEY`
- `ESEWA_SUCCESS_URL`
- `ESEWA_FAILURE_URL`
- `KHALTI_PUBLIC_KEY`
- `KHALTI_SECRET_KEY`
- `KHALTI_WEBHOOK_SECRET`

### Email and notifications

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `TRANSACTIONAL_EMAIL_FROM`
- `MARKETING_EMAIL_FROM`
- `EXPO_ACCESS_TOKEN`

### Observability and security

- `SENTRY_DSN` or equivalent error-monitoring DSN
- `LOG_DRAIN_TOKEN`
- `UPTIME_WEBHOOK_URL`
- `RATE_LIMIT_SECRET`
- `ADMIN_AUDIT_WEBHOOK_URL`

### Server-only Supabase operations

- `SUPABASE_SERVICE_ROLE_KEY`

Only add this if server-only administrative route handlers are implemented. Never expose it with a `NEXT_PUBLIC_` prefix.

## Current `.env.example`

The current `.env.example` contains the minimum variables for local/live Supabase:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Production environment rules

- Do not commit `.env.local`.
- Do not use production Supabase variables in local experiments.
- Use separate Supabase projects for Preview and Production.
- Rotate keys before public launch if they were shared during development.
- Keep payment, email, and service role credentials server-only.
