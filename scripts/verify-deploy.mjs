/* Check a deployed URL for references the server does not actually have.
   node scripts/verify-deploy.mjs https://illicitshadows.vercel.app /film /museum
   Fetches each page, collects every image URL including srcset candidates, and HEADs them. */
const base = process.argv[2];
if (!base) { console.error('usage: node scripts/verify-deploy.mjs <base-url> [routes...]'); process.exit(1); }
const routes = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
let missing = 0, checked = 0;
for (const route of routes) {
  const html = await (await fetch(new URL(route, base))).text();
  const urls = new Set();
  for (const m of html.matchAll(/(?:src|srcSet|srcset|href)="([^"]+\.(?:jpg|png|webp|svg)[^"]*)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u && !u.startsWith('data:')) urls.add(u);
    }
  }
  for (const u of urls) {
    const res = await fetch(new URL(u, base), { method: 'HEAD' });
    checked++;
    if (!res.ok) { missing++; console.log(`  ${res.status}  ${route}  ${u}`); }
  }
}
console.log(missing ? `\n  ${missing} of ${checked} asset(s) missing on the server.`
                    : `\n  all ${checked} assets present on the server.`);
