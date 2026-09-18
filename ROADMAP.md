# ROADMAP — illicitshadows.com

The standing checklist. Update in the same commit as the work. Items move to Done with a date
rather than being deleted, so the history of what shipped stays readable.

Reorganised 18 Sep by horizon: what stands between the site and a live domain, what follows in the
weeks after, and what waits for the work itself to exist. The YouTube cleanup closed this session.

---

# SHORT TERM — before and around the DNS cutover

Nothing here needs new content or new money. Most of it is one sitting each.

- [ ] **Newsletter tool, and import the list.** 117 addresses are exported and consent-split and
      nothing is currently capturing new ones. MailerLite (free to 1,000), Buttondown (~$9/mo), or
      Kit (free to 10,000). Then point the signup forms at it and leave Formspree handling contact
      and the shop waitlist. **The only item with a clock on it:** the list dies with the Squarespace
      account.
- [ ] **DNS cutover to illicitshadows.com.** Redirects, robots, canonicals and OG cards are all in
      place; this is the last technical blocker and it is yours to trigger.
- [ ] **Delete the stale Vercel project** once the new one holds the domain.
- [x] **Publish dates and runtimes** added 18 Sep from the YouTube export. All eleven now carry an uploadDate and duration in their VideoObject markup.
- [x] **The Next Wave runtime** added 18 Sep: 1:55.
- [x] **Title confirmed 18 Sep:** the cover art keeps FENTANYL'S DIRTY PROFITS.
- [x] **Cartels subtitle confirmed 18 Sep:** the site wording stands.
- [x] **`/sources` linked 18 Sep** from the foot of each investigation page.
- [ ] **Old Squarespace URLs beyond the sitemap.** Anything linked from a deck, a press release or
      the ICAIE site that was not in the sitemap will still 404.
- [ ] **Quotes for the Illicit Gold pre-production post**, which is published without any.

# MEDIUM TERM — the weeks after launch

Where the site's credibility is thinnest, and the systems that turn attention into something.

- [ ] **Sources for the narration figures.** The eleven narrations quote hard numbers (50,000
      Canadian fentanyl deaths since 2016, $45-113bn laundered annually, a 775% CBSA increase, TD
      Bank's $3bn penalty) with no attribution, on a site with a `/sources` index and a chip on every
      other statistic. **The largest remaining gap between what the site claims and what it shows.**
- [ ] **`/sources` URLs.** Ten of eleven documents have no link. Status chips without links read as
      assertion rather than evidence.
- [ ] **Check the narration against the films.** Transcribed from the supplied scripts, with two
      changes worth confirming against what is actually spoken.
- [ ] **Turn the shop waitlist into a shop.** Sample one cap, one tee and one bomber (~$120, two
      weeks), photograph the real pieces, replace the renders, then add checkout: Shopify Starter
      (~$5/mo) or Stripe Payment Links with manual fulfillment. Caps are the strongest item; the
      bomber may not be viable through print on demand. The Faraday sleeve and pen are concepts
      drawn from existing products and their technical claims are not validated.
- [ ] **Contact management.** Enquiries arrive as email from Formspree and stop there: no record of
      who asked what or whether anyone replied. A shared inbox label works until a few a week.
- [ ] **Analytics.**
- [ ] **Accessibility pass on real assistive tech.** Automated contrast is clean across seventeen
      routes; focus order and screen-reader flow have not been checked with an actual reader.
- [ ] **Mobile pass on real devices**, not an emulated frame.
- [ ] **Recut the trailer.** Pre-gold, and says "docuseries" on screen.
- [ ] **More newsroom posts.** Five entries today, and the ICAIE feed refreshes itself.
- [ ] **A donate block on `/museum` itself.** The museum lost its own donor section when the shared
      band landed, so the thing being funded has no dedicated ask on its own page.
- [ ] **Dead CSS.** `.band-raised`, `.minigrid`, `.ppanel`, `.work-*`, `.head{` and friends survive
      from the pre-editorial layout and have caused real bugs by colliding with editorial class
      names. Remove in a commit where nothing else moves.
- [ ] **Image budget.** `public/images` is 25MB+. Responsive variants exist for heroes only; covers
      are full-size everywhere.

# LONG TERM — waits on the work, the money, or a decision

- [ ] **Matched founder portraits** from a single shoot. The current pair is mismatched in crop,
      background and lighting.
- [ ] **First pages of The Umbra Circle** for `/books/preview`.
- [ ] **Brochure PDF** for the museum, and the **Substack preview link** for the book.
- [ ] **Hall photographs or copy**, which unlocks the hall preview dialog and `/museum/[hall]` pages.
- [ ] **CRM**, once funders, underwriters and press are a pipeline rather than a handful of threads.
      Notion or Airtable (free), HubSpot free tier, or Attio (~$29/seat).
- [ ] **Paid Helix access.** A sales conversation and a login, not a checkout button. Decide what is
      being sold before building anything.
- [ ] **The three-pillar loop.** The connector says "three things", not "three things that feed each
      other", which is the actual claim.
- [ ] **Animated hero.** Mocked 15 Sep; draw-then-settle is the version to build.
      `prefers-reduced-motion` gets the finished state, arcs follow the mobile crop, arcs are
      decorative not geographic.
- [ ] **Museum section order.** Three arrangements mocked 15 Sep. The hairline divider fixed the
      symptom, so this is composition rather than a bug.
- [ ] `/press` page: coverage, press kit, interview contact.
- [ ] `/museum/[hall]` detail pages with the artifact orbit viewer.
- [ ] Founder bio pages, or expanded `/about` entries.
- [ ] Newsroom search, once there are enough posts to need it.
- [ ] A three-book presentation graphic for the deck and for social.

---

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
- [x] **14 Sep** CTA bands (signal used once, panel repeatable) with two on home; contact form
      built; books page reverted to the live version and its rework stashed above.
- [x] **15 Sep** Newsroom seeded with real ICAIE and Illicit Shadows items; scheduled fetcher and
      GitHub Action added to keep both sources current.
- [x] **15 Sep** Site recomposed to the Editorial package across all 30 routes.
- [x] **14 Sep** CTA bands (signal yellow for the connect message, rule-only for the rest) and a
      contact form with routing, honeypot and an honest unconnected state.
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
