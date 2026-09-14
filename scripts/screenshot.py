"""Serves out/ on a local port and screenshots routes with headless Chromium at 2x.
   python3 scripts/screenshot.py <route> <out.png> [--full] [--width 1200]
An agent that cannot see its work will ship a blank hero and report that it looks great."""
import sys, os, threading, http.server, socketserver, asyncio, argparse
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); OUT = os.path.join(ROOT, 'out')
ap = argparse.ArgumentParser(); ap.add_argument('route'); ap.add_argument('dest'); ap.add_argument('--full', action='store_true'); ap.add_argument('--width', type=int, default=1200)
a = ap.parse_args()
class Q(http.server.SimpleHTTPRequestHandler):
    def __init__(s, *x, **k): super().__init__(*x, directory=OUT, **k)
    def log_message(s, *x): pass
    def do_GET(s):
        # emulate Vercel's clean-URL routing for the static export
        p = s.path.split('?')[0]
        if p != '/' and not os.path.splitext(p)[1] and os.path.exists(os.path.join(OUT, p.strip('/') + '.html')): s.path = p.rstrip('/') + '.html'
        return super().do_GET()
srv = socketserver.TCPServer(('127.0.0.1', 0), Q); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
async def go():
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch(); ctx = await b.new_context(viewport={'width': a.width, 'height': 900}, device_scale_factor=2, reduced_motion='reduce')
        pg = await ctx.new_page(); await pg.goto(f'http://127.0.0.1:{port}{a.route}', wait_until='networkidle')
        # Scroll the whole page so loading="lazy" images and IntersectionObserver reveals fire before capture.
        await pg.evaluate('''async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } window.scrollTo(0, 0); }''')
        await pg.wait_for_load_state('networkidle'); await pg.wait_for_timeout(700)
        await pg.screenshot(path=a.dest, full_page=a.full); h = await pg.evaluate('document.documentElement.scrollHeight')
        await b.close(); print(a.dest, f'({a.width}px wide, page {h}px tall)')
asyncio.run(go()); srv.shutdown()
