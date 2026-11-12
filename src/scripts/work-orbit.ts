/** A native-scroll 3D cylinder. No wheel interception, autoplay, or scroll trapping. */
function initWorkOrbits() {
for (const section of document.querySelectorAll<HTMLElement>('[data-work-orbit]')) {
  if (section.dataset.orbitInitialized) continue;
  section.dataset.orbitInitialized = 'true';
  const track = section.querySelector<HTMLElement>('[data-orbit-track]')!;
  const stage = section.querySelector<HTMLElement>('[data-orbit-stage]')!;
  const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-orbit-card]'));
  const legacyHashes = new Set(Array.from(section.querySelectorAll<HTMLElement>('[data-orbit-legacy-anchor]'), anchor => `#${anchor.id}`));
  const count = section.querySelector<HTMLElement>('[data-orbit-count]');
  const label = section.querySelector<HTMLElement>('[data-orbit-label]');
  const progressBar = section.querySelector<HTMLElement>('[data-orbit-progress]');
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const shortViewport = matchMedia('(max-height: 560px)');
  const abort = new AbortController();
  const signal = abort.signal;
  let enabled = false, frame = 0, legacyFrame = 0, active = -2, current = 0, target = 0;
  let requestedIndex: number | null = null;
  let top = 0, distance = 1, radius = 300, stickyTop = 75;
  const maxTurn = (cards.length - 1) * 360 / cards.length;
  // Leave the opening capsule alone, then reveal each chapter just before its turn.
  const firstChapter = .18, lastChapter = .93, revealDuration = .10;
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  const orbitProgress = (progress: number) => clamp((progress - firstChapter) / (lastChapter - firstChapter), 0, 1);
  const chapterPosition = (index: number) => firstChapter + index / (cards.length - 1) * (lastChapter - firstChapter);
  function measure() {
    if (root.dataset.introProjecting === 'true') return;
    stickyTop = Math.round(document.querySelector<HTMLElement>('.site-header')?.offsetHeight || 75);
    section.style.setProperty('--orbit-sticky-top', `${stickyTop}px`);
    top = track.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
    radius = clamp(stage.clientWidth * .3, 126, 410);
    if (stage.clientWidth < 600) radius = clamp(stage.clientWidth * .34, 112, 185);
  }
  function setFront(index: number) {
    if (active === index) return;
    active = index;
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (label) label.textContent = index < 0 ? 'SCROLL TO REVEAL' : cards[index].dataset.chapterLabel || '';
    cards.forEach((card, i) => {
      card.dataset.orbitFront = String(i === index);
      // All six real chapters remain available to screen-reader navigation.
      card.removeAttribute('aria-hidden');
      if (i === index) card.setAttribute('aria-current', 'true'); else card.removeAttribute('aria-current');
    });
  }
  function paint() {
    const turn = orbitProgress(current);
    section.style.setProperty('--orbit-opening', String(clamp((current - .05) / .5, 0, 1)));
    section.style.setProperty('--orbit-wall-turn', `${(current - .5) * 18}deg`);
    section.dataset.orbitDark = String(current > .28);
    cards.forEach((card, index) => {
      const entrance = clamp((current - chapterPosition(index) + revealDuration) / revealDuration, 0, 1);
      const reveal = entrance * entrance * (3 - 2 * entrance);
      const angle = index * 360 / cards.length - turn * maxTurn;
      const radians = angle * Math.PI / 180;
      const x = Math.sin(radians) * radius * (.3 + reveal * .7);
      const z = Math.cos(radians) * radius * reveal - (1 - reveal) * 150;
      // An inclined orbit gives the cards a visible rising and falling path.
      const y = Math.sin(radians) * -95 - Math.cos(radians) * 12 + (index % 2 ? -8 : 8) + (1 - reveal) * 100;
      // Each card remains readable while its yaw visibly follows the cylinder.
      const yaw = Math.sin(radians) * 42 + (1 - reveal) * 24;
      card.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateY(${yaw.toFixed(2)}deg) scale(${(.45 + reveal * .55).toFixed(3)})`;
      // Scroll owns the entire entrance, so reverse scrolling folds cards away too.
      card.style.opacity = reveal.toFixed(3);
      card.style.filter = `brightness(${(.68 + (Math.cos(radians) + 1) * .16).toFixed(3)})`;
      card.style.pointerEvents = reveal > .95 && Math.cos(radians) > -.1 ? 'auto' : 'none';
    });
    if (progressBar) progressBar.style.transform = `scaleX(${current})`;
    setFront(current <= firstChapter - revealDuration ? -1 : Math.round(turn * (cards.length - 1)));
  }
  function tick() {
    frame = 0;
    if (!enabled || document.hidden) return;
    current += (target - current) * .2;
    if (Math.abs(target - current) < .0003) current = target;
    paint();
    if (current !== target) frame = requestAnimationFrame(tick);
  }
  function update() {
    if (!enabled || root.dataset.introProjecting === 'true') return;
    target = clamp((scrollY - top + stickyTop) / distance, 0, 1);
    if (!frame) frame = requestAnimationFrame(tick);
  }
  function syncMode() {
    const next = !reduced.matches && !shortViewport.matches && root.dataset.motion !== 'paused' && CSS.supports('transform-style', 'preserve-3d');
    if (next === enabled) return;
    const bounds = track.getBoundingClientRect();
    const restoreView = enabled && !next && bounds.top < stickyTop && bounds.bottom > stickyTop + 100;
    const preservePastView = bounds.bottom <= stickyTop;
    enabled = next;
    cancelAnimationFrame(frame); frame = 0;
    section.classList.toggle('orbit-enabled', enabled);
    if (!enabled) { delete section.dataset.orbitDark; section.style.removeProperty('--orbit-opening'); }
    if (enabled) { measure(); target = clamp((scrollY - top + stickyTop) / distance, 0, 1); current = target; active = -2; paint(); }
    else {
      cards.forEach(card => { card.removeAttribute('style'); card.removeAttribute('aria-hidden'); card.removeAttribute('aria-current'); });
      if (restoreView) window.scrollTo({ top: Math.max(0, track.getBoundingClientRect().top + scrollY - stickyTop), behavior: 'instant' });
    }
    if (preservePastView) {
      const delta = track.getBoundingClientRect().height - bounds.height;
      if (Math.abs(delta) > 1) window.scrollTo({ top: Math.max(0, scrollY + delta), behavior: 'instant' });
    }
  }
  function go(delta: number) {
    if (!enabled || root.dataset.introProjecting === 'true') return;
    measure();
    // Buttons address exact chapters; scrolling remains the sole animation timeline.
    const atOpening = target < firstChapter - .0003;
    const base = requestedIndex ?? (atOpening ? (delta > 0 ? -1 : 0) : Math.round(orbitProgress(target) * (cards.length - 1)));
    const index = (base + delta + cards.length) % cards.length;
    requestedIndex = index;
    window.scrollTo({ top: top - stickyTop + distance * chapterPosition(index), behavior: 'smooth' });
  }
  function restoreLegacyLink() {
    if (!legacyHashes.has(location.hash)) return;
    // Old detail bookmarks now open WORK; the HTML aliases also work without JS.
    history.replaceState(history.state, '', `#${section.id}`);
    cancelAnimationFrame(legacyFrame);
    legacyFrame = requestAnimationFrame(() => {
      legacyFrame = 0;
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight || 0;
      window.scrollTo({ top: Math.max(0, section.getBoundingClientRect().top + scrollY - headerHeight), behavior: 'instant' });
      if (enabled) { measure(); update(); }
    });
  }
  section.querySelector('[data-orbit-prev]')?.addEventListener('click', () => go(-1), { signal });
  section.querySelector('[data-orbit-next]')?.addEventListener('click', () => go(1), { signal });
  window.addEventListener('scroll', update, { passive: true, signal });
  window.addEventListener('hashchange', restoreLegacyLink, { signal });
  window.addEventListener('scrollend', () => { requestedIndex = null; }, { signal });
  window.addEventListener('wheel', () => { requestedIndex = null; }, { passive: true, signal });
  window.addEventListener('touchstart', () => { requestedIndex = null; }, { passive: true, signal });
  window.addEventListener('portfolio:layout', () => { if (enabled) { measure(); update(); } }, { signal });
  window.addEventListener('resize', () => { if (enabled) { measure(); update(); } }, { passive: true, signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else update(); }, { signal });
  reduced.addEventListener('change', syncMode, { signal });
  shortViewport.addEventListener('change', syncMode, { signal });
  const modeObserver = new MutationObserver(syncMode);
  modeObserver.observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  // Re-measure when preceding content/fonts change layout, without a polling loop.
  const resizeObserver = new ResizeObserver(() => { if (enabled) { measure(); update(); } });
  resizeObserver.observe(document.body);
  syncMode();
  restoreLegacyLink();
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame); cancelAnimationFrame(legacyFrame); abort.abort(); modeObserver.disconnect(); resizeObserver.disconnect();
    section.classList.remove('orbit-enabled'); delete section.dataset.orbitInitialized; delete section.dataset.orbitDark;
    cards.forEach(card => { card.removeAttribute('style'); card.removeAttribute('aria-hidden'); card.removeAttribute('aria-current'); });
  }, { once: true });
}
}
initWorkOrbits();
window.addEventListener('pageshow', event => { if (event.persisted) initWorkOrbits(); });
export {};
