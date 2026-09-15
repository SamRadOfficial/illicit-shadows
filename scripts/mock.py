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

ARROW = ('<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" '
         'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         '<path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>')

def head(k, h, deck=''):
    return (f'<div class="intro"><div><span class="kicker">{k}</span><h2>{h}</h2></div>'
            f'{f"<p>{deck}</p>" if deck else ""}</div>')

STATEMENT = ('<p class="deck">Project Helix is a predictive convergence system: it models how '
             'criminal, political, and economic networks reorganize when something disrupts them.</p>'
             '<p>Most intelligence systems forecast discrete events: a shipment, a transfer, an '
             'attack. Helix models the adaptation that follows. The question it asks is not what '
             'happens next, but what the system does about it.</p>')

QUESTION = ('<figure class="pullq"><blockquote>If a disruption occurs at one node, how do the '
            'others reorganize to compensate?</blockquote>'
            '<figcaption>The modeling question behind the system</figcaption></figure>')

IO = ('<div class="two-col">'
      '<div><span class="kicker">What goes in</span>'
      '<ul class="tick"><li>Artifacts, mapping and research cataloged by the museum</li>'
      '<li>Open-source reporting and case histories</li>'
      '<li>Trade, corporate and sanctions records</li></ul>'
      '<p class="fine">Each input is tagged three ways: who is connected, how money moves, and how '
      'the story is told.</p></div>'
      '<div><span class="kicker">What comes out</span>'
      '<ul class="tick"><li>Where activity is likely to move after a disruption</li>'
      '<li>Which actors and routes absorb it</li>'
      '<li>Where the effects surface in other domains</li></ul>'
      '<p class="fine">Strategic foresight for decisions, not a prediction of a dated event.</p></div>'
      '</div>')

LAYERS = ('<ol class="method">'
          '<li><span class="n">01</span><h3>Intelligence layer</h3><p>Museum assets, artifacts and '
          'mapping enter the modeling framework, each tagged by network, economy and narrative.</p></li>'
          '<li><span class="n">02</span><h3>Global graph</h3><p>People, companies, ports, banks and '
          'offices as nodes; money, directorships, contracts and co-location as the edges between '
          'them.</p></li>'
          '<li><span class="n">03</span><h3>Causal engine</h3><p>Structural causal modeling rather '
          'than pattern matching: graph topology, temporal sequence, and probabilistic cascades.</p></li>'
          '<li><span class="n">04</span><h3>Reinforcement</h3><p>Simulated adaptation paths, tested '
          'against how networks have actually behaved.</p></li></ol>')

GOV = ('<div class="gov"><span class="kicker">Governance</span>'
       '<p>Helix is built to inform decisions, not to make them. Its usefulness depends on '
       'governance that keeps optimization subordinate to the rule of law, and on human judgment '
       'at every point where the model meets a decision.</p></div>')

def wrap(inner, surface='s-paper'):
    # Must be a real section.wrap.s: that selector carries position/isolation, without which the
    # surface pseudo-element never paints and the copy renders dark on dark.
    return f'<section class="wrap s {surface}">{inner}</section>'

PAGE_A = wrap(head('What it is', 'A system for<br><em>the next move.</em>') + STATEMENT + QUESTION + GOV)
PAGE_B = wrap(head('What it is', 'A system for<br><em>the next move.</em>',
                   'Four layers, from catalogued evidence to simulated adaptation.') + STATEMENT + LAYERS + GOV)
PAGE_C = wrap(head('What it is', 'A system for<br><em>the next move.</em>') + STATEMENT + QUESTION + IO + GOV)

SHARED = """
.pullq{margin:34px 0;border-left:3px solid var(--ac);padding:4px 0 4px 26px;max-width:46ch}
.pullq blockquote{margin:0;font-family:var(--disp);font-size:clamp(24px,3vw,34px);line-height:1.15;text-transform:uppercase}
.pullq figcaption{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;margin-top:14px;opacity:.75}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:38px;margin-top:34px;border-top:1px solid var(--rule);padding-top:26px}
.tick{list-style:none;padding:0;margin:14px 0 14px}
.tick li{font-size:15px;line-height:1.6;padding:9px 0 9px 20px;border-bottom:1px solid var(--rule);position:relative}
.tick li:before{content:"";position:absolute;left:0;top:17px;width:8px;height:1px;background:var(--ac)}
.gov{margin-top:34px;border-top:1px solid var(--rule);padding-top:20px;max-width:62ch}
.method li h3{font-size:22px}
@media(max-width:820px){.two-col{grid-template-columns:1fr}.method{grid-template-columns:1fr 1fr}}
"""

RECOMMEND = 'C'

TITLE = 'What Project Helix is'
INTRO = ('A description section for /intelligence, after the fusion-center block and before the '
         'four-layer method grid. Drawn from the February brief. Three depths, same surface and '
         'type as the rest of the page.')

OPTIONS = [
    ('A', 'Statement and the question',
     'The claim, the distinction from event forecasting, the modeling question as a pull quote, and '
     'the governance line. Shortest and least technical. It says what Helix is without describing '
     'how it is built, which the page already covers in the layer grid below.',
     PAGE_A, SHARED),
    ('B', 'Statement and the architecture',
     'The claim, then the four layers expanded with the graph and tagging detail from the brief. '
     'Most informative for an evaluator. It also duplicates the Gather / Connect / Model / Test grid '
     'that already follows on the page, so one of the two would have to go.',
     PAGE_B, SHARED),
    ('C', 'Statement, question, and what goes in and out  ·  MY PICK',
     'The claim and the question, then a plain account of inputs and outputs, then governance. It '
     'answers the two things a reader actually asks, what do you feed it and what do you get, '
     'without restating the architecture grid below or publishing a source list.',
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
        f'</head><body><div class="mockwrap">'
        f'<div class="mockhead"><p class="optlbl">ILLICIT SHADOWS &middot; /MUSEUM</p>'
        f'<h1>{TITLE}</h1><p>{INTRO}</p></div>{"".join(blocks)}</div></body></html>')
os.makedirs(os.path.dirname(dest), exist_ok=True)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB')
