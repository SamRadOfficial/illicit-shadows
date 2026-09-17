'use client';
import { useState } from 'react';
import { Pic } from './Blocks';
import { Arrow } from './Icons';

/**
 * One image at full size. Where a back view exists, a single arrow in the top right flips to it and
 * a small typed word in the top left says which view is showing. Both views are rendered with one
 * hidden, so the back is already decoded and there is no blank frame on the flip.
 * Items with a single view render a plain image and no controls at all.
 */
export function ProductViews({ name, image, back }) {
  const [view, setView] = useState(0);
  if (!back) return <Pic base={image} alt={`${name}, design concept`} />;

  const views = [
    { src: image, label: 'front' },
    { src: back, label: 'back' },
  ];
  const next = (view + 1) % views.length;

  return (
    <div className="pviews">
      {views.map((v, i) => (
        <div className="pview" key={v.label} hidden={i !== view}>
          <Pic base={v.src} alt={`${name}, ${v.label}, design concept`} />
        </div>
      ))}
      <p className="pview-label" aria-live="polite">{views[view].label}</p>
      {/* One control: with exactly two views, a second arrow would point at the same place. */}
      <button type="button" className="pnav" onClick={() => setView(next)}
              aria-label={`Show the ${views[next].label} of the ${name}`}>
        {Arrow.right}
      </button>
    </div>
  );
}
