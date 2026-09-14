# HANDOFF — illicitshadows.com

Read this first. Update it in the same commit as any change it describes. A handoff updated "later" lies.

## Rules that keep getting broken (owner-adjudicated 14 Sep 2026)

These override BRIEF.md and PLAYBOOK.md where they conflict.

- **HUNTER BILL is non-public.** Never in copy, alt text, or a commit message.
- **INTEL-tagged items need a sourcing pass.** Never published as established fact.
- **Named commercial entities get reciprocal treatment**: their response appears in the same sequence.
- **Madre de Dios material is held back** from promotional contexts. **Proporo Technologies is a proprietary source.**
- **Investor and financial content is data-room only.** No public page, gated or not.
- **Statistics carry a visible source** (mono). The $6T figure is ICAIE, 2026.
  - `<Stat>` is for a figure standing on its own (a stat cell, a callout). **Never inside running copy**: it sets the number in Anton and puts the citation mid-clause, which breaks the sentence.
  - Inside a sentence, use `<b className="fig">` for the number (yellow, same typeface) and put the attribution on a `<p className="srcline">` directly beneath, linked to `/sources`.
- **Evidentiary status is visible in the markup.** Use `<Prov status>`: cited, alleged, investigating, uncleared, illustrative. The Helix cascade is `illustrative`.
- **"Illicit Shadows Theater"**, never "Shadowverse Theater".
- **The Q3 2026 deck is canonical** for timelines and naming. Episode 2 is **Golden Handcuffs** (the brief's "Illicit Gold" title is the same film; deck wins).
- **Museum: Phase I 2027, Phase II 2028.** Never imply either is live.
- **The network-globe image is watermarked.** Do not ship it. Do not crop the watermark out. Not in `public/`.
- **No em dashes. American English.**

Rules the owner explicitly relaxed (do not re-litigate):
- **#EverythingIsConnected may appear beyond the footer.** It is the exception. Footer always carries it; creed sections may too.
- **Counters and series framing are allowed.** "Season 1", "10 segments", "episode" are fine. Festival pieces are also short films; do not undercut that, but episode language is not banned.
- **Signup and donation blocks stay and get wired** (provider TBD). Until wired they are visible placeholders; confirm before launch.

## Deploy (read before touching Vercel)

**Two build modes, one codebase. This matters; getting it wrong has broken the deploy twice.**
- `npm run build` -> `.next`. This is what Vercel runs. Every route is SSG, so all 15 pages are still prerendered to static HTML. Vercel's Next.js builder needs `.next/routes-manifest.json`, which only this mode produces.
- `npm run build:export` (`EXPORT=1 next build`) -> `out/`. A flat static export used **only** by the local tooling: `preview.py`, `mobile.py`, `check-assets.mjs`, `screenshot.py`. Never deployed.
- `next.config.js` sets `output: 'export'` **conditionally** on `process.env.EXPORT`. Do not make it unconditional.
- `vercel.json` carries **headers only**. No `framework`, no `outputDirectory`, no `buildCommand`. Let Vercel auto-detect Next.

**Failure modes already hit, in order:**
1. *"No Output Directory named 'public' found"* -> project preset was plain-static, looking for a folder named `public` as the output. `public/` is SOURCE, not output.
2. *404 NOT_FOUND on every route including `/`* -> `vercel.json` had `framework: "nextjs"` with `outputDirectory: "out"`. The Next builder wants its routing manifests; a static export has none.
3. *"/vercel/path0/out/routes-manifest.json couldn't be found"* -> `output: 'export'` was unconditional while Vercel ran its Next builder. Fixed by the conditional above.

**Other deploy rules:**
- **`public/` is SOURCE** (images, fonts, logos, `museum-viewer.html`), committed to git, never gitignored. Missing it means a green build with every image 404ing.
- **Root Directory** in Project Settings must be the folder containing `package.json`. A nested project folder 404s. Same failure as sam-rad.com.
- **Never commit `node_modules/` or `.DS_Store`.** Both tracked in this repo's early history; they dirty the tree on every rebase. `.gitignore` must contain `node_modules/`, `.next/`, `out/`, `*.tmp.html`, `.DS_Store`.
- `npm run check` runs the export build first, so it always audits fresh output.

## Stack
Next.js 16 App Router, JavaScript, `output: 'export'` to `out/`, Vercel from `main` (every push is production; use preview branches). Three runtime deps (next, react, react-dom); analytics later. No CMS: content in `data/*.json`, one file per type. One stylesheet `styles/site.css`, tokens at top. Fonts self-hosted in `public/fonts` (Anton, Archivo variable, IBM Plex Mono; OFL from google/fonts). Three.js for `/museum/enter` (integrate `MIS_Viewer.html`, do not rebuild).

## Design system
Tokens in `site.css`: ink `#000000` (black, not dark gray), panel `#0e0e0e`, signal `#FFD400` (look here), alert `#E11D1D` (serious only, never a hover), text/muted/dim neutral grays. No warm neutrals. Display Anton, body Archivo, metadata IBM Plex Mono. Section head = display label + patterned red rule + mono meta. Full-bleed `<Break>` image bands separate sections. Review at `/specimen` before any page work.

## Nav
Seven links plus a **solid signal-yellow Contact CTA at the right** (owner pick, 14 Sep). The button
lives in `.navright` beside the toggle. **At or below 820px the button is hidden and the bar shows only the
brand and the hamburger; the same yellow button appears as the last item inside the dropdown once it
is open** (`.navmob`). Both carry `btn btn-y`, so it is the same button in both places, not a link
that resembles one. `.navcta` and `.navmob` are pure CSS mirrors with no JavaScript deciding which
shows, so Contact renders exactly once at any width. Verified by counting visible
`a[href="/contact"]` in the nav at 390 (closed and open), 820, 821, 1024 and 1280; if you touch
either rule, re-count, and include 820 and 821 because that is where the swap happens.

`.brand` is `white-space:nowrap` and drops to 17px on mobile, or it wraps to two lines once the
button takes width. The mobile dropdown opens at `top:72px` to match the nav height; it was 60px and
overlapped the bar.

## Component inventory
`components/Blocks.jsx` (client): `Pic` · `Nav` · `Footer` · `SectionHead` · `Break` · `Prov` · `Stat` · `Reveal` · `Hero` · `Signup` · `Donor` · `DigitalMuseum`.
`components/Icons.jsx` (server-safe, no 'use client'): the `Icon` map of inline SVGs.
**Rule learned 14 Sep (reveal) — REMOVED, do not reintroduce:** the scroll-triggered fade hid every section behind `opacity:0` until JS added a class. It broke standalone previews, no-JS visitors, and then production (sections invisible on the live site even with the `.js` gate in place, most likely a hydration failure). The mechanism is gone: `.reveal` is inert, `<Reveal>` is deleted, and there is no js-gate script. Verified by rendering the built site with JavaScript fully disabled. **Never ship a default of `opacity:0` that depends on JavaScript to undo.**

**Rule learned 14 Sep (client modules):** never export a non-component value (an object of JSX elements) from a `'use client'` module. Server pages receive a client-reference proxy and render nothing, silently. Components are fine; values are not.

## Verified content facts
Entity: Illicit Shadows, LLC. Founders: Sam Rad, David M. Luna. Partners: ICAIE (DC), RADOC (NYC/DC/London). Socials: @illicitshadowsdoc (YouTube, Instagram), @illicit_Shadows (X). Contact: sam@illicitshadows.com. Season 1: E01 Chemical Cartels (streaming, 10 segments with runtimes in `data/films.json`), E02 Golden Handcuffs (in production). Museum halls in `data/halls.json`.

`/about` section order is owner-set (14 Sep): Who we are, Who's building this, Who we serve, Why now,
Partners, work-with-us. Founders sit directly after the institution and before the audience and the
market case. `<Break>` bands alternate 1-2-3-1-2 between them; keep that alternation when reordering.

## Pages (build count: 13 routes + 404; expect 16 in "Generating static pages")
`/` `/film` `/film/[slug]` (chemical-cartels, golden-handcuffs; from `data/films.json`) `/museum` `/museum/enter` (iframes `public/museum-viewer.html`, the Three.js build) `/about` `/intelligence` `/books` `/newsroom` `/contact` `/sources` `/specimen`.
All ported from the reference mockups (`reference/`). Surface decisions applied: black base and neutral panels per brief; the cream Film band on Home kept as the owner's chosen accent; the watermarked network globe replaced by `hero-globe` on Home's Intelligence section (licensed image still required). Signup forms are honest placeholders (`Signup` shows a notice, never reloads) until `site.forms.signup` is set. Newsroom entries are flagged placeholders in `data/newsroom.json`.

## Founder headshots (shipped 14 Sep)
`public/images/team-david-luna.{jpg,webp}` (1200px) and `team-sam-rad.{jpg,webp}` (1020px, the
source's native size, not upscaled). Both are **untouched originals**, square-cropped: David on the
face, Sam from the top of the frame so her head sits where it does in the source. `data/team.json`
carries a `photo` field; `/about` renders `<Pic>` when it is present and falls back to the monogram
when it is not, so a third founder without a photo still works.

Treatment: `.fcard.haspic` runs the photo as a 1:1 square at full card width, name and role beneath.
Owner picked square over the 300px band, and the originals over composited versions. **A previous
round cut both founders out and placed them on a generated backdrop to unify the lighting; the owner
reverted it.** Do not re-composite, re-grade, or swap backgrounds without asking: the photos are the
only images on the site that could be constructed, and on a site arguing evidentiary rigor that
matters. Cutouts are not kept in the repo.

Known and accepted: the two photos were shot in different conditions, so a bright white exterior sits
beside a pale blue studio, and David's head reads larger because his is a tighter shot. The real fix
is a matched pair from one shoot, not post-processing.

## Scripts
`python3 scripts/mock.py <out.html>` builds design options for an owner pick: **one page carrying
every option, HTML only, never one file per option and never a set of JPGs. Always set `RECOMMEND`
to the option you would choose and put the reasoning in that option's note** (owner instruction,
14 Sep); it renders as a chip on the page, and the recommendation belongs beside the work, not only
in chat. Real stylesheet, fonts
as woff2, images base64, so it opens anywhere. Edit `OPTIONS` per round; it is throwaway tooling and
the chosen treatment lands in `site.css`.

**`preview.py` fixes (14 Sep):** the CSS glob was `out/_next/static/css/*.css`, but Next 16 emits to
`static/chunks/`, so every preview since the 15 to 16 upgrade rendered unstyled. It now globs
recursively under `out/_next` and exits loudly if it finds nothing. `--lite` no longer drops the
fonts; it re-encodes them to woff2 (1.1MB of TTF to about 320KB) and strips the `format("truetype")`
hints, which browsers trust over the actual bytes and which would otherwise fail the faces silently.
Verify a preview by screenshotting the preview file itself, not the built page.

`npm run build` → `node scripts/check-assets.mjs` (HTML src/srcSet/href, CSS url(), video) → `python3 scripts/preview.py <route> <out.html>` / `mobile.py` → `python3 scripts/screenshot.py <route> <png> --full` (scrolls the page first so `loading="lazy"` images and reveals fire; without that, full-page captures show blank features). Run checker before every push.

## Roadmap
See **`ROADMAP.md`** for the live checklist. Summary:
All routes exist; the owner now edits from the built site. Next: 1. Owner review pass per page (previews in `previews/`). 2. Wire signup + donation provider. 3. Verify and link `/sources` URLs; owner cut. 4. Licensed network-globe. 5. Founder headshots; real newsroom posts; brochure PDF and Substack links. 6. `/press`. 7. Analytics, `robots.js` (allow GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended), Squarespace redirect map, DNS.


## Episode 2 — integration record (trailer script v6, 4 Sep 2026)

Source document: `ILLICIT_GOLD_Trailer_v6.pdf`. **Working draft, not for distribution. It is not site copy.** What was integrated, and what was deliberately not:

**Integrated (public-safe) into `data/films.json` and `data/sources.json`:**
- Full title, runtime (30 min), three locations (Meta CO, Para BR, Ticino CH), host (Sam Rad), institutional voice (David M. Luna), trailer target (3:00).
- A synopsis written in the present tense as *what the episode covers*, not as completed events. The trailer describes **planned shoots written as if completed**; the site must never imply they happened.
- Six statistics, each with a published source and `status: cited`, for use with `<Stat>`.
- Eleven published, citable source documents as the `/sources` seed. **URLs are blank and flagged `verify_url`.** Per the playbook, this is a draft for the owner to cut and link; do not publish as curation without review.

**Held out, per the trailer's own editorial notes and BRIEF.md section 3. None of this is in `data/`:**
- HUNTER BILL (placeholder in the outline; non-public).
- Proporo Technologies (named in narration; on-record status TBD; proprietary source). The entire landmine-clearance storyline is omitted from public copy because its central claim needs a second source.
- Mesetas mine-emplacement claims (single-sourced).
- Madre de Dios trafficking material (held for the episode, not promotion).
- Sudan/Bashir and the gold-concentrate figure (held for the episode).
- StoneX, Asahi USA, Dillon Gage (not in this cut; if they appear anywhere, their responses run in the same sequence).
- The $400/month vacuna figure (sourced to Antioquia, not Meta; location mismatch unresolved).
- "4500 BC bead" and "half the size of the U.S." (marked verify-before-broadcast).

**Title.** Deck says *Golden Handcuffs* and the owner ruled the deck canonical, so that stays the display title. The trailer script titles the same film *Illicit Gold: The Rush to Cash in on the Criminal Shadows of El Dorado*; stored as `fullTitle`. If the film is released under the full title, flip `title` and the deck rule in one commit.

**Trailer script text** (~540 words, first person) stays out of the site entirely. It contains uncleared names inline and is marked not for distribution.

## Open items
Licensed network-globe image · `/sources` links to verify and owner cut · signup/donation provider ·
GitHub/Vercel access · `/sources` review · Squarespace redirect map · the "coming 2026" museum donor
copy conflicts with Phase I 2027 (reconcile).

Found in the 14 Sep review pass, not yet fixed:
- **Em dashes ship in every `<title>`, `og:title` and `twitter:title`** via the template in
  `app/layout.js` (`'%s — Illicit Shadows'`). Body copy is clean; metadata is not.
- **British spellings in copy:** "cataloguing" (Home, pillar 02), "catalogued" (`/intelligence`,
  Helix layer 01). `museum-viewer.html` also has "programme" and "centre".
- **`museum-viewer.html` loads Three.js from cdnjs and Anton plus Plex from Google Fonts at runtime.**
  The only live CDN dependency on the site and the only place Google Fonts is still used. Vendor
  `three.min.js` into `public/`.
- **Hall 05 on `/museum`:** white title over a near-white image, scrim too weak to read.
- **Dead vertical space:** ~200px of black between the trailer and the YouTube box on `/film`, and
  above the donor blocks on `/` and `/museum`.
- **`/books`:** the two founder-title thumbnails (Radical Next, Bitcoin Pizza) are empty black boxes.
- **Episodes 03 and 04** (Blood Batteries, Iron Triangle) are listed with no placeholder marker;
  `CONTENT-INVENTORY.md` flags them as owner-to-confirm. Same for the Blood Batteries newsroom entry.
