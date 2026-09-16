"""Apply a candidate type scale to built pages, as a review artifact.
   python3 scripts/type-mock.py <A|B|C> <route> <out.html>
Injects an override stylesheet into the built HTML and re-runs preview.py, so the mockup is the
real site at a different size. Nothing here is production CSS."""
import sys, os, re, subprocess

option, route, dest = sys.argv[1:4]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_path = os.path.join(ROOT, 'out', 'index.html' if route == '/' else route.strip('/') + '.html')
html = open(html_path).read()

# Body copy, small print and labels move; headings are already large and stay put in A and B.
SCALES = {
 'A': """/* A: one step up. Body 16.5, small print 12, labels 11.5. */
.s p{font-size:16.5px;line-height:1.7}
.fine,.s .fine{font-size:12px;line-height:1.7}
.s .kicker,.kicker{font-size:11.5px}
.deck{font-size:21px;line-height:1.55}
.pillar p,.tile p,.upcoming p,.news-item p,.two-features p,.sequels p,.argument p,.offers p,.method p,.fm-item em{font-size:15px}
.nav .links{font-size:15.5px}
.ed-link,.ed-btn{font-size:14px}
.addr,.tick li,.audience,.sector li{font-size:15.5px}
@media(max-width:820px){.s p{font-size:16.5px}.nav .links{font-size:19px}}""",
 'B': """/* B: two steps up, editorial reading size. Body 18, small print 12.5. */
.s p{font-size:18px;line-height:1.72}
.fine,.s .fine{font-size:12.5px;line-height:1.7}
.s .kicker,.kicker{font-size:12px;letter-spacing:.1em}
.deck{font-size:22px;line-height:1.5}
.prose p{font-size:18.5px;line-height:1.8}
.prose p:first-child{font-size:21px}
.pillar p,.tile p,.upcoming p,.news-item p,.two-features p,.sequels p,.argument p,.offers p,.method p{font-size:16px}
.fm-item em{font-size:12px}
.nav .links{font-size:16px}
.ed-link,.ed-btn{font-size:14.5px}
.addr,.tick li,.audience,.sector li{font-size:16.5px}
.detail-meta,.byline,.credits dd{font-size:15px}
@media(max-width:820px){.s p{font-size:17.5px}.nav .links{font-size:20px}}""",
 'C': """/* C: B, plus headings and section heads up a step. */
.s p{font-size:18px;line-height:1.72}
.fine,.s .fine{font-size:12.5px;line-height:1.7}
.s .kicker,.kicker{font-size:12px;letter-spacing:.1em}
.deck{font-size:23px;line-height:1.5}
.prose p{font-size:18.5px;line-height:1.8}
.prose p:first-child{font-size:21px}
.s h1{font-size:clamp(44px,6vw,72px)}
.s h2{font-size:clamp(34px,4.6vw,52px)}
.s h3{font-size:29px}
.pillar h3{font-size:42px}
.pillar p,.tile p,.upcoming p,.news-item p,.two-features p,.sequels p,.argument p,.offers p,.method p{font-size:16px}
.fm-item em{font-size:12px}
.nav .links{font-size:16px}
.ed-link,.ed-btn{font-size:14.5px}
.addr,.tick li,.audience,.sector li{font-size:16.5px}
.detail-meta,.byline,.credits dd{font-size:15px}
@media(max-width:820px){.s p{font-size:17.5px}.nav .links{font-size:20px}}""",
}
# preview.py inlines the site stylesheet after this block, so equal-specificity rules would lose.
css = re.sub(r'(:\s*[^;{}]+)(;)', r'\1 !important\2', SCALES[option])
html = html.replace('</body>', f'<style id="type-mock">{css}</style></body>', 1)
tmp = os.path.join(ROOT, 'out', 'type-mock.html')
open(tmp, 'w').write(html)
subprocess.run([sys.executable, os.path.join(ROOT, 'scripts', 'preview.py'), '/type-mock', dest, '--lite'], check=True)
os.remove(tmp)
