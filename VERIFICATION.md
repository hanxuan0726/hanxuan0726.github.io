# Redesign verification — 2026-11-11

The portfolio remains an Astro static site for root-path GitHub Pages. Dependency inputs and the Pages deployment workflow are unchanged. Checks below distinguish the current implementation, measured browser observations, and earlier regression evidence; they are not a blanket pass for every later edit.

## Current implementation — source and asset review

- The intro depicts the specified 14-inch M5 MacBook Pro. One real `.site-frame` DOM tree is moved into the laptop screen, with a height-preserving placeholder at its normal location. The script measures the screen aperture and restores that same node when the projected viewport reaches a 1:1 geometric match. There is no cloned homepage, screenshot substitute, or iframe.
- The projected page is temporarily `inert`; release restores interaction. Initial deep links, skip controls, pause and reduced-motion modes have explicit release/bypass paths. The final distance calculation uses actual bounding rectangles instead of rounded layout heights.
- WORK contains two real projects represented by six chapters. Only the orbit and its static-card fallback remain; expanded project details and card navigation were removed. Legacy detail hashes resolve to markers in the WORK section. Project source data remains in `src/data/site.ts`.
- Static orbit fallback applies when paused, reduced motion is requested, the viewport is at most 560px tall, or JavaScript is unavailable. Track-height compensation is implemented for mode changes below WORK.
- Travel data contains 22 China destinations and 4 overseas countries: 26 destinations in total. Shanghai is a separate HOME origin, outside that count; Nanchang remains roots / 老家. Countries and provinces use representative anchors, and arcs are illustrative connections rather than flight records.
- HaerinBurst now renders 14 instances from 10 original transparent PNGs supplied by the official LINE collection THE POWERPUFF GIRLS X NEWJEANS. All 10 file hashes, PNG dimensions/transparency and all 14 component references were checked locally. No old imitation SVG remains referenced by the component. See [OFFICIAL-STICKERS.md](public/OFFICIAL-STICKERS.md) for exact sources.
- Rank labels remain 大师 / 完美黄金 S / 神话. Gold S now uses the official classic icon from `static.pwesports.cn/esportsadmin/esports/pwa/rank/icons/s-gold.png`; the official Perfect World application bundle maps it to its gold tier. No season is inferred. Apex and VALORANT retain their documented game-emblem assets.
- Equipment now uses the brands' product images: `viper-v4-pro-official.png` and `iqunix-ev63-official.jpg`. The product models are user-provided; the displayed product colors do not assert the user's owned colors. Source URLs and unchanged-image records are in `public/images/gear/sources.json`.
- Lime, cream and forest green are accented with mint, lavender and ice. Glass shells preserve opaque artwork/text surfaces. Fine-pointer camera/light effects are bounded and reset on pause/reduced motion; narrow screens reduce or remove backdrop blur.

## Latest observed intro geometry

The main agent reported these local browser measurements during the single-DOM revision. The desktop measurement was taken before the final fractional-distance refinement. The mobile handoff was repeated after that refinement and the scroll-anchoring fix.

| Viewport | Observation |
| --- | --- |
| 1280×720 desktop | Across `scrollY` 1080 → 1152, the real header top changed from 19.004px to 19.000px at handoff. |
| 390×844 mobile | At normalized intro progress 0.968, the projected screen rectangle was x=0, y=0, width=390, height=844; the real header top was 11px. |
| 390×844 mobile | After handoff at `scrollY` 1352, header top was 9.398px, consistent with the additional 1.602px of native scrolling. |

These inspected states contained exactly one `.site-frame` and no horizontal page overflow. They support the measured alignment at those positions, not a complete responsive or accessibility regression pass.

## Final local regression observations

- 390×844 handoff was repeated after disabling scroll anchoring for the intro track: scrollY 1308 → 1352, header top 11 → 9.398px. The 1.602px difference exactly matches native scrolling beyond the 1350.398px scene end. One live `.site-frame`, no placeholder after release, no horizontal overflow.
- Desktop reverse scrolling restored the same live page to the screen with the same geometry. The live canvas stays continuous and uses untransformed layout dimensions.
- Keyboard activation of “Skip to content” reached #main with the intro bypassed; “Enter without motion” switched to paused mode and removed the placeholder. 320×740 Skip Intro reached the real header at top 11px with no horizontal overflow.
- At 844×390, the old #orbit-project-so101-act link normalized to #projects. WORK rendered six static cards, no expanded details and no horizontal overflow.
- At 1440×1000, all 14 official sticker instances and both official product images loaded. Replay entered the bursting state. A native pointer interaction changed the product's 3D matrix and the rig tilt value; no console warnings/errors were recorded.
- Selecting Jiangsu and Hainan switched the map to China and selected the corresponding destination. The DOM contained 22 China buttons, one Jiangsu, one Hainan and exactly one Gansu.

## Earlier completed checks

These checks were completed before the latest portal, card-content and official-asset replacements. They remain historical regression evidence and should not be read as fresh checks of those replacements.

- Official Node 24.22.2 runtime SHA256 verified; `npm ci` completed. `npm run check:content` and `npm run build` passed, including Astro/TypeScript with 0 errors, 0 warnings and 0 hints, prerendering, identity-in-H1 and root-relative resource checks.
- Browser inspections at 1440×1000, 390×844, 320×740 and 844×390 reported no horizontal page scrolling. The short-landscape orbit used the static grid. Self-hosted fonts and the two project concept images loaded.
- Research accordions, copying the email, contrast persistence, map World/China buttons, keyboard entry into China and Escape back to World were exercised. Selecting Nanchang updated the roots label; Shanghai HOME cleared destination selection.
- Pausing before switching the map kept its entrance visible. Deferred text reveals were cleared on pause. A WebKit reveal issue was addressed with a requestAnimationFrame-bounded in-view check alongside IntersectionObserver.
- Native-coordinate global pause/resume preserved the earlier mobile Off Hours position: section top −236.63px → −236.66px → −236.63px. Locator clicks were excluded from that measurement because their scroll-into-view behavior changed position before the handler.
- Sticker replay and its paused disabled state were exercised using the earlier artwork. Super Shy linked to the official MV without embedded autoplay. The licensed Haerin portrait loaded and rank labels matched the user's exact wording.
- The inspected earlier browser session reported no console errors. Earlier build and diff checks passed.

## Remaining QA and scope limits

- Reduced-motion and no-JavaScript behavior have been source-reviewed; OS reduced-motion was not changed in the recorded checks. Exact reading-position preservation during a live OS preference change is not claimed as browser-tested.
- Map hover drill-in was source-reviewed; click/keyboard equivalents were exercised. No browser hover-only action was available during the earlier inspection.
- Missing personal portrait, CV, education dates, publications and project URLs have not been fabricated. Research graphics remain labeled concept illustrations.
- Existing npm audit reports 5 affected build/development packages. Deployment serves static HTML/CSS/JS without an Astro server or image optimizer; dependency upgrades remain separate maintenance work.
- A preview or draft pull request does not replace the live GitHub Pages site. Pages publication follows the existing main-branch workflow.
