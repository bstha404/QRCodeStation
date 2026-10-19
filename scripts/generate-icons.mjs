// Builds every icon and the share image from branding/logo.svg.
// Run: npm run icons
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { QrCode } from '../src/lib/qrcodegen.js';
import { buildSvg, DESIGN_DEFAULTS } from '../src/lib/render.js';

const GREEN = '#8EE36A';
const logo = await readFile('branding/logo.svg');
const out = (f) => `public/${f}`;
const render = (size, density = 600) => sharp(logo, { density }).resize(size, size).png();

// Browser favicons: the logo as drawn (transparent rounded corners)
await copyFile('branding/logo.svg', out('favicon.svg'));
const sizes = [16, 32, 48];
const buffers = await Promise.all(sizes.map(s => render(s).toBuffer()));
await writeFile(out('favicon-16x16.png'), buffers[0]);
await writeFile(out('favicon-32x32.png'), buffers[1]);
await writeFile(out('favicon.ico'), await pngToIco(buffers));

// "Any" install icons
await render(192).toFile(out('icon-192.png'));
await render(512).toFile(out('icon-512.png'));

// Full-bleed icons: iOS rounds the corners itself, and Android masks "maskable" icons.
// The mark sits in the middle ~57% of the logo, well inside the 80% safe zone.
const bleed = async (size, file) => {
  const mark = await render(size).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: GREEN } })
    .composite([{ input: mark }]).png().toFile(out(file));
};
await bleed(180, 'apple-touch-icon.png');
await bleed(512, 'icon-maskable-512.png');

// Share image (1200 × 630)
const qr = QrCode.encodeText('https://qrcodestation.com', QrCode.Ecc.MEDIUM);
const qrSvg = buildSvg(qr, { ...DESIGN_DEFAULTS, body: 'dots', frame: 'rounded', ball: 'rounded', border: 2 }, 360);
const qrPng = await sharp(Buffer.from(qrSvg), { density: 300 }).resize(360, 360).png().toBuffer();
const mark = await render(72).toBuffer();
const font = "Helvetica Neue, Helvetica, Arial, sans-serif";
const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b2a1b"/><stop offset="1" stop-color="#0b0d0c"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="170" y="136" font-family="${font}" font-weight="700" font-size="36" fill="#ffffff">QR Code Station</text>
  <text x="80" y="295" font-family="${font}" font-weight="700" font-size="64" fill="#ffffff">Free QR code</text>
  <text x="80" y="365" font-family="${font}" font-weight="700" font-size="64" fill="#ffffff">generator</text>
  <text x="80" y="440" font-family="${font}" font-weight="700" font-size="64" fill="${GREEN}">with your logo.</text>
  <text x="80" y="520" font-family="${font}" font-size="26" fill="#b9c4bb">PNG · SVG · JPG · WebP — never expires</text>
  <rect x="720" y="115" width="400" height="400" rx="26" fill="#ffffff"/>
</svg>`;
await sharp(Buffer.from(text))
  .composite([{ input: mark, left: 80, top: 90 }, { input: qrPng, left: 740, top: 135 }])
  .png().toFile(out('og-image.png'));

console.log('Icons written to public/: favicon.svg, favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-512.png, og-image.png');
