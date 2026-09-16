'use client';
import { useState } from 'react';
import { Arrow } from './Icons';

const SOURCES = [['all', 'All'], ['illicit-shadows', 'Illicit Shadows'], ['icaie', 'ICAIE']];
/* One vocabulary for the whole newsroom: the data carries "press", "release" and "dispatch";
   these are the words readers see. */
const KIND = { press: 'In the press', release: 'Announcement', dispatch: 'Dispatch' };
const ORG = { 'illicit-shadows': 'Illicit Shadows', icaie: 'ICAIE' };
const fmt = d => {
  const [y, m, day] = d.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString('en-US',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
};

function Meta({ n }) {
  return (
    <p className="news-meta">
      <span className="news-org">{ORG[n.source] || n.source}</span>
      <span className="news-kind">{KIND[n.kind] || n.kind}</span>
      <time dateTime={n.date}>{fmt(n.date)}</time>
      {n.outlet && <span className="news-outlet">via {n.outlet}</span>}
    </p>
  );
}

export function NewsIndex({ items }) {
  const [source, setSource] = useState('all');
  const shown = items.filter(n => source === 'all' || n.source === source);
  const [lead, ...rest] = shown;
  return (
    <>
      <div className="news-controls" role="group" aria-label="Filter newsroom by source">
        {SOURCES.map(([k, label]) => (
          <button type="button" key={k} className={source === k ? 'on' : undefined}
                  aria-pressed={source === k} onClick={() => setSource(k)}>{label}</button>
        ))}
        <span className="news-count">{shown.length} {shown.length === 1 ? 'item' : 'items'}</span>
      </div>

      {lead && (
        <article className="news-lead">
          <Meta n={lead} />
          <h2>{lead.external && lead.url
            ? <a href={lead.url} target="_blank" rel="noopener noreferrer">{lead.title} {Arrow.upRight}</a>
            : lead.title}</h2>
          {lead.summary && <p>{lead.summary}</p>}
        </article>
      )}

      <div className="news-index">
        {rest.map(n => (
          <article className="news-item" key={n.url || n.title}>
            <Meta n={n} />
            <div>
              <h3>{n.external && n.url
                ? <a href={n.url} target="_blank" rel="noopener noreferrer">{n.title} {Arrow.upRight}</a>
                : n.title}</h3>
              {n.summary && <p>{n.summary}</p>}
            </div>
          </article>
        ))}
      </div>
      <p className="fine" style={{ marginTop: 22 }}>ICAIE items link to icaie.com and are refreshed
        from its feed. Illicit Shadows posts link to the original.</p>
    </>
  );
}
