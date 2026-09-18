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

RECOMMEND = 'B'

TITLE = 'Founding Corporate Patron: a banner for /museum'
INTRO = ('David\'s note: tiers, a donor recognition wall, and a route to "Start a conversation". '
         'Three ways to say it. All three link to the contact form rather than to a checkout, '
         'because institutional money arrives by agreement, not by card.')

TIERS = [('Diamond', 'Underwrites a hall'), ('Gold', 'Underwrites an exhibition'), ('Silver', 'Supports the programme')]
WALL  = [('Corporate sponsors', ''), ('Foundations', ''), ('Individuals', '')]

def band(inner, surface='s-slate'):
    return f'<div class="s {surface} mpad">{inner}</div>'

# A: one band, tiers named, no amounts
tiers_a = ''.join(f'<div class="mt"><b>{n}</b><span>{d}</span></div>' for n, d in TIERS)
PAGE_A = band(f'''<p class="kicker">Founding corporate patrons</p>
<h2 class="mh">Put your name<br><em>on the record.</em></h2>
<p class="mlede">Three levels of institutional support, each underwriting a named part of the museum.
Recognition on the donor wall: corporate sponsors, foundations, and individuals.</p>
<div class="mtiers">{tiers_a}</div>
<a class="ed-btn">Start a conversation</a>''')

# B: tiers plus the wall as a visible thing
wall_b = ''.join(f'<div class="mw"><span>{n}</span><i>Reserved</i></div>' for n, _ in WALL)
PAGE_B = band(f'''<div class="mgrid">
  <div>
    <p class="kicker">Founding corporate patrons</p>
    <h2 class="mh">Underwrite<br><em>a hall.</em></h2>
    <p class="mlede">Institutional support at three levels, each tied to a named part of the museum,
    and recognised on the donor wall when the doors open in 2027.</p>
    <a class="ed-btn">Start a conversation</a>
  </div>
  <div>
    <div class="mtiers col">{tiers_a}</div>
    <p class="kicker wallk">The donor wall</p>
    <div class="mwall">{wall_b}</div>
  </div>
</div>''')

# C: quiet line, no tiers on the page
PAGE_C = band('''<div class="mgrid">
  <div><p class="kicker">Institutional support</p>
  <h2 class="mh">Founding corporate<br><em>patrons.</em></h2></div>
  <div><p class="mlede">Corporate sponsors, foundations and individuals underwrite the halls, the
  research behind them, and free public access. Levels and recognition are agreed case by case.</p>
  <a class="ed-link">Start a conversation &#8599;</a></div>
</div>''', 's-ink')

SHARED = """
.mpad{padding:38px 32px}
.mh{font-size:clamp(28px,3.4vw,42px);margin:6px 0 12px}
.mlede{font-size:16px;max-width:54ch;margin-bottom:22px}
.mgrid{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:start}
.mtiers{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}
.mtiers.col{flex-direction:column;gap:6px;margin-bottom:26px}
.mt{border:1px solid var(--rule);padding:12px 16px;min-width:190px}
.mt b{display:block;font-family:var(--disp);font-size:19px;letter-spacing:.02em}
.mt span{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;opacity:.75;margin-top:3px}
.wallk{margin-top:4px}
.mwall{display:grid;gap:2px}
.mw{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid var(--rule);padding:9px 0;font-size:14.5px}
.mw i{font-style:normal;font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.5}
@media(max-width:820px){.mgrid{grid-template-columns:1fr;gap:28px}}
"""

OPTIONS = [
    ('A', 'One band, tiers named',
     'Diamond, Gold and Silver as a row, each saying what it underwrites rather than what it costs. '
     'The donor wall is mentioned in the copy. Smallest build, and it reads as an ask rather than a '
     'price list. It also names three tiers the site cannot yet honour: a Diamond patron will ask '
     'what a hall costs, and there is no answer on the page.',
     PAGE_A, SHARED),
    ('B', 'Tiers and the wall, side by side  &middot;  MY PICK',
     'The same tiers, plus the donor wall shown as a real structure with its three categories '
     'waiting to be filled. "Reserved" is honest while there are no names, and it makes the '
     'recognition concrete, which is what a corporate funder is actually buying. Largest of the '
     'three, and the one that becomes a real page once names exist.',
     PAGE_B, SHARED),
    ('C', 'A quiet line, no tiers',
     'States that corporate sponsors, foundations and individuals underwrite the work, and that '
     'levels are agreed case by case. Promises nothing the site cannot deliver today, and it is the '
     'version that needs no decisions about what Diamond means. Weakest as a prompt: a funder '
     'reading it learns that support exists, not that they are being asked.',
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
