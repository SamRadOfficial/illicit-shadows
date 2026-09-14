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

FILMS = _json.load(open(os.path.join(ROOT, 'data/films.json')))
CC = [f for f in FILMS if f['slug'] == 'chemical-cartels'][0]
SEGS = [s for s in CC['segments'] if s.get('image')][:4]


def row(s, variant):
    sub = f'<span class="vrow-s">{s["sub"]}</span>' if s.get('sub') else ''
    tx = '<a class="tx-jump" href="#">Narration &darr;</a>' if s.get('transcript') else ''
    overlay = '<span class="pb sm">&#9654;</span>' if variant == 'overlay' else ''
    thumb = (f'<span class="vrow-img">'
             f'<img src="{img(s["image"] + ".jpg")}" alt="">{overlay}</span>')
    body = f'<span class="vrow-body"><span class="vrow-t">{s["title"]}</span>{sub}{tx}</span>'
    if variant == 'overlay':
        right = f'<span class="vrow-r">{s.get("runtime", "")}</span>'
    else:
        right = (f'<span class="vrow-play"><button type="button" class="playbtn" aria-label="Play {s["title"]}">'
                 f'<span class="playbtn-ico">&#9654;</span><span class="playbtn-txt">Play</span></button>'
                 f'<span class="vrow-r">{s.get("runtime", "")}</span></span>')
    return f'<div class="vrow">{f"<span class=\'vrow-n\'>{s['n']:02d}</span>"}{thumb}{body}{right}</div>'


PAGE_A = '<div class="vlist v-320">' + ''.join(row(s, 'overlay') for s in SEGS) + '</div>'
PAGE_B = '<div class="vlist v-320 v-side">' + ''.join(row(s, 'side') for s in SEGS) + '</div>'
PAGE_C = '<div class="vlist v-440 v-side">' + ''.join(row(s, 'side') for s in SEGS) + '</div>'

SHARED = """
.vlist{border-top:1px solid var(--line)}
.vrow{display:grid;gap:22px;align-items:center;padding:18px 6px;border-bottom:1px solid var(--line)}
.v-320 .vrow{grid-template-columns:38px 320px 1fr auto}
.v-440 .vrow{grid-template-columns:38px 440px 1fr auto}
.vrow-n{font-family:var(--disp);font-size:16px;color:var(--signal);align-self:start;padding-top:4px}
.vrow-img{position:relative;display:block;width:100%;aspect-ratio:16/9;overflow:hidden;border:1px solid var(--line)}
.vrow-img img{width:100%;height:100%;object-fit:cover;display:block}
.pb.sm{position:absolute;right:10px;top:10px;width:36px;height:36px;font-size:12px;border-radius:50%;background:var(--signal);color:var(--ink);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 5px rgba(0,0,0,.4)}
.vrow-t{display:block;font-weight:700;font-size:19px;color:var(--text)}
.vrow-s{display:block;color:var(--muted);font-size:14.5px;margin-top:4px}
.tx-jump{display:inline-block;margin-top:10px;font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--signal);border-bottom:1px solid var(--alert);padding-bottom:2px}
.vrow-r{font-family:var(--mono);font-size:11px;color:var(--dim)}
.vrow-play{display:flex;flex-direction:column;align-items:center;gap:10px;min-width:96px}
.playbtn{display:flex;align-items:center;gap:9px;background:var(--signal);color:var(--ink);border:0;padding:12px 18px;font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.playbtn:hover{background:#fff}
.playbtn-ico{font-size:12px}
"""

RECOMMEND = 'B'

TITLE = 'Short-film thumbnails'
INTRO = ('Bigger stills, and the play control moved off the artwork. Four of the eleven rows shown. '
         'The covers exist nowhere else on the site, so the question is how large they can be before '
         'the list stops being a list.')

OPTIONS = [
    ('A', '320px still, play overlaid top right',
     'The current arrangement at 320px instead of 208. Titles are readable and the covers finally '
     'have presence. The play button still sits on the artwork, which is exactly what you asked to '
     'get away from, even in the corner.',
     PAGE_A, SHARED),
    ('B', '320px still, play control at the right  ·  MY PICK',
     'Nothing on the artwork at all: a labelled Play button in its own column with the runtime under '
     'it. The cover is never obscured, the control is larger and easier to hit than a 32px circle, '
     'and the word Play removes any doubt about what the row does. Eleven of these runs roughly '
     '2,400px, which still reads as a list.',
     PAGE_B, SHARED),
    ('C', '440px still, play control at the right',
     'The showcase version. The covers are almost poster-sized and every element of the artwork is '
     'legible. It costs length: eleven rows run past 3,000px, and the subtitle column gets narrow '
     'enough that longer lines wrap to three.',
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
