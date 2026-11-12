/** A scroll-driven iris, deformed grid and extruded lettering. Native scrolling stays in charge. */
function initContactScene() {
  const section = document.querySelector<HTMLElement>('[data-contact-scene]');
  if (!section || section.dataset.contactReady) return;
  section.dataset.contactReady = 'true';
  const stage = section.querySelector<HTMLElement>('.contact-scene-stage')!;
  const track = section.querySelector<HTMLElement>('.contact-scene-track')!;
  const canvas=section.querySelector<HTMLCanvasElement>('.contact-grid-canvas')!;
  const context=canvas.getContext('2d');
  let gridWidth=0, gridHeight=0;
  if(context)section.classList.add('contact-grid-ready');
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const short = matchMedia('(max-height: 560px)');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const abort = new AbortController();
  const signal = abort.signal;
  let enabled = false, frame = 0, top = 0, distance = 1, sticky = 75, current = 0, target = 0;
  let mouseX = 0, mouseY = 0, aimX = 0, aimY = 0;
  const clamp = (n: number) => Math.min(1, Math.max(0, n));
  const ease = (n: number) => n * n * (3 - 2 * n);
  function measure() {
    if (root.dataset.introProjecting === 'true') return;
    sticky = document.querySelector<HTMLElement>('.site-header')?.offsetHeight || 75;
    section!.style.setProperty('--contact-sticky-top', `${sticky}px`);
    top = track.getBoundingClientRect().top + scrollY;
    distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
  }
  function paint(p: number) {
    const expansion = ease(clamp(p / .7));
    const type = ease(clamp((p - .24) / .34));
    stage.style.setProperty('--portal-p', String(p));
    stage.style.setProperty('--portal-scale', String(.14 + expansion * .86));
    stage.style.setProperty('--portal-type', String(type));
    stage.style.setProperty('--portal-cue', String(1-clamp(p/.18)));
    stage.style.setProperty('--portal-tilt', `${(1-type)*65 - Math.sin(p*Math.PI)*14 + mouseY*9}deg`);
    stage.style.setProperty('--portal-yaw', `${Math.sin(p*Math.PI*2)*15 + mouseX*13}deg`);
    stage.style.setProperty('--portal-roll', `${Math.sin(p*Math.PI*2)*-6 + mouseX*2}deg`);
    stage.style.setProperty('--portal-depth', `${(4 + Math.sin(p*Math.PI)*7) * Math.min(1, stage.clientHeight / 900)}px`);
    const bulge = Math.sin(expansion * Math.PI / 2) * .7;
    if(context) {
      const width=stage.clientWidth, height=stage.clientHeight;
      const ratio=Math.min(devicePixelRatio || 1,2);
      if(width!==gridWidth || height!==gridHeight){
        gridWidth=width;gridHeight=height;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
      }
      context.setTransform(canvas.width/1200,0,0,canvas.height/900,0,0);
      context.clearRect(0,0,1200,900);context.strokeStyle='#101b1670';context.lineWidth=1;
      // Draw the deforming grid in one raster layer; no per-frame SVG path mutations.
      for(let line=0;line<30;line++){
        const vertical=line<17, anchor=(vertical?line:line-17)*75;
        context.beginPath();
        for(let i=0;i<25;i++){
          const x=vertical?anchor:i*50, y=vertical?i*37.5:anchor;
          const dx=x-(600+mouseX*75),dy=y-(450+mouseY*55);
          const influence=bulge*Math.exp(-(dx*dx/250000+dy*dy/180000));
          const px=x+dx*influence,py=y+dy*influence;
          if(i)context.lineTo(px,py);else context.moveTo(px,py);
        }
        context.stroke();
      }
    }
  }
  function tick() {
    frame = 0;
    if (!enabled || root.dataset.motion==='paused' || document.hidden || root.dataset.introProjecting === 'true') return;
    current += (target - current) * .14; mouseX += (aimX - mouseX)*.1; mouseY += (aimY-mouseY)*.1;
    if (Math.abs(target-current)<.0003) current=target;
    paint(current);
    if (current !== target || Math.abs(aimX-mouseX)>.001 || Math.abs(aimY-mouseY)>.001) frame=requestAnimationFrame(tick);
  }
  function update() {
    if (!enabled || root.dataset.motion==='paused' || root.dataset.introProjecting === 'true') return;
    measure();
    target=clamp((scrollY-top+sticky)/distance);
    if (!frame) frame=requestAnimationFrame(tick);
  }
  function sync() {
    enabled=!reduced.matches && !short.matches && root.dataset.motion!=='paused';
    section!.classList.toggle('contact-motion',enabled);
    cancelAnimationFrame(frame); frame=0;
    measure();
    current=target=enabled ? clamp((scrollY-top+sticky)/distance) : 1;
    paint(current);
  }
  stage.addEventListener('pointermove',event=>{if(!enabled||root.dataset.motion==='paused'||!fine.matches)return;const r=stage.getBoundingClientRect();aimX=(event.clientX-r.left)/r.width*2-1;aimY=(event.clientY-r.top)/r.height*2-1;update()},{passive:true,signal});
  stage.addEventListener('pointerleave',()=>{aimX=aimY=0;update()},{signal});
  addEventListener('scroll',update,{passive:true,signal});
  addEventListener('resize',()=>{measure();update()},{passive:true,signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else update()},{signal});
  reduced.addEventListener('change',sync,{signal}); short.addEventListener('change',sync,{signal});
  const modeObserver=new MutationObserver(()=>{if(root.dataset.motion==='paused'){cancelAnimationFrame(frame);frame=0}else update()});
  modeObserver.observe(root,{attributes:true,attributeFilter:['data-motion']});
  sync();
  addEventListener('pagehide',()=>{cancelAnimationFrame(frame);abort.abort();modeObserver.disconnect();delete section!.dataset.contactReady;section!.classList.remove('contact-motion')},{once:true});
}
initContactScene();
addEventListener('pageshow',event=>{if(event.persisted)initContactScene()});
export {};
