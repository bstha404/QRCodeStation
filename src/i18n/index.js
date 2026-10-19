import { LOCALES, DEFAULT_LOCALE, NON_DEFAULT } from './locales.js';
import * as en from './en.js';
import * as es from './es.js';
import * as ja from './ja.js';
import * as fr from './fr.js';
import * as de from './de.js';
import * as pt from './pt.js';
import * as ko from './ko.js';
import * as it from './it.js';
import * as id from './id.js';
import * as ru from './ru.js';
import * as th from './th.js';
import * as ar from './ar.js';
import * as cen from './c/en.js';
import { HOME_FAQ, LANDINGS } from '../lib/seo.js';

const CONTENT = import.meta.glob('./c/*.js', { eager: true });
const STATIC_PAGES = ['/about/', '/faq/', '/contact/', '/privacy-policy/', '/terms-and-conditions/'];

export { LOCALES, DEFAULT_LOCALE, NON_DEFAULT };
const DICTS = { es, ja, fr, de, pt, ko, it, id, ru, th, ar };
const CODES = LOCALES.map(l => l.code);
const revEn = Object.fromEntries(Object.entries(en.ui).map(([k, v]) => [v, k]));

export const localeInfo = code => LOCALES.find(l => l.code === code) || LOCALES[0];

/** '/es/wifi-qr-code/' -> 'es'; anything without a known prefix -> default locale. */
export function getLocale(pathname) {
  const seg = pathname.split('/')[1];
  return CODES.includes(seg) && seg !== DEFAULT_LOCALE ? seg : DEFAULT_LOCALE;
}
/** '/es/wifi-qr-code/' -> '/wifi-qr-code/' */
export function stripLocale(pathname) {
  const loc = getLocale(pathname);
  return loc === DEFAULT_LOCALE ? pathname : pathname.slice(loc.length + 1) || '/';
}
/** localizePath('es', '/wifi-qr-code/') -> '/es/wifi-qr-code/' (default locale stays unprefixed) */
export function localizePath(locale, path = '/') {
  if (!locale || locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path === '/' ? '/' : path}`;
}
/** Pages that exist in every language: the home page and the per-type landing pages. */
export const isTranslatable = path => path === '/' || STATIC_PAGES.includes(path) || LANDINGS.some(l => path === `/${l.slug}/`);
export const STATIC_ID = { 'about': 'about', 'faq': 'faq', 'contact': 'contact', 'privacy-policy': 'privacy', 'terms-and-conditions': 'terms' };

const fill = (s, vars) => vars ? s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`) : s;

export function useI18n(locale) {
  const d = DICTS[locale] || {};
  const ui = { ...en.ui, ...(d.ui || {}) };
  const sheet = { ...(d.sheet || {}) };
  const home = { ...en.home, ...(d.home || {}) };
  const faq = d.faq || HOME_FAQ;
  const cd = CONTENT[`./c/${locale}.js`] || {};
  const c = Object.fromEntries(Object.keys(cen).map(k => [k, cd[k] ?? cen[k]]));
  const names = { ...c.names };
  const N = (eng) => names[eng] ?? eng;
  const t = (key, vars) => fill(ui[key] ?? key, vars);
  // x('Website URL') -> translated text for an English label that is defined in en.js; unknown text passes through.
  const x = (eng, vars) => { const k = revEn[eng]; return fill(k && ui[k] ? ui[k] : eng, vars); };
  return { locale, dir: localeInfo(locale).dir, ui, sheet, home, faq, c, t, x, N };
}

/** Home / landing slug -> hreflang alternates for <head> and the language menu. */
export function alternatesFor(path, site) {
  const base = site instanceof URL ? site : new URL(site);
  const list = LOCALES.map(l => ({ hreflang: l.code, locale: l.code, name: l.name, href: new URL(localizePath(l.code, path), base).href }));
  return [...list, { hreflang: 'x-default', locale: DEFAULT_LOCALE, name: '', href: new URL(path, base).href }];
}
