import Link from 'next/link';
import site from '../../../data/site.json';
import films from '../../../data/films.json';
import sources from '../../../data/sources.json';
import tags from '../../../data/tags.json';
import { Pic, SectionHead, Break, Stat, Prov, Tags } from '../../../components/Blocks';
import { VideoEmbed } from '../../../components/VideoEmbed';
import { VideoJsonLd } from '../../../components/Schema';

export function generateStaticParams() { return films.map(f => ({ slug: f.slug })); }
// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({ params }) { const { slug } = await params; const f = films.find(x => x.slug === slug); return { title: f?.title }; }
const srcName = id => { const s = sources.find(x => x.id === id); return s ? `${s.publisher}, ${s.date.slice(0, 4)}` : ''; };

export default async function Investigation({ params }) {
  const { slug } = await params;
  const f = films.find(x => x.slug === slug);
  // "Also from Illicit Shadows", not "up next": ordering is by subject, not by position in a run.
  const other = films.find(x => x.slug !== slug);
  const live = f.status === 'streaming';
  const [a, b] = f.title.split(' ');
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(48px,7vw,88px)', paddingBottom: 'clamp(48px,7vw,88px)' }}>
        <div className="crumb"><Link href="/film">Film</Link> &nbsp;/&nbsp; <b>{f.title}</b></div>
        <h1 className="ep-title">{a} <span>{b}</span></h1>
        <p className="ep-sub">{f.subtitle}.</p>
        {live
          ? <VideoEmbed className="ep-player" id={f.youtubeId} list={f.playlist} image={f.image} alt={`${f.title} title card`} title={f.title} channel={f.youtube || site.social.youtube} big />
          : <div className="ep-player"><Pic base={f.image} alt={`${f.title} title card`} priority /><span className="badge red btm">IN PRODUCTION</span></div>}
        <div className="ep-meta">
          {live ? <span className="live">&#9679; NOW STREAMING</span> : <span className="live">&#9679; IN PRODUCTION</span>}
          {f.form && <span>{f.form.toUpperCase()}</span>}
          {f.segments && <span>{f.segments.length} SEGMENTS</span>}{f.locations && <span>{f.locations.map(l => l.split(',')[1]?.trim() || l).join(' · ').toUpperCase()}</span>}
          {live && <a href={f.youtube || site.social.youtube}>Watch on YouTube &rarr;</a>}
        </div>
      </section>
      <VideoJsonLd type="Movie" name={f.title} description={f.synopsis} image={f.image}
                   youtubeId={f.youtubeId} published={f.published} />
      <Break base="/images/break-evidence-3" />
      <section className="wrap reveal">
        <SectionHead label="About this investigation" meta="SYNOPSIS" />
        <div className="ep-about">
          <div>
            <p>{f.synopsis}</p>
            {f.slug === 'chemical-cartels' && <>
              <p>From the streets of San Francisco to the cartel fentanyl labs in Mexico and Canada, from the Chinese chemical companies to Canadian ports, we follow the chemical trail back through illicit supply chains: inter-modal transportation nodes of maritime shipping, highways, courier services, banking, real estate, e-commerce, and social media apps.</p>
              <p>We bring greater insight to policy makers, law enforcement, and victimized communities on today's illegal fentanyl trade as it finances other criminal activities and profits are laundered in financial safe havens that converge across Mexico and the United States.</p>
            </>}
            <Tags keys={f.tags} vocab={tags} />
            {f.stats && <div className="statgrid">{f.stats.map(s => <div className="statcell" key={s.label}><Stat n={s.n} src={srcName(s.source)} size="clamp(20px,2.4vw,28px)" /><div className="lb">{s.label}</div></div>)}</div>}
          </div>
          <div className="credits">
            <h4>Credits</h4>
            <div className="cr"><div className="ck">AN INVESTIGATION BY</div><div className="cv">ICAIE + RADOC</div></div>
            <div className="cr"><div className="ck">EXECUTIVE PRODUCERS</div><div className="cv">David M. Luna &middot; Sam Rad</div></div>
            {f.host && <div className="cr"><div className="ck">HOST</div><div className="cv">{f.host}</div></div>}
            {f.voice && <div className="cr"><div className="ck">INSTITUTIONAL VOICE</div><div className="cv">{f.voice}</div></div>}
            <div className="cr"><div className="ck">PRODUCTION</div><div className="cv">An Illicit Shadows Production</div></div>
            <div className="cr"><div className="ck">STREAMING</div><div className="cv">YouTube &middot; {site.social.handle}</div></div>
          </div>
        </div>
      </section>
      {f.segments && <section className="wrap reveal tight">
        <SectionHead label={f.form || 'Segments'} meta={`${f.title.toUpperCase()} · ${f.segments.length} PARTS`} dim />
        {/* A short with artwork gets a card; one without stays a text row until its cover exists,
            so a missing image never renders as a placeholder tile. Owner pick, 14 Sep. */}
        {f.segments.some(s => s.image) && <div className="sggrid">
          {f.segments.filter(s => s.image).map(s => (
            <div className="sgcard" key={s.n}>
              <span className="sgcard-img">
                <VideoEmbed id={s.youtubeId} image={s.image} alt={`${s.title} title card`} title={s.title} channel={f.youtube || site.social.youtube} />
                <span className="sgcard-n">{String(s.n).padStart(2, '0')}</span>
              </span>
              <span className="sgcard-t">{s.title}</span>
              {s.sub && <span className="sgcard-s">{s.sub}</span>}
              {s.runtime && <span className="sgcard-r">{s.runtime}</span>}
              <VideoJsonLd name={`${s.title} · ${f.title}`} description={s.sub || f.subtitle} image={s.image}
                           youtubeId={s.youtubeId} runtime={s.runtime} published={s.published} />
            </div>
          ))}
        </div>}
        {f.segments.some(s => !s.image) && <div className="seglist">
          {f.segments.filter(s => !s.image).map(s => (
            <a className="seg" href={f.youtube || site.social.youtube} key={s.n}>
              <div className="sgn">{String(s.n).padStart(2, '0')}</div>
              <div><div className="sgt">{s.title}</div>{s.sub && <div className="sgs">{s.sub}</div>}</div>
              <div className="sgd">{s.runtime}</div>
            </a>
          ))}
        </div>}
      </section>}
      {f.locations && <section className="wrap reveal tight">
        <SectionHead label="Locations" meta="THREE COUNTRIES" dim />
        <div className="chips">{f.locations.map(l => <span className="chip-h" key={l}>{l}</span>)}</div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 14 }}><Prov status="investigating">in production</Prov> &nbsp; Locations describe planned filming.</p>
      </section>}
      {other && <><Break base="/images/break-evidence-2" /><section className="wrap reveal">
        <SectionHead label="Also from Illicit Shadows" meta={other.places.join(' · ').toUpperCase()} />
        <Link className="film-feature" href={`/film/${other.slug}`}><Pic base={other.image} alt={other.title} /><span className="badge red">{other.title.toUpperCase()} &middot; {other.status === 'streaming' ? 'RELEASED' : 'IN PRODUCTION'}</span></Link>
      </section></>}
    </>
  );
}
