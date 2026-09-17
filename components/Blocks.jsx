'use client';
import { Arrow, Brand, Chevron } from './Icons';
import site from '../data/site.json';
import VARIANTS from '../data/image-variants.json';
import films from '../data/films.json';
import slate from '../data/slate.json';
// Shared blocks. Pages compose these; new page types reuse them rather than inventing a fourth treatment.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/** <picture> with WebP source + fallback. A WebP that 404s renders nothing, so the
 *  asset checker must pass before every push. `base` is the path without extension. */
/* Bump when an image is replaced without changing its filename: browsers and the CDN cache
   /images/* aggressively, which is why reissued covers kept showing the old art on phones. */
/* Cache-buster. Bump this whenever an image is replaced in place: phones and CDNs hold the
   old file for a long time otherwise, and the filename never changes. */
export const ASSET_V = '3';

/* `w`/`h` are the intrinsic pixel size of the art. They are not display sizes: CSS still controls
   how big the image renders, but giving the browser the ratio up front stops the page reflowing as
   each file arrives. `sizes` lets the browser pick the smaller file on a phone. */
export function Pic({ base, alt, ext = 'jpg', priority = false, className, style, pos, w = 1600, h = 900,
                     sizes, widths }) {
  /* Only offer widths that exist on disk. The manifest is regenerated before every build, so a
     srcset can never point at a file that was not committed: without variants the browser simply
     gets the full-size image. */
  const have = VARIANTS[base];
  const use = widths && have ? widths.filter(n => have.includes(n)) : null;
  const v = `?v=${ASSET_V}`;
  /* `widths` names the pre-generated sizes on disk (base-640.webp and so on). Without it a phone
     downloads the full-width file: that is why the heroes were slow. */
  const set = ext2 => use && use.length
    ? use.map(n => `${base}-${n}.${ext2}${v} ${n}w`).join(', ')
    : undefined;
  return (
    <picture>
      <source srcSet={set('webp') || `${base}.webp${v}`} type="image/webp" sizes={sizes} />
      <img src={`${base}.${ext}${v}`} srcSet={set(ext)} alt={alt} className={className} width={w} height={h}
           sizes={sizes} style={{ objectPosition: pos, ...style }}
           fetchPriority={priority ? 'high' : undefined} loading={priority ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  );
}

const NAV = [
  ['/', 'Home'], ['/film', 'Film'], ['/intelligence', 'Intelligence'], ['/museum', 'Museum'],
  ['/books', 'Books'], ['/newsroom', 'Newsroom'], ['/about', 'About'],
];

/* Film submenu. Built from the data, so a new investigation appears here automatically.
   Illicit Gold leads: it is the current work. Flip the sort to lead with what is watchable. */
const FILM_MENU = [...films].sort((a, b) => (a.status === 'in-production' ? -1 : 1) - (b.status === 'in-production' ? -1 : 1))
  .map(f => ({
    href: `/film/${f.slug}`, title: f.title, image: f.image, live: f.status === 'streaming',
    meta: f.status === 'streaming' ? `Released · ${f.form || f.years}` : `In production · ${f.years}`,
  }));

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [film, setFilm] = useState(false);
  const filmRef = useRef(null);
  const triggerRef = useRef(null);

  /* Click, not hover. A hover menu closes the moment the pointer crosses the gap between the
     trigger and the panel, and padding does not reliably fix it. Escape, a second click of the
     trigger, or a click outside all close it; focus returns to the trigger on Escape.
     The outside-click handler tests containment rather than relying on propagation, so a click on
     a link inside the panel cannot close the menu before the navigation happens. */
  useEffect(() => {
    if (!film) return;
    const onKey = e => {
      if (e.key === 'Escape') { setFilm(false); triggerRef.current?.focus(); return; }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const items = [...(filmRef.current?.querySelectorAll('.fm-link') || [])];
      if (!items.length) return;
      e.preventDefault();
      const i = items.indexOf(document.activeElement);
      const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
      items[next].focus();
    };
    const onDown = e => { if (!filmRef.current?.contains(e.target)) setFilm(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [film]);
  useEffect(() => { setFilm(false); setOpen(false); }, [path]);

  const close = () => { setOpen(false); setFilm(false); };

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">ILLICIT <b>SHADOWS</b></Link>
        <nav className={`links${open ? ' open' : ''}`} aria-label="Primary">
          {NAV.slice(1).map(([href, label]) => (
            href === '/film' ? (
              <span className="hasmenu" key={href} ref={filmRef}>
                <Link href={href} className={path.startsWith(href) ? 'on' : undefined} onClick={close}>{label}</Link>
                <button type="button" className="menutoggle" ref={triggerRef} aria-expanded={film}
                        aria-label={film ? 'Hide film menu' : 'Show film menu'}
                        onClick={() => setFilm(v => !v)}>{Chevron}</button>
                <div className={`filmmenu${film ? ' on' : ''}`}>
                  <div className="filmmenu-inner">
                    {FILM_MENU.map(m => (
                      <Link className="fm-link fm-item" href={m.href} key={m.href} onClick={close}>
                        <Pic base={m.image} alt="" />
                        <span>
                          <b>{m.title}</b>
                          <em>{m.meta}</em>
                        </span>
                      </Link>
                    ))}
                    <span className="fm-div">In development</span>
                    {slate.map(x => (
                      <Link className="fm-link fm-slate" href="/film#development" key={x.slug} onClick={close}>{x.title}</Link>
                    ))}
                    <Link className="fm-link fm-all" href="/film" onClick={close}>All investigations {Arrow.upRight}</Link>
                  </div>
                </div>
              </span>
            ) : (
              <Link key={href} href={href} className={path.startsWith(href) ? 'on' : undefined} onClick={close}>{label}</Link>
            )
          ))}
          <Link href="/contact" className="ed-link navmob" onClick={close}>Contact {Arrow.upRight}</Link>
        </nav>
        <div className="navright">
          <Link className="ed-link navcta" href="/contact">Contact {Arrow.upRight}</Link>
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
    <footer className="foot-ed">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link className="brand small" href="/">ILLICIT <b>SHADOWS</b></Link>
            <p className="foot-statement">Media<span>.</span> Knowledge<span>.</span> Intelligence<span>.</span></p>
            <p className="foot-line">Everything is connected.</p>
            <a className="foot-li" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">
              {Brand.linkedin} Connect on LinkedIn
            </a>
          </div>
          <nav className="foot-links" aria-label="Footer">
            <Link className="ed-link" href="/about">About the platform {Arrow.upRight}</Link>
            <Link className="ed-link" href="/contact">Partner with us {Arrow.upRight}</Link>
            <Link className="ed-link" href="/donate">Donate {Arrow.upRight}</Link>
            <Link className="ed-link" href="/shop">Shop {Arrow.upRight}</Link>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>&copy; {new Date().getFullYear()} ILLICIT SHADOWS, LLC</span>
          <span className="foot-partners">
            <a href="https://icaie.com" target="_blank" rel="noopener noreferrer">ICAIE</a>
            {' + '}
            <a href="https://radoc.co" target="_blank" rel="noopener noreferrer">RADOC</a>
          </span>
          <nav className="foot-social" aria-label="Social links">
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">{Brand.youtube}</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{Brand.linkedin}</a>
            <a href={site.social.x} target="_blank" rel="noopener noreferrer" aria-label="X">{Brand.x}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ---------- page blocks ---------- */

/* Crops come from CSS variables, not an inline object-position on the image: an inline style beats
   the stylesheet, so a media query could never change the crop on a narrow screen. */
export function Hero({ img, alt, eyebrow, title, lede, source, children, variant = '', pos = 'right center', mobilePos }) {
  return (
    <section className={`hero ${variant}`}
             style={{ padding: 0, '--hero-pos': pos, '--hero-pos-mobile': mobilePos || pos }}>
      {/* Preload the hero: React hoists this into <head>, so the browser starts fetching the right
          width immediately instead of waiting for the stylesheet to reveal the background. */}
      {(VARIANTS[img]?.length
        ? <link rel="preload" as="image" href={`${img}-${VARIANTS[img].at(-1)}.webp?v=${ASSET_V}`} fetchPriority="high"
                imageSrcSet={VARIANTS[img].map(n => `${img}-${n}.webp?v=${ASSET_V} ${n}w`).join(', ')}
                imageSizes="100vw" />
        : <link rel="preload" as="image" href={`${img}.webp?v=${ASSET_V}`} fetchPriority="high" />)}
      <div className="bg"><Pic base={img} alt={alt} priority widths={[640, 1024, 1600]} sizes="100vw" /></div>
      <div className="veil" />
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="disp">{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {source && <p className="hero-source"><Link href="/sources">{source}</Link></p>}
        {children}
      </div>
    </section>
  );
}

/** Email signup. Honest placeholder until `site.forms.signup` is set: no reload, no discarded input. */
export function Signup({ endpoint, center = false, subscribe = true }) {
  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);
  /* Same contract as the contact form: post with fetch, confirm in place, and never pretend an
     address was stored when it was not. */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!endpoint) { setState('Signup opens at launch. Your address was not sent anywhere.'); return; }
    const form = e.currentTarget;
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState('Thank you. Check your inbox to confirm.');
    } catch {
      setState('That did not send. Try again in a moment.');
    } finally { setBusy(false); }
  };
  return (
    <>
      <form className={`signup${center ? ' center' : ''}`} action={endpoint || undefined} method="post" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email address" aria-label="Email address" required />
        <button type="submit" disabled={busy}>{busy ? 'Sending...' : 'Sign up for updates'}</button>
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
  /* Tiers come from `site.support.tiers`. Each one is a Stripe Payment Link: hosted checkout, no
     server, which is what a static export can support. A tier with no link yet is not a button;
     it falls back to the enquiry route rather than a control that does nothing. */
  const configured = (site.support?.tiers || []).filter(t => t.url);
  return (
    <div className="donor">
      <p className="eyebrow">{eyebrow}</p>
      <h4>{title}</h4>
      <p>{copy}</p>
      {configured.length > 0 ? (
        <>
          <div className="tiers">
            {configured.map(t => (
              <a className="tier is-live" href={t.url} key={t.label}>
                <b>{t.label}</b><span>{t.name}</span>
              </a>
            ))}
          </div>
          {site.support?.note && <p className="fine support-note">{site.support.note}</p>}
        </>
      ) : (
        tiers && <div className="tiers">{tiers.map(t => <span className="tier" key={t}>{t}</span>)}</div>
      )}
      <a className="btn btn-y" href={href}>{cta}</a>
      {mail && <p className="mail">Direct &middot; <a href={`mailto:${mail}`}>{mail}</a></p>}
    </div>
  );
}


