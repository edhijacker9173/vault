# Handoff — The Mythos Concordance

## Project path
`/home/user/workspace/lovecraft-timeline`

Deploy must be re-run from the parent agent with the same arguments so the site surfaces as a component in chat:
- `project_path`: `/home/user/workspace/lovecraft-timeline`
- `site_name`: `The Mythos Concordance`
- `entry_point`: `index.html`

## Key files
| File | Purpose |
|---|---|
| `index.html` | Markup: header, hero, controls, timeline, entity chips, network SVG, about |
| `styles.css` | Eldritch-archive design system: dark parchment + cosmic teal, light parchment mode, type scale, responsive |
| `app.js` | State, sort/filter/search, card rendering, entity chips, SVG network graph, theme toggle |
| `data.js` | 14 hand-curated story records with composition + publication metadata, entities, locations, artifacts, themes, source URLs |
| `HANDOFF.md` | This file |
| `qa-*.png` | Visual QA screenshots from build (desktop + mobile + light/dark + filtered states) |

No backend. No build step. Plain HTML/CSS/JS — pure static deploy.

## Content & design decisions
- **Stories included (14):** Dagon, The Nameless City, The Festival, The Call of Cthulhu, The Case of Charles Dexter Ward, The Colour Out of Space, The Dunwich Horror, The Whisperer in Darkness, At the Mountains of Madness, The Shadow over Innsmouth, The Dreams in the Witch House, The Thing on the Doorstep, The Shadow Out of Time, The Haunter of the Dark. Limited to Lovecraft-authored core Mythos works as requested; Dreamlands cycle and revisions excluded.
- **Sources:** Each card links to its page at the H. P. Lovecraft Archive (hplovecraft.com). Composition years + first-publication venues drawn from that archive's chronologies (S. T. Joshi). Project Gutenberg referenced for free full texts in About.
- **Art direction:** Eldritch archival scholar. Default dark mode uses near-black surfaces with green-black undertone, warm parchment ink text (#e6e0cf), cosmic teal accent (#4fb5a8). Light mode is aged parchment (#ece4d2) with deep teal ink. Cormorant Garamond serif for display + Inter sans for body + JetBrains Mono for labels. Subtle SVG noise texture, soft teal radial glows. Custom inline SVG logo (concentric sigil + cardinal arcs) reused as favicon via data URI.
- **Interactions:**
  - Sort by written date (default asc), publication date, title, entity count, or venue — both directions.
  - Filter dropdowns: entity, theme. Plus full-text search across title/plot/venue/entities/locations/artifacts/themes.
  - Tags on each card are clickable (entity tags filter the entity dropdown; theme tags filter the theme dropdown).
  - Entity chips section near the network panel also toggles the entity filter.
  - Network panel: SVG bipartite graph (entities left, stories right, sorted by year). Hovering an entity highlights it; clicking it filters the timeline. Clicking a story node scrolls to and outlines its card.
  - Reset button + empty-state reset link clears everything.
- **Accessibility:** Skip link, semantic landmarks, `aria-live` result count, focus-visible rings, keyboard activation (Enter/Space) on SVG nodes, color contrast meets WCAG AA, respects `prefers-reduced-motion`.
- **Responsive:** Desktop grid → 2-up at tablet → 1-up at phone. Controls become non-sticky and stack on mobile. Network gains horizontal scroll on phones via `overflow-x: auto` (the parchment-noise background uses `overflow-x: clip` on body so page itself never scrolls horizontally).

## Verification steps performed (Playwright @ http://localhost:8090)
1. Page loads with no console errors; 14 cards render. ✓
2. `Sort by entity count desc` brings *At the Mountains of Madness* to first (most entities). ✓
3. Search "shoggoth" narrows to 2 cards (Mountains, Doorstep). ✓
4. Reset restores all 14 cards. ✓
5. Clicking the **Nyarlathotep** entity chip filters to 3 cards (Whisperer, Dreams in the Witch House, Haunter of the Dark). ✓
6. Clicking the **Cthulhu** network node filters to 2 cards (Call of Cthulhu, Shadow Out of Time — both list Cthulhu/Cthulhu mentioned). ✓
7. Theme toggle switches between aged-parchment and dark-parchment with preserved state. ✓
8. Mobile 390×844: controls stack, cards stack, network gains a horizontal-swipe affordance ("Swipe horizontally to explore."). ✓
9. Network labels (story titles + year) no longer clipped after padding adjustment. ✓
10. All HPLA `↗` links target external pages with `rel="noopener"`. ✓

## Caveats & source ambiguity (surfaced in the About section)
- **Composition months** follow S. T. Joshi's chronology where the HPLA cites it; day-level dates are typically unavailable.
- **The Case of Charles Dexter Ward** never saw print in Lovecraft's lifetime — its first appearance was a posthumous abridgment in *Weird Tales*, May–July 1941. Listed as such on the card; the card-level written date (1927) reflects composition.
- **The Shadow over Innsmouth** first appeared as Lovecraft's only book-length lifetime publication (Visionary Publishing chapbook, April 1936), not in a magazine.
- **Entity tags** reflect on-page presence / material plot use. Some Lovecraft "mentions" (e.g. Cthulhu cited in *The Shadow Out of Time*) are explicitly suffixed "(mentioned)" so users can disambiguate.
- **Dreamlands tales** (The Dream-Quest of Unknown Kadath, The Silver Key, etc.) and ghost-written revisions are intentionally excluded from this concordance.
- **Plot summaries** are paraphrased; quoted phrases (e.g. "blasted heath", "stars are right") are Lovecraft's own.
