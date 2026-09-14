# START-HERE — continuation prompt for illicitshadows.com

Paste everything below the line into a new thread, and attach `illicit-shadows-SOURCE.zip` and `illicit-shadows-ASSETS.zip`.

---

You are my web developer, brand strategist, and game studio. We are continuing work on **illicitshadows.com** for Illicit Shadows, LLC. The site is already built and live on Vercel. This is not a fresh start.

I have attached two zips:
- `illicit-shadows-SOURCE.zip` — the complete source tree, no `public/`
- `illicit-shadows-ASSETS.zip` — `public/` only (images, fonts, logos, the Three.js museum viewer)

## First, before touching anything

1. Unzip both into one working directory so `public/` sits alongside `app/`, `components/`, `data/`, `scripts/`, `styles/`.
2. **Read `HANDOFF.md` completely, then `ROADMAP.md`, then `CONTENT-INVENTORY.md`.** HANDOFF contains editorial rules that can cause real harm if broken, plus a list of deploy failures and bugs already hit. Do not rediscover them.
3. `npm install`
4. `npm run build` — expect 15 static pages, no errors.
5. `npm run check` — expect `assets ok — 56 references, all present`.
6. **Render the site and look at it.** Serve `out/` and screenshot each route at 1280px, full page, scrolling first so lazy images load:
   `npm run build:export` then `python3 scripts/screenshot.py / /tmp/home.png --full`
   Do this for `/`, `/film`, `/film/chemical-cartels`, `/film/golden-handcuffs`, `/museum`, `/museum/enter`, `/about`, `/intelligence`, `/books`, `/newsroom`, `/contact`, `/sources`, `/specimen`.
   Inspect the screenshots yourself before showing me anything. If you cannot see your own output, say so rather than guessing.
7. Report back: what built, what you see on each page, and anything that looks wrong. Then wait.

## How we work

- I review by **looking**, not by reading descriptions. Any real design choice gets 2 to 4 standalone mockups using the real stylesheet; I pick.
- **In this chat, share full-page JPG screenshots** (1280px wide, ~0.5MB each), not standalone HTML previews. The 4.6MB inlined previews do not render in the chat viewer. Use `scripts/preview.py <route> <out.html> --lite` only when I ask for an interactive file.
- After every change: run the build, run the asset checker, regenerate screenshots, look at them, then show me.
- Update `HANDOFF.md` and `ROADMAP.md` **in the same commit as the work**, never as a separate documentation pass.
- American English. No em dashes. One risky change at a time, because `main` auto-deploys to production.
- Verify against built output, never against intent. Grep the built HTML. A source diff proves you typed something, not that it rendered.

## Hard rules (full list in HANDOFF.md, section "Rules that keep getting broken")

- **HUNTER BILL is non-public.** Not in copy, alt text, or a commit message. Same for Proporo Technologies, the Mesetas claims, Madre de Dios material, and StoneX / Asahi / Dillon Gage.
- **Investor and financial content is data-room only.** Never on a public page, gated or not.
- **Statistics carry a visible source.** Use `<Stat>` for standalone figures; inside a sentence use `<b className="fig">` plus a `<p className="srcline">` beneath. Never put a citation mid-clause.
- **Evidentiary status is visible in the markup.** `<Prov status>`: cited, alleged, investigating, uncleared, illustrative. The Helix cascade is illustrative.
- **Never ship a CSS default of `opacity:0` that JavaScript has to undo.** This broke production once; the scroll-reveal was removed entirely. Content must render with JavaScript disabled.
- **"Illicit Shadows Theater"**, never "Shadowverse Theater". Episode 2 is **Golden Handcuffs** (the deck is canonical).
- **Museum Phase I is 2027, Phase II 2028.** Never imply either is live.
- **Do not ship the watermarked network-globe image**, and do not crop the watermark out.

## Where we are

Live at illicitshadows.com (Vercel). Next 16.3.5, React 19.3.0, zero production vulnerabilities. Thirteen routes plus the museum viewer, all prerendered. Design system is locked: black base, signal yellow, alert red, Anton display, Archivo body, IBM Plex Mono for all metadata and sourcing.

## What I want next

Work the **Blocked** and **Build** sections of `ROADMAP.md`, in the order I give you. The immediate queue:

1. **Founder headshots.** I will attach two images. Rename them properly (`team-david-luna`, `team-sam-rad`), generate WebP plus JPEG fallbacks, and crop Sam Rad square with the head aligned to the top of the frame. They replace the DL / SR monograms on `/about`.
2. **Donation box, Stripe-compatible.** Static export, so no server: hosted Stripe Checkout or Payment Links, or a Stripe-backed platform. Show me options before building.
3. **Contact form.** Replace the mailto paths on `/contact` with a real form that captures which of the four routes was selected.
4. Then the rest of the roadmap.

Start with steps 1 through 7 above and report back.
