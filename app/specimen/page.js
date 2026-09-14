// TYPE + TOKEN SPECIMEN. Reviewed by the owner before any real page is built.
import { SectionHead, Prov, Stat, Pic } from '../../components/Blocks';
export const metadata = { title: 'Specimen', robots: { index: false } };

const Sw = ({ v, name, note }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ height: 72, background: v, border: '1px solid var(--line-2)' }} />
    <span className="meta">{name} · {v}</span><span style={{ color: 'var(--muted)', fontSize: 12 }}>{note}</span>
  </div>
);

export default function Specimen() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 60 }}>
        <p className="eyebrow">Illicit Shadows · Design system</p>
        <h1 className="disp" style={{ marginTop: 14 }}>Type <span className="y">specimen</span></h1>
        <p className="lede" style={{ marginTop: 18 }}>Black base. Yellow means look here. Red means this is serious. Mono makes sourcing read as evidence.</p>
      </section>

      <section className="wrap tight">
        <SectionHead label="Color" meta="TOKENS" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16 }}>
          <Sw v="#000000" name="ink" note="Base. Black, not dark gray." /><Sw v="#0e0e0e" name="panel" note="Raised surface." />
          <Sw v="#FFD400" name="signal" note="Evidence markers, active states." /><Sw v="#E11D1D" name="alert" note="Genuine severity only. Never a hover state." />
          <Sw v="#ffffff" name="text" note="Primary." /><Sw v="#9a9a9a" name="muted" note="Secondary copy." />
        </div>
      </section>

      <section className="wrap tight">
        <SectionHead label="Display · Anton" meta="HEADLINES" />
        <h1 className="disp">Everything is <span className="y">connected</span></h1>
        <h2 className="disp" style={{ marginTop: 24 }}>Illicit gold and the rush to cash in</h2>
        <h3 className="disp" style={{ marginTop: 18 }}>Chemical cartels: how fentanyl became a weapon of war</h3>
      </section>

      <section className="wrap tight">
        <SectionHead label="Body · Archivo" meta="READING" />
        <p className="lede">Illicit economies are the hidden infrastructure of global insecurity, financing kleptocrats, transnational criminal organizations, and terrorist groups while endangering global supply chains.</p>
        <p style={{ color: 'var(--text-2)', marginTop: 16, maxWidth: '66ch' }}>Body at 16px, weight 400. From the streets of San Francisco to cartel labs in Mexico and Canada, from Chinese chemical companies to Canadian ports, the investigation follows the chemical trail back through illicit supply chains. <b>Bold 700</b> and <span style={{ fontWeight: 600 }}>semibold 600</span> from the variable font.</p>
      </section>

      <section className="wrap tight">
        <SectionHead label="Metadata · IBM Plex Mono" meta="EVIDENCE" />
        <p className="eyebrow">Eyebrow · Media · Knowledge · Intelligence</p>
        <p className="meta" style={{ marginTop: 12 }}>S1 · E01 · 42 MIN · RELEASED 2026 · 1455 PENNSYLVANIA AVE NW</p>
        <div style={{ marginTop: 20 }}><Stat n="$6 trillion+" src="ICAIE, 2026" /></div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
          <Prov status="cited" /><Prov status="alleged" /><Prov status="investigating">under investigation</Prov><Prov status="uncleared" /><Prov status="illustrative">illustrative model</Prov>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 14, maxWidth: '66ch' }}>Every claim carries one of these. If a component cannot express the distinction, it is the wrong component.</p>
      </section>

      <section className="wrap tight">
        <SectionHead label="Controls" meta="BUTTONS" />
        <div className="cta-row" style={{ marginTop: 0 }}><a className="btn btn-y" href="#">Primary action</a><a className="btn btn-o" href="#">Secondary link</a></div>
      </section>

      <section className="wrap tight">
        <SectionHead label="Section head" meta="PATTERNED RULE" />
        <SectionHead label="Dim variant" meta="SECONDARY" dim />
        <div className="card" style={{ maxWidth: 420 }}><p className="eyebrow">Card</p><h3 className="disp" style={{ marginTop: 8 }}>Raised panel</h3><p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 8 }}>Panel surface with a signal top rule.</p></div>
      </section>

      <section className="wrap tight">
        <SectionHead label="Image" meta="WEBP + FALLBACK" />
        <div style={{ maxWidth: 520 }}><Pic base="/images/film-chemical-cartels" alt="Chemical Cartels title card" /></div>
      </section>
    </>
  );
}
