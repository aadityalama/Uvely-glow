# Unfinished Features and Launch Gaps

## Must finish before public launch

### Live payments

- eSewa and Khalti are integration frameworks, not production payment captures.
- Missing signed request generation.
- Missing server-side callback verification.
- Missing webhook/callback route handlers.
- Missing idempotent payment reconciliation.
- Missing payment failure/cancellation UX.

### Transactional checkout integrity

- Checkout currently performs multiple database writes from app logic.
- Production should move order creation into a Supabase RPC or transaction-safe backend endpoint.
- Stock reservation/oversell prevention needs concurrency-safe handling.
- Payment status transitions should be guarded by provider verification.

### Notifications

- Order notification records exist, but email/SMS/push delivery providers are not connected.
- Subscription renewal reminders need email/push delivery.
- Support ticket notifications need admin/customer delivery.
- Marketing campaigns need consent-aware email delivery.

### Legal and policy pages

- Privacy policy.
- Terms of service.
- Refund and return policy.
- Shipping policy for Nepal.
- Payment and Cash on Delivery policy.
- Affiliate/influencer disclosure.
- Cookie/marketing consent language.

### Production admin operations

- First-admin bootstrap must be documented and executed.
- Admin activity logging schema exists but actions are not fully wired to write logs.
- Rate-limit schema exists but enforcement is not implemented.
- Audit log schema exists but sensitive mutations should write audit entries.

## Should finish before private beta

### Production content and data

- Replace placeholder/fallback catalog and article content with approved production content.
- Seed real products, brands, images, galleries, FAQs, coupons, delivery fees, warehouse data, and subscription plan details.
- Confirm all image hosts are allowed by `next.config.ts`.

### Customer support

- Ticket form submission UI.
- Admin ticket detail/reply UI.
- AI support assistant backed by real FAQ retrieval.
- SLA and assignment workflow.

### Loyalty and subscriptions

- Points earning/redemption writes after purchases and referrals.
- Tier upgrade/downgrade rules.
- Subscription create/pause/cancel actions.
- Renewal billing workflow.
- Subscription shipment generation.

### Mobile app

- Expo scaffold exists, but native screens are not implemented.
- Push notification provider is not connected.
- Mobile auth/session persistence is not implemented.
- App store assets and build pipeline are not configured.

## Can ship after initial launch

### Enterprise and marketplace

- Vendor admin portal.
- Vendor product ownership and commission settlement.
- Purchase order receiving workflow.
- Advanced demand forecasting.
- Cohort dashboards with real historical data.

### Growth optimization

- A/B testing framework.
- Personalized email flows.
- Advanced recommendation model.
- Product comparison builder UI.
- Influencer campaign reporting automation.

### Performance and observability

- Real user monitoring.
- Core Web Vitals dashboard.
- Edge caching strategy for content pages.
- Query-level database performance tuning after real traffic is observed.

## Known demo/scaffold areas

- AI skincare quiz is rule-based, not connected to a model provider.
- eSewa/Khalti pages are framework handoff pages.
- Affiliate dashboard uses scaffold metrics.
- Enterprise dashboards use service snapshots and are ready to connect to live aggregate queries.
- Mobile app foundation is architecture-only.
