import Link from 'next/link';
import { Pic } from './Blocks';
import { Arrow } from './Icons';

/**
 * MISTIC, three ways in. Shared by home and /about. Whole panel is the link (one link, no nested
 * interactive children), the action word is the heading, the product is the entry label.
 */
const PILLARS = [
  { n: '01 / Media', action: 'Watch', href: '/film', image: '/images/dividers/film-field-investigations',
    alt: 'A documentary camera and field notebook at a port',
    copy: 'Follow the drugs, money, and people moving through the global shadow economy.', entry: 'Illicit Shadows films' },
  { n: '02 / Knowledge', action: 'Explore', href: '/museum', image: '/images/museum-rotunda',
    alt: 'The Eclipse Rotunda: a suspended globe of illuminated trade routes',
    copy: 'Discover how illicit markets connect, and what they leave behind.', entry: 'Museum of Illicit Shadows' },
  { n: '03 / Intelligence', action: 'Model', href: '/intelligence', image: '/images/dividers/intelligence-network-analysis',
    alt: 'An evidence wall of port photographs linked by gold string',
    copy: 'Examine how criminal, political, and economic networks adapt under pressure.', entry: 'Project Helix' },
];

export function Pillars({ compact = false }) {
  return (
    <>
      {!compact && (
        <div className="intro">
          <div><span className="kicker">MISTIC</span><h2>One platform.<br /><em>Three ways in.</em></h2></div>
          <p>Field investigations, public knowledge, and predictive intelligence. Three ways to understand the networks shaping our world.</p>
        </div>
      )}
      <div className="pillar-grid">
        {PILLARS.map(p => (
          <Link className="pillar" href={p.href} key={p.href}>
            <span className="kicker">{p.n}</span>
            <Pic base={p.image} alt={p.alt} />
            <h3>{p.action}{Arrow.upRight}</h3>
            <p>{p.copy}</p>
            <span className="entry">{p.entry}</span>
          </Link>
        ))}
      </div>
      {!compact && <p className="fine platform-exp">Illicit Shadows Media, Technology &amp; Innovation Convergence</p>}
    </>
  );
}
