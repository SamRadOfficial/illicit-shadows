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

def svg(name):
    raw = open(os.path.join(PUB, 'images/cascade', name), 'rb').read()
    return 'data:image/svg+xml;base64,' + base64.b64encode(raw).decode()

MAPS = {n: svg(f'{n}.svg') for n in
        ('00-trigger', '01-routes', '02-entities', '03-property', '04-influence')}
STAGES = [('00-trigger', 'Trigger', 'Day 0', 'Contraband is interdicted at Rotterdam.'),
          ('01-routes', 'Routes', 'Day 0', 'Volume shifts to Antwerp and Hamburg.'),
          ('02-entities', 'Entities', '+11 days', 'Shell registrations spike in Lisbon, the Caribbean, offshore.'),
          ('03-property', 'Property', '+3 months', 'Real-estate cash purchases rise in London, Miami, Dubai.'),
          ('04-influence', 'Influence', '+12 months', 'Political funding anomalies appear in the EU and North America.')]

HITS = ''.join(
    f'<button class="hit{" on" if n == 0 else ""}" style="left:{(60 + n * 299) / 16}%;width:{281 / 16}%" '
    f'aria-label="{lab}"></button>' for n, (f, lab, lag, what) in enumerate(STAGES))


def figure(active='00-trigger', cls=''):
    active = active or '00-trigger'
    return (f'<figure class="cfig {cls}"><img src="{MAPS[active]}" alt="">'
            f'<div class="hits">{HITS}</div></figure>')


def head(label, meta):
    return (f'<div class="head"><span class="lbl">{label}</span><span class="bar"></span>'
            f'<span class="meta">{meta}</span></div>')


PAGE_A = (head('Cascade prediction', 'WORKED EXAMPLE')
          + figure() + '<p class="cfoot">The chain is the claim: disruption does not remove the '
          'trade, it moves it, and each move surfaces in different data.</p>')

PAGE_B = (head('Cascade prediction', 'WORKED EXAMPLE')
          + '<div class="cwide">' + figure() + '</div>'
          + '<p class="cfoot">Full-bleed. The map is the argument, so it gets the width of the screen.</p>')

RAIL = ''.join(
    f'<button class="railbtn{" on" if n == 0 else ""}"><span class="rn">{n:02d}</span>'
    f'<span class="rl">{lab}</span><span class="rg">{lag}</span>'
    f'<span class="rw">{what}</span></button>' for n, (f, lab, lag, what) in enumerate(STAGES))

PAGE_C = (head('Cascade prediction', 'WORKED EXAMPLE')
          + f'<div class="crail"><div class="railcol">{RAIL}</div>{figure("", "in-rail")}</div>'
          + '<p class="cfoot">The whole chain stays visible while you move through it.</p>')

SHARED = """
.cfig{position:relative;margin:0;border:1px solid var(--line-2)}
.cfig img{display:block;width:100%;height:auto;background:#000}
.hits{position:absolute;left:0;right:0;top:87.8%;height:6.7%}
.hit{position:absolute;top:0;height:100%;background:none;border:1px solid transparent;border-radius:7px;cursor:pointer}
.hit:hover{border-color:var(--signal)}
.cfoot{font-size:12.5px;color:var(--muted);line-height:1.65;margin-top:14px;font-style:italic}
.cwide{width:100vw;max-width:100vw;margin-left:calc(50% - 50vw)}
.cwide .cfig{border-left:0;border-right:0}
.crail{display:grid;grid-template-columns:300px 1fr;gap:20px;align-items:start}
.railcol{display:flex;flex-direction:column;gap:8px}
.railbtn{display:block;text-align:left;background:none;border:1px solid var(--line);border-left:3px solid var(--line);padding:12px 14px;cursor:pointer;font:inherit}
.railbtn:hover{border-color:var(--line-2)}
.railbtn.on{border-left-color:var(--signal);background:#141210}
.rn{font-family:var(--disp);font-size:13px;color:var(--signal);margin-right:8px}
.rl{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--text)}
.rg{display:block;font-family:var(--mono);font-size:10px;color:var(--signal);margin-top:6px}
.rw{display:block;color:var(--muted);font-size:13px;line-height:1.55;margin-top:4px}
"""

RECOMMEND = 'A'

TITLE = 'The cascade block'
INTRO = ('Three ways to present the five maps, after the Helix section and its divider. In all '
         'three the timeline the map already draws is clickable: hover a chip to see the target. '
         'Stage 00 is shown; the real component switches the image.')

OPTIONS = [
    ('A', 'Contained, timeline only  ·  MY PICK',
     'The map at content width, nothing around it but the caveat. The graphic already carries its '
     'own header, illustrative chip, stage strip and explanation panel, so anything added in HTML '
     'repeats it. Reads as one considered object rather than a widget.',
     PAGE_A, SHARED),
    ('B', 'Full-bleed',
     'The same thing edge to edge. The map labels get noticeably bigger, which is the strongest '
     'argument for it, and the section feels like a centrepiece. It also breaks the page rhythm: '
     'nothing else on the site runs full width except the break bands.',
     PAGE_B, SHARED),
    ('C', 'Stage rail beside the map',
     'A list of all five stages on the left, always visible, with the map on the right. You can see '
     'the whole chain and the current step at once, which is the one thing A and B cannot do. The '
     'cost is duplication: the rail repeats the timeline inside the graphic, and the map shrinks to '
     'about three quarters width, so its labels get smaller.',
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
        f'<style>{FACES}{css}{SHELL}{"".join(extra)}</style></head><body><div class="mockwrap">'
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; /MUSEUM</p>'
        f'<h1>{TITLE}</h1><p>{INTRO}</p></div>{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
