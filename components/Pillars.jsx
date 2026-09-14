import Link from 'next/link';
import { Pic } from './Blocks';

/**
 * MISTIC, the three pillars, as image-led panels. One component, used by home and /about, so the
 * platform is described the same way in both places: it drifted last time it was written twice.
 *
 * Deliberately one link per panel, at the foot. A card-wide link with a link inside it is invalid
 * and unusable with a screen reader, and this panel has a heading, a status line and an action.
 */
const PILLARS = [
  {
    n: '01', kind: 'Media', action: 'Watch', name: 'Illicit Shadows',
    image: '/images/dividers/film-field-investigations', pos: 'center',
    alt: 'A documentary camera and field notebook on a table at a port',
    copy: 'Documentary-grade journalism exposing the shadow systems that move drugs, money, weapons, and humans across borders.',
    status: 'First film released · YouTube',
    cta: 'Watch the investigations', href: '/film',
  },
  {
    n: '02', kind: 'Knowledge Hub', action: 'Explore', name: 'Museum of Illicit Shadows',
    image: '/images/museum-rotunda', pos: 'center',
    alt: 'The Eclipse Rotunda: a suspended globe of illuminated trade routes above a circular gallery',
    copy: 'A virtual museum cataloging crime convergence through research, exhibitions, and public programming.',
    status: 'MIS · Est 2025 · Phase I opens 2027',
    cta: 'Explore the museum', href: '/museum',
  },
  {
    n: '03', kind: 'Intelligence', action: 'Model', name: 'Project Helix',
    image: '/images/dividers/intelligence-network-analysis', pos: 'center',
    alt: 'An evidence wall of port photographs linked by gold string',
    copy: 'Modeling how illicit networks reorganize after disruption. Strategic foresight, not discrete event forecasting.',
    status: 'Predictive convergence system',
    cta: 'Discover Project Helix', href: '/intelligence',
  },
];

export function Pillars({ intro }) {
  return (
    <>
      <div className="mistichead">
        <div>
          <p className="eyebrow">One platform &middot; Three pillars</p>
          <h2 className="misticname">MISTIC</h2>
          <p className="misticexp">Illicit Shadows Media, Technology &amp; Innovation Convergence</p>
        </div>
        {intro && <p className="misticintro">{intro}</p>}
      </div>

      {/* The connector is decoration, not information: the panels below say the same thing in
          words, so it is hidden from assistive technology. */}
      <div className="pconnect" aria-hidden="true"><span className="pline" /><span className="pnode" /><span className="pnode" /><span className="pnode" /></div>

      <div className="ppanels">
        {PILLARS.map(p => (
          <article className="ppanel" key={p.n}>
            <div className="ppanel-img"><Pic base={p.image} alt={p.alt} pos={p.pos} /></div>
            <div className="ppanel-body">
              <p className="ppanel-k">{p.n} &middot; {p.kind}</p>
              <p className="ppanel-a">{p.action}</p>
              <h3 className="ppanel-t">{p.name}</h3>
              <p className="ppanel-c">{p.copy}</p>
              <p className="ppanel-s">{p.status}</p>
              <Link className="ppanel-cta" href={p.href}>{p.cta} &rarr;</Link>
            </div>
          </article>
        ))}
      </div>

      <p className="pconnected">Everything is connected.</p>
      <p className="pfiction">Also from Illicit Shadows: <Link href="/books">The Umbra Circle</Link> &middot; Fiction</p>
    </>
  );
}
