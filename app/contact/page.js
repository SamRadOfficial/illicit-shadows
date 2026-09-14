import site from '../../data/site.json';
import { Hero, Break } from '../../components/Blocks';
export const metadata = { title: 'Contact' };
const ROUTES = [
  ['Advisory & briefings', 'GOVERNMENT · INDUSTRY · INTL ORGS', 'Strategic guidance on illicit-economy exposure and convergence risk.'],
  ['Helix subscriptions', 'ENTERPRISE B2G · B2B', 'Predictive convergence intelligence platform access.'],
  ['Founding donor', 'MUSEUM OF ILLICIT SHADOWS', "Underwrite the Museum's public-good mission. For foundations and family offices."],
  ['Executive producer', 'FILM PARTNERSHIP', 'Co-produce on a single investigation or across the slate. EP credit and distribution.'],
];
export default function Contact() {
  return (
    <>
      <Hero img="/images/break-evidence-3" alt="" variant="filmhero" pos="center" eyebrow="Partner with us" title={<>Enter the <span className="y">shadows</span></>} lede="Four ways to work with us. Tell us which fits and we'll route you to the right principal." />
      <Break base="/images/dividers/contact-start-a-conversation" alt="Communications headset, closed laptop, and note card" />
      <section className="wrap reveal">
        <div className="routes">{ROUTES.map(([t, m, p]) => <div className="route" key={t}><div className="rt">{t}</div><div className="rm">{m}</div><p>{p}</p></div>)}</div>
        <div className="direct"><div><div className="meta" style={{ marginBottom: 6 }}>DIRECT</div><div className="dm">{site.contact}</div></div><a className="btn btn-y" href={`mailto:${site.contact}`}>Start a conversation</a></div>
      </section>
    </>
  );
}
