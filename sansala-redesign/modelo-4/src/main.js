/* Sansala · Modelo 4 «Definitivo» — prototipo no oficial
   Un solo easing (expo.out ≈ cubic-bezier(.16,1,.3,1)) y tres duraciones. */
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import { CATS, RING, PRODUCTS, catById } from './products.js';

gsap.registerPlugin(ScrollTrigger, Flip);
const D = { s: 0.4, m: 0.8, l: 1.2 }; const E = 'expo.out';
gsap.defaults({ ease: E, duration: D.m });
const IMG = window.__IMG || {};
const src = (n) => IMG[n] || `../prototype/img/w/${n}.webp`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const STATIC = matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('static');
const fine = matchMedia('(pointer: fine)').matches;
const root = document.documentElement;
if (STATIC) root.classList.add('static');
const store = { get: (k, d) => { try { return JSON.parse(sessionStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} } };

/* ───── Contenido ───── */
root.style.setProperty('--logo', `url("${src('sansala_logo')}")`);
$$('[data-img]').forEach((el) => { el.src = src(el.dataset.img); el.decoding = 'async'; });
$$('[data-img-href]').forEach((el) => { el.href = src(el.dataset.imgHref); });
$$('[data-split]').forEach((h) => { h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((l) => `<span class="line"><span>${l.trim()}</span></span>`).join(''); });
const mega = $('.mega'); mega.innerHTML = [...mega.textContent].map((c) => `<span class="ch" aria-hidden="true">${c}</span>`).join('');
const inCat = (id) => PRODUCTS.filter((p) => (id === 'congelados' ? p.fz : p.c === id));
$('.stack').innerHTML = RING.map((r, i) => { const c = { ...catById(r.id), ...r };
  return `<article class="fam" style="--bg:${c.pastel}"><div class="fam-t"><span class="fam-n">${String(i + 1).padStart(2, '0')} / 07</span><div><h3>${c.name}</h3><p>${c.line}</p></div><a class="link" href="#carta" data-f="${r.id}">Ver ${inCat(r.id).length} referencias →</a></div><div class="fam-i"><img src="${src(c.img)}" alt="${c.name}" width="640" height="640" loading="lazy"></div></article>`; }).join('');

/* ───── Scroll suave, anclas, navegación ───── */
let lenis = null;
if (!STATIC) { lenis = new Lenis({ lerp: 0.1 }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
const selectTab = (id) => $$('.tabs [role=tab]').forEach((t) => { const on = t.id === `t-${id}`; t.setAttribute('aria-selected', String(on)); $(`#${t.getAttribute('aria-controls')}`).hidden = !on; });
$('.tabs').addEventListener('click', (e) => { const t = e.target.closest('[role=tab]'); if (t) selectTab(t.id.slice(2)); });
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const el = $(a.getAttribute('href')); if (!el) return; e.preventDefault();
  if (a.dataset.tab) selectTab(a.dataset.tab);
  if (a.dataset.f) setFilter(a.dataset.f, false);
  history.replaceState(null, '', a.getAttribute('href'));
  lenis ? lenis.scrollTo(el, { duration: D.l * 1.4 }) : el.scrollIntoView();
});
const msg = $('.form-msg');
$$('.form').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!f.checkValidity()) { msg.textContent = 'Revisa los campos obligatorios.'; f.reportValidity(); return; }
  msg.textContent = '¡Gracias! Es un prototipo: no se ha enviado ningún dato.'; f.reset();
}));

/* ───── La carta: filtros, búsqueda, FLIP, galería 3D ───── */
const st = store.get('m4', { filter: 'all', mode: 'grid', q: '' });
let filter = st.filter, mode = st.mode, query = norm(st.q);
const save = () => store.set('m4', { filter, mode, q: $('#q').value });
const matches = (p) => (filter === 'all' || (filter === 'congelados' ? p.fz : p.c === filter)) && (!query || norm(`${p.n} ${p.d} ${catById(p.c).name}`).includes(query));
const chips = $('.chips');
chips.innerHTML = [{ id: 'all', name: 'Todo' }, ...CATS, { id: 'congelados', name: '❄ Congelados' }].map((f) => `<button class="chip" data-f="${f.id}">${f.name}</button>`).join('');
const grid = $('.grid');
grid.innerHTML = PRODUCTS.map((p, i) => { const c = catById(p.c);
  return `<li data-i="${i}"><button class="pc" style="--bg:${c.pastel}"><span class="pc-i"><img src="${src(p.img)}" alt="${p.n}" width="640" height="640" loading="lazy"></span><b>${p.n}</b><span>${c.name}${p.fz ? ' · ❄' : ''}</span></button></li>`; }).join('');
const items = $$('li', grid);
const stage = $('.flow-stage'); let list = [], cur = 0;
function layoutFlow(instant) {
  const sp = innerWidth < 768 ? 120 : 200;
  $$('.fl', stage).forEach((el, k) => { const d = k - cur, a = Math.abs(d);
    gsap.to(el, { x: d * sp + Math.sign(d) * (a ? 50 : 0), z: -a * 150, rotationY: gsap.utils.clamp(-55, 55, -d * 35), opacity: a > 3 ? 0 : 1, zIndex: 50 - a, duration: instant || STATIC ? 0 : D.m }); });
  const it = list[cur]; $('#flowName').textContent = it ? it.p.n : 'Sin resultados'; $('#flowDesc').textContent = it ? it.p.d : 'Prueba con otra búsqueda.';
}
function buildFlow() {
  list = PRODUCTS.map((p, i) => ({ p, i })).filter(({ p }) => matches(p)); cur = 0;
  stage.innerHTML = list.map(({ p }, k) => `<button class="fl" data-k="${k}" style="--bg:${catById(p.c).pastel}" aria-label="${p.n}"><img src="${src(p.img)}" alt="" width="640" height="640" loading="lazy"></button>`).join('');
  layoutFlow(true);
}
const flowGo = (d) => { cur = gsap.utils.clamp(0, Math.max(0, list.length - 1), cur + d); layoutFlow(); };
$$('[data-flow]').forEach((b) => b.addEventListener('click', () => flowGo(+b.dataset.flow)));
$('.flow').addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') flowGo(1); if (e.key === 'ArrowLeft') flowGo(-1); if (e.key === 'Enter' && list[cur]) openDetail(list[cur].i, $$('.fl', stage)[cur]); });
let fx = null, fm = false;
stage.addEventListener('pointerdown', (e) => { fx = e.clientX; fm = false; });
stage.addEventListener('pointermove', (e) => { if (fx === null) return; const d = e.clientX - fx; if (Math.abs(d) > 60) { flowGo(d < 0 ? 1 : -1); fx = e.clientX; fm = true; } });
stage.addEventListener('pointerup', (e) => { const moved = fm; fx = null; if (moved) return; const el = e.target.closest('.fl'); if (!el) return; const k = +el.dataset.k; if (k === cur) openDetail(list[k].i, el); else { cur = k; layoutFlow(); } });

function applyFilter(animate) {
  const n = PRODUCTS.filter(matches).length; $('.count').textContent = `${n} ${n === 1 ? 'producto' : 'productos'}`;
  $$('.chip', chips).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === filter)));
  const doFlip = animate && !STATIC && mode === 'grid'; const state = doFlip && Flip.getState(items);
  items.forEach((li) => li.classList.toggle('gone', !matches(PRODUCTS[+li.dataset.i])));
  if (doFlip) Flip.from(state, { duration: 0.6, ease: E, absolute: true, scale: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: D.s }),
    onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: D.s }) });
  buildFlow(); save(); ScrollTrigger.refresh();
}
function setFilter(f, animate = true) { filter = f; applyFilter(animate); }
chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (b) setFilter(b.dataset.f); });
let qt; $('#q').value = st.q; $('#q').addEventListener('input', (e) => { clearTimeout(qt); qt = setTimeout(() => { query = norm(e.target.value.trim()); applyFilter(true); }, 150); });
const modes = $('.modes'); const ind = $('.modes-ind');
const moveInd = (instant) => { const b = $(`[data-mode="${mode}"]`, modes); gsap.to(ind, { x: b.offsetLeft, width: b.offsetWidth, duration: instant || STATIC ? 0 : D.s }); };
function setMode(m) {
  mode = m; $$('[role=tab]', modes).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.mode === m))); moveInd();
  $$('[data-pane]').forEach((p) => { p.hidden = p.dataset.pane !== m; });
  if (m === 'flow') layoutFlow(true);
  if (!STATIC) gsap.from(`[data-pane="${m}"]`, { opacity: 0, y: 24, duration: D.m });
  save(); ScrollTrigger.refresh();
}
modes.addEventListener('click', (e) => { const b = e.target.closest('[data-mode]'); if (b && b.dataset.mode !== mode) setMode(b.dataset.mode); });
grid.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) openDetail(+li.dataset.i, $('.pc-i', li)); });
applyFilter(false); setMode(mode); moveInd(true);
addEventListener('resize', () => { moveInd(true); layoutFlow(true); });

/* ───── Ficha con elemento compartido ───── */
const detail = $('.detail'); const dMedia = $('.d-media'); const dImg = $('img', dMedia); let di = 0, back = null;
function fill(i) {
  const p = PRODUCTS[i], c = catById(p.c); di = i;
  detail.style.setProperty('--bg', c.pastel); dImg.src = src(p.img); dImg.alt = p.n;
  $('#dCat').textContent = c.name; $('#dName').textContent = p.n; $('#dCta').dataset.p = p.n;
  $('.d-chips').innerHTML = p.d.replace(/\.$/, '').split(/,\s*|\s+y\s+/).map((t) => `<span>${t}</span>`).join('') + `<span class="fz">${p.fz ? '❄ Congelado' : 'Fresco · 7 días'}</span>`;
}
function openDetail(i, from) {
  back = document.activeElement; fill(i); detail.hidden = false; lenis?.stop(); $('.d-close').focus({ preventScroll: true });
  if (STATIC) return;
  const r0 = from?.getBoundingClientRect(), r1 = dMedia.getBoundingClientRect();
  if (r0?.width) {
    const g = document.createElement('div');
    Object.assign(g.style, { position: 'fixed', zIndex: 210, left: `${r0.left}px`, top: `${r0.top}px`, width: `${r0.width}px`, height: `${r0.height}px`, borderRadius: '24px', overflow: 'hidden', background: catById(PRODUCTS[i].c).pastel });
    g.innerHTML = `<img src="${dImg.src}" alt="" style="width:100%;height:100%;object-fit:cover">`; document.body.append(g); gsap.set(dMedia, { opacity: 0 });
    gsap.to(g, { left: r1.left, top: r1.top, width: r1.width, height: r1.height, borderRadius: 0, duration: D.l, ease: 'expo.inOut', onComplete: () => { gsap.set(dMedia, { opacity: 1 }); g.remove(); } });
  }
  gsap.fromTo(detail, { opacity: 0 }, { opacity: 1, duration: D.s });
  gsap.from('.d-body > *', { y: 24, opacity: 0, stagger: 0.08, delay: 0.3 });
}
function closeDetail() { gsap.to(detail, { opacity: 0, duration: STATIC ? 0 : D.s, onComplete: () => { detail.hidden = true; gsap.set(detail, { clearProps: 'opacity' }); lenis?.start(); back?.focus?.({ preventScroll: true }); } }); }
$('.d-close').addEventListener('click', closeDetail);
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !detail.hidden) closeDetail(); });
$$('[data-d]').forEach((b) => b.addEventListener('click', () => { const n = (di + +b.dataset.d + PRODUCTS.length) % PRODUCTS.length;
  gsap.timeline().to([dImg, '#dName', '.d-chips'], { opacity: 0, duration: D.s / 2 }).add(() => fill(n)).to([dImg, '#dName', '.d-chips'], { opacity: 1, duration: D.s }); }));
$('#dCta').addEventListener('click', (e) => { $('#altaMsg').value = `Me interesa: ${e.currentTarget.dataset.p}`; closeDetail(); });

/* ───── Plato WebGL ───── */
const PLATE = [['SW-CHICKEN-ROYAL_2', 'Chicken Royal', 'Sándwiches'], ['Bowl-POLLO-FS_2_5', 'Pollo Asado y Bacon', 'Ensaladas'], ['Wrap-SUSHI_2', 'Salmón Sushi Wrap', 'Wraps'],
  ['bagel-salmon-1', 'Bagel de Salmón ASC', 'Especiales'], ['PLANTILLA-FOTOS-WEB-SANSALA-3', 'Noodles con Pollo Teriyaki', 'Microondas'], ['Postre-2', 'Strawberry Cheesecake Cup', 'Postres']];
const plate = $('.plate'); const cap = $('.plate-cap');
function initPlate() {
  let r; try { r = new THREE.WebGLRenderer({ canvas: $('#plate'), antialias: true, alpha: true }); } catch { return null; }
  const tx = PLATE.map(([n]) => { const t = new THREE.TextureLoader().load(src(n)); t.colorSpace = THREE.SRGBColorSpace; return t; });
  const U = { a: { value: tx[0] }, b: { value: tx[1] }, p: { value: 0 }, t: { value: 0 } };
  const m = new THREE.ShaderMaterial({ uniforms: U,
    vertexShader: 'varying vec2 v; void main(){ v = uv; gl_Position = vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D a, b; uniform float p, t; varying vec2 v;
      float h(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 q){ vec2 i = floor(q), f = fract(q); f = f*f*(3.0-2.0*f); return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
      void main(){ float z = n(v*3.0 + t*0.05)*0.6 + n(v*6.0)*0.4; float k = smoothstep(z-0.08, z+0.08, p*1.25-0.12); float d = sin(p*3.1416)*0.08;
        gl_FragColor = mix(texture2D(a, v + (z-0.5)*d), texture2D(b, v - (z-0.5)*d), k);
        #include <colorspace_fragment>
      }` });
  const sc = new THREE.Scene(); sc.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m)); const cam = new THREE.Camera();
  const size = () => { r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(plate.clientWidth, plate.clientWidth, false); }; size(); addEventListener('resize', size);
  let idx = 0;
  setInterval(() => { if (document.hidden || scrollY > innerHeight) return; const j = (idx + 1) % PLATE.length; U.b.value = tx[j];
    gsap.to(cap, { opacity: 0, duration: D.s, onComplete: () => { $('#capName').textContent = PLATE[j][1]; $('#capCat').textContent = PLATE[j][2]; gsap.to(cap, { opacity: 1, duration: D.s }); } });
    gsap.fromTo(U.p, { value: 0 }, { value: 1, duration: D.l * 1.3, ease: 'power2.inOut', onComplete: () => { U.a.value = tx[j]; U.p.value = 0; idx = j; } }); }, 4000);
  root.classList.add('gl');
  return (time) => { U.t.value = time; r.render(sc, cam); };
}

/* ───── Coreografía con scroll (una sola vez al entrar) ───── */
function reveals() {
  $$('[data-group]').forEach((g) => {
    if (g.closest('.hero')) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 82%', toggleActions: 'play none none none' } });
    const lines = $$('.line > span', g); const rest = $$('[data-r]', g);
    if (lines.length) tl.from(lines, { yPercent: 110, duration: D.l, stagger: 0.08 }, 0);
    if (rest.length) tl.from(rest, { y: 24, opacity: 0, stagger: 0.08 }, lines.length ? 0.3 : 0);
  });
  $$('[data-count]').forEach((el) => { const o = { v: 0 }; ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => !el._d && (el._d = 1) && gsap.to(o, { v: +el.dataset.count, duration: D.l * 1.5, onUpdate: () => { el.textContent = Math.round(o.v); } }) }); });
  gsap.from('.mega .ch', { yPercent: 115, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.hablamos', start: 'top 85%', end: 'top 25%', scrub: 0.6 } });
  gsap.from('.grid li:nth-child(-n+8)', { y: 24, opacity: 0, stagger: 0.06, scrollTrigger: { trigger: '.grid', start: 'top 85%', toggleActions: 'play none none none' } });

  /* Hero: el plato crece y se convierte en el fondo de «Método» */
  const cover = () => Math.hypot(innerWidth, innerHeight) / plate.offsetWidth * 2.2;
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true }, defaults: { ease: 'none' } })
    .to('.hero-copy', { y: -40, opacity: 0, duration: 0.3 }, 0).to(cap, { opacity: 0, duration: 0.1 }, 0)
    .to(plate, { scale: cover, duration: 1, ease: 'power2.in' }, 0).to('.plate-fill', { opacity: 1, duration: 0.3 }, 0.6);

  /* Familias apiladas */
  const fams = $$('.fam');
  fams.forEach((f, i) => { if (i < fams.length - 1) gsap.to(f, { scale: 0.94, ease: 'none', scrollTrigger: { trigger: fams[i + 1], start: 'top bottom', end: 'top 10%', scrub: true } }); });

  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    const track = $('.h-track'); const dist = () => track.scrollWidth - innerWidth;
    const svg = $('.h-line'); const path = $('path', svg); let len = 1;
    const draw = () => { const W = track.scrollWidth; svg.setAttribute('width', W); let d = 'M0 60'; for (let x = 0; x < W; x += 640) d += ` C${x + 160} 0 ${x + 480} 120 ${x + 640} 60`; path.setAttribute('d', d); len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len; };
    draw();
    const tw = gsap.to(track, { x: () => -dist(), ease: 'none' });
    const s = ScrollTrigger.create({ trigger: '#metodo', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, animation: tw, invalidateOnRefresh: true, onRefresh: draw, onUpdate: (x) => { path.style.strokeDashoffset = len * (1 - x.progress); } });
    $$('.h-panel .rv').forEach((el) => gsap.timeline({ scrollTrigger: { trigger: el, containerAnimation: tw, start: 'left 85%', toggleActions: 'play none none none' } })
      .to(el, { clipPath: 'inset(0% 0 0 0 round 24px)', duration: D.l }).to($('img', el), { scale: 1, duration: D.l }, 0));
    return () => { s.kill(); tw.kill(); gsap.set(track, { x: 0 }); };
  });
  mm.add('(max-width: 767px)', () => {
    $$('.h-panel .rv').forEach((el) => gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } })
      .to(el, { clipPath: 'inset(0% 0 0 0 round 24px)', duration: D.l }).to($('img', el), { scale: 1, duration: D.l }, 0));
  });
}

/* ───── Bucle global: barra, menú, plato ───── */
function loop(render) {
  const nav = $('.nav'); const bar = $('.progress i');
  gsap.ticker.add((time) => {
    const y = scrollY, max = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('hide', !!lenis && lenis.direction === 1 && y > 200); nav.classList.toggle('solid', y > 40);
    if (render && y < innerHeight * 1.1) render(time);
  });
}
function pointerFx() {
  if (!fine || STATIC) return;
  const c = $('.cursor'); const cx = gsap.quickTo(c, 'x', { duration: D.s }), cy = gsap.quickTo(c, 'y', { duration: D.s });
  let on = false;
  addEventListener('pointermove', (e) => { cx(e.clientX); cy(e.clientY); const v = !!e.target.closest('.pc, .fl'); if (v !== on) { on = v; gsap.to(c, { scale: v ? 1 : 0, duration: D.s }); } }, { passive: true });
  $$('.magnet').forEach((m) => { const mx = gsap.quickTo(m, 'x', { duration: D.s }), my = gsap.quickTo(m, 'y', { duration: D.s });
    m.addEventListener('pointermove', (e) => { const r = m.getBoundingClientRect(); mx(gsap.utils.clamp(-8, 8, (e.clientX - r.left - r.width / 2) * 0.3)); my(gsap.utils.clamp(-8, 8, (e.clientY - r.top - r.height / 2) * 0.3)); });
    m.addEventListener('pointerleave', () => { mx(0); my(0); }); });
}

/* ───── Arranque: intro (1,8 s máx., solo la primera visita) ───── */
function heroIn() {
  gsap.timeline().from('.hero .line > span', { yPercent: 110, duration: D.l, stagger: 0.08 })
    .from('.hero [data-r]', { y: 24, opacity: 0, stagger: 0.08 }, 0.3)
    .from(plate, { scale: 0.85, opacity: 0, duration: D.l }, 0.1).from(cap, { opacity: 0 }, 0.6);
}
if (STATIC) { $('#intro').remove(); }
else {
  const render = initPlate(); reveals(); loop(render); pointerFx();
  const intro = $('#intro');
  if (store.get('m4-intro', false)) { intro.remove(); heroIn(); }
  else {
    store.set('m4-intro', true); lenis.stop();
    gsap.timeline({ onComplete: () => { intro.remove(); lenis.start(); } })
      .to('#intro .logo', { clipPath: 'inset(0 0% 0 0)', duration: D.l, ease: 'power2.inOut' })
      .to(intro, { yPercent: -100, duration: D.m, ease: 'expo.inOut' }, '+=0.1')
      .add(heroIn, '-=0.5');
  }
  if (location.hash && location.hash.length > 1) { const el = $(location.hash); if (el) requestAnimationFrame(() => lenis.scrollTo(el, { immediate: true })); }
}
