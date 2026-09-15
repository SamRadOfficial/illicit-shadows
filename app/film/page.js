import Link from 'next/link';
import site from '../../data/site.json';
import films from '../../data/films.json';
import slate from '../../data/slate.json';
import { Pic, Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
export const metadata = { title: 'Film' };

export default function Film() {
  const released = films.find(f => f.status === 'streaming');
  const inProduction = films.find(f => f.status === 'in-production');
  const shorts = (released.segments || []).filter(s => s.image).slice(0, 3);
  return (
    <>
      <Hero img="/images/dividers/film-field-investigations" mobilePos="60% center" alt="A documentary camera and field notebook at a port"
            eyebrow="Field investigations"
            title={<>Follow the money.<br /><span className="y">Find the story.</span></>}
            lede="The routes, people, and hidden systems behind the global illicit economy. Reported from the field.">
        <div className="actions">
          <Link className="ed-btn" href={`/film/${released.slug}`}>Watch {released.title} {Arrow.upRight}</Link>
          <a className="ed-link" href="#trailer">Watch the trailer {Arrow.down}</a>
        </div>
      </Hero>

      <section className="wrap s s-paper" id="watch">
        <div className="feature">
          <Link className="wide" href={`/film/${released.slug}`}>
            <Pic base={released.image} alt={`${released.title}: ${released.subtitle}`} />
            <span className="play-marker">Watch {Arrow.upRight}</span>
          </Link>
          <div>
            <span className="kicker">Now streaming / {released.form} / {released.years}</span>
            <h2>Chemical<br /><em>Cartels</em></h2>
            <p>{released.line}</p>
            <p className="fine">{released.places.join(' · ')}</p>
            <Link className="ed-link" href={`/film/${released.slug}`}>Explore the investigation {Arrow.upRight}</Link>
          </div>
        </div>
        <div className="three">
          {shorts.map(s => (
            <Link className="tile" href={`/film/${released.slug}/${s.slug}`} key={s.slug}>
              <Pic base={s.image} alt={`${s.title} title card`} />
              <h3>{s.title}</h3>
              <p>{s.sub}{s.runtime ? ` · ${s.runtime}` : ''}</p>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 22 }}><Link className="ed-link" href={`/film/${released.slug}#shorts`}>All {released.segments.length} films {Arrow.upRight}</Link></p>
      </section>

      <section className="wrap s s-ink feature reverse" id="gold">
        <div>
          <span className="kicker">In production / {inProduction.years}</span>
          <h2>Gold changes hands.<br /><em>Its origins disappear.</em></h2>
          <p>{inProduction.line}</p>
          <p className="fine">{inProduction.places.join(' · ')}</p>
          <Link className="ed-link" href={`/film/${inProduction.slug}`}>Inside {inProduction.title} {Arrow.upRight}</Link>
        </div>
        <Link className="wide" href={`/film/${inProduction.slug}`}><Pic base={inProduction.image} alt={`${inProduction.title}: ${inProduction.subtitle}`} /></Link>
      </section>

      <section className="wrap s s-paper" id="development">
        <div className="intro">
          <div><span className="kicker">The research agenda</span><h2>Stories <em>taking shape.</em></h2></div>
          <p>Subjects under research. These concept covers describe investigations in development; they are not production announcements.</p>
        </div>
        <div className="upcoming">
          {slate.map(x => (
            <article key={x.slug}>
              <Pic base={x.image} alt={`${x.title}: concept cover`} />
              {/* The covers no longer carry an IN DEVELOPMENT stamp, so the status is stated here.
                  Removing the label from the art does not mean anything has been released. */}
              <p className="status-chip">In development</p>
              <h3>{x.title}</h3>
              <p>{x.sub}.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap s s-slate compact feature" id="trailer">
        <a className="wide" href={site.social.youtube} target="_blank" rel="noopener noreferrer">
          <Pic base="/images/film-trailer" alt="Illicit Shadows official trailer" />
          <span className="play-marker">YouTube {Arrow.upRight}</span>
        </a>
        <div>
          <span className="kicker">Official trailer / 2024 cut</span>
          <h2>A first look<br /><em>into the shadows.</em></h2>
          <p>Made before the gold shoot, the trailer introduces the fentanyl investigation and the wider world behind it.</p>
          <a className="ed-link" href={site.social.youtube} target="_blank" rel="noopener noreferrer">Watch on YouTube {Arrow.upRight}</a>
        </div>
      </section>
    </>
  );
}
