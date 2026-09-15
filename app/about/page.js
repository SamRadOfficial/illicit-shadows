import Link from 'next/link';
import team from '../../data/team.json';
import { Pic, Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { Pillars } from '../../components/Pillars';
export const metadata = { title: 'About' };

const WHY = [
  ['Crime crosses categories.', 'Cartels, kleptocrats, and state-linked actors operate through shared supply chains, banks, and platforms.'],
  ['Trade routes carry more than trade.', 'Ports, free-trade zones, e-commerce, and shipping networks are exploited at scale.'],
  ['Intelligence remains fragmented.', 'Data held across institutions can miss the consequences that travel between them.'],
  ['Clarity has a public purpose.', 'People need to understand the systems affecting their communities and economies.'],
];

export default function About() {
  return (
    <>
      <Hero img="/images/hero-about" mobilePos="52% center" alt="An investigation room at night: an evidence wall of shipping photographs above a long working table"
            eyebrow="About Illicit Shadows"
            title={<>Two perspectives.<br /><span className="y">One field of vision.</span></>}
            lede="Diplomatic credibility meets deep-tech innovation. Field investigations, public knowledge, and intelligence converge under one roof.">
        <div className="actions"><a className="ed-btn" href="#founders">Meet the founders {Arrow.down}</a></div>
      </Hero>

      <section className="wrap s s-paper two" id="who">
        <div><span className="kicker">The institution</span><h2>See the connections.<br /><em>Make them matter.</em></h2></div>
        <div>
          <p className="deck">Illicit Shadows, LLC brings together the reach of documentary journalism, the depth of a knowledge institution, and the foresight of a modeling system.</p>
          <p>That convergence has a name: MISTIC, Illicit Shadows Media, Technology &amp; Innovation Convergence.</p>
          <div className="text-routes">
            <Link href="/film">WATCH {Arrow.upRight}</Link>
            <Link href="/museum">EXPLORE {Arrow.upRight}</Link>
            <Link href="/intelligence">MODEL {Arrow.upRight}</Link>
          </div>
        </div>
      </section>

      <section className="wrap s s-ink" id="founders">
        <div className="intro"><div><span className="kicker">The founders</span><h2>Different disciplines.<br /><em>Shared purpose.</em></h2></div></div>
        <div className="founders">
          {team.map(t => (
            <article key={t.slug}>
              <Pic base={t.photo} alt={t.name} />
              <span className="kicker">{t.anchor.replace(' Anchor', '')}</span>
              <h3>{t.name}</h3>
              <p>{t.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap s s-ink" id="platform" style={{ paddingTop: 0 }}>
        <div className="intro"><div><span className="kicker">One platform</span><h2>Three <em>ways in.</em></h2></div></div>
        <Pillars compact />
      </section>

      <section className="wrap s s-slate">
        <div className="intro">
          <div><span className="kicker">Why now</span><h2>The threats<br /><em>are converging.</em></h2></div>
          <p>Our understanding needs to connect as quickly as the networks do.</p>
        </div>
        <div className="argument">
          {WHY.map(([h, d], i) => <article key={h}><span>{String(i + 1).padStart(2, '0')}</span><h3>{h}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="wrap s s-paper" id="partners">
        <div className="intro">
          <div><span className="kicker">Who we work with</span><h2>Across sectors.<br /><em>Across borders.</em></h2></div>
          <p>Governments, international organizations, industry, and civil society facing illicit-economy exposure and convergence risk.</p>
        </div>
        <div className="audience"><span>Government</span><span>International organizations</span><span>Industry</span><span>Civil society</span></div>
        <div className="partners">
          <article>
            <Pic base="/logos/icaie-square" className="plogo" alt="ICAIE, International Coalition Against Illicit Economies" />
            <h3>ICAIE</h3>
            <p>International Coalition Against Illicit Economies. Confronting illicit trade, crime, and threat finance. Washington, DC.</p>
            <a className="ed-link" href="https://icaie.com" target="_blank" rel="noopener noreferrer">icaie.com {Arrow.upRight}</a>
          </article>
          <article>
            <div className="radoc" style={{ fontSize: 28, marginBottom: 18 }} aria-label="RADOC"><b>RAD</b><em>OC</em></div>
            <h3>RAD Original Creations</h3>
            <p>A meta-media studio producing the Illicit Shadows films. NYC, Washington, DC, and London.</p>
            <a className="ed-link" href="https://radoc.co" target="_blank" rel="noopener noreferrer">radoc.co {Arrow.upRight}</a>
          </article>
        </div>
      </section>

      <section className="wrap s s-yellow cta-band">
        <div><h2>Work at the intersection.</h2><p>Advisory, intelligence access, museum partnerships, and film collaborations.</p></div>
        <Link className="ed-btn" href="/contact">Start a conversation {Arrow.upRight}</Link>
      </section>
    </>
  );
}
