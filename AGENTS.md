# AGENTS.md — QR Code Station

Guidance for AI coding agents (and new contributors) working in this repo. Read `design.md` before changing any UI.

## What this is

A free, private QR code generator at **https://qrcodestation.com**. Static Astro site, no backend, no database, no accounts, no ads, no analytics. QR codes are generated in the visitor's browser. 12 languages (English + es, ja, fr, de, pt, ko, it, id, ru, th, ar). Codes are **static** only: no dynamic/editable codes and no scan statistics, so never claim or add copy implying otherwise.

## Commands

```
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in dist/ (≈266 pages)
npm run preview
npm run check:i18n   # every language file must match English structure
npm run icons        # regenerate favicons, install icons and og-image from branding/logo.svg
```

Always run `npm run build` and `npm run check:i18n` after changing copy, routes or components. There is no test suite.

## Stack

- Astro 7 (static output), `@astrojs/sitemap` (with i18n hreflang), plain CSS in `src/styles/global.css` (no Tailwind, no framework runtime).
- `simple-icons` (build-time only) for social logos. LinkedIn is missing from that package, so its path is inlined in `Generator.astro`.
- QR encoder: `src/lib/qrcodegen.js` (Project Nayuki, MIT). Do not edit it.

## Project map

| Path | Role |
|------|------|
| `src/components/Generator.astro` | The whole generator: markup (server) + one client `<script>` (state, render, export, print, tabs, presets, i18n) |
| `src/components/HomePage.astro`, `LandingPage.astro`, `StaticPage.astro`, `ErrorPage.astro` | Page templates |
| `src/pages/index.astro`, `[slug].astro`, `[lang]/index.astro`, `[lang]/[slug].astro`, `404.astro`, `500.astro` | Routes. `[slug]` serves type landing pages and static pages |
| `src/lib/render.js` | Content types (`TYPES`), field defaults, payload builders, SVG renderer, presets, print-sheet content (shared by build and browser) |
| `src/lib/seo.js` | `BRAND`, `LANDINGS` (per-type SEO pages), `HOME_FAQ`, contact details, company links |
| `src/i18n/` | `locales.js`, `index.js` (helpers: `useI18n`, `localizePath`, `alternatesFor`), `en.js` + one file per language (UI strings, home copy, FAQ) |
| `src/i18n/c/` | Long-form content per language: help boxes, shape/preset names, example values, type-page FAQs, About/FAQ/Contact/Privacy/Terms/error pages |
| `public/` | `robots.txt`, `llms.txt`, `humans.txt`, `site.webmanifest`, `favicon.svg`, `og-image.png` |
| `scripts/check-i18n.mjs` | Structure checker for translations |
| `scripts/generate-icons.mjs`, `branding/logo.svg` | Logo source and the generator for favicons, install icons and `og-image.png` |

## Conventions

### Brand and domain
- The name is **QR Code Station** (never "QR Studio"). It lives in `BRAND` (`src/lib/seo.js`); translated copy uses the `{brand}` token where possible.
- Domain: `https://qrcodestation.com` (`site` in `astro.config.mjs`, Sitemap line in `public/robots.txt`, `public/llms.txt`).

### Adding or changing text (i18n)
1. English is the source of truth. UI strings go in `src/i18n/en.js` (`ui`, `home`) as an **id → English** pair; long content in `src/i18n/c/en.js`.
2. Add the same id/structure to **all 11** other language files. A missing id silently falls back to English, so `npm run check:i18n` is the safety net.
3. In `.astro` markup, translate with `x('English text')` (looks the text up by its English value) or `I.t('id')`. In the client script use `T('id')`. Never hard-code a user-visible English string without adding it to the dictionaries.
4. Keep tokens such as `{brand}`, `{x}`, `{n}`, `{contact_url}` intact in every language.
5. Arabic is RTL: use logical CSS properties (`margin-inline-start`, `inset-inline-end`, …) and test RTL.
6. Content blocks in `c/*.js` pages (`['h2', …]`, `['p', …]`, `['ul', […]]`, `['types']`, `['clear']`) must keep the **same order and kinds** in every language.

### Adding a QR content type
1. Add the type to `TYPES`, `FIELD_DEFAULTS` and `buildPayload` (and `buildSheet`) in `src/lib/render.js`.
2. Add a `LANDINGS` entry in `src/lib/seo.js`.
3. Add its pill label (`p_<type>`) to every `ui`, help text (`help.<type>`) and `descs`/`lfaq` entries to every `c/*.js`, and a row in `GRID` in `HomePage.astro`.
4. Rebuild and run `npm run check:i18n`.

### Styling
- Use the CSS variables in `design.md` (`--ink`, `--panel`, `--paper`, `--charge`, …). Do not hard-code colors, except user-chosen QR colors and the amber warning.
- Green (`--charge`) is the only accent. No purple/blue gradients, no `backdrop-filter` on overlay ancestors.
- Mobile breakpoint is 720px (hamburger menu, collapsible settings, help boxes become dropdowns).

### Client script rules (`Generator.astro`)
- State lives in the object `s`; change it with `set({...})` / `setField(k, v)` and let `render()` update the DOM.
- Persisted state: `localStorage` key `qrcodestation-state-v1` (only values that differ from the page's defaults; logos under ~400 KB) and `theme`. If you add or remove stored data, update the Privacy policy copy (`c/*.js` → `pages.privacy`) and the "Delete my saved data" key list in `StaticPage.astro`.
- Gradient ids in SVGs must be unique per SVG (`buildSvg` already does this).

### SEO
- Every indexable page needs a unique title, description, canonical and (if translated) hreflang alternates. `Base.astro` handles alternates for pages in `isTranslatable()`.
- 404 and 500 are `noindex` and excluded from the sitemap.

## Gotchas

- When writing files from scripts, **read the file before opening it for writing** (opening with `'w'` first truncates it).
- Python/shell one-liners that edit `.astro` or `.js` files must preserve non-ASCII text (Japanese, Arabic, Thai). Check the diff.
- `dist/` is build output; do not edit it.
- Never edit the icons or `og-image.png` by hand. Replace `branding/logo.svg` and run `npm run icons` (uses `sharp`); the brand name text in the share image is in `scripts/generate-icons.mjs`.
- The contact email and WhatsApp number are public: `CONTACT_EMAIL`, `WHATSAPP_NUMBER` in `src/lib/seo.js`.

## Do not

- Add trackers, ads, cookie banners, sign-up walls or any network call that sends user input anywhere.
- Claim dynamic codes, scan statistics, hosting or any capability the site does not have.
- Say that Adobe, Canva, Google or other products have limits you have not verified.
