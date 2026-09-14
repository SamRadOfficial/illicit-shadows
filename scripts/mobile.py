"""Same as preview.py, in a 390px phone frame, with @media (max-width:900px) blocks flattened.
   Narrowing a viewport in a standalone file does not trigger media queries.
   NOTE: vw units still resolve against the real window, not the frame."""
import re, sys, os, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
route, dest = sys.argv[1], sys.argv[2]
tmp = dest + '.tmp.html'
subprocess.run([sys.executable, os.path.join(ROOT, 'scripts/preview.py'), route, tmp], check=True)
html = open(tmp).read(); os.remove(tmp)
def flatten(m):
    body = m.group(2)
    return body if int(m.group(1)) >= 380 else ''
html = re.sub(r'@media\s*\(max-width:\s*(\d+)px\)\s*\{((?:[^{}]|\{[^{}]*\})*)\}', flatten, html)
frame = ('<style>html{background:#333}body{margin:0}.__phone{width:390px;margin:30px auto;border:12px solid #111;border-radius:40px;'
         'overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)}</style>')
html = html.replace('</head>', frame + '</head>', 1).replace('<body>', '<body><div class="__phone">', 1).replace('</body>', '</div></body>', 1)
open(dest, 'w').write(html); print(dest, len(html) // 1024, 'KB (mobile)')
