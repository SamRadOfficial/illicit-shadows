import { SectionHead } from './Blocks';

/**
 * The convergence map: one infographic, used on every pillar page, because the argument it makes
 * is the argument the whole platform makes. Shared so the caption and framing cannot drift.
 *
 * It is an SVG (3000x3200, text as real text, no embedded rasters), so it stays sharp at any size
 * and is a single ~34KB gzipped request. Rendered through <img> rather than inlined: it carries its
 * own <title> and <desc>, and inlining it four times would put the same 220KB in four pages.
 */
export function Convergence({ head = true, label = 'Everything is connected', meta = 'CRIME CONVERGENCE', lede }) {
  return (
    <>
      {head && <SectionHead label={label} meta={meta} />}
      {lede && <p className="conv-lede">{lede}</p>}
      <figure className="convfig">
        {/* Scroll wrapper: at 390px the whole map is 352px wide and its body text renders at about
            three pixels. Below 820px it holds a minimum width and pans instead of shrinking. */}
        <div className="convscroll">
          <img src="/images/convergence-map.svg" alt="Everything is connected: five overlapping domains of crime convergence, economic development and human security, societal trust and integrity, governance and democracy, environment security and global threats, and criminal activities, meeting at the center." loading="lazy" width="3000" height="3200" />
        </div>
        <figcaption><a href="/images/convergence-map.svg" target="_blank" rel="noopener noreferrer">Open full size</a></figcaption>
      </figure>
    </>
  );
}
