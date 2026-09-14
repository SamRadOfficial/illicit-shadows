import films from '../data/films.json';
// output: export requires these route handlers to be explicitly static.
export const dynamic = 'force-static';

import site from '../data/site.json';

/** Static sitemap. Next writes sitemap.xml into the export. Add a route here when you add a page. */
const ROUTES = ['', '/film', '/intelligence', '/museum', '/museum/enter', '/books', '/books/preview', '/newsroom',
                '/about', '/contact', '/sources'];

export default function sitemap() {
  const now = new Date();
  return [
    ...ROUTES.map(r => ({ url: new URL(r || '/', site.domain).href, lastModified: now,
                          priority: r === '' ? 1 : 0.8 })),
    ...films.map(f => ({ url: new URL(`/film/${f.slug}`, site.domain).href, lastModified: now,
                         priority: 0.9 })),
  ];
}
