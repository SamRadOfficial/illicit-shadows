import Link from 'next/link';
import { Pic, Prov, Tags } from './Blocks';
import { VideoEmbed } from './VideoEmbed';
import site from '../data/site.json';
import tags from '../data/tags.json';

/**
 * One film, one treatment. Used by /film and the home page so the two cannot drift: the home
 * version was a hand-rolled copy that fell behind within a day.
 *
 * Art left, copy right, and the short films spanning both columns underneath, because the key art
 * is typographic and must never be cover-cropped to match a card grown tall by that list.
 * `segments` is the number of short covers to show; the card links through for the rest.
 */
export function WorkCard({ film, segments = 3, priority = false }) {
  const live = film.status === 'streaming';
  const shorts = (film.segments || []).filter(s => s.image);
  return (
    <article className="work">
      <Link className="work-img" href={`/film/${film.slug}`}>
        <Pic base={film.image} alt={`${film.title}: ${film.subtitle}`} priority={priority} />
        <Prov status={live ? 'cited' : 'investigating'} className="work-status">{live ? 'Released' : 'In production'}</Prov>
      </Link>
      <div className="work-body">
        <p className="work-id">Investigation &middot; {film.years}</p>
        <h3 className="work-title"><Link href={`/film/${film.slug}`}>{film.title}</Link></h3>
        <p className="work-places">{film.places.join(' · ')}</p>
        <p className="work-line">{film.line}</p>
        <Tags keys={film.tags} vocab={tags} />
      </div>
      {shorts.length > 0 && <div className="segwrap">
        <p className="segcap">{film.form}</p>
        <div className="minigrid">
          {shorts.slice(0, segments).map(s => (
            <div className="minicard" key={s.n}>
              <span className="minicard-img">
                <VideoEmbed modal id={s.youtubeId} image={s.image} alt={`${s.title} title card`} title={s.title} channel={film.youtube || site.social.youtube} />
              </span>
              <Link className="minicard-t" href={`/film/${film.slug}/${s.slug}`}>{s.title}</Link>
              {s.sub && <span className="minicard-s">{s.sub}</span>}
              {s.runtime && <span className="minicard-r">{s.runtime}</span>}
            </div>
          ))}
        </div>
        <p className="seemore"><Link href={`/film/${film.slug}`}>All {film.segments.length} &rarr;</Link></p>
      </div>}
    </article>
  );
}
