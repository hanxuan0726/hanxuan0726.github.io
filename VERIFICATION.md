# Redesign verification — 2026-11-11

The portfolio remains an Astro static site for the root-path GitHub Pages repository. No dependency inputs or Pages deployment workflow were changed.

## Completed checks

- Official Node 24.22.2 runtime, SHA256 verified; `npm ci` completed.
- `npm run check:content`: passed.
- `npm run build`: passed, including Astro/TypeScript (0 errors, 0 warnings, 0 hints), prerendering, identity-in-H1 and root-relative resource checks.
- Browser inspection at 1440×1000, 390×844 and 320×740; document width matched each viewport, without horizontal page scrolling.
- Both project SVG images loaded successfully; self-hosted fonts rendered.
- Research accordion and project process disclosure open and show expected content.
- Copy-email reports COPIED. Coral/dark contrast toggles and persists across reload.
- Travel map contains all 4 overseas destinations and all 20 China destinations supplied by the user.
- World/China buttons switch the visible map; pressing Enter on the China shape opens China; Escape returns to World.
- Selecting Nanchang highlights its route and updates the live destination readout with roots wording.
- Pausing the page animation, then changing to China, leaves the map visible (opacity 1); the paused entrance-animation regression is fixed.
- Browser console returned no errors in the inspected local session.
- Shanghai is explicitly HOME and the largest map marker; the home control clears a selected destination while preserving China view. Nanchang remains roots / 老家.
- Local licensed Haerin portrait loads (624px intrinsic width); rendered ranks exactly match 大师 / 完美黄金 S / 神话.
- Editorial motion initializes with 26 deferred reveals; global pause clears all pending states and no reveal remains at opacity 0. China map remains visible while route animation is paused.
- Header pause controls initialize independently of Canvas availability (source-reviewed).
- `git diff --check`: passed.

## Scope and limits

- Hover drill-in is implemented using a 450 ms fine-pointer hover listener and a guarded return path; the browser control API did not expose a hover-only action, so this path was source-reviewed, while click/keyboard equivalents were exercised.
- Reduced-motion behavior was source-reviewed: the canvas stops and the map/ticker animations are disabled. No operating-system preference was changed for QA.
- Countries and provinces use representative map anchors, not invented visited cities. Arcs are illustrative connections from Shanghai, not actual flight records. Map data sources/licenses are in `public/data/map-sources.json`.
- Missing portrait, CV, education dates, publications and project URLs have not been fabricated. Project graphics are labeled concept illustrations.
- Existing npm audit reports 5 affected build/development packages. The site deploys static HTML/CSS/JS and does not run the Astro server or image optimizer; dependency upgrades remain separate maintenance work.
- GitHub Pages publication is triggered by merging to main; a preview or draft pull request does not replace the live GitHub Pages site.
