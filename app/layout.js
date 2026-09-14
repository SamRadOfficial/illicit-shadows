import '../styles/site.css';
import site from '../data/site.json';
import { Nav, Footer, Reveal } from '../components/Blocks';

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
      <head>
        {/* Set before paint so .reveal can hide without a flash. If JS never runs, content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.className+=' js'" }} />
      </head>
      <body>
        <Nav />
        <main id="top">{children}</main>
        <Footer site={site} />
        <Reveal />
      </body>
    </html>
  );
}
