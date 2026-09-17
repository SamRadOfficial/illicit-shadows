"""Generate a 1200x630 share card per route.

    python3 scripts/og-images.py

Each card is the page's own hero art, darkened, with the page title set in Anton and the wordmark
in the corner. Run again after changing a title; the routes are listed below rather than scraped,
so a new page needs a line here.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public/og')
FONTS = os.path.join(ROOT, 'public/fonts')
W, H = 1200, 630
SIGNAL, PAPER = (255, 212, 0), (240, 238, 232)

CARDS = [
    ('home',         '/images/hero-globe',        ['THE DARK FORCES', 'SHAPING THE GLOBAL', 'CRIMINAL UNDERWORLD'], 'Media · Knowledge · Intelligence'),
    ('film',         '/images/dividers/film-field-investigations', ['FOLLOW THE MONEY.', 'FIND THE SYSTEM.'], 'The investigations'),
    ('museum',       '/images/museum-rotunda',    ['MUSEUM OF', 'ILLICIT SHADOWS'],        'A virtual museum'),
    ('intelligence', '/images/hero-intelligence', ['A FUSION CENTER FOR', 'THE SHADOW ECONOMY'], 'Project Helix'),
    ('books',        '/images/books-hero',        ['ENTER THE', 'NARRATIVE UNIVERSE'],     'Illicit Shadows Chronicles'),
    ('newsroom',     '/images/hero-newsroom',     ['NEWS FROM', 'THE SHADOWS'],            'The wire'),
    ('about',        '/images/hero-about',        ['TWO PERSPECTIVES.', 'ONE FIELD OF VISION.'], 'About Illicit Shadows'),
    ('contact',      '/images/hero-contact',      ['START A', 'CONVERSATION'],             'Work with us'),
    ('donate',       '/images/museum-convergence', ['HELP BRING THE HIDDEN', 'WORLD TO LIGHT'], 'Support the work'),
    ('shop',         '/images/shop/hats-set',     ['WEAR THE', 'SHADOWS'],                 'MIS shop'),
    # The film covers already carry their own title and wordmark: art only, no overlay.
    ('chemical-cartels', '/images/film-chemical-cartels', None, None),
    ('illicit-gold',     '/images/film-illicit-gold',     None, None),
]

def load(base):
    for ext in ('.jpg', '.png'):
        p = os.path.join(ROOT, 'public' + base + ext)
        if os.path.exists(p):
            return Image.open(p).convert('RGB')
    raise SystemExit(f'missing art for {base}')

def cover(im):
    """Fill 1200x630 without distorting, biased right where the art usually sits."""
    r = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    left = min(max(0, im.width - W), round((im.width - W) * 0.65))
    top = max(0, (im.height - H) // 2)
    return im.crop((left, top, left + W, top + H))

anton = lambda s: ImageFont.truetype(os.path.join(FONTS, 'Anton-Regular.ttf'), s)
mono  = lambda s: ImageFont.truetype(os.path.join(FONTS, 'IBMPlexMono-Medium.ttf'), s)

os.makedirs(OUT, exist_ok=True)
for name, art, lines, eyebrow in CARDS:
    im = cover(load(art))
    if lines is None:
        im.save(os.path.join(OUT, f'{name}.jpg'), quality=88, optimize=True, progressive=True)
        print(f'  og/{name}.jpg  {os.path.getsize(os.path.join(OUT, f"{name}.jpg"))//1024} KB  (art only)')
        continue
    # Darken from the left so the type always has something to sit on.
    veil = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(veil)
    for x in range(W):
        d.line([(x, 0), (x, H)], fill=int(232 - 170 * min(1, x / (W * 0.78))))
    im = Image.composite(Image.new('RGB', (W, H), (8, 9, 9)), im, veil)
    im = ImageEnhance.Color(im).enhance(0.92)

    d = ImageDraw.Draw(im)
    size = 74 if max(len(l) for l in lines) <= 20 else 60
    while size > 34:
        f = anton(size)
        if max(d.textlength(l, font=f) for l in lines) <= W - 160:
            break
        size -= 2
    f = anton(size)

    d.text((72, 78), eyebrow.upper(), font=mono(19), fill=SIGNAL)
    y = 150
    for i, line in enumerate(lines):
        d.text((72, y), line, font=f, fill=(SIGNAL if i == len(lines) - 1 and len(lines) > 1 else PAPER))
        y += round(size * 1.06)

    wm = mono(21)
    d.text((72, H - 66), 'ILLICIT ', font=wm, fill=PAPER)
    d.text((72 + d.textlength('ILLICIT ', font=wm), H - 66), 'SHADOWS', font=wm, fill=SIGNAL)

    im.save(os.path.join(OUT, f'{name}.jpg'), quality=86, optimize=True, progressive=True)
    print(f'  og/{name}.jpg  {os.path.getsize(os.path.join(OUT, f"{name}.jpg"))//1024} KB')
print(f'{len(CARDS)} share cards written to public/og/')
