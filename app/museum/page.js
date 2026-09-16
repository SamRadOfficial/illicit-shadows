import Link from 'next/link';
import { Pic, Hero } from '../../components/Blocks';
import { Arrow } from '../../components/Icons';
import { Convergence } from '../../components/Convergence';
import { HallsEd } from '../../components/HallsEd';
export const metadata = { title: 'Museum of Illicit Shadows' };

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
        <div className="hero-mark"><img src="/logos/mis-eclipse.svg" alt="" width="132" height="132" /></div>
      </Hero>

      <section className="wrap s s-paper two">
        <div><span className="kicker">The idea</span><h2>Make the invisible<br /><em>undeniable.</em></h2></div>
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
          <p>The prototype is live today: a walkable model of the building, the rotunda and the hall
            positions. The exhibitions themselves open in phases from 2027, so what you can visit now
            is the architecture, not the collection.</p>
          <Link className="ed-btn" href="/museum/enter">Enter the museum concept {Arrow.upRight}</Link>
        </div>
      </section>

      <section className="wrap s s-paper origins" id="origins">
        {/* The eclipse mark keeps a solid black panel: its transparent edge never touches cream. */}
        <div className="black-logo"><Pic base="/images/mis-eclipse" ext="png" alt="MIS eclipse emblem" /></div>
        <div>
          <span className="kicker">Our origins</span>
          <h2>Founded in<br /><em>the digital world.</em></h2>
          <p className="deck">MIS is a first-of-its-kind virtual museum dedicated to educating global
            communities on the harms and impacts to international security of crime convergence and
            illicit economies around the world.</p>
          <p>Through exhibitions, research, and public programming, MIS examines how crime
            convergence, from narcotics and counterfeit goods to human and environmental
            trafficking, threatens global communities and international security.</p>
          <p>David M. Luna and Sam Rad founded MIS in 2025 to make those harms visible to a wider
            public, bringing field investigations, exhibitions, dialogues, and research together in
            a museum built for global access.</p>
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
          <Link href="/books"><Pic base="/images/books-trilogy-full-bleed-feature" alt="The three Illicit Shadows Chronicles novels" /></Link>
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
        </div>
        <Link className="ed-btn" href="/contact?interest=museum">Become a founding donor {Arrow.upRight}</Link>
      </section>

      {/* The shop is a real part of the museum's public mission, not a footnote, so it gets a
          section of its own on the loudest surface with the three things it will actually sell. */}
      <section className="wrap s s-ink" id="shop">
        <div className="intro">
          <div>
            <span className="kicker">The gift shop</span>
            <h2>Take the museum<br /><em>home with you.</em></h2>
          </div>
          <p>Every purchase funds the exhibitions, the research behind them, and free public access
            to the collection.</p>
        </div>
        <div className="shopgrid">
          <article>
            <span className="shop-n">01</span>
            <h3>Exhibition editions</h3>
            <p>Prints and objects drawn from the halls: the contraband still life, the convergence
              map, the eclipse.</p>
          </article>
          <article>
            <span className="shop-n">02</span>
            <h3>Publications</h3>
            <p>Museum catalogues, the Illicit Shadows Chronicles, and research briefs from ICAIE.</p>
          </article>
          <article>
            <span className="shop-n">03</span>
            <h3>Founding-donor editions</h3>
            <p>Numbered pieces reserved for the people who open the doors. Not sold after Phase I.</p>
          </article>
        </div>
        <div className="shopfoot">
          <p className="fine">Opening with Phase I in 2027. Tell us what you want and we will hold
            one back.</p>
          <Link className="ed-btn" href="/contact?interest=museum">Join the shop list {Arrow.upRight}</Link>
        </div>
      </section>
    </>
  );
}
