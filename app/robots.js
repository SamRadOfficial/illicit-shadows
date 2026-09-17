// output: export requires these route handlers to be explicitly static.
export const dynamic = 'force-static';

import site from '../data/site.json';

/**
 * /specimen is the internal type specimen, not public-facing content.
 *
 * The preview host (illicitshadows.vercel.app) is kept out of the index by a header rule in
 * vercel.json rather than here: robots.txt is one static file and cannot vary by host, and a
 * duplicate of the whole site competing with the real domain is worse than no preview at all.
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/specimen'] }],
    sitemap: new URL('/sitemap.xml', site.domain).href,
  };
}
