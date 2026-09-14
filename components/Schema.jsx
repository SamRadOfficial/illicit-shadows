import site from '../data/site.json';

/** "2:01" to ISO 8601 "PT2M1S". Returns undefined for anything unparseable. */
export function iso8601(runtime) {
  if (!runtime) return undefined;
  const parts = String(runtime).split(':').map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  const [h, m, s] = parts.length === 3 ? parts : [0, ...parts];
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || undefined;
}

/**
 * VideoObject JSON-LD. Emitted ONLY when a video is public on YouTube (it needs `youtubeId`).
 *
 * Never emit this for an unreleased film. Structured data announcing a video is a claim that the
 * video is available, and for Illicit Gold, public availability before a qualifying theatrical
 * release is what costs festival and awards eligibility. No id means no markup, by design.
 *
 * Type is Movie or VideoObject, never TVEpisode or TVSeries: the films are not a series. See HANDOFF.
 */
export function VideoJsonLd({ name, description, image, youtubeId, runtime, published, type = 'VideoObject' }) {
  if (!youtubeId) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    thumbnailUrl: [new URL(`${image}.jpg`, site.domain).href],
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    duration: iso8601(runtime),
    uploadDate: published,
    publisher: { '@type': 'Organization', name: site.name, url: site.domain },
  };
  Object.keys(data).forEach(k => data[k] === undefined && delete data[k]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
