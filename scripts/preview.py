"""Built page in, one standalone HTML out, every image/logo/font/video inlined as base64.
   python3 scripts/preview.py <route> <out.html> [--lite]
Handles src, href, srcset AND srcSet (React emits camelCase). Missing that drops every hero.
--lite downscales inlined rasters (max 1100px, q55) and re-encodes the fonts as woff2 (1.1MB of TTF
becomes about 320KB), cutting a 4.6MB preview to well under 1MB so it opens in a chat/file viewer.
Layout and typefaces are identical; only image and font bytes differ.

CSS is globbed recursively under out/_next. Next 16 emits the stylesheet to static/chunks/, not the
static/css/ of Next 15. A fixed path silently produced unstyled previews after the upgrade."""
import re, base64, mimetypes, os, sys, glob, io, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'out'); PUB = os.path.join(ROOT, 'public')
LITE = '--lite' in sys.argv
route, dest = sys.argv[1], sys.argv[2]
name = 'index.html' if route in ('/', '') else route.strip('/') + '.html'
html = open(os.path.join(OUT, name)).read()
sheets = sorted(glob.glob(os.path.join(OUT, '_next/**/*.css'), recursive=True))
if not sheets: sys.exit('no stylesheet found under out/_next — run npm run build:export first')
css = ''.join(open(f).read() for f in sheets)
html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
html = re.sub(r'<script[^>]*/>', '', html)
html = re.sub(r'<link[^>]*_next/static[^>]*>', '', html)
missing = []
def b64(path):
    p = os.path.join(PUB, path.lstrip('/'))
    if not os.path.exists(p): missing.append(path); return path
    mt = mimetypes.guess_type(p)[0] or 'application/octet-stream'
    raw = open(p, 'rb').read()
    if LITE:
        if p.endswith('.ttf'):
            try:                            # re-encode to woff2: same typeface, about a third of the bytes
                from fontTools.ttLib import TTFont
                f = TTFont(io.BytesIO(raw)); f.flavor = 'woff2'
                buf = io.BytesIO(); f.save(buf)
                raw = buf.getvalue(); mt = 'font/woff2'
            except Exception: pass          # fonttools absent: inline the TTF rather than lose the face
        if p.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            try:
                from PIL import Image
                im = Image.open(io.BytesIO(raw))
                alpha = im.mode in ('RGBA', 'LA')
                im = im.convert('RGBA' if alpha else 'RGB')
                if im.size[0] > 1100: im = im.resize((1100, int(im.size[1] * 1100 / im.size[0])), Image.LANCZOS)
                buf = io.BytesIO()
                if alpha: im.save(buf, 'PNG', optimize=True); mt = 'image/png'
                else: im.save(buf, 'JPEG', quality=55, optimize=True); mt = 'image/jpeg'
                raw = buf.getvalue()
            except Exception: pass
    return f'data:{mt};base64,' + base64.b64encode(raw).decode()
ASSET = r'/(?:images|logos|fonts|video)/'
html = re.sub(r'(src="|href="|srcSet="|srcset=")(' + ASSET + r'[^"]+)(")', lambda m: m.group(1) + b64(m.group(2)) + m.group(3), html)
html = re.sub(r'url\((["\']?)(' + ASSET + r'[^)"\']+)\1\)', lambda m: 'url(' + b64(m.group(2)) + ')', html)
css  = re.sub(r'url\((["\']?)(' + ASSET + r'[^)"\']+)\1\)', lambda m: 'url(' + b64(m.group(2)) + ')', css)
# The source declares format("truetype"). After the woff2 re-encode that hint is a lie and browsers
# honor it over the actual bytes, so the face silently fails to load. Strip the hints; they sniff.
if LITE: css = re.sub(r'\s*format\((["\']?)[^)]*\1\)', '', css)
html = html.replace('</head>', '<style>' + css + '</style></head>', 1)
# Cache-bust the filename. Previews were always written as home.html, museum.html and so on, so
# a viewer or browser holding the previous file under the same name shows stale artwork, which
# repeatedly read as "the image did not update" when the build was in fact correct.
stamp = datetime.datetime.now().strftime('%H%M%S')
root, ext = os.path.splitext(dest)
dest = f'{root}-{stamp}{ext}'
open(dest, 'w').write(html)
print(dest, len(html) // 1024, 'KB', ('MISSING: ' + ', '.join(missing)) if missing else 'all assets inlined')
