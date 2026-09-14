/** @type {import('next').NextConfig} */
// Static export: every page prerendered to out/. No server runtime.
// REDIRECTS: none yet. Before adding any route, grep this file for a rule that would
// shadow it. Redirects run before pages. Use :path+ (not :path*) when the base path is a real page.
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
};
module.exports = nextConfig;
