# ROADMAP — illicitshadows.com

The standing checklist. Update in the same commit as the work. Items move to Done with a date, they are not deleted, so the history of what shipped stays readable.

---

## Blocked on assets or decisions from the owner

- [ ] **Newsletter, subscription, contact, donate.** Moved to Parked below.
- [ ] **Licensed network-globe image.** The stock file supplied is watermarked; per the brief it is not shipped and the watermark is not cropped out. `hero-globe` stands in on the Intelligence section.
- [ ] **`/sources` URLs.** Eleven published documents are listed with status chips but no links, pending the owner's verification pass. Draft, not curation, until reviewed.
- [ ] **First pages of The Umbra Circle** for `/books/preview`. The page is built; the extract is a
      visible placeholder rather than invented text. Also the subscribe destination for that page.
- [ ] **Brochure PDF** for the Museum download strip, and the **Substack preview link** for The Umbra Circle.
- [ ] **Real newsroom posts.** Current entries are flagged placeholders in `data/newsroom.json`.
- [ ] **Square footage of the hold list.** Confirm nothing held (HUNTER BILL, Proporo, Mesetas, Madre de Dios, StoneX) has crept into copy before launch.

## Parked: audience and money systems

Four systems, parked by the owner 14 Sep. They share one constraint: **static export means no
server**, so each needs a hosted endpoint or a serverless function. Worth deciding the provider set
once rather than four times, since a single platform can often cover signup, donations, and the
contact form.

- [ ] **Newsletter.** The `Signup` component is wired and honest: with no `site.forms.signup`
      endpoint it shows a notice and never silently discards an address. Needs a provider
      (Buttondown, Mailchimp, Kit, Formspree as a relay) and then one line in `data/site.json`.
      Decide whether the list lives with Illicit Shadows or ICAIE, since that affects consent
      language and who can mail it.
- [ ] **Subscription.** Two different things share this word. Free: the YouTube subscribe link,
      already live beside the signup. Paid: Helix enterprise access on `/intelligence`, which is a
      sales conversation and a login, not a checkout button. Decide which is meant before building.
- [ ] **Contact.** `/contact` routes four self-selecting paths to `mailto:`. A real form should keep
      the path choice as a field so enquiries arrive pre-sorted, with spam protection and a
      confirmation state. The `Signup` placeholder pattern is the model.
- [ ] **Museum shop.** `/museum` already carries a shop card linking nowhere. Needs a storefront for
      merchandise, publications, and founding-donor editions. Static export means no server, so use
      a hosted cart: **Shopify** (Buy Buttons or the Storefront API against a headless store),
      Lemon Squeezy or Gumroad for digital-only, or Stripe Payment Links if the catalogue stays tiny.
      Shopify is the right default if there is physical stock, since it handles tax, shipping zones
      and fulfilment, which a Payment Link does not. Decide alongside **Donate** below: one merchant
      account, one tax treatment, one checkout look. Also decide who fulfils; print-on-demand
      (Printful, Printify) avoids holding inventory for a small team.
- [ ] **Donate.** Tiers on `/museum` and the donor blocks on `/` and `/about` are display-only. Use
      hosted Stripe Checkout or Payment Links, or a Stripe-backed platform (Donorbox, Givebutter,
      Every.org). **Decide first whether donations route to Illicit Shadows, LLC or a fiscal
      sponsor**: that is a tax question, it changes the copy on the founding-donor block, and it is
      harder to change after the first donation than before.

## Build

- [ ] **Publish dates for the eleven shorts.** Ids are in (14 Sep). `uploadDate` is still null, and
      Google wants it for video rich results. One date per short, from YouTube.
- [ ] **YouTube title and description cleanup, to match the site.** Titles and descriptions still
      carry the old framing: the playlist is "Ep. 01 | CHEMICAL CARTELS", videos use "Ep.1,
      Dispatch N", and the channel description opens "ILLICIT SHADOWS is a docuseries". Bring them
      in line with the site: subject titles, no ordinals, no "docuseries", handle `@illicit_shadows`,
      link to illicitshadows.com. Do this **before** the transcripts are copied across, or the old
      framing walks back onto the site inside the descriptions. Check the two title mismatches at the
      same time (FENTANYL'S DIRTY PROFITS, and The Next Wave's subtitle and runtime).
- [ ] **Off-site series framing.** The playlist is titled "Ep. 01 | CHEMICAL CARTELS" and ICAIE's
      posts use "Ep.1, Dispatch 1" and "an investigative docuseries". The site is clean; YouTube and
      ICAIE are where programmers will actually look. Fixing the site alone buys little.
- [ ] **One-line description for every video.** Ten of the eleven shorts carry a `sub` in
      `films.json` and it renders under the title on cards and in the segment list. The Next Wave
      has none, so its card shows a bare title. Write one line per video, the same register as the
      existing ones ("Canada's fentanyl frontlines", "Fentanyl precursors in China"): what the film
      covers, not what it argues. These double as the meta description if short pages are ever
      built per video.
- [ ] **Check the narration against the films.** All eleven are in as of 14 Sep, transcribed from
      the supplied scripts. Two things were changed and should be confirmed against what is actually
      spoken: the "Next Dispatch" trailers were dropped (retired framing, and the site links to the
      next short anyway), and punctuation was normalized to site style. Wording is otherwise verbatim.
- [ ] **Sources for the narration claims.** The text carries specific figures (50,000 Canadian
      fentanyl deaths since 2016, $45-113bn laundered annually, 775% CBSA increase, TD Bank's $3bn
      penalty). On a site with a `/sources` index and a chip on every statistic, narration quoting
      numbers without visible sourcing is the one place that standard currently lapses. Copy and tidy, not transcription. Two cautions:
      strip the series framing before pasting (Ep. 1, Dispatch N, docuseries), and do the YouTube
      description cleanup first so the two sources agree rather than diverge.
      Why it is worth the effort: eleven shorts is roughly 12,000 words of indexable text about
      precursors, ports, and laundering, on a site that currently has almost none. It is the
      highest-value SEO work available, and on a site built around visible sourcing, publishing what
      was actually said is the right instinct anyway.

- [ ] **Confirm one short title.** Cover art reads FENTANYL'S DIRTY PROFITS; `films.json` says
      Dirty Profits. (Syndicates art was re-supplied 14 Sep and now agrees.)
- [ ] **Instagram handle.** YouTube and X are both `illicit_shadows` as of 14 Sep; Instagram is
      still `illicitshadowsdoc`. Move it or accept one platform out of step.
- [ ] **Runtime for The Next Wave** (short 11). Its description landed 14 Sep.
- [ ] **Recut the trailer.** The current one is pre-gold and says "docuseries" on screen.
- [ ] **Copy pass on `public/museum-viewer.html`**: it still says SEASON 2, GOLDEN HANDCUFFS, and
      JANUARY 2027 inside the canvas text.

- [ ] **Matched founder portraits** from a single shoot. The current pair is honest but mismatched:
      different lighting, different backgrounds, different crop tightness. Post-processing was tried
      and reverted; the fix is photography.

- [ ] **Film dropdown in the nav**, listing each work (Chemical Cartels, Illicit Gold) with "All
      films" at the foot. Owner wants this; my read is that it earns its place at three or four
      released works rather than two, since `/film` is one click away and already leads with both.
      Worth doing sooner if analytics show people landing on a short page and having no way back
      into the other work without two hops.
      If it is built, these are the requirements, not optional extras:
      - Keyboard operable (Enter and Escape, arrow keys through items) and readable by screen
        readers: a `<button aria-expanded>` plus a list, not a hover-only CSS menu. Hover alone is
        unusable on touch and invisible to keyboards.
      - A working destination on the parent: `Film` must stay clickable, not become a label that
        only opens a menu.
      - Mobile: the dropdown has to collapse into the existing hamburger panel as an indented
        sub-list. Do not build a second mobile pattern.
      - Decide at the same time whether Museum (halls) and Books (three titles) get the same
        treatment. One page with a dropdown and two without reads as an oversight.

- [ ] `/press` page: coverage, press kit, interview contact.
- [ ] `/museum/[hall]` hall detail pages with the artifact orbit viewer.
- [ ] Founder bio pages or expanded `/about` entries, if wanted.
- [ ] Search or filtering on `/newsroom` once there are real posts (the filter chips are currently inert).

## Replace site images

An image review, in priority order. Two standing rules: anything that depicts the museum or an
unmade film is captioned as a concept, and any diagram that is illustrative rather than measured
keeps its `illustrative` chip.

- [ ] **Animated hero.** The hero art is a raster render and cannot be animated as-is. The cheap
      version is an SVG layer over it: six trade routes that draw themselves in about two seconds,
      then city nodes that pulse slowly. Roughly 4KB of SVG and CSS, no JavaScript, no new
      dependency. Mocked 14 Sep in three levels (none, draw-then-settle, continuous traffic); the
      draw-then-settle version is the one to build, since permanent motion behind a headline is what
      people ask to turn off. Requirements if it is built:
      - **`prefers-reduced-motion` gets the finished state immediately**, no draw-on, no pulsing.
      - Arcs must move with the mobile crop (`object-position:22% center` below 820px) or they will
        float off the globe.
      - The arcs in the mock are traced by hand over the artwork: decorative, not geographic. Either
        accept that or build a real vector globe with true coordinates, which needs JavaScript for
        rotation and is a much larger job.
      - Keep it behind the text, never over it, and do not let it delay the hero image loading.

- [ ] **Home, the three pillars: the loop.** The panels landed 14 Sep, image-led and shared with
      `/about`. What the connector still does not show is the **feedback loop**: that investigations
      feed the museum and the museum feeds the model. A line with three nodes reads as "three
      things", not "three things that feed each other".
- [ ] **"Everything is connected" sections.** A simplified companion to the Venn: five category
      symbols around a central hub, for mobile, with the full diagram kept for deeper reading. The
      detailed map currently has to pan sideways below 820px. Reconcile the museum's "four domains"
      wording with the graphic's five at the same time.
- [ ] **Intelligence, four system layers.** A clean SVG for Intelligence Layer to Global Graph to
      Causal Engine to Reinforcement. This explains the system better than another atmospheric
      image, and it is a diagram the site can own rather than license.
- [ ] **Museum, "The building".** An illustrated, clickable museum map: rotunda, numbered halls,
      theater and shop, with Phase I and Phase II as distinct levels. It would make the structure
      legible before anyone enters the prototype.
- [ ] **Museum, exhibition cards.** Use the new close-up thumbnails on the cards and keep the
      immersive room renderings for exhibit entrances and large banners. The two formats are for
      different viewing sizes.
- [ ] **Founding-donor sections.** A visual showing what support buys: exhibitions, public
      education, research, field investigations. Specific outputs make the ask tangible.
- [ ] **Newsroom.** Three reusable thumbnail templates for Dispatch, Press and Release: subject
      photography, a small category label, consistent crop. Apply as real posts replace the
      placeholders.
- [ ] **Confirm the AI crawler stance in `robots.js`.** It currently allows everything except
      `/specimen`, which permits GPTBot, ClaudeBot, PerplexityBot and Google-Extended by default.
      For a body of work that wants to be cited, that is probably right, but it should be a decision.
- [ ] Analytics.
- [ ] OG images per page (currently inherits the default).
- [ ] Squarespace redirect map, so no existing URL 404s. Check `next.config.js` for shadowing rules before adding routes.
- [ ] DNS cutover to illicitshadows.com.
- [ ] Delete the stale Vercel project once the new one holds the domain, so two projects are not building on every push.
- [ ] Accessibility pass: contrast on the cream Film band, focus order, alt text audit.
- [ ] Mobile pass on real devices, not just the `mobile.py` frame.

## Done

- [x] **14 Sep** Scaffold: Next 16, App Router, static export mode for tooling, plain CSS with tokens, content in `data/*.json`.
- [x] **14 Sep** Tooling proven: `preview.py`, `mobile.py`, `check-assets.mjs` (extended to CSS `url()` and video), `screenshot.py` (scrolls before capture so lazy images load).
- [x] **14 Sep** Self-hosted Anton, Archivo, IBM Plex Mono. No Google Fonts runtime dependency.
- [x] **14 Sep** Design system and `/specimen`: black base, signal yellow, alert red, no warm neutrals.
- [x] **14 Sep** Evidentiary components: `<Prov>` status chips and `<Stat>` with visible source. Helix cascade labeled illustrative.
- [x] **14 Sep** All 13 routes built from the reference mockups.
- [x] **14 Sep** Episode 2 data and the `/sources` seed integrated from the trailer script, with the hold list enforced.
- [x] **14 Sep** Next 15.5.2 to 16.3.5, React 19.3.0, zero production vulnerabilities, async `params` handled.
- [x] **14 Sep** Vercel deploy fixed: conditional export, headers-only `vercel.json`, fresh project. Live.
- [x] **14 Sep** Hero stat reads as a sentence again, attribution on its own line.
- [x] **14 Sep** Scroll-reveal removed entirely. Content renders with JavaScript disabled, verified. Never reintroduce an `opacity:0` default.
- [x] **14 Sep** Typography scaled up: logo, nav, body, and card copy.
- [x] **14 Sep** Founder headshots shipped: originals, square-cropped, WebP plus JPEG, full-width
      1:1 photo on the `/about` founder cards, replacing the DL / SR monograms.
- [x] **14 Sep** `preview.py` fixed: CSS glob broken since the Next 16 upgrade (previews were
      rendering unstyled), and `--lite` now keeps the fonts as woff2 instead of dropping them.
- [x] **14 Sep** `scripts/mock.py`: design options render as one HTML page, per owner instruction.
- [x] **14 Sep** Three supplied packages integrated: eleven section dividers placed per the
      placement guide, six upcoming covers on `/film` and home, five cascade maps as a stepper on
      `/intelligence`. Illicit Gold cover title recoloured to signal yellow. Home hero reordered to
      email first.
- [x] **14 Sep** MISTIC three pillars redesigned as image-led panels, shared by home and `/about`.
- [x] **14 Sep** `/intelligence` restructured: Helix as two columns, a break band before the
      cascade, and the map's own timeline made clickable (option A, contained).
- [x] **14 Sep** Page-specific heroes on `/about`, `/contact`, `/intelligence` and `/newsroom`,
      replacing repeated evidence-wall imagery.
- [x] **14 Sep** `/books` gets the trilogy render as its hero and 3D mockups for all three books.
      Hero crops moved to CSS variables with a per-image `mobilePos`.
- [x] **14 Sep** Real 2:3 book covers for all three Chronicles, replacing the square 3D render.
      Next-film cover card on each short page.
- [x] **14 Sep** All eleven narrations published, 101 paragraphs across the short pages.
- [x] **14 Sep** Per-short pages at `/film/<film>/<short>`, each with its own metadata, VideoObject
      and narration, listed in the sitemap. Short descriptions added under titles on home.
- [x] **14 Sep** Shorts play in a lightbox instead of a 250px card; eleven shorts listed vertically
      on the film page; home hero cut from three calls to action to two.
- [x] **14 Sep** All thirteen museum hall thumbnails replaced with the supplied set.
- [x] **14 Sep** MIS eclipse mark: photographic for display, vector for small sizes and favicon
      (the site had none). Dead `DigitalMuseum` illustration and its styles removed.
- [x] **14 Sep** Film card extracted to `WorkCard`, shared by `/film` and home. Museum restructured:
      3D prototype block high, halls below, impacts map moved to the bottom. New MIS logo. Books
      becomes a three-book trilogy from `data/books.json`.
- [x] **14 Sep** Works dated rather than numbered: "Investigation · 2025-2026". Numbered labels
      were tried and dropped, no ordinals anywhere on the site.
- [x] **14 Sep** Museum concept renders placed across `/museum` and home; home film section
      reordered so Illicit Gold and Chemical Cartels lead and the 2024 trailer sits small beside the
      upcoming slate; convergence section retitled Crime Convergence · #EverythingIsConnected.
- [x] **14 Sep** Convergence map added site-wide with #EverythingIsConnected, Helix.AI art on home
      and `/intelligence`, `/books/preview` page created, founders nonfiction block removed, ICAIE
      mark trimmed and squared.
- [x] **14 Sep** Home rebuilt around Illicit Gold, with three Chemical Cartels covers, the new
      trailer art, and cream-band contrast fixed for the new elements.
- [x] **14 Sep** Helix cascade rebuilt as a causal chain with lags and reasons, shared by home and
      `/intelligence`. Book cover on `/books` enlarged.
- [x] **14 Sep** All stamps moved clear of the key art: `.badge` now always pairs with `.btm`.
- [x] **14 Sep** All eleven shorts wired to real YouTube ids; the film player embeds the playlist
      in order. Handle moved to `@illicit_shadows` on YouTube and X.
- [x] **14 Sep** Video: facade YouTube embeds (no third-party request until click), VideoObject and
      Movie JSON-LD, sitemap.xml, robots.txt, and a subscribe link beside the email signup.
- [x] **14 Sep** Key art complete: two film covers and eleven short covers, card grid on the film
      page, color split of yellow for gold and red for Chemical Cartels.
- [x] **14 Sep** Positioning pass: series framing retired site-wide. `/film` rebuilt as two works
      plus a development slate with convergence tags, gold film retitled Illicit Gold, 301 added, page titles switched from em dash to middot.
- [x] **14 Sep** Contact CTA in the nav: solid signal yellow on desktop, and on mobile the button
      is dropped and Contact sits at the bottom of the hamburger dropdown.
- [x] **14 Sep** `/about` reordered to the owner's sequence: Who we are, Who's building this, Who we
      serve, Why now.
