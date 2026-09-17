import films from '../data/films.json';
import news from '../data/newsroom.json';
// output: export requires these route handlers to be explicitly static.
export const dynamic = 'force-static';

import site from '../data/site.json';

/** Static sitemap. Next writes sitemap.xml into the export. Add a route here when you add a page. */
const ROUTES = ['', '/film', '/intelligence', '/museum', '/museum/enter', '/books', '/books/preview', '/newsroom',
                '/about', '/contact', '/sources', '/donate'];

export default function sitemap() {
  const now = new Date();
  return [
    ...ROUTES.map(r => ({ url: new URL(r || '/', site.domain).href, lastModified: now,
                          priority: r === '' ? 1 : 0.8 })),
    ...news.filter(n => n.slug && n.body).map(n => ({
      url: new URL(`/newsroom/${n.slug}`, site.domain).href, lastModified: now,
      changeFrequency: 'yearly', priority: 0.5 })),
    ...films.map(f => ({ url: new URL(`/film/${f.slug}`, site.domain).href, lastModified: now,
                         priority: 0.9 })),
    // One entry per short film. These are the pages carrying the narration text.
    ...films.flatMap(f => (f.segments || []).filter(s => s.slug).map(s => ({
      url: new URL(`/film/${f.slug}/${s.slug}`, site.domain).href, lastModified: now, priority: 0.7,
    }))),
  ];
}
