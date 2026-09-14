import Link from 'next/link';
import site from '../../../data/site.json';
import films from '../../../data/films.json';
import sources from '../../../data/sources.json';
import { Pic, SectionHead, Break, Stat, Prov } from '../../../components/Blocks';

export function generateStaticParams() { return films.map(f => ({ slug: f.slug })); }
export function generateMetadata({ params }) { const f = films.find(x => x.slug === params.slug); return { title: f?.title }; }
const srcName = id => { const s = sources.find(x => x.id === id); return s ? `${s.publisher}, ${s.date.slice(0, 4)}` : ''; };

export default function Episode({ params }) {
  const f = films.find(x => x.slug === params.slug);
  const next = films.find(x => x.number === f.number + 1);
  const live = f.status === 'streaming';
  const [a, b] = f.title.split(' ');
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(48px,7vw,88px)', paddingBottom: 'clamp(48px,7vw,88px)' }}>
        <div className="crumb"><Link href="/film">Film</Link> &nbsp;/&nbsp; Season {f.season} &nbsp;/&nbsp; <b>Episode {String(f.number).padStart(2, '0')}</b></div>
        <h1 className="ep-title">{a} <span>{b}</span></h1>
        <p className="ep-sub">{f.subtitle}.</p>
        <a className="ep-player" href={f.youtube || site.social.youtube}><Pic base={f.image} alt={`${f.title} title card`} priority />{live && <span className="pb">&#9654;</span>}{!live && <span className="badge red">IN PRODUCTION</span>}</a>
        <div className="ep-meta">
          {live ? <span className="live">&#9679; NOW STREAMING</span> : <span className="live">&#9679; IN PRODUCTION</span>}
          <span>SEASON {f.season} &middot; EPISODE {String(f.number).padStart(2, '0')}</span>
          {f.segments && <span>{f.segments.length} SEGMENTS</span>}{f.runtime && <span>{f.runtime.toUpperCase()}</span>}{f.locations && <span>{f.locations.map(l => l.split(',')[1]?.trim() || l).join(' · ').toUpperCase()}</span>}
          {live && <a href={f.youtube || site.social.youtube}>Watch on YouTube &rarr;</a>}
        </div>
      </section>
      <Break base="/images/break-evidence-3" />
      <section className="wrap reveal">
        <SectionHead label="About the Episode" meta="SYNOPSIS" />
        <div className="ep-about">
          <div>
            <p>{f.synopsis}</p>
            {f.slug === 'chemical-cartels' && <>
              <p>From the streets of San Francisco to the cartel fentanyl labs in Mexico and Canada, from the Chinese chemical companies to Canadian ports, we follow the chemical trail back through illicit supply chains: inter-modal transportation nodes of maritime shipping, highways, courier services, banking, real estate, e-commerce, and social media apps.</p>
              <p>We bring greater insight to policy makers, law enforcement, and victimized communities on today's illegal fentanyl trade as it finances other criminal activities and profits are laundered in financial safe havens that converge across Mexico and the United States.</p>
            </>}
            {f.stats && <div className="statgrid">{f.stats.map(s => <div className="statcell" key={s.label}><Stat n={s.n} src={srcName(s.source)} size="clamp(20px,2.4vw,28px)" /><div className="lb">{s.label}</div></div>)}</div>}
          </div>
          <div className="credits">
            <h4>Credits</h4>
            <div className="cr"><div className="ck">DOCUSERIES BY</div><div className="cv">ICAIE + RADOC</div></div>
            <div className="cr"><div className="ck">EXECUTIVE PRODUCERS</div><div className="cv">David M. Luna &middot; Sam Rad</div></div>
            {f.host && <div className="cr"><div className="ck">HOST</div><div className="cv">{f.host}</div></div>}
            {f.voice && <div className="cr"><div className="ck">INSTITUTIONAL VOICE</div><div className="cv">{f.voice}</div></div>}
            <div className="cr"><div className="ck">PRODUCTION</div><div className="cv">An Illicit Shadows Production</div></div>
            <div className="cr"><div className="ck">STREAMING</div><div className="cv">YouTube &middot; @illicitshadowsdoc</div></div>
          </div>
        </div>
      </section>
      {f.segments && <section className="wrap reveal tight">
        <SectionHead label="Segments" meta={`${f.title.toUpperCase()} · ${f.segments.length} PARTS`} dim />
        <div className="seglist">{f.segments.map(s => <a className="seg" href={site.social.youtube} key={s.n}><div className="sgn">{String(s.n).padStart(2, '0')}</div><div><div className="sgt">{s.title}</div><div className="sgs">{s.sub}</div></div><div className="sgd">{s.runtime}</div></a>)}</div>
      </section>}
      {f.locations && <section className="wrap reveal tight">
        <SectionHead label="Locations" meta="THREE COUNTRIES" dim />
        <div className="chips">{f.locations.map(l => <span className="chip-h" key={l}>{l}</span>)}</div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 14 }}><Prov status="investigating">in production</Prov> &nbsp; Locations describe planned filming.</p>
      </section>}
      {next && <><Break base="/images/break-evidence-2" /><section className="wrap reveal">
        <SectionHead label="Up Next" meta={`SEASON ${next.season} · EPISODE ${String(next.number).padStart(2, '0')}`} />
        <Link className="film-feature" href={`/film/${next.slug}`}><Pic base={next.image} alt={next.title} /><span className="badge red">S{next.season} &middot; E{String(next.number).padStart(2, '0')} &middot; {next.status.replace('-', ' ').toUpperCase()}</span></Link>
      </section></>}
    </>
  );
}
