"""Built page in, one standalone HTML out, every image/logo/font/video inlined as base64.
   python3 scripts/preview.py <route> <out.html>     e.g.  python3 scripts/preview.py / /tmp/home.html
Handles src, href, srcset AND srcSet (React emits camelCase). Missing that drops every hero."""
import re, base64, mimetypes, os, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'out'); PUB = os.path.join(ROOT, 'public')
route, dest = sys.argv[1], sys.argv[2]
name = 'index.html' if route in ('/', '') else route.strip('/') + '.html'
html = open(os.path.join(OUT, name)).read()
css = ''.join(open(f).read() for f in glob.glob(os.path.join(OUT, '_next/static/css/*.css')))
html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
html = re.sub(r'<script[^>]*/>', '', html)
html = re.sub(r'<link[^>]*_next/static[^>]*>', '', html)
missing = []
def b64(path):
    p = os.path.join(PUB, path.lstrip('/'))
    if not os.path.exists(p): missing.append(path); return path
    mt = mimetypes.guess_type(p)[0] or 'application/octet-stream'
    return f'data:{mt};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
ASSET = r'/(?:images|logos|fonts|video)/'
html = re.sub(r'(src="|href="|srcSet="|srcset=")(' + ASSET + r'[^"]+)(")', lambda m: m.group(1) + b64(m.group(2)) + m.group(3), html)
html = re.sub(r'url\((["\']?)(' + ASSET + r'[^)"\']+)\1\)', lambda m: 'url(' + b64(m.group(2)) + ')', html)
css  = re.sub(r'url\((["\']?)(' + ASSET + r'[^)"\']+)\1\)', lambda m: 'url(' + b64(m.group(2)) + ')', css)
html = html.replace('</head>', '<style>' + css + '</style></head>', 1)
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB', ('MISSING: ' + ', '.join(missing)) if missing else 'all assets inlined')
