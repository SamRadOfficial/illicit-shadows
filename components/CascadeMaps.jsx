'use client';
import { useState } from 'react';

/**
 * The cascade as five maps rather than four lines of text. Stepper, not carousel: the sequence is
 * the argument, so the reader should always see which stage they are on and how many remain.
 *
 * Every stage keeps the ILLUSTRATIVE MODEL chip. The maps name real cities, and without that label
 * a demonstration reads as an allegation. The caveat under the maps is not decoration either: the
 * timings come from the worked example, not from observed events.
 */
const STAGES = [
  { n: 0, file: '00-trigger',  label: 'Trigger',    lag: 'Day 0',
    what: 'Contraband is interdicted at Rotterdam.',
    why: 'One seizure at one port. Everything that follows is what the model expects the network to do about it.' },
  { n: 1, file: '01-routes',   label: 'Routes',     lag: 'Day 0',
    what: 'Volume shifts to Antwerp and Hamburg.',
    why: 'The shipment still has to land, so it moves to the next-nearest port with capacity.' },
  { n: 2, file: '02-entities', label: 'Entities',   lag: '+11 days',
    what: 'Shell registrations spike in Lisbon, the Caribbean, offshore.',
    why: 'New corridors need new invoicing entities before the next load moves.' },
  { n: 3, file: '03-property', label: 'Property',   lag: '+3 months',
    what: 'Real-estate cash purchases rise in London, Miami, Dubai.',
    why: 'Proceeds have to leave the trade and enter something that holds value.' },
  { n: 4, file: '04-influence', label: 'Influence', lag: '+12 months',
    what: 'Political funding anomalies appear in the EU and North America.',
    why: 'Protection of the new route is cheaper than losing it again.' },
];

export function CascadeMaps() {
  const [i, setI] = useState(0);
  const s = STAGES[i];
  return (
    <div className="cmaps">
      {/* No label row and no caption here: each map already carries the HELIX.AI header, the
          ILLUSTRATIVE MODEL chip, its own stage strip and its own explanatory panel. Repeating
          them in site chrome was saying everything twice. */}
      <figure className="cmaps-fig">
        {/* Each stage is its own SVG rather than one animated map: a static frame can be read,
            screenshotted and argued with. */}
        <img src={`/images/cascade/${s.file}.svg`} alt={`Stage ${s.n}, ${s.label}: ${s.what}`}
             width="1600" height="1000" loading={i === 0 ? 'eager' : 'lazy'} />
        {/* The maps draw their own timeline across the bottom. Rather than repeat it in HTML, put
            real buttons over it: the chips sit at x=60,359,658,957,1256, y=878, 281x67 in a
            1600x1000 viewBox, so the percentages below track the image at any width. */}
        <div className="cmaps-hit">
          {STAGES.map((x, n) => (
            <button type="button" key={x.file} onClick={() => setI(n)}
                    className={n === i ? 'on' : undefined}
                    aria-current={n === i ? 'step' : undefined}
                    aria-label={`Stage ${n}, ${x.label}, ${x.lag}`}
                    style={{ left: `${(60 + n * 299) / 16}%`, width: `${281 / 16}%` }} />
          ))}
        </div>
      </figure>

      <div className="cmaps-nav">
        <button type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>&larr; Previous</button>
        <span className="cmaps-count">{i + 1} of {STAGES.length}</span>
        <button type="button" onClick={() => setI(Math.min(STAGES.length - 1, i + 1))} disabled={i === STAGES.length - 1}>Next &rarr;</button>
      </div>

      <p className="cfoot">The chain is the claim: disruption does not remove the trade, it moves
        it, and each move surfaces in different data.</p>
    </div>
  );
}
