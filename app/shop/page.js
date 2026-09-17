import Link from 'next/link';
import { Pic, Hero } from '../../components/Blocks';
import { ShopWaitlist } from '../../components/ShopWaitlist';
import { Arrow } from '../../components/Icons';

export const metadata = {
  title: 'Shop',
  description: 'The first Museum of Illicit Shadows collection: caps, tees and outerwear. Join the waitlist.',
};

/* Concept designs, not stock. Each is labelled as such: nobody has held one of these yet, and the
   site should not imply otherwise. */
const PRODUCTS = [
  { name: 'MIS eclipse cap', image: '/images/shop/hat-mis', line: 'Embroidered eclipse, structured six-panel.' },
  { name: 'Illicit Shadows cap', image: '/images/shop/hat-is', line: 'Wordmark in signal yellow.' },
  { name: 'Everything is connected cap', image: '/images/shop/hat-connected', line: 'Three lines, front and centre.' },
  { name: 'MIS eclipse tee', image: '/images/shop/tee-mis', line: 'Eclipse at the chest, on heavyweight cotton.' },
  { name: 'Illicit Shadows tee', image: '/images/shop/tee-is', line: 'The wordmark, small and left.' },
  { name: 'Everything is connected tee', image: '/images/shop/tee-connected', line: 'Set in alert red.' },
  { name: 'Convergence network tee', image: '/images/shop/tee-network', line: 'The convergence map as a line drawing.' },
  { name: 'MIS bomber', image: '/images/shop/bomber-mis', line: 'Embroidered eclipse on a black bomber.' },
  { name: 'Illicit Shadows bomber', image: '/images/shop/bomber-is', line: 'Wordmark on the chest.' },
];

export default function Shop() {
  return (
    <>
      <Hero img="/images/museum-rotunda" alt="" variant="short" mobilePos="52% center"
            eyebrow="MIS shop"
            title={<>Wear the<br /><span className="y">evidence.</span></>}
            lede="The first Museum of Illicit Shadows collection. Nothing is on sale yet: join the waitlist and we will write when the first pieces are made." />

      <section className="wrap s s-ink">
        <figure className="shop-lead">
          <Pic base="/images/shop/hats-set" alt="Three MIS caps: Illicit Shadows, the eclipse, and Everything is connected" priority />
          <figcaption className="fine">Design concepts. Nothing here has been produced yet.</figcaption>
        </figure>
      </section>

      <section className="wrap s s-paper" id="collection">
        <div className="intro">
          <div><span className="kicker">The first collection</span><h2>Nine pieces,<br /><em>one argument.</em></h2></div>
          <p>Every purchase will fund the investigations, the museum, and the programming around them,
            the same as a contribution.</p>
        </div>
        <div className="shopitems">
          {PRODUCTS.map(p => (
            <article key={p.name}>
              <Pic base={p.image} alt={`${p.name}, design concept`} />
              <h3>{p.name}</h3>
              <p>{p.line}</p>
            </article>
          ))}
        </div>
        <p className="fine" style={{ marginTop: 26 }}>Images are design concepts rather than
          photographs. Fabric, print and embroidery will be photographed once the first run exists.</p>
      </section>

      <section className="wrap s s-slate" id="waitlist">
        <div className="intro">
          <div><span className="kicker">Waitlist</span><h2>Tell us what<br /><em>to make first.</em></h2></div>
          <p>Pick the pieces you would want and your size. That decides what gets produced, and in
            what quantity.</p>
        </div>
        <ShopWaitlist products={PRODUCTS} />
      </section>

      <section className="wrap s s-ink compact cta-band">
        <div>
          <span className="kicker">Wholesale and institutional orders</span>
          <h2>Bulk, conference, and partner orders.</h2>
          <p>For quantities, co-branding, or an order tied to an event, write to us directly.</p>
        </div>
        <Link className="ed-btn" href="/contact?interest=museum">Shop enquiries {Arrow.upRight}</Link>
      </section>
    </>
  );
}
