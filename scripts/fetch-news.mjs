/**
 * Refresh the newsroom from the two sources that publish it.
 *   node scripts/fetch-news.mjs
 *
 * ICAIE is WordPress, so its RSS feed at /feed/ is the source of truth; the HTML listing at
 * /latest-news/ is the fallback if the feed is unavailable. Illicit Shadows' Squarespace site
 * exposes RSS at /news?format=rss. Items are written to data/newsroom-icaie.json and merged into
 * data/newsroom.json (hand-written entries there are kept; fetched ones are keyed by URL).
 *
 * Runs on a schedule in .github/workflows/news.yml and commits when the JSON changes, which
 * triggers a Vercel deploy. Nothing on the site fetches at request time: it is a static export.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const UA = 'IllicitShadowsNewsroom/1.0 (+https://illicitshadows.com)';
const get = async (url) => {
  const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/rss+xml, text/xml, text/html' } });
  if (!r.ok) throw new Error(`${url} ${r.status}`);
  return r.text();
};
const clean = s => (s || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&')
  .replace(/&#8217;|&#039;|&rsquo;/g, "'").replace(/&#8220;|&#8221;|&quot;/g, '"').replace(/\s*(&#8211;|&#8212;|–|—)\s*/g, ', ')
  .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const iso = d => { const t = new Date(d); return isNaN(t) ? null : t.toISOString().slice(0, 10); };
const tag = (xml, name) => (xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)) || [])[1];

// RSS 2.0 (WordPress and Squarespace both emit it).
function parseRss(xml, source) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
    const it = m[1];
    // Cut at the last full sentence inside 240 characters; if there is none, at a word, with an
    // ellipsis, so a truncation never masquerades as a sentence.
    const full = clean(tag(it, 'description'));
    let summary = full;
    if (full.length > 240) {
      const head = full.slice(0, 240);
      const end = Math.max(head.lastIndexOf('. '), head.lastIndexOf('.'));
      summary = end > 60 ? head.slice(0, end + 1) : head.replace(/\s\S*$/, '') + '\u2026';
    }
    return { source, kind: source === 'icaie' ? 'press' : 'dispatch', date: iso(tag(it, 'pubDate')),
             title: clean(tag(it, 'title')), summary,
             url: clean(tag(it, 'link')), external: true };
  }).filter(x => x.title && x.url && x.date);
}

// Fallback for ICAIE only, against the listing markup observed on 15 Sep 2026: an <a href title>
// wrapper, an <h3>, then a "Month D, YYYY" line.
function parseIcaieHtml(html) {
  const out = [];
  const re = /<a href="(https:\/\/icaie\.com\/\d{4}\/\d{2}\/[^"]+)"[^>]*title="([^"]+)"[\s\S]*?<h3>[\s\S]*?<\/h3>\s*([A-Z][a-z]+ \d{1,2}, \d{4})/g;
  for (const m of html.matchAll(re)) out.push({ source: 'icaie', kind: 'press', date: iso(m[3]), title: clean(m[2]), summary: '', url: m[1], external: true });
  return out;
}

async function icaie() {
  try { return parseRss(await get('https://icaie.com/feed/'), 'icaie'); }
  catch (e) { console.warn('ICAIE feed failed, falling back to HTML:', e.message); return parseIcaieHtml(await get('https://icaie.com/latest-news/')); }
}
async function own() {
  try { return parseRss(await get('https://illicitshadows.com/news?format=rss'), 'illicit-shadows'); }
  catch (e) { console.warn('Illicit Shadows feed unavailable:', e.message); return []; }
}

const byDate = (a, b) => (b.date || '').localeCompare(a.date || '');
const dedupe = list => { const seen = new Set(); return list.filter(x => !seen.has(x.url) && seen.add(x.url)); };

const [ic, is] = await Promise.all([icaie(), own()]);
if (ic.length) writeFileSync('data/newsroom-icaie.json', JSON.stringify(dedupe(ic).sort(byDate), null, 2) + '\n');
const existing = JSON.parse(readFileSync('data/newsroom.json', 'utf8'));
const manual = existing.filter(x => !x.fetched);
const merged = dedupe([...manual, ...is.map(x => ({ ...x, fetched: true }))]).sort(byDate);
writeFileSync('data/newsroom.json', JSON.stringify(merged, null, 2) + '\n');
console.log(`ICAIE ${ic.length} items, Illicit Shadows ${is.length} fetched + ${manual.length} manual`);
