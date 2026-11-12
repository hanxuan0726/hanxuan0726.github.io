/** Map data and geometry are rendered at build time; no map service is contacted. */
const maps = document.querySelectorAll<HTMLElement>('[data-travel-map]');
for (const map of maps) {
  const controls = Array.from(map.querySelectorAll<HTMLButtonElement>('[data-map-view]'));
  const panels = Array.from(map.querySelectorAll<SVGSVGElement>('[data-map-panel]'));
  const readout = map.querySelector<HTMLElement>('[data-map-readout]');
  const help = map.querySelector<HTMLElement>('[data-map-help]');
  const chinaTarget = map.querySelector<SVGPathElement>('[data-china-target]');
  let hoverTimer: ReturnType<typeof setTimeout> | undefined;
  // Returning with the World button never immediately triggers another hover zoom.
  let hoverLocked = false;
  const clearHover = () => { if (hoverTimer) clearTimeout(hoverTimer); hoverTimer = undefined; };
  const clearSelection = () => {
    delete map.dataset.selected;
    delete map.dataset.homeHighlighted;
    map.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));
  };
  const setView = (view: string, explicit = false) => {
    if (view !== 'world' && view !== 'china') return;
    clearHover(); clearSelection();
    map.dataset.view = view;
    if (explicit && view === 'world') hoverLocked = true;
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mapView === view)));
    panels.forEach(panel => {
      const hidden = panel.dataset.mapPanel !== view;
      panel.dataset.mapHidden = String(hidden);
      panel.setAttribute('aria-hidden', String(hidden));
    });
    if (readout) readout.textContent = view === 'world' ? 'HOME / SHANGHAI · 上海，我的家 → the world' : 'HOME / SHANGHAI · 上海，我的家 → China · Nanchang / roots';
    if (help) help.textContent = view === 'world' ? 'Hover over China to explore. Tap the controls on mobile.' : 'Select a destination to highlight. Use World to zoom out.';
  };
  const selectPlace = (id: string, label: string) => {
    clearSelection();
    map.dataset.selected = id;
    map.querySelectorAll<HTMLElement | SVGElement>('[data-map-place], [data-route-for], [data-place-button]').forEach(el => {
      if (el.dataset.mapPlace === id || el.dataset.routeFor === id || el.dataset.placeButton === id) el.classList.add('is-selected');
    });
    if (readout) readout.textContent = `Shanghai / home → ${label}`;
  };
  controls.forEach(button => button.addEventListener('click', () => setView(button.dataset.mapView || 'world', true)));
  map.querySelector<HTMLButtonElement>('[data-map-home]')?.addEventListener('click', () => {
    clearHover(); clearSelection();
    map.dataset.homeHighlighted = 'true';
    if (readout) readout.textContent = 'SHANGHAI / HOME · 上海是家，也是每一次出发的原点。';
  });
  chinaTarget?.addEventListener('pointerenter', () => {
    if (hoverLocked || map.dataset.view !== 'world' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    hoverTimer = setTimeout(() => setView('china'), 450);
  });
  chinaTarget?.addEventListener('pointerleave', () => { clearHover(); hoverLocked = false; });
  chinaTarget?.addEventListener('click', () => { setView('china'); controls.find(b => b.dataset.mapView === 'china')?.focus({ preventScroll: true }); });
  chinaTarget?.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault(); setView('china');
    controls.find(b => b.dataset.mapView === 'china')?.focus({ preventScroll: true });
  });
  map.addEventListener('keydown', event => {
    if (event.key === 'Escape' && map.dataset.view === 'china') {
      setView('world', true);
      controls.find(b => b.dataset.mapView === 'world')?.focus({ preventScroll: true });
    }
  });
  map.querySelectorAll<SVGGElement>('[data-map-place]').forEach(point => {
    point.addEventListener('pointerenter', () => selectPlace(point.dataset.mapPlace || '', point.dataset.placeLabel || ''));
    point.addEventListener('click', () => selectPlace(point.dataset.mapPlace || '', point.dataset.placeLabel || ''));
  });
  map.querySelectorAll<HTMLButtonElement>('[data-place-button]').forEach(button => {
    button.addEventListener('click', () => {
      if (map.dataset.view !== button.dataset.placeView) setView(button.dataset.placeView || 'world', true);
      selectPlace(button.dataset.placeButton || '', button.dataset.placeLabel || '');
    });
  });
  // Pause decorative animation while the map is off screen, alongside the page's motion control.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { map.dataset.inView = String(entries[0]?.isIntersecting ?? false); }, { rootMargin: '120px' });
    observer.observe(map);
  }
}
export {};
