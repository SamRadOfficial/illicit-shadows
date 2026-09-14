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

## Positioning: film, not series (14 Sep)
Public pages do not use `episode`, `season`, `docuseries`, or any ordinal. The reason is eligibility,
not taste: Academy documentary rules exclude a multi-part or limited series and episodes extracted
from a larger series, and festival forms ask directly. Programmers read the site.

- **Cardinal counters are fine** (`Eleven short films`, segments `01` to `10`).
- **`years` in `films.json` dates each work**: Chemical Cartels 2025-2026, Illicit Gold 2026-2027.
  Rendered as "Investigation · 2025-2026" above each title (`.work-id`). A numbered version was
  tried on 14 Sep and dropped the same day: a date distinguishes two works without an ordinal, and
  ordinals are the category festival forms ask about. **Do not reintroduce a number here.**
- `films.json` has no `season` or `number`. Records carry `oldSlug` purely to document the 301s in
  `vercel.json`: `/film/golden-handcuffs` is a permanent redirect to `/film/illicit-gold`.
- Titles: **Illicit Gold** (was Golden Handcuffs). **Chemical Cartels keeps its name**: it is
  released, its title card and thumbnails carry that title, and it is not chasing a festival run.
  A Fentanyl Cartels rename was tried on 14 Sep and reverted the same day. Do not re-apply it.
- **No runtime or format on anything unreleased.** A stated runtime reads as a TV slot. The gold
  record's `runtime` was removed for this reason; do not restore it.
- Pages select films by `status`, never by slug or array position, so a retitle cannot break a page.
- `data/tags.json` is the **controlled convergence vocabulary**, shared by films and the slate and
  intended for museum halls and sources. The `<Tags>` component renders only keys present there and
  silently drops unknown ones, so a term cannot appear in two spellings. Three to five per item.
- `data/slate.json` is research, not announced production. `belt-and-road` carries `title: CCP Inc`
  with `altTitle: Port Authority` held in reserve; its slug is deliberately the subject, not the
  title, because that title is the most likely of the six to change.
- **The one surviving occurrence is `public/museum-viewer.html`**, which contains
  "SEASON 2 · GOLDEN HANDCUFFS · JANUARY 2027" and "docuseries" inside the Three.js canvas text.
  Left alone because the brief says not to touch that build. It is public markup and it names a
  release date, so it needs a copy pass of its own.

The social handle lives once, in `site.json` as `social.handle`, because it is printed in film
credits and may change. Never hardcode it in a page. It is `@illicit_shadows` (YouTube and X, 14 Sep);
Instagram is still `illicitshadowsdoc`.

**Every stamp over key art sits bottom left**: `.work-status` on film cards, and `.badge` **always
paired with `.btm`** on `.film-feature` and `.ep-player` (home, up-next, and the detail hero). Short
numbers sit **top right** (`.sgcard-n`). Top left is the presenting credit and bottom right is the
roundel, so those corners are never free. A `.badge` without `.btm` lands on "ICAIE & RADOC PRESENT";
that shipped on the home page and up-next block before being caught 14 Sep. Both were moved after they landed on type baked
into the covers, the short number first showing the collision at 390px. Check new covers at 390px.

`/film/[slug]` lists the shorts **vertically** (`.vlist`, owner pick 14 Sep): a 208px still per row
with number, title, subtitle and runtime on one line, so eleven titles can be read in one pass. The
grid was tried and rejected as a wall at that count. **The three-up previews on home and `/film`
keep `.minigrid`**; do not unify them, the two counts want different shapes.

Clicking a still opens the **lightbox** (`VideoEmbed modal`), not an inline swap: a 2:09 film in a
250px card is unwatchable and YouTube's controls stop working below roughly 400px. Escape closes,
backdrop closes, body scroll locks, focus moves in and back out.

`/film/[slug]` renders a short as a **row when it has an `image` and a text row when it does not**,
so a missing cover never becomes a placeholder tile. Chemical Cartels has eleven covers, so it is
all cards today; the fallback stays for future films.

`/film` shows **three covers per film** (`SEGMENTS_ON_INDEX`, `.minigrid`) and links through to the
full set. Owner picked this over a scrolling strip of all eleven, to keep the index calm. If a strip
is ever revisited: a grid item defaults to `min-width:auto`, so the scroller stretches its card
instead of scrolling unless `min-width:0` is set, and that is invisible in a screenshot. Compare
`scrollWidth` against `clientWidth` to check.

## Home film section (14 Sep)
Illicit Gold leads with the cover, a description, and what is being filmed; Chemical Cartels sits
under it as three short covers with a link to all eleven; the trailer closes the section. The section sits on
`.band-raised`, the grey panel band, and keeps the site palette: white display type, signal yellow
and alert red. It was briefly on `.band-light`, the cream band, which inverts every default color
and forced a set of one-off overrides. Owner reverted it. **Do not put this section on the cream
band**; the covers and the yellow-and-red palette fight it.

## Convergence map and Helix art (14 Sep)
`components/Convergence.jsx` renders `public/images/convergence-map.svg` on home, `/intelligence`
and `/museum`, always captioned **#EverythingIsConnected**, credited to **ICAIE and Illicit Shadows,
LLC**. Five domains, not four. On `/museum` it sits at the **bottom**: the museum leads with itself. Not on `/books`: owner removed it, the
page is fiction and the map read as filler there. It supersedes the raster
`convergence-wheel`. It is an SVG with real text and no embedded rasters, 3000x3200, about 35KB gzipped, served through
`<img>`: inlining it on three pages would repeat 220KB three times, and it carries its own `<title>`
and `<desc>` for screen readers. The graphic is **dark-themed**, so `.convfig` frames it in black
with a hairline; do not put it on a light mat.

It is nearly square and dense. Below 820px it would render about 350px wide with three-pixel body
text, so `.convscroll` holds it at 760px and **pans** rather than shrinking, and the caption carries
an "Open full size" link to the SVG itself. If the graphic is ever replaced, re-check both: the
dimensions in `Convergence.jsx` and whether the new one is legible at 390px.

`images/helix-ai` is the Helix.AI network art, used on home and `/intelligence`. It replaced
`hero-globe` in those two slots; `hero-globe` still backs the heroes.

`.pb`, the play button, has **no intrinsic size**. Every context that uses it must set width, height
and font-size, or it collapses to the glyph and the border-radius renders as a wedge, or vanishes.
This has now bitten three times: `.ep-player`, `.sgcard`/`.minicard`, and `.trailer-home`.

**MIS eclipse mark, three files supplied, two shipped** (14 Sep):
- `images/mis-eclipse.png` + `.webp` (photographic, 900px) for **display sizes**. The corona is the
  whole idea and it only survives above roughly 120px.
  **Both carry alpha.** The supplied art is a glow on an opaque black plate, which showed as a black
  square over photography. The eclipse disk is kept fully opaque (so its dark centre survives on any
  background) and only the corona outside the ring fades with its own brightness. The corona is also
  **unpremultiplied**: it was painted over black, so dividing by alpha recovers the colour, without
  which it reads as a grey smudge on light backgrounds. The ring radius is found from a radial
  brightness profile, not a scan through the centre, which hits the "I" of MIS and gives 99px
  instead of 440px. If the art is ever re-exported, redo this; do not ship the plated version.
- `logos/mis-eclipse.svg` (vector, 6KB) for **small sizes** and as `app/icon.svg`, the site favicon,
  which did not exist before. Its black background rect is removed, so the favicon is not a square
  on light browser chrome. The corona simplifies to a clean ring, which reads at 32px where the
  photographic version turns to mud.
- The supplied **photographic SVG is not shipped**: it is the same PNG wrapped in an SVG at 1.4MB,
  strictly worse than the PNG at every size.

The ICAIE mark is `logos/icaie-square`, trimmed and recentered from `icaie-stacked`, whose source had
more whitespace below the wordmark than above. `.pmark.icaie` needs `flex:0 0 auto`, or as a flex
item it shrinks in width while keeping its height and stops being square.

`components/WorkCard.jsx` is **the** film card, used by `/film` and home. Home previously had a
hand-rolled copy that fell behind within a day; do not fork it again. It renders the identifier line,
the tags, and the short-film strip spanning both columns.

## Museum concept renders (14 Sep)
The museum entrance (`#prototype`) is a single clickable render: copy and an **Enter** button in the
dark left third, an **Interactive prototype** stamp lower right, linking to `/museum/enter`. Below
820px it stacks, and both the scrim and the stamp switch off there, or they dim the panel and land
on the button.

**Hall thumbnails** (14 Sep) are the supplied set in `public/images/halls/`, one per hall plus the
shop and the rotunda, all 1600x900. They are mapped to the existing slugs in `IMG` in
`app/museum/page.js` (`narcotics`, `theater`, `fakes`, `environmental`, `history`, `trafficking`,
`convergence`, `corruption`, `antiquities`, `tobacco`, `cybercrime`, `rotunda`, `shop`), so a new
set can be dropped in by filename with no markup or data change. Keep that mapping.
Per the supplier's note, the history image shows broad eras, not a dated timeline.

Five concepts by Chaat, one visual identity: black glass, yellow light paths, floating artifacts.
Placed as `museum-rotunda` (museum hero and the home museum block), `halls/narcotics` (Hall 01),
`halls/theater` (Hall 02, and behind the field-investigations block as `museum-theater`),
`halls/environmental` (Hall 04), `halls/convergence` (Hall 07, and above the map as
`museum-convergence`), and `halls/rotunda` (the CENTER card).

**Always caption them as concepts.** The museum does not exist; an uncaptioned render of a building
reads as a photograph of one, on a site whose whole argument is that claims carry their status.
`.concept` does this. The hall cards inherit the same treatment through the Phase I and II headings,
which already say 2027 and 2028.

**Hero crops are CSS variables, never inline styles.** `Hero` takes `pos` and `mobilePos` and writes
`--hero-pos` and `--hero-pos-mobile`; the stylesheet reads them, with the mobile value applying below
820px. This matters: `Pic` used to set `object-position` inline, and an inline style beats the
stylesheet, so a media query could not change the crop at all. Do not put the crop back on the image.

Page heroes (14 Sep): `hero-globe` on home, `hero-about`, `hero-contact`, `hero-intelligence`,
`hero-newsroom`, `books-trilogy-hero` on `/books`. All share the house composition, dark left and
subject right, and each carries its own `mobilePos`. `/newsroom` gained a hero and lost the divider
that was standing in for one, so the page does not open with two pieces of the same photography.

The crop is a property of the artwork, not of heroes in general: `hero-globe` keeps its subject hard
right with a dark field left, so it pulls to `22% center` on mobile, while `books-trilogy-hero` has
the books centre-right and uses `68% center`. Any new hero needs its own `mobilePos`, checked at
390px.

`/books` uses the **3D mockups** (`book-*-3d`) and the trilogy render as its hero. The mockups carry
their own lighting, shadow and black field, so `.bookmock` adds no border and no cast shadow: framing
a photograph that already sits on black just doubles it. The **flat covers** (`image` in
`books.json`) stay on home, `/museum` and `/books/preview`, where the cover reads better than the
object.

**Book covers** are real 2:3 covers as of 14 Sep, replacing the square 3D render: `book-umbra-circle`,
`book-dragon-roars-forward`, `book-condor-directive`, wired through `data/books.json` and used on
`/books`, `/books/preview`, home and `/museum`. `.book3d` and `.bookcover` share one rule now: a
border and a cast shadow, since the old `drop-shadow` filter was tuned to the transparent render's
alpha and does nothing useful on a flat rectangle.

Short pages end with a **next-film cover card** rather than a text link. The covers appear nowhere
else, and the next short is the strongest thing to offer someone who just watched one. Previous
stays a text link so the two do not compete; on the first short it becomes "Back, all eleven".

## Supplied asset packages (14 Sep)
**Section dividers**, `images/dividers/`, eleven 3:1 panoramas, one per page, placed per the
supplied `Placement-Guide.csv` with its alt text. They replace the first generic `break-evidence`
band on each page; the remaining generic bands stay, since eleven dividers cannot cover every break.

**Upcoming covers**, `images/upcoming/`, six landscape concepts wired through `slate.json`. The
covers already carry the title and an IN DEVELOPMENT stamp, so **the card prints neither**: only the
subject line and the tags. A `slate-note` under the grid says these are subjects under research, not
productions, because six covers make a research agenda look like a commissioned slate.

**Cascade maps**, `images/cascade/`, five SVGs driven by `components/CascadeMaps.jsx`: a stepper, so
the reader always sees which stage they are on. **The site chrome deliberately adds almost nothing**:
each map already carries the HELIX.AI header, the ILLUSTRATIVE MODEL chip, its own stage strip and
its own explanatory panel. An earlier version repeated all of it in HTML and said everything twice.

All three packages are generated concept art, not documentary evidence. Keep them captioned that way.

## Video
Films play through a **facade YouTube embed** (`components/VideoEmbed.jsx`): the cover art is the
poster and the `youtube-nocookie` iframe is only injected on click. Verified: **zero** requests to
YouTube on page load, one after a click. That matters on a page carrying eleven videos.

Each film and each short has a `youtubeId` and a `published` date in `films.json`. The eleven shorts
have ids as of 14 Sep; `published` is still null. A **film** has no single id: Chemical Cartels
carries `playlist`, and the hero player embeds `videoseries` so the shorts play in order. **Null is a switch, not a gap**: with no id the poster renders as a link to the channel and
no `VideoObject` markup is emitted. Never add an id for a film that must not be publicly viewable.
Public internet availability before a qualifying theatrical release is what costs festival and awards
eligibility, so **Illicit Gold must have no id and no embed** until that question is settled. Screeners
go through password-protected Vimeo or signed Mux URLs, off this site.

`components/Cascade.jsx` is the Helix worked example, shared by home (`compact`) and `/intelligence`,
so the two cannot drift. It reads as a chain rather than a list: a trigger, then numbered steps each
carrying a lag and **why that step follows from the one above**. Always keeps the illustrative chip.
It names real cities, so without that label a demonstration reads as an allegation.

`components/Schema.jsx` emits `VideoObject` (and `Movie` for a film), with `duration` derived from
the runtime string. Type is never `TVEpisode` or `TVSeries`.

`preview.py` writes a **timestamped filename** (`home-195121.html`). Previews were previously always
`home.html`, and a viewer holding the previous file under the same name showed stale artwork, which
repeatedly read as "the image did not update" when the build was correct. Do not remove the stamp.

`app/sitemap.js` and `app/robots.js` need `export const dynamic = 'force-static'` or the export build
fails. `/specimen` is disallowed in robots.

**Every short film has its own page**: `/film/<film>/<short>`, built from `segments[].slug` (owner
decision 14 Sep, replacing a narration section stacked below the list). Eleven subjects on eleven
URLs beats eleven on one: each page carries its own title, description, `VideoObject` and narration,
and each is shareable. They are in `sitemap.js`; add any new short there by adding its `slug`.

**Narration** lives in a `transcript` array (paragraphs) per segment in `films.json` and renders on
that short's page. **Rendered at build time, never fetched on click**: the indexable text is most of
the reason to publish it. Labelled "as broadcast" so it reads as the words spoken in the film, not
as a separate written article. Punctuation is normalized to the site style (no em dashes, straight
quotes); wording is untouched.

**Nothing sits on the short-film artwork** (owner pick 14 Sep). The list uses 320px stills with a
labelled **Play** control in its own column and the runtime under it; both the poster and the button
open the same lightbox. `VideoEmbed variant="row"` returns the poster and the control as siblings in
a fragment so the parent grid can place them in separate columns, and `.vrow-body` uses `order:3` to
sit between them. The covers appear nowhere else on the site, which is why they are this large and
this clean: at 320px even the ICAIE and RADOC line at the top of each cover becomes legible.

Below 820px the still goes full width and the control drops beneath it beside the runtime.

On the three-up `.minicard` previews the button overlays **centred** (owner pick): those cards run
about 320px, where a centred control reads as a player without burying the title. It is the small
list thumbnails that failed that test, and the list now carries its control outside the artwork.

All eleven narrations are in (14 Sep). Two editorial rules were applied and should be kept for any
future transcript: the **"Next Dispatch" trailers are dropped**, since that is the retired series
framing and each page already links to the next short; and **punctuation is normalized** to site
style (no em dashes, straight quotes), with wording otherwise verbatim. A check script pattern worth
reusing: after writing transcripts, grep the built text for `Next Dispatch`, `docuseries`, `Season`,
`Episode`, the hold list, and smart punctuation before shipping. Eleven shorts is roughly 12,000 words of indexable text about
precursors, ports, and laundering, and it is the highest-value SEO action left. Add a `transcript`
field per short when the text exists.

The **home hero carries exactly two actions, email first**: the signup field, then a small text link
to the films. The point of the hero is to keep people on the page and capture the address; watching
is one click away everywhere else. It had
three (button, form, YouTube subscribe), which is a tie rather than a hierarchy. `Signup` takes
`subscribe={false}` to drop the YouTube line; it stays on the signup block further down the page.

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
- **Key art is complete and follows one pattern** (14 Sep): 16:9 at 1600x900, presenting credit top
  left in mono, title in the left third, subject photography right, Illicit Shadows roundel bottom
  right. **Color carries the work**: yellow is Illicit Gold, red is Chemical Cartels. Two film covers
  (`film-illicit-gold`, `film-chemical-cartels`) and eleven short covers (`short-<subject>`), named
  by subject rather than number so order can change without renaming.
  Overlays must respect the art: status chips bottom left on film cards, short numbers **top right**.
  Left and bottom-right are occupied by the credit, the title, and the roundel.
- **The trailer carries "An Investigative Docuseries by ICAIE and RADOC" on screen** and is on
  YouTube, so it is the strongest piece of series framing still in circulation. It sits on `/film`
  in an archive-cut slot until it is recut.
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
