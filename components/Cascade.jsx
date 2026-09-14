import { Prov } from './Blocks';

/**
 * Cascade. The point is the chain, not the list: an interdiction moves the route, the route
 * moves the money, the money surfaces as property and then as politics. Each step states what
 * moves and why it follows, so a reader can see the mechanism rather than take it on faith.
 *
 * Always carries the illustrative chip. This is a modeled scenario, not a reported event, and
 * losing that label would turn a demonstration into an allegation about named cities.
 */
const STEPS = [
  { lag: 'Day 0', what: 'Route shifts to Antwerp and Hamburg',
    why: 'The shipment still has to land, so volume moves to the next-nearest port with capacity.' },
  { lag: '+11d', what: 'Shell registrations spike in Lisbon, the Caribbean, offshore',
    why: 'New corridors need new invoicing entities before the next load moves.' },
  { lag: '+3mo', what: 'Real-estate cash purchases rise in London, Miami, Dubai',
    why: 'Proceeds have to leave the trade and enter something that holds value.' },
  { lag: '+12mo', what: 'Political funding anomalies appear in the EU and North America',
    why: 'Protection of the new route is cheaper than losing it again.' },
];

export function Cascade({ compact = false }) {
  return (
    <div className="cascade">
      <div className="ch">
        <span>CASCADE PREDICTION{compact ? '' : ' · WORKED EXAMPLE'}</span>
        <Prov status="illustrative">illustrative model</Prov>
      </div>
      <p className="ctrigger"><span className="ck">TRIGGER</span>Contraband is interdicted at Rotterdam.</p>
      <ol className="cchain">
        {STEPS.map((s, i) => (
          <li className="cstep" key={s.what}>
            <span className="cnum">{String(i + 1).padStart(2, '0')}</span>
            <span className="clag">{s.lag}</span>
            <span className="cbody">
              <span className="cwhat">{s.what}</span>
              {!compact && <span className="cwhy">{s.why}</span>}
            </span>
          </li>
        ))}
      </ol>
      <p className="cfoot">Each step is what the model expects the network to do next, not a prediction
        of a dated event. The chain is the claim: disruption does not remove the trade, it moves it,
        and the movement is visible in different data each time.</p>
    </div>
  );
}
