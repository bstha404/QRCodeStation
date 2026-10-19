import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/locales.js';

// Set this to your production domain — used for canonical URLs, OG tags, hreflang and the sitemap.
export default defineConfig({
  site: 'https://qrcodestation.com',
  integrations: [sitemap({
    filter: page => !/\/(404|500)\/?$/.test(page),
    // Adds <xhtml:link rel="alternate" hreflang> entries between the translated pages in the sitemap.
    i18n: { defaultLocale: DEFAULT_LOCALE, locales: Object.fromEntries(LOCALES.map(l => [l.code, l.code])) },
  })],
});
