# ROADMAP — illicitshadows.com

The standing checklist. Update in the same commit as the work. Items move to Done with a date, they are not deleted, so the history of what shipped stays readable.

---

## Blocked on assets or decisions from the owner

- [ ] **Newsletter, subscription, contact, donate.** Moved to Parked below.
- [ ] **Licensed network-globe image.** The stock file supplied is watermarked; per the brief it is not shipped and the watermark is not cropped out. `hero-globe` stands in on the Intelligence section.
- [ ] **`/sources` URLs.** Eleven published documents are listed with status chips but no links, pending the owner's verification pass. Draft, not curation, until reviewed.
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
- [ ] **Transcripts** for the shorts. Highest-value SEO work available: eleven shorts is roughly
      12,000 words of indexable text about precursors, ports, and laundering, on a site that
      currently has almost none. **The scripts already exist in the YouTube description of each
      video**, so this is a copy-across, not a transcription job. Add a `transcript` field per
      segment in `films.json` and render it under each short. Check the descriptions for series
      framing before pasting; the playlist and ICAIE's posts still use Ep. 1 and Dispatch N.

- [ ] **Confirm one short title.** Cover art reads FENTANYL'S DIRTY PROFITS; `films.json` says
      Dirty Profits. (Syndicates art was re-supplied 14 Sep and now agrees.)
- [ ] **Instagram handle.** YouTube and X are both `illicit_shadows` as of 14 Sep; Instagram is
      still `illicitshadowsdoc`. Move it or accept one platform out of step.
- [ ] **Subtitle and runtime for The Next Wave** (short 11). The card renders without them.
- [ ] **Recut the trailer.** The current one is pre-gold and says "docuseries" on screen.
- [ ] **Copy pass on `public/museum-viewer.html`**: it still says SEASON 2, GOLDEN HANDCUFFS, and
      JANUARY 2027 inside the canvas text.

- [ ] **Matched founder portraits** from a single shoot. The current pair is honest but mismatched:
      different lighting, different backgrounds, different crop tightness. Post-processing was tried
      and reverted; the fix is photography.

- [ ] `/press` page: coverage, press kit, interview contact.
- [ ] `/museum/[hall]` hall detail pages with the artifact orbit viewer.
- [ ] Founder bio pages or expanded `/about` entries, if wanted.
- [ ] Search or filtering on `/newsroom` once there are real posts (the filter chips are currently inert).

## Launch

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
