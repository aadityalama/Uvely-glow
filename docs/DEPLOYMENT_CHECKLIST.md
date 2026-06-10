# Production Deployment Checklist

## Pre-deployment

- Confirm `main` is clean and up to date with `origin/main`.
- Confirm `npm run typecheck`, `npm run lint`, and `npm run build` pass locally.
- Create production Supabase project.
- Apply all migrations from `supabase/migrations` in order.
- Configure Supabase Auth URLs and email templates.
- Create first admin user and set `profiles.is_admin = true`.
- Seed production catalog, categories, brands, coupons, FAQs, Nepal districts, and warehouse locations.
- Configure product image storage bucket and verify public reads/admin writes.
- Set Vercel production environment variables.
- Set Vercel production domain and `NEXT_PUBLIC_SITE_URL`.
- Confirm all image domains used in product/content data are allowed by `next.config.ts`.

## Required production checks

- Signup, email verification, login, logout, password reset.
- Protected routes redirect unauthenticated users.
- Admin routes reject non-admin users.
- Product/category CRUD works in production.
- Product image upload works with Supabase Storage.
- Cart and wishlist persist for signed-in users.
- Multi-step checkout creates orders, order_items, notifications, and status events.
- Cash on Delivery order flow works end to end.
- eSewa/Khalti are disabled or clearly marked framework-only until live credentials are configured.
- Order tracking and invoice pages render for customer-owned orders only.
- Admin fulfillment updates status, tracking number, and notifications.
- Reviews can be submitted, moderated, and displayed.
- Newsletter signup stores subscribers.
- AI skincare quiz returns product recommendations.
- Blog, brand, comparison, sitemap, robots, and metadata routes render.
- Admin analytics, operations, security, support, marketplace, marketing, and executive dashboards render.

## Payment launch gates

- Add eSewa merchant credentials as server-only secrets.
- Add Khalti merchant credentials as server-only secrets.
- Implement server-side signature/token verification.
- Implement payment callback routes.
- Make payment processing idempotent.
- Persist provider transaction IDs and raw verification metadata.
- Test success, failure, cancellation, duplicate callback, and timeout scenarios.
- Verify order status and payment_status transitions.

## Security launch gates

- Verify every table has RLS enabled.
- Verify admin policies depend on `profiles.is_admin`.
- Add server action audit-log writes for admin mutations.
- Add rate-limit enforcement for auth, checkout, newsletter, quiz, support, and payment callback endpoints.
- Configure Supabase leaked password protection and email confirmation.
- Configure Vercel preview/prod environment separation.
- Rotate production keys before public launch.
- Enable dependency vulnerability scanning.

## Observability launch gates

- Add error monitoring provider.
- Add uptime monitoring for home, product, checkout, auth callback, sitemap, and admin login.
- Add Vercel log drain or logging integration.
- Add Supabase database health monitoring.
- Add payment callback alerting.
- Add checkout/order failure alerting.

## Content/legal launch gates

- Publish privacy policy.
- Publish terms of service.
- Publish refund and return policy.
- Publish shipping policy for Nepal delivery.
- Publish payment/COD policy.
- Publish affiliate and influencer disclosure.
- Review SEO titles/descriptions for all launch pages.
- Replace placeholder support email/domain copy.

## Post-deployment smoke test

- Open production home page.
- Browse products and categories.
- Run search/filter/sort.
- Complete signup and email verification.
- Add item to cart and wishlist.
- Complete COD checkout.
- View order history, order tracking, and invoice.
- Update order status from admin.
- Submit and moderate review.
- Submit newsletter signup and skincare quiz.
- Check sitemap and robots.
- Confirm Vercel deployment logs have no runtime errors.
