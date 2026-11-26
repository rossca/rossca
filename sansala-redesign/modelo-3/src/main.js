/* Sansala · Modelo 3 «Bento App» — prototipo no oficial */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import { CATS, RING, PRODUCTS, catById } from './products.js';

gsap.registerPlugin(ScrollTrigger, Flip);
const IMG = window.__IMG || {};
const src = (n) => IMG[n] || `../prototype/img/w/${n}.webp`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const STATIC = reduce || new URLSearchParams(location.search).has('static');
const mobile = () => innerWidth < 768;
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

document.documentElement.style.setProperty('--logo', `url("${src('sansala_logo')}")`);
$$('[data-img]').forEach((el) => { el.src = src(el.dataset.img); el.decoding = 'async'; });
$$('[data-img-href]').forEach((el) => { el.href = src(el.dataset.imgHref); });

let current = null; let ctx = null; let busy = false;

/* ───────── Scroll suave ───────── */
let lenis = null;
if (!STATIC) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
}

/* ───────── Pestañas y formularios ───────── */
const selectTab = (id) => $$('.tabs [role=tab]').forEach((t) => { const on = t.id === `t-${id}`; t.setAttribute('aria-selected', String(on)); $(`#${t.getAttribute('aria-controls')}`).hidden = !on; });
$('.tabs').addEventListener('click', (e) => { const t = e.target.closest('[role=tab]'); if (t) selectTab(t.id.slice(2)); });
const stamp = $('.stamp'); const fmsg = $('.form-msg');
$$('.demo-form').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!f.checkValidity()) { fmsg.textContent = 'Revisa los campos obligatorios.'; f.reportValidity(); return; }
  fmsg.textContent = '¡Gracias! Es un prototipo: no se ha enviado ningún dato.'; f.reset();
  gsap.timeline().fromTo(stamp, { scale: 2.6, rotation: -45, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: 0.55, ease: 'back.out(3)' })
    .to(stamp, { opacity: 0, scale: 0.9, duration: 0.5, delay: 1.8 });
}));
document.addEventListener('click', (e) => { const a = e.target.closest('[data-tab]'); if (a) selectTab(a.dataset.tab); });

/* ═════════════ INICIO ═════════════ */
$('.marq-t').innerHTML = [0, 1].map(() => `<span>${RING.map((r) => (catById(r.id)?.name || r.name)).join('<em>✺</em> ')}<em>✺</em></span>`).join('');
const fams = $('.fams');
fams.innerHTML = RING.map((r) => { const c = { ...catById(r.id), ...r }; const n = PRODUCTS.filter((p) => (r.id === 'congelados' ? p.fz : p.c === r.id)).length;
  return `<a class="fam" href="#/carta" data-f="${r.id}" style="--c:${c.pastel}">${c.name}<small>${n}</small></a>`; }).join('');

/* Baraja deslizable */
const deck = $('.deck');
let queue = [3, 10, 24, 26, 13, 41, 31, 43, 20, 6].map((i) => i);
function renderDeck(enterFrom = 0) {
  deck.innerHTML = queue.slice(0, 4).map((i, k) => { const p = PRODUCTS[i]; const c = catById(p.c);
    return `<div class="card-d" data-i="${i}" style="--bg:${c.pastel};z-index:${10 - k}"><img src="${src(p.img)}" alt="${p.n}"><div><b>${p.n}</b><span>${c.name}</span></div></div>`; }).join('');
  const cards = $$('.card-d', deck);
  cards.forEach((c, k) => gsap.set(c, { y: k * 12, scale: 1 - k * 0.05, rotation: k ? (k % 2 ? 3 : -3) : 0 }));
  if (enterFrom && cards[0] && !STATIC) gsap.from(cards[0], { x: enterFrom * 420, rotation: enterFrom * 25, opacity: 0, duration: 0.6, ease: 'power3.out' });
  if (cards[0]) dragCard(cards[0]);
}
function throwCard(dir) {
  const top = $('.card-d', deck); if (!top) return;
  if (dir < 0) { queue.unshift(queue.pop()); renderDeck(-1); return; }
  gsap.to(top, { x: 520, rotation: 32, opacity: 0, duration: STATIC ? 0 : 0.45, ease: 'power2.in', onComplete: () => { queue.push(queue.shift()); renderDeck(); } });
}
function dragCard(card) {
  let sx = 0, sy = 0, dx = 0, dy = 0, down = false, moved = false;
  card.addEventListener('pointerdown', (e) => { down = true; moved = false; sx = e.clientX; sy = e.clientY; card.setPointerCapture(e.pointerId); });
  card.addEventListener('pointermove', (e) => { if (!down) return; dx = e.clientX - sx; dy = e.clientY - sy; if (Math.abs(dx) > 5) moved = true; gsap.set(card, { x: dx, y: dy * 0.4, rotation: dx * 0.06 }); });
  const up = () => {
    if (!down) return; down = false;
    if (Math.abs(dx) > 100) {
      const dir = Math.sign(dx);
      gsap.to(card, { x: dir * 560, rotation: dir * 34, opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: () => { queue.push(queue.shift()); renderDeck(); } });
    } else gsap.to(card, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: 'elastic.out(1, .5)' });
    if (!moved) openDetail(+card.dataset.i, card);
    dx = dy = 0;
  };
  card.addEventListener('pointerup', up); card.addEventListener('pointercancel', up);
}
$$('[data-deck]').forEach((b) => b.addEventListener('click', () => throwCard(+b.dataset.deck)));
renderDeck();

/* ═════════════ LA CARTA ═════════════ */
let filter = 'all'; let query = ''; let mode = 'grid';
const matches = (p) => (filter === 'all' || (filter === 'congelados' ? p.fz : p.c === filter)) &&
  (!query || norm(`${p.n} ${p.d} ${catById(p.c).name}`).includes(query));
const chips = $('.chips');
const FILTERS = [{ id: 'all', name: 'Todo' }, ...CATS.map((c) => ({ id: c.id, name: c.name })), { id: 'congelados', name: '❄ Congelados' }];
chips.innerHTML = FILTERS.map((f) => `<button class="chip" data-f="${f.id}" aria-pressed="${f.id === 'all'}">${f.name}</button>`).join('');
const result = $('.result');

/* 1 · Cuadrícula con FLIP */
const grid = $('.grid');
grid.innerHTML = PRODUCTS.map((p, i) => { const c = catById(p.c);
  return `<li data-i="${i}" class="${i % 7 === 0 ? 'big' : ''}"><button class="pc" style="--bg:${c.pastel}"><img src="${src(p.img)}" alt="${p.n}" loading="lazy">${p.fz ? '<span class="pc-fz">❄</span>' : ''}<span class="pc-l"><b>${p.n}</b><span>${c.name}</span></span></button></li>`; }).join('');
const gridItems = $$('li', grid);
grid.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) openDetail(+li.dataset.i, $('img', li)); });

/* 2 · Mesa arrastrable con inercia */
const mesa = $('.mesa'); const canvas = $('.mesa-canvas');
const COLS = 9, CW = 230, CH = 265;
const rnd = (() => { let s = 11; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
canvas.innerHTML = PRODUCTS.map((p, i) => { const c = catById(p.c); const x = 90 + (i % COLS) * CW + (Math.floor(i / COLS) % 2) * 115 + (rnd() - 0.5) * 60; const y = 80 + Math.floor(i / COLS) * CH + (rnd() - 0.5) * 50;
  return `<button class="dish" data-i="${i}" style="left:${x}px;top:${y}px;--bg:${c.pastel}"><span class="dish-img"><img src="${src(p.img)}" alt="" loading="lazy"></span><b>${p.n}</b></button>`; }).join('');
const W = 90 * 2 + COLS * CW + 115, H = 80 * 2 + Math.ceil(PRODUCTS.length / COLS) * CH;
canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
const pan = { x: 0, y: 0, vx: 0, vy: 0, down: false, moved: false, lx: 0, ly: 0, raf: 0 };
const bounds = () => ({ minX: Math.min(0, mesa.clientWidth - W), minY: Math.min(0, mesa.clientHeight - H) });
const applyPan = () => { canvas.style.transform = `translate3d(${pan.x}px, ${pan.y}px, 0)`; };
function centerMesa() { const b = bounds(); pan.x = b.minX / 2; pan.y = b.minY / 2; applyPan(); }
mesa.addEventListener('pointerdown', (e) => { pan.down = true; pan.moved = false; pan.lx = e.clientX; pan.ly = e.clientY; pan.vx = pan.vy = 0; cancelAnimationFrame(pan.raf); mesa.setPointerCapture(e.pointerId); });
mesa.addEventListener('pointermove', (e) => {
  if (!pan.down) return; const dx = e.clientX - pan.lx, dy = e.clientY - pan.ly; pan.lx = e.clientX; pan.ly = e.clientY;
  if (Math.abs(dx) + Math.abs(dy) > 2) pan.moved = true; pan.vx = dx; pan.vy = dy; pan.x += dx; pan.y += dy; applyPan();
});
const release = (e) => {
  if (!pan.down) return; pan.down = false;
  if (!pan.moved) { const d = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.classList?.contains('dish')); if (d) openDetail(+d.dataset.i, $('.dish-img', d)); return; }
  const step = () => {
    const b = bounds(); pan.vx *= STATIC ? 0 : 0.93; pan.vy *= STATIC ? 0 : 0.93; pan.x += pan.vx; pan.y += pan.vy;
    const tx = Math.min(0, Math.max(b.minX, pan.x)), ty = Math.min(0, Math.max(b.minY, pan.y));
    pan.x += (tx - pan.x) * 0.18; pan.y += (ty - pan.y) * 0.18; applyPan();
    if (Math.abs(pan.vx) + Math.abs(pan.vy) > 0.2 || Math.abs(tx - pan.x) + Math.abs(ty - pan.y) > 0.5) pan.raf = requestAnimationFrame(step);
  };
  step();
};
mesa.addEventListener('pointerup', release); mesa.addEventListener('pointercancel', release);

/* 3 · Galería 3D (coverflow) */
const flow = $('.flow'); const stage = $('.flow-stage'); let flowList = []; let cur = 0;
function buildFlow() {
  flowList = PRODUCTS.map((p, i) => ({ p, i })).filter(({ p }) => matches(p)); cur = Math.min(cur, Math.max(0, flowList.length - 1));
  stage.innerHTML = flowList.map(({ p, i }, k) => `<button class="fl" data-k="${k}" style="--bg:${catById(p.c).pastel}" aria-label="${p.n}"><img src="${src(p.img)}" alt="" loading="lazy"></button>`).join('');
  layoutFlow(true);
}
function layoutFlow(instant) {
  const sp = mobile() ? 120 : 190;
  $$('.fl', stage).forEach((el, k) => {
    const d = k - cur; const a = Math.abs(d);
    gsap.to(el, { x: d * sp + Math.sign(d) * (a ? 60 : 0), z: -a * 160, rotationY: Math.max(-60, Math.min(60, -d * 38)), opacity: a > 4 ? 0 : 1, zIndex: 100 - a, duration: instant || STATIC ? 0 : 0.7, ease: 'power3.out' });
  });
  const it = flowList[cur]; $('#flowName').textContent = it ? it.p.n : 'Sin resultados'; $('#flowDesc').textContent = it ? it.p.d : 'Prueba con otra búsqueda.';
}
const flowGo = (d) => { cur = Math.max(0, Math.min(flowList.length - 1, cur + d)); layoutFlow(); };
$$('[data-flow]').forEach((b) => b.addEventListener('click', () => flowGo(+b.dataset.flow)));
flow.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') flowGo(1); if (e.key === 'ArrowLeft') flowGo(-1); if (e.key === 'Enter' && flowList[cur]) openDetail(flowList[cur].i, $$('.fl', stage)[cur]); });
let wheelLock = 0;
stage.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.6) return; e.preventDefault(); const now = Date.now(); if (now - wheelLock < 220) return; wheelLock = now; flowGo(Math.sign(e.deltaX)); }, { passive: false });
let fx = null, fmoved = false;
stage.addEventListener('pointerdown', (e) => { fx = e.clientX; fmoved = false; });
stage.addEventListener('pointermove', (e) => { if (fx === null) return; const d = e.clientX - fx; if (Math.abs(d) > 70) { flowGo(d < 0 ? 1 : -1); fx = e.clientX; fmoved = true; } });
stage.addEventListener('pointerup', (e) => {
  const was = fmoved; fx = null; if (was) return;
  const el = e.target.closest('.fl'); if (!el) return; const k = +el.dataset.k;
  if (k === cur) openDetail(flowList[k].i, el); else { cur = k; layoutFlow(); }
});

/* Filtro + búsqueda comunes a las 3 vistas */
function applyFilter(animate = true) {
  const list = PRODUCTS.filter(matches); result.textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
  $$('.chip', chips).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === filter)));
  const doFlip = animate && !STATIC && mode === 'grid' && current === 'carta';
  const state = doFlip ? Flip.getState(gridItems) : null;
  gridItems.forEach((li) => li.classList.toggle('gone', !matches(PRODUCTS[+li.dataset.i])));
  if (doFlip) Flip.from(state, { duration: 0.65, ease: 'power3.inOut', scale: true, absolute: true, nested: true,
    onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5 }),
    onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.7, duration: 0.35 }) });
  $$('.dish', canvas).forEach((d) => d.classList.toggle('dim', !matches(PRODUCTS[+d.dataset.i])));
  cur = 0; buildFlow();
}
chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (b) { filter = b.dataset.f; applyFilter(); } });
let qt; $('#q').addEventListener('input', (e) => { clearTimeout(qt); qt = setTimeout(() => { query = norm(e.target.value.trim()); applyFilter(); }, 160); });
fams.addEventListener('click', (e) => { const a = e.target.closest('[data-f]'); if (a) { filter = a.dataset.f; applyFilter(false); } });

/* Selector de vista con indicador deslizante */
const modesEl = $('.modes'); const modesInd = $('.modes-ind');
const moveInd = (ind, el, instant) => { if (!el) return; gsap.to(ind, { x: el.offsetLeft, width: el.offsetWidth, duration: instant || STATIC ? 0 : 0.6, ease: 'elastic.out(1, .8)' }); };
function setMode(m) {
  if (m === mode && !arguments[1]) return;
  const prev = $(`[data-pane="${mode}"]`); const next = $(`[data-pane="${m}"]`);
  $$('[role=tab]', modesEl).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.mode === m)));
  moveInd(modesInd, $(`[data-mode="${m}"]`, modesEl));
  const swap = () => { prev.hidden = true; next.hidden = false; mode = m; if (m === 'mesa') centerMesa(); if (m === 'flow') { layoutFlow(true); flow.focus({ preventScroll: true }); } ScrollTrigger.refresh();
    if (!STATIC) gsap.fromTo(next, { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }); };
  if (STATIC || prev === next) swap(); else gsap.to(prev, { opacity: 0, y: -20, duration: 0.25, onComplete: () => { gsap.set(prev, { clearProps: 'all' }); swap(); } });
}
modesEl.addEventListener('click', (e) => { const b = e.target.closest('[data-mode]'); if (b) setMode(b.dataset.mode); });
applyFilter(false);

/* ═════════════ FICHA con elemento compartido ═════════════ */
const detail = $('.detail'); const dMedia = $('.d-media'); const dImg = $('img', dMedia); let dIndex = 0; let lastFocus = null;
function fillDetail(i) {
  const p = PRODUCTS[i]; const c = catById(p.c); dIndex = i;
  detail.style.setProperty('--bg', c.pastel); dImg.src = src(p.img); dImg.alt = p.n;
  $('#dCat').textContent = `${c.name} · ${String(i + 1).padStart(2, '0')}/${PRODUCTS.length}`; $('#dName').textContent = p.n;
  $('.d-chips').innerHTML = p.d.replace(/\.$/, '').split(/,\s*|\s+y\s+/).filter(Boolean).map((t) => `<span>${t.trim()}</span>`).join('') + (p.fz ? '<span class="fz">❄ Congelado</span>' : '<span class="fz">Fresco · 7 días</span>');
  $('#dCta').dataset.product = p.n;
}
function openDetail(i, fromEl) {
  lastFocus = document.activeElement; fillDetail(i); detail.hidden = false; lenis?.stop();
  if (STATIC) { $('.d-close').focus(); return; }
  const r0 = fromEl?.getBoundingClientRect(); const r1 = dMedia.getBoundingClientRect();
  gsap.fromTo(detail, { backgroundColor: 'rgba(254,252,233,0)' }, { backgroundColor: 'rgba(254,252,233,1)', duration: 0.4 });
  if (r0 && r0.width) {
    const ghost = document.createElement('div');
    Object.assign(ghost.style, { position: 'fixed', zIndex: 220, left: `${r0.left}px`, top: `${r0.top}px`, width: `${r0.width}px`, height: `${r0.height}px`, borderRadius: '28px', overflow: 'hidden', background: catById(PRODUCTS[i].c).pastel });
    ghost.innerHTML = `<img src="${src(PRODUCTS[i].img)}" alt="" style="width:100%;height:100%;object-fit:cover">`;
    document.body.append(ghost); gsap.set(dMedia, { opacity: 0 });
    gsap.to(ghost, { left: r1.left, top: r1.top, width: r1.width, height: r1.height, borderRadius: 0, duration: 0.8, ease: 'power3.inOut', onComplete: () => { gsap.set(dMedia, { opacity: 1 }); ghost.remove(); } });
  }
  gsap.from('.d-body > *', { x: 50, opacity: 0, stagger: 0.06, duration: 0.7, delay: 0.3, ease: 'power3.out' });
  gsap.from('.d-chips span', { scale: 0.4, opacity: 0, stagger: 0.04, duration: 0.5, delay: 0.55, ease: 'back.out(2)' });
  $('.d-close').focus({ preventScroll: true });
}
function closeDetail() {
  const done = () => { detail.hidden = true; gsap.set([detail, dMedia], { clearProps: 'all' }); lenis?.start(); lastFocus?.focus?.({ preventScroll: true }); };
  if (STATIC) return done();
  gsap.to(detail, { opacity: 0, duration: 0.35, onComplete: done });
}
$('.d-close').addEventListener('click', closeDetail);
addEventListener('keydown', (e) => { if (!detail.hidden && e.key === 'Escape') closeDetail(); });
$$('[data-d]').forEach((b) => b.addEventListener('click', () => {
  const n = (dIndex + +b.dataset.d + PRODUCTS.length) % PRODUCTS.length;
  if (STATIC) return fillDetail(n);
  gsap.timeline().to([dImg, '.d-body h2', '.d-chips'], { opacity: 0, x: -30 * +b.dataset.d, duration: 0.25 })
    .add(() => fillDetail(n)).fromTo([dImg, '.d-body h2', '.d-chips'], { opacity: 0, x: 30 * +b.dataset.d }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
}));
$('#dCta').addEventListener('click', (e) => { $('#altaMsg').value = `Me interesa: ${e.currentTarget.dataset.product}`; closeDetail(); });

/* ═════════════ NOSOTROS: texto palabra a palabra ═════════════ */
const glow = $('.glow');
glow.innerHTML = glow.textContent.trim().split(/\s+/).map((w) => `<span class="gw">${w}</span>`).join(' ');

/* ═════════════ ROUTER + MOSAICO ═════════════ */
const ROUTES = ['inicio', 'carta', 'nosotros', 'contacto'];
const PAT = { inicio: ['edges', 'center'], carta: ['start', 'end'], nosotros: ['center', 'edges'], contacto: ['random', 'random'] };
const views = $$('.view'); const tilesEl = $('#tiles'); let tiles = []; let tg = [1, 1];
function buildTiles() {
  const s = mobile() ? 64 : 96; const cols = Math.ceil(innerWidth / s), rows = Math.ceil(innerHeight / s); tg = [rows, cols];
  tilesEl.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
  tilesEl.innerHTML = '<i></i>'.repeat(rows * cols); tiles = $$('i', tilesEl);
}
buildTiles(); addEventListener('resize', () => { buildTiles(); moveDock(true); moveInd(modesInd, $('[aria-selected=true]', modesEl), true); });
const tween = (vars) => new Promise((res) => gsap.to(tiles, { ...vars, onComplete: res }));
const dock = $('.dock'); const dockInd = $('.dock-ind');
function moveDock(instant) { const a = $(`.dock a[data-route="${current}"]`); $$('.dock a').forEach((x) => { x.classList.toggle('on', x === a); x.toggleAttribute('aria-current', x === a); }); moveInd(dockInd, a, instant); }

const routeOf = () => { const m = location.hash.match(/^#\/(\w+)/); return ROUTES.includes(m?.[1]) ? m[1] : 'inicio'; };
async function go(route, instant = false) {
  if (route === current || busy) return; busy = true;
  const [pin, pout] = PAT[route];
  if (!instant && !STATIC && current) { tilesEl.classList.add('on'); await tween({ scale: 1.25, duration: 0.42, ease: 'power2.in', stagger: { grid: tg, from: pin, amount: 0.45 } }); }
  ctx?.revert(); ScrollTrigger.getAll().forEach((s) => s.kill());
  views.forEach((v) => { v.hidden = v.dataset.view !== route; });
  current = route; lenis ? lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0);
  document.title = `Sansala · ${{ inicio: 'Inicio', carta: 'La carta', nosotros: 'Nosotros', contacto: 'Contacto' }[route]} (Modelo 3)`;
  moveDock(!current); if (route === 'carta') { moveInd(modesInd, $('[aria-selected=true]', modesEl), true); setMode(mode, true); }
  enterView(route);
  scrollTo(0, 0); lenis?.scrollTo(0, { immediate: true, force: true });
  $(`[data-view="${route}"] h1`).setAttribute('tabindex', '-1');
  if (!instant && !STATIC && tiles.length) { await tween({ scale: 0, duration: 0.42, ease: 'power2.out', stagger: { grid: tg, from: pout, amount: 0.45 } }); tilesEl.classList.remove('on'); }
  $(`[data-view="${route}"] h1`).focus({ preventScroll: true });
  busy = false; if (routeOf() !== current) go(routeOf());
}
addEventListener('hashchange', () => go(routeOf()));

function enterView(route) {
  ctx = gsap.context(() => {
    if (STATIC) { $$('[data-count]').forEach((el) => { el.textContent = el.dataset.count; }); $$('.gw').forEach((w) => { w.style.opacity = 1; }); $$('.tl-img').forEach((w) => { w.style.clipPath = 'none'; }); return; }
    if (route === 'inicio') {
      gsap.from('.bento > .b', { y: 60, opacity: 0, scale: 0.94, stagger: 0.06, duration: 0.8, ease: 'power3.out' });
      gsap.from('.h-hero .w', { yPercent: 80, opacity: 0, rotation: 6, stagger: 0.08, duration: 0.8, delay: 0.2, ease: 'back.out(1.7)' });
      gsap.from('.fam', { y: 30, opacity: 0, stagger: 0.05, duration: 0.6, delay: 0.5 });
      $$('[data-count]').forEach((el) => { const o = { v: 0 }; gsap.to(o, { v: +el.dataset.count, duration: 1.6, delay: 0.4, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } }); });
    }
    if (route === 'carta') {
      gsap.from('.carta-head > *, .toolbar, .result', { y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out' });
      if (mode === 'grid') gsap.from($$('li:not(.gone)', grid).slice(0, 12), { y: 60, opacity: 0, stagger: 0.04, duration: 0.7, delay: 0.15, ease: 'power3.out' });
    }
    if (route === 'nosotros') {
      const words = $$('.gw');
      ScrollTrigger.create({ trigger: '.nos-intro', start: 'top 90px', end: '+=700', pin: true, scrub: true,
        onUpdate: (s) => { const lit = s.progress * words.length * 1.05; words.forEach((w, k) => { w.style.opacity = k < lit ? 1 : 0.14; }); } });
      gsap.to('.tl-line i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: true } });
      $$('.timeline li').forEach((li) => {
        gsap.to($('.tl-img', li), { clipPath: 'inset(0% 0 0 0 round 28px)', ease: 'none', scrollTrigger: { trigger: li, start: 'top 85%', end: 'top 35%', scrub: 1 } });
        gsap.to($('.tl-img img', li), { scale: 1, ease: 'none', scrollTrigger: { trigger: li, start: 'top 85%', end: 'bottom 30%', scrub: 1 } });
        gsap.from($('.tl-txt', li), { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 70%' } });
      });
      gsap.from('.canales li', { y: 60, opacity: 0, rotation: () => gsap.utils.random(-6, 6), stagger: 0.08, duration: 0.8, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.canales', start: 'top 80%' } });
      $$('.sellos li').forEach((li, k) => gsap.to(li, { y: -10, duration: 1.8 + k * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
    }
    if (route === 'contacto') {
      gsap.from('.con-info', { x: -80, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.con-form', { x: 80, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.con-info > *', { y: 24, opacity: 0, stagger: 0.07, duration: 0.6, delay: 0.25 });
    }
    ScrollTrigger.refresh();
  });
}

/* ═════════════ INTRO «LA PILA» ═════════════ */
function intro() {
  const el = $('#intro'); const layers = $$('.ly').reverse();
  if (STATIC) { el.remove(); go(routeOf(), true); return; }
  go(routeOf(), true); ctx?.pause?.(); gsap.set(layers, { y: -innerHeight * 0.9 });
  gsap.timeline({ onComplete: () => { el.remove(); ctx?.revert(); enterView(current); } })
    .to(layers, { y: 0, duration: 0.75, ease: 'bounce.out', stagger: 0.14 })
    .to('.logo--intro', { opacity: 1, y: -8, duration: 0.5 }, '-=0.3')
    .to({}, { duration: 0.35 })
    .to(layers, { x: () => gsap.utils.random(-1, 1) * innerWidth * 0.75, y: () => gsap.utils.random(-1, 1) * innerHeight * 0.75, rotation: () => gsap.utils.random(-220, 220), opacity: 0, duration: 0.9, ease: 'power3.in', stagger: 0.03 })
    .to('.logo--intro', { scale: 0.6, opacity: 0, duration: 0.45 }, '<0.2')
    .to(el, { autoAlpha: 0, duration: 0.4 }, '-=0.25');
}
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2000))]).then(intro);
