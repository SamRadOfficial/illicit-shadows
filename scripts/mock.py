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
SEGS = [s for s in CC['segments'] if s.get('image')]


def head(label, meta):
    return (f'<div class="head"><span class="lbl">{label}</span><span class="bar"></span>'
            f'<span class="meta">{meta}</span></div>')


def grid():
    out = []
    for s in SEGS:
        sub = f'<span class="sgcard-s">{s["sub"]}</span>' if s.get('sub') else ''
        run = f'<span class="sgcard-r">{s["runtime"]}</span>' if s.get('runtime') else ''
        out.append(f'<div class="sgcard"><span class="sgcard-img">'
                   f'<img src="{img(s["image"] + ".jpg")}" alt="">'
                   f'<span class="pb sm">&#9654;</span>'
                   f'<span class="sgcard-n">{s["n"]:02d}</span></span>'
                   f'<span class="sgcard-t">{s["title"]}</span>{sub}{run}</div>')
    return '<div class="sggrid">' + ''.join(out) + '</div>'


def vlist():
    rows = []
    for s in SEGS:
        sub = f'<span class="vrow-s">{s["sub"]}</span>' if s.get('sub') else ''
        rows.append(f'<a class="vrow" href="#"><span class="vrow-n">{s["n"]:02d}</span>'
                    f'<span class="vrow-img"><img src="{img(s["image"] + ".jpg")}" alt="">'
                    f'<span class="pb sm">&#9654;</span></span>'
                    f'<span class="vrow-body"><span class="vrow-t">{s["title"]}</span>{sub}</span>'
                    f'<span class="vrow-r">{s.get("runtime", "")}</span></a>')
    return '<div class="vlist">' + ''.join(rows) + '</div>'


PAGE_A = head('Eleven short films', 'CHEMICAL CARTELS &middot; 11 PARTS') + grid()
PAGE_B = head('Eleven short films', 'CHEMICAL CARTELS &middot; 11 PARTS') + vlist()


def hero(ctas, note=''):
    return ('<div class="mockhero">'
            '<p class="eyebrow">Media &middot; Knowledge &middot; Intelligence</p>'
            '<h1 class="disp">The dark forces shaping the <span class="y">global criminal underworld</span></h1>'
            '<p class="hero-lede">We expose the $6 trillion shadow economy and predict what it does next.</p>'
            + ctas + note + '</div>')


CTA_C = hero(
    '<div class="cta-row"><a class="btn btn-y btn-lg" href="#">Watch the films</a></div>'
    '<form class="signup mini"><input type="email" placeholder="Email address" aria-label="Email address">'
    '<button type="submit">Sign up</button></form>',
    '<p class="hero-note">One thing to press, one thing to leave behind.</p>')

CTA_D = hero(
    '<div class="cta-row"><a class="btn btn-y btn-lg" href="#">Watch the films</a>'
    '<a class="btn btn-o" href="#">Sign up for updates</a></div>',
    '<p class="hero-note">The email field moves to its own block further down.</p>')

CTA_E = hero(
    '<form class="signup"><input type="email" placeholder="Email address" aria-label="Email address">'
    '<button type="submit">Sign up for updates</button></form>'
    '<p class="sub-alt">Or <a href="#">watch the films</a></p>')

SHARED = """
.sggrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.sgcard{display:block;background:var(--panel);border:1px solid var(--line)}
.sgcard-img{position:relative;display:block;aspect-ratio:16/9;overflow:hidden;background:#0c0c0c}
.sgcard-img img{width:100%;height:100%;object-fit:cover;display:block}
.sgcard-n{position:absolute;right:10px;top:10px;font-family:var(--disp);font-size:15px;color:var(--signal);background:rgba(0,0,0,.72);padding:2px 7px}
.sgcard-t{display:block;font-weight:700;font-size:16px;color:var(--text);padding:14px 16px 0}
.sgcard-s{display:block;color:var(--muted);font-size:13.5px;padding:4px 16px 0}
.sgcard-r{display:block;font-family:var(--mono);font-size:11px;color:var(--dim);padding:10px 16px 16px}
.pb.sm{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:40px;height:40px;font-size:14px;box-shadow:0 0 0 5px rgba(0,0,0,.35);border-radius:50%;background:var(--signal);color:var(--ink);display:flex;align-items:center;justify-content:center;z-index:3}
.vlist{border-top:1px solid var(--line)}
.vrow{display:grid;grid-template-columns:38px 208px 1fr auto;gap:20px;align-items:center;padding:14px 6px;border-bottom:1px solid var(--line)}
.vrow:hover{background:var(--panel)}
.vrow-n{font-family:var(--disp);font-size:16px;color:var(--signal)}
.vrow-img{position:relative;display:block;width:208px;aspect-ratio:16/9;overflow:hidden;border:1px solid var(--line)}
.vrow-img img{width:100%;height:100%;object-fit:cover;display:block}
.vrow-t{display:block;font-weight:700;font-size:17px;color:var(--text)}
.vrow-s{display:block;color:var(--muted);font-size:14px;margin-top:3px}
.vrow-r{font-family:var(--mono);font-size:11px;color:var(--dim)}
.mockhero{border:1px solid var(--line-2);background:var(--panel);padding:clamp(24px,4vw,48px)}
.mockhero .disp{font-size:clamp(34px,5vw,62px);margin:10px 0 16px;max-width:18ch}
.hero-lede{color:var(--text-2);font-size:17px;margin:0 0 24px;max-width:56ch}
.hero-note{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-top:18px}
.signup.mini{margin-top:16px;max-width:440px}
.btn-lg{padding:16px 32px;font-size:15px}
"""

RECOMMEND = 'B'

TITLE = 'Shorts layout, and the home hero'
INTRO = ('Two decisions in one page. A and B are the eleven short films on the Chemical Cartels page '
         'only; home and /film show three and stay as they are. C, D and E are the home hero, which '
         'currently carries three competing calls to action.')

OPTIONS = [
    ('A', 'Shorts as a grid (what is live now)',
     'Eleven covers three across. The artwork is the strongest asset on the page and this shows all '
     'of it. At eleven it also becomes a wall: four rows with a stray on the last, and the titles '
     'sit below the art where they are hard to scan.',
     PAGE_A, SHARED),
    ('B', 'Shorts as a vertical list  ·  MY PICK',
     'A 208px still per row with number, title, subtitle and runtime on one line. You can read down '
     'eleven titles in a single pass, which the grid does not allow, and the still is still large '
     'enough to read the burned-in title. Closer to how the thing is actually used: pick the next '
     'one.',
     PAGE_B, SHARED),
    ('C', 'Hero: one button, then email  ·  MY PICK',
     'Watch the films as the only button, email field beneath it. One thing to press, one thing to '
     'leave behind. YouTube subscribe drops off the hero and stays beside the signup block further '
     'down, where it already lives.',
     CTA_C, SHARED),
    ('D', 'Hero: two buttons, no form',
     'Watch the films and Sign up as equal buttons, with the field moved to its own block down the '
     'page. Cleanest hero of the three, but it gives up the inline email capture, which is the one '
     'thing a hero is unusually good at collecting.',
     CTA_D, SHARED),
    ('E', 'Hero: email first, watching as a link',
     'The form leads and watching is a text link. Right if the list is the priority. Wrong, I think, '
     'for a first-time visitor: asking for an address before showing any of the work is a big ask.',
     CTA_E, SHARED),
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
