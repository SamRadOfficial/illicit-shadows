import Link from 'next/link';
import own from '../../../data/newsroom.json';
import icaie from '../../../data/newsroom-icaie.json';
import { Arrow } from '../../../components/Icons';
import { Pic } from '../../../components/Blocks';

const POSTS = [...own, ...icaie].filter(n => n.slug && n.body);
const fmt = d => {
  const [y, m, day] = d.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString('en-US',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
};

/* [text](href) inside a paragraph, rendered as elements rather than injected HTML. Internal
   links stay internal, so the archive points at this site rather than the old one. */
function rich(text) {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(m[2].startsWith('/')
      ? <Link href={m[2]} key={m.index}>{m[1]}</Link>
      : <a href={m[2]} target="_blank" rel="noopener noreferrer" key={m.index}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function generateStaticParams() { return POSTS.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = POSTS.find(x => x.slug === slug);
  if (!p) return {};
  const image = p.image ? `${p.image}.${p.imageExt || 'jpg'}` : '/og/newsroom.jpg';
  return {
    title: p.title, description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: [{ url: image }] },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = POSTS.find(x => x.slug === slug);
  const others = POSTS.filter(x => x.slug !== slug).slice(0, 2);
  return (
    <>
      <section className="wrap s s-ink detail-title">
        <span className="kicker">
          <Link href="/newsroom">Newsroom</Link>{' '}
          <span className="kmuted">/ {post.kind === 'release' ? 'Announcement' : 'In the press'}</span>
        </span>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{fmt(post.date)}</time>
          {post.dateline && <span> &middot; {post.dateline}</span>}
        </p>
      </section>

      {post.image && (
        <section className="wrap s s-ink" style={{ paddingTop: 0 }}>
          <figure className={`post-art${(post.imageExt || 'jpg') === 'png' ? ' is-mark' : ' is-wide'}`}>
            <Pic base={post.image} ext={post.imageExt || 'jpg'} alt={post.imageAlt || ''} priority />
          </figure>
        </section>
      )}

      <section className="wrap s s-paper reading">
        <div>
          <span className="kicker">The announcement</span>
        </div>
        <article className="prose">
          {post.body.map((b, i) => (b.t === 'q'
            ? <blockquote className="pullpress" key={i}>
                <p>{b.x}</p>
                <cite>{b.by}</cite>
              </blockquote>
            : <p key={i}>{rich(b.x)}</p>))}

          {post.contact && (
            <div className="press-contact">
              <p className="kicker">Media inquiries</p>
              <p>{post.contact.name}<br />{post.contact.role}<br />
                <a href={`mailto:${post.contact.email}`}>{post.contact.email}</a></p>
            </div>
          )}
        </article>
      </section>

      {others.length > 0 && (
        <section className="wrap s s-ink">
          <div className="intro"><div><span className="kicker">More from the newsroom</span><h2>Keep reading.</h2></div>
            <Link className="ed-link" href="/newsroom">All dispatches {Arrow.upRight}</Link></div>
          <div className="news-index">
            {others.map(o => (
              <article className="news-item" key={o.slug}>
                <p className="news-meta">
                  <span className="news-org">Illicit Shadows</span>
                  <time dateTime={o.date}>{fmt(o.date)}</time>
                </p>
                <div><h3><Link href={`/newsroom/${o.slug}`}>{o.title}</Link></h3><p>{o.summary}</p></div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
