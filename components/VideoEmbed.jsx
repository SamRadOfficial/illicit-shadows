'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Pic } from './Blocks';
import { Play } from './Icons';

/**
 * Facade embed. The cover art is the poster; the YouTube iframe is only injected on click.
 * Nothing from YouTube loads until the person asks for it: no third-party script, no cookie,
 * no 700KB player on a page carrying eleven videos.
 *
 * `id` is the YouTube video id. With no id (and no `list`) the poster renders as a link to the
 * channel, so a film whose video is not public yet degrades to artwork rather than a dead player.
 *
 * `modal` opens the video in a lightbox instead of swapping it into the poster. Use it wherever the
 * poster is small: a 2:09 documentary playing inside a 250px card is unwatchable, and YouTube's own
 * controls become unusable below roughly 400px wide.
 */
export function VideoEmbed({ id, list, image, alt, title, channel, className = '', big = false, modal = false, variant, meta }) {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  const src = id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&autoplay=1&rel=0&modestbranding=1`;

  // Escape closes, the page behind does not scroll, and focus moves into the dialog and back out
  // again on close. A lightbox that traps neither focus nor Escape is a trap for keyboard users.
  useEffect(() => {
    if (!modal || !playing) return;
    const onKey = e => { if (e.key === 'Escape') setPlaying(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      openerRef.current?.focus();
    };
  }, [modal, playing]);

  if (!id && !list) {
    return (
      <a className={`vembed ${className}`} href={channel} target="_blank" rel="noopener noreferrer">
        <Pic base={image} alt={alt} />
        <span className={`pb${big ? ' pb--big' : ''}`} aria-hidden="true">{Play}</span>
      </a>
    );
  }

  const poster = (
    <button type="button" ref={openerRef} className={`vembed ${className}`}
            onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
      <Pic base={image} alt={alt} />
      {variant !== 'row' && <span className={`pb${big ? ' pb--big' : ''}`} aria-hidden="true">{Play}</span>}
    </button>
  );

  /* Row variant: nothing sits on the artwork. The poster and a labelled Play control are returned
     as siblings in a fragment so the parent grid can place them in different columns, and both
     open the same lightbox. Covers are the only place this art appears on the site. */
  const control = variant === 'row' ? (
    <span className="vrow-play">
      <button type="button" className="playbtn" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
        <span className="playbtn-ico" aria-hidden="true">{Play}</span>
        <span className="playbtn-txt">Play</span>
      </button>
      {meta && <span className="vrow-r">{meta}</span>}
    </span>
  ) : null;

  if (modal) {
    /* The overlay is rendered into document.body, not in place. Editorial sections isolate their
       stacking context, so a lightbox left inside one paints beneath every later section while
       still locking scroll: the page appears frozen with the video showing further down. */
    const overlay = playing && (
      <div className="lightbox" role="dialog" aria-modal="true" aria-label={title}
           onClick={e => { if (e.target === e.currentTarget) setPlaying(false); }}>
        <div className="lightbox-inner">
          <div className="lightbox-bar">
            <span className="lightbox-title">{title}</span>
            <button type="button" ref={closeRef} className="lightbox-close"
                    onClick={() => setPlaying(false)} aria-label="Close video">&times;</button>
          </div>
          <div className="lightbox-frame">
            <iframe src={src} title={title} allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          </div>
        </div>
      </div>
    );
    return (
      <>
        {poster}
        {control}
        {mounted && overlay ? createPortal(overlay, document.body) : null}
      </>
    );
  }

  if (playing) {
    return (
      <div className={`vembed vembed--live ${className}`}>
        <iframe src={src} title={title} allowFullScreen loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
      </div>
    );
  }

  return poster;
}
