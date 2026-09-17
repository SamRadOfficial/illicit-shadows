import '../styles/site.css';
import site from '../data/site.json';
import { Nav, Footer } from '../components/Blocks';
import { SupportBand } from '../components/SupportBand';

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
  description: site.boilerplate,
  openGraph: { siteName: 'Illicit Shadows', type: 'website' },
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
      </body>
    </html>
  );
}
