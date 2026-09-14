import { SectionHead } from './Blocks';

/**
 * The convergence map: one infographic, used on every pillar page, because the argument it makes
 * is the argument the whole platform makes. Shared so the caption and framing cannot drift.
 *
 * It is an SVG (2400x1800, text as real text, no embedded rasters), so it stays sharp at any size
 * and is a single ~34KB gzipped request. Rendered through <img> rather than inlined: it carries its
 * own <title> and <desc>, and inlining it four times would put the same 220KB in four pages.
 */
export function Convergence({ head = true, label = 'Everything is connected', meta = 'CRIME CONVERGENCE', lede }) {
  return (
    <>
      {head && <SectionHead label={label} meta={meta} />}
      {lede && <p className="conv-lede">{lede}</p>}
      <figure className="convfig">
        <img src="/images/convergence-map.svg" alt="Impacts of illicit economies: five domains of crime convergence, from economic development and human security to governance, the environment, societal trust, and criminal activity." loading="lazy" width="2400" height="1800" />
        <figcaption>Illicit economies of the Shadowverse &middot; <b>#EverythingIsConnected</b></figcaption>
      </figure>
    </>
  );
}
