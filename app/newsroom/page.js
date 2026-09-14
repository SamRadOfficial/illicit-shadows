import news from '../../data/newsroom.json';
import { SectionHead, Prov, Hero } from '../../components/Blocks';
export const metadata = { title: 'Newsroom' };
const K = { dispatch: 'd', press: 'p', release: 'r' };
export default function Newsroom() {
  return (
    <>
      <Hero img="/images/hero-newsroom" mobilePos="58% center" eyebrow="The wire"
            alt="A desk of contact sheets, a field recorder and a notebook under lamplight"
            title="Newsroom"
            lede="Dispatches from the investigations, press coverage, and releases." />
      <section className="wrap reveal" style={{ paddingBottom: 0 }}>
        <div className="filters"><span className="on">ALL</span><span>DISPATCHES</span><span>PRESS</span><span>RELEASES</span></div>
      </section>

      <section className="wrap reveal tight">
        <div className="newslist">{news.map(n => <div className="row" key={n.title}><div><div className={`k ${K[n.kind]}`}>{n.kind.toUpperCase()}</div><div className="dt">{n.date}</div></div><div><div className="t">{n.title}</div><div className="s">{n.summary}</div></div></div>)}</div>
        <p style={{ marginTop: 22 }}><Prov status="illustrative">placeholder entries</Prov> <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 8 }}>Sample dispatches to show the format. Replaced by real posts before launch.</span></p>
      </section>
    </>
  );
}
