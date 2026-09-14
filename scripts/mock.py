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

import json as _json

FILMS = _json.load(open(os.path.join(ROOT, 'data/films.json')))
tagvocab = _json.load(open(os.path.join(ROOT, 'data/tags.json')))
GOLD = [f for f in FILMS if f['slug'] == 'illicit-gold'][0]
CC = [f for f in FILMS if f['slug'] == 'chemical-cartels'][0]
SEGS = CC['segments']


def head(label, meta):
    return (f'<div class="head"><span class="lbl">{label}</span><span class="bar"></span>'
            f'<span class="meta">{meta}</span></div>')


def chips(keys):
    return ('<div class="chips">'
            + ''.join(f'<span class="ctag">{tagvocab[k]}</span>' for k in keys if k in tagvocab)
            + '</div>')


def film_card(f, extra=''):
    status = 'Released' if f['status'] == 'streaming' else 'In production'
    prov = 'cited' if f['status'] == 'streaming' else 'investigating'
    return (f'<article class="work"><a class="work-img" href="#">'
            f'<img src="{img(f["image"] + ".jpg")}" alt="{f["title"]}">'
            f'<span class="prov prov--{prov} work-status">{status}</span></a>'
            f'<div class="work-body"><h3 class="work-title">{f["title"]}</h3>'
            f'<p class="work-places">{" · ".join(f["places"])}</p>'
            f'<p class="work-line">{f["line"]}</p>{chips(f["tags"])}</div>{extra}</article>')


def rows(n=4):
    out = ''.join(
        f'<a class="seg compact" href="#"><span class="sgn">{s["n"]:02d}</span>'
        f'<span class="sgt">{s["title"]}</span>'
        f'<span class="sgd">{s.get("runtime", "")}</span></a>' for s in SEGS[:n])
    return (f'<div class="segwrap"><p class="segcap">{CC["form"]}</p><div class="seglist">{out}</div>'
            f'<p class="seemore"><a href="#">All {len(SEGS)} &rarr;</a></p></div>')


def mini(n=3):
    out = ''.join(
        f'<a class="minicard" href="#"><span class="minicard-img">'
        f'<img src="{img(s["image"] + ".jpg")}" alt=""></span>'
        f'<span class="minicard-t">{s["title"]}</span>'
        f'<span class="minicard-r">{s.get("runtime", "")}</span></a>' for s in SEGS[:n])
    return (f'<div class="segwrap"><p class="segcap">{CC["form"]}</p><div class="minigrid">{out}</div>'
            f'<p class="seemore"><a href="#">All {len(SEGS)} &rarr;</a></p></div>')


def strip():
    out = ''.join(
        f'<a class="stripcard" href="#"><img src="{img(s["image"] + ".jpg")}" alt="{s["title"]}">'
        f'<span class="stripcard-n">{s["n"]:02d}</span></a>' for s in SEGS)
    return (f'<div class="segwrap"><p class="segcap">{CC["form"]}, scroll to see them all</p>'
            f'<div class="strip-scroll">{out}</div>'
            f'<p class="seemore"><a href="#">All {len(SEGS)} with summaries &rarr;</a></p></div>')


def page(seg_block):
    return (head('Film', 'INVESTIGATIONS')
            + f'<div class="works">{film_card(GOLD)}{film_card(CC, seg_block)}</div>')


PAGE_A, PAGE_B, PAGE_C = page(rows()), page(mini()), page(strip())

SHARED = """
.works{display:grid;gap:20px}
.work{display:grid;grid-template-columns:1.15fr 1fr;gap:0 26px;align-items:center;background:var(--panel);border:1px solid var(--line);border-top:3px solid var(--signal)}
.work-img{position:relative;display:block;aspect-ratio:16/9;overflow:hidden}
.work-img img{width:100%;height:100%;object-fit:cover;display:block}
.work-status{position:absolute;left:12px;bottom:12px;background:rgba(0,0,0,.78)}
.work-body{padding:24px 26px 24px 0}
.work-title{font-family:var(--disp);font-size:clamp(28px,3.2vw,42px);text-transform:uppercase;line-height:1;color:var(--text);margin:0 0 8px}
.work-places{font-family:var(--mono);font-size:11.5px;letter-spacing:.14em;color:var(--signal);text-transform:uppercase;margin:0 0 14px}
.work-line{color:var(--text-2);font-size:15px;line-height:1.75;margin:0 0 16px}
.ctag{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line-2);padding:4px 9px}
.segwrap{grid-column:1/-1;margin:4px 26px 22px;border-top:1px solid var(--line);padding-top:6px}
.segcap{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin:10px 0 14px}
.segwrap .seg{grid-template-columns:34px 1fr auto;padding:9px 0;gap:12px}
.segwrap .sgt{font-size:15px;font-weight:700;color:var(--text)}
.sgd{font-family:var(--mono);font-size:11px;color:var(--dim)}
.seemore{margin:16px 0 4px}
.seemore a{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--signal);border-bottom:1px solid var(--alert);padding-bottom:3px}
.minigrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.minicard{display:block}
.minicard-img{display:block;aspect-ratio:16/9;overflow:hidden;border:1px solid var(--line)}
.minicard-img img{width:100%;height:100%;object-fit:cover;display:block}
.minicard-t{display:block;font-weight:700;font-size:14px;color:var(--text);margin-top:8px}
.minicard-r{display:block;font-family:var(--mono);font-size:10.5px;color:var(--dim);margin-top:3px}
/* A grid item defaults to min-width:auto, so without this the strip stretches its card
   instead of scrolling inside it. Verified by checking scrollWidth against clientWidth. */
.segwrap{min-width:0}
.strip-scroll{display:flex;gap:10px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x proximity;padding-bottom:10px}
.strip-scroll::-webkit-scrollbar{height:6px}
.strip-scroll::-webkit-scrollbar-thumb{background:var(--line-2)}
.stripcard{scroll-snap-align:start}
.stripcard{position:relative;flex:0 0 232px;aspect-ratio:16/9;overflow:hidden;border:1px solid var(--line)}
.stripcard img{width:100%;height:100%;object-fit:cover;display:block}
.stripcard-n{position:absolute;right:6px;top:6px;font-family:var(--disp);font-size:12px;color:var(--signal);background:rgba(0,0,0,.72);padding:1px 6px}
/* These rules come after site.css, so its 820px block cannot win on specificity alone.
   Restate the mobile layout here or the mock lies about small screens. */
@media(max-width:820px){
  .work{grid-template-columns:1fr}
  .work-body{padding:0 18px 22px}
  .segwrap{margin:4px 18px 20px}
  .minigrid{grid-template-columns:1fr 1fr}
  .stripcard{flex:0 0 186px}
}
"""

RECOMMEND = 'C'

TITLE = 'Shorts on the film index'
INTRO = ('How much of Chemical Cartels\' eleven short films the index should carry. The film page '
         'keeps the full card grid in every case; this is only about the index. All three end in a '
         'link through, and no ordinal framing returns in any of them.')

OPTIONS = [
    ('A', 'Text rows, four of eleven',
     'What is in the build now. Compact, scannable, gives runtimes, and keeps the index about the '
     'two films. It also hides the best asset you have: the covers never appear until someone clicks.',
     PAGE_A, SHARED),
    ('B', 'Three covers as cards',
     'The first three shorts as small cards. Shows the artwork without much height. The weakness is '
     'arbitrariness: three of eleven with no reason for those three, and the card shape repeats the '
     'film card directly above it.',
     PAGE_B, SHARED),
    ('C', 'Scrolling strip, all eleven',
     'Every cover in one horizontal row you can scroll. Shows the scale of the work instantly, which '
     'four rows of text cannot, and costs about the same vertical space as option A. Drag on desktop, '
     'swipe on mobile.',
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
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; /FILM</p>'
        f'<h1>{TITLE}</h1><p>{INTRO}</p></div>{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
