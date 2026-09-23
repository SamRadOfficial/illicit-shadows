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
TITLE = 'Homepage hero: Get updates'
INTRO = ('The header stays as it is, with Contact. The email field and yellow Get updates button go in '
         'the hero, posting to the same form as the signup lower on the page. Each option shows the '
         'hero, the state after submitting, and a phone.')

HERO_IMG = img('/images/hero-globe.jpg')
NAV = ('<div class="nv"><div class="nvw"><div class="bd">ILLICIT <b>SHADOWS</b></div>'
       '<nav class="lk"><a>Film &#8964;</a><a>Intelligence</a><a>Museum</a><a>Books</a><a>Newsroom</a><a>About</a></nav>'
       '<a class="navy">Contact &#8599;</a></div></div>')
HEAD = ('<p class="k">Media. Knowledge. Intelligence.</p><h1>The dark forces shaping the '
        '<span>global criminal underworld</span></h1><p class="ld">We investigate the $6 trillion shadow '
        'economy, expose the systems behind it, and model how its networks adapt.</p>')
FORM = '<form class="sg"><input type="email" placeholder="Email address"><button class="yb">Get updates</button></form>'
OK = '<div class="okb">&#10003; You\'re on the list.</div>'

def hero(inner, mob=False):
    cls = 'hr m' if mob else 'hr'
    return f'<div class="{cls}" style="background-image:linear-gradient(90deg,#080909 38%,rgba(8,9,9,.35) 70%,rgba(8,9,9,.1)),url({HERO_IMG})"><div class="hin">{HEAD}{inner}</div></div>'
def phone(inner):
    return (f'<div class="ph"><div class="nv m"><div class="nvw"><div class="bd">ILLICIT <b>SHADOWS</b></div>'
            f'<span class="hb">&#9776;</span></div></div>{hero(inner, True)}</div>')

# A: the signup replaces the yellow button; the two existing actions become links
actsA = f'{FORM}<div class="lnks"><a class="ed">Watch the investigations &#8599;</a><a class="ed">Meet the platform &#8595;</a></div>'
okA   = f'{OK}<div class="lnks"><a class="ed">Watch the investigations &#8599;</a><a class="ed">Meet the platform &#8595;</a></div>'
PAGE_A = ('<p class="cap">Desktop</p><div class="stage">'+NAV+hero(actsA)+'</div>'
          '<p class="cap">After submitting</p><div class="stage">'+NAV+hero(okA)+'</div>'
          '<p class="cap">Phone</p>'+phone(actsA))

# B: keep the existing buttons, add the signup as its own labelled row beneath
rowB = ('<div class="acts"><a class="wbtn">Watch the investigations &#8599;</a><a class="ed">Meet the platform &#8595;</a></div>'
        f'<div class="sgrow"><p class="sgl">New dispatches, museum openings and the book, first.</p>{FORM}</div>')
okB = ('<div class="acts"><a class="wbtn">Watch the investigations &#8599;</a><a class="ed">Meet the platform &#8595;</a></div>'
       f'<div class="sgrow"><p class="sgl">New dispatches, museum openings and the book, first.</p>{OK}</div>')
PAGE_B = ('<p class="cap">Desktop</p><div class="stage">'+NAV+hero(rowB)+'</div>'
          '<p class="cap">After submitting</p><div class="stage">'+NAV+hero(okB)+'</div>'
          '<p class="cap">Phone</p>'+phone(rowB))

# C: signup first and yellow; Watch becomes an outlined button beside it
rowC = f'<div class="acts">{FORM}<a class="obtn">Watch the investigations &#8599;</a></div>'
okC  = f'<div class="acts">{OK}<a class="obtn">Watch the investigations &#8599;</a></div>'
PAGE_C = ('<p class="cap">Desktop</p><div class="stage">'+NAV+hero(rowC)+'</div>'
          '<p class="cap">After submitting</p><div class="stage">'+NAV+hero(okC)+'</div>'
          '<p class="cap">Phone</p>'+phone(rowC))

SHARED = """
.cap{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#9aa;margin:22px 0 8px}
.stage{background:#080909;border:1px solid #232a2a;overflow:hidden;width:1200px;max-width:100%}
.nv{background:#000;border-bottom:2px solid #E11D1D}
.nvw{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:20px;height:72px;padding:0 24px}
.nv.m .nvw{grid-template-columns:1fr auto;height:62px;padding:0 18px}
.bd{font-weight:800;font-size:21px;letter-spacing:.03em;color:#fff;white-space:nowrap}.bd b{color:#FFD400}
.lk{display:flex;justify-content:center;gap:18px;font-size:15px}.lk a{color:#fff;font-weight:500}
.navy{background:#FFD400;color:#000;font-weight:700;font-size:13.5px;padding:11px 18px;white-space:nowrap}
.hb{color:#fff;font-size:24px}
.hr{background-size:cover;background-position:right center;padding:56px 40px 60px;min-height:470px}
.hr.m{padding:34px 20px 40px;min-height:0;background-position:70% center}
.hin{max-width:520px}
.k{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#FFD400}
h1{font-family:var(--disp);text-transform:uppercase;color:#fff;font-size:52px;line-height:.98;margin:12px 0 16px}
.hr.m h1{font-size:36px}
h1 span{color:#FFD400}
.ld{color:#fff;font-size:16.5px;line-height:1.55;margin-bottom:24px;opacity:.95}
.sg{display:flex;max-width:440px}
.sg input{flex:1;min-width:0;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.35);border-right:0;color:#fff;padding:0 14px;font-size:15px;height:48px}
.yb{background:#FFD400;color:#000;border:0;padding:0 20px;height:48px;font-weight:700;font-size:14.5px;white-space:nowrap}
.okb{display:inline-flex;align-items:center;height:48px;padding:0 18px;border:1px solid #FFD400;color:#FFD400;font-family:var(--mono);font-size:13.5px;letter-spacing:.08em}
.lnks{display:flex;gap:26px;margin-top:18px;flex-wrap:wrap}
.ed{color:#fff;font-size:14.5px;font-weight:600;border-bottom:1px solid #FFD400;padding-bottom:4px}
.acts{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
.wbtn{background:#FFD400;color:#000;font-weight:700;font-size:14.5px;padding:14px 20px}
.obtn{border:1px solid rgba(255,255,255,.55);color:#fff;font-weight:600;font-size:14.5px;padding:0 18px;height:48px;display:inline-flex;align-items:center}
.sgrow{margin-top:26px;border-top:1px solid rgba(255,255,255,.18);padding-top:18px;max-width:460px}
.sgl{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:#d8dcdc;margin-bottom:10px}
.ph{width:390px;border:10px solid #1a1d1d;border-radius:34px;overflow:hidden;background:#080909}
.ph .sg{max-width:none}.ph .acts{gap:14px}
"""

OPTIONS = [
 ('A','Signup replaces the yellow button',
  'The email field and Get updates take the primary spot; Watch the investigations and Meet the '
  'platform become the two links beneath. The strongest push to sign up, and the cleanest hero. The '
  'cost is that watching, the one thing a first-time visitor can do immediately, drops to a link.',
  PAGE_A, SHARED),
 ('B','Keep the buttons, add a signup row  &middot;  MY PICK',
  'The hero keeps Watch the investigations as its yellow button, then a separate row beneath, behind '
  'a thin rule, with a line on what people get and the email field. Two clear jobs, watch now or hear '
  'first, and the label tells people why to sign up, which lifts signups more than a bare field.',
  PAGE_B, SHARED),
 ('C','Signup and Watch side by side',
  'Field and yellow Get updates first, Watch the investigations as an outlined button beside it. '
  'Compact, one row on desktop, but on a phone the two stack and the hero gets long, and two strong '
  'actions next to each other compete.', PAGE_C, SHARED),
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
