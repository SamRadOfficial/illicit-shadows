'use client';
import { useState } from 'react';
import { Arrow } from './Icons';

const SOURCES = [['all', 'All'], ['illicit-shadows', 'Illicit Shadows'], ['icaie', 'ICAIE']];

/**
 * Newsroom index. Two sources, one list: Illicit Shadows' own posts and ICAIE's, the latter tagged
 * ICAIE and linking out to icaie.com. Both files are refreshed by scripts/fetch-news.mjs.
 */
export function NewsIndex({ items }) {
  const [source, setSource] = useState('all');
  const shown = items.filter(n => source === 'all' || n.source === source);
  return (
    <>
      <div className="news-controls" role="group" aria-label="Filter newsroom by source">
        {SOURCES.map(([k, label]) => (
          <button type="button" key={k} className={source === k ? 'on' : undefined} aria-pressed={source === k} onClick={() => setSource(k)}>{label}</button>
        ))}
      </div>
      <div className="news-index">
        {shown.map(n => {
          const ext = n.external && n.url;
          const title = ext
            ? <a href={n.url} target="_blank" rel="noopener noreferrer">{n.title} {Arrow.upRight}</a>
            : n.title;
          return (
            <article className={`news-item src-${n.source}`} key={n.url || n.title}>
              <div>
                <span className="kicker">
                  {n.source === 'icaie' ? <span className="srctag">ICAIE</span> : n.kind}
                  {n.outlet && <span className="outlet"> via {n.outlet}</span>}
                </span>
                <time dateTime={n.date}>{n.date}</time>
              </div>
              <div><h3>{title}</h3>{n.summary && <p>{n.summary}</p>}</div>
            </article>
          );
        })}
      </div>
      <p className="fine" style={{ marginTop: 22 }}>ICAIE items link to icaie.com and are refreshed from its feed. Illicit Shadows posts link to the original.</p>
    </>
  );
}
