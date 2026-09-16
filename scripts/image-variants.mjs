/* Scan public/images for responsive variants and write the manifest Pic reads.
   Run automatically before every build. If a variant is missing from the repo, it is simply not
   listed, so the site falls back to the full-size file rather than requesting a 404. */
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const PUB = 'public/images';
const WIDTHS = [640, 1024, 1600];
const found = {};

const walk = dir => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    const m = entry.name.match(/^(.+)-(\d+)\.webp$/);
    if (!m || !WIDTHS.includes(Number(m[2]))) continue;
    const base = '/' + join(dir, m[1]).replace(/^public\//, '');
    // Only count a width when both the WebP and its JPEG fallback are present.
    if (!existsSync(join(dir, `${m[1]}-${m[2]}.jpg`))) continue;
    (found[base] ||= []).push(Number(m[2]));
  }
};
walk(PUB);
for (const k of Object.keys(found)) found[k].sort((a, b) => a - b);
writeFileSync('data/image-variants.json', JSON.stringify(found, null, 2) + '\n');
console.log(`  image variants: ${Object.keys(found).length} image(s) with responsive sizes`);
