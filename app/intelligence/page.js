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
          <p className="deck">MISTIC, Illicit Shadows Media, Technology &amp; Innovation Convergence, is the institute behind the platform: a fusion center where field investigations, the museum's research, and predictive modeling are brought together.</p>
          <p>It works the way an intelligence fusion center works. Evidence gathered in the field and cataloged in the museum is connected and modeled, so what is learned in one place informs the others.</p>
          <p>Helix.AI is one of its projects: the predictive convergence system that examines how criminal, political, and economic networks reorganize after disruption.</p>
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
          <Pic base="/images/helix-ai" alt="Helix.AI: illicit economies converging on shared nodes across the global network" />
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
