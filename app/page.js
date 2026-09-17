import Link from 'next/link';
import { og } from './../lib/og';

export const metadata = { ...og('home') };
import site from '../data/site.json';
import films from '../data/films.json';
import books from '../data/books.json';
import { Pic, Hero, Signup } from '../components/Blocks';
import { Arrow } from '../components/Icons';
import { Pillars } from '../components/Pillars';

const released = films.find(f => f.status === 'streaming');
const inProduction = films.find(f => f.status === 'in-production');
const bookOne = books[0];

export default function Home() {
  return (
    <>
      <Hero img="/images/hero-globe" mobilePos="22% center" alt="A gold-lit globe on black, trade routes arcing between continents"
            eyebrow="Media · Knowledge · Intelligence"
            title={<>The dark forces shaping the <span className="y">global criminal underworld</span></>}
            lede="We investigate the $6 trillion shadow economy, expose the systems behind it, and model how its networks adapt.">
        <div className="actions">
          <Link className="ed-btn" href="/film">Watch the investigations {Arrow.upRight}</Link>
          <a className="ed-link" href="#platform">Meet the platform {Arrow.down}</a>
        </div>
      </Hero>

      <section className="wrap s s-paper" id="platform">
        <Pillars />
      </section>

      <section className="wrap s s-ink" id="film">
        <div className="intro">
          <div><span className="kicker">From the field</span><h2>Follow <em>the story.</em></h2></div>
          <Link className="ed-link" href="/film">All investigations {Arrow.upRight}</Link>
        </div>
        <div className="pair">
          {[released, inProduction].map(f => (
            <article key={f.slug}>
              <Link className="cover" href={`/film/${f.slug}`}><Pic base={f.image} alt={`${f.title}: ${f.subtitle}`} /></Link>
              <div className="cover-cap"><h3>{f.title}</h3><span>{f.status === 'streaming' ? 'Now streaming' : 'In production'} · {f.years}</span></div>
              <p>{f.line}</p>
              <Link className="ed-link" href={`/film/${f.slug}`}>Explore the investigation {Arrow.upRight}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap s s-slate compact two">
        <div><span className="kicker">Strategic intelligence / Project Helix</span><h2>A fusion center for<br /><em>the shadow economy.</em></h2></div>
        <div>
          <p>Our <strong>predictive convergence system</strong> turns fragmented intelligence into
            systemic foresight: how criminal, political, and economic networks reorganize after a
            disruption.</p>
          <Link className="ed-link" href="/intelligence#cascade">Explore the demo {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-paper museum-feature" id="museum-t">
        <Link className="museum-photo" href="/museum">
          <Pic base="/images/museum-convergence" alt="Threat Convergence hall: contraband artifacts suspended in linked spheres around a globe" />
          <span className="photo-cap">Digital museum concept · Phase I planned for 2027</span>
        </Link>
        <div>
          <span className="kicker">Step inside the hidden world</span>
          <h2 className="mis-title">Museum of<br /><em>Illicit Shadows</em></h2>
          <p className="deck">MIS is a first-of-its-kind virtual museum dedicated to educating global
            communities on the harms and impacts to international security of crime convergence and
            illicit economies around the world.</p>
          <p>Explore the connections between illicit economies, the communities they affect, and the systems that sustain them.</p>
          <Link className="ed-link" href="/museum">Explore the museum {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-ink reading-pair" id="books">
        <article className="book-teaser">
          <Pic base={bookOne.image} alt={`${bookOne.title} book cover`} />
          <div>
            <span className="kicker">Illicit Shadows Chronicles &middot; Fiction</span>
            <h2>{bookOne.title}</h2>
            <p>{bookOne.hook}</p>
            <p className="fine">Sam Rad &amp; David M. Luna · {bookOne.status}</p>
            <Link className="ed-link" href="/books">Enter the trilogy {Arrow.upRight}</Link>
          </div>
        </article>
        <article className="wire-teaser" id="connect">
          <span className="kicker">Newsroom</span>
          <h2>Keep following<br /><em>the story.</em></h2>
          <p>Dispatches, press, and updates from the investigations.</p>
          <Link className="ed-link" href="/newsroom">Visit the newsroom {Arrow.upRight}</Link>
          <div style={{ marginTop: 28 }}><Signup endpoint={site.forms?.signup} subscribe={false} /></div>
        </article>
      </section>

    </>
  );
}
