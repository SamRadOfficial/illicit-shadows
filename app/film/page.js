import Link from 'next/link';
import site from '../../data/site.json';
import films from '../../data/films.json';
import slate from '../../data/slate.json';
import tags from '../../data/tags.json';
import { Pic, SectionHead, Break, Hero, Donor, Prov, Tags } from '../../components/Blocks';
import { VideoEmbed } from '../../components/VideoEmbed';
import { WorkCard } from '../../components/WorkCard';
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
      <Break base="/images/dividers/film-field-investigations" alt="Documentary camera and field notebook at a port" />
      <section className="wrap reveal" id="films">
        <SectionHead label="Film" meta="INVESTIGATIONS" />
        <div className="works">
          {films.map(f => <WorkCard film={f} key={f.slug} segments={SEGMENTS_ON_INDEX} />)}
        </div>
      </section>
      <section className="wrap reveal tight" id="development">
        <SectionHead label="In development" meta="RESEARCH AGENDA" dim />
        <div className="slategrid">
          {slate.map(x => (
            <article className="scard" key={x.slug}>
              <Pic base={x.image} alt={`${x.title}: concept cover`} />
              {/* No title text here: the cover carries the title and the IN DEVELOPMENT stamp
                  already. The card adds only what the art cannot say. */}
              <div className="scard-body">
                <p className="ssub">{x.sub}</p>
                <Tags keys={x.tags} vocab={tags} />
              </div>
            </article>
          ))}
        </div>
        <p className="slate-note">Concept covers for subjects under research. Nothing here is in
          production, and no film is promised until it is shot.</p>
      </section>
      <Break base="/images/break-evidence-3" />
      <section className="wrap reveal" id="trailer">
        <SectionHead label="Trailer" meta="OFFICIAL" dim />
        {/* New key art, 14 Sep. The cut itself still predates the gold shoot, so the copy says so
            rather than implying it represents the current work. */}
        <div className="trailer-band">
          <a className="work-img trailer-img" href={site.social.youtube}><Pic base="/images/film-trailer" alt="Illicit Shadows trailer" /><span className="pb">&#9654;</span></a>
          <div>
            <h3 className="work-title">Trailer</h3>
            <p className="work-line">A first look at the work. Cut before the gold shoot, so it covers the fentanyl investigation.</p>
            <Prov status="illustrative">2024 cut</Prov>
          </div>
        </div>
      </section>
      <section className="wrap reveal">
        <Donor eyebrow="Now streaming" title={<>Watch on <span>YouTube</span></>} copy="New investigative segments released regularly. Subscribe to follow the work across borders." cta="Watch on YouTube" href={site.social.youtube} />
      </section>
    </>
  );
}
