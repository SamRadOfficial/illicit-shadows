import site from '../../data/site.json';
import own from '../../data/newsroom.json';
import icaie from '../../data/newsroom-icaie.json';
import { Hero, Signup } from '../../components/Blocks';
import { NewsIndex } from '../../components/NewsIndex';
export const metadata = { title: 'Newsroom' };

export default function Newsroom() {
  return (
    <>
      {/* Hero like every other page, not the package's split masthead: the same image, the same
          dark-left composition, the copy in the empty space. */}
      <Hero img="/images/hero-newsroom" mobilePos="58% center" alt="A desk of contact sheets, a field recorder and a notebook under lamplight"
            eyebrow="The wire"
            title={<>News from<br /><span className="y">the shadows.</span></>}
            lede="Dispatches, press, and releases from the investigations." />

      <section className="wrap s s-paper">
        <NewsIndex items={[...own, ...icaie].sort((a, b) => (b.date || '').localeCompare(a.date || ''))} />
      </section>

      <section className="wrap s s-ink compact signup-band">
        <div><span className="kicker">Stay connected</span><h2>Follow the work<br /><em>as it unfolds.</em></h2></div>
        <Signup endpoint={site.forms?.signup} subscribe={false} />
      </section>
    </>
  );
}
