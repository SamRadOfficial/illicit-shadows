'use client';
import site from '../data/site.json';
// Shared blocks. Pages compose these; new page types reuse them rather than inventing a fourth treatment.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/** <picture> with WebP source + fallback. A WebP that 404s renders nothing, so the
 *  asset checker must pass before every push. `base` is the path without extension. */
export function Pic({ base, alt, ext = 'jpg', priority = false, className, style, pos }) {
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img src={`${base}.${ext}`} alt={alt} className={className} style={{ objectPosition: pos, ...style }}
           fetchPriority={priority ? 'high' : undefined} loading={priority ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  );
}

const NAV = [
  ['/', 'Home'], ['/film', 'Film'], ['/intelligence', 'Intelligence'], ['/museum', 'Museum'],
  ['/books', 'Books'], ['/newsroom', 'Newsroom'], ['/about', 'About'],
];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">ILLICIT <b>SHADOWS</b></Link>
        <nav className={`links${open ? ' open' : ''}`} aria-label="Primary">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={path === href ? 'on' : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          {/* Mobile only. CSS hides this above 820px and hides the button below it, so Contact
              appears exactly once at any width. No JavaScript involved in either state. */}
          <Link href="/contact" className="btn btn-y navmob" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
        {/* CTA sits outside .links on purpose: the mobile toggle collapses the menu, so above
            820px this is the call to action and below it the dropdown carries Contact instead. */}
        <div className="navright">
          <Link className="btn btn-y navcta" href="/contact">Contact</Link>
          <button className="navtoggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>&#9776;</button>
        </div>
      </div>
    </header>
  );
}

export function SectionHead({ label, meta, dim }) {
  return (
    <div className={`head${dim ? ' dim' : ''}`}>
      <span className="lbl">{label}</span><span className="bar" />{meta && <span className="meta">{meta}</span>}
    </div>
  );
}

/** Full-bleed image break between sections. */
export function Break({ base, alt = '' }) {
  return (
    <div className="brk" aria-hidden={alt ? undefined : true}>
      <Pic base={base} alt={alt} />
      <div className="veil" />
    </div>
  );
}

/** Evidentiary status chip. status: cited | alleged | investigating | uncleared | illustrative */
export function Prov({ status, children, className }) {
  return <span className={`prov prov--${status}${className ? ' ' + className : ''}`}>{children || status}</span>;
}

/** Convergence tags. Renders through the controlled vocabulary in data/tags.json, so a term
    can only appear if it exists there and always appears in one spelling. An unknown key is
    dropped rather than printed raw. */
export function Tags({ keys = [], vocab }) {
  const shown = keys.filter(k => vocab[k]);
  if (!shown.length) return null;
  return <div className="chips">{shown.map(k => <span className="ctag" key={k}>{vocab[k]}</span>)}</div>;
}

/** A statistic with its visible source. Never render a number without one. */
export function Stat({ n, src, size = 'clamp(28px,4vw,44px)' }) {
  return <span className="stat"><span className="n" style={{ fontSize: size }}>{n}</span><span className="src">{src}</span></span>;
}

/** Adds .in to .reveal elements as they enter the viewport; no-op under reduced motion. */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

const YT = 'M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12zM10 15.5v-7l6 3.5z';
const X  = 'M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2l7.8-8.9L1.5 2h6.8l4.7 6.2zM17.7 20h1.8L7.4 4H5.5z';
const IG = 'M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2m0 5.6A4.2 4.2 0 1 0 16.2 12 4.2 4.2 0 0 0 12 7.8m0 6.9A2.7 2.7 0 1 1 14.7 12 2.7 2.7 0 0 1 12 14.7m4.3-7.1a1 1 0 1 0 1 1 1 1 0 0 0-1-1';

export function Footer({ site }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <div className="b">ILLICIT <b>SHADOWS</b></div>
            <p>{site.boilerplate}</p>
            <div className="socials" aria-label="Social links">
              <a href={site.social.youtube} aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={YT} /></svg></a>
              <a href={site.social.x} aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={X} /></svg></a>
              <a href={site.social.instagram} aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={IG} /></svg></a>
            </div>
          </div>
          <div className="col"><h5>Explore</h5>{NAV.slice(1).map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</div>
          <div>
            <h5>Partners</h5>
            <div className="partner">
              <div className="pmark icaie"><Pic base="/logos/icaie-square" alt="ICAIE, International Coalition Against Illicit Economies" /></div>
              <div><div className="ds">International Coalition Against Illicit Economies · Washington, DC</div><a href="https://icaie.com">icaie.com</a></div>
            </div>
            <div className="partner">
              <div className="pmark"><span className="radoc" aria-label="RADOC"><b>RAD</b><em>OC</em></span></div>
              <div><div className="ds">RAD Original Creations · Meta-media studio · NYC · Washington, DC · London</div><a href="https://radoc.co">radoc.co</a></div>
            </div>
          </div>
        </div>
        <div className="creedline">&copy; {new Date().getFullYear()} ILLICIT SHADOWS, LLC &nbsp;&middot;&nbsp; <b>#EVERYTHINGISCONNECTED</b></div>
      </div>
    </footer>
  );
}

/* ---------- page blocks ---------- */

export function Hero({ img, alt, eyebrow, title, lede, children, variant = '', pos = 'right center' }) {
  return (
    <section className={`hero ${variant}`} style={{ padding: 0 }}>
      <div className="bg"><Pic base={img} alt={alt} priority pos={pos} /></div>
      <div className="veil" />
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="disp">{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

/** Email signup. Honest placeholder until `site.forms.signup` is set: no reload, no discarded input. */
export function Signup({ endpoint, center = false, subscribe = true }) {
  const [state, setState] = useState('');
  const onSubmit = (e) => { if (!endpoint) { e.preventDefault(); setState('Signup opens at launch. Your address was not sent anywhere.'); } };
  return (
    <>
      <form className={`signup${center ? ' center' : ''}`} action={endpoint || undefined} method="post" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email address" aria-label="Email address" required />
        <button type="submit">Sign up for updates</button>
      </form>
      {state && <p className="signup-note" style={center ? { textAlign: 'center' } : undefined}>{state}</p>}
      {/* Email leads, subscribe follows. An email list is an audience you own and can take to a
          distributor or a funder; a YouTube subscriber belongs to YouTube. Off in the hero, where a
          third call to action is a tie rather than a hierarchy. */}
      {subscribe && <p className={`sub-alt${center ? ' center' : ''}`}>
        Or <a href={`${site.social.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer">subscribe on YouTube</a>
      </p>}
    </>
  );
}

export function Donor({ eyebrow = 'Make an impact', title, copy, tiers, cta = 'Become a donor', href, mail }) {
  return (
    <div className="donor">
      <p className="eyebrow">{eyebrow}</p>
      <h4>{title}</h4>
      <p>{copy}</p>
      {tiers && <div className="tiers">{tiers.map(t => <span className="tier" tabIndex={0} key={t}>{t}</span>)}</div>}
      <a className="btn btn-y" href={href}>{cta}</a>
      {mail && <p className="mail">Direct &middot; <a href={`mailto:${mail}`}>{mail}</a></p>}
    </div>
  );
}


