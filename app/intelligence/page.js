import Link from 'next/link';
import { Pic, Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { CascadeMaps } from '../../components/CascadeMaps';
import { Convergence } from '../../components/Convergence';
export const metadata = { title: 'Intelligence · MISTIC and Project Helix' };

const METHOD = [
  ['Gather', 'MIS assets, artifacts, and mapping enter the intelligence layer.'],
  ['Connect', 'A global graph links actors, routes, and flows.'],
  ['Model', 'Helix.AI applies structural causal modeling and adaptive feedback.'],
  ['Test', 'Reinforcement explores cascading adaptation paths.'],
];

export default function Intelligence() {
  return (
    <>
      <Hero img="/images/hero-intelligence" alt="An evidence wall of port photographs linked by gold string"
            eyebrow="MISTIC / Strategic intelligence"
            title={<>Model what<br />the network<br /><span className="y">does next.</span></>}
            lede="How do criminal, political, and economic networks reorganize after disruption? Helix turns fragmented intelligence into systemic foresight.">
        <div className="actions">
          <a className="ed-btn" href="#cascade">Explore a scenario {Arrow.down}</a>
          <Link className="ed-link" href="/contact">Request a briefing {Arrow.upRight}</Link>
        </div>
      </Hero>

      {/* What this is: the institute first, then its project. Helix is one of MISTIC's projects,
          not the other way round, and the page did not say so anywhere. */}
      <section className="wrap s s-paper two" id="mistic">
        <div><span className="kicker">MISTIC / The institute</span><h2>A fusion center for<br /><em>the shadow economy.</em></h2></div>
        <div>
          <p className="deck"><strong>Illicit Shadows Media, Technology, &amp; Innovation Convergence (MISTIC)</strong> is the institute behind the platform: a fusion center where field investigations, the museum's research, and predictive modeling are brought together.</p>
          <p>It works the way an intelligence fusion center works. Evidence gathered in the field and cataloged in the museum is connected and modeled, so what is learned in one place informs the others.</p>
          <p>Helix.AI is one of its projects: the predictive convergence system that examines how criminal, political, and economic networks reorganize after disruption.</p>
        </div>
      </section>

      {/* Option C. Drawn from the February brief. Three things are deliberately not published:
          the brief's word "influence" (reads as interference rather than analysis), the explicit
          data-source list including telecom metadata, and any claim about reward or governance
          mechanisms, which the brief marks TBD. */}
      <section className="wrap s s-paper" id="what">
        <div className="intro"><div><span className="kicker">What it is</span><h2>A system for<br /><em>the next move.</em></h2></div></div>
        <p className="deck">Project Helix is a predictive convergence system: it models how criminal,
          political, and economic networks reorganize when something disrupts them.</p>
        <p>Most intelligence systems forecast discrete events: a shipment, a transfer, an attack.
          Helix models the adaptation that follows. The question it asks is not what happens next,
          but what the system does about it.</p>

        <figure className="pullq">
          <blockquote>If a disruption occurs at one node, how do the others reorganize to compensate?</blockquote>
          <figcaption>The modeling question behind the system</figcaption>
        </figure>

        <div className="two-col">
          <div>
            <span className="kicker">What goes in</span>
            <ul className="tick">
              <li>Artifacts, mapping and research cataloged by the museum</li>
              <li>Open-source reporting and case histories</li>
              <li>Trade, corporate and sanctions records</li>
            </ul>
            <p className="fine">Each input is tagged three ways: who is connected, how money moves, and how the story is told.</p>
          </div>
          <div>
            <span className="kicker">What comes out</span>
            <ul className="tick">
              <li>Where activity is likely to move after a disruption</li>
              <li>Which actors and routes absorb it</li>
              <li>Where the effects surface in other domains</li>
            </ul>
            <p className="fine">Strategic foresight for decisions, not a prediction of a dated event.</p>
          </div>
        </div>

        <div className="gov">
          <span className="kicker">Governance</span>
          <p>Helix is built to inform decisions, not to make them. Its usefulness depends on
            governance that keeps optimization subordinate to the rule of law, and on human judgment
            at every point where the model meets a decision.</p>
        </div>
      </section>

      <section className="wrap s s-ink" id="helix" style={{ paddingTop: 'clamp(44px,5.5vw,64px)' }}>
        <div className="intro">
          <div><span className="kicker">Project Helix / How it works</span><h2>From fragments<br /><em>to a system.</em></h2></div>
          <p>Four layers, from the museum's intelligence layer to a reinforcement loop that tests how a network adapts.</p>
        </div>
        <ol className="method">
          {METHOD.map(([t, d], i) => <li key={t}><span className="n">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></li>)}
        </ol>
        <figure className="helix-art" style={{ marginTop: 40 }}>
          <Pic base="/images/helix-ai" alt="Conceptual Helix.AI diagram showing overlapping domains, shared network nodes, dependencies, and an illustrative adaptation path after disruption." />
          <figcaption className="fine">
            Conceptual system view. The connections illustrate a concept, not measured data or a validated forecast.{' '}
            <a href="/images/helix-ai.jpg" target="_blank" rel="noopener noreferrer">Open full size</a>
          </figcaption>
        </figure>
      </section>

      <section className="wrap s s-ink" id="cascade">
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

      <section className="wrap s s-yellow cta-band">
        <div><h2>Bring the network into view.</h2><p>Advisory, briefings, and Helix access for governments, international organizations, and industry.</p></div>
        <Link className="ed-btn" href="/contact">Request a briefing {Arrow.upRight}</Link>
      </section>
    </>
  );
}
