// Audits every asset reference in the built site against public/. Fails on any miss.
// Covers <img src>, <source srcSet>, srcset, href to /images|/logos|/fonts|/video,
// CSS url() in the built stylesheets, and <video>/<source src>. All of these fail silently.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const OUT = 'out', PUB = 'public';
const walk = (d, o = []) => { for (const e of readdirSync(d)) { const p = join(d, e); statSync(p).isDirectory() ? walk(p, o) : o.push(p); } return o; };
const ASSET = '\\/(?:images|logos|fonts|video)\\/[^"\')\\s,]+';
const refs = new Set();
for (const f of walk(OUT).filter(p => p.endsWith('.html'))) {
  const h = readFileSync(f, 'utf8');
  for (const m of h.matchAll(new RegExp(`(?:src|href|srcSet|srcset)="(${ASSET})"`, 'g'))) refs.add(m[1]);
  // A srcset holds several candidates with width descriptors; the single-value pattern above
  // misses every one of them, so a missing responsive file 404s in silence.
  for (const m of h.matchAll(/(?:srcSet|srcset)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url && !url.startsWith('data:')) refs.add(url);
    }
  }
  for (const m of h.matchAll(new RegExp(`url\\(["']?(${ASSET})["']?\\)`, 'g'))) refs.add(m[1]);
}
for (const f of walk(OUT).filter(p => p.endsWith('.css'))) {
  for (const m of readFileSync(f, 'utf8').matchAll(new RegExp(`url\\(["']?(${ASSET})["']?\\)`, 'g'))) refs.add(m[1]);
}
const missing = [...refs].filter(r => !existsSync(join(PUB, r.split('?')[0])));
if (missing.length) {
  console.error(`\n  ${missing.length} asset reference(s) point at files that do not exist:\n`);
  for (const m of missing) console.error('   ' + m);
  console.error('\n  A missing <source> or url() renders nothing. Fix before pushing.\n'); process.exit(1);
}
console.log(`  assets ok — ${refs.size} references, all present`);
