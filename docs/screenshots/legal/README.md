# Static marketing / legal pages — verification captures

Full-page Playwright screenshots after fixing light glass card typography (dark text on frosted panels) for:

- `about.png` — `/about`
- `contact.png` — `/contact`
- `privacy.png` — `/privacy`
- `terms.png` — `/terms`

Captured with production build (`next build` + `next start`) on localhost.

## Storefront home (reference vs implementation)

- Reference: attached storefront mock (user-provided PNG in chat / design export).
- After pass: `home-implementation-1920.png` — `/` at 1920×900, `next start` + `npx playwright screenshot`.

Compare side-by-side in an image viewer; iterate on spacing, type scale, and photography until deltas are minimal.
