import Link from 'next/link';
import site from '../../data/site.json';
import films from '../../data/films.json';
import slate from '../../data/slate.json';
import tags from '../../data/tags.json';
import { Pic, SectionHead, Break, Hero, Donor, Prov, Tags } from '../../components/Blocks';
import { VideoEmbed } from '../../components/VideoEmbed';
export const metadata = { title: 'Film' };

// No ordinals on public pages. Cardinal counters (ten short films, 01 to 10) are fine; Season N
// and Episode N are not, because a film that is an episode of a series is generally ineligible
// for documentary awards and festival forms ask directly. See HANDOFF.
// Three covers on the index is proof the work exists; the full set lives on the film page.
const SEGMENTS_ON_INDEX = 3;

export default function Film() {
  const [lead, released] = films;
  return (
    <>
      <Hero img="/images/break-evidence-1" alt="An evidence wall of pinned photographs and documents" variant="filmhero" pos="center" eyebrow="Field investigations"
            title={<>The dark forces shaping the <span className="y">global criminal underworld</span></>}
            lede="Illicit Shadows investigates the global illicit economy: where the money moves, who it pays, and what it costs the people living on top of it. Each investigation begins as field research and becomes a film, a museum hall, and a public source index.">
        <div className="cta-row"><Link className="btn btn-y" href={`/film/${released.slug}`}>Watch now</Link><a className="btn btn-o" href="#trailer">&#9654; Trailer</a></div>
      </Hero>
      <Break base="/images/break-evidence-2" />
      <section className="wrap reveal" id="films">
        <SectionHead label="Film" meta="INVESTIGATIONS" />
        <div className="works">
          {films.map(f => (
            <article className="work" key={f.slug}>
              <Link className="work-img" href={`/film/${f.slug}`}>
                <Pic base={f.image} alt={`${f.title}: ${f.subtitle}`} />
                <Prov status={f.status === 'streaming' ? 'cited' : 'investigating'} className="work-status">{f.status === 'streaming' ? 'Released' : 'In production'}</Prov>
              </Link>
              <div className="work-body">
                <h3 className="work-title"><Link href={`/film/${f.slug}`}>{f.title}</Link></h3>
                <p className="work-places">{f.places.join(' · ')}</p>
                <p className="work-line">{f.line}</p>
                <Tags keys={f.tags} vocab={tags} />
              </div>
              {/* Spans both columns: the key art is typographic, so the image must keep its 16:9
                  and never be cover-cropped to match a card grown tall by this list. */}
              {f.segments && <div className="segwrap">
                <p className="segcap">{f.form}</p>
                <div className="minigrid">
                  {f.segments.filter(s => s.image).slice(0, SEGMENTS_ON_INDEX).map(s => (
                    <div className="minicard" key={s.n}>
                      <span className="minicard-img">
                        <VideoEmbed id={s.youtubeId} image={s.image} alt={`${s.title} title card`} title={s.title} channel={f.youtube || site.social.youtube} />
                      </span>
                      <Link className="minicard-t" href={`/film/${f.slug}`}>{s.title}</Link>
                      {s.runtime && <span className="minicard-r">{s.runtime}</span>}
                    </div>
                  ))}
                </div>
                <p className="seemore"><Link href={`/film/${f.slug}`}>All {f.segments.length} &rarr;</Link></p>
              </div>}
            </article>
          ))}
        </div>
      </section>
      <section className="wrap reveal tight">
        <SectionHead label="In development" meta="RESEARCH AGENDA" dim />
        <div className="slate">
          {slate.map(s => (
            <div className="srow" key={s.slug}>
              <div><h4 className="stitle">{s.title}</h4><p className="ssub">{s.sub}</p></div>
              <Tags keys={s.tags} vocab={tags} />
            </div>
          ))}
        </div>
      </section>
      <Break base="/images/break-evidence-3" />
      <section className="wrap reveal" id="trailer">
        <SectionHead label="Trailer" meta="2024 CUT" dim />
        {/* 2024 cut. Predates the gold work and carries the old series branding on screen. Kept
            reachable, marked as an archive cut, and deliberately not given a hero slot. */}
        <div className="trailer-band">
          <a className="work-img trailer-img" href={site.social.youtube}><Pic base="/images/film-trailer" alt="Illicit Shadows trailer" /><span className="pb">&#9654;</span></a>
          <div>
            <h3 className="work-title">Trailer</h3>
            <p className="work-line">The 2024 cut, made before the gold work began. Kept for reference until a new cut exists.</p>
            <Prov status="illustrative">Archive cut</Prov>
          </div>
        </div>
      </section>
      <section className="wrap reveal">
        <Donor eyebrow="Now streaming" title={<>Watch on <span>YouTube</span></>} copy="New investigative segments released regularly. Subscribe to follow the work across borders." cta="Watch on YouTube" href={site.social.youtube} />
      </section>
    </>
  );
}
