'use client';
import { useState } from 'react';
import site from '../data/site.json';
import { Arrow } from './Icons';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'One size'];

/**
 * Waitlist, not a pre-order: no money changes hands and nothing is promised on a date. It captures
 * which pieces someone wants and their size, which is the only information that decides what gets
 * made. Same endpoint contract as the contact form; with no endpoint it says so rather than
 * pretending to record anything.
 */
export function ShopWaitlist({ products }) {
  const endpoint = site.forms?.signup;
  const [picked, setPicked] = useState([]);
  const [state, setState] = useState('idle');
  const toggle = v => setPicked(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const onSubmit = async e => {
    e.preventDefault();
    if (!endpoint) { setState('noendpoint'); return; }
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('company')) return;
    data.set('_subject', `Shop waitlist: ${picked.join(', ') || 'no item selected'}`);
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset(); setPicked([]); setState('sent');
    } catch { setState('error'); }
  };

  return (
    <form className="cform waitlist" onSubmit={onSubmit} noValidate={false}>
      <fieldset className="cform-routes" aria-label="Which pieces interest you">
        <div className="cform-chips">
          {products.map(p => (
            <label key={p.name} className={`cchip${picked.includes(p.name) ? ' on' : ''}`}>
              <input type="checkbox" name="pieces" value={p.name}
                     checked={picked.includes(p.name)} onChange={() => toggle(p.name)} />
              {p.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="cfields">
        <label className="cfield"><span>Email</span>
          <input type="email" name="email" required autoComplete="email" /></label>
        <label className="cfield"><span>Size</span>
          <select name="size" defaultValue="">
            <option value="">Select</option>
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="cform-trap" aria-hidden="true" />

      <div className="cform-foot">
        <button className="btn btn-y" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending...' : 'Join the waitlist'}
        </button>
        <p className="cform-note">No payment is taken and nothing is ordered. We will write when the
          first pieces are made.</p>
      </div>

      {state === 'noendpoint' && <p className="cform-alert" role="status">The waitlist is not connected
        yet, so nothing was sent or stored. Write to <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p>}
      {state === 'error' && <p className="cform-alert" role="alert">That did not send. Try again, or
        write to <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p>}
      {state === 'sent' && <p className="cform-alert is-ok" role="status">You are on the list. We will
        write when the first pieces are made. {Arrow.upRight}</p>}
    </form>
  );
}
