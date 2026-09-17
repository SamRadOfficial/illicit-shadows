import Link from 'next/link';
import { og } from '../../lib/og';
import team from '../../data/team.json';
import { Pic, Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { Pillars } from '../../components/Pillars';
export const metadata = {
  ...og('about'), title: 'About' };

const SECTORS = [
  ['Industry', ['Pharmaceuticals', 'Luxury retail', 'Automotive', 'Food, alcohol, tobacco', 'Electronics and e-commerce', 'Media and entertainment', 'Sports and frontier tech', 'Industry associations', 'Chambers of commerce']],
  ['International organizations', ['United Nations', 'World Bank · IMF', 'OECD · WTO · WCO', 'INTERPOL', 'APEC · ASEAN · GCC', 'OAS · EU · NATO', 'ICC', 'World Economic Forum', 'Munich Security Conference']],
  ['Government', ['National security agencies', 'Law enforcement', 'Customs authorities', 'Financial intelligence units', 'Diplomatic missions']],
  ['Civil society', ['NGOs', 'Think tanks', 'Universities', 'Academic centers', 'Foundations']],
];

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
          <p>That convergence has a name: <strong>Illicit Shadows Media, Technology, &amp; Innovation Convergence (MISTIC)</strong>.</p>
          <div className="text-routes">
            <Link href="/film">MEDIA {Arrow.upRight}</Link>
            <Link href="/museum">KNOWLEDGE {Arrow.upRight}</Link>
            <Link href="/intelligence">INTELLIGENCE {Arrow.upRight}</Link>
          </div>
        </div>
      </section>

      <section className="wrap s s-ink" id="founders">
        <div className="intro"><div><span className="kicker">The founders</span><h2>Different disciplines.<br /><em>Shared purpose.</em></h2></div></div>
        {/* Field still from the 2024 shoot: the two founders at the White House fence. Nothing sits
            on it; the photograph's subjects are left of centre and would fight any headline. */}
        <figure className="founders-still"><Pic base="/images/founders-white-house" alt="David M. Luna and Sam Rad in conversation outside the White House" /><figcaption className="fine">Washington, DC, July 2024</figcaption></figure>
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

      <section className="wrap s s-paper" id="platform">
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

      <section className="wrap s s-ink" id="partners">
        <div className="intro">
          <div><span className="kicker">Who we serve</span><h2>Across sectors.<br /><em>Across borders.</em></h2></div>
          <p>The institutions and industries our work is built for.</p>
        </div>
        <div className="sectors">
          {SECTORS.map(([name, items]) => (
            <div className="sector" key={name}><h3>{name}</h3><ul>{items.map(i => <li key={i}>{i}</li>)}</ul></div>
          ))}
        </div>
      </section>

      <section className="wrap s s-paper" id="partner-orgs">
        <div className="intro"><div><span className="kicker">Partners</span><h2>Built with<br /><em>ICAIE and RADOC.</em></h2></div></div>
        <div className="partners">
          <article>
            <span className="plogo plogo-big"><Pic base="/logos/icaie-square" ext="png" alt="ICAIE, International Coalition Against Illicit Economies" /></span>
            <h3>ICAIE</h3>
            <p>International Coalition Against Illicit Economies. Confronting illicit trade, crime, and threat finance. Washington, DC.</p>
            <a className="ed-link" href="https://icaie.com" target="_blank" rel="noopener noreferrer">icaie.com {Arrow.upRight}</a>
          </article>
          <article>
            <span className="plogo plogo-big plogo-text"><span className="radoc" aria-label="RADOC"><b>RAD</b><em>OC</em></span></span>
            <h3>RAD Original Creations</h3>
            <p>A media and narrative studio creating stories to shape better futures. Co-producers of Illicit Shadows. New York and London.</p>
            <a className="ed-link" href="https://radoc.co" target="_blank" rel="noopener noreferrer">radoc.co {Arrow.upRight}</a>
          </article>
        </div>
      </section>

      <section className="wrap s s-slate cta-band">
        <div><h2>Work at the intersection.</h2><p>Advisory, intelligence access, museum partnerships, and film collaborations.</p></div>
        <Link className="ed-btn" href="/contact?interest=advisory">Start a conversation {Arrow.upRight}</Link>
      </section>
    </>
  );
}
