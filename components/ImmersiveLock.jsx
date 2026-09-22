'use client';
import { useEffect, useRef } from 'react';

/**
 * Full-viewport host for the museum viewer. While mounted, the page behind it cannot scroll, so
 * nothing the viewer does can move the site around it. Restores the page's own scrolling when the
 * visitor leaves. Focuses the frame on load so the keyboard drives the game, not the page.
 */
export function ImmersiveLock({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const html = document.documentElement, body = document.body;
    const prev = [html.style.overflow, body.style.overflow, html.style.overscrollBehavior];
    html.style.overflow = 'hidden'; body.style.overflow = 'hidden'; html.style.overscrollBehavior = 'none';
    window.scrollTo(0, 0);
    const frame = ref.current?.querySelector('iframe');
    const focus = () => { try { frame?.contentWindow?.focus(); frame?.focus(); } catch (_) {} };
    frame?.addEventListener('load', focus);
    return () => {
      html.style.overflow = prev[0]; body.style.overflow = prev[1]; html.style.overscrollBehavior = prev[2];
      frame?.removeEventListener('load', focus);
    };
  }, []);
  return <div className="immersive" ref={ref}>{children}</div>;
}
