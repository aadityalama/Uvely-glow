# Production Recommendations

## Recommended launch strategy

Launch in three stages:

1. **Internal production smoke test**
   - Production Supabase and Vercel are configured.
   - Admin users complete catalog, checkout, fulfillment, and content smoke tests.

2. **Private beta**
   - Invite a small group of Nepal customers.
   - Use Cash on Delivery only unless eSewa/Khalti verification is complete.
   - Monitor auth, checkout, order, admin, and support flows daily.

3. **Public launch**
   - Enable verified online payments.
   - Enable transactional email and support operations.
   - Publish legal pages.
   - Turn on observability and incident alerts.

## Architecture recommendations

- Keep Supabase as the system of record for auth, catalog, orders, loyalty, subscriptions, support, and operations.
- Move checkout into an atomic RPC or server-only transaction endpoint.
- Add service-role-only backend route handlers for payment callbacks and admin automation.
- Keep browser clients on anon key + RLS.
- Maintain separate Supabase projects for local/preview/production.

## Security recommendations

- Implement rate limiting for auth, checkout, newsletter, quiz, support, and payment callbacks.
- Wire `audit_logs` for admin product/category/order/customer/support/vendor changes.
- Wire `admin_activity_logs` for all admin dashboards and actions.
- Use least-privilege RLS policies and test them before launch.
- Rotate Supabase keys before public launch.
- Add dependency vulnerability checks to CI.

## Payment recommendations

- Treat eSewa and Khalti as unavailable until server verification is complete.
- Do not trust client-side payment success redirects.
- Persist provider transaction IDs and raw callback metadata.
- Make callbacks idempotent.
- Add reconciliation dashboard for mismatched payment/order statuses.

## Operations recommendations

- Seed warehouse inventory before launch.
- Define reorder points and low-stock thresholds for every SKU.
- Connect purchase orders to vendor records.
- Review stock decrement and stock reservation behavior under concurrent checkout.
- Create a daily launch operations checklist.

## Customer experience recommendations

- Add support ticket form before beta.
- Add order confirmation emails before public launch.
- Add refund/return policy and shipping policy links in footer and checkout.
- Replace placeholder domains and emails.
- QA mobile layout on common Nepal devices and network conditions.

## SEO and performance recommendations

- Run Lighthouse against production URLs after deployment.
- Confirm all pages have canonical production URLs.
- Submit sitemap to Google Search Console.
- Add real Open Graph images for core pages.
- Avoid using remote images from unapproved hosts.
- Monitor Core Web Vitals after traffic begins.

## Business recommendations

- Start with Cash on Delivery plus manual payment reconciliation if online payments are not certified.
- Keep K-Beauty Box subscription as waitlist/private beta until renewal billing is operational.
- Start vendor marketplace onboarding manually before opening vendor self-service.
- Use private beta data to calibrate loyalty earning/redemption economics.
