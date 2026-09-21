import Link from 'next/link';
import site from '../../../../data/site.json';
import films from '../../../../data/films.json';
import { Pic } from '../../../../components/Blocks';
import { Arrow } from '../../../../components/Icons';
import { VideoEmbed } from '../../../../components/VideoEmbed';
import { VideoJsonLd } from '../../../../components/Schema';

export function generateStaticParams() {
  return films.flatMap(f => (f.segments || []).filter(s => s.slug).map(s => ({ slug: f.slug, short: s.slug })));
}
function find(slug, short) { const film = films.find(x => x.slug === slug); return [film, film?.segments?.find(s => s.slug === short)]; }
export async function generateMetadata({ params }) {
  const { slug, short } = await params; const [film, s] = find(slug, short);
  if (!s) return {};
  return { title: `${s.title} · ${film.title}`, description: s.sub || film.subtitle, openGraph: { siteName: 'Illicit Shadows', type: 'article', images: [`${s.image}.jpg`] } };
}

export default async function Short({ params }) {
  const { slug, short } = await params;
  const [film, s] = find(slug, short);
  const list = film.segments.filter(x => x.slug);
  const i = list.findIndex(x => x.slug === short);
  const prev = list[i - 1], next = list[i + 1];
  return (
    <>
      <section className="wrap s s-ink detail-title">
        <span className="kicker"><Link href={`/film/${film.slug}`}>{film.title}</Link> <span className="kmuted">/ Short film {String(s.n).padStart(2, '0')} of {list.length}</span></span>
        <h1>{s.title}</h1>
        {s.sub && <p>{s.sub}.</p>}
      </section>

      <section className="wrap s s-ink" style={{ paddingTop: 0 }}>
        {/* In-page lightbox rather than a link out: the film should play here. */}
        <VideoEmbed modal className="wide ep-player" big id={s.youtubeId} image={s.image} alt={`${s.title} title card`} title={s.title} channel={film.youtube || site.social.youtube} />
        <div className="detail-meta">
          <span>Released{s.runtime ? ` · ${s.runtime}` : ''} · {film.places.join(' · ')}</span>
          <a className="ed-link" href={s.youtubeId ? `https://www.youtube.com/watch?v=${s.youtubeId}` : site.social.youtube} target="_blank" rel="noopener noreferrer">Watch on YouTube {Arrow.upRight}</a>
        </div>
      </section>

      <VideoJsonLd name={`${s.title} · ${film.title}`} description={s.sub || film.subtitle} image={s.image} youtubeId={s.youtubeId} runtime={s.runtime} published={s.published} />

      {s.transcript && <section className="wrap s s-paper reading">
        <div>
          <span className="kicker">As broadcast</span>
          <h2>The narration</h2>
          <Link className="ed-link" href={`/film/${film.slug}#shorts`}>All {list.length} films {Arrow.upRight}</Link>
        </div>
        <article className="prose">{s.transcript.map((p, k) => <p key={k}>{p}</p>)}</article>
      </section>}

      <section className="wrap s s-slate compact">
        {next ? (
          <div className="nextcard-ed">
            <Link href={`/film/${film.slug}/${next.slug}`}><Pic base={next.image} alt={`${next.title} title card`} /></Link>
            <div>
              <span className="kicker">Continue the investigation / {String(next.n).padStart(2, '0')} of {list.length}</span>
              <h2>{next.title}</h2>
              {next.sub && <p>{next.sub}.</p>}
              <Link className="ed-link" href={`/film/${film.slug}/${next.slug}`}>Next film {Arrow.upRight}</Link>
            </div>
          </div>
        ) : (
          <div className="next-strip">
            <div><span className="kicker">You have reached the end</span><h2>{film.title}</h2></div>
            <Link className="ed-link" href={`/film/${film.slug}`}>Back to all {list.length} {Arrow.upRight}</Link>
          </div>
        )}
        {prev && <p className="fine" style={{ marginTop: 22 }}><Link href={`/film/${film.slug}/${prev.slug}`}>Previous: {prev.title}</Link></p>}
      </section>
    </>
  );
}
