# Storefront visual reference

Place your **pixel-reference screenshot** here as:

`REFERENCE.png`

Path: `docs/screenshots/storefront/REFERENCE.png`

The implementation is tuned against that file. Copy, spacing, and mega-menu labels can be aligned 1:1 by editing:

- `src/lib/i18n/store-messages.ts` — hero, footer, and announcement copy
- `src/config/storefront-mega-menu.ts` — mega-menu link labels and URLs

## Localhost screenshot (manual)

1. `npm run dev`
2. Open `http://localhost:3000`
3. Capture full page (browser DevTools → “Capture full size screenshot” or your OS screenshot tool)
4. Overlay or compare with `REFERENCE.png` in Figma / Photoshop / Kaleidoscope

Automated pixel diff can be added later (e.g. Playwright + pixelmatch) once `REFERENCE.png` exists in this folder.
