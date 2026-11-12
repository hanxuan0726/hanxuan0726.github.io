const root = document.documentElement;
const contrast = document.querySelector<HTMLButtonElement>('#contrast-toggle');
const updateContrast = () => {
  const dark = root.dataset.theme === 'dark';
  contrast?.setAttribute('aria-pressed', String(dark));
  contrast?.setAttribute('aria-label', dark ? 'Use lime contrast' : 'Use dark contrast');
};
updateContrast();
contrast?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-contrast', root.dataset.theme); } catch { /* Storage is optional. */ }
  updateContrast();
});
const copy = document.querySelector<HTMLButtonElement>('#copy-email');
copy?.addEventListener('click', async () => {
  const status = document.querySelector<HTMLElement>('#copy-status');
  if (!status) return;
  try { await navigator.clipboard.writeText(copy.dataset.email || ''); status.textContent = 'COPIED'; }
  catch { status.textContent = 'Select the email to copy.'; }
});
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-section]'));
let navScheduled = false;
function updateNav() {
  let current = '';
  for (const link of links) {
    const section = document.getElementById(link.dataset.section || '');
    if (section && section.getBoundingClientRect().top <= 160) current = section.id;
  }
  for (const link of links) {
    if (current && link.dataset.section === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  navScheduled = false;
}
window.addEventListener('scroll', () => { if (!navScheduled) { navScheduled = true; requestAnimationFrame(updateNav); } }, { passive: true });
updateNav();

// A local generative field; no WebGL, tracking, or external runtime dependencies.
const canvas = document.querySelector<HTMLCanvasElement>('#motion-field');
const field = document.querySelector<HTMLElement>('.field-art');
const motionButton = document.querySelector<HTMLButtonElement>('#motion-toggle');
const pageMotionButton = document.querySelector<HTMLButtonElement>('#page-motion-toggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = root.dataset.motion === 'paused';
const syncMotion = () => {
  root.dataset.motion = paused ? 'paused' : 'playing';
  motionButton?.setAttribute('aria-pressed', String(paused));
  motionButton?.setAttribute('aria-label', paused ? 'View animated version' : 'View still version');
  if (motionButton) motionButton.innerHTML = `<span aria-hidden="true">${paused ? '▶' : 'Ⅱ'}</span>`;
  pageMotionButton?.setAttribute('aria-pressed', String(paused));
  pageMotionButton?.setAttribute('aria-label', paused ? 'View animated version' : 'View still version');
  if (pageMotionButton) pageMotionButton.innerHTML = `<span aria-hidden="true">${paused ? '▶' : 'Ⅱ'}</span>`;
  root.classList.add('motion-ready');
  };
syncMotion();
// Switching presentation modes reloads at the current chapter. This avoids
// tearing down several composited sticky scenes in one WebKit style update.
function navigateMotion(still: boolean) {
  const url=new URL(location.href);
  if(still)url.searchParams.set('motion','still');else url.searchParams.delete('motion');
  const line=(document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0)+1;
  let chapter='home', visibleHeight=0;
  for(const section of document.querySelectorAll<HTMLElement>('main > section[id]')) {
    const bounds=section.getBoundingClientRect();
    const visible=Math.max(0,Math.min(bounds.bottom,innerHeight)-Math.max(bounds.top,line));
    if(visible>visibleHeight){chapter=section.id;visibleHeight=visible}
  }
  url.hash=chapter;
  location.replace(url.href);
}
const toggleMotion = () => navigateMotion(!paused);
motionButton?.addEventListener('click', toggleMotion);
pageMotionButton?.addEventListener('click', toggleMotion);
reduced.addEventListener('change', () => location.reload());
const context = canvas?.getContext('2d');
if (canvas && field && context) {
  let visible = true;
  let width = 0, height = 0, frame = 0, previousTime = 0, phase = .35;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  let ink = getComputedStyle(field).color;
  function draw() {
    if (!context || !canvas) return;
    context.clearRect(0, 0, width, height);
    const radius = Math.min(width * .34, height * .43);
    const cx = width * .5, cy = height * .49;
    context.strokeStyle = ink;
    context.lineWidth = .85;
    const angle = .6 + Math.sin(phase * .23) * .18 + pointerX * .22;
    const tilt = .32 + pointerY * .18;
    for (let line = 0; line < 50; line++) {
      const u = (line / 50) * Math.PI * 2;
      context.beginPath();
      for (let step = 0; step <= 100; step++) {
        const v = (step / 100) * Math.PI * 2;
        const wave = 1 + .15 * Math.sin(v * 3 + u * 2 + phase * .4);
        const ring = radius * (.72 + .31 * Math.cos(v));
        const x = ring * Math.cos(u) * wave;
        const y = ring * Math.sin(u) * wave;
        const z = radius * .45 * Math.sin(v);
        const rx = x * Math.cos(angle) + z * Math.sin(angle);
        const rz = -x * Math.sin(angle) + z * Math.cos(angle);
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
        const px = cx + rx * 1.38, py = cy + ry;
        if (!step) context.moveTo(px, py); else context.lineTo(px, py);
      }
      context.closePath();
      context.stroke();
    }
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
  function animate(time: number) {
    frame = 0;
    if (paused || !visible || document.hidden) return;
    const delta = previousTime ? Math.min(time - previousTime, 50) : 0;
    previousTime = time;
    phase += delta * .00045;
    pointerX += (targetX - pointerX) * .05; pointerY += (targetY - pointerY) * .05;
    draw();
    frame = requestAnimationFrame(animate);
  }
  function start() { if (!frame && !paused && visible && !document.hidden) frame = requestAnimationFrame(animate); }
  const resize = () => {
    width = canvas.clientWidth; height = canvas.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  };
  field.addEventListener('pointermove', event => {
    if (paused) return;
    const box = field.getBoundingClientRect();
    targetX = ((event.clientX - box.left) / box.width - .5) * 2;
    targetY = ((event.clientY - box.top) / box.height - .5) * 2;
  });
  field.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });
  new MutationObserver(() => { stop(); draw(); start(); }).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  document.addEventListener('visibilitychange', () => { stop(); start(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) start(); else stop(); }).observe(field);
  new ResizeObserver(resize).observe(field);
  new MutationObserver(() => { ink = getComputedStyle(field).color; draw(); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  resize(); field.classList.add('is-active'); start();
}
