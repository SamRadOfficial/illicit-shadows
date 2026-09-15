'use client';
import { useState } from 'react';
import site from '../data/site.json';

/**
 * Contact form. Static export means no server, so this posts to whatever endpoint is set in
 * `site.forms.contact` (Formspree, Basin, a Vercel function). With no endpoint it does NOT pretend
 * to send: it says so and offers the mailto, which is the honest failure and matches `Signup`.
 *
 * The route the person picks is a real field, so enquiries arrive pre-sorted rather than as four
 * identical emails. `company` is a honeypot: a field no human sees and most bots fill in.
 */
const ROUTES = [
  ['advisory', 'Advisory and briefings'],
  ['helix', 'Helix subscription'],
  ['donor', 'Founding donor'],
  ['ep', 'Executive producer'],
  ['press', 'Press enquiry'],
  ['other', 'Something else'],
];

export function ContactForm() {
  const endpoint = site.forms?.contact;
  const [state, setState] = useState('idle');
  const [route, setRoute] = useState('advisory');

  const onSubmit = e => {
    if (!endpoint) {
      e.preventDefault();
      setState('noendpoint');
    }
  };

  return (
    <form className="cform" action={endpoint || undefined} method="post" onSubmit={onSubmit}>
      <fieldset className="cform-routes">
        <legend>What is this about?</legend>
        <div className="cform-chips">
          {ROUTES.map(([v, label]) => (
            <label key={v} className={`cchip${route === v ? ' on' : ''}`}>
              <input type="radio" name="route" value={label} checked={route === v}
                     onChange={() => setRoute(v)} />
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
        <textarea name="message" rows={6} required
                  placeholder="What you are working on, and what you need from us." />
      </label>

      {/* Honeypot: hidden from people, usually filled by bots. */}
      <div className="cform-trap" aria-hidden="true">
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="cform-foot">
        <button className="btn btn-y" type="submit">Send message</button>
        <p className="cform-note">
          We read everything. Expect a reply within a few working days, or write directly to{' '}
          <a href={`mailto:${site.contact}`}>{site.contact}</a>.
        </p>
      </div>

      {state === 'noendpoint' && (
        <p className="cform-alert">The form is not connected yet, so nothing was sent and your
          message was not stored. Please email <a href={`mailto:${site.contact}`}>{site.contact}</a>
          {' '}and we will pick it up.</p>
      )}
    </form>
  );
}
