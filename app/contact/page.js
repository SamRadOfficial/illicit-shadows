import site from '../../data/site.json';
import { Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { ContactForm } from '../../components/ContactForm';
export const metadata = { title: 'Contact' };

const OFFERS = [
  ['Advisory & briefings', 'Strategic guidance on exposure and convergence risk.'],
  ['Helix access', 'Enterprise intelligence for government and industry.'],
  ['Museum partnerships', 'Support the public mission as a founding donor.'],
  ['Film partnerships', 'Collaborate on an investigation or across the slate.'],
];

export default function Contact() {
  return (
    <>
      <Hero img="/images/hero-contact" mobilePos="60% center" alt="A door opening onto a lit meeting room with an evidence wall and a city window" variant="short"
            eyebrow="Work with us"
            title={<>Start a<br /><span className="y">conversation.</span></>}
            lede="Bring us a question, a collaboration, or a challenge. We will connect you with the right principal." />

      <section className="wrap s s-paper contact-layout">
        <div>
          <span className="kicker">Four ways to connect</span>
          <div className="offers">
            {OFFERS.map(([h, d], i) => <article key={h}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{h}</h3><p>{d}</p></div></article>)}
          </div>
        </div>
        <div className="cform-ed">
          <span className="kicker">Tell us what you need</span>
          <ContactForm />
        </div>
      </section>


      <section className="wrap s s-ink" id="find">
        {/* Live Google embed (owner pick). Note this is the one place on the site that loads a
            third party on page load; the film players stay facades. */}
        <div className="maprow">
          <iframe className="gmap" title="Map showing the Illicit Shadows office at 1455 Pennsylvania Avenue NW, Washington DC"
                  src="https://maps.google.com/maps?q=1455+Pennsylvania+Ave+NW+Suite+400,+Washington,+DC+20004&z=16&output=embed"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <div className="mapcopy">
            <span className="kicker">Washington, DC</span>
            <h2>Find us<br /><em>in Washington, DC.</em></h2>
            <p className="addr">1455 Pennsylvania Ave NW<br />Suite 400<br />Washington, DC 20004<br />United States</p>
            <p className="fine">Two blocks east of the White House, between 14th and 15th.</p>
            <div className="actions">
              <a className="ed-link" href="https://www.google.com/maps/search/?api=1&query=1455+Pennsylvania+Ave+NW+Suite+400,+Washington,+DC+20004" target="_blank" rel="noopener noreferrer">Open in Google Maps {Arrow.upRight}</a>
              <a className="ed-link" href="https://www.google.com/maps/dir/?api=1&destination=1455+Pennsylvania+Ave+NW+Suite+400,+Washington,+DC+20004" target="_blank" rel="noopener noreferrer">Directions {Arrow.upRight}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap s s-yellow compact direct">
        <h2 style={{ fontSize: 30 }}>Prefer a direct line?</h2>
        <a href={`mailto:${site.contact}`}>{site.contact} {Arrow.upRight}</a>
      </section>
    </>
  );
}
