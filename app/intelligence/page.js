import Link from 'next/link';
import site from '../../data/site.json';
import { Pic, SectionHead, Break, Prov, Donor } from '../../components/Blocks';
import { CascadeMaps } from '../../components/CascadeMaps';
import { Convergence } from '../../components/Convergence';
export const metadata = { title: 'Intelligence · MISTIC and Project Helix' };

export default function Intelligence() {
  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="bg"><Pic base="/images/hero-globe" alt="A gold-flecked globe against black" priority pos="right center" /></div>
        <div className="veil" />
        <div className="wrap">
          <p className="eyebrow">Strategic Intelligence &middot; MISTIC</p>
          <h1 className="disp">We don't forecast incidents. We model <span className="y">what the network does next.</span></h1>
          <p className="lede">Project Helix simulates how criminal, political, and economic networks reorganize after disruption, turning fragmented intelligence into systemic foresight.</p>
          <div className="cta-row"><a className="btn btn-y" href={`mailto:${site.contact}`}>Request a briefing</a><a className="btn btn-o" href="#helix">Helix subscriptions</a></div>
        </div>
      </section>
      <Break base="/images/dividers/intelligence-network-analysis" alt="Layered network model with branching paths" />
      <section className="wrap reveal">
        <SectionHead label="The Institute" meta="FUSION CENTER" />
        <div className="inst"><div className="it">MISTIC</div><div className="ie">MEDIA · TECHNOLOGY · INNOVATION CONVERGENCE</div><p>A fusion center for strategic intelligence, mapping the intersection of organized crime, emerging technology, and global threat networks, and home to Project Helix, an AI-based predictive convergence system.</p></div>
      </section>
      <section className="wrap reveal tight" id="helix">
        <SectionHead label="Project Helix" meta="PREDICTIVE CONVERGENCE SYSTEM" />
        <div className="layers">
          <div className="layer"><div className="ln">01 · INTELLIGENCE LAYER</div><div className="ld">MIS ingestion: assets, artifacts, and mapping catalogued into the modeling framework.</div></div>
          <div className="layer"><div className="ln">02 · GLOBAL GRAPH</div><div className="ld">Nodes, edges, and a data lake linking actors, routes, and flows.</div></div>
          <div className="layer"><div className="ln">03 · CAUSAL ENGINE</div><div className="ld">Helix.AI: structural causal modeling with adaptive feedback.</div></div>
          <div className="layer"><div className="ln">04 · REINFORCEMENT</div><div className="ld">Optimization across cascading adaptation paths.</div></div>
        </div>
        <figure className="helix-art" style={{ margin: '20px 0 0' }}>
          <Pic base="/images/helix-ai" alt="Helix.AI: illicit economies converging on shared nodes across the global network" />
        </figure>
        <CascadeMaps />
      </section>
      <Break base="/images/break-evidence-1" />
      <section className="wrap reveal">
        <Convergence label="Everything is connected" meta="WHAT HELIX MODELS" lede="Helix models the system the map describes: how pressure on one domain moves activity into another." />
      </section>
      <Break base="/images/break-evidence-2" />
      <section className="wrap reveal"><Donor eyebrow="Enterprise" title={<>Advisory, briefings, and <span>Helix access</span></>} copy="Governments, international organizations, and industry on illicit-economy exposure. Enterprise B2G and B2B intelligence platform access." cta="Request a briefing" href={`mailto:${site.contact}`} mail={site.contact} /></section>
    </>
  );
}
