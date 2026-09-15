"""Apply the Sep 15 design-handoff surface system to a built page, as a standalone mockup.
   python3 scripts/surface-mock.py <route> <out.html> id=surface id=surface ...
Surfaces: dark | slate | cream | yellow. Sections not listed stay as built. This is a review
artifact: it restyles the real page output rather than re-rendering, so content, images and
component structure are exactly what ships. Nothing here is production code."""
import re, sys, os, subprocess

route, dest, *pairs = sys.argv[1:]
surfaces = dict(p.split('=') for p in pairs)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_path = os.path.join(ROOT, 'out', 'index.html' if route == '/' else route.strip('/') + '.html')
html = open(html_path).read()

# Tag sections by id with a surface attribute.
for sid, surf in surfaces.items():
    html, n = re.subn(rf'(<section[^>]*id="{sid}"[^>]*)>', rf'\1 data-surface="{surf}">', html, count=1)
    if not n: print('no section with id', sid)

# Generic evidence-wall breaks become fine rules; tag them while the src is still a path.
html = html.replace('loading="lazy"', 'loading="eager"')
html = re.sub(r'<div class="brk"(?=[^>]*>(?:(?!</div>).)*?break-evidence)', '<div class="brk brk-generic"', html, flags=re.S)

TOKENS = """
<style id="surface-mock">
:root{--s-dark:#080909;--s-cream:#F0EEE8;--s-slate:#1C242C;--s-yellow:#FFD400;
      --ink:#171717;--ink-2:#404040;--red:#AD2425}
body{background:var(--s-dark)}
/* Fewer photographic breaks: the handoff replaces most with whitespace and a fine rule. The one
   page-specific divider (home-global-trade) is kept; generic evidence-wall breaks become rules. */
.brk-generic{display:none}
section.wrap[data-surface]+section.wrap[data-surface]::after{content:"";position:absolute;left:50%;top:0;transform:translateX(-50%);width:100vw;height:1px;background:rgba(127,127,127,.25)}
section.wrap[data-surface]{position:relative;padding-top:clamp(56px,7vw,96px);padding-bottom:clamp(56px,7vw,96px)}
section.wrap[data-surface]::before{content:"";position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:100vw;z-index:-1}
section.wrap[data-surface] + section.wrap[data-surface]{border-top:0}
section.band-raised[data-surface]::before{border:0}

/* Slate: a feature interlude, white text. */
[data-surface="slate"]::before{background:var(--s-slate)}
[data-surface="slate"] .work,[data-surface="slate"] .ppanel{background:#222b34;border-color:#303a44}
[data-surface="slate"] .segwrap{border-color:#303a44}

/* Cream: reading surfaces. Dark ink, deep red accents, no yellow small text. */
section.wrap[data-surface="cream"]::before{background:var(--s-cream)}
section.wrap[data-surface="cream"] :where(h1,h2,h3,h4,.disp,.lbl,strong,b){color:var(--ink) !important}
section.wrap[data-surface="cream"] :where(p,li,.pd,.pd2,.nsum,.lead-line,.mt p,.tier,.tier *){color:var(--ink-2) !important}
section.wrap[data-surface="cream"] :where(.eyebrow,.meta,.ndate,.nk,.pn,.ptag,.head .meta,.mono){color:#6b665c !important}
section.wrap[data-surface="cream"] :where(a,.nt,.nm):not(.btn){color:var(--ink) !important}
section.wrap[data-surface="cream"] :where(.chip-h){color:var(--ink-2) !important;border-color:#cfcabf}
section.wrap[data-surface="cream"] :where(.y,h3 span,.disp span,.lead-title span,.seemore a,.nt a:hover){color:var(--red) !important}
section.wrap[data-surface="cream"] :where(.chip,.ctag,.prov){color:var(--ink-2) !important;border-color:#cfcabf !important;background:#faf9f6}
[data-surface="cream"],[data-surface="cream"] p,[data-surface="cream"] h2,[data-surface="cream"] h3,[data-surface="cream"] .disp{color:var(--ink) !important}
[data-surface="cream"] p,[data-surface="cream"] .lead-line,[data-surface="cream"] .pd2,[data-surface="cream"] .nsum{color:var(--ink-2) !important}
[data-surface="cream"] .eyebrow,[data-surface="cream"] .meta,[data-surface="cream"] .head .meta,[data-surface="cream"] .nk,[data-surface="cream"] .ndate{color:#6b665c !important}
[data-surface="cream"] .head .lbl{color:var(--ink) !important}
[data-surface="cream"] .head .bar{background-image:repeating-linear-gradient(90deg,var(--red) 0 14px,transparent 14px 22px);opacity:.9}
[data-surface="cream"] .y,[data-surface="cream"] h3 span,[data-surface="cream"] .lead-title span,[data-surface="cream"] a.seemore,[data-surface="cream"] .seemore a{color:var(--red) !important}
[data-surface="cream"] .seemore a{border-bottom-color:var(--red) !important}
[data-surface="cream"] .btn-y{background:var(--ink);color:#fff !important}
[data-surface="cream"] .btn-o{color:var(--ink) !important;border-color:var(--red) !important}
[data-surface="cream"] .chips .ctag,[data-surface="cream"] .prov{color:var(--ink-2) !important;border-color:#cfcabf !important;background:#faf9f6}
[data-surface="cream"] .badge{background:var(--ink);color:#fff !important}
[data-surface="cream"] .film-feature,[data-surface="cream"] .concept{border-color:#cfcabf !important}
[data-surface="cream"] .newsrow,[data-surface="cream"] .nrow{border-color:#d9d5cb !important}
[data-surface="cream"] .film-div{border-color:#d9d5cb !important}
[data-surface="cream"] .nk{background:#e4e0d6;color:var(--ink) !important}
[data-surface="cream"] .nt a,[data-surface="cream"] .nt{color:var(--ink) !important}
[data-surface="cream"] .ptag,[data-surface="cream"] .pn{color:#6b665c !important}

/* Yellow: compact CTA. Dark text, black button with white text (per handoff). */
[data-surface="yellow"]::before{background:var(--s-yellow)}
[data-surface="yellow"]{padding-top:clamp(36px,5vw,64px);padding-bottom:clamp(36px,5vw,64px)}
[data-surface="yellow"] .donor{background:none;border:0;padding:0}
section.wrap[data-surface="yellow"] :where(h1,h2,h3,h4,h5,.disp,.eyebrow,.lbl,.donor :not(.btn)){color:#111 !important}
section.wrap[data-surface="yellow"] :where(.disp span,h3 span,h4 span,.y){color:#111 !important;text-decoration:underline;text-decoration-color:var(--red) !important;text-underline-offset:6px}
section.wrap[data-surface="yellow"] :where(p,li,.tier,.tier *,.meta){color:#221c00 !important}
section.wrap[data-surface="yellow"] .donor .btn-y{background:#000 !important;color:#fff !important;border-color:#000 !important}
[data-surface="yellow"] .btn-o{color:#111 !important;border-color:#111 !important}
[data-surface="yellow"] .tiers,[data-surface="yellow"] .tier{border-color:rgba(0,0,0,.25) !important;color:#111 !important}

/* The yellow connect band moves to a dark rule-only band, so yellow is spent once, on the donor moment. */
.ctaband.tone-signal{background:var(--s-dark);color:#fff;border-top:2px solid var(--s-yellow);border-bottom:1px solid #1f1f1f}
.ctaband.tone-signal .cb-l{color:#c9c9c9}
.ctaband.tone-signal .cb-a{background:none;color:var(--s-yellow);border-color:#333}
</style>"""
html = html.replace('</head>', TOKENS + '</head>', 1)

tmp = os.path.join(ROOT, 'out', 'surface-mock.html')
open(tmp, 'w').write(html)
subprocess.run([sys.executable, os.path.join(ROOT, 'scripts', 'preview.py'), '/surface-mock', dest, '--lite'], check=True)
os.remove(tmp)
