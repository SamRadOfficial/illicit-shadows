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

IMG = img('images/museum-rotunda.jpg')

COPY = ('Walk the site model: the rotunda, the hall positions, and the routes between them. '
        'Phase I opens 2027.')


def stage(inner, cls=''):
    return f'<div class="entershot {cls}"><img src="{IMG}" alt="The Eclipse Rotunda">{inner}</div>'


PAGE_A = (f'<div class="head"><span class="lbl">The building</span><span class="bar"></span>'
          f'<span class="meta">3D PROTOTYPE</span></div>'
          + stage('<span class="enter-scrim"></span>'
                  '<span class="enter-mid"><a class="btn btn-y btn-lg" href="#">Enter the museum</a>'
                  '<span class="enter-note">Interactive prototype</span></span>'
                  '<span class="badge btm">MIS &middot; CONCEPT RENDER</span>', 'is-a')
          + f'<p class="enter-copy">{COPY}</p>')

PAGE_B = (f'<div class="head"><span class="lbl">The building</span><span class="bar"></span>'
          f'<span class="meta">3D PROTOTYPE</span></div>'
          + stage('<span class="enter-scrim tall"></span>'
                  '<span class="enter-bl">'
                  '<span class="eyebrow">Museum of Illicit Shadows &middot; concept render</span>'
                  f'<span class="enter-h">Walk the <b>site model</b></span>'
                  '<a class="btn btn-y" href="#">Enter the museum (prototype)</a>'
                  '</span>', 'is-b')
          + f'<p class="enter-copy">{COPY}</p>')

PAGE_C = ('<div class="enter-wide">'
          + stage('<span class="enter-scrim side"></span>'
                  '<span class="enter-left">'
                  '<span class="eyebrow">The building &middot; 3D prototype</span>'
                  '<span class="enter-h big">Enter the <b>museum</b></span>'
                  f'<span class="enter-sub">{COPY}</span>'
                  '<a class="btn btn-y btn-lg" href="#">Enter the museum</a>'
                  '<span class="enter-note">Concept render. Phase I opens 2027.</span>'
                  '</span>', 'is-c')
          + '</div>')

SHARED = """
.entershot{position:relative;display:block;overflow:hidden;border:1px solid var(--line-2);max-width:1000px;margin:0 auto}
.entershot img{display:block;width:100%;height:auto}
.enter-scrim{position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 50%,rgba(0,0,0,.62),rgba(0,0,0,.28) 60%,rgba(0,0,0,.72))}
.enter-scrim.tall{background:linear-gradient(180deg,rgba(0,0,0,.15) 30%,rgba(0,0,0,.88))}
.enter-scrim.side{background:linear-gradient(90deg,rgba(0,0,0,.92) 32%,rgba(0,0,0,.35) 62%,rgba(0,0,0,.15))}
.btn-lg{padding:18px 34px;font-size:15px}
.enter-mid{position:absolute;inset:0;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center}
/* The render is busy behind this, so the note needs its own plate rather than relying
   on the scrim. It was unreadable without one. */
.enter-note{align-self:start;font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-2);background:rgba(0,0,0,.82);border:1px solid var(--line-2);padding:5px 10px}
.enter-mid .enter-note{align-self:center;margin-top:4px}
.enter-bl{position:absolute;left:0;right:0;bottom:0;padding:clamp(18px,3vw,34px);display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.enter-h{font-family:var(--disp);font-size:clamp(26px,3.4vw,42px);text-transform:uppercase;color:var(--text);line-height:1}
.enter-h b{color:var(--signal);font-weight:400}
.enter-h.big{font-size:clamp(30px,4vw,52px)}
.enter-left{position:absolute;left:0;top:0;bottom:0;width:min(52%,520px);padding:clamp(20px,3vw,40px);display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:14px}
.enter-sub{color:var(--text-2);font-size:15px;line-height:1.7;max-width:42ch}
.enter-copy{color:var(--text-2);font-size:15px;line-height:1.7;max-width:64ch;margin:16px auto 0;max-width:1000px}
.enter-wide .entershot{max-width:none}
"""

RECOMMEND = 'C'

TITLE = 'Enter the museum'
INTRO = ('Three ways to put the way in on top of the render, replacing the current render plus a '
         'separate button row underneath. All use the real Rotunda concept and the real button '
         'styles. Each keeps the render labelled as a concept: the museum does not exist yet.')

OPTIONS = [
    ('A', 'Centered button, cinematic scrim',
     'The render darkens toward the middle and the button sits dead center, like a play control on '
     'a video. Unmistakable, and it borrows an interaction people already understand. The cost is '
     'that a vignette over an architectural render flattens the depth the image was made for.',
     PAGE_A, SHARED),
    ('B', 'Bottom-left stack over a gradient',
     'Headline and button sit low left over a bottom-up gradient, the same treatment as the film '
     'heroes. Consistent with the rest of the site and it keeps the top two thirds of the render '
     'clean. Quieter, and the button competes with the concept stamp for the same corner.',
     PAGE_B, SHARED),
    ('C', 'Full-bleed, copy and button on the dark left',
     'The render runs edge to edge with a side scrim, and the headline, the line of copy and the '
     'button sit in the dark left third the image already has. Nothing is covered that matters, the '
     'button has room to be large, and the render reads as a place rather than a thumbnail.',
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
