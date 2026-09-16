"""Package only the assets that actually changed since the last handoff.

    python3 scripts/pack-assets.py            # zip changed asset directories, if any
    python3 scripts/pack-assets.py --baseline # record the current state without zipping

Keeps a manifest of file hashes outside the repo (so it is never committed). On each run it
compares public/ against that manifest, groups changed files by the directory they live in, and
writes one zip per changed directory. If nothing changed, it says so and writes nothing: the source
zip is then the only deliverable.
"""
import os, sys, json, hashlib, zipfile, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
MANIFEST = os.path.join(os.path.dirname(ROOT), '.assets-manifest.json')
OUT = '/mnt/user-data/outputs'

def digest(p):
    h = hashlib.md5()
    with open(p, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()

current = {}
for dirpath, _, names in os.walk(PUB):
    for n in names:
        if n == '.DS_Store':
            continue
        full = os.path.join(dirpath, n)
        current[os.path.relpath(full, PUB)] = digest(full)

previous = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
changed = sorted(k for k, v in current.items() if previous.get(k) != v)
removed = sorted(k for k in previous if k not in current)

if '--baseline' in sys.argv:
    json.dump(current, open(MANIFEST, 'w'), indent=0)
    print(f'baseline recorded: {len(current)} files')
    sys.exit()

if not changed and not removed:
    print('no asset changes: ship the source zip only')
    sys.exit()

# Group by directory, so each zip is one folder the owner can drop in place.
dirs = {}
for rel in changed:
    dirs.setdefault(os.path.dirname(rel) or '.', []).append(rel)

for old in os.listdir(OUT):
    if old.startswith('illicit-shadows-ASSETS'):
        os.remove(os.path.join(OUT, old))

print(f'{len(changed)} changed file(s) in {len(dirs)} director(ies):')
for d, files in sorted(dirs.items()):
    tag = 'public' if d == '.' else d.replace('/', '-')
    zpath = os.path.join(OUT, f'illicit-shadows-ASSETS-{tag}.zip')
    with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
        for rel in files:
            z.write(os.path.join(PUB, rel), os.path.join('public', rel))
    size = os.path.getsize(zpath) // 1024
    print(f'  public/{d}/  {len(files)} file(s) -> {os.path.basename(zpath)} ({size} KB)')
    for rel in files:
        print(f'      {os.path.basename(rel)}')
if removed:
    print('deleted since last handoff (remove by hand):')
    for rel in removed:
        print(f'      public/{rel}')
json.dump(current, open(MANIFEST, 'w'), indent=0)
