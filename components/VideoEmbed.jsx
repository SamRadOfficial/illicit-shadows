'use client';
import { useState } from 'react';
import { Pic } from './Blocks';

/**
 * Facade embed. The cover art is the poster; the YouTube iframe is only injected on click.
 * Nothing from YouTube loads until the person asks for it: no third-party script, no cookie,
 * no 700KB player on a page carrying eleven videos. youtube-nocookie.com for the embed.
 *
 * `id` is the YouTube video id. With no id the component renders the poster as a link to the
 * channel, so a film whose video is not public yet (or not yet supplied) degrades to artwork
 * rather than a dead player.
 */
export function VideoEmbed({ id, list, image, alt, title, channel, className = '', big = false }) {
  const [playing, setPlaying] = useState(false);
  // A film has no single video: its parts are a playlist. `videoseries` plays them in order.
  const src = id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&autoplay=1&rel=0&modestbranding=1`;

  if (!id && !list) {
    return (
      <a className={`vembed ${className}`} href={channel} target="_blank" rel="noopener noreferrer">
        <Pic base={image} alt={alt} />
        <span className={`pb${big ? ' pb--big' : ''}`} aria-hidden="true">&#9654;</span>
      </a>
    );
  }

  if (playing) {
    return (
      <div className={`vembed vembed--live ${className}`}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button type="button" className={`vembed ${className}`} onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}>
      <Pic base={image} alt={alt} />
      <span className={`pb${big ? ' pb--big' : ''}`} aria-hidden="true">&#9654;</span>
    </button>
  );
}
