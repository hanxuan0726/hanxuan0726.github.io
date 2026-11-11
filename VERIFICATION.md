# Redesign verification — 2026-11-11

The portfolio remains an Astro static site for the root-path GitHub Pages repository. No dependency inputs or Pages deployment workflow were changed.

## Completed checks

- Official Node 24.22.2 runtime, SHA256 verified; `npm ci` completed.
- `npm run check:content`: passed.
- `npm run build`: passed, including Astro/TypeScript (0 errors, 0 warnings, 0 hints), prerendering, identity-in-H1 and root-relative resource checks.
- Browser inspection at 1440×1000, 390×844 and 320×740; document width matched each viewport, without horizontal page scrolling.
- Both project SVG images loaded successfully; self-hosted fonts rendered.
- Research accordion opens; the orbit section provides full static project descriptions and workflows below the gallery.
- Copy-email reports COPIED. The earlier coral/dark contrast revision toggled and persisted across reload; the current palette is lime/forest green (latest revision checks below).
- Travel map contains all 4 overseas destinations and all 20 China destinations supplied by the user.
- World/China buttons switch the visible map; pressing Enter on the China shape opens China; Escape returns to World.
- Selecting Nanchang highlights its route and updates the live destination readout with roots wording.
- Pausing the page animation, then changing to China, leaves the map visible (opacity 1); the paused entrance-animation regression is fixed.
- Browser console returned no errors in the inspected local session.
- Shanghai is explicitly HOME and the largest map marker; the home control clears a selected destination while preserving China view. Nanchang remains roots / 老家.
- Local licensed Haerin portrait loads (624px intrinsic width); rendered ranks exactly match 大师 / 完美黄金 S / 神话.
- Editorial motion initializes deferred reveals; global pause clears all pending states and no reveal remains at opacity 0. China map remains visible while route animation is paused.
- Header pause controls initialize independently of Canvas availability (source-reviewed).
- `git diff --check`: passed.

## Scope and limits

- Hover drill-in is implemented using a 450 ms fine-pointer hover listener and a guarded return path; the browser control API did not expose a hover-only action, so this path was source-reviewed, while click/keyboard equivalents were exercised.
- Reduced-motion behavior was source-reviewed: the canvas stops and the map/ticker animations are disabled. No operating-system preference was changed for QA.
- Countries and provinces use representative map anchors, not invented visited cities. Arcs are illustrative connections from Shanghai, not actual flight records. Map data sources/licenses are in `public/data/map-sources.json`.
- Missing portrait, CV, education dates, publications and project URLs have not been fabricated. Project graphics are labeled concept illustrations.
- Existing npm audit reports 5 affected build/development packages. The site deploys static HTML/CSS/JS and does not run the Astro server or image optimizer; dependency upgrades remain separate maintenance work.
- GitHub Pages publication is triggered by merging to main; a preview or draft pull request does not replace the live GitHub Pages site.

## Orbit / fan corner / equipment revision

- Two real projects are presented as six clearly labeled chapters in a native-scroll CSS 3D orbit; expanding black WORK capsule and curved type wall change with scroll progress.
- Local browser inspection confirmed the 3D card transforms/front chapter change on scroll, project details remain reachable, and all five rank/equipment image assets load.
- Global pause removes the long orbit track and restores the static grid, cancels sticker animation, disables replay and clears every pending text reveal. Resume re-enables motion.
- WebKit inspection found that a fully clipped headline could remain pending despite being in the viewport. A requestAnimationFrame-bounded layout check now reveals unseen in-view elements alongside IntersectionObserver.
- Super Shy is labeled ON REPEAT / MY FAVORITE and links to the official music video; no embedded autoplay. Fourteen original fan-sticker instances decorate the Haerin card; replay was exercised.
- Rank labels remain 大师 / 完美黄金 S / 神话. Apex and VALORANT use game-emblem assets; Gold S is explicitly marked original illustrative artwork. Gear is Razer Viper V4 Pro and IQUNIX EV63, with labeled illustrative silhouettes.
- Source review confirmed reduced-motion and no-JavaScript static fallbacks. OS reduced-motion preference was not changed.

## MacBook desk / glass / green revision — source review

- The palette now uses lime, cream and forest green, with mint, lavender and ice accents. The production preview was visually checked with this palette.
- `MacbookIntro.astro` builds a CSS 3D laptop and desk. `macbook-intro.ts` uses native scroll to advance the camera and crossfade a styled header/hero replica into the actual page; there is no iframe or downloaded Apple product media.
- Source review confirmed that replicas remove shared class/id/data selectors, omit Canvas/script nodes, use `inert` wrappers, and remove controls from keyboard navigation. Initial non-`#home` hashes disable the long intro, while no-JavaScript and reduced-motion styles leave the real page readable after a short entry bar.
- The intro provides skip and enter-without-motion controls. Pause/resume includes explicit entry-offset compensation; first load, initial deep links, skip, enter-without-motion, and forward/reverse transitions were exercised in the production preview.
- `depth-glass.css` keeps project text/artwork opaque within glass shells. Pointer-driven camera/light effects are bounded, reset on pause/reduced motion, and do not replace the orbit's card transforms. Narrow screens reduce or remove backdrop blur.
- WorkOrbit now selects the static grid at viewport heights of 560px or less. Mode changes below the track compensate its height change. This addresses the source-review concern about front cards clipping in short landscape viewports; the 844×390 production browser check confirmed the static grid and no horizontal page overflow.
- Production browser checks: 1440×1000 desktop, 390×844 mobile, 320×740 narrow mobile, and 844×390 short landscape. Document width matches the viewport at each size. The complete laptop fits the desktop/mobile initial shot; physical scaling uses scale3d so the keyboard depth scales with the chassis. Mobile screen composition shows the full name before the handoff to the actual responsive page.
- At desktop scroll 0 → 800 → 1620, the camera approaches/straightens, then the intro reaches opacity 0 and reveals the real homepage; scrolling back to 870 restores the device scene. Skip lands at the real-page entry; enter-without-motion shows the real hero with motion paused.
- Native coordinate clicks on the global pause control preserve the mobile Off Hours reading position: section top −236.63px before, −236.66px paused, −236.63px resumed. Locator-based clicks were excluded from this measurement because their automatic scroll-into-view changed position before the handler ran. Paused mode leaves zero pending reveals and disables sticker replay.
- Haerin heading is visible after its entrance, the fourteen stickers leave the face/name readable, and all rank/equipment assets load. Short landscape switches the orbit to the static grid; an initial #projects link bypasses the intro.
- System reduced-motion and no-JavaScript fallbacks were source-reviewed; no OS preference was changed. A live OS preference change's exact reading-position behavior is not claimed as browser-tested.
