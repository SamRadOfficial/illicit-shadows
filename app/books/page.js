import Link from 'next/link';
import site from '../../data/site.json';
import books from '../../data/books.json';
import { Pic, Hero, Signup } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
export const metadata = { title: 'Books' };

export default function Books() {
  const [one, ...rest] = books;
  return (
    <>
      {/* The owner's books hero (15 Sep) is newer than the package's trilogy render, so it stays. */}
      <Hero img="/images/books-hero" alt="" mobilePos="62% center" pos="58% center" variant="soft"
            eyebrow="Illicit Shadows Chronicles / Fiction"
            title={<>Read<br /><span className="y">the shadows.</span></>}
            lede="A hidden network. A state that comes to collect. An older alliance that wakes to both.">
        <div className="actions"><a className="ed-btn" href="#trilogy">Discover the trilogy {Arrow.down}</a></div>
      </Hero>

      <section className="wrap s s-paper book-feature" id="trilogy">
        <div className="book-stage"><Pic base={one.mockup} alt={`${one.title} book mockup`} priority /></div>
        <div>
          <span className="kicker">Book 1 / {one.status}</span>
          <h2>The Umbra<br /><em>Circle</em></h2>
          <p className="deck">The museum was built to expose a hidden world. Then that world came looking.</p>
          <p>{one.blurb}</p>
          <p className="byline">By Sam Rad and David M. Luna</p>
          <Link className="ed-link" href={one.preview}>Explore the book {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-ink" id="widens">
        <div className="feature reverse">
          <div>
            <span className="kicker">The story continues</span>
            <h2>The circle<br /><em>widens.</em></h2>
            <p>Books two and three are in development: the state actor that let them build it, and an older, colder alliance waking south of the equator.</p>
          </div>
          <Pic base="/images/books-trilogy-hero" className="trishot" alt="The three Illicit Shadows Chronicles novels standing on a wet street at night" />
        </div>
        <div className="sequels" style={{ marginTop: 44 }}>
          {rest.map(b => (
            <article key={b.slug}>
              <div className="book-stage"><Pic base={b.mockup} alt={`${b.title} book mockup`} /></div>
              <span className="kicker">Book {b.n} / {b.status}</span>
              <h3>{b.title}</h3>
              <p>{b.logline}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap s s-slate compact two">
        <div><span className="kicker">Fiction. Real-world questions.</span><h2>Another route<br /><em>into the same world.</em></h2></div>
        <div>
          <p>The Chronicles are fiction. The films and museum explore the real illicit markets and convergence themes that inform the narrative universe.</p>
          <Link className="ed-link" href="/film">Explore the investigations {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-paper compact signup-band">
        <div><h2>Get the next chapter.</h2><p>Release news and updates from the world of Illicit Shadows.</p></div>
        <Signup endpoint={site.forms?.signup} subscribe={false} />
      </section>
    </>
  );
}
