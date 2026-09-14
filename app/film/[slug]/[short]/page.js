import Link from 'next/link';
import site from '../../../../data/site.json';
import films from '../../../../data/films.json';
import { Pic, SectionHead, Break, Prov } from '../../../../components/Blocks';
import { VideoEmbed } from '../../../../components/VideoEmbed';
import { VideoJsonLd } from '../../../../components/Schema';

/** One page per short film. Eleven subjects on eleven URLs beats eleven subjects on one: each
 *  carries its own title, description and VideoObject, and the narration sits with its film. */
export function generateStaticParams() {
  return films.flatMap(f => (f.segments || []).filter(s => s.slug).map(s => ({ slug: f.slug, short: s.slug })));
}

function find(slug, short) {
  const film = films.find(x => x.slug === slug);
  return [film, film?.segments?.find(s => s.slug === short)];
}

export async function generateMetadata({ params }) {
  const { slug, short } = await params;
  const [film, s] = find(slug, short);
  if (!s) return {};
  return {
    title: `${s.title} · ${film.title}`,
    description: s.sub || film.subtitle,
    openGraph: { images: [`${s.image}.jpg`] },
  };
}

export default async function Short({ params }) {
  const { slug, short } = await params;
  const [film, s] = find(slug, short);
  const list = film.segments.filter(x => x.slug);
  const i = list.findIndex(x => x.slug === short);
  const prev = list[i - 1], next = list[i + 1];

  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(40px,6vw,72px)' }}>
        <div className="crumb">
          <Link href="/film">Film</Link> &nbsp;/&nbsp; <Link href={`/film/${film.slug}`}>{film.title}</Link>
          &nbsp;/&nbsp; <b>{s.title}</b>
        </div>
        <p className="work-id">{film.form} &middot; {String(s.n).padStart(2, '0')} of {list.length}</p>
        <h1 className="ep-title">{s.title}</h1>
        {s.sub && <p className="ep-sub">{s.sub}.</p>}
        <VideoEmbed modal className="ep-player" big id={s.youtubeId} image={s.image}
                    alt={`${s.title} title card`} title={s.title}
                    channel={film.youtube || site.social.youtube} />
        <div className="ep-meta">
          <Prov status="cited">Released</Prov>
          {s.runtime && <span>{s.runtime}</span>}
          <span>{film.places.join(' · ').toUpperCase()}</span>
          <a href={s.youtubeId ? `https://www.youtube.com/watch?v=${s.youtubeId}` : site.social.youtube}
             target="_blank" rel="noopener noreferrer">Watch on YouTube &rarr;</a>
        </div>
      </section>

      <VideoJsonLd name={`${s.title} · ${film.title}`} description={s.sub || film.subtitle}
                   image={s.image} youtubeId={s.youtubeId} runtime={s.runtime} published={s.published} />

      <Break base="/images/dividers/chemical-cartels-precursor-trade" alt="Sealed industrial drums, sample vials, and container seal" />

      {s.transcript && <section className="wrap reveal tight">
        <SectionHead label="Narration" meta="AS BROADCAST" dim />
        {/* Rendered at build time, on the same page as the film it belongs to. */}
        <article className="tx-full">
          {s.transcript.map((para, k) => <p key={k}>{para}</p>)}
        </article>
      </section>}

      <section className="wrap reveal tight">
        <SectionHead label={film.form} meta={film.title.toUpperCase()} dim />
        <nav className="shortnav">
          {prev
            ? <Link className="shortnav-a" href={`/film/${film.slug}/${prev.slug}`}>
                <span className="meta">Previous</span><span className="shortnav-t">{prev.title}</span></Link>
            : <span />}
          <Link className="btn btn-o" href={`/film/${film.slug}`}>All {list.length}</Link>
          {next
            ? <Link className="shortnav-a right" href={`/film/${film.slug}/${next.slug}`}>
                <span className="meta">Next</span><span className="shortnav-t">{next.title}</span></Link>
            : <span />}
        </nav>
      </section>
    </>
  );
}
