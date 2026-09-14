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

NAVLINKS = [('/', 'Home'), ('/film', 'Film'), ('/intelligence', 'Intelligence'), ('/museum', 'Museum'),
            ('/books', 'Books'), ('/newsroom', 'Newsroom'), ('/about', 'About')]


def navbar(cta_label='Contact', cta_class='btn btn-y navcta', on='/film'):
    """The real nav markup, static. Mirrors components/Blocks.jsx Nav()."""
    links = ''.join('<a href="%s"%s>%s</a>' % (h, ' class="on"' if h == on else '', l)
                    for h, l in NAVLINKS)
    return (f'<header class="nav"><div class="wrap">'
            f'<a class="brand" href="/">ILLICIT <b>SHADOWS</b></a>'
            f'<nav class="links" aria-label="Primary">{links}</nav>'
            f'<div class="navright"><a class="{cta_class}" href="/contact">{cta_label}</a>'
            f'<button class="navtoggle" aria-label="Toggle menu">&#9776;</button></div>'
            f'</div></header>')


RECOMMEND = 'A'

TITLE = 'Nav contact CTA'
INTRO = ('A contact button at the top right of the navigation. Each option shows the real nav bar at '
         'full width, then again in a 390px frame so you can see it beside the mobile menu toggle. '
         'The CTA sits outside the collapsible menu on purpose: a call to action hidden behind a '
         'hamburger is not a call to action.')

OPTIONS = [
    ('A', 'Solid signal yellow, "Contact"',
     "Signal yellow is the system's look-here token, so the CTA reads as the one thing to press, "
     'and the whole point of putting it in the nav is that it should pull. B gives that away to '
     'avoid a clash with the active link, which is a small cost paid to solve a smaller problem. C '
     'is more specific but squeezes the links at mid widths, and "Contact" is the word people look '
     'for. Below 820px the button is hidden and Contact moves to the bottom of the dropdown, so it '
     'never competes with the hamburger.',
     navbar(), ''),
    ('B', 'Outlined, "Contact"',
     'Same position, quieter. Solid yellow stays unique to the active link, and the button reads as '
     'a destination rather than an offer. Less pull.',
     navbar(cta_class='btn navcta navcta-o'),
     '.opt-B .navcta-o{background:transparent;color:var(--signal);border:1px solid var(--signal)}'
     '.opt-B .navcta-o:hover{background:var(--signal);color:var(--ink)}'),
    ('C', 'Solid yellow, "Work with us"',
     'The phrase the site already uses for this on /about and in the footer block. More specific '
     'than "Contact" and it matches the four self-selecting paths on /contact, but it is wider and '
     'squeezes the nav links at mid-range widths.',
     navbar(cta_label='Work with us'), ''),
]

blocks, extra = [], []
for key, title, note, body, rule in OPTIONS:
    extra.append(rule)
    blocks.append(
        f'<section class="opt opt-{key}"><p class="optlbl">OPTION {key}'
        f'{" <span class=\'rec\'>RECOMMENDED</span>" if key == RECOMMEND else ""}</p>'
        f'<h2 class="opttitle">{title}</h2><p class="optnote">{note}</p>'
        f'<div class="stage">{body}</div>'
        f'<p class="optsub">AT 390PX</p><div class="stage phone">{body}</div></section>')

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
.stage{border:1px solid var(--line);overflow:hidden}
.stage .nav{position:static}
.stage.phone{width:390px}
/* A narrow container does not fire the stylesheet's max-width media query, so the phone frame
   has to restate what the query does. Keep this in sync with the 820px block in site.css, and
   confirm anything mobile against a real 390px viewport, not this frame. */
.stage.phone .links{display:none}.stage.phone .navtoggle{display:block}
.stage.phone .brand{font-size:17px}
.stage.phone .navcta{padding:9px 14px;font-size:12px}
"""

html = (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
        f'<meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<title>{TITLE}, options A to {OPTIONS[-1][0]}</title>'
        f'<style>{FACES}{css}{SHELL}{"".join(extra)}</style></head><body><div class="mockwrap">'
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; NAVIGATION</p>'
        f'<h1>{TITLE}</h1><p>{INTRO}</p></div>{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
