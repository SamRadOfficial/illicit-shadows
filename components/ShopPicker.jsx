'use client';
import { useMemo, useState } from 'react';
import site from '../data/site.json';
import products from '../data/shop.json';
import { Pic } from './Blocks';
import { ProductViews } from './ProductViews';
import { Arrow } from './Icons';

const APPAREL = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

/**
 * The collection and the waitlist are one thing. Selecting happens on the product card, where the
 * person is already looking, rather than in a second list of every item by name: that list was
 * unreadable at thirteen pieces and would be worse at thirty.
 *
 * Size is per item, because it has to be: a cap is one size, a bomber is not, and a pen has none.
 */
export function ShopPicker() {
  const endpoint = site.forms?.signup;
  const [picked, setPicked] = useState({});   // name -> size string ('' when not applicable)
  const [state, setState] = useState('idle');

  const groups = useMemo(() => {
    const out = [];
    for (const p of products) {
      const g = out.find(x => x.name === p.group) || (out.push({ name: p.group, items: [] }), out.at(-1));
      g.items.push(p);
    }
    return out;
  }, []);

  const names = Object.keys(picked);
  const toggle = p => setPicked(cur => {
    const next = { ...cur };
    if (p.name in next) delete next[p.name];
    else next[p.name] = p.sizing === 'apparel' ? '' : (p.sizing === 'one' ? 'One size' : '');
    return next;
  });
  const setSize = (name, size) => setPicked(cur => ({ ...cur, [name]: size }));

  const missingSize = products.some(p => p.sizing === 'apparel' && p.name in picked && !picked[p.name]);

  const onSubmit = async e => {
    e.preventDefault();
    if (!names.length) { setState('empty'); return; }
    if (missingSize) { setState('size'); return; }
    if (!endpoint) { setState('noendpoint'); return; }
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('company')) return;
    data.set('pieces', names.map(n => (picked[n] && picked[n] !== 'One size') ? `${n} (${picked[n]})` : n).join(', '));
    data.set('_subject', `Shop waitlist: ${names.length} piece${names.length === 1 ? '' : 's'}`);
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset(); setPicked({}); setState('sent');
    } catch { setState('error'); }
  };

  return (
    <>
      {groups.map(g => (
        <div className="shopgroup" key={g.name}>
          <h3 className="kicker">{g.name}</h3>
          <div className="shopitems">
            {g.items.map(p => {
              const on = p.name in picked;
              return (
                <article key={p.name} className={on ? 'is-picked' : undefined}>
                  <ProductViews name={p.name} image={p.image} back={p.back} />
                  <h4>{p.name}</h4>
                  <p>{p.line}</p>
                  <div className="pickrow">
                    <button type="button" className={`pick${on ? ' on' : ''}`} aria-pressed={on}
                            onClick={() => toggle(p)}>
                      {on ? 'On your list' : 'Add to waitlist'}
                    </button>
                    {on && p.sizing === 'apparel' && (
                      <label className="picksize">
                        <span className="vh">Size for {p.name}</span>
                        <select value={picked[p.name]} onChange={e => setSize(p.name, e.target.value)}>
                          <option value="">Size</option>
                          {APPAREL.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </label>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}

      <form className="cform waitlist" id="waitlist" onSubmit={onSubmit}>
        <p className="wsum">
          <b>{names.length ? `${names.length} piece${names.length === 1 ? '' : 's'} selected` : 'Nothing selected yet'}</b>
          {names.length > 0 && (
            <>
              <span>{names.map(n => picked[n] && picked[n] !== 'One size' ? `${n} (${picked[n]})` : n).join(', ')}</span>
              <button type="button" className="wclear" onClick={() => setPicked({})}>Clear</button>
            </>
          )}
        </p>

        <div className="cfields">
          <label className="cfield"><span>Email</span>
            <input type="email" name="email" required autoComplete="email" /></label>
        </div>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="cform-trap" aria-hidden="true" />

        <div className="cform-foot">
          <button className="btn btn-y" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : 'Join the waitlist'}
          </button>
          <p className="cform-note">No payment is taken and nothing is ordered. We will write when the
            first pieces are made.</p>
        </div>

        {state === 'empty' && <p className="cform-alert" role="alert">Pick at least one piece first.</p>}
        {state === 'size' && <p className="cform-alert" role="alert">Choose a size for the clothing you picked.</p>}
        {state === 'noendpoint' && <p className="cform-alert" role="status">The waitlist is not connected
          yet, so nothing was sent or stored. Write to <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p>}
        {state === 'error' && <p className="cform-alert" role="alert">That did not send. Try again, or
          write to <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p>}
        {state === 'sent' && <p className="cform-alert is-ok" role="status">You are on the list. We will
          write when the first pieces are made. {Arrow.upRight}</p>}
      </form>
    </>
  );
}
