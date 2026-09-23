import Link from 'next/link';
import { og } from '../../lib/og';
import { Pic, Hero } from '../../components/Blocks';
import { ShopPicker } from '../../components/ShopPicker';
import { Arrow } from '../../components/Icons';

export const metadata = {
  .../* per page: card, description, canonical */og('shop', {
    description: 'The first Museum of Illicit Shadows collection: caps, tees, outerwear, bags and field kit. Nothing is on sale yet; join the waitlist.',
    path: '/shop',
  }),
  title: 'Shop',
};

/* Concept designs, not stock. Each is labeled as such: nobody has held one of these yet, and the
   site should not imply otherwise. */


export default function Shop() {
  return (
    <>
      <Hero img="/images/museum-rotunda" alt="" variant="short" mobilePos="52% center"
            eyebrow="MIS shop"
            title={<>Wear the<br /><span className="y">shadows.</span></>}
            lede="The first Museum of Illicit Shadows collection. Nothing is on sale yet: join the waitlist and we will write when the first pieces are made." />

      <section className="wrap s s-ink">
        <figure className="shop-lead">
          <Pic base="/images/shop/hats-set" alt="Three MIS caps: Illicit Shadows, the eclipse, and Everything is connected" priority />
          <figcaption className="fine">Design concepts.</figcaption>
        </figure>
      </section>

      <section className="wrap s s-paper" id="collection">
        <div className="intro">
          <div><span className="kicker">The first collection</span><h2>Designed<br /><em>to shine.</em></h2></div>
          <p>Add the pieces you would want and we will make those first. No payment is taken; every
            purchase will fund the investigations, the museum, and the programming around them.</p>
        </div>
        <ShopPicker />
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
