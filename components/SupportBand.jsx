'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import site from '../data/site.json';
import { Arrow } from './Icons';
import { SupportTiers } from './SupportTiers';

/**
 * The donation call to action. Rendered by the layout above the footer on every page, so it does
 * not have to be remembered per page. A page that makes the ask in its own body (the museum donor
 * section) passes `hide` so the same band does not appear twice.
 */
/* Routes where the ask would interrupt rather than invite: a short film's narration, the museum
   viewer, and the book extract are all mid-experience. */
const QUIET = [/^\/film\/[^/]+\/[^/]+/, /^\/museum\/enter/, /^\/books\/preview/];

export function SupportBand() {
  const path = usePathname() || '';
  if (QUIET.some(re => re.test(path))) return null;
  return (
    <section className="wrap s s-yellow cta-band" id="support">
      <div>
        <span className="kicker">Founding contributors</span>
        <h2>Help bring the hidden world to light.</h2>
        <p>Support the public mission as a founding contributor.</p>
        <SupportTiers />
        <p className="support-fine">Donations are not tax deductible.</p>
      </div>
      <Link className="ed-btn" href="/contact?interest=museum">Become a founding contributor {Arrow.upRight}</Link>
    </section>
  );
}
