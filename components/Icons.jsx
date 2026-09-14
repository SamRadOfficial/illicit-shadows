// Server-safe: no 'use client'. Plain JSX elements so server pages can render them directly.
export const Icon = {
  film: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>,
  museum: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 9l9-5 9 5"/><path d="M4 9v9M8 9v9M12 9v9M16 9v9M20 9v9"/><path d="M3 18h18"/></svg>,
  network: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/><path d="M12 7v4M6 17v-3h12v3"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>,
  clapper: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 9l1.6-4h15l-1.6 4M8.5 5 7 9M13.5 5 12 9"/></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 L22 20 H2 Z"/><line x1="12" y1="10" x2="12" y2="15"/><circle cx="12" cy="17.6" r=".6" fill="currentColor"/></svg>,
  supply: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21V10l6 4V10l6 4V6l6 3v12z"/></svg>,
  signal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20a12 12 0 0 1 12-12"/><path d="M4 14a6 6 0 0 1 6-6"/><circle cx="5" cy="19" r="1.5" fill="currentColor"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
};
