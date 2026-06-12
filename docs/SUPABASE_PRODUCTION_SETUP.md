# Supabase Production Setup Guide

## 1. Create production project

1. Create a new Supabase project for production.
2. Choose the region closest to Nepal customers.
3. Save the project URL and anon key.
4. Do not expose the service role key in the browser or Vercel public env vars.

## 2. Apply migrations

Apply migrations in order:

1. `00001_initial_schema.sql`
2. `00002_phase2_cart_addresses_reviews_rls_storage.sql`
3. `00003_seed_catalog.sql`
4. `00004_order_item_stock_trigger.sql`
5. `00005_phase3_nepal_commerce_engine.sql`
6. `00006_phase4_premium_growth_conversion_engine.sql`
7. `00007_phase5_enterprise_ecosystem_scale.sql`
8. `00008_first_user_admin.sql`

After applying migrations, verify:

- Tables exist.
- RLS is enabled.
- Public catalog/content policies are readable.
- User-owned tables only expose user-owned rows.
- Admin policies require `profiles.is_admin = true`.
- Storage bucket `product-images` exists.

## 3. Configure authentication

Set Site URL:

```text
https://your-production-domain
```

Add redirect URLs:

```text
https://your-production-domain/auth/callback
https://your-production-domain/login
https://your-production-domain/update-password
```

Recommended auth settings:

- Require email confirmation.
- Enable secure password policy.
- Enable leaked password protection if available.
- Configure production email templates.
- Configure SMTP provider for reliable auth delivery.

## 4. Bootstrap first admin

Migrations include `00008_first_user_admin.sql`:

- The **first** `public.profiles` row created at signup gets `is_admin = true` automatically (via `handle_new_user` trigger).
- If you already had profiles with no admin, the migration promotes the **oldest** profile to admin once.

Manual override (optional):

```sql
update public.profiles
set is_admin = true
where email = 'you@example.com';
```

Log in and verify `/admin` loads. Keep the number of admin users minimal.

## 5. Storage setup

Verify bucket:

- Bucket name: `product-images`
- Public read: enabled
- Max file size: 5 MB
- Allowed MIME types: JPEG, PNG, WebP, GIF
- Admin-only insert/update/delete policies

Before launch:

- Upload real product images.
- Confirm production image URLs render through Next Image.
- Confirm gallery URLs and before/after review URLs are on allowed hosts.

## 6. Production seed data

Required:

- Categories
- Products
- Product images and galleries
- Nepal districts and delivery fees
- Coupons
- FAQs
- Brands
- Blog posts
- Warehouse locations
- Loyalty rules
- Subscription plan copy

Recommended:

- Vendor records
- Marketing campaigns
- Influencer partners
- Affiliate profiles
- Executive metric snapshots
- Customer cohort baselines

## 7. Database hardening

- Enable point-in-time recovery or scheduled backups.
- Verify extension usage is approved.
- Add indexes for high-traffic query paths after production data volume is known.
- Monitor slow queries.
- Keep migrations as the only production schema change path.
- Run RLS tests before public launch.

## 8. Payment data

The schema supports provider references and payment statuses, but live eSewa/Khalti verification still needs implementation. Do not mark online payments live until:

- Provider credentials are server-only.
- Callback verification is implemented.
- Duplicate callback protection exists.
- Payment failures and cancellations are handled.
- Admin can reconcile provider references.

## 9. Security monitoring

Phase 5 adds:

- `audit_logs`
- `rate_limit_events`
- `admin_activity_logs`
- `cache_invalidation_log`

Before launch, wire server actions and route handlers to write these logs and connect alerting for suspicious activity.
