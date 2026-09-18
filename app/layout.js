import '../styles/site.css';
import site from '../data/site.json';
import { Nav, Footer } from '../components/Blocks';
import { SupportBand } from '../components/SupportBand';
import { Analytics } from '../components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  metadataBase: new URL(site.domain),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  title: { default: 'Illicit Shadows', template: '%s · Illicit Shadows' },
  description: site.boilerplate,   // fallback only: every page sets its own
  openGraph: { siteName: 'Illicit Shadows', type: 'website', images: [{ url: '/og/home.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/og/home.jpg'] },
};
export const viewport = { themeColor: '#000000' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main id="top">{children}</main>
        <SupportBand />
        <Footer site={site} />
        {/* Vercel's own analytics need no configuration and set no cookies; they are enabled per
            project in the Vercel dashboard. Google Analytics loads only when a measurement ID is
            set and only on the live domain. */}
        <VercelAnalytics />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
