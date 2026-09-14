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

HERO = img('images/hero-globe.jpg')

# Arc geometry traced over the globe in the art: start, control, end, in a 1600x900 viewBox.
# Endpoints kept inside the globe's disc in the artwork, roughly on lit landmass, so no arc
# terminates in empty ocean or runs off the edge.
ARCS = [
    (1000, 420, 1130, 300, 1290, 370),
    (1020, 455, 1160, 360, 1330, 450),
    (985, 500, 1110, 470, 1270, 545),
    (1015, 395, 1120, 285, 1245, 300),
    (1030, 530, 1160, 575, 1300, 600),
]
NODES = [(1000, 420), (1290, 370), (1330, 450), (1270, 545), (1245, 300), (1300, 600)]


def svg_layer(mode):
    paths = ''.join(
        f'<path class="arc arc{i}" d="M{a} {b} Q{c} {d} {e} {f}" />'
        for i, (a, b, c, d, e, f) in enumerate(ARCS))
    dots = ''.join(f'<circle class="node n{i}" cx="{x}" cy="{y}" r="3.5" />' for i, (x, y) in enumerate(NODES))
    pulses = ''
    if mode == 'travel':
        pulses = ''.join(
            f'<circle class="pkt" r="5"><animateMotion dur="{5 + i}s" repeatCount="indefinite" '
            f'begin="{i * 0.7}s" path="M{a} {b} Q{c} {d} {e} {f}" /></circle>'
            for i, (a, b, c, d, e, f) in enumerate(ARCS))
    return (f'<svg class="heroart {mode}" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" '
            f'aria-hidden="true">{paths}{dots}{pulses}</svg>')


def hero(mode, note):
    return (f'<div class="mockhero2"><img class="heroimg" src="{HERO}" alt="">'
            f'{svg_layer(mode) if mode else ""}<span class="heroveil"></span>'
            f'<div class="herocopy"><p class="eyebrow">Media &middot; Knowledge &middot; Intelligence</p>'
            f'<h1 class="disp">The dark forces shaping the <span class="y">global criminal underworld</span></h1>'
            f'<p class="hero-lede">We expose the $6 trillion shadow economy and predict what it does next.</p>'
            f'<div class="cta-row"><a class="btn btn-y" href="#">Watch the films</a></div></div>'
            f'<span class="heronote">{note}</span></div>')


PAGE_A = hero('', 'No motion. What is live now.')
PAGE_B = hero('draw', 'Arcs draw once on load, then nodes breathe slowly.')
PAGE_C = hero('travel', 'Arcs draw, then traffic runs along them continuously.')

SHARED = """
.mockhero2{position:relative;overflow:hidden;border:1px solid var(--line-2);min-height:460px;display:flex;align-items:flex-end}
.heroimg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right center}
.heroveil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.95),rgba(0,0,0,.74) 38%,rgba(0,0,0,.22) 66%,rgba(0,0,0,.55))}
.herocopy{position:relative;z-index:3;padding:clamp(22px,4vw,48px);width:100%}
.mockhero2 .disp{font-size:clamp(30px,4.4vw,56px);margin:10px 0 14px;max-width:17ch}
.hero-lede{color:var(--text-2);font-size:16px;margin:0 0 20px;max-width:52ch}
.heronote{position:absolute;right:12px;bottom:12px;z-index:4;font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-2);background:rgba(0,0,0,.8);border:1px solid var(--line-2);padding:6px 10px}

/* The animated layer: vector arcs over the photographic globe. No JavaScript, a few KB. */
.heroart{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none}
.heroart .arc{fill:none;stroke:#FFD400;stroke-width:1.6;opacity:.6;filter:drop-shadow(0 0 3px rgba(255,212,0,.55));
  stroke-dasharray:1200;stroke-dashoffset:1200;animation:draw 2.4s ease-out forwards}
.heroart .arc1{animation-delay:.25s}.heroart .arc2{animation-delay:.5s}
.heroart .arc3{animation-delay:.75s}.heroart .arc4{animation-delay:1s}.heroart .arc5{animation-delay:1.25s}
.heroart .node{fill:#FFD400;opacity:0;filter:drop-shadow(0 0 4px rgba(255,212,0,.7));animation:pop .6s ease-out forwards 1.6s}
.heroart.draw .node{animation:pop .6s ease-out forwards 1.6s, breathe 4s ease-in-out infinite 2.4s}
.heroart .pkt{fill:#fff;opacity:.9}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes pop{to{opacity:1}}
@keyframes breathe{0%,100%{opacity:1;r:4}50%{opacity:.45;r:6}}
/* Anyone who has asked their system to reduce motion gets the finished state, not the animation. */
@media (prefers-reduced-motion:reduce){
  .heroart .arc{animation:none;stroke-dashoffset:0}
  .heroart .node{animation:none;opacity:1}
  .heroart .pkt{display:none}
}
"""

RECOMMEND = 'B'

TITLE = 'A dynamic hero'
INTRO = ('The hero art is a raster render, so it cannot be animated as-is. What it can have is a '
         'vector layer on top: the trade routes as SVG arcs, animated in CSS. A few KB, no '
         'JavaScript, no runtime dependency. Open this and watch, screenshots cannot show motion. '
         'Reload to see the entrance again.')

OPTIONS = [
    ('A', 'No motion (what is live now)',
     'The photographic globe on its own. Fast, calm, and the headline is the only thing moving when '
     'you scroll. Worth seeing next to the others before adding anything.',
     PAGE_A, SHARED),
    ('B', 'Arcs draw once, then the nodes breathe  ·  MY PICK',
     'Six routes draw themselves over about two seconds, then the city nodes pulse slowly. It says '
     'the thing the site argues, that these places are connected, and then it settles. Nothing '
     'competes with the headline after the first few seconds, which matters on a page people return '
     'to. Roughly 4KB of SVG and CSS, no JavaScript.',
     PAGE_B, SHARED),
    ('C', 'Arcs draw, then traffic runs continuously',
     'The same entrance, then packets travel the routes forever. More literal about flow, and the '
     'strongest first impression. It never stops though, so it keeps pulling the eye away from the '
     'copy and the signup, and permanent motion behind text is the thing people ask you to turn off.',
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
