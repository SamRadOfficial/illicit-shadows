"""One page, every option, standalone HTML. Built from styles/site.css and real assets.
   python3 scripts/mock.py <out.html>
The owner reviews options side by side in a single file, so never emit one file per option and
never emit images: the page is the deliverable. Fonts go in as woff2, images as base64, so the
file opens anywhere with nothing to fetch. Edit OPTIONS to change what is on offer.
Throwaway tooling for a pick; the chosen treatment lands in site.css and this goes away."""
import base64, io, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
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


def img(abspath):
    raw = open(abspath, 'rb').read()
    return 'data:image/jpeg;base64,' + base64.b64encode(raw).decode()


PUB = os.path.join(ROOT, 'public')
SHOT = {t['slug']: img(os.path.join(PUB, t['photo'].lstrip('/') + '.jpg')) for t in team if t.get('photo')}

FACES = ''.join(f'@font-face{{font-family:{fam};src:url({font(f)});font-weight:{w};font-display:block}}'
                for fam, f, w in [('Anton', 'Anton-Regular.ttf', '400'),
                                  ('Archivo', 'Archivo-Variable.ttf', '100 900'),
                                  ('IBM Plex Mono', 'IBMPlexMono-Regular.ttf', '400'),
                                  ('IBM Plex Mono', 'IBMPlexMono-Medium.ttf', '500')])

SQUARE = '.fcard.haspic .favatar{height:auto;aspect-ratio:1/1}'

DARK = {'david-luna': 'dark-david-luna', 'sam-rad': 'dark-sam-rad'}

OPTIONS = [
    ('A', 'Square photo, full card width',
     'Shipped 14 Sep. Untouched originals, square-cropped. Replace this list when the next pick '
     'comes up: one entry per option, all rendered on a single page.',
     {}, ''),
]


def cards(sub):
    out = []
    for t in team:
        slug = sub.get(t['slug'], t['slug'])
        out.append(
            f'<div class="fcard haspic"><div class="fhead"><div class="favatar">'
            f'<img src="{SHOT[slug]}" alt="{t["name"]}, {t["role"]}, Illicit Shadows"></div>'
            f'<div class="fmeta"><div class="fname">{t["name"]}</div>'
            f'<div class="frole">{t["role"].upper()}</div></div></div>'
            f'<div class="fanchor">{t["anchor"]}</div><p>{t["bio"]}</p></div>')
    return ''.join(out)


blocks, extra = [], []
for key, title, note, sub, rule in OPTIONS:
    extra.append(rule)
    blocks.append(
        f'<section class="opt opt-{key}"><p class="optlbl">OPTION {key}</p>'
        f'<h2 class="opttitle">{title}</h2><p class="optnote">{note}</p>'
        f'<div class="founders">{cards(sub)}</div></section>')

SHELL = """
body{padding:0}
.mockwrap{max-width:1180px;margin:0 auto;padding:56px 28px 90px}
.mockhead{border-bottom:1px solid var(--line);padding-bottom:26px;margin-bottom:14px}
.mockhead h1{font-family:var(--disp);font-size:46px;line-height:1;text-transform:uppercase;margin:8px 0 12px}
.mockhead p{color:var(--text-2);font-size:15px;line-height:1.7;max-width:66ch}
.opt{padding:50px 0;border-bottom:1px solid var(--line)}
.opt:last-child{border-bottom:0}
.optlbl{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--alert)}
.opttitle{font-family:var(--disp);font-size:30px;text-transform:uppercase;margin:8px 0 10px;color:var(--text)}
.optnote{color:var(--text-2);font-size:14.5px;line-height:1.75;max-width:70ch;margin:0 0 28px}
"""

html = (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
        f'<meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<title>Founder cards, options A to {OPTIONS[-1][0]}</title>'
        f'<style>{FACES}{css}{SHELL}{"".join(extra)}</style></head><body><div class="mockwrap">'
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; /ABOUT &middot; FOUNDERS</p>'
        f'<h1>Founder cards</h1><p>Portrait band treatment, real stylesheet, real assets. Sam\'s blue '
        f'studio background is gone and replaced with a backdrop built from David\'s, so the two sit in '
        f'the same light and at the same head scale, rescaled so both fill a square frame. Layouts A to C '
        f'use the light backdrop; D shows A on graphite.</p></div>'
        f'{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
