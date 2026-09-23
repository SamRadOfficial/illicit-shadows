import { og } from '../../lib/og';
import { IntelPage } from '../../components/IntelSections';

export const metadata = {
  ...og('intelligence', {
    description: 'Project Helix is a causal AI system that predicts how illicit networks adapt when disrupted: decision intelligence from the MISTIC institute.',
    path: '/intelligence',
  }),
  title: 'Intelligence · MISTIC and Project Helix',
};

/* Option C, 23 Sep: the institute, then why the platform compounds, who buys it, how Helix works,
   the scenario, what the model is for, the wider system, and the close. Surfaces alternate; the
   order and colours live here so a change of order cannot leave two matching bands touching. */
const ORDER = [
  ['mistic', 's-paper'],
  ['flywheel', 's-ink'],
  ['buyers', 's-paper'],
  ['helix', 's-ink'],
  ['cascade', 's-paper'],
  ['modelfor', 's-slate'],
  ['convergence', 's-paper'],
  ['close', 's-slate'],
];

export default function Intelligence() {
  return <IntelPage order={ORDER} />;
}
