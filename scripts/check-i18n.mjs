// Checks that every language file has the same ids and structure as English.
// Run: npm run check:i18n
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const load = (p) => import(pathToFileURL(resolve(p)).href);
const en = await load('src/i18n/en.js');
const cen = await load('src/i18n/c/en.js');
const codes = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'id', 'ru', 'th', 'ar'];
let failures = 0;

function cmp(a, b, path, errs) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) { errs.push(`${path}: length ${b && b.length} != ${a.length}`); return; }
    a.forEach((x, i) => typeof x === 'string' ? (!b[i] || typeof b[i] !== 'string') && errs.push(`${path}[${i}] missing text`) : cmp(x, b[i], `${path}[${i}]`, errs));
    if (path.endsWith('blocks')) a.forEach((blk, i) => { if (blk[0] !== b[i][0]) errs.push(`${path}[${i}] block kind ${b[i][0]} != ${blk[0]}`); });
  } else if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) (!b || !(k in b)) ? errs.push(`${path}.${k} missing`) : cmp(a[k], b[k], `${path}.${k}`, errs);
    if (b) for (const k of Object.keys(b)) if (!(k in a)) errs.push(`${path}.${k} is not in English`);
  } else if (typeof a === 'string' && (typeof b !== 'string' || !b.trim())) errs.push(`${path} missing text`);
}
const flat = (o, p = '') => typeof o === 'string' ? [[p, o]] : Array.isArray(o) ? o.flatMap((x, i) => flat(x, `${p}[${i}]`)) : o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => flat(v, `${p}.${k}`)) : [];

for (const c of codes) {
  const errs = [];
  const m = await load(`src/i18n/${c}.js`);
  const cm = await load(`src/i18n/c/${c}.js`);
  for (const k of Object.keys(en.ui)) if (!(k in m.ui)) errs.push(`ui.${k} missing`);
  for (const k of Object.keys(m.ui)) if (!(k in en.ui)) errs.push(`ui.${k} is not in English`);
  for (const k of Object.keys(en.home)) if (!(k in m.home)) errs.push(`home.${k} missing`);
  if (!Array.isArray(m.faq)) errs.push('faq missing');
  for (const k of Object.keys(cen)) !(k in cm) ? errs.push(`c.${k} missing`) : cmp(cen[k], cm[k], `c.${k}`, errs);
  // placeholders such as {brand} must survive translation
  const fe = new Map(flat(cen.pages)), fm = new Map(flat(cm.pages));
  for (const [p, s] of fe) for (const tok of s.match(/\{\w+\}/g) || []) if (!(fm.get(p) || '').includes(tok)) errs.push(`c.pages${p}: placeholder ${tok} lost`);
  if (errs.length) { failures++; console.log(`✗ ${c}\n  ${errs.slice(0, 15).join('\n  ')}`); } else console.log(`✓ ${c}`);
}
process.exit(failures ? 1 : 0);
