'use client';
import { useEffect, useState } from 'react';
import site from '../data/site.json';

/**
 * Contact form. Static export means no server, so this posts to whatever endpoint is set in
 * `site.forms.contact` (Formspree, Basin, a Vercel function). With no endpoint it does NOT pretend
 * to send: it says so and offers the mailto, which is the honest failure and matches `Signup`.
 *
 * Enquiry types are a real field, so messages arrive pre-sorted. They are **checkboxes, not radio
 * buttons**: a museum donor who also wants a Helix briefing should not have to choose. A CTA can
 * preselect them with `?interest=museum,helix`, so intent carries from the button that was pressed.
 * `company` is a honeypot: a field no human sees and most bots fill in.
 */
const ROUTES = [
  ['investment', 'Investment'],
  ['film', 'Film'],
  ['museum', 'Museum'],
  ['helix', 'Helix'],
  ['advisory', 'Advisory and briefings'],
  ['press', 'Press enquiry'],
  ['other', 'Something else'],
];

const VALID = new Set(ROUTES.map(([v]) => v));

export function ContactForm() {
  const endpoint = site.forms?.contact;
  const [state, setState] = useState('idle');
  const [routes, setRoutes] = useState([]);

  /* Read ?interest= after mount: the page is statically exported, so the query is not known at
     build time. Unknown values are ignored rather than trusted. */
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('interest');
    if (!raw) return;
    const picked = raw.split(',').map(v => v.trim().toLowerCase()).filter(v => VALID.has(v));
    if (picked.length) setRoutes(picked);
  }, []);

  const toggle = v => setRoutes(r => r.includes(v) ? r.filter(x => x !== v) : [...r, v]);

  /* Posted with fetch rather than a native form post, so the person stays on the page and gets a
     real confirmation. Formspree, Basin and a Vercel function all accept this shape. Any failure
     is shown, never swallowed: a contact form that silently drops a message is worse than none. */
  const onSubmit = async e => {
    e.preventDefault();
    if (!endpoint) { setState('noendpoint'); return; }
    const form = e.currentTarget;
    const data = new FormData(form);
    const picked = data.getAll('interest');
    data.set('_subject', picked.length
      ? `Illicit Shadows enquiry: ${picked.join(', ')}`
      : 'Illicit Shadows enquiry');
    if (data.get('company')) return;                 // honeypot: pretend success, send nothing
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setRoutes([]);
      setState('sent');
    } catch {
      setState('error');
    }
  };

  return (
    <form className="cform" action={endpoint || undefined} method="post" onSubmit={onSubmit}>
      <fieldset className="cform-routes" aria-label="Enquiry type, choose any that apply">
        <div className="cform-chips">
          {ROUTES.map(([v, label]) => (
            <label key={v} className={`cchip${routes.includes(v) ? ' on' : ''}`}>
              <input type="checkbox" name="interest" value={label}
                     checked={routes.includes(v)} onChange={() => toggle(v)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="cform-grid">
        <label className="cfield">
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label className="cfield">
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="cfield">
          <span>Organization <i>optional</i></span>
          <input type="text" name="organization" autoComplete="organization" />
        </label>
        <label className="cfield">
          <span>Country <i>optional</i></span>
          <input type="text" name="country" autoComplete="country-name" />
        </label>
      </div>

      <label className="cfield">
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>

      {/* Honeypot: hidden from people, usually filled by bots. */}
      <div className="cform-trap" aria-hidden="true">
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="cform-foot">
        <button className="btn btn-y" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : 'Send message'}</button>
        <p className="cform-note">
          Expect a reply within a few working days.
        </p>
      </div>

      {state === 'noendpoint' && <p className="cform-alert" role="status">The form is not connected
        yet, so nothing was sent or stored. Write to <a href={`mailto:${site.contact}`}>{site.contact}</a> and
        it will reach the same place.</p>}
      {state === 'error' && <p className="cform-alert" role="alert">That did not send. Try again, or
        write to <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p>}
      {state === 'sent' && <p className="cform-alert is-ok" role="status">Message sent. Expect a
        reply within a few working days.</p>}
    </form>
  );
}
