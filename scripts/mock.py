"""One page, every option, standalone HTML. Built from styles/site.css and real assets.
   python3 scripts/mock.py <out.html>
The owner reviews options side by side in a single file, so never emit one file per option and
never emit images: the page is the deliverable. Fonts go in as woff2, images as base64, so the
file opens anywhere with nothing to fetch.

Each round, rewrite TITLE, INTRO, RECOMMEND and OPTIONS. An option is (key, title, note,
body_html, css). Scope any css with a .opt-<key> prefix so options cannot bleed into each other.

**Always set RECOMMEND** to the key you would pick, with the reason in that option's note. The
owner asked for a recommendation on every round, and it belongs on the page next to the work, not
only in chat. Throwaway tooling for a pick; the chosen treatment lands in site.css."""
import base64, io, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'previews/mock.html')
css = open(os.path.join(ROOT, 'styles/site.css')).read()
team = json.load(open(os.path.join(ROOT, 'data/team.json')))


def font(name):
    raw = open(os.path.join(ROOT, 'public/fonts', name), 'rb').read()
    try:
        from fontTools.ttLib import TTFont
        f = TTFont(io.BytesIO(raw)); f.flavor = 'woff2'
        b = io.BytesIO(); f.save(b); raw = b.getvalue(); mt = 'font/woff2'
    except Exception:
        mt = 'font/ttf'
    return f'data:{mt};base64,' + base64.b64encode(raw).decode()


def img(path):
    """path is relative to public/, e.g. images/team-sam-rad.jpg"""
    raw = open(os.path.join(PUB, path.lstrip('/')), 'rb').read()
    mt = 'image/webp' if path.endswith('.webp') else 'image/jpeg'
    return f'data:{mt};base64,' + base64.b64encode(raw).decode()


FACES = ''.join(f'@font-face{{font-family:{fam};src:url({font(f)});font-weight:{w};font-display:block}}'
                for fam, f, w in [('Anton', 'Anton-Regular.ttf', '400'),
                                  ('Archivo', 'Archivo-Variable.ttf', '100 900'),
                                  ('IBM Plex Mono', 'IBMPlexMono-Regular.ttf', '400'),
                                  ('IBM Plex Mono', 'IBMPlexMono-Medium.ttf', '500')])

import json as _json

ARROW = ('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" '
         'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         '<path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>')
CHEV = ('<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" '
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        '<path d="m6 9 6 6 6-6"/></svg>')
FILMS = _json.load(open(os.path.join(ROOT, 'data/films.json')))
CC = [f for f in FILMS if f['slug']=='chemical-cartels'][0]
IG = [f for f in FILMS if f['slug']=='illicit-gold'][0]

def thumb(f):  return img(f['image'] + '.jpg')

NAVBAR = ('<div class="mocknav"><span class="mockbrand">ILLICIT <b>SHADOWS</b></span>'
          '<nav class="mocklinks"><span class="on">Film{CHEV}</span><span>Intelligence</span>'
          '<span>Museum</span><span>Books</span><span>Newsroom</span><span>About</span></nav>'
          '<span class="mockcta">Contact</span></div>').replace('{CHEV}', CHEV)

DROPDOWN = (f'<div class="dd"><div class="dd-inner">'
            f'<a class="dd-item"><img src="{thumb(CC)}" alt=""><span><b>Chemical Cartels</b>'
            f'<em>Now streaming &middot; Eleven short films</em></span></a>'
            f'<a class="dd-item"><img src="{thumb(IG)}" alt=""><span><b>Illicit Gold</b>'
            f'<em>In production &middot; 2026-2027</em></span></a>'
            f'<a class="dd-item"><span class="dd-plain"><b>Upcoming slate</b>'
            f'<em>Six investigations in development</em></span></a>'
            f'<a class="dd-all">All investigations {ARROW}</a></div></div>')

DD_TEXT = ('<div class="dd dd-text"><div class="dd-inner">'
           '<a class="dd-row"><b>Chemical Cartels</b><em>Now streaming</em></a>'
           '<a class="dd-row"><b>Illicit Gold</b><em>In production</em></a>'
           '<a class="dd-row"><b>Upcoming slate</b><em>In development</em></a>'
           f'<a class="dd-row all">All investigations {ARROW}</a></div></div>')

SUBNAV = (f'<div class="subnav"><span class="subnav-k">Film</span>'
          f'<nav><a class="on">Chemical Cartels</a><a>Illicit Gold</a><a>Upcoming slate</a>'
          f'<a class="right">All investigations {ARROW}</a></nav></div>')

PAGE_HEAD = ('<div class="pagehead"><span class="kicker">Chemical Cartels / Eleven short films</span>'
             '<h2>American Fallout</h2><p>How fentanyl became a weapon of war.</p></div>')

PAGE_A = NAVBAR + DROPDOWN + '<div class="mockbody">' + PAGE_HEAD + '</div>'
PAGE_B = NAVBAR + DD_TEXT + '<div class="mockbody">' + PAGE_HEAD + '</div>'
PAGE_C = NAVBAR.replace('Film{CHEV}'.replace('{CHEV}', CHEV), 'Film') + SUBNAV + '<div class="mockbody">' + PAGE_HEAD + '</div>'

SHARED = """
.mocknav{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:20px;background:#080909;border-bottom:1px solid #2a2f2f;padding:18px 26px}
.mockbrand{font-family:var(--disp);font-size:20px;letter-spacing:.02em;color:#fff}
.mockbrand b{color:var(--signal);font-weight:400}
.mocklinks{display:flex;justify-content:center;gap:24px;font-size:14.5px;color:#fff}
.mocklinks .on{color:var(--signal);display:inline-flex;align-items:center;gap:6px;border-bottom:1px solid var(--signal);padding-bottom:4px}
.mockcta{font-size:13.5px;color:#fff;border-bottom:1px solid var(--signal);padding-bottom:4px}
.mockbody{background:#080909;padding:34px 26px 60px}
.pagehead h2{font-family:var(--disp);font-size:40px;text-transform:uppercase;color:#fff;margin:8px 0 10px}
.pagehead p{color:#fff;font-size:15px;margin:0}
.pagehead .kicker{color:var(--signal);font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase}

/* A: cover dropdown */
.dd{background:#0d1010;border-bottom:1px solid #2a2f2f}
.dd-inner{display:grid;grid-template-columns:repeat(3,1fr) auto;gap:22px;align-items:center;padding:22px 26px;max-width:1100px;margin:0 auto}
.dd-item{display:grid;grid-template-columns:120px 1fr;gap:14px;align-items:center}
.dd-item img{width:120px;aspect-ratio:16/9;object-fit:cover;display:block}
.dd-item b,.dd-row b{display:block;color:#fff;font-size:15px;font-weight:700}
.dd-item em,.dd-row em{display:block;font-style:normal;color:#b9bdbd;font-family:var(--mono);font-size:11px;margin-top:4px}
.dd-plain{display:block;border-left:2px solid var(--signal);padding-left:14px}
.dd-all{align-self:center;color:var(--signal);font-family:var(--mono);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;display:inline-flex;gap:8px;align-items:center;white-space:nowrap}

/* B: text dropdown */
.dd-text .dd-inner{display:block;max-width:320px;margin:0;padding:8px 0 10px 26px}
.dd-row{display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:11px 0;border-bottom:1px solid #222}
.dd-row.all{border-bottom:0;color:var(--signal);font-family:var(--mono);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase}

/* C: page-level sub-nav */
.subnav{background:#0d1010;border-bottom:1px solid #2a2f2f;padding:0 26px}
.subnav{display:flex;align-items:center;gap:24px;max-width:1100px;margin:0 auto}
.subnav-k{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#8d9292}
.subnav nav{display:flex;gap:24px;align-items:center;flex:1}
.subnav a{color:#fff;font-size:14px;padding:16px 0;border-bottom:2px solid transparent}
.subnav a.on{color:var(--signal);border-color:var(--signal)}
.subnav a.right{margin-left:auto;color:var(--signal);font-family:var(--mono);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;display:inline-flex;gap:8px;align-items:center}
@media(max-width:820px){.dd-inner{grid-template-columns:1fr}.subnav{flex-wrap:wrap;gap:12px}}
"""

RECOMMEND = 'C'

TITLE = 'Choosing pieces on the waitlist'
INTRO = ('The current list is thirteen chips in a row, and it only gets worse as pieces are added. '
         'Three ways to make the choice legible at thirty items, using real product names.')

GROUPS = [
    ('Caps', [('MIS eclipse cap','hat-mis'), ('Illicit Shadows cap','hat-is'), ('Everything is connected cap','hat-connected')]),
    ('Tees', [('MIS eclipse tee','tee-mis'), ('Illicit Shadows tee','tee-is'), ('Everything is connected tee','tee-connected'), ('Convergence network tee','tee-network')]),
    ('Outerwear', [('MIS bomber','bomber-mis'), ('Illicit Shadows bomber','bomber-is')]),
    ('Bags and goods', [('MIS eclipse tote','tote-mis'), ('Illicit Shadows tote','tote-is'), ('Illicit Shadows sling','sling'), ('Everything is connected notebook','notebook')]),
]

def thumb(slug):
    return img(f'/images/shop/{slug}.jpg')

# A: grouped checkboxes
rows = ''
for name, items in GROUPS:
    chips = ''.join(f'<label class="wchip"><input type="checkbox"><span>{n}</span></label>' for n, _ in items)
    rows += f'<div class="wgroup"><p class="wgh">{name}</p><div class="wchips">{chips}</div></div>'
PAGE_A = f'<div class="s s-slate wpad"><div class="wgroups">{rows}</div>{{FOOT}}</div>'

# B: thumbnail grid
cards = ''
for name, items in GROUPS:
    cards += f'<p class="wgh">{name}</p><div class="wgrid">'
    for n, slug in items:
        cards += (f'<label class="wcard"><input type="checkbox">'
                  f'<img src="{thumb(slug)}" alt=""><span>{n}</span><i class="wtick">&#10003;</i></label>')
    cards += '</div>'
PAGE_B = f'<div class="s s-slate wpad">{cards}{{FOOT}}</div>'

# C: choose on the product itself, form just collects size and email
picks = ''
for name, items in GROUPS[:2]:
    for n, slug in items[:2]:
        picks += (f'<article class="pcard"><img src="{thumb(slug)}" alt="">'
                  f'<h3>{n}</h3><p>Design concept.</p>'
                  f'<button class="padd">Add to waitlist</button></article>')
PAGE_C = (f'<div class="s s-paper wpad"><p class="wgh">The collection, with the control on each piece</p>'
          f'<div class="pgrid">{picks}</div></div>'
          f'<div class="s s-slate wpad"><p class="wsum"><b>3 pieces selected</b> '
          f'<span>MIS eclipse cap, Illicit Shadows cap, MIS eclipse tee</span> '
          f'<a href="#">Clear</a></p>{{FOOT}}</div>')

FOOT = ('<div class="wfoot"><label class="wfield"><span>Email</span><input type="email"></label>'
        '<label class="wfield"><span>Size</span><select><option>Select</option><option>M</option></select></label>'
        '<button class="btn btn-y">Join the waitlist</button></div>')
PAGE_A = PAGE_A.replace('{FOOT}', FOOT)
PAGE_B = PAGE_B.replace('{FOOT}', FOOT)
PAGE_C = PAGE_C.replace('{FOOT}', FOOT)

SHARED = """
.wpad{padding:34px 30px}
.wgh{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--label,var(--ac));margin:0 0 12px}
.wgroups{display:grid;grid-template-columns:1fr 1fr;gap:26px 34px}
.wgroup{border-top:1px solid var(--rule);padding-top:14px}
.wchips{display:flex;flex-direction:column;gap:2px}
.wchip{display:flex;align-items:center;gap:10px;padding:7px 0;font-size:15px;cursor:pointer}
.wchip input{width:15px;height:15px;accent-color:var(--signal)}
.wgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:26px}
.wcard{position:relative;display:block;cursor:pointer;border:1px solid var(--rule);padding:8px}
.wcard img{width:100%;aspect-ratio:1;object-fit:cover;display:block;margin-bottom:8px}
.wcard span{display:block;font-size:12.5px;line-height:1.35}
.wcard input{position:absolute;left:14px;top:14px;width:16px;height:16px;accent-color:var(--signal);z-index:2}
.wtick{display:none}
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.pcard img{width:100%;aspect-ratio:1;object-fit:cover;display:block;margin-bottom:10px}
.pcard h3{font-size:16px;margin:0}
.pcard p{font-size:13px;margin:6px 0 12px;opacity:.75}
.padd{background:none;border:1px solid var(--ac);color:var(--fg);font-family:var(--mono);font-size:10.5px;
  letter-spacing:.12em;text-transform:uppercase;padding:8px 12px;cursor:pointer;width:100%}
.wsum{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 16px;border-bottom:1px solid var(--rule);
  padding-bottom:16px;margin:0 0 20px;font-size:14.5px}
.wsum span{opacity:.8}
.wsum a{color:var(--label,var(--ac));font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em}
.wfoot{display:grid;grid-template-columns:1fr 180px auto;gap:16px;align-items:end;margin-top:26px;
  border-top:1px solid var(--rule);padding-top:22px}
.wfield span{display:block;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px;opacity:.85}
.wfield input,.wfield select{width:100%;background:rgba(0,0,0,.35);border:1px solid var(--rule);color:var(--fg);padding:11px 13px;font-size:15px}
"""

OPTIONS = [
    ('A', 'Grouped checkboxes',
     'The same chips, broken into caps, tees, outerwear, bags and goods, set as a checklist rather '
     'than a cloud. Cheapest to build, scans in a second, and thirty items stay readable because '
     'the groups do the work. No pictures, so someone who has not scrolled the collection is '
     'choosing from names alone.',
     PAGE_A, SHARED),
    ('B', 'Thumbnail picker',
     'Every piece as a small image with a checkbox. Easiest to choose from, and the one that best '
     'survives a catalogue of thirty. It also repeats the collection grid directly above it, so the '
     'page shows each product twice, and it is the heaviest of the three on a phone.',
     PAGE_B, SHARED),
    ('C', 'Choose on the product, not in a list  &middot;  MY PICK',
     'The control moves onto each product card in the collection, and the form keeps only the '
     'summary, size and email. The selection happens where the person is already looking, the page '
     'stops listing every item twice, and adding a thirtieth piece changes nothing about the form. '
     'It needs the selection to be shared between the grid and the form, which is a little more '
     'work than the other two and is the reason to choose it deliberately.',
     PAGE_C, SHARED),
]
blocks, extra = [], []
for key, title, note, body, rule in OPTIONS:
    if rule not in extra: extra.append(rule)
    blocks.append(
        f'<section class="opt opt-{key}"><p class="optlbl">OPTION {key}'
        f'{" <span class=\'rec\'>RECOMMENDED</span>" if key == RECOMMEND else ""}</p>'
        f'<h2 class="opttitle">{title}</h2><p class="optnote">{note}</p>'
        f'<div class="stage wrap">{body}</div></section>')

SHELL = """
body{padding:0}
.mockwrap{max-width:1180px;margin:0 auto;padding:56px 28px 90px}
.mockhead{border-bottom:1px solid var(--line);padding-bottom:26px}
.mockhead h1{font-family:var(--disp);font-size:46px;line-height:1;text-transform:uppercase;margin:8px 0 12px}
.mockhead p{color:var(--text-2);font-size:15px;line-height:1.7;max-width:72ch}
.opt{padding:50px 0;border-bottom:1px solid var(--line)}.opt:last-child{border-bottom:0}
.optlbl{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--alert)}
.rec{background:var(--signal);color:var(--ink);padding:3px 8px;margin-left:8px;letter-spacing:.12em}
.opttitle{font-family:var(--disp);font-size:30px;text-transform:uppercase;margin:8px 0 10px;color:var(--text)}
.optnote{color:var(--text-2);font-size:14.5px;line-height:1.75;max-width:72ch;margin:0 0 26px}
.optsub{font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--dim);margin:26px 0 10px}
.stage{border:1px solid var(--line);padding:34px 30px 44px}
.stage.wrap{max-width:none}
"""

html = (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
        f'<meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<title>{TITLE}, options A to {OPTIONS[-1][0]}</title>'
        f'<style>{FACES}{css}{SHELL}{"".join(extra)}</style>'
        f'</head><body><div class="mockwrap">'
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; /MUSEUM</p>'
        f'<h1>{TITLE}</h1><p>{INTRO}</p></div>{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
