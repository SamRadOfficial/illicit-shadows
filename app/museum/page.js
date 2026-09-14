import Link from 'next/link';
import site from '../../data/site.json';
import halls from '../../data/halls.json';
import { Convergence } from '../../components/Convergence';
import { Pic, SectionHead, Break, Donor } from '../../components/Blocks';
export const metadata = { title: 'Museum of Illicit Shadows (MIS)' };

const IMG = { '01': 'narcotics', '02': 'theater', '03': 'fakes', '04': 'environmental', '05': 'history', 'CENTER': 'rotunda',
  '06': 'trafficking', '07': 'convergence', '08': 'corruption', '09': 'antiquities', '10': 'tobacco', '11': 'cybercrime' };

const Hall = ({ h }) => (
  <div className={`hall${h.n === 'CENTER' ? ' rot' : ''}`}><Pic base={`/images/halls/${IMG[h.n]}`} alt="" /><div className="n">{h.n === 'CENTER' ? 'CENTER' : `HALL ${h.n}`}</div><div className="t">{h.title}</div></div>
);

export default function Museum() {
  const [p1, p2] = halls;
  return (
    <>
      <section className="hero" style={{ padding: 0 }}>
        <div className="bg"><Pic base="/images/museum-rotunda" alt="The Eclipse Rotunda: a suspended globe of illuminated trade routes above a circular gallery floor" priority pos="center" /></div>
        <div className="veil" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.35) 40%,rgba(0,0,0,.92))' }} />
        <Pic base="/images/mis-eclipse" ext="png" alt="MIS eclipse emblem" className="eclbadge" />
        <div className="wrap">
          <p className="eyebrow">The Knowledge Hub &middot; MIS &middot; Est 2025</p>
          <h1 className="disp">Museum of <span className="y">Illicit Shadows</span></h1>
          <p className="lede">MIS is a first-of-its-kind virtual museum dedicated to educating global communities on the harms and impacts to international security of crime convergence and illicit economies around the world.</p>
          <div className="cta-row"><a className="btn btn-y" href="#donor">Become a founding donor</a><Link className="btn btn-o" href="/museum/enter">Enter the museum</Link></div>
        </div>
      </section>

      <section className="wrap reveal origin"><div className="grid2">
        <div>
          <p className="eyebrow">Origins &middot; MIS</p>
          <h2 className="disp" style={{ marginTop: 14 }}>Founded in 2025 in the digital world</h2>
          <p>MIS was created by passionate humanitarians and ambassadors for good: David M. Luna, a former U.S. diplomat and national security official, and Sam Rad, a change agent, futurist, technologist, and bestselling author.</p>
          <p>Joining forces, together they envision the Museum as a forum to shine light on the growing threats posed by illicit economies. Through exhibitions, research, dialogues, public programming, and field investigations, MIS examines how crime convergence impacts all communities.</p>
        </div>
        <div><Pic base="/images/mis-eclipse" ext="png" alt="The MIS eclipse, Museum of Illicit Shadows emblem" className="eclimg" /></div>
      </div></section>

      <Break base="/images/break-evidence-1" />

      <section className="wrap reveal" id="prototype">
        <SectionHead label="The building" meta="3D PROTOTYPE" />
        <Link className="film-feature protoshot" href="/museum/enter">
          <Pic base="/images/museum-rotunda" alt="The Eclipse Rotunda: a suspended globe of illuminated trade routes above a circular gallery floor" />
          <span className="badge btm">MIS &middot; CONCEPT RENDER</span>
        </Link>
        <div className="proto-row">
          <p>Walk the site model: the rotunda, the hall positions, and the routes between them.
            Phase I opens 2027.</p>
          <Link className="btn btn-y" href="/museum/enter">Enter the museum (prototype)</Link>
        </div>
      </section>

      <section className="wrap reveal" id="halls">
        <SectionHead label="Exhibition Halls · Phase I" meta={`${p1.year} · ${p1.level.toUpperCase()}`} />
        <div className="halls">{p1.halls.map(h => <Hall h={h} key={h.n} />)}</div>
        <div className="shopcard"><Pic base="/images/halls/shop" alt="" /><div><div className="st">MIS Museum Shop</div><div className="sd">Support the mission: merchandise, publications, and founding-donor editions.</div></div><a className="btn btn-o" href="#donor">Visit the shop &rarr;</a></div>
      </section>
      <section className="wrap reveal tight">
        <SectionHead label="Exhibition Halls · Phase II" meta={`${p2.year} · ${p2.level.toUpperCase()}`} dim />
        <div className="halls phase2">{p2.halls.map(h => <Hall h={h} key={h.n} />)}</div>
      </section>

      <Break base="/images/break-evidence-2" />

      <section className="wrap reveal">
        <SectionHead label="Illicit Shadows Theater" meta="FIELD INVESTIGATIONS" />
        <figure className="concept"><Pic base="/images/museum-theater" alt="The Illicit Shadows Theater: a curved screen showing a port and a river system above a circular audience floor" /><figcaption>Illicit Shadows Theater &middot; concept</figcaption></figure>
        <div className="theater">
          <div><h3>Field <span>investigations</span></h3><p>Films that dive deep into the dark side of global markets, uncovering the clandestine criminal operations and illicit shadows that connect disparate hubs and nodes of seemingly unrelated activities.</p><p>From the dense forests of the Amazon to the world's bustling ports and free-trade zones, from the cyber battlegrounds of Eastern Europe to the hidden financial havens of the West.</p><div className="cta-row" style={{ marginTop: 6 }}><Link className="btn btn-o" href="/film">&#9654; Watch the films</Link></div></div>
          <div><h3>Crime <span>Convergence</span></h3><p>Each investigation is a journey into the heart of a shadowy underworld, where geo-security, malign influence operations, economic manipulations, and human struggles converge with corruption and criminality.</p><p>Our goal is not just to expose the hidden dangers of the illicit shadows, but to shine a light on them so that, through understanding and awareness, we can collectively harness innovation and create solutions to prosecute the fight across borders.</p></div>
        </div>
      </section>

      <section className="wrap reveal">
        <SectionHead label="Enter the Narrative Universe" meta="ILLICIT SHADOWS CHRONICLES" />
        <div className="umbra">
          <div style={{ display: 'flex', justifyContent: 'center' }}><Pic base="/images/book-umbra-circle" alt="The Umbra Circle, Book One" className="book3d" /></div>
          <div><p className="eyebrow">Book 1</p><h3>The Umbra <span>Circle</span></h3><p>The fiction counterpart to the films: a narrative descent into the same convergence the investigations trace. When a diplomat is assassinated in London, two founders are drawn into a web of espionage and uncover a secret network manipulating world systems for power and profit.</p><p className="tag">COMING LATE 2026 &middot; BY SAM RAD AND DAVID M. LUNA</p><div className="cta-row"><Link className="btn btn-o" href="/books/preview">Read the preview &rarr;</Link></div></div>
        </div>
      </section>

      <section className="wrap reveal tight"><div className="strip"><div><h4>Informational brochure</h4><p>The full MIS overview: concept, exhibition halls, and vision for the digital museum.</p></div><a className="btn btn-y" href="#">Download the PDF</a></div></section>

      <section className="wrap reveal band-white">
        <div className="conv-top">
          <p className="creed" style={{ color: '#141210' }}>Everything <b style={{ color: 'var(--alert)' }}>is connected.</b></p>
          <p>Illicit economies are the lifeblood of today's bad actors, enabling kleptocrats to loot their countries, criminal organizations to co-opt states, and terrorist groups to finance attacks against our societies. They are not harmless: narcotics, trafficked humans, looted gold, conflict minerals, counterfeits, cybercrime, corruption, and money laundering converge across four domains at once.</p>
        </div>
        <figure className="concept"><Pic base="/images/museum-convergence" alt="Threat Convergence hall: contraband artifacts suspended in linked spheres around a globe" /><figcaption>Threat Convergence, Hall 07 &middot; concept</figcaption></figure>
        <Convergence head={false} />
      </section>

      <div className="quoteband reveal"><Pic base="/images/museum-gallery-dark" alt="" /><div className="veil" /><div className="wrap"><blockquote>The shadows are all around us. <span>They know no borders.</span></blockquote></div></div>

      <section className="wrap reveal" id="donor">
        <Donor title={<>Become a founding <span>donor</span></>} copy="The digital museum opens in phases from 2027. Underwrite the Museum's public-good mission and join as a founding donor today. Institutional partnerships available for foundations and family offices." tiers={['$100', '$500', '$1,000', '$10,000', '$25,000']} href={`mailto:${site.contact}`} mail={site.contact} />
      </section>
    </>
  );
}
