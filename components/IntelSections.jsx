import Link from 'next/link';
import { Pic, Hero, Signup } from './Blocks';
import site from '../data/site.json';
import { Arrow } from './Icons';
import { CascadeMaps } from './CascadeMaps';
import { Convergence } from './Convergence';

/*
 * The Intelligence page as reorderable sections. Each takes its surface as `s`, so an order can be
 * chosen and the colours still alternate. Existing sections are copied verbatim from the live
 * page; Buyers, Flywheel and the data-room line in the close are the investor additions.
 */
const METHOD = [
  ['Gather', 'MIS assets, artifacts, and mapping enter the intelligence layer.'],
  ['Connect', 'A global graph links actors, routes, and flows.'],
  ['Model', 'The Helix model applies structural causal modeling and adaptive feedback.'],
  ['Test', 'Reinforcement explores cascading adaptation paths.'],
];

export function IntelHero() {
  return (
    <Hero img="/images/hero-intelligence" alt="An evidence wall of port photographs linked by gold string"
          eyebrow="Project Helix · Decision intelligence"
          title={<>Model what<br />the network<br /><span className="y">does next.</span></>}
          lede="Project Helix is a causal AI system that predicts how illicit networks adapt when they are disrupted.">
      <p className="hero-sub">Causal AI on a global risk graph</p>
      <div className="actions">
        <a className="ed-btn" href="#cascade">Explore a scenario {Arrow.down}</a>
        <Link className="ed-link" href="/contact?interest=helix">Request a briefing {Arrow.upRight}</Link>
      </div>
    </Hero>
  );
}

export function IntelMistic({ s }) {
  return (
    <>
<section className={`wrap s ${s} two`} id="mistic">
        <div><span className="kicker">MISTIC</span><h2>A digital fusion center<br /><em>for strategic intelligence.</em></h2></div>
        <div>
          <p className="deck"><strong>Illicit Shadows Media, Technology, &amp; Innovation Convergence (MISTIC)</strong> is the institute behind the platform.</p>
          <p>Its research lab builds Project Helix. Its fusion center applies that work, combining field investigations, museum research, and predictive modeling into a single picture of how illicit networks operate.</p>
        </div>
      </section>
    </>
  );
}

export function IntelHelix({ s }) {
  return (
    <>
<section className={`wrap s ${s}`} id="helix">
        <div className="intro">
          <div><span className="kicker">Project Helix / Predictive convergence system</span><h2>From fragments<br /><em>to a system.</em></h2></div>
        </div>
        <ol className="method">
          {METHOD.map(([t, d], i) => <li key={t}><span className="n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></li>)}
        </ol>
        <figure className="helix-art" style={{ marginTop: 40 }}>
          <Pic base="/images/project-helix" alt="Conceptual Project Helix diagram showing overlapping domains, shared network nodes, dependencies, and an illustrative adaptation path after disruption." />
          <figcaption className="fine">
            Conceptual system view. The connections illustrate a concept, not measured data or a
            validated forecast. <a href="/images/project-helix.jpg" target="_blank" rel="noopener noreferrer">Open full size</a>
          </figcaption>
        </figure>
      </section>
    </>
  );
}

export function IntelCascade({ s }) {
  return (
    <>
<section className={`wrap s ${s}`} id="cascade">
        <div className="intro">
          <div><span className="kicker">Illustrative model · Hypothetical scenario</span><h2>One disruption.<br /><em>Many consequences.</em></h2></div>
        </div>
        <CascadeMaps />
      </section>
    </>
  );
}

export function IntelModelfor({ s }) {
  return (
    <>
<section className={`wrap s ${s} two`}>
        <div>
          <span className="kicker">What the model is for</span>
          <h2>Understand<br /><em>the adaptation.</em></h2>
          <p className="deck">Strategic foresight, rather than a prediction of a single incident.</p>
        </div>
        <div>
          <p>A disruption can move trade into different routes, entities, assets, and spheres of influence. Helix examines those linked shifts.</p>
          <p>The Rotterdam sequence is an illustrative model, not a report of observed events or a validated forecast. Its purpose is to make the logic of a cascade visible.</p>
          <a className="ed-link" href="#convergence">See the wider connections {Arrow.down}</a>
        </div>
      </section>
    </>
  );
}

export function IntelConvergence({ s }) {
  return (
    <>
<section className={`wrap s ${s}`} id="convergence">
        <div className="intro">
          <div><span className="kicker">Crime convergence</span><h2>Pressure travels<br /><em>across domains.</em></h2></div>
        </div>
        <div className="convergence-frame"><Convergence head={false} /></div>
      </section>
    </>
  );
}

const BUYERS = [
  ['Corporate', 'Banks, commodity traders, logistics and insurers',
   'Which counterparties, routes and suppliers become exposed when a network is disrupted, before the fine or the seizure.'],
  ['Government and law enforcement', 'Ministries, customs, financial intelligence units and police',
   'Where an interdiction will push activity next, so enforcement follows the displacement rather than the last route.'],
  ['International organizations', 'Multilaterals, development banks and investigative partners',
   'How illicit flows reorganize across borders and sectors, to target programs, due diligence and policy.'],
];

export function IntelBuyers({ s }) {
  return (
    <section className={`wrap s ${s}`} id="buyers">
      <div className="intro">
        <div><span className="kicker">Who it is for</span><h2>Decisions that<br /><em>cannot wait.</em></h2></div>
        <p>Mapping who is connected is not enough. Helix shows where activity moves next.</p>
      </div>
      <div className="buyers">
        {BUYERS.map(([t, w, d], i) => (
          <article className="buyer" key={t}>
            <span className="bn">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t}</h3><p className="bw">{w}</p><p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function IntelFlywheel({ s }) {
  return (
    <section className={`wrap s ${s}`} id="flywheel">
      <div className="intro">
        <div><span className="kicker">How the platform compounds</span><h2>The decision intelligence<br /><em>flywheel.</em></h2></div>
      </div>
      <div className="fwgrid">
        <svg viewBox="-210 0 1140 720" className="fw" role="img" aria-label="Decision intelligence flywheel: films collect evidence, the museum structures it, Project Helix turns it into decision intelligence, and buyers set the next questions."><defs><marker id="fwa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#FFD400" /></marker></defs><path d="M461.7,131.6 A250,250 0 0 1 608.6,386.1" fill="none" stroke="#FFD400" strokeWidth="3" markerEnd="url(#fwa)" /><path d="M506.9,562.3 A250,250 0 0 1 213.1,562.3" fill="none" stroke="#FFD400" strokeWidth="3" markerEnd="url(#fwa)" /><path d="M111.4,386.1 A250,250 0 0 1 258.3,131.6" fill="none" stroke="#FFD400" strokeWidth="3" markerEnd="url(#fwa)" /><g><circle cx="360.0" cy="110.0" r="86" fill="#0b0f0f" stroke="#FFD400" strokeWidth="2" />
<text x="360.0" y="96.0" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="30" fill="#fff">FILMS</text>
<text x="360.0" y="120.0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="1.5" fill="#FFD400">COLLECTION</text>
<text x="360.0" y="140.0" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="14" fill="#cfd4d4">Field evidence, sources</text>
<text x="360.0" y="156.0" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="14" fill="#cfd4d4">and access</text></g><g><circle cx="576.5" cy="485.0" r="86" fill="#0b0f0f" stroke="#FFD400" strokeWidth="2" />
<text x="576.5" y="471.0" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="30" fill="#fff">MUSEUM</text>
<text x="576.5" y="495.0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="1.5" fill="#FFD400">KNOWLEDGE</text>
<text x="576.5" y="515.0" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="14" fill="#cfd4d4">A structured, tagged</text>
<text x="576.5" y="531.0" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="14" fill="#cfd4d4">record of the networks</text></g><g><circle cx="143.5" cy="485.0" r="86" fill="#0b0f0f" stroke="#FFD400" strokeWidth="2" />
<text x="143.5" y="471.0" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="24" fill="#fff">PROJECT HELIX</text>
<text x="143.5" y="495.0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="1.5" fill="#FFD400">INTELLIGENCE</text>
<text x="143.5" y="515.0" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="14" fill="#cfd4d4">Causal AI on a</text>
<text x="143.5" y="531.0" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="14" fill="#cfd4d4">global risk graph</text></g><text x="606.0" y="218.0" textAnchor="start" fontFamily="IBM Plex Mono, monospace" fontSize="15" fill="#c5cccc">Evidence becomes exhibits</text><text x="360.0" y="644.0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="15" fill="#c5cccc">The record trains the model</text><text x="114.0" y="218.0" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="15" fill="#c5cccc">Buyers set the next questions</text><text x="360" y="350" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="34" fill="#fff">DECISION</text><text x="360" y="382" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="34" fill="#FFD400">INTELLIGENCE</text><text x="360" y="406" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="3" fill="#9aa4a4">FLYWHEEL</text></svg>
        <div className="fwlist">
          <div><h3>Films <span>Collection</span></h3><p>Field investigations produce proprietary evidence, sources and access, and reach an audience that builds trust in the work.</p></div>
          <div><h3>Museum <span>Knowledge</span></h3><p>The Museum of Illicit Shadows catalogs what the investigations find: a structured, tagged record of how illicit networks operate.</p></div>
          <div><h3>Project Helix <span>Decision intelligence</span></h3><p>Causal AI on a global risk graph turns that record into foresight for corporate, government and international buyers, whose questions set the next investigation.</p></div>
        </div>
      </div>
    </section>
  );
}

export function IntelClose({ s }) {
  return (
    <section className={`wrap s ${s}`} id="work-with-us">
      <div className="closing">
        <div>
          <h2>Bring the network<br /><em>into view.</em></h2>
          <p>Advisory and briefings for corporate, government and international buyers, today. Project
            Helix is in development.</p>
          <Link className="ed-btn" href="/contact?interest=helix">Request a briefing {Arrow.upRight}</Link>
        </div>
        <div className="closing-beta">
          {/* Investors get a route, never the material: financials stay in the data room. */}
          <span className="kicker">Investors</span>
          <p className="closing-h">Request the data room.</p>
          <Link className="ed-link" href="/contact?interest=investment">Request access {Arrow.upRight}</Link>
        </div>
      </div>
    </section>
  );
}

const PARTS = { mistic: IntelMistic, helix: IntelHelix, cascade: IntelCascade, modelfor: IntelModelfor,
  convergence: IntelConvergence, buyers: IntelBuyers, flywheel: IntelFlywheel, close: IntelClose };

/** order: [[part, surface], ...] */
export function IntelPage({ order }) {
  return (
    <>
      <IntelHero />
      {order.map(([k, s]) => { const C = PARTS[k]; return <C s={s} key={k} />; })}
    </>
  );
}
