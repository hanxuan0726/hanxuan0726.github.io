/** A physical CSS3D desk, approaching the actual current portfolio without an iframe. */
function initMacbookIntro() {
  const candidate = document.querySelector<HTMLElement>('[data-macbook-intro]');
  if (!candidate || candidate.dataset.introInitialized) return;
  const intro: HTMLElement = candidate;
  intro.dataset.introInitialized = 'true';
  const stage = intro.querySelector<HTMLElement>('[data-intro-stage]')!;
  const display = intro.querySelector<HTMLElement>('[data-intro-display]')!;
  const screen = intro.querySelector<HTMLElement>('[data-intro-screen]')!;
  const desktopScreenTemplate = screen.firstElementChild?.cloneNode(true) as HTMLElement | undefined;
  const handoff = intro.querySelector<HTMLElement>('[data-intro-handoff]')!;
  const progressBar = intro.querySelector<HTMLElement>('[data-intro-progress]');
  const controls = intro.querySelector<HTMLElement>('.intro-bottom-bar');
  const portfolio = document.querySelector<HTMLElement>('.site-frame');
  const entry = document.getElementById('portfolio-content') || portfolio;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const abort = new AbortController();
  const signal = abort.signal;
  const deepEntry = Boolean(location.hash && location.hash !== '#home');
  let enabled = false, frame = 0, rebuilding = false, firstModeSync = true;
  let start = 0, distance = 1, baseScale = .55, finalScale = 1.7;
  const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };
  const styleNames = ['display','position','top','right','bottom','left','width','height','min-width','max-width','min-height','max-height','box-sizing','flex','flex-direction','flex-wrap','flex-shrink','flex-grow','flex-basis','gap','row-gap','column-gap','grid-template-columns','grid-template-rows','grid-column','grid-row','align-items','align-self','justify-content','justify-items','padding-top','padding-right','padding-bottom','padding-left','margin-top','margin-right','margin-bottom','margin-left','border-top','border-right','border-bottom','border-left','border-radius','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-transform','text-align','text-decoration','color','background-color','background-image','box-shadow','overflow','object-fit','object-position','aspect-ratio','white-space','writing-mode','vertical-align','z-index'];
  function copyRenderedNode(source: Node): Node | null {
    if (!(source instanceof Element)) return source.cloneNode(false);
    if (source.tagName === 'CANVAS' || source.tagName === 'SCRIPT') return null;
    const clone = source.cloneNode(false) as HTMLElement | SVGElement;
    // No shared selectors survive: other page scripts can only discover the real hero/header.
    for (const attr of Array.from(clone.attributes)) if (attr.name === 'id' || attr.name === 'class' || attr.name.startsWith('data-') || attr.name.startsWith('aria-') || attr.name === 'tabindex') clone.removeAttribute(attr.name);
    const styles = getComputedStyle(source);
    styleNames.forEach(name => clone.style.setProperty(name, styles.getPropertyValue(name)));
    clone.style.setProperty('animation', 'none'); clone.style.setProperty('transition', 'none');
    clone.style.setProperty('opacity', '1'); clone.style.setProperty('clip-path', 'none');
    clone.style.setProperty('translate', 'none'); clone.style.setProperty('rotate', 'none');
    if (!(source instanceof SVGElement)) clone.style.setProperty('transform', 'none');
    if (styles.position === 'sticky' || styles.position === 'fixed') { clone.style.position = 'relative'; clone.style.top = 'auto'; }
    if (source.matches('.motion-toggle, .motion-reading-progress')) clone.style.display = 'none';
    if (source.matches('a, button, input, select, textarea')) clone.setAttribute('tabindex', '-1');
    for (const child of Array.from(source.childNodes)) { const copied = copyRenderedNode(child); if (copied) clone.append(copied); }
    return clone;
  }
  function rebuildReplica() {
    if (!portfolio || rebuilding) return;
    rebuilding = true;
    const header = portfolio.querySelector(':scope > .site-header');
    const hero = portfolio.querySelector('main > .hero');
    if (!header || !hero) { rebuilding = false; return; }
    const replica = document.createElement('div');
    replica.setAttribute('aria-hidden', 'true'); replica.inert = true;
    replica.style.width = `${portfolio.clientWidth}px`;
    replica.style.background = getComputedStyle(hero).backgroundColor;
    const headerCopy = copyRenderedNode(header), heroCopy = copyRenderedNode(hero);
    if (headerCopy) replica.append(headerCopy); if (heroCopy) replica.append(heroCopy);
    if (innerWidth < 760 && desktopScreenTemplate) {
      // A laptop keeps its desktop page composition even when the viewer is on a phone.
      const desktopPage = desktopScreenTemplate.cloneNode(true) as HTMLElement;
      desktopPage.style.backgroundColor = getComputedStyle(hero).backgroundColor;
      desktopPage.style.color = getComputedStyle(hero).color;
      screen.replaceChildren(desktopPage);
      screen.style.width = '966px';
      screen.style.transform = `scale(${display.clientWidth / 966})`;
    } else {
      screen.replaceChildren(replica);
      screen.style.width = `${portfolio.clientWidth}px`;
      screen.style.transform = `scale(${display.clientWidth / portfolio.clientWidth})`;
    }
    const fullPage = replica.cloneNode(true) as HTMLElement;
    fullPage.style.border = getComputedStyle(portfolio).border;
    handoff.replaceChildren(fullPage);
    intro.style.setProperty('--intro-frame-top', `${parseFloat(getComputedStyle(portfolio).marginTop) || 0}px`);
    rebuilding = false;
  }
  function measure() {
    start = intro.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, intro.offsetHeight - stage.offsetHeight);
    baseScale = Math.min(innerWidth / (innerWidth < 760 ? 1700 : 1900), innerHeight / 1900);
    finalScale = Math.max(innerWidth / 966, innerHeight / 609) * 1.12;
  }
  function render() {
    frame = 0;
    if (!enabled || document.hidden) return;
    const p = clamp((scrollY - start) / distance);
    const camera = smooth((p - .06) / .81);
    const close = Math.pow(camera, 1.45);
    intro.style.setProperty('--intro-camera-t', String(camera));
    intro.style.setProperty('--intro-scale', String(baseScale + (finalScale - baseScale) * close));
    intro.style.setProperty('--intro-rx', `${-8 * (1 - camera)}deg`);
    intro.style.setProperty('--intro-ry', `${(innerWidth < 760 ? -18 : -25) * (1 - camera)}deg`);
    intro.style.setProperty('--intro-rz', `${-7 * (1 - camera)}deg`);
    intro.style.setProperty('--intro-x', `${(innerWidth < 760 ? 0 : innerWidth * .055) * (1 - camera)}px`);
    intro.style.setProperty('--intro-y', `${-innerHeight * .08 * (1 - camera) + 5 * finalScale * camera}px`);
    intro.style.setProperty('--intro-label-opacity', String(1 - smooth(p / .26)));
    intro.style.setProperty('--intro-desk-opacity', String(1 - smooth((p - .36) / .42)));
    intro.style.setProperty('--intro-handoff-opacity', String(smooth((p - .81) / .12)));
    intro.style.setProperty('--intro-stage-opacity', String(1 - smooth((p - .94) / .06)));
    intro.style.setProperty('--intro-controls-opacity', String(1 - smooth((p - .78) / .13)));
    if (progressBar) progressBar.style.transform = `scaleX(${p})`;
    if (controls) controls.inert = p > .9;
  }
  function schedule() { if (enabled && !frame) frame = requestAnimationFrame(render); }
  function syncMode() {
    const initialSync = firstModeSync; firstModeSync = false;
    const next = !deepEntry && !reduced.matches && root.dataset.motion !== 'paused' && CSS.supports('transform-style','preserve-3d');
    if (enabled === next) return;
    const entryBefore = entry?.getBoundingClientRect().top ?? 0;
    const wasPastIntro = !initialSync && (enabled ? scrollY > start + distance - 5 : Boolean(entry && entryBefore < innerHeight));
    enabled = next; cancelAnimationFrame(frame); frame = 0;
    intro.classList.toggle('intro-enabled', enabled);
    if (enabled) { measure(); rebuildReplica(); }
    if (entry && wasPastIntro) {
      const delta = entry.getBoundingClientRect().top - entryBefore;
      if (Math.abs(delta) > 1) window.scrollTo({ top: scrollY + delta, behavior: 'instant' });
    } else if (!enabled && entry && scrollY > 0 && entryBefore > 0) {
      window.scrollTo({ top: Math.max(0, entry.getBoundingClientRect().top + scrollY), behavior: 'instant' });
    }
    if (enabled) render();
  }
  function skip(event?: Event) {
    event?.preventDefault();
    if (!entry) return;
    window.scrollTo({ top: entry.getBoundingClientRect().top + scrollY, behavior: 'instant' });
    render(); entry.focus({ preventScroll: true });
  }
  intro.querySelector('[data-intro-skip]')?.addEventListener('click', skip, { signal });
  intro.querySelector('[data-intro-still]')?.addEventListener('click', () => {
    const globalPause = document.getElementById('page-motion-toggle');
    if (root.dataset.motion !== 'paused' && globalPause) globalPause.click();
    syncMode(); skip();
  }, { signal });
  window.addEventListener('scroll', schedule, { passive: true, signal });
  window.addEventListener('resize', () => { if (enabled) { measure(); rebuildReplica(); render(); } }, { passive: true, signal });
  document.addEventListener('visibilitychange', schedule, { signal });
  reduced.addEventListener('change', syncMode, { signal });
  const observer = new MutationObserver(records => {
    if (records.some(record => record.attributeName === 'data-theme') && enabled) rebuildReplica();
    syncMode();
  });
  observer.observe(root, { attributes: true, attributeFilter: ['data-motion','data-theme'] });
  syncMode();
  document.fonts.ready.then(() => { if (!signal.aborted && enabled) { rebuildReplica(); measure(); render(); } });
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); observer.disconnect(); abort.abort(); delete intro.dataset.introInitialized; }, { once: true });
}
initMacbookIntro();
window.addEventListener('pageshow', event => { if (event.persisted) initMacbookIntro(); });
export {};
