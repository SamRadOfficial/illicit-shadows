'use client';
import { useState } from 'react';
import { Pic } from './Blocks';
import halls from '../data/halls.json';

const IMG = { '01': 'narcotics', '02': 'theater', '03': 'fakes', '04': 'environmental', '05': 'history', 'CENTER': 'rotunda',
  '06': 'trafficking', '07': 'convergence', '08': 'corruption', '09': 'antiquities', '10': 'tobacco', '11': 'cybercrime' };

/** Phase toggle over the planned halls. Renderings are concepts and the caption says so. */
export function HallsEd() {
  const [phase, setPhase] = useState(1);
  const group = halls.find(h => h.phase === phase);
  return (
    <>
      <div className="intro">
        <div><span className="kicker">The collection / Planned exhibition halls</span><h2>Choose a way <em>inside.</em></h2></div>
        <div className="phase" role="group" aria-label="Exhibition phase">
          {halls.map(h => (
            <button type="button" key={h.phase} aria-pressed={phase === h.phase} onClick={() => setPhase(h.phase)}>
              Phase {h.phase === 1 ? 'I' : 'II'} · {h.year}
            </button>
          ))}
        </div>
      </div>
      <p className="fine" style={{ marginBottom: 24 }}>{group.level}: {group.halls.length} spaces{phase === 1 ? ', including the central rotunda' : ''}.</p>
      <div className="halls-ed">
        {group.halls.map(h => (
          <article className="hall-ed" key={h.n}>
            <Pic base={`/images/halls/${IMG[h.n]}`} alt={`${h.title} exhibition concept`} />
            <span className="kicker">{h.n === 'CENTER' ? 'At the center' : `Hall ${h.n}`}</span>
            <h3>{h.title}</h3>
          </article>
        ))}
      </div>
      <p className="fine">Exhibition renderings are concepts, not photographs of a built space.</p>
    </>
  );
}
