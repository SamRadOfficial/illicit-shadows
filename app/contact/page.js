import site from '../../data/site.json';
import { Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { ContactForm } from '../../components/ContactForm';
export const metadata = { title: 'Contact' };

const OFFERS = [
  ['Investment', 'Support our cause and mission.'],
  ['Film', 'Collaborate on an investigation or across the slate, as executive producer or sponsor.'],
  ['Museum', 'Back the Museum of Illicit Shadows as a founding donor or institutional partner.'],
  ['Helix', 'Intelligence access and briefings for government, international organizations, and industry.'],
  ['Advisory and briefings', 'Strategic guidance on illicit-economy exposure and convergence risk.'],
];

export default function Contact() {
  return (
    <>
      <Hero img="/images/hero-contact" pos="70% 88%" mobilePos="82% 90%" alt="David M. Luna and Sam Rad walking beside the Reflecting Pool, the Washington Monument ahead"
            eyebrow="Work with us"
            title={<>Start a<br /><span className="y">conversation.</span></>}
            lede="Support our mission and join our cause." />

      <section className="wrap s s-paper contact-layout">
        <div>
          <span className="kicker">Five ways to connect</span>
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
                  src="https://maps.google.com/maps?q=1455+Pennsylvania+Ave+NW+Suite+400,+Washington,+DC+20004&z=15&output=embed"
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
