# Apply Supabase migrations to a hosted project

Your hosted database has **no `public` tables** until migrations run. This repo keeps SQL in `supabase/migrations/`; the **Supabase CLI** applies them in filename order (`00001` … `00008`).

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) (or use `npx supabase@latest` as in `package.json`).
- Access to the Supabase project (owner or sufficient role).
- **Project ref** from the dashboard URL: `https://supabase.com/dashboard/project/<project-ref>`  
  Example host: `https://<project-ref>.supabase.co`

## Safest path (recommended): `link` + `db push`

From the **repository root**:

```bash
# 1) Authenticate (browser or token)
npx supabase@latest login
# Or non-interactive CI:
# export SUPABASE_ACCESS_TOKEN='your-personal-access-token'

# 2) Link this folder to the remote project (creates local link metadata; do not commit secrets)
npx supabase@latest link --project-ref YOUR_PROJECT_REF

# 3) Push all pending migrations to the linked remote database
npm run db:push
# equivalent:
# npx supabase@latest db push
```

`db push` applies only migrations **not yet recorded** on the remote (tracked in `supabase_migrations.schema_migrations`). Re-running is safe once history matches.

## Alternative (no CLI): SQL Editor

In the Supabase dashboard → **SQL** → **New query**, run each file **in order** (paste full contents, run, then next):

1. `supabase/migrations/00001_initial_schema.sql`
2. `00002_phase2_cart_addresses_reviews_rls_storage.sql`
3. `00003_seed_catalog.sql`
4. `00004_order_item_stock_trigger.sql`
5. `00005_phase3_nepal_commerce_engine.sql`
6. `00006_phase4_premium_growth_conversion_engine.sql`
7. `00007_phase5_enterprise_ecosystem_scale.sql`
8. `00008_first_user_admin.sql`

If a step errors, stop and fix that migration before continuing (do not skip order without understanding dependencies).

## After `db push`: verification SQL

Run in **SQL Editor**:

```sql
-- 1) Tables in public
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_type = 'BASE TABLE'
order by table_name;

-- 2) profiles exists
select exists (
  select 1
  from information_schema.tables
  where table_schema = 'public' and table_name = 'profiles'
) as profiles_exists;

-- 3) First-user admin trigger / function exists
select routine_name
from information_schema.routines
where specific_schema = 'public' and routine_name = 'handle_new_user';

-- 4) Optional: your admin flag (replace email)
select id, email, is_admin from public.profiles where email = 'you@example.com';
```

## PostgREST check (from app machine)

With `.env.local` loaded:

```bash
curl -sS -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/profiles?select=id&limit=1"
```

A **200** with `[]` or rows means the table exists. **404** / `PGRST205` means the table is still missing from the API schema cache (migrations not applied or not reloaded yet).

## Admin access

After migrations, the **first** `profiles` row created at signup should get `is_admin = true` (`00008`). If you already have users without an admin, run the SQL in `docs/SUPABASE_PRODUCTION_SETUP.md` or promote manually in `public.profiles`.
