// Server-safe: plain JSX, no hooks. One stroke weight and one size for every arrow, so the
// brief's "vector icons for all arrows" is met without a dependency: seven small SVGs.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
const svg = (paths, extra = {}) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" {...S} {...extra}>{paths}</svg>
);

export const Arrow = {
  upRight: svg(<><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>),
  down: svg(<><path d="M12 5v14" /><path d="m5 12 7 7 7-7" /></>),
  right: svg(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>),
  left: svg(<><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>),
  close: svg(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>),
};

// Brand marks are filled shapes, not strokes.
const brand = (d) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d={d} /></svg>;
export const Brand = {
  youtube: brand('M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z'),
  instagram: brand('M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.4-.5.2-.8.4-1.1.8-.3.3-.6.6-.8 1.1-.2.4-.3 1-.4 2.1C2.9 9.7 2.9 10 2.9 12s0 3.5.1 4.7c0 1.1.2 1.7.4 2.1.2.5.4.8.8 1.1.3.3.6.6 1.1.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.4.5-.2.8-.4 1.1-.8.3-.3.6-.6.8-1.1.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.4-2.1-.2-.5-.4-.8-.8-1.1-.3-.3-.6-.6-1.1-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm5.2-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z'),
  x: brand('M18.2 2.3h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9.1L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 18h1.9L6.8 4.2H4.8l12.2 16.1z'),
};

// Legacy pictograms still used by a few blocks.
export const Icon = {
  play: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>,
};
