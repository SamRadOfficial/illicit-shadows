import Link from 'next/link';
import { Pic, Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { Convergence } from '../../components/Convergence';
import { HallsEd } from '../../components/HallsEd';
export const metadata = { title: 'Museum of Illicit Shadows' };

const TIERS = ['$100', '$500', '$1,000', '$10,000', '$25,000'];

export default function Museum() {
  return (
    <>
      <Hero img="/images/museum-rotunda" mobilePos="52% center" alt="The Eclipse Rotunda: a suspended globe of illuminated trade routes above a circular gallery floor"
            eyebrow="A virtual museum / Established 2025"
            title={<>Museum of<br /><span className="y">Illicit Shadows</span></>}
            lede="Step into the hidden systems that shape our world. Discover their connections. Understand their consequences.">
        <div className="actions">
          <a className="ed-btn" href="#halls">Explore the halls {Arrow.down}</a>
          <Link className="ed-link" href="/museum/enter">Enter the prototype {Arrow.upRight}</Link>
        </div>
      </Hero>

      <section className="wrap s s-paper two">
        <div><span className="kicker">The idea</span><h2>Make the invisible<br /><em>understandable.</em></h2></div>
        <div>
          <p className="deck">A counterfeit medicine. A stolen artifact. A gold bar. Each has a story that reaches far beyond the object itself.</p>
          <p>Through exhibitions, research, and public programming, MIS explores how illicit economies converge, and how their effects reach communities around the world.</p>
          <a className="ed-link" href="#origins">Meet the people behind it {Arrow.down}</a>
        </div>
      </section>

      <section className="wrap s s-ink" id="halls"><HallsEd /></section>

      <section className="wrap s s-slate compact two" id="prototype">
        <div><span className="kicker">The building / Interactive prototype</span><h2>Find your way<br /><em>through the shadows.</em></h2></div>
        <div>
          <p>Explore the rotunda, the positions of the halls, and the routes between them.</p>
          <Link className="ed-btn" href="/museum/enter">Enter the museum concept {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-paper origins" id="origins">
        {/* The eclipse mark keeps a solid black panel: its transparent edge never touches cream. */}
        <div className="black-logo"><Pic base="/images/mis-eclipse" ext="png" alt="MIS eclipse emblem" /></div>
        <div>
          <span className="kicker">Our origins</span>
          <h2>Founded in<br /><em>the digital world.</em></h2>
          <p>David M. Luna and Sam Rad founded MIS in 2025 to make the harms of crime convergence visible to a wider public.</p>
          <p>Their shared vision brings together field investigations, exhibitions, dialogues, and research in a museum built for global access.</p>
          <Link className="ed-link" href="/about">Meet the founders {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-ink" id="convergence">
        <div className="intro">
          <div><span className="kicker">Crime convergence</span><h2>Everything <em>is connected.</em></h2></div>
          <p>Five domains, one system. The map the museum is built to explain.</p>
        </div>
        <Convergence head={false} />
      </section>

      <section className="wrap s s-ink two-features">
        <article>
          <Link href="/film"><Pic base="/images/museum-theater" alt="The Illicit Shadows Theater concept" /></Link>
          <h3>From the field to the screen.</h3>
          <p>Investigations trace illicit markets from forests and ports to financial centers.</p>
          <Link className="ed-link" href="/film">Watch the investigations {Arrow.upRight}</Link>
        </article>
        <article>
          <Link href="/books"><Pic base="/images/books-trilogy-hero" alt="The three Illicit Shadows Chronicles novels" /></Link>
          <h3>Enter the narrative world.</h3>
          <p>The Illicit Shadows Chronicles take the themes of convergence into fiction.</p>
          <Link className="ed-link" href="/books">Explore the trilogy {Arrow.upRight}</Link>
        </article>
      </section>

      <section className="wrap s s-yellow cta-band" id="donor">
        <div>
          <span className="kicker">Founding donors</span>
          <h2>Help open the doors.</h2>
          <p>Support the museum's public mission and its phased opening from 2027. Institutional partnerships are available.</p>
          <p className="fine">Giving levels: {TIERS.join(' · ')}</p>
        </div>
        <Link className="ed-btn" href="/contact">Become a founding donor {Arrow.upRight}</Link>
      </section>

      <section className="wrap s s-paper compact cta-band">
        <div><h3>Take the vision with you.</h3><p>The museum overview and publications bring the collection beyond the galleries. The overview brochure is not yet published here; contact the team for a copy.</p></div>
        <Link className="ed-link" href="/contact">Museum enquiries {Arrow.upRight}</Link>
      </section>
    </>
  );
}
