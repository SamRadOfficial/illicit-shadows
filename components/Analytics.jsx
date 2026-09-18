'use client';
import Script from 'next/script';
import site from '../data/site.json';

/**
 * Google Analytics 4.
 *
 * Two deliberate choices:
 *
 * 1. **It only loads in production, on the real domain.** A static export runs identically in a
 *    local preview and on the Vercel preview host, so without this check every page I open while
 *    working would be counted as a visit. The host test is the reliable one: NODE_ENV is
 *    'production' in a local `npm run check` too.
 *
 * 2. **IP anonymisation is on and ad personalisation signals are off.** The site's readers include
 *    people researching organized crime; sending less about them is the right default, and it keeps
 *    the property simpler under GDPR. Turn these off only with a reason.
 *
 * With no `site.analytics.ga4` set, this renders nothing at all.
 */
export function Analytics() {
  const id = site.analytics?.ga4;
  if (!id) return null;
  return (
    <>
      <Script id="ga-loader" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="ga-init" strategy="afterInteractive">{`
        if (location.hostname === '${new URL(site.domain).hostname}') {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
        }
      `}</Script>
    </>
  );
}
