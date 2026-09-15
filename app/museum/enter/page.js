import Link from 'next/link';
import { Arrow } from '../../../components/Icons';
export const metadata = { title: 'Enter the Museum', description: 'A walkable 3D prototype of the Museum of Illicit Shadows.' };

export default function Enter() {
  return (
    <>
      <section className="wrap s s-ink text-hero arrival">
        <span className="kicker"><Link href="/museum">Museum of Illicit Shadows</Link> <span className="kmuted">/ The building</span></span>
        <h1>A world<br /><em>within the shadows.</em></h1>
        <p style={{ marginTop: 18 }}>Walk the site model: the rotunda, the hall positions, and the routes between them. An interactive prototype of the planned digital museum, Phase I opening 2027.</p>
      </section>
      {/* The live 3D viewer stays. The package's gallery switcher was a composition reference. */}
      <section className="wrap" style={{ paddingTop: 0 }}>
        <iframe className="viewer" src="/museum-viewer.html" title="Museum of Illicit Shadows, walkable 3D preview" allow="fullscreen" />
      </section>
      <section className="wrap s s-paper compact cta-band">
        <div><h3>Back to the collection.</h3><p>The halls, the origins, and the founding-donor program.</p></div>
        <Link className="ed-link" href="/museum">Museum of Illicit Shadows {Arrow.upRight}</Link>
      </section>
    </>
  );
}
