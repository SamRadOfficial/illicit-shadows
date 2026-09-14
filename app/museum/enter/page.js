export const metadata = { title: 'Enter the Museum' };
// The walkable Three.js build (MIS_Viewer.html) served as a static asset. Integrated, not rebuilt.
export default function Enter() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: 14, paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <p className="eyebrow">Museum of Illicit Shadows &middot; Walkable preview</p>
        <p className="meta">WASD or arrows to move &middot; drag to look &middot; Phase I opens 2027</p>
      </div>
      <iframe className="viewer" src="/museum-viewer.html" title="Museum of Illicit Shadows, walkable 3D preview" allow="fullscreen" />
    </>
  );
}
