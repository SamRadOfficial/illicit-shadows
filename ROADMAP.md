# ROADMAP — illicitshadows.com

The standing checklist. Update in the same commit as the work. Items move to Done with a date, they are not deleted, so the history of what shipped stays readable.

---

## Blocked on assets or decisions from the owner

- [ ] **Signup provider.** Formspree, Mailchimp, Buttondown, other. Forms are visible placeholders that show a notice and never silently discard an address. Set `site.forms.signup` in `data/site.json` to wire them.
- [ ] **Donation box, Stripe-compatible.** Tiers on `/museum` and the donor blocks on `/` and `/about` are display-only. Wire to Stripe directly (Payment Links or Checkout) or a Stripe-backed platform (Donorbox, Givebutter, Every.org). Static export means no server, so use hosted Checkout or Payment Links rather than a server-side session endpoint, unless a serverless function is added. Decide whether donations route to Illicit Shadows, LLC or a fiscal sponsor for tax treatment; that changes the copy on the founding-donor block.
- [ ] **Contact form.** `/contact` currently routes to `mailto:sam@illicitshadows.com` through four self-selecting paths (advisory, Helix, founding donor, EP). Replace with a real form that captures which path was chosen. Same static constraint: Formspree, Basin, or a Vercel serverless function. Include spam protection and a confirmation state; the `Signup` component's honest-placeholder pattern is the model.
- [ ] **Licensed network-globe image.** The stock file supplied is watermarked; per the brief it is not shipped and the watermark is not cropped out. `hero-globe` stands in on the Intelligence section.
- [ ] **`/sources` URLs.** Eleven published documents are listed with status chips but no links, pending the owner's verification pass. Draft, not curation, until reviewed.
- [ ] **Brochure PDF** for the Museum download strip, and the **Substack preview link** for The Umbra Circle.
- [ ] **Real newsroom posts.** Current entries are flagged placeholders in `data/newsroom.json`.
- [ ] **Episode 2 title.** Deck says *Golden Handcuffs* and is canonical; the trailer script says *Illicit Gold: The Rush to Cash in on the Criminal Shadows of El Dorado*, stored as `fullTitle`. Flip if it releases under the full title.
- [ ] **Square footage of the hold list.** Confirm nothing held (HUNTER BILL, Proporo, Mesetas, Madre de Dios, StoneX) has crept into copy before launch.

## Build

- [ ] **Matched founder portraits** from a single shoot. The current pair is honest but mismatched:
      different lighting, different backgrounds, different crop tightness. Post-processing was tried
      and reverted; the fix is photography.

- [ ] `/press` page: coverage, press kit, interview contact.
- [ ] `/museum/[hall]` hall detail pages with the artifact orbit viewer.
- [ ] Wire real video URLs on episode and segment rows, currently pointing at the channel.
- [ ] Founder bio pages or expanded `/about` entries, if wanted.
- [ ] Search or filtering on `/newsroom` once there are real posts (the filter chips are currently inert).

## Launch

- [ ] `robots.js` allowing GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended. For a body of work that wants to be cited, being readable by the systems that cite is the point.
- [ ] `sitemap.xml`.
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
- [x] **14 Sep** `/about` reordered to the owner's sequence: Who we are, Who's building this, Who we
      serve, Why now.
