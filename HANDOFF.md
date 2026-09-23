# HANDOFF — illicitshadows.com

> **Cutover: Tuesday 22 September 2026.** DNS moves to illicitshadows.com alongside sam-rad.com.
> The runbook for the day is at the top of ROADMAP.md. Redirects only run on Vercel, so they cannot
> be tested until the domain is live.

Read this first. Update it in the same commit as any change it describes. A handoff updated "later" lies.

## Rules that keep getting broken (owner-adjudicated 14 Sep 2026)

- **"Everything is connected" stays prominent throughout the site.** It is the signature, not a
  footnote. When adding or reworking a page, give it a visible place in the body, not only the
  footer line. As of 23 Sep it is in the body only on /museum, the shop and the newsroom posts.
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

`images/project-helix` is the Project Helix network art (replaced `helix-ai` on 23 Sep), used on home and `/intelligence`. It replaced
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

`/about` opens with **Who we are** as one display-scale statement with the three disciplines picked
out in white, the working detail beside it, and a one-line handoff, "That convergence has a name",
straight into the MISTIC panels below. **MISTIC is expanded once**, in `Pillars`; the statement no
longer repeats the expansion, which is what made the two blocks read as duplicates.

`components/CtaBand.jsx` is the full-width call to action between sections. **`tone="signal"`, the
solid yellow band, is reserved for one message, "Everything is connected", at most once per page**:
it is the loudest thing on the site and competes with every button. `tone="panel"` and
`tone="alert"` carry the colour in a top rule instead and can repeat. Do not put a band directly
above the section it duplicates; the donor band sits earlier in the page for that reason.

`components/ContactForm.jsx` posts to `site.forms.contact`. With no endpoint set it **does not
pretend to send**: it says nothing was sent or stored and offers the mailto, matching `Signup`. The
route the person picks is a real field so enquiries arrive pre-sorted. `company` is a honeypot,
positioned off-screen, and `.cform` must stay `position:relative` or the trap resolves against the
page and can land back in view.

`components/Pillars.jsx` is the MISTIC three-pillar section, shared by home and `/about` (14 Sep).
Image-led panels, **one link per panel at the foot**: a card-wide link wrapping the heading, status
and action would be invalid and unusable with a screen reader. The connector line and nodes are
`aria-hidden`, since the panels say the same thing in words. Hover zoom is 1.04 and switched off
under `prefers-reduced-motion`. Below 820px the panels stack, the connector is hidden, and every
description and action stays visible without hover.

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
a photograph that already sits on black just doubles it. **Do not key out their backdrop**: it was
tried on 14 Sep and reverted, because the flood fill leaves artifacts in the book's own dark areas. The **flat covers** (`image` in
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

**Cascade maps**, `images/cascade/`, five SVGs driven by `/intelligence` structure (14 Sep): hero, the Institute, **Project Helix as two columns** (the
Project Helix visual left, the four layers right), a break band, then the cascade in its own section.
The divider matters: without it the worked example read as part of the Helix description.

`components/CascadeMaps.jsx`: a stepper, so
the reader always sees which stage they are on. **The site chrome deliberately adds almost nothing**:
each map already carries the HELIX.AI header, the ILLUSTRATIVE MODEL chip, its own stage strip and
its own explanatory panel. An earlier version repeated all of it in HTML and said everything twice.

All three packages are generated concept art, not documentary evidence. Keep them captioned that way.

## Editorial system (15 Sep): read this before touching layout

The site was recomposed against the *Illicit Shadows Editorial* package. Everything below in this
file about the earlier layout (card grids, `.head` section bars, `band-raised`, evidence-wall
breaks, the multi-column footer) describes components that are now either unused or retained only
where a page still needs them. The system:

- **The lightbox renders into `document.body` via a portal.** Editorial sections isolate their
  stacking context, so an overlay left in place paints beneath every later section while still
  locking scroll: the page looks frozen with the video showing somewhere down the page. That is
  exactly what shipped on `/film/chemical-cartels`. Keep the portal.
- **The investigation hero is not playable.** The key art is a poster; the films are watched from
  the rows below, one at a time, and the meta line links down to them. A playlist player in the
  hero opened something people then had to dismiss.
- **The mobile nav panel is a grid, not a flex row.** `.filmmenu` is a third child of `.hasmenu`;
  in a flex row it sat *beside* the Film link and pushed Film below its own submenu. Row one holds
  the link and the chevron, the panel spans row two. There was also a second, later `.hasmenu` rule
  in the mobile block re-flattening it; if the submenu ever lands in the wrong place again, look for
  a duplicate selector before rewriting the markup.
- **The MIS eclipse is a black-square photograph, not a cut-out.** `images/mis-eclipse` is the
  supplied original; an earlier attempt to key the corona to transparency mangled it into a spiky
  feathered edge. The only place it appears is `.black-logo` on `/museum`, which is a black panel,
  so no alpha is needed. The hero mark is the **vector** `/logos/mis-eclipse.svg`. Do not alpha-cut
  this artwork again.
- **Type scale (15 Sep):** body 16.5px, small print 12px mono, labels 11.5px, nav 15.5px, deck
  21px. Headings unchanged. Scales A, B and C were mocked; A shipped.
- **Never set `scroll-behavior:smooth` on `html`.** It animates *every* programmatic scroll,
  including the one the App Router performs on navigation, so each page appeared to glide down
  instead of loading at the top. The `html:focus-within` variant is worse than useless here:
  clicking a nav link focuses it, which re-enables smooth for that same router scroll, and it also
  left pages resting 74px down at `main`'s offset instead of 0. Scrolling is `auto` everywhere.
- **Same-surface neighbours get a hairline, nothing else does.** `.s-ink + .s-ink` and its three
  siblings carry a 1px top rule at content width. Two sections on the same surface otherwise run
  together with no edge; a *change* of surface is already its own divider, so those boundaries stay
  clean. If a new section lands next to one of its own colour, the rule applies itself.
- **Heroes are responsive.** Each hero image has `-640`, `-1024` and `-1600` WebP and JPEG variants
  on disk; `Pic` takes `widths` and emits a srcset, and `Hero` preloads the right one. A phone was
  downloading the full 1920px file, which is why heroes felt slow. **If a new image is used as a
  hero, generate its variants**, or the srcset candidates 404 silently.
  `check-assets.mjs` now parses `srcset`, so that failure is caught at build time.
- **The tiers are the call to action.** When `site.support` has any live Stripe URL the band drops
  its button: a button beside the amounts is a second, weaker ask for the same thing. The bare CTA
  band (`.cta-band` with a button and no tiers) is what renders when no link is configured, or where
  the ask should be quieter. The museum donor band follows the same rule.
- **One donation ask, rendered by the layout.** `components/SupportBand.jsx` sits above the footer
  on every page. Do not add a second donor section to a page: the museum's own was removed when this
  landed, and the CTA bands on `/intelligence`, `/about` and `/contact` were moved to slate so that
  **yellow means the support band and nothing else**. Verified: exactly one `.s-yellow` per route.
- **museum-viewer.html owns its input, and /museum/enter must never scroll.** The viewer once sat
  in a normal page with content above and below; in first-person mode it did not capture the wheel
  or the arrow and space keys, so they scrolled the site and the camera drifted with it. Now the
  viewer cancels the default action for wheel, scroll keys and touch drags in every mode (the
  `scroll-guard` blocks near `</head>` and `</body>`), and `ImmersiveLock` fixes the frame to the
  viewport and locks page scrolling while it is mounted. Do not put content above or below the
  viewer on that route. Three.js loads from a CDN, so the scene cannot be checked in a sandbox
  that blocks it; verify on the live site.
- **`.s p` outranks a bare class.** Any chip, label or note written as a `<p class="x">` inside a
  section needs `.s .x` to win: `.status-chip`, `.support-fine` and `.pview-label` each shipped at
  body size before this was noticed, because the rule looked right and silently lost. When a new
  class seems to have no effect, check specificity before rewriting it.
- **Small labels use `--label`, not `--ac`.** The cream accent `#FF3030` is a *display* colour: at
  11px it measures 3.2:1 on cream, under the bar. Every surface now sets `--label` (signal yellow on
  dark, `#C81414` on cream) and kickers, numerals, cites, chips and status lines read it. Links use
  `--link` on the same principle. Headings keep `--ac`, where large-text rules apply.
  The full sweep across seventeen routes is clean; run it again after adding any small label.
- **The surface layer must not use `z-index:-1`.** A negative layer vanishes behind any ancestor
  that creates a stacking context, which is how `/film/chemical-cartels` shipped with black text on
  a black page after deploy while rendering correctly in local preview. `.s` is `isolation:isolate`,
  `.s::before` sits at `z-index:0`, and `.s > *` is lifted to `1`. Do not "simplify" this back.
- **Legacy class-name collisions.** Several editorial names (`.credits`, `.direct`, `.reading`)
  also existed in the pre-editorial stylesheet with a dark panel background, which painted over the
  cream surfaces. Those specific rules are removed. When adding a class, grep the stylesheet for
  the name first; the old layout's rules are still in the file until the dead-CSS pass runs.
- **Surfaces are semantic classes on sections**, never positional: `section.wrap.s.s-ink`,
  `.s-paper`, `.s-slate`, `.s-yellow`, plus `.compact`. Each sets `--sbg`, `--fg`, `--ac`, `--rule`.
  Body text is **white on dark and black on cream and yellow**; there is no grey body copy in the
  editorial sections. Emphasis is `<em>` inside a heading: yellow on dark, **`#FF3030` red on cream**
  (not burgundy). Do not reintroduce `--text-2`/`--muted` inside `.s` sections.
- **One button, one link.** `.ed-btn` (yellow on dark, `#111716` on cream and yellow) and
  `.ed-link` (text with an accent underline and an arrow). Every arrow is an inline SVG from
  `components/Icons.jsx` (`Arrow.upRight`, `.down`, `.right`, `.left`, `.close`): no Unicode arrows,
  ever. Brand marks live in `Brand`.
- **Film submenu** (15 Sep, variant A): a vertical panel under Film, **opened by click, never
  hover**. A hover menu closes the instant the pointer crosses the gap between trigger and panel and
  no amount of padding fixes it reliably. Second click, Escape, or an outside click closes it;
  Escape returns focus to the trigger; ArrowUp/ArrowDown move through the items.
  **The outside-click handler tests `filmRef.contains(e.target)` rather than relying on event
  propagation.** If it is ever rewritten to close on any document click, clicks on links inside the
  panel will close the menu before the navigation runs, and the menu will look broken. That is the
  usual cause of a dropdown that will not stay open.
  Order is Illicit Gold, then Chemical Cartels, then the six development subjects in a quieter
  weight; the in-production work leads because it is the current one. Status dots: alert red in
  production, signal yellow released. No numbering. `Film` itself stays a link to the index. Below
  820px the panel is an indented sub-list inside the hamburger.
- **Shell.** Nav is centred with a quiet "Get in touch" arrow link on the right; the mobile menu is
  the same list plus that link. Footer leads with the **wordmark large**; *Media. Knowledge. Intelligence.* sits under it as a
  small uppercase subtitle, then *Everything is connected.* in mono, three quiet links, and a
  compact attribution row with social icons.
  Partner detail moved to `/about#partners`.
- **Home** keeps the exact eyebrow, H1 and WATCH · EXPLORE · MODEL order from the brief. The
  museum feature uses `museum-convergence`, not the rotunda, because the rotunda is already the
  EXPLORE pillar image on the same page. The Venn map is off home and on `/intelligence` and
  `/museum`.
- **Retained on purpose** (owner decisions from 14 Sep that the package did not know about):
  the 320px vertical short-film list with the Play control outside the artwork, the in-page
  lightbox on every short, the per-short pages with narration and a next-film cover card, the
  clickable timeline inside the cascade maps, the year ranges on both investigations, the
  `books-hero` on `/books`, and the live 3D viewer on `/museum/enter`.
- `/intelligence` opens on the institute, then the project: **MISTIC is the fusion center, Project Helix
  is one of its projects.** Keep that order; the page previously led with Helix and never said what
  MISTIC was.
- **Newsroom is two sources in one list.** `data/newsroom.json` holds Illicit Shadows' own posts
  (hand-written entries plus anything fetched from the Squarespace RSS, keyed by URL and marked
  `fetched`), `data/newsroom-icaie.json` holds ICAIE's, refreshed from its WordPress feed by
  `scripts/fetch-news.mjs`. ICAIE items carry an ICAIE stamp and link out to icaie.com in a new tab.
  `.github/workflows/news.yml` runs the fetcher Monday and Thursday and commits only when the JSON
  changes, which triggers the Vercel deploy. The fetcher could not be run against the live
  endpoints from the build sandbox; its two parsers are tested against representative fragments,
  and the first scheduled run should be checked in the Actions log.
  `illicitshadows.com` disallows automated fetching by robots.txt, which is why only one of its
  posts is seeded; the Action fetching the owner's own feed is a different matter from a crawler.
- **`/contact` carries a live Google Maps embed** (owner pick, 15 Sep). It is the **one exception**
  to the no-third-party-on-load rule: the film players stay facades and load nothing from YouTube
  until clicked. The embed uses the keyless `output=embed` form, so there is no API key or billing
  account involved. If a cookie or consent notice is ever added, this iframe is the thing it is
  about.
- `/about` states the platform as nouns (MEDIA · KNOWLEDGE · INTELLIGENCE) and the pillars below as
  verbs (WATCH · EXPLORE · MODEL); one describes what it is, the other what you do. The four sector
  lists under "Who we work with" are the original page's, restored 15 Sep.
- `/museum` hero carries the vector eclipse (`/logos/mis-eclipse.svg`) as a transparent mark, top
  right, via a plain `<img>`: `Pic` emits a WebP source for every base and an SVG has none.
- `/books` hero uses `variant="soft"`, a lighter veil, because the art is dark on its left by
  nature and the standard gradient made it read as a rendering fault.
- Two field stills from the July 2024 DC shoot: `hero-contact` (the Reflecting Pool walk, **mirrored**
  so the founders sit right of the copy; the Monument is symmetric so the flip is invisible) and
  `founders-white-house` above the founder portraits on `/about`. The White House still was tried
  as the About hero and rejected: Sam stands left of centre and any left-aligned headline lands on
  her. It works where nothing sits on it.
- **Cover title colour is a live decision.** `public/images/variants/red/` and `.../yellow/` hold
  both sets of the twelve Chemical Cartels covers; the live files are whichever set was last copied
  over `public/images/`. Currently **red**. Switching means copying a variant folder and
  regenerating every `.webp` sibling; the JPEG alone will not change what the browser serves.
- **Film covers** were reissued 15 Sep with unified branding: "ICAIE & RADOC PRESENT" top left, a
  stacked ILLICIT/SHADOWS wordmark bottom right, **no circular roundel** and **no burned-in
  IN DEVELOPMENT**. All 20 covers plus `helix-ai` were replaced at 1600x900.
  Two rules that follow from this: when replacing any image, **regenerate the `.webp` sibling** or
  the browser keeps serving the stale one; and because the status left the artwork, the upcoming
  grid on `/film` carries a `.status-chip` reading "In development". Removing the label from the
  art did not release anything.
- The Helix graphic is a **conceptual system view**. Its caption says so and offers a full-size
  link; never describe its connections as measured data or a validated forecast.
- `/intelligence` carries a "What it is" section drawn from the February Project Helix brief.
  **Three things from that brief are deliberately not on the site**: the word "influence" (the brief
  says Helix is designed to model, anticipate and influence convergence; published, that reads as
  interference rather than analysis), the explicit data-source list including telecom metadata, and
  any claim about reward or governance mechanisms, which the brief marks TBD. The governance
  paragraph states the brief's own principle instead. Keep it that way unless the owner decides
  otherwise.
- **Resolved 15 Sep**: the Rotterdam example uses **London, Miami and Dubai** for the property
  stage. The February brief says Vancouver; the site's version is the current one. If the brief is
  revised, change it there, not here.
- `HallsEd` is the phase toggle over `halls.json`; `NewsIndex` is the newsroom filter. Both are
  small client components; everything else is server-rendered.

## Handing off assets

Run `python3 scripts/pack-assets.py` at the end of a session. It compares `public/` against a
manifest kept outside the repo and writes **one zip per changed directory**, naming the files it
contains; if nothing changed it writes nothing and says so, and the source zip is the only
deliverable. The full-`public/` zip is no longer produced by default: it is ~34MB, and almost all of
it is unchanged every time. `--baseline` records the current state without zipping, for when assets
are changed outside a handoff.

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

## CTA bands and the contact form (14 Sep)
`components/CtaBand.jsx` is the full-bleed call-to-action between sections. **`tone="signal"` is a
flood of yellow and appears once per page**, on the line that carries the argument; everything else
uses the panel treatment, where the colour lives in the top rule and the link so it can repeat.
`accent="alert"` switches that rule to red for a different kind of ask. Home carries exactly two:
the connect band after the film section, the founding-donor band before the footer.

`components/ContactForm.jsx` posts to `site.forms.contact`. **With no endpoint it does not pretend
to send**: it blocks submission and points at the mailto, the same honesty rule as `Signup`. The
chosen route is a real field so enquiries arrive pre-sorted, and `company` is a honeypot positioned
off-screen. Wire the endpoint and nothing else needs to change.

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
