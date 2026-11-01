import { readFileSync } from 'node:fs';
import sharp from 'sharp';

// Your own logos (branding/custom-logos/index.json + the image files) as [title, dataUrl, keywords], served as a static
// file for the logo search in the generator. Each one is fitted into a 320 px square so it works with every logo shape.
export const prerender = true;
export async function GET() {
  const meta = JSON.parse(readFileSync('branding/custom-logos/index.json', 'utf8'));
  const list = await Promise.all(meta.map(async m => {
    const png = await sharp(readFileSync(`branding/custom-logos/${m.file}`), { density: 300 })
      .resize(320, 320, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer();
    return [m.title, 'data:image/png;base64,' + png.toString('base64'), m.keywords || ''];
  }));
  return new Response(JSON.stringify(list), { headers: { 'Content-Type': 'application/json' } });
}
