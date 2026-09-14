import Link from 'next/link';
import site from '../data/site.json';
import films from '../data/films.json';
import news from '../data/newsroom.json';
import slate from '../data/slate.json';
import { Pic, SectionHead, Break, Prov, Hero, Signup, Donor } from '../components/Blocks';
import { Icon } from '../components/Icons';
import { Cascade } from '../components/Cascade';
import { WorkCard } from '../components/WorkCard';
import { Convergence } from '../components/Convergence';

// Select by status, not by slug or position: retitles and reordering should not break the page.
const released = films.find(f => f.status === 'streaming');
const inProduction = films.find(f => f.status === 'in-production');
const s = site.stats.illicit_economy;

export default function Home() {
  return (
    <>
      <Hero img="/images/hero-globe" alt="A gold-flecked globe against black" eyebrow="Media · Knowledge · Intelligence"
            title={<>The dark forces shaping the <span className="y">global criminal underworld</span></>}
            lede={<>We expose the <b className="fig">{s.value}</b> shadow economy and predict what it does next.</>}>
        <p className="srcline">Annual value of global illicit economies &middot; <Link href="/sources">{s.source}</Link></p>
        <Signup endpoint={site.forms?.signup} />
        <div className="cta-row" style={{ marginTop: 16 }}><Link className="btn btn-o" href="/film">&#9654; Watch the films</Link></div>
      </Hero>

      <section className="wrap reveal" id="pillars" style={{ paddingTop: 'clamp(112px,13vw,196px)' }}>
        <div style={{ marginBottom: 34 }}>
          <p className="eyebrow" style={{ marginBottom: 14 }}>MISTIC &middot; Illicit Shadows Media, Technology &amp; Innovation Convergence</p>
          <SectionHead label="One Platform · Three Pillars" meta="MISTIC" />
          <p className="mistic-sub" style={{ marginTop: -18 }}>Mapping the intersection of organized crime, emerging technology, and global threat networks.</p>
        </div>
        <div className="pillars">
          <Link className="pill" href="/film"><div className="ph"><span className="pn">01 · Media</span>{Icon.film}</div><div className="s1">Field investigations</div><div className="s2">Illicit Shadows</div><hr className="rr" /><p className="pd">Documentary-grade journalism exposing the shadow systems that move drugs, money, weapons, and humans across borders.</p><p className="pd">Fiction: Illicit Shadows Chronicles, The Umbra Circle (Book 1).</p><div className="ptag">FIRST FILM RELEASED · YOUTUBE</div></Link>
          <Link className="pill" href="/museum"><div className="ph"><span className="pn">02 · Knowledge Hub</span>{Icon.museum}</div><div className="s1">Museum · Est 2025</div><div className="s2">Museum of Illicit Shadows (MIS)</div><hr className="rr" /><p className="pd">A first-of-its-kind virtual museum cataloguing crime convergence: research, exhibitions, and public programming.</p><div className="ptag">LAUNCHING 2027–2028</div></Link>
          <Link className="pill alert" href="/intelligence"><div className="ph"><span className="pn">03 · Intelligence</span>{Icon.network}</div><div className="s1">Predictive Convergence System</div><div className="s2">Project Helix</div><hr className="rr" /><p className="pd">Modeling how illicit networks reorganize after disruption. Strategic foresight, not discrete event forecasting.</p><div className="ptag">ENTERPRISE TECHNOLOGY</div></Link>
        </div>
      </section>

      <section className="wrap reveal band-raised" id="film">
        <SectionHead label="Film" meta="INVESTIGATIONS" />

        {/* Same card as /film, shared so the two pages cannot drift. */}
        <div className="works">
          <WorkCard film={inProduction} priority />
          <WorkCard film={released} segments={3} />
        </div>

        <div className="film-div" />

        <SectionHead label="Trailer" meta="2024 CUT" dim />

        {/* Trailer is the 2024 cut, so it gets a third of the row rather than a full-width block.
            The slate sits beside it: what is coming matters more than what was cut two years ago. */}
        <div className="trailer-row">
          <Link className="trailer-home" href="/film#trailer">
            <Pic base="/images/film-trailer" alt="Illicit Shadows official trailer" />
            <span className="pb">&#9654;</span>
            <span className="badge btm">TRAILER &middot; 2024 CUT</span>
          </Link>
          <div>
            <p className="eyebrow">Upcoming investigations</p>
            <ul className="upnext">
              {slate.slice(0, 4).map(x => (
                <li key={x.slug}><Link href="/film#development"><b>{x.title}</b><span>{x.sub}</span></Link></li>
              ))}
            </ul>
            <p className="seemore"><Link href="/film#development">The full research agenda &rarr;</Link></p>
          </div>
        </div>
      </section>

      <Break base="/images/break-evidence-3" />

      <section className="wrap reveal" id="convergence">
        <Convergence label="Crime convergence" meta="#EVERYTHINGISCONNECTED" lede="Illicit economies are not separate crimes. Narcotics, trafficked humans, looted gold, conflict minerals, counterfeits, cybercrime, corruption, and money laundering move along the same routes, through the same hands, and into the same accounts. They converge across five domains at once." />
      </section>

      <Break base="/images/break-evidence-2" />

      <section className="wrap reveal" id="museum-t">
        <SectionHead label="Knowledge · Museum of Illicit Shadows" meta="MIS · EST 2025" />
        <div className="teaser rev">
          <div className="tcopy">
            <p className="eyebrow">Enter the shadows</p>
            <h2 className="disp" style={{ fontSize: 'clamp(26px,3.6vw,40px)' }}>A museum of crime convergence</h2>
            <p>A first-of-its-kind virtual knowledge hub educating global communities on the harms of illicit economies. Phase I opens 2027.</p>
            <div className="chips"><span className="chip-h">Narcotics</span><span className="chip-h">Counterfeits</span><span className="chip-h">Environmental Crimes</span><span className="chip-h">Trafficking</span></div>
            <div style={{ marginTop: 18 }}><Link className="btn btn-y" href="/museum">Enter the museum</Link></div>
          </div>
          <Link className="film-feature" href="/museum"><Pic base="/images/museum-rotunda" alt="The Eclipse Rotunda: a suspended globe of illuminated trade routes above a circular gallery floor" /><span className="badge btm">MIS &middot; CONCEPT</span></Link>
        </div>
      </section>

      <Break base="/images/break-evidence-3" />

      <section className="wrap reveal" id="books">
        <SectionHead label="Books · Illicit Shadows Chronicles" meta="BOOK 1" />
        <div className="teaser">
          <div style={{ display: 'flex', justifyContent: 'center' }}><Pic base="/images/book-umbra-circle" alt="The Umbra Circle, Book One, by Sam Rad and David M. Luna" className="book3d" /></div>
          <div className="tcopy">
            <p className="eyebrow">Fiction series</p>
            <h2 className="disp" style={{ fontSize: 'clamp(26px,3.6vw,40px)' }}>The Umbra Circle</h2>
            <p>The fiction counterpart to the films: a narrative descent into the same convergence the investigations trace. By Sam Rad and David M. Luna.</p>
            <p className="tag">COMING LATE 2026</p>
            <div style={{ marginTop: 14 }}><Link className="btn btn-o" href="/books/preview">Read the preview &rarr;</Link></div>
          </div>
        </div>
      </section>

      <Break base="/images/break-evidence-1" />

      <section className="wrap reveal" id="news">
        <SectionHead label="Newsroom" meta="LATEST DISPATCHES" />
        <div className="news-grid">
          {news.slice(0, 3).map((n, i) => (
            <Link href="/newsroom" className={`nitem${i === 0 ? ' hot' : ''}`} key={n.title}><div className="nm">{n.kind.toUpperCase()} &middot; {n.date}</div><div className="nt">{n.title}</div></Link>
          ))}
        </div>
      </section>

      <section className="wrap reveal" id="donor">
        <Donor title={<>Become a founding <span>donor</span></>} copy="Underwrite the Museum of Illicit Shadows and back documentary-grade journalism on the systems shaping our world." href={`mailto:${site.contact}`} mail={site.contact} />
      </section>

      <section className="wrap reveal" id="connect" style={{ textAlign: 'center' }}>
        <h2 className="disp" style={{ fontSize: 'clamp(30px,5vw,54px)' }}>Everything <span className="y">is connected.</span></h2>
        <p className="connect-sub">Sign up to receive news, dispatches, and updates from the investigations.</p>
        <Signup endpoint={site.forms?.signup} center />
      </section>
    </>
  );
}
