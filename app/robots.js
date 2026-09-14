// output: export requires these route handlers to be explicitly static.
export const dynamic = 'force-static';

import site from '../data/site.json';

/** /specimen is the internal type specimen, not public-facing content. */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/specimen'] }],
    sitemap: new URL('/sitemap.xml', site.domain).href,
  };
}
