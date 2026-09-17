/** @type {import('next').NextConfig} */
// Two build modes, one codebase:
//   next build            -> .next  (what Vercel's Next.js builder expects; all pages are still
//                                    prerendered to static HTML because every route is SSG)
//   EXPORT=1 next build   -> out/   (a flat static export, used ONLY by the local tooling:
//                                    preview.py, mobile.py, check-assets.mjs, screenshot.py)
// Do NOT set output:'export' unconditionally. Vercel then looks for .next/routes-manifest.json,
// fails the build, and (if outputDirectory is forced to out/) 404s every route.
const isExport = process.env.EXPORT === '1';

const nextConfig = {
  ...(isExport ? { output: 'export' } : {}),
  trailingSlash: false,
  images: { unoptimized: true },
  // REDIRECTS. Before adding a route, check here for a rule that would shadow it.
  // Note: redirects do NOT run in the static export (EXPORT=1), only on Vercel. That is fine for
  // renames like this one; anything load-bearing must not depend on them.
  async redirects() {
    return [
      { source: '/newsroom/production-begins-fentanyl-cartels',
        destination: '/newsroom/production-begins-chemical-cartels', permanent: true },
    ];
  },
};
module.exports = nextConfig;
