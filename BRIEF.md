# illicitshadows.com, standing brief

Originally a greenfield build brief. **The site is built.** This version is corrected against what
actually shipped, so a fresh thread inherits the decisions rather than the guesses.

Ship it with `HANDOFF.md`, which carries the rules that keep getting broken, and `ROADMAP.md`, which
carries the open work. This brief is the direction. Those two are the scar tissue.

*Rewritten 18 September 2026. Supersedes the 12 September build brief.*

---

## 0. Where the project actually is

- **33 built pages, 29 public routes, live on Vercel**, deployed from `main`. Every push is production.
- **DNS cutover to illicitshadows.com: Tuesday 22 September 2026**, alongside sam-rad.com. The
  runbook is at the top of `ROADMAP.md`.
- **Working:** the forms (Formspree), six Stripe donate links, the newsroom with two rebuilt posts
  and a live ICAIE feed, the shop waitlist, OG cards per page, canonicals, 38 redirects covering the
  retired Squarespace URLs.
- **Not built:** `/press`. The Three.js museum exists as `public/museum-viewer.html` and is reached
  from `/museum/enter`, not yet integrated as a React route.
- **Open:** a newsletter tool (117 addresses exported and waiting), sourcing for the narration
  figures, URLs on 20 of the 25 `/sources` entries.

---

## 1. The prompt

Paste this to open a thread.

> You are an elite web designer and developer, and a game studio. You build investigative media
> properties: sites that carry evidence, not brochures, and interactive environments that people
> move through rather than scroll.
>
> We are working on **illicitshadows.com** for Illicit Shadows, LLC. The site is built and about to
> go live. Read `BRIEF.md`, then `HANDOFF.md`, then `ROADMAP.md`.
>
> The loop is non-negotiable:
>
> 1. I ask for a change, or you propose one.
> 2. If there is a real design choice, you build 2 to 4 **mockups as standalone HTML files** using
>    the site's own CSS, and I pick. You do not describe options in prose.
> 3. You make the change in the source.
> 4. You run `npm run check`, which builds and audits every asset reference.
> 5. You generate a **standalone HTML preview** of every page you touched, images inlined, and
>    share it so I can open it.
> 6. You give me the commit message and the push commands.
>
> You look at your own work before you show it to me. Render it, screenshot it, read values back out
> of the DOM. **A source diff proves you typed something, not that it rendered.** If you cannot see
> it, say so rather than guessing.
>
> American English. No em dashes. One risky change at a time.

### What the "game studio" half means

The Museum of Illicit Shadows is a walkable Three.js environment and the site is its front door.
Whoever builds the marketing pages and whoever builds the museum should be the same person, or the
museum ends up feeling bolted on.

---

## 2. What Illicit Shadows is

**Illicit Shadows, LLC**, co-founded by **Sam Rad** (host, producer) and **David M. Luna** (former US
diplomat; the institutional and state-actor voice). Partners: **ICAIE** and **RADOC**.

**Operating thesis:** the global illicit economy is interconnected. Trafficking, laundering and
contraband share corridors, infrastructure and people.

| Pillar | What it is | Route |
|---|---|---|
| **Media** | The investigations. Sam hosts on camera. | `/film` |
| **Knowledge** | **Museum of Illicit Shadows (MIS)** | `/museum` |
| **Intelligence** | **MISTIC** and **Project Helix** | `/intelligence` |

### Naming, settled

These were live decisions during the build. They are not open.

- **Not a docuseries, and not episodes.** They are **investigations**, each made of short films the
  channel calls **dispatches**. "Ep. 01", "Season 2" and "The Shadowverse" are retired everywhere,
  including YouTube.
- **Investigation one: Chemical Cartels**, eleven dispatches, released Dec 2025 to Mar 2026.
- **Investigation two: Illicit Gold**, *The rush to cash in on the criminal shadows of El Dorado*,
  in production 2026-2027. Never "Golden Handcuffs".
- **MISTIC is the institute behind the platform. Its research lab is where Helix.AI is built. Its
  fusion center is where those capabilities are put into practice.** Each noun has one job: the
  institute is the organization, the lab is where the work is built, the fusion center is where it
  is used. Project Helix is the predictive convergence system; Helix.AI is the software that runs it.
  Do not use "institute", "lab" and "fusion center" as synonyms.
- **Helix is in development.** Not a product anyone can log into, no subscription. The paid thing is
  a **briefing**, delivered by people.
- **"Illicit Shadows Theater"**, never "Shadowverse Theater".

---

## 3. Editorial and handling rules

**These are not style preferences. Breaking one can cause real harm.**

- **HUNTER BILL is non-public.** Not in copy, not in alt text, not in a commit message.
- **INTEL-tagged items require a sourcing pass.** Uncleared by default.
- **Named commercial entities require reciprocal treatment.** Response in the same sequence.
- **Madre de Dios material is held back** from promotional contexts.
- **Proporo Technologies is a proprietary source.**
- **StoneX and the rest of the hold list stay off the public source index.**
- **Investor and financial content is data-room only**, including behind a login.
- **Statistics carry a visible source next to the number**, not a footnote. The $6T figure is ICAIE,
  2026. *Owner exception, 17 Sep: the home hero states the figure without attribution.*
- **Evidentiary status is visible in the markup**: cited, alleged, under investigation, uncleared. If
  a component cannot express that distinction, it is the wrong component.
- **The Q3 2026 deck is canonical** for timelines and entity naming.

### Provenance is a design problem

Putting a name, a face or a company logo near an allegation implies the allegation. This is the
single biggest difference from a speaker site, and it is why `/sources` exists as a route rather
than a footer link.

### Rules the owner has since relaxed

Recorded so nobody re-litigates them.

- **#EverythingIsConnected** may appear beyond the footer. It closes newsroom posts and YouTube
  descriptions.
- **Counters in copy** are allowed where they are true and load-bearing: "eleven dispatches" is on
  the site and in every video description. Avoid them in headings, which is where they rot: "Nine
  pieces, one argument" had to be rewritten the day a tenth piece arrived.

---

## 4. Brand

| Token | Value | Use |
|---|---|---|
| Base | `#080909` ink, `#F0EEE8` paper, `#1C272D` slate | Surfaces, as semantic classes |
| Signal | `#FFD400` | The one accent that carries weight |
| Alert | `#FF3030` | Display only. See the warning below. |
| Link on paper | `#C81414` | Body-size links on cream |
| Display | **Anton** | Headlines, uppercase |
| Body | **Archivo** | Reading |
| Metadata | **IBM Plex Mono** | Captions, sources, timestamps, coordinates |

**The alert red is a display colour, not a text colour.** At label size on cream it measures 3.2:1,
below the accessibility bar. Every surface therefore sets `--label` (signal yellow on dark, `#C81414`
on cream) and `--link`, and all small type reads those. Headings keep the brighter accent, where the
large-text rules apply. Getting this wrong is invisible until someone audits it.

**Register:** Vice News investigative, not poetic. Declarative sentences, concrete nouns, no
adjectives doing the work of evidence.

**Tone check:** this is journalism about organized crime, mercury poisoning, trafficking and forced
labor. If a design choice makes the subject matter look cool, it is wrong.

---

## 5. Stack, and the traps inside it

- **Next.js App Router, statically exported.** No server runtime.
- **Vercel, from `main`. Every push is production.**
- **No CMS.** Content in `data/*.json`, one file per type: `films`, `books`, `shop`, `sources`,
  `newsroom`, `team`, `halls`, `partners`, `site`.
- **Plain CSS, one stylesheet, tokens at the top.** No Tailwind, no CSS-in-JS.
- **Three.js** for the museum, reached from `/museum/enter`.
- **WebP with a JPEG fallback, every time.** A `<picture>` source that 404s renders *nothing*.

### The five that cost real time

1. **`.s p` outranks a bare class.** Any chip or label written as `<p class="x">` inside a section
   needs `.s .x` to win. `.status-chip`, `.support-fine` and `.pview-label` all shipped at body size
   because the rule looked right and silently lost. **When a new class seems to have no effect,
   check specificity before rewriting it.**
2. **Surfaces must isolate.** `.s` is `isolation:isolate`, `::before` at `z-index:0`, `.s > *` at
   `z-index:1`. A `z-index:-1` layer disappears behind stacking contexts and you get black on black.
3. **`scroll-behavior: auto` on `html`, always.** Smooth animates the router's own scroll and every
   page load glides. The `:focus-within` variant is also broken.
4. **Images are cache-busted by `ASSET_V` in `Blocks.jsx`.** Replacing a file in place is not
   enough: phones and CDNs keep the old one. Bump the constant.
5. **Responsive variants are declared by a build-time manifest.** `scripts/image-variants.mjs`
   writes `data/image-variants.json` from what is actually on disk, so a `srcset` can never point at
   a width that was not committed. This exists because it happened.

### Scripts, all of them working

| Script | What it does |
|---|---|
| `preview.py` | Standalone HTML of a built page, every asset inlined. Handles `src`, `href`, `srcset` **and** `srcSet`; strips the `?v=` cache-buster before resolving files. |
| `mobile.py` | The same, in a phone frame, with media queries flattened. |
| `check-assets.mjs` | Fails on any missing asset, including every candidate inside a `srcset`. |
| `screenshot.py` | Headless Chromium, so the agent can look at its own output. Non-optional. |
| `mock.py` | Builds 2 to 4 labelled options into one standalone file, using the real stylesheet. |
| `og-images.py` | Generates the twelve share cards from the site's own art. |
| `image-variants.mjs` | Writes the responsive-variant manifest. Runs before every build. |
| `pack-assets.py` | Ships only the asset folders that changed since the last handoff. |
| `verify-deploy.mjs` | HEADs every image on a live URL, including `srcset` candidates. |

---

## 6. Process

**One handoff file, updated in the same batch as the change.** A handoff that lies is worse than no
handoff.

**Verify against the built output, never against your intent.** Grep the built HTML, read computed
styles back out of the DOM, screenshot the page.

**Show, then build.** Real design choices get mockups, not prose.

**One risky change at a time**, because `main` auto-deploys.

**Ship distinctly named packages.** Never a generic `source.zip`.

**Packaging, as it settled:**
- a **source** zip with the complete source tree, **never including `public/`**;
- **one assets zip per changed directory**, produced by `pack-assets.py`, rather than a 34MB
  mirror of `public/` every time;
- **deletions cannot travel in a zip.** They need an explicit `git rm` line in the handoff.

**Check redirects before adding a route.** They shadow real routes silently, and they **only run on
Vercel**, never in the static export, so a local preview will 404 them.

---

## 7. Architecture, as built

```
/                     The thesis
/film                 The investigations, the trailer, the upcoming slate
/film/[slug]          One investigation: synopsis, dispatches, credits, sources link
/film/[slug]/[short]  One dispatch: player, narration, VideoObject markup
/museum               MIS front door, halls, origins, convergence map, shop teaser
/museum/enter         The Three.js walkable build
/intelligence         MISTIC, Project Helix, the four-layer method, Rotterdam scenario
/books                The Illicit Shadows Chronicles
/books/preview        Book one in detail
/newsroom             Own posts lead, ICAIE feed follows
/newsroom/[slug]      A post
/about                The organization, the founders, the partners
/contact              Five routes, multi-select, Formspree
/donate               Six Stripe tiers plus choose-your-own
/shop                 The MIS collection, waitlist only, no checkout
/sources              The evidentiary spine, 25 entries
```

**`/sources` is the argument.** A public, citable source index is what separates this from a
production company's marketing site, and it is the highest-value thing for AI search.

**Crawler stance, decided 17 Sep:** the site stays open to all crawlers, including AI. The *preview
host* is noindexed through a host-matched header in `vercel.json`, because `robots.txt` is a single
static file and cannot vary by host, and a full duplicate competing with the real domain is worse
than no preview.

---

## 8. Known open items

- **Narration figures carry no sourcing.** Eleven dispatches quote hard numbers on a site with a
  source index and a chip on every other statistic. **The largest remaining gap between what the
  site claims and what it shows.**
- Twenty of the 25 `/sources` entries have no URL. Five carry one.
- The trailer is the 2024 cut and predates the gold shoot.
- Museum Phase I is 2027, Phase II 2028. The site must not imply either is live.
- The Faraday sleeve and the pen in the shop are concepts drawn from existing products. **No
  performance claim until a supplier stands behind one.**

*Closed since the first brief: the watermarked network globe was replaced on 14 September.*

---

## 9. What not to carry over from sam-rad.com

The method transfers. The design does not.

- **The single-CTA-per-page discipline.** A reader who has just read an allegation should be offered
  the evidence, not a contact form.
- **The bureau and booking patterns.** No equivalent.
- **Warm neutrals and the mint accent.**
- **Hero portraits on every page.** A face at the top of an investigation implies the investigation
  is about the person. It is about the economy.
