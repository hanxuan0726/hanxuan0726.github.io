/** Fine-pointer camera response. Card transforms remain owned by the scroll orbit. */
function initDepthGlass() {
  const root = document.documentElement;
  if (root.dataset.depthGlassReady === 'true') return;
  root.dataset.depthGlassReady = 'true';
  const abort = new AbortController();
  const signal = abort.signal;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const surfaces = [...document.querySelectorAll<HTMLElement>('.orbit-stage, .gaming-rig')];
  const properties = ['--depth-tilt-x', '--depth-tilt-y', '--depth-light-x', '--depth-light-y'];
  const enabled = () => !reduced.matches && finePointer.matches && root.dataset.motion !== 'paused' && innerWidth >= 760 && !document.hidden;
  let frame = 0;
  let point: { surface: HTMLElement; x: number; y: number } | null = null;
  function reset() {
    cancelAnimationFrame(frame); frame = 0; point = null;
    for (const surface of surfaces) {
      delete surface.dataset.depthActive;
      for (const property of properties) surface.style.removeProperty(property);
    }
  }
  function draw() {
    frame = 0;
    if (!point || !enabled()) return;
    const { surface, x, y } = point;
    const rect = surface.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = Math.max(-.5, Math.min(.5, (x - rect.left) / rect.width - .5));
    const ny = Math.max(-.5, Math.min(.5, (y - rect.top) / rect.height - .5));
    surface.dataset.depthActive = 'true';
    surface.style.setProperty('--depth-light-x', `${((nx + .5) * 100).toFixed(2)}%`);
    surface.style.setProperty('--depth-light-y', `${((ny + .5) * 100).toFixed(2)}%`);
    const degrees = surface.matches('.gaming-rig') ? 12 : 6;
    surface.style.setProperty('--depth-tilt-x', `${(-ny * degrees).toFixed(2)}deg`);
    surface.style.setProperty('--depth-tilt-y', `${(nx * degrees).toFixed(2)}deg`);
  }
  for (const surface of surfaces) {
    surface.addEventListener('pointermove', event => {
      if (!enabled() || event.pointerType === 'touch') return;
      point = { surface, x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(draw);
    }, { passive: true, signal });
    surface.addEventListener('pointerleave', reset, { signal });
    surface.addEventListener('pointercancel', reset, { signal });
  }
  reduced.addEventListener('change', reset, { signal });
  finePointer.addEventListener('change', reset, { signal });
  window.addEventListener('resize', reset, { passive: true, signal });
  document.addEventListener('visibilitychange', reset, { signal });
  // A paused page and a lost pointer both return to the composed, static camera.
  const modeObserver = new MutationObserver(reset);
  modeObserver.observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  window.addEventListener('pagehide', () => {
    reset(); abort.abort(); modeObserver.disconnect(); delete root.dataset.depthGlassReady;
  }, { once: true });
}
initDepthGlass();
window.addEventListener('pageshow', event => { if (event.persisted) initDepthGlass(); });
export {};
