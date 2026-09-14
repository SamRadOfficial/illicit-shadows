import sources from '../../data/sources.json';
import films from '../../data/films.json';
import { SectionHead, Prov, Break } from '../../components/Blocks';
export const metadata = { title: 'Sources', description: 'The evidentiary spine of Illicit Shadows: every published source behind the films, cited.' };
const title = id => films.find(f => f.slug === id)?.title || id;
export default function Sources() {
  const pub = sources.filter(s => s.public);
  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(48px,7vw,88px)', paddingBottom: 0 }}>
        <p className="eyebrow">The evidentiary spine</p>
        <h1 className="disp" style={{ marginTop: 14 }}>Sources</h1>
        <p className="lede" style={{ marginTop: 18 }}>Every statistic on this site carries its source beside it. This is the index. Cited means a published document you can read; the status chip says how far a claim has been verified.</p>
      </section>
      <Break base="/images/dividers/sources-verified-documents" alt="Research files and a magnifier over documents" />

      <section className="wrap reveal tight">
        <SectionHead label="Published sources" meta={`${pub.length} DOCUMENTS`} />
        <div className="srclist">{pub.map(s => <div className="src" key={s.id}><div><div className="st">{s.url ? <a href={s.url} style={{ color: 'var(--text)' }}>{s.title}</a> : s.title}</div><div className="sp">{s.publisher} &middot; {s.date}</div>{s.films?.length > 0 && <div className="sf">CITED IN: {s.films.map(title).join(', ').toUpperCase()}</div>}</div><Prov status={s.status} /></div>)}</div>
        <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 22 }}>Links are added as each document is verified. Held, uncleared, and single-sourced material does not appear here until it clears.</p>
      </section>
    </>
  );
}
