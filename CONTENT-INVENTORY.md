# Content inventory — the six reference HTML pages

Design reference and copy source, not the codebase. Tier each block before porting.

| Page | Reusable as-is | Supersede / fix on port | Must not travel |
|---|---|---|---|
| index | Hero thesis, three pillars (deck copy), film feature, museum/books teasers, newsroom pattern, donor block, footer | Add source to $6T stat; label Helix cascade `illustrative`; replace watermarked globe; strip em dashes; warm panels → black tokens; cream film band is a mockup decision | Watermarked network globe |
| film | Series hero, season feature, episode list, trailer, watch CTA | Illustrative upcoming arcs (Blood Batteries, Iron Triangle) are placeholders, owner to confirm | — |
| episode | Player, synopsis, credits sidebar, 10 segments w/ runtimes, up-next | Wire real video URLs | — |
| museum | Origins copy, convergence wheel (white panel), Phase I/II halls (brochure imagery), Illicit Shadows Theater, Umbra Circle, brochure, donor | "MIS online coming in 2026" conflicts with Phase I 2027; eclipse from brochure | — |
| about | Who we are, Why Now (4 forces), founders, Who We Serve, partners, work-with-us | Founder monograms → headshots when supplied | Anything from deck slides 09 (financials) or 12 (the ask) |
| museum_template | Shell only (nav, footer, base CSS) | Replaced by `components/Blocks.jsx` + `site.css` | — |

Global fixes on port: em dashes out; `#EverythingIsConnected` allowed beyond footer (owner decision); counters allowed (owner decision); Golden Handcuffs is the E02 title (deck).
