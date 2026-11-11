/** Editorial motion: native scrolling, one-shot reveals, and bounded pointer response. */
function initEditorialMotion() {
  const root = document.documentElement;
  if (root.dataset.editorialMotion === 'ready') return;
  root.dataset.editorialMotion = 'ready';
  const abort = new AbortController();
  const signal = abort.signal;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const hero = document.querySelector<HTMLElement>('.hero');
  const header = document.querySelector<HTMLElement>('.site-header');
  const animations = new Set<Animation>();
  let enabled = false;
  let scrollFrame = 0;
  let pointerFrame = 0;
  let pointer: { el: HTMLElement; x: number; y: number; type: 'magnet' | 'tilt' } | null = null;
  const progress = document.createElement('div');
  progress.className = 'motion-reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  header?.append(progress);

  type Reveal = { el: HTMLElement; kind: string; delay: number; seen: boolean };
  const reveals: Reveal[] = [];
  const register = (selector: string, kind: string, stagger = 0) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
      el.dataset.motionKind = kind;
      reveals.push({ el, kind, delay: (index % 4) * stagger, seen: false });
    });
  };
  register('.about-grid h2, .research-heading h2, .projects-heading h2, .travel-map-heading h2, .off-hours-heading h2, .contact-title-link h2', 'headline');
  register('.section-label, .education-strip', 'rule');
  register('.research-list > .research-item', 'row', 85);
  register('.project-figure', 'image');
  register('.project-copy', 'copy', 90);
  register('.haerin-portrait', 'portrait');
  register('.haerin-corner h3, .gaming-intro h3', 'headline', 100);
  register('.game-rank, .rig-rank', 'rank', 95);

  function play(el: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) {
    if (!enabled || typeof el.animate !== 'function') return;
    const animation = el.animate(frames, { ...options, fill: 'backwards' });
    animations.add(animation);
    const forget = () => animations.delete(animation);
    animation.addEventListener('finish', forget, { once: true });
    animation.addEventListener('cancel', forget, { once: true });
  }
  function reveal(item: Reveal) {
    if (item.seen) return;
    item.seen = true;
    item.el.dataset.motionState = 'seen';
    observer?.unobserve(item.el);
    const kind = item.kind;
    let frames: Keyframe[];
    let duration = 850;
    if (kind === 'headline') {
      frames = [{ clipPath: 'inset(0 0 100% 0)', transform: 'translateY(40px)' }, { clipPath: 'inset(0 0 -12% 0)', transform: 'translateY(0)' }];
      duration = 1050;
    } else if (kind === 'image') {
      const reverse = item.el.closest('.project-reverse');
      frames = [{ clipPath: reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }];
      duration = 1100;
    } else if (kind === 'rule') {
      frames = [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }];
      duration = 900;
    } else if (kind === 'portrait') {
      frames = [{ opacity: .2, transform: 'translateY(38px) rotate(-9deg) scale(.94)' }, { opacity: 1, transform: 'translateY(0) rotate(-3deg) scale(1)' }];
      duration = 1000;
    } else if (kind === 'row' || kind === 'rank') {
      frames = [{ opacity: .12, transform: `translateX(${kind === 'rank' ? '32' : '-32'}px)` }, { opacity: 1, transform: 'translateX(0)' }];
      duration = 720;
    } else {
      frames = [{ opacity: .1, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }];
    }
    play(item.el, frames, { duration, delay: item.delay, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      const item = reveals.find(candidate => candidate.el === entry.target);
      if (item) reveal(item);
    }
  }, { threshold: .04, rootMargin: '0px 0px -7% 0px' }) : null;

  function resetPointer() {
    pointer = null;
    cancelAnimationFrame(pointerFrame); pointerFrame = 0;
    document.querySelectorAll<HTMLElement>('[data-motion-pointer]').forEach(el => {
      ['--magnet-x', '--magnet-y', '--tilt-x', '--tilt-y', '--glint-x'].forEach(name => el.style.removeProperty(name));
      el.removeAttribute('data-pointer-active');
    });
  }
  function releaseAll() {
    animations.forEach(animation => animation.cancel()); animations.clear();
    for (const item of reveals) { item.seen = true; item.el.dataset.motionState = 'seen'; }
    observer?.disconnect();
    resetPointer();
    cancelAnimationFrame(scrollFrame); scrollFrame = 0;
    hero?.style.removeProperty('--hero-type-y');
    hero?.style.removeProperty('--hero-art-y');
    hero?.style.removeProperty('--hero-art-angle');
  }
  function drawScroll() {
    scrollFrame = 0;
    if (!enabled || document.hidden) return;
    // A fully clipped headline can have a zero intersection in WebKit.
    // Use its layout bounds as a fallback so the entrance cannot hide content.
    for (const item of reveals) {
      if (item.seen) continue;
      const bounds = item.el.getBoundingClientRect();
      if (bounds.top < innerHeight * .93 && bounds.bottom > 0) reveal(item);
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const travelled = Math.max(0, -rect.top);
        const mobileFactor = innerWidth < 760 ? .5 : 1;
        hero.style.setProperty('--hero-type-y', `${-Math.min(28, travelled * .045) * mobileFactor}px`);
        hero.style.setProperty('--hero-art-y', `${Math.min(24, travelled * .07) * mobileFactor}px`);
        hero.style.setProperty('--hero-art-angle', `${Math.min(3.5, travelled * .007) * mobileFactor}deg`);
      }
    }
  }
  const scheduleScroll = () => { if (enabled && !scrollFrame) scrollFrame = requestAnimationFrame(drawScroll); };
  function syncMotion() {
    const next = !reduced.matches && root.dataset.motion !== 'paused';
    if (enabled === next) return;
    enabled = next;
    root.classList.toggle('motion-enabled', enabled);
    if (!enabled) releaseAll();
    else scheduleScroll();
  }

  // Add progressive enhancement only after the observers and safety handlers exist.
  syncMotion();
  for (const item of reveals) {
    const rect = item.el.getBoundingClientRect();
    const alreadyVisible = rect.top < innerHeight * 1.04;
    if (!enabled || !observer || alreadyVisible) {
      item.seen = true; item.el.dataset.motionState = 'seen';
    } else {
      item.el.dataset.motionState = 'pending';
      observer.observe(item.el);
    }
  }
  if (enabled && scrollY < 80 && !location.hash) {
    document.querySelectorAll<HTMLElement>('#hero-title > span').forEach((line, index) => {
      play(line, [{ clipPath: 'inset(100% 0 -4% 0)', transform: 'translateY(24%)' }, { clipPath: 'inset(-4% 0 -4% 0)', transform: 'translateY(0)' }], { duration: 1100, delay: index * 170, easing: 'cubic-bezier(.16,1,.3,1)' });
    });
    const kicker = document.querySelector<HTMLElement>('.hero-kicker');
    if (kicker) play(kicker, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: 250, easing: 'ease-out' });
  }

  function bindPointer(el: HTMLElement, type: 'magnet' | 'tilt') {
    el.dataset.motionPointer = type;
    el.addEventListener('pointermove', event => {
      if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
      pointer = { el, type, x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!enabled || !pointer) return;
        const { el: target, type: mode, x, y } = pointer;
        const box = target.getBoundingClientRect();
        const px = Math.max(-.5, Math.min(.5, (x - box.left) / box.width - .5));
        const py = Math.max(-.5, Math.min(.5, (y - box.top) / box.height - .5));
        target.dataset.pointerActive = 'true';
        if (mode === 'magnet') {
          target.style.setProperty('--magnet-x', `${px * 15}px`);
          target.style.setProperty('--magnet-y', `${py * 12}px`);
        } else {
          target.style.setProperty('--tilt-x', `${-py * 5}deg`);
          target.style.setProperty('--tilt-y', `${px * 5}deg`);
          target.style.setProperty('--glint-x', `${px * 40 + 50}%`);
        }
      });
    }, { passive: true, signal });
    el.addEventListener('pointerleave', resetPointer, { signal });
    el.addEventListener('blur', resetPointer, { signal });
  }
  document.querySelectorAll<HTMLElement>('.round-link, .header-contact').forEach(el => bindPointer(el, 'magnet'));
  document.querySelectorAll<HTMLElement>('.project-figure').forEach(el => bindPointer(el, 'tilt'));
  window.addEventListener('scroll', scheduleScroll, { passive: true, signal });
  window.addEventListener('resize', scheduleScroll, { passive: true, signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) resetPointer(); else scheduleScroll(); }, { signal });
  // Keyboard navigation can never focus content that remains visually concealed.
  document.addEventListener('focusin', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const pending = target.closest<HTMLElement>('[data-motion-state="pending"]');
    const item = reveals.find(candidate => candidate.el === pending);
    if (item) { item.seen = true; item.el.dataset.motionState = 'seen'; observer?.unobserve(item.el); }
  }, { signal });
  reduced.addEventListener('change', syncMotion, { signal });
  finePointer.addEventListener('change', resetPointer, { signal });
  const motionObserver = new MutationObserver(syncMotion);
  motionObserver.observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  window.addEventListener('pagehide', () => {
    releaseAll(); observer?.disconnect(); motionObserver.disconnect(); abort.abort();
    progress.remove(); root.classList.remove('motion-enabled'); delete root.dataset.editorialMotion;
  }, { once: true });
}
initEditorialMotion();
window.addEventListener('pageshow', event => { if (event.persisted) initEditorialMotion(); });
export {};
