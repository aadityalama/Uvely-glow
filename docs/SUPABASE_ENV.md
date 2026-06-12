# Supabase environment variables

Copy `.env.example` to `.env.local` and fill in values from the Supabase dashboard: **Project Settings → API**.

## Required (storefront + auth + database via anon key)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL, e.g. `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **anon** `public` key (safe in browser) |

If either is missing or left as placeholders, `isSupabaseConfigured()` is false and the app uses local fallback catalog data; **sign up, sign in, and `/admin` checks will not use your project**.

## Strongly recommended

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (no trailing slash), e.g. `http://localhost:3000` or `https://your-domain.com`. Used for auth email redirects and metadata. |

## Optional (local tooling / CI only — never expose to the client)

| Variable | Description |
|----------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role** key. Bypasses RLS. Use only in secure server scripts or CI — **do not** prefix with `NEXT_PUBLIC_`. Not required for the Next.js app as shipped. |

## Supabase Dashboard checklist

1. **Authentication → URL configuration**
   - **Site URL**: match `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000` for dev).
   - **Redirect URLs** add:
     - `{SITE_URL}/auth/callback`
     - `{SITE_URL}/login`
     - `{SITE_URL}/update-password`
2. **Authentication → Providers**: enable **Email** (password) for sign up / sign in.
3. **SQL**: apply migrations (see `docs/SUPABASE_PRODUCTION_SETUP.md` or `npm run db:push` after `supabase link`).

## Tables required for this app (created by migrations)

- `profiles` — links to `auth.users`, includes `is_admin`
- `categories`, `products` — catalog
- `orders`, `order_items` — checkout (plus later-phase tables from other migration files)

Session persistence uses `@supabase/ssr` with HTTP-only cookies; middleware refreshes the session on each request when Supabase env is set.
