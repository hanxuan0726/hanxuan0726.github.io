/** Original fan stickers burst once on entry; the song opens its official MV, never autoplay. */
for (const layer of document.querySelectorAll<HTMLElement>('[data-haerin-burst]')) {
  const host = layer.closest<HTMLElement>('.haerin-corner');
  if (!host) continue;
  const stickers = [...layer.querySelectorAll<HTMLElement>('[data-burst-sticker]')];
  const replay = host.querySelector<HTMLButtonElement>('[data-burst-replay]');
  const replayLabel = replay?.querySelector<HTMLElement>('[data-replay-label]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const allowed = () => !reduced.matches && document.documentElement.dataset.motion !== 'paused';
  let inView = false;
  let entered = false;
  let request = 0;
  let animations: Animation[] = [];
  const settle = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
    layer.dataset.burstState = 'settled';
    layer.style.setProperty('--burst-scroll', '0');
  };
  const updateMotion = () => {
    const enabled = allowed();
    layer.dataset.burstStatic = String(!enabled);
    if (replay) { replay.disabled = !enabled; replay.setAttribute('aria-label', enabled ? 'Replay Haerin stickers' : 'Sticker motion is paused'); }
    if (replayLabel) replayLabel.innerHTML = enabled ? 'REPLAY<br>STICKERS' : 'MOTION<br>PAUSED';
    if (!enabled) settle();
  };
  const burst = () => {
    settle();
    if (!allowed()) return;
    const bounds = layer.getBoundingClientRect();
    const originX = bounds.width * .5;
    const originY = bounds.height * .42;
    layer.dataset.burstState = 'bursting';
    animations = stickers.map((sticker, i) => {
      const style = getComputedStyle(sticker);
      const x = parseFloat(style.getPropertyValue('--sticker-x')) / 100 * bounds.width;
      const y = parseFloat(style.getPropertyValue('--sticker-y')) / 100 * bounds.height;
      const turn = parseFloat(style.getPropertyValue('--sticker-turn'));
      const travelX = originX - x, travelY = originY - y;
      const final = `translate(-50%, -50%) rotate(${turn}deg)`;
      return sticker.animate([
        { opacity: 0, transform: `translate(calc(-50% + ${travelX}px), calc(-50% + ${travelY}px)) rotate(${turn - 100}deg) scale(.05)` },
        { opacity: 1, offset: .18 },
        { opacity: 1, transform: `translate(calc(-50% - ${travelX * .08}px), calc(-50% - ${travelY * .08}px)) rotate(${turn + 9}deg) scale(1.12)`, offset: .72 },
        { opacity: 1, transform: final }
      ], { duration: 960 + (i % 3) * 90, delay: i * 36, fill: 'both', easing: 'cubic-bezier(.16,.8,.25,1)' });
    });
  };
  const parallax = () => {
    request = 0;
    if (!inView || !allowed()) return;
    const rect = host.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, (innerHeight * .52 - (rect.top + rect.height * .5)) / innerHeight));
    layer.style.setProperty('--burst-scroll', progress.toFixed(3));
  };
  const schedule = () => { if (!request && inView && allowed()) request = requestAnimationFrame(parallax); };
  updateMotion();
  if (allowed()) layer.dataset.burstState = 'pending';
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (inView && !entered) { entered = true; burst(); }
    schedule();
  }, { threshold: .16 }).observe(host);
  replay?.addEventListener('click', burst);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', updateMotion);
  new MutationObserver(updateMotion).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
}
export {};
