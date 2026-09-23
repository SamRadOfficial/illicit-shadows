import { canonical } from '../../../lib/og';
import { ImmersiveLock } from '../../../components/ImmersiveLock';

export const metadata = {
  ...canonical('/museum/enter'),
  title: 'Enter the Museum',
  description: 'Walk the Museum of Illicit Shadows: a 3D prototype of the building, the rotunda, and the hall positions. Exhibitions open in phases from 2027.',
};

/* The viewer fills the screen below the nav and the page behind it does not scroll. The old
   layout put a hero above it and a band and the footer below it, so every wheel tick or arrow
   key that the viewer did not catch scrolled the site, and the camera drifted with it. */
export default function Enter() {
  return (
    <ImmersiveLock>
      <iframe className="viewer-full" src="/museum-viewer.html"
              title="Museum of Illicit Shadows, walkable 3D prototype" allow="fullscreen" />
    </ImmersiveLock>
  );
}
