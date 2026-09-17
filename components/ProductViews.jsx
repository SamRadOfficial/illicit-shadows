'use client';
import { useState } from 'react';
import { Pic } from './Blocks';
import { Arrow } from './Icons';

/**
 * One image at full size, with front/back arrows when a second view exists. Both views render and
 * one is hidden, so the back is already decoded when someone flips it and there is no blank frame.
 * Items with a single view render a plain image with no controls.
 */
export function ProductViews({ name, image, back }) {
  const [view, setView] = useState(0);
  if (!back) return <Pic base={image} alt={`${name}, design concept`} />;

  const views = [
    { src: image, label: 'front' },
    { src: back, label: 'back' },
  ];
  const flip = d => setView(v => (v + d + views.length) % views.length);

  return (
    <div className="pviews">
      {views.map((v, i) => (
        <div className="pview" key={v.label} hidden={i !== view}>
          <Pic base={v.src} alt={`${name}, ${v.label}, design concept`} />
        </div>
      ))}
      <button type="button" className="pnav prev" onClick={() => flip(-1)}
              aria-label={`Show the ${views[(view + views.length - 1) % views.length].label} of the ${name}`}>
        {Arrow.left}
      </button>
      <button type="button" className="pnav next" onClick={() => flip(1)}
              aria-label={`Show the ${views[(view + 1) % views.length].label} of the ${name}`}>
        {Arrow.right}
      </button>
      <p className="pview-label" aria-live="polite">{views[view].label}</p>
    </div>
  );
}
