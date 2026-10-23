import * as icons from 'simple-icons';

// Every Simple Icons brand as [title, hex, path], served as a static file for the logo search in the generator.
export const prerender = true;
export function GET() {
  const list = Object.values(icons).filter(i => i && i.path && i.hex).map(i => [i.title, i.hex, i.path]);
  return new Response(JSON.stringify(list), { headers: { 'Content-Type': 'application/json' } });
}
