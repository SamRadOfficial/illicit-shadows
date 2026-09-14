import Link from 'next/link';
import site from '../../data/site.json';
import films from '../../data/films.json';
import { Pic, SectionHead, Break, Hero, Donor } from '../../components/Blocks';
export const metadata = { title: 'Film' };

const UPCOMING = [
  { n: 'S1 · E03', title: 'Blood Batteries', sub: "Cobalt supply chains and the DRC's resource wars" },
  { n: 'S1 · E04', title: 'The Iron Triangle', sub: 'Authoritarian influence and the new shadow economy' },
];

export default function Film() {
  const e1 = films[0], e2 = films[1];
  return (
    <>
      <Hero img="/images/break-evidence-1" alt="An evidence wall of pinned photographs and documents" variant="filmhero" pos="center" eyebrow="Investigative Docuseries · Now Streaming"
            title={<>The dark forces shaping the <span className="y">global criminal underworld</span></>}
            lede="Illicit Shadows dives deep into the dark side of global markets, uncovering the clandestine operations and illicit shadows that connect disparate hubs and nodes of seemingly unrelated activities, from the Amazon to the world's busiest ports.">
        <div className="cta-row"><a className="btn btn-y" href="#s1">Watch Season 1</a><a className="btn btn-o" href="#trailer">&#9654; Official Trailer</a></div>
      </Hero>
      <Break base="/images/break-evidence-2" />
      <section className="wrap reveal" id="s1">
        <SectionHead label={`Season 1 · ${e1.title}`} meta="NOW STREAMING" />
        <Link className="film-feature" href={`/film/${e1.slug}`}><Pic base={e1.image} alt={`${e1.title}: ${e1.subtitle}`} /><span className="badge">S1 &middot; E01 &middot; NOW STREAMING</span><span className="pb">&#9654;</span></Link>
        <p className="feat-syn" style={{ textAlign: 'center' }}>{e1.subtitle}. {e1.synopsis}</p>
      </section>
      <section className="wrap reveal tight">
        <SectionHead label="Episodes" meta="SEASON 1" dim />
        <div className="eplist">
          <Link className="ep" href={`/film/${e1.slug}`}><div className="epthumb"><Pic base={e1.image} alt="" /><span className="pb">&#9654;</span></div><div><div className="epn">S1 · E01</div><div className="ept">{e1.title}</div><div className="eps">{e1.subtitle}</div></div><div className="epmeta">NOW STREAMING</div></Link>
          <div className="ep up"><div className="epthumb"><Pic base={e2.image} alt="" /></div><div><div className="epn">S1 · E02</div><div className="ept">{e2.title}</div><div className="eps">{e2.subtitle}</div></div><div className="epmeta">IN PRODUCTION</div></div>
          {UPCOMING.map(u => <div className="ep up" key={u.title}><div className="epthumb soon"><span>COMING SOON</span></div><div><div className="epn">{u.n}</div><div className="ept">{u.title}</div><div className="eps">{u.sub}</div></div><div className="epmeta">UPCOMING</div></div>)}
        </div>
      </section>
      <Break base="/images/break-evidence-3" />
      <section className="wrap reveal" id="trailer">
        <SectionHead label="Official Trailer" meta="WATCH NOW" />
        <a className="film-feature" href={site.social.youtube}><Pic base="/images/film-trailer" alt="Illicit Shadows official trailer" /><span className="pb">&#9654;</span></a>
      </section>
      <section className="wrap reveal">
        <Donor eyebrow="Now streaming" title={<>Watch on <span>YouTube</span></>} copy="New episodes and investigative segments released regularly. Subscribe to follow the investigation across borders." cta="Watch on YouTube" href={site.social.youtube} />
      </section>
    </>
  );
}
