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

import math
RECOMMEND = 'B'
TITLE = 'Intelligence page: the intelligence cycle'
INTRO = ('Five stages, each tagged with the part of the platform that does the work: the films collect, '
         'Project Helix processes and analyzes, and the films and the museum disseminate. Framed as '
         'tactical and strategic intelligence. Helix is tagged in development, as it is everywhere else.')

STAGES = [
 ('01', 'Planning and Direction', 'Set the questions: which networks, which routes, which harms.', []),
 ('02', 'Collection', 'Field reporting, sources, filings and interviews.', ['Films']),
 ('03', 'Processing', 'Structure the evidence into a graph of actors, routes and money.', ['Project Helix']),
 ('04', 'Analysis and Production', 'Model how the network behaves and adapts under pressure.', ['Project Helix']),
 ('05', 'Dissemination', 'Put the findings in front of the people who can act on them.', ['Films', 'Museum']),
]
TAGC = {'Films':'#FFD400', 'Project Helix':'#7FB8FF', 'Museum':'#FF6A5C'}
def tags(ts):
    return ''.join(f'<span class="ctag" style="--c:{TAGC[t]}">{t}{" · in development" if t=="Project Helix" else ""}</span>' for t in ts)

HEAD = ('<p class="kicker">The intelligence cycle</p><h2 class="ch2">Tactical and strategic<br><em>intelligence.</em></h2>'
        '<p class="clede">Every investigation runs the same five stages. Each is carried by a different part of the platform.</p>')

# A: horizontal strip
strip=''.join(f'<div class="cs"><span class="cn">{n}</span><h3>{t}</h3><p>{d}</p><div class="ctags">{tags(ts)}</div></div>' for n,t,d,ts in STAGES)
PAGE_A = f'<div class="s s-ink cpadx">{HEAD}<div class="cstrip">{strip}</div></div>'

# B: the classic ring, center label, stages round it
def ring():
    cx,cy,r=300,300,210
    parts=[f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="#3a4242" stroke-width="2"/>']
    for i in range(5):
        a=-math.pi/2+i*2*math.pi/5; b=a+2*math.pi/5
        x1,y1=cx+r*math.cos(a+.2),cy+r*math.sin(a+.2); x2,y2=cx+r*math.cos(b-.2),cy+r*math.sin(b-.2)
        parts.append(f'<path d="M{x1:.1f},{y1:.1f} A{r},{r} 0 0 1 {x2:.1f},{y2:.1f}" fill="none" stroke="#FFD400" stroke-width="2.5" marker-end="url(#ah)"/>')
    for i,(n,t,d,ts) in enumerate(STAGES):
        a=-math.pi/2+i*2*math.pi/5; x,y=cx+r*math.cos(a),cy+r*math.sin(a)
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="30" fill="#080909" stroke="#FFD400" stroke-width="2"/>'
                     f'<text x="{x:.1f}" y="{y+6:.1f}" text-anchor="middle" font-family="Anton" font-size="20" fill="#FFD400">{n}</text>')
    parts.append(f'<text x="{cx}" y="{cy-20}" text-anchor="middle" font-family="Anton" font-size="30" fill="#fff">TACTICAL</text>'
                 f'<text x="{cx}" y="{cy+6}" text-anchor="middle" font-family="IBM Plex Mono" font-size="13" fill="#b9bdbd" letter-spacing="3">AND STRATEGIC</text>'
                 f'<text x="{cx}" y="{cy+44}" text-anchor="middle" font-family="Anton" font-size="30" fill="#FFD400">INTELLIGENCE</text>')
    return ('<svg viewBox="0 0 600 600" class="cring"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" '
            'markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#FFD400"/></marker></defs>'
            + ''.join(parts) + '</svg>')
legend=''.join(f'<div class="cl"><span class="cn">{n}</span><div><h3>{t}</h3><p>{d}</p><div class="ctags">{tags(ts)}</div></div></div>' for n,t,d,ts in STAGES)
PAGE_B = f'<div class="s s-ink cpadx">{HEAD}<div class="cgrid2">{ring()}<div class="clist">{legend}</div></div></div>'

# C: stages down the left, the platform across the top, a matrix of who does what
cols=['Films','Project Helix','Museum']
hdr=''.join(f'<th><span class="ctag" style="--c:{TAGC[c]}">{c}</span></th>' for c in cols)
rows=''.join(f'<tr><td class="ct"><span class="cn">{n}</span> {t}</td>' + ''.join(f'<td class="cm">{"&#9679;" if c in ts else ""}</td>' for c in cols) + '</tr>' for n,t,d,ts in STAGES)
PAGE_C = f'<div class="s s-ink cpadx">{HEAD}<table class="cmx"><thead><tr><th></th>{hdr}</tr></thead><tbody>{rows}</tbody></table><p class="fine cnote">Project Helix is in development.</p></div>'

SHARED = """
.cpadx{padding:40px 32px}
.cpadx::before{display:none!important}.cpadx{background:#080909;color:#fff;position:relative}
.ch2{font-size:clamp(30px,3.6vw,46px);margin:6px 0 10px}
.clede{font-size:16px;max-width:56ch;margin-bottom:28px;opacity:.9}
.cn{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--signal)}
.ctags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.ctag{display:inline-block;border:1px solid var(--c);color:var(--c);font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;padding:3px 7px}
.cstrip{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;position:relative}
.cs{border-top:2px solid var(--signal);padding-top:12px}
.cs h3{font-size:19px;margin:6px 0 8px;text-transform:uppercase}
.cs p{font-size:13.5px;opacity:.85}
.cgrid2{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center}
.cring{width:100%;max-width:460px;display:block}
.clist{display:grid;gap:16px}
.cl{display:grid;grid-template-columns:34px 1fr;gap:10px;border-top:1px solid #2a3131;padding-top:12px}
.cl h3{font-size:17px;margin:0 0 4px;text-transform:uppercase}
.cl p{font-size:13.5px;opacity:.85;margin:0}
.cmx{width:100%;border-collapse:collapse}
.cmx th{text-align:left;padding:10px 12px;border-bottom:1px solid #2a3131}
.cmx td{padding:14px 12px;border-bottom:1px solid #1d2323}
.cmx .ct{font-family:var(--disp);font-size:20px;text-transform:uppercase}
.cmx .cm{color:var(--signal);font-size:20px}
.cnote{margin-top:14px;opacity:.7}
"""

OPTIONS = [
 ('A','A horizontal strip',
  'Five columns left to right, each with the stage, one line of what happens, and the platform tag. Reads '
  'fastest and fits the page rhythm, but a straight line loses the point of a cycle: that dissemination '
  'feeds the next round of planning.', PAGE_A, SHARED),
 ('B','The ring  &middot;  MY PICK',
  'The classic cycle diagram, five nodes around a loop with "Tactical and Strategic Intelligence" at the '
  'center, and the stages explained beside it with their tags. It is the shape analysts already recognize, '
  'which is the argument for using it on a page aimed at government and industry. It is also the strongest '
  'brief for a ChatGPT-generated graphic.', PAGE_B, SHARED),
 ('C','A matrix',
  'Stages down the side, films, Project Helix and the museum across the top, a dot where each one does the '
  'work. The clearest answer to "what does each part actually do", and the least visual. Better as a '
  'supporting table than as the section itself.', PAGE_C, SHARED),
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
