import Link from 'next/link';
import site from '../../../data/site.json';
import books from '../../../data/books.json';
import { Pic, Signup } from '../../../components/Blocks';
import { Arrow } from '../../../components/Icons';
export const metadata = { title: 'The Umbra Circle · Preview' };

export default function Preview() {
  const one = books[0];
  return (
    <>
      <section className="wrap s s-ink detail-title">
        <span className="kicker"><Link href="/books">The Chronicles</Link> <span className="kmuted">/ Book 1</span></span>
        <h1>The Umbra <em>Circle</em></h1>
        <p>By Sam Rad and David M. Luna</p>
      </section>

      <section className="wrap s s-paper book-feature">
        <div className="book-stage"><Pic base={one.mockup} alt={`${one.title} book mockup`} priority /></div>
        <div>
          <span className="kicker">{one.status}</span>
          <h2>They built a museum.<br /><em>They uncovered a network.</em></h2>
          <p className="deck">{one.hook}</p>
          {one.blurb.split(/\n{2,}/).map((t, i) => <p key={i}>{t}</p>)}
          <p className="fine">Washington, D.C. · London · Rome · Mexico City</p>
          {/* Unpublished state stays accurate: no invented extract. */}
          <div className="extract">
            <span className="kicker">First pages</span>
            <h3>The extract is forthcoming.</h3>
            <p>The opening pages have not been published here yet. Sign up for release news and updates.</p>
          </div>
        </div>
      </section>

      <section className="wrap s s-slate compact signup-band">
        <div><h2>Get the next chapter.</h2><p>Updates from the Chronicles and the investigations behind the fiction.</p></div>
        <Signup endpoint={site.forms?.signup} subscribe={false} />
      </section>
    </>
  );
}
