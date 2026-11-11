/** One live page, projected into the laptop and restored at an exact 1:1 match. */
function initMacbookIntro() {
  const intro = document.querySelector<HTMLElement>('[data-macbook-intro]');
  const portfolio = document.querySelector<HTMLElement>('.site-frame');
  if (!intro || !portfolio || intro.dataset.introInitialized) return;
  intro.dataset.introInitialized = 'true';
  const stage = intro.querySelector<HTMLElement>('[data-intro-stage]')!;
  const laptop = intro.querySelector<HTMLElement>('[data-intro-laptop]')!;
  const display = intro.querySelector<HTMLElement>('[data-intro-display]')!;
  const screen = intro.querySelector<HTMLElement>('[data-intro-screen]')!;
  const progressBar = intro.querySelector<HTMLElement>('[data-intro-progress]');
  const controls = intro.querySelector<HTMLElement>('.intro-bottom-bar');
  const entry = document.getElementById('portfolio-content')!;
  const homeParent = portfolio.parentNode!;
  const homeMarker = document.createComment('live portfolio returns here');
  homeParent.insertBefore(homeMarker, portfolio);
  const placeholder = document.createElement('div');
  placeholder.className = 'intro-page-placeholder';
  placeholder.setAttribute('aria-hidden', 'true');
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const abort = new AbortController();
  const signal = abort.signal;
  const deepEntry = Boolean(location.hash && location.hash !== '#home');
  let bypassed = false;
  let enabled = false, projected = false, frame = 0, firstModeSync = true, layoutFrame = 0;
  let start = 0, distance = 1, baseScale = .55, finalScale = 1;
  let finalX = 0, finalY = 0, displayHeight = 0, openingHeight = 0;
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };
  function announceLayout() {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
      layoutFrame = 0;
      window.dispatchEvent(new Event('portfolio:layout'));
    });
  }
  function holdPageHeight() {
    if (!projected) return;
    const style = getComputedStyle(portfolio!);
    const height = portfolio!.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    placeholder.style.height = `${height}px`;
  }
  function projectPage() {
    if (projected) return;
    projected = true;
    root.dataset.introProjecting = 'true';
    // Preserve the native scroll track before moving the one real DOM tree.
    homeParent.insertBefore(placeholder, portfolio!);
    holdPageHeight();
    portfolio!.inert = true;
    screen.append(portfolio!);
    holdPageHeight();
  }
  function releasePage() {
    if (!projected) return;
    projected = false;
    homeParent.insertBefore(portfolio!, homeMarker.nextSibling);
    placeholder.remove();
    portfolio!.inert = false;
    delete root.dataset.introProjecting;
    announceLayout();
  }
  function measure() {
    start = intro!.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, intro!.getBoundingClientRect().height - stage.getBoundingClientRect().height);
    const width = document.documentElement.clientWidth;
    const height = stage.clientHeight;
    baseScale = Math.min(width / (width < 760 ? 1700 : 1900), height / 1900);
    // Measure the actual CSS aperture, including its bezel's border offset.
    const bezel = display.offsetParent as HTMLElement;
    const left = display.offsetLeft + bezel.offsetLeft + bezel.clientLeft;
    const top = display.offsetTop + bezel.offsetTop + bezel.clientTop;
    displayHeight = laptop.offsetHeight - top - 17;
    const ratio = display.clientWidth / width;
    finalScale = 1 / ratio;
    finalX = -width / 2 - (left - laptop.offsetWidth / 2) * finalScale;
    finalY = -height / 2 - (top - laptop.offsetHeight / 2) * finalScale;
    openingHeight = Math.max(displayHeight, height / finalScale);
    screen.style.width = `${width}px`;
    screen.style.height = `${Math.max(height, displayHeight / ratio)}px`;
    screen.style.transform = `scale(${ratio})`;
    holdPageHeight();
  }
  function render() {
    frame = 0;
    if (!enabled || document.hidden) return;
    const p = clamp((scrollY - start) / distance);
    if (p >= 1) {
      releasePage();
      intro!.dataset.introComplete = 'true';
      if (controls) controls.inert = true;
      return;
    }
    projectPage();
    delete intro!.dataset.introComplete;
    const camera = smooth((p - .04) / .70);
    const zoom = smooth((p - .06) / .88);
    const aperture = smooth((p - .70) / .24);
    const hardware = 1 - smooth((p - .77) / .16);
    intro!.style.setProperty('--intro-camera-t', String(camera));
    intro!.style.setProperty('--intro-scale', String(baseScale + (finalScale - baseScale) * zoom));
    intro!.style.setProperty('--intro-rx', `${-8 * (1 - camera)}deg`);
    intro!.style.setProperty('--intro-ry', `${(innerWidth < 760 ? -18 : -25) * (1 - camera)}deg`);
    intro!.style.setProperty('--intro-rz', `${-7 * (1 - camera)}deg`);
    intro!.style.setProperty('--intro-x', `${(innerWidth < 760 ? 0 : innerWidth * .055) * (1 - zoom) + finalX * zoom}px`);
    intro!.style.setProperty('--intro-y', `${-stage.clientHeight * .08 * (1 - zoom) + finalY * zoom}px`);
    intro!.style.setProperty('--intro-display-height', `${displayHeight + (openingHeight - displayHeight) * aperture}px`);
    intro!.style.setProperty('--intro-screen-radius', `${13 * (1 - aperture)}px`);
    intro!.style.setProperty('--intro-hardware-opacity', String(hardware));
    intro!.style.setProperty('--intro-label-opacity', String(1 - smooth(p / .26)));
    intro!.style.setProperty('--intro-desk-opacity', String(1 - smooth((p - .36) / .42)));
    intro!.style.setProperty('--intro-controls-opacity', String(1 - smooth((p - .70) / .16)));
    if (progressBar) progressBar.style.transform = `scaleX(${p})`;
    if (controls) controls.inert = p > .86;
  }
  function schedule() { if (enabled && !frame) frame = requestAnimationFrame(render); }
  function syncMode() {
    const initialSync = firstModeSync; firstModeSync = false;
    const next = !deepEntry && !bypassed && !reduced.matches && root.dataset.motion !== 'paused' && CSS.supports('transform-style','preserve-3d');
    if (enabled === next) return;
    const entryBefore = entry.getBoundingClientRect().top;
    const wasPastIntro = !initialSync && (enabled ? scrollY >= start + distance - 1 : entryBefore < innerHeight);
    releasePage();
    enabled = next; cancelAnimationFrame(frame); frame = 0;
    intro!.classList.toggle('intro-enabled', enabled);
    root.classList.toggle('intro-scroll-scene', enabled);
    if (enabled) measure();
    if (wasPastIntro) {
      const delta = entry.getBoundingClientRect().top - entryBefore;
      if (Math.abs(delta) > 1) window.scrollTo({ top: scrollY + delta, behavior: 'instant' });
    } else if (!enabled && scrollY > 0) {
      window.scrollTo({ top: Math.max(0, entry.getBoundingClientRect().top + scrollY), behavior: 'instant' });
    }
    if (enabled) render();
    announceLayout();
  }
  function skip(event?: Event) {
    event?.preventDefault();
    releasePage();
    window.scrollTo({ top: enabled ? start + distance : entry.getBoundingClientRect().top + scrollY, behavior: 'instant' });
    render(); entry.focus({ preventScroll: true });
  }
  intro.querySelector('[data-intro-skip]')?.addEventListener('click', skip, { signal });
  intro.querySelector('[data-intro-still]')?.addEventListener('click', () => {
    const globalPause = document.getElementById('page-motion-toggle');
    if (root.dataset.motion !== 'paused' && globalPause) globalPause.click();
    syncMode(); skip();
  }, { signal });
  // Keyboard skip links and hash navigation must never target a projected coordinate.
  document.addEventListener('click', event => {
    const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (projected && link && !link.matches('[data-intro-skip]')) { bypassed = true; syncMode(); }
  }, { capture: true, signal });
  window.addEventListener('hashchange', () => {
    if (!projected || !location.hash) return;
    bypassed = true; syncMode();
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, { signal });
  window.addEventListener('scroll', schedule, { passive: true, signal });
  window.addEventListener('resize', () => { if (enabled) { measure(); render(); } }, { passive: true, signal });
  document.addEventListener('visibilitychange', schedule, { signal });
  reduced.addEventListener('change', syncMode, { signal });
  const observer = new MutationObserver(syncMode);
  observer.observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  const sizeObserver = new ResizeObserver(holdPageHeight);
  sizeObserver.observe(portfolio);
  syncMode();
  document.fonts.ready.then(() => { if (!signal.aborted && enabled) { measure(); render(); } });
  window.addEventListener('pagehide', () => {
    releasePage(); cancelAnimationFrame(frame); cancelAnimationFrame(layoutFrame);
    observer.disconnect(); sizeObserver.disconnect(); abort.abort(); homeMarker.remove();
    delete intro!.dataset.introInitialized;
  }, { once: true });
}
initMacbookIntro();
window.addEventListener('pageshow', event => { if (event.persisted) initMacbookIntro(); });
export {};
