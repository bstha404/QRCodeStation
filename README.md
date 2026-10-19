# QR Code Station

Free, private QR code generator: [qrcodestation.com](https://qrcodestation.com). A static Astro site: no sign-up, no ads, no expiring codes. QR codes are generated in the browser with Project Nayuki's QR Code generator library (MIT, `src/lib/qrcodegen.js`).

## Run

```
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run check:i18n   # checks every translation matches the English structure
npm run icons        # rebuilds favicons, install icons and the share image from branding/logo.svg
```

## What is in the site

- Home generator at `/` with 16 content types, colors, gradients, shapes, logo upload, 31 presets and PNG / SVG / JPG / WebP / copy / print-to-PDF.
- A landing page per content type (`/wifi-qr-code/`, `/vcard-qr-code/`, …) generated from `src/lib/seo.js`.
- About, FAQ, Contact, Privacy policy, Terms and 404 / 500 pages.
- 12 languages (English at `/`, others under `/es/`, `/ja/`, `/fr/`, `/de/`, `/pt/`, `/ko/`, `/it/`, `/id/`, `/ru/`, `/th/`, `/ar/`) with hreflang links and sitemap alternates.

## Before deploying

- Confirm `site` in `astro.config.mjs` and the Sitemap line in `public/robots.txt` match your domain (currently `https://qrcodestation.com`).
- Submit `/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
- To change the logo, replace `branding/logo.svg` and run `npm run icons`.
- Serve `500.html` for server errors and `404.html` for unknown URLs.

## More

- `design.md` — design system (colors, type, components).
- `AGENTS.md` / `CLAUDE.md` — guidance for AI coding agents.
- `public/` — `robots.txt`, `llms.txt`, `humans.txt`, `site.webmanifest`.
