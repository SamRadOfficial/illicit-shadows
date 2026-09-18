import Link from 'next/link';
import { og } from '../../../lib/og';
import site from '../../../data/site.json';
import films from '../../../data/films.json';
import { Pic, Prov } from '../../../components/Blocks';
import { Arrow } from '../../../components/Icons';
import { VideoEmbed } from '../../../components/VideoEmbed';
import { VideoJsonLd } from '../../../components/Schema';
import sources from '../../../data/sources.json';

export function generateStaticParams() { return films.map(f => ({ slug: f.slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params; const f = films.find(x => x.slug === slug);
  return {
    ...og(f.slug === 'chemical-cartels' ? 'chemical-cartels' : 'illicit-gold'), title: f.title, description: f.subtitle };
}

export default async function Investigation({ params }) {
  const { slug } = await params;
  const f = films.find(x => x.slug === slug);
  const other = films.find(x => x.slug !== slug);
  const live = f.status === 'streaming';
  const shorts = (f.segments || []).filter(s => s.slug);
  const paras = f.synopsis.split(/\n{2,}/).map(t => t.trim()).filter(Boolean);

  return (
    <>
      <section className="wrap s s-ink detail-title">
        <span className="kicker"><Link href="/film">Film</Link> <span className="kmuted">/ {live ? 'Now streaming' : 'In production'} · {f.form || f.years}</span></span>
        <h1>{f.title}</h1>
        <p className="deck">{f.subtitle}</p>
      </section>

      <section className="wrap s s-ink" style={{ paddingTop: 0 }}>
        {/* Not playable: the key art is the poster, and the films are watched from the rows below,
            one at a time. A playlist button here opened a player people then had to dismiss. */}
        <div className="wide">
          <Pic base={f.image} alt={`${f.title} title card`} priority />
        </div>
        <div className="detail-meta">
          <span>{f.places.join(' · ')} · {f.years}</span>
          {live && shorts[0] && <a className="ed-link" href="#shorts">Watch the films {Arrow.down}</a>}
          {!live && <Prov status="investigating">In production</Prov>}
        </div>
      </section>

      <VideoJsonLd type="Movie" name={f.title} description={f.synopsis} image={f.image} youtubeId={f.youtubeId} published={f.published} />

      <section className="wrap s s-paper reading">
        <div><span className="kicker">The investigation</span><h2>Follow the trail.</h2></div>
        <div className="prose">
          {paras.map((p, i) => <p key={i}>{p}</p>)}
          <dl className="credits">
            <div><dt>An investigation by</dt><dd>ICAIE + RADOC</dd></div>
            <div><dt>Executive producers</dt><dd>David M. Luna · Sam Rad</dd></div>
            <div><dt>Production</dt><dd>An Illicit Shadows Production</dd></div>
            {live && <div><dt>Streaming</dt><dd>YouTube · {site.social.handle}</dd></div>}
            {f.host && <div><dt>On camera</dt><dd>{f.host}</dd></div>}
          </dl>
        </div>
      </section>

      {shorts.length > 0 && <section className="wrap s s-ink" id="shorts">
        <span className="kicker">{f.form}</span>
        <h2>{f.form === 'Eleven short films' ? 'Eleven ways into the story.' : 'The short films.'}</h2>
        {/* Rows keep the 320px still and the labeled Play control outside the artwork (owner
            decision, 14 Sep): the covers appear nowhere else and their titles are burned in. */}
        <div className="short-index">
          {shorts.map(s => (
            <div className="short-row" key={s.n}>
              <span>{String(s.n).padStart(2, '0')}</span>
              <VideoEmbed modal variant="row" meta={s.runtime} id={s.youtubeId} image={s.image}
                          alt={`${s.title} title card`} title={s.title} channel={f.youtube || site.social.youtube} />
              <div className="vrow-body">
                <h3><Link href={`/film/${f.slug}/${s.slug}`}>{s.title}</Link></h3>
                {s.sub && <p>{s.sub}.</p>}
                <Link className="ed-link" href={`/film/${f.slug}/${s.slug}`}>{s.transcript ? 'Narration and details' : 'Details'} {Arrow.upRight}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>}

      {f.stats && <section className="wrap s s-slate compact">
        <span className="kicker">By the numbers</span>
        <div className="method stats">
          {f.stats.map(st => {
            const src = sources.find(x => x.id === st.source);
            return (
              <div key={st.n} style={{ borderTop: '1px solid var(--rule)', paddingTop: 14 }}>
                <h3 style={{ fontSize: 30 }}>{st.n}</h3>
                <p>{st.label}</p>
                <p className="fine">{src ? `${src.publisher} · ${src.date}` : st.source} · <Link href="/sources">source</Link></p>
              </div>
            );
          })}
        </div>
      </section>}

      <section className="wrap s s-ink" id="next">
        <div className="intro">
          <div><span className="kicker">Continue exploring</span><h2>The other<br /><em>investigation.</em></h2></div>
        </div>
        <div className="nextfilm">
          <Link href={`/film/${other.slug}`}><Pic base={other.image} alt={`${other.title}: ${other.subtitle}`} /></Link>
          <div>
            <p className="status-chip">{other.status === 'streaming' ? 'Now streaming' : 'In production'} &middot; {other.years}</p>
            <h3 style={{ fontSize: 34 }}>{other.title}</h3>
            <p>{other.line}</p>
            <Link className="ed-link" href={`/film/${other.slug}`}>Explore the investigation {Arrow.upRight}</Link>
          </div>
        </div>
      </section>

    </>
  );
}
