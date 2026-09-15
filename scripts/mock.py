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

ARROW = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>'

ADDR = "1455 Pennsylvania Ave NW, Ste 400, Washington, DC 20004"
Q = "1455+Pennsylvania+Ave+NW+Suite+400,+Washington,+DC+20004"
EMBED = f"https://maps.google.com/maps?q={Q}&z=16&output=embed"
LINK = f"https://www.google.com/maps/search/?api=1&query={Q}"
DIR = f"https://www.google.com/maps/dir/?api=1&destination={Q}"

def details(tone='dark'):
    return (f'<p class="kicker">Washington, DC</p><h2>Find us<br><em>on Pennsylvania Avenue.</em></h2>'
            f'<p class="addr">1455 Pennsylvania Ave NW<br>Suite 400<br>Washington, DC 20004<br>United States</p>'
            f'<p class="fine">Two blocks east of the White House, between 14th and 15th.</p>'
            f'<div class="actions"><a class="ed-link" href="{LINK}" target="_blank" rel="noopener">Open in Google Maps {ARROW}</a>'
            f'<a class="ed-link" href="{DIR}" target="_blank" rel="noopener">Directions {ARROW}</a></div>')

IFRAME = (f'<iframe class="gmap" src="{EMBED}" title="Map showing 1455 Pennsylvania Avenue NW, Washington DC" '
          f'loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>')

PAGE_A = '<div class="s s-ink" style="padding:0">' + f'<div class="maprow">{IFRAME}<div class="mapcopy">{details()}</div></div></div>'

PAGE_B = (f'<div class="mapcopy" style="max-width:640px;margin-bottom:26px">{details()}</div>'
          f'<div class="mapwide">{IFRAME}</div></div>')

PAGE_C = ('<div class="s s-ink" style="padding:0">' + f'<div class="maprow"><div class="mapfacade" id="facade">'
          f'<div class="facade-grid"></div>'
          f'<span class="pin"></span>'
          f'<span class="pinlabel">Illicit Shadows<br><b>1455 Pennsylvania Ave NW</b></span>'
          f'<span class="wh">The White House</span>'
          f'<span class="facade-cta"><button class="ed-btn" type="button" data-showmap>Show the map {ARROW}</button>'
          f'<span class="facade-note">Nothing loads from Google until you press it</span></span>'
          f'</div><div class="mapcopy">{details()}</div></div></div>')

SHARED = """
.maprow{display:grid;grid-template-columns:1.25fr 1fr;gap:clamp(22px,3vw,44px);align-items:stretch}
.gmap{width:100%;min-height:420px;height:100%;border:1px solid var(--rule,#343b3b);display:block;filter:grayscale(.15) contrast(1.05)}
.mapwide .gmap{min-height:380px}
.mapcopy{display:flex;flex-direction:column;justify-content:center}
.addr{font-family:'IBM Plex Mono',monospace;font-size:14px;line-height:1.9;margin:16px 0 10px}
.mapcopy .actions{gap:26px}
/* Facade: nothing loads from Google until the button is pressed. Drawn with CSS, no image. */
.mapfacade{position:relative;min-height:420px;border:1px solid var(--rule,#343b3b);background:#0d1116;overflow:hidden}
.facade-grid{position:absolute;inset:0;background-image:linear-gradient(#182029 1px,transparent 1px),linear-gradient(90deg,#182029 1px,transparent 1px);background-size:46px 46px;opacity:.9}
.facade-grid:after{content:"";position:absolute;left:0;right:0;top:54%;height:14px;background:#141b22;transform:rotate(-8deg)}
.pin{position:absolute;left:52%;top:34%;width:14px;height:14px;border-radius:50%;background:#FFD400;box-shadow:0 0 0 6px rgba(255,212,0,.18)}
.pinlabel{position:absolute;left:52%;top:34%;transform:translate(18px,-8px);font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:rgba(8,9,9,.82);padding:7px 10px;line-height:1.5}
.pinlabel b{color:#FFD400;font-weight:500}
.wh{position:absolute;left:16%;top:56%;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#8b969f}
.facade-cta{position:absolute;left:0;right:0;bottom:22px;display:flex;flex-direction:column;align-items:center;gap:10px}
.facade-note{position:relative;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#8b969f}
.mapfacade .ed-btn{position:relative}
@media(max-width:820px){.maprow{grid-template-columns:1fr}.gmap,.mapfacade{min-height:320px}}
"""

EXTRA_JS = """
// Facade: build the iframe only when asked, the same way the film players do.
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-showmap]'); if (!btn) return;
  const box = btn.closest('.mapfacade');
  const f = document.createElement('iframe');
  f.className = 'gmap'; f.title = 'Map showing 1455 Pennsylvania Avenue NW, Washington DC';
  f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
  f.src = MAP_SRC;
  box.replaceWith(f);
});
"""

RECOMMEND = 'C'

TITLE = 'A map on the contact page'
INTRO = ('The office at 1455 Pennsylvania Avenue NW, two blocks from the White House. Open this in a '
         'browser with a connection: options A and B load a live Google map, C loads one when you '
         'press the button. All three use the same address, the same links out, and the same '
         'surfaces as the rest of the contact page.')

OPTIONS = [
    ('A', 'Map beside the address',
     'A live Google embed filling the left two thirds, the address and links beside it. Reads as '
     'part of the page rather than an attachment, and the surrounding blocks (the White House, the '
     'Treasury, Freedom Plaza) are visible at this zoom without labelling them ourselves.',
     PAGE_A, SHARED),
    ('B', 'Address above, map full width',
     'The address leads, the map runs the width of the content column underneath. Gives the map the '
     'most room and works best if you later want a wider view of the federal core. It also pushes '
     'the map below the fold on a laptop, where it is the thing people came for.',
     PAGE_B, SHARED),
    ('C', 'Placeholder, map on request  ·  MY PICK',
     'Identical to A once pressed, but nothing is requested from Google until someone asks for it. '
     'A Google embed sets cookies and runs third-party script on page load; this is the same facade '
     'pattern the films already use for YouTube, so the site keeps its no-third-party-on-load rule '
     'and its consent story stays simple. The placeholder still shows the pin, the address, and the '
     'White House to the west, and both map links work without pressing anything.',
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
        f'<script>const MAP_SRC={_json.dumps(EMBED)};{EXTRA_JS}</script>'
        f'</head><body><div class="mockwrap">'
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; /MUSEUM</p>'
        f'<h1>{TITLE}</h1><p>{INTRO}</p></div>{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
