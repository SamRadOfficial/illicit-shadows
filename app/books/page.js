import Link from 'next/link';
import books from '../../data/books.json';
import { Pic, SectionHead, Break, Prov, Hero } from '../../components/Blocks';
export const metadata = { title: 'Books' };

export default function Books() {
  const [one, ...rest] = books;
  return (
    <>
      {/* The trilogy render is dark left and books right, so it works as a hero with the copy in
          the empty half, the same composition rule as the globe. */}
      <Hero img="/images/books-trilogy-hero" alt="The three Illicit Shadows Chronicles hardbacks standing on a wet street at night"
            eyebrow="The publishing arm" pos="right center" mobilePos="68% center"
            title={<>Read the <span className="y">shadows</span></>}
            lede="A trilogy tracing one system: the network that built itself inside legitimate institutions, the state that comes to collect, and the older alliance that wakes up to both." />

      <section className="wrap reveal tight">
        <SectionHead label="Fiction series" meta="ILLICIT SHADOWS CHRONICLES" />
        <div className="umbra">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pic base={one.mockup} alt={`${one.title}, Book One`} className="bookmock" priority />
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
              <Pic base={b.mockup} alt={`${b.title}, Book ${b.n}`} className="bookmock" />
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
