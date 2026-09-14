import '../styles/site.css';
import site from '../data/site.json';
import { Nav, Footer } from '../components/Blocks';

export const metadata = {
  metadataBase: new URL(site.domain),
  title: { default: 'Illicit Shadows', template: '%s — Illicit Shadows' },
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
        <Footer site={site} />
      </body>
    </html>
  );
}
