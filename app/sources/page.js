import { canonical } from '../../lib/og';
import sources from '../../data/sources.json';
import films from '../../data/films.json';
export const metadata = {
  ...canonical('/sources'), title: 'Sources', description: 'The evidentiary spine of the Illicit Shadows investigations: every report, filing and article the films and the museum draw on, with its status.' };

const filmTitle = id => films.find(f => f.slug === id || f.oldSlug === id)?.title || id;

export default function Sources() {
  const pub = sources.filter(s => s.public);
  return (
    <>
      <section className="wrap s s-ink text-hero">
        <span className="kicker">The evidentiary spine</span>
        <h1>Follow<br /><em>the evidence.</em></h1>
        <p style={{ marginTop: 18 }}>A source index for claims across the site. Published documents, attribution, and verification status belong alongside the story.</p>
      </section>

      <section className="wrap s s-paper">
        <div className="intro"><h2>Published sources</h2><span className="kicker" style={{ margin: 0 }}>{pub.length} documents</span></div>
        <div className="source-index">
          {pub.map((s, i) => (
            <article className="source-row" key={s.id}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> : s.title}</h3>
                <p className="fine">{s.publisher} · {s.date}{s.films?.length ? ` · ${s.films.map(filmTitle).join(', ')}` : ''}</p>
              </div>
              <span>{s.status}</span>
            </article>
          ))}
        </div>
        <p className="fine" style={{ marginTop: 22 }}>Links are added as documents are verified. A listed citation records where a claim came from; it is not itself a verification.</p>
      </section>
    </>
  );
}
