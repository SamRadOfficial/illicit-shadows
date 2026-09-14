import Link from 'next/link';
import books from '../../data/books.json';
import { Pic, SectionHead, Break, Prov } from '../../components/Blocks';
export const metadata = { title: 'Books' };

export default function Books() {
  const [one, ...rest] = books;
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(48px,7vw,88px)' }}>
        <p className="eyebrow">The publishing arm</p>
        <h1 className="disp" style={{ marginTop: 14 }}>Read the <span className="y">shadows</span></h1>
        <p className="lead-line" style={{ marginTop: 18 }}>A trilogy tracing one system: the network
          that built itself inside legitimate institutions, the state that comes to collect, and the
          older alliance that wakes up to both.</p>
      </section>

      <section className="wrap reveal tight">
        <SectionHead label="Fiction series" meta="ILLICIT SHADOWS CHRONICLES" />
        <div className="umbra">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pic base={one.image} alt={`${one.title}, Book One`} className="book3d" priority />
          </div>
          <div>
            <p className="eyebrow">Book {one.n}</p>
            <h3>The Umbra <span>Circle</span></h3>
            <p className="logline">{one.logline}</p>
            <p>{one.blurb}</p>
            <p className="meta" style={{ margin: '14px 0 18px' }}>{one.status.toUpperCase()} &middot; BY SAM RAD AND DAVID M. LUNA</p>
            <Link className="btn btn-y" href={one.preview}>Read the preview</Link>
          </div>
        </div>
      </section>

      <Break base="/images/dividers/books-narrative-universe" alt="Open book and pen beside a rainy city window" />

      <section className="wrap reveal">
        <SectionHead label="The trilogy" meta="BOOKS TWO AND THREE" dim />
        {/* No covers yet, so these are text cards rather than placeholder art. */}
        <div className="trilogy">
          {rest.map(b => (
            <article className="tcard" key={b.slug}>
              <Pic base={b.image} alt={`${b.title}, Book ${b.n}`} className="bookcover" />
              <div className="tcard-body">
                <p className="eyebrow">Book {b.n}</p>
                <h3 className="lead-title sm">{b.title}</h3>
                <p className="logline">{b.logline}</p>
                <Prov status="investigating">{b.status}</Prov>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
