import Link from 'next/link';
import { og } from '../../lib/og';
import site from '../../data/site.json';
import books from '../../data/books.json';
import { Pic, Hero, Signup } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
export const metadata = {
  .../* per page: card, description, canonical */og('books', {
    description: 'The Illicit Shadows Chronicles: geopolitical crime fiction by Sam Rad and David M. Luna. The Umbra Circle, book one, coming 2027.',
    path: '/books',
  }), title: 'Books' };

export default function Books() {
  const [one, ...rest] = books;
  return (
    <>
      {/* The owner's books hero (15 Sep) is newer than the package's trilogy render, so it stays. */}
      <Hero img="/images/books-hero" alt="" mobilePos="62% center" pos="58% center" variant="soft"
            eyebrow="Illicit Shadows Chronicles / Fiction"
            title={<>Enter the<br /><span className="y">narrative universe.</span></>}
            lede="Read the Illicit Shadows Chronicles. Geopolitical crime fiction exploring the hidden shadow systems that shape our world.">
        <div className="actions"><a className="ed-btn" href="#trilogy">Discover the trilogy {Arrow.down}</a></div>
      </Hero>

      <section className="wrap s s-ink book-feature" id="trilogy">
        {/* Cut out and shown large: the flagship gets the object, not a box. */}
        <Pic base={one.transparent} ext="png" className="book-hero" alt={`${one.title} book cover`} priority />
        <div>
          <span className="kicker">Book 1 / {one.status}</span>
          <h2>The Umbra<br /><em>Circle</em></h2>
          <p className="deck">{one.hook}</p>
          <p className="fine">Washington, D.C. &middot; London &middot; Rome &middot; Mexico City</p>
          <p className="byline">By Sam Rad and David M. Luna</p>
          <Link className="ed-link" href={one.preview}>Read the full description {Arrow.upRight}</Link>
          <div className="notify">
            <Signup endpoint={site.forms?.signup} subscribe={false}
                    interest="The Umbra Circle launch" label="Notify me when Book 1 launches" />
          </div>
        </div>
      </section>

      <section className="wrap s s-ink" id="widens">
        <div className="intro">
          <div><span className="kicker">The story continues</span><h2>The circle<br /><em>widens.</em></h2></div>
          <p>Books two and three are in development: the state actor that let them build it, and an
            older, colder alliance waking south of the equator.</p>
        </div>
        {/* Full width, nothing over it, description beneath: the composition already spreads all
            three books across the frame. */}
        <Pic base="/images/books-trilogy-full-bleed-feature" className="trishot"
             alt="Three Illicit Shadows Chronicles books: The Umbra Circle, The Dragon Roars Forward, and The Condor Directive, by Sam Rad and David M. Luna." />
        <div className="sequels">
          {rest.map(b => (
            <article key={b.slug}>
              {/* The trilogy render above already shows these covers at full size, so here they are
                  thumbnails beside the copy rather than a second gallery. */}
              <Pic base={b.transparent} ext="png" className="seq-cover" alt={`${b.title} book cover`} />
              <div>
                <span className="kicker">Book {b.n}</span>
                <h3>{b.title}</h3>
                <p>{b.logline}</p>
                <p className="seq-status">{b.status}</p>
              </div>
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
