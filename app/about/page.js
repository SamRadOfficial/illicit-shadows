import Link from 'next/link';
import site from '../../data/site.json';
import team from '../../data/team.json';
import { Pic, SectionHead, Break, Hero, Donor } from '../../components/Blocks';
import { Icon } from '../../components/Icons';
export const metadata = { title: 'About' };

const WHY = [
  ['alert', 'Crime convergence is accelerating', 'Cartels, kleptocrats, and state-linked actors now operate in the same supply chains, banks, and platforms.'],
  ['supply', 'Supply chains are the new battlefield', 'Ports, e-commerce, free-trade zones, shipping nodes, and social media are exploited by illicit networks at industrial scale.'],
  ['signal', 'Intelligence is fragmented', 'Governments and industry hold massive data: siloed, episodic, and unable to model cascading network behavior.'],
  ['eye', 'Public demand for clarity', "Audiences want documentary-grade truth about the systems shaping their world. The genre is hot. The supply isn't."],
];
const SERVE = {
  'Industry': ['Pharmaceuticals', 'Luxury Retail', 'Automotive', 'Food, Alcohol, Tobacco', 'Electronics & e-commerce', 'Media & Entertainment', 'Sports & Frontier Tech', 'Industry Associations', 'Chambers of Commerce'],
  'Intl. Orgs': ['United Nations', 'World Bank · IMF', 'OECD · WTO · WCO', 'INTERPOL', 'APEC · ASEAN · GCC', 'OAS · EU · NATO', 'ICC', 'World Economic Forum', 'Munich Security Conf.'],
  'Government': ['National Security Agencies', 'Law Enforcement', 'Customs Authorities', 'Financial Intelligence Units', 'Diplomatic Missions'],
  'Civil Society': ['NGOs', 'Think Tanks', 'Universities', 'Academic Centers', 'Foundations'],
};

export default function About() {
  return (
    <>
      <Hero img="/images/hero-globe" alt="A gold-lit globe on black, trade routes arcing between continents" eyebrow="About · Illicit Shadows, LLC"
            title={<>Diplomatic credibility meets <span className="y">deep-tech innovation.</span></>}
            lede="We integrate three disciplines no single player has combined, documentary reach, curated knowledge, and predictive intelligence, to expose the global shadow economy and predict what it does next.">
        <div className="cta-row"><a className="btn btn-y" href={`mailto:${site.contact}`}>Partner with us</a><Link className="btn btn-o" href="/">&#9654; See the platform</Link></div>
      </Hero>
      <Break base="/images/dividers/about-shared-expertise" alt="Researchers reviewing documents and maps together" />
      <section className="wrap reveal" id="who">
        <SectionHead label="Who we are" meta="THE INSTITUTION" />
        <div className="mission">
          <div><p>Illicit Shadows, LLC is a media, knowledge, and intelligence platform, where documentary-grade journalism, a public knowledge hub, and a predictive intelligence system converge under one roof.</p><p>That convergence has a name: <b style={{ color: '#fff' }}>MISTIC</b>, Illicit Shadows Media, Technology &amp; Innovation Convergence, the institute mapping the intersection of organized crime, emerging technology, and global threat networks.</p></div>
          <div className="props">
            <div className="prop"><div className="pk">01 · MEDIA</div><div className="pv">Illicit Shadows</div><div className="pm">FIELD INVESTIGATIONS · FIRST FILM RELEASED</div></div>
            <div className="prop"><div className="pk">02 · KNOWLEDGE</div><div className="pv">Museum of Illicit Shadows</div><div className="pm">MIS · EST 2025</div></div>
            <div className="prop"><div className="pk">03 · INTELLIGENCE</div><div className="pv">Project Helix</div><div className="pm">PREDICTIVE CONVERGENCE SYSTEM</div></div>
          </div>
        </div>
      </section>
      <Break base="/images/break-evidence-2" />
      <section className="wrap reveal" id="team">
        <SectionHead label="Who's building this" meta="FOUNDERS" />
        <p className="sec-sub">Diplomatic credibility meets deep-tech innovation.</p>
        <div className="founders">{team.map(t => <div className={`fcard${t.photo ? ' haspic' : ''}`} key={t.slug}><div className="fhead"><div className="favatar">{t.photo ? <Pic base={t.photo} alt={`${t.name}, ${t.role}, Illicit Shadows`} /> : t.initials}</div><div className="fmeta"><div className="fname">{t.name}</div><div className="frole">{t.role.toUpperCase()}</div></div></div><div className="fanchor">{t.anchor}</div><p>{t.bio}</p></div>)}</div>
        <p className="team-note">IN PARTNERSHIP WITH <b>ICAIE</b> + <b>RADOC</b></p>
      </section>
      <Break base="/images/break-evidence-3" />
      <section className="wrap reveal" id="serve">
        <SectionHead label="Who we serve" meta="CLIENTS & PARTNERS" />
        <p className="sec-sub">Every player exposed to global supply chains, sanctions risk, or illicit-economy contamination.</p>
        <div className="serve">{Object.entries(SERVE).map(([h, rows]) => <div className="scol" key={h}><div className="sh">{h}</div>{rows.map(r => <div className="row" key={r}>{r}</div>)}</div>)}</div>
      </section>
      <Break base="/images/break-evidence-1" />
      <section className="wrap reveal" id="whynow">
        <SectionHead label="Why now" meta="FOUR CONVERGING FORCES" />
        <p className="sec-sub">Four converging forces, and a market with no incumbent.</p>
        <div className="whynow">{WHY.map(([ic, t, p]) => <div className="wn" key={t}>{Icon[ic]}<h3>{t}</h3><p>{p}</p></div>)}</div>
      </section>
      <Break base="/images/break-evidence-2" />
      <section className="wrap reveal" id="partners">
        <SectionHead label="Partners" meta="ICAIE + RADOC" />
        <div className="partners-big">
          <div className="pbig"><div className="pmark icaie"><Pic base="/logos/icaie-square" alt="ICAIE" /></div><div><div className="pd2" style={{ marginTop: 6 }}>International Coalition Against Illicit Economies. A leading coalition confronting the convergence of illicit trade, crime, and threat finance. Washington, DC.</div><a href="https://icaie.com">icaie.com &rarr;</a></div></div>
          <div className="pbig"><div className="pmark"><span className="radoc"><b>RAD</b><em>OC</em></span></div><div><div className="pn2">RADOC</div><div className="pd2">RAD Original Creations, a meta-media studio producing the Illicit Shadows films. NYC &middot; Washington, DC &middot; London.</div><a href="https://radoc.co">radoc.co &rarr;</a></div></div>
        </div>
      </section>
      <section className="wrap reveal"><Donor eyebrow="Work with us" title={<>Partner with <span>Illicit Shadows</span></>} copy="Advisory, Helix subscriptions, Museum founding-donor partnerships, and executive-producer collaborations across the film slate." cta="Start a conversation" href={`mailto:${site.contact}`} mail={site.contact} /></section>
    </>
  );
}
