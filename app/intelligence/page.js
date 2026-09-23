import Link from 'next/link';
import { og } from '../../lib/og';
import { Pic, Hero, Signup } from '../../components/Blocks';
import site from '../../data/site.json';
import { Arrow } from '../../components/Icons';
import { CascadeMaps } from '../../components/CascadeMaps';
import { Convergence } from '../../components/Convergence';
export const metadata = {
  .../* per page: card, description, canonical */og('intelligence', {
    description: 'MISTIC and Project Helix: a predictive convergence system in development, modeling how criminal, political and economic networks reorganize after disruption.',
    path: '/intelligence',
  }), title: 'Intelligence · MISTIC and Project Helix' };

const METHOD = [
  ['Gather', 'MIS assets, artifacts, and mapping enter the intelligence layer.'],
  ['Connect', 'A global graph links actors, routes, and flows.'],
  ['Model', 'The Helix model applies structural causal modeling and adaptive feedback.'],
  ['Test', 'Reinforcement explores cascading adaptation paths.'],
];

export default function Intelligence() {
  return (
    <>
      <Hero img="/images/hero-intelligence" alt="An evidence wall of port photographs linked by gold string"
            eyebrow="Project Helix"
            title={<>Model what<br />the network<br /><span className="y">does next.</span></>}
            lede="Our platform turns fragmented intelligence into systemic foresight: how criminal, political, and economic networks reorganize after a disruption.">
        <div className="actions">
          <a className="ed-btn" href="#cascade">Explore a scenario {Arrow.down}</a>
          <Link className="ed-link" href="/contact?interest=helix">Request a briefing {Arrow.upRight}</Link>
        </div>
      </Hero>

      {/* What this is: the institute first, then its project. Helix is one of MISTIC's projects,
          not the other way round, and the page did not say so anywhere. */}
      <section className="wrap s s-paper two" id="mistic">
        <div><span className="kicker">MISTIC / Institute &middot; Lab &middot; Fusion center</span><h2>A digital fusion center<br /><em>for strategic intelligence.</em></h2></div>
        <div>
          <p className="mistic-lead">See the converging threat dots. Connect them. Make them matter.</p>
          <p className="deck"><strong>Illicit Shadows Media, Technology, &amp; Innovation Convergence (MISTIC)</strong> is the institute behind the platform.</p>
          <p>Its research lab builds Project Helix. Its fusion center applies that work, combining field investigations, museum research, and predictive modeling into a single picture of how illicit networks operate.</p>
        </div>
      </section>

      {/* Option C. Drawn from the February brief. Three things are deliberately not published:
          the brief's word "influence" (reads as interference rather than analysis), the explicit
          data-source list including telecom metadata, and any claim about reward or governance
          mechanisms, which the brief marks TBD. */}
      {/* Two columns: the claim and the question on the left, the explanation on the right. A
          single measure left half the section empty. */}
      <section className="wrap s s-ink" id="helix">
        <div className="intro">
          <div><span className="kicker">Project Helix / Predictive convergence system</span><h2>From fragments<br /><em>to a system.</em></h2></div>
          <p>Most intelligence forecasts discrete events. Helix models the adaptation that follows:
            if a disruption occurs at one node, how do the others reorganize to compensate?</p>
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

      <section className="wrap s s-paper" id="cascade">
        <div className="intro">
          <div><span className="kicker">Illustrative model · Hypothetical scenario</span><h2>One disruption.<br /><em>Many consequences.</em></h2></div>
          <p>Follow the Rotterdam example from an initial shock to redirected routes, financial activity, and downstream effects. Use the timeline on the map to move between stages.</p>
        </div>
        <CascadeMaps />
      </section>

      <section className="wrap s s-slate two">
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

      <section className="wrap s s-paper" id="convergence">
        <div className="intro">
          <div><span className="kicker">Crime convergence</span><h2>Pressure travels<br /><em>across domains.</em></h2></div>
          <p>Illicit markets connect governance, security, economies, and communities. This is the wider system Helix seeks to model.</p>
        </div>
        <div className="convergence-frame"><Convergence head={false} /></div>
      </section>

      {/* One closing band, split by what exists. Briefings are available today and are a sales
          conversation; Project Helix is in development and is a mailing list. Presenting them as equal
          buttons implied the second was buyable. */}
      <section className="wrap s s-slate" id="work-with-us">
        <div className="closing">
          <div>
            <h2>Bring the network<br /><em>into view.</em></h2>
            <p>Advisory and briefings for governments, international organizations, and industry,
              today. Project Helix is in development.</p>
            <Link className="ed-btn" href="/contact?interest=helix">Request a briefing {Arrow.upRight}</Link>
          </div>
          <div className="closing-beta">
            <span className="kicker">Project Helix</span>
            <p className="closing-h">Be there when the beta opens.</p>
            <Signup endpoint={site.forms?.signup} subscribe={false}
                    interest="Project Helix beta" label="Notify me" />
          </div>
        </div>
      </section>
    </>
  );
}
