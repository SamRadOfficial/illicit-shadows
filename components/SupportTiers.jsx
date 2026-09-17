import site from '../data/site.json';

/**
 * Giving tiers as Stripe Payment Links. Hosted checkout, no server, which is what a static export
 * can support: each tier is a URL Stripe generates, pasted into `site.support.tiers`.
 *
 * Until those URLs exist this renders nothing at all, rather than buttons that lead nowhere. The
 * enquiry CTA beside it keeps working either way, so the section is never broken, only quieter.
 */
export function SupportTiers() {
  const tiers = (site.support?.tiers || []).filter(t => t.url);
  /* Stripe's "customers choose what to pay" link, for anyone whose number is not on the list.
     It sits last because a set amount is the easier decision. */
  const custom = site.support?.custom?.url ? site.support.custom : null;
  if (!tiers.length && !custom) return null;
  return (
    <div className="support">
      <div className="tiers">
        {tiers.map(t => (
          <a className="tier is-live" href={t.url} key={t.label} target="_blank" rel="noopener noreferrer">
            <b>{t.label}</b><span>{t.name}</span>
          </a>
        ))}
        {custom && (
          <a className="tier is-live is-custom" href={custom.url} target="_blank" rel="noopener noreferrer">
            <b>{custom.label}</b><span>Any amount</span>
          </a>
        )}
      </div>
      {site.support?.note && <p className="fine support-note">{site.support.note}</p>}
    </div>
  );
}
