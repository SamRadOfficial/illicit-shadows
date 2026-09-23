import Link from 'next/link';
import { og } from '../../lib/og';
import site from '../../data/site.json';
import { Hero } from '../../components/Blocks';
import { SupportTiers } from '../../components/SupportTiers';
import { Arrow } from '../../components/Icons';

export const metadata = {
  .../* per page: card, description, canonical */og('donate', {
    description: 'Support the investigations, the Museum of Illicit Shadows, and the public programming around them. Contributions from $100. Not tax deductible.',
    path: '/donate',
  }),
  title: 'Donate',
};

const USES = [
  ['The investigations', 'Field reporting, travel, and the research behind each film: the records, the analysis, and the verification that stands behind a claim.'],
  ['The museum', 'Exhibition design, the research behind each hall, and free public access to the collection when it opens in phases from 2027.'],
  ['Products and programming', 'Dialogues, briefings, publications, and the tools built to make illicit economies legible to a wider public.'],
];

export default function Donate() {
  return (
    <>
      <Hero img="/images/museum-rotunda" alt="" variant="short" mobilePos="52% center"
            eyebrow="Support the work"
            title={<>Help bring the hidden<br /><span className="y">world to light.</span></>}
            lede="Supports the investigations, the Museum of Illicit Shadows, and the new products and programming built around them." />

      <section className="wrap s s-yellow" id="give">
        <div className="intro">
          <div><span className="kicker">Choose a level</span><h2>Become a founding<br /><em>contributor.</em></h2></div>
        </div>
        <SupportTiers />
        <p className="fine intro-note">Checkout is handled by Stripe; you will be returned here afterwards.</p>
        <p className="support-fine">Donations are not tax deductible. Illicit Shadows, LLC.</p>
      </section>

      <section className="wrap s s-paper">
        <div className="intro"><div><span className="kicker">Where it goes</span><h2>Three things,<br /><em>one system.</em></h2></div></div>
        <div className="method">
          {USES.map(([t, d], i) => (
            <div key={t} style={{ borderTop: '1px solid var(--rule)', paddingTop: 15 }}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap s s-ink compact cta-band">
        <div>
          <span className="kicker">Larger contributions</span>
          <h2>Underwriting and institutional partnerships.</h2>
          <p>For a bank transfer, a multi-year commitment, or underwriting a specific film,
            exhibition, or season of programming, write to us and we will take it from there.</p>
        </div>
        <Link className="ed-btn" href="/contact?interest=museum">Start a conversation {Arrow.upRight}</Link>
      </section>
    </>
  );
}
