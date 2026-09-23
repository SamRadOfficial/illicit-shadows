import Link from 'next/link';
import { Pic } from './Blocks';
import { Arrow } from './Icons';

/**
 * MISTIC, three ways in. Shared by home and /about. Whole panel is the link (one link, no nested
 * interactive children). The triad word is the heading, the product is the stamp above it.
 */
const PILLARS = [
  { n: '01 / Field investigations', action: 'Media', href: '/film', image: '/images/dividers/film-field-investigations',
    alt: 'A documentary camera and field notebook at a port', label: 'Find the story',
    copy: 'Films reported from the field. Follow the data trails, illicit pathways, and dirty money flows behind the global illicit economy.' },
  { n: '02 / Museum of Illicit Shadows', action: 'Knowledge', href: '/museum', image: '/images/museum-exterior',
    alt: 'The Museum of Illicit Shadows at night, a gold eclipse ring at the entrance', label: 'Discover the connections',
    copy: 'A first-of-its-kind virtual museum on the harms of crime convergence and illicit economies to communities and international security.' },
  { n: '03 / Project Helix', action: 'Intelligence', href: '/intelligence', image: '/images/dividers/intelligence-network-analysis',
    alt: 'An evidence wall of port photographs linked by gold string', label: 'Model what comes next',
    copy: 'Turns fragmented intelligence into systemic foresight: how criminal, political, and economic networks reorganize after a disruption.' },
];

export function Pillars({ compact = false }) {
  return (
    <>
      {!compact && (
        <div className="intro">
          <div><span className="kicker">Fighting networks with networks</span><h2>One platform.<br /><em>Three ways in.</em></h2></div>
        </div>
      )}
      <div className="pillar-grid">
        {PILLARS.map(p => (
          <Link className="pillar" href={p.href} key={p.href}>
            <span className="kicker">{p.n}</span>
            <Pic base={p.image} alt={p.alt} />
            <h3>{p.action}{Arrow.upRight}</h3>
            <p className="pillar-label">{p.label}</p>
            <p>{p.copy}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
