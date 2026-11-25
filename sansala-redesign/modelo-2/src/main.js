/* Sansala · Modelo 2 «Editorial en movimiento» — prototipo no oficial */
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CATS, RING, PRODUCTS, catById } from './products.js';

gsap.registerPlugin(ScrollTrigger);
const IMG = window.__IMG || {};
const src = (n) => IMG[n] || `../prototype/img/w/${n}.webp`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const STATIC = reduce || new URLSearchParams(location.search).has('static');
const fine = matchMedia('(pointer: fine)').matches;
if (STATIC) document.documentElement.classList.add('is-static');

/* ───────── Contenido ───────── */
document.documentElement.style.setProperty('--logo', `url("${src('sansala_logo')}")`);
$$('[data-img]').forEach((el) => { el.src = src(el.dataset.img); el.decoding = 'async'; });
$$('[data-img-href]').forEach((el) => { el.href = src(el.dataset.imgHref); });

const fullCat = (id) => ({ ...catById(id), ...RING.find((r) => r.id === id) });
const inCat = (id) => PRODUCTS.filter((p) => (id === 'congelados' ? p.fz : p.c === id));

/* Familias apiladas */
const stack = $('.stack');
stack.innerHTML = RING.map((r, i) => {
  const c = fullCat(r.id); const list = inCat(r.id);
  return `<article class="fam" style="--bg:${c.pastel}">
    <div class="fam-text">
      <span class="fam-n">${String(i + 1).padStart(2, '0')} / 07</span>
      <div><h3>${c.name}</h3><p class="fam-line">${c.line}</p><span class="fam-count">${list.length} referencias</span></div>
      <ul>${list.slice(0, 3).map((p) => `<li>${p.n}</li>`).join('')}</ul>
    </div>
    <div class="fam-img"><img src="${src(c.img)}" alt="${c.name}: ${list[0]?.n || ''}" loading="lazy"></div>
  </article>`;
}).join('');

/* La carta */
const menu = $('#menu'); const chips = $('.chips');
let filter = 'all';
const FILTERS = [{ id: 'all', name: 'Todo' }, ...CATS.map((c) => ({ id: c.id, name: c.name })), { id: 'congelados', name: '❄ Congelados' }];
chips.innerHTML = FILTERS.map((f) => `<button class="chip" data-f="${f.id}" aria-pressed="${f.id === 'all'}">${f.name}</button>`).join('');
function renderMenu(animate) {
  const groups = CATS.map((c) => ({ c, items: PRODUCTS.filter((p) => p.c === c.id && (filter === 'all' || filter === c.id || (filter === 'congelados' && p.fz))) })).filter((g) => g.items.length);
  menu.innerHTML = groups.map((g) => `<div class="m-group"><h3>${g.c.name} · ${g.items.length}</h3>${g.items.map((p) => {
    const i = PRODUCTS.indexOf(p);
    return `<button class="row" data-i="${i}" style="--bg:${g.c.pastel}"><img class="row-thumb" src="${src(p.img)}" alt="" loading="lazy"><span class="row-name">${p.n}</span><span class="row-desc">${p.d}</span><span class="row-tag">${p.fz ? '❄ Congelado' : 'Fresco'}</span></button>`;
  }).join('')}</div>`).join('');
  $$('.chip', chips).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === filter)));
  if (animate && !STATIC) gsap.from($$('.row', menu).slice(0, 14), { y: 30, opacity: 0, stagger: 0.03, duration: 0.7, ease: 'power3.out' });
}
renderMenu(false);
chips.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; filter = b.dataset.f; renderMenu(true); ScrollTrigger.refresh(); });

/* Ficha */
const sheet = $('#sheet');
menu.addEventListener('click', (e) => {
  const r = e.target.closest('.row'); if (!r) return;
  const p = PRODUCTS[+r.dataset.i]; const c = catById(p.c);
  sheet.style.setProperty('--bg', c.pastel);
  $('.sh-img img').src = src(p.img); $('.sh-img img').alt = p.n;
  $('#shCat').textContent = c.name; $('#shTitle').textContent = p.n; $('#shDesc').textContent = p.d;
  $('.sh-tags').innerHTML = `<span>${c.name}</span><span>${p.fz ? '❄ Congelado' : 'Fresco · 7 días'}</span>`;
  $('#shCta').dataset.product = p.n; sheet.showModal();
});
$('.sh-close').addEventListener('click', () => sheet.close());
sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });
$('#shCta').addEventListener('click', (e) => { $('#altaMsg').value = `Me interesa: ${e.currentTarget.dataset.product}`; sheet.close(); });

/* Pestañas y formularios demo */
const selectTab = (id) => $$('.tabs [role=tab]').forEach((t) => { const on = t.id === `t-${id}`; t.setAttribute('aria-selected', String(on)); $(`#${t.getAttribute('aria-controls')}`).hidden = !on; });
$('.tabs').addEventListener('click', (e) => { const t = e.target.closest('[role=tab]'); if (t) selectTab(t.id.slice(2)); });
$$('.demo-form').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault(); const m = $('.form-msg', f);
  if (!f.checkValidity()) { m.textContent = 'Revisa los campos obligatorios.'; f.reportValidity(); return; }
  m.textContent = '¡Gracias! Esto es un prototipo: no se ha enviado ningún dato.'; f.reset();
}));

/* Letras del cierre */
const mega = $('.mega');
mega.innerHTML = [...mega.textContent].map((ch) => `<span class="ch" aria-hidden="true">${ch}</span>`).join('');

/* ───────── Scroll suave y anclas ───────── */
let lenis = null;
if (!STATIC) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const el = document.querySelector(a.getAttribute('href')); if (!el) return;
  e.preventDefault(); if (a.dataset.tab) selectTab(a.dataset.tab);
  lenis ? lenis.scrollTo(el, { duration: 1.6, offset: -10 }) : el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
});

/* ───────── Cursor, imagen flotante, botón magnético ───────── */
const cursor = $('.cursor'); const cLabel = $('span', cursor);
const hov = $('.hover-img'); const hovImg = $('img', hov);
if (fine && !STATIC) {
  const cx = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' }); const cy = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
  const hx = gsap.quickTo(hov, 'x', { duration: 0.6, ease: 'power3' }); const hy = gsap.quickTo(hov, 'y', { duration: 0.6, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    cursor.style.opacity = 1; cx(e.clientX); cy(e.clientY); hx(e.clientX); hy(e.clientY);
    const row = e.target.closest('.row');
    cursor.classList.toggle('label', !!row); cLabel.textContent = row ? 'Ver' : '';
    cursor.classList.toggle('link', !row && !!e.target.closest('a, button, input, textarea, label'));
  }, { passive: true });
  menu.addEventListener('pointerover', (e) => {
    const r = e.target.closest('.row'); if (!r) return;
    hovImg.src = src(PRODUCTS[+r.dataset.i].img);
    gsap.to(hov, { scale: 1, rotate: gsap.utils.random(-8, 8), duration: 0.5, ease: 'power3.out' });
  });
  menu.addEventListener('pointerleave', () => gsap.to(hov, { scale: 0, duration: 0.4, ease: 'power3.in' }));

  const mag = $('.magnet'); const mx = gsap.quickTo(mag, 'x', { duration: 0.6, ease: 'elastic.out(1, .4)' }); const my = gsap.quickTo(mag, 'y', { duration: 0.6, ease: 'elastic.out(1, .4)' });
  addEventListener('pointermove', (e) => {
    const r = mag.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2); const dy = e.clientY - (r.top + r.height / 2);
    const near = Math.hypot(dx, dy) < r.width; mx(near ? dx * 0.35 : 0); my(near ? dy * 0.35 : 0);
  }, { passive: true });
}

/* ───────── Plato WebGL del hero ───────── */
const PLATE = [
  ['SW-CHICKEN-ROYAL_2', 'Chicken Royal', 'Sándwiches'], ['Bowl-POLLO-FS_2_5', 'Pollo Asado y Bacon', 'Ensaladas'],
  ['Wrap-SUSHI_2', 'Salmón Sushi Wrap', 'Wraps'], ['bagel-salmon-1', 'Bagel de Salmón ASC', 'Especiales'],
  ['Postre-2', 'Strawberry Cheesecake Cup', 'Postres'], ['SW-BLT_2', 'BLT', 'Sándwiches'],
];
const capName = $('#capName'); const capCat = $('#capCat'); const cap = $('.plate-cap');
const plate = $('.plate'); const plateWrap = $('.plate-wrap');
let plateGL = null;
function initPlate() {
  const canvas = $('#plate');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { document.documentElement.classList.add('no-gl'); return null; }
  const texs = PLATE.map(([n]) => { const t = new THREE.TextureLoader().load(src(n)); t.colorSpace = THREE.SRGBColorSpace; return t; });
  const U = { t1: { value: texs[0] }, t2: { value: texs[1] }, uP: { value: 0 }, uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0.5, 0.5) }, uHover: { value: 0 } };
  const mat = new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D t1, t2; uniform float uP, uTime, uHover; uniform vec2 uMouse; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ return n(p)*0.55 + n(p*2.1)*0.3 + n(p*4.3)*0.15; }
      void main(){
        vec2 uv = vUv; vec2 d = uv - uMouse; float dist = length(d);
        uv += normalize(d + 1e-5) * sin(dist * 38.0 - uTime * 5.0) * 0.012 * uHover * exp(-dist * 4.0);
        uv = (uv - 0.5) * (1.0 - 0.04 * uHover) + 0.5;
        float nz = fbm(uv * 3.2 + uTime * 0.05);
        float m = smoothstep(nz - 0.08, nz + 0.08, uP * 1.25 - 0.12);
        float amt = sin(uP * 3.14159) * 0.09;
        vec4 a = texture2D(t1, uv + (nz - 0.5) * amt);
        vec4 b = texture2D(t2, uv - (nz - 0.5) * amt);
        gl_FragColor = mix(a, b, m);
        #include <colorspace_fragment>
      }`,
  });
  const scene = new THREE.Scene(); scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
  const cam = new THREE.Camera();
  const size = () => { const s = plate.clientWidth; renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(s, s, false); };
  size(); addEventListener('resize', size);
  plate.addEventListener('pointermove', (e) => { const r = plate.getBoundingClientRect(); U.uMouse.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height); });
  plate.addEventListener('pointerenter', () => gsap.to(U.uHover, { value: 1, duration: 0.8 }));
  plate.addEventListener('pointerleave', () => gsap.to(U.uHover, { value: 0, duration: 1.2 }));
  let idx = 0;
  const next = () => {
    const j = (idx + 1) % PLATE.length; U.t2.value = texs[j];
    gsap.to(cap, { opacity: 0, duration: 0.3, onComplete: () => { capName.textContent = PLATE[j][1]; capCat.textContent = PLATE[j][2]; gsap.to(cap, { opacity: 1, duration: 0.5 }); } });
    gsap.fromTo(U.uP, { value: 0 }, { value: 1, duration: 1.6, ease: 'power2.inOut', onComplete: () => { U.t1.value = texs[j]; U.uP.value = 0; idx = j; } });
  };
  setInterval(() => { if (!document.hidden && scrollY < innerHeight * 1.2) next(); }, 3600);
  return { render: (t) => { U.uTime.value = t; renderer.render(scene, cam); } };
}

/* ───────── Animaciones con scroll ───────── */
function setupMotion() {
  /* Hero: el plato crece hasta llenar la pantalla */
  const cover = () => (Math.hypot(innerWidth, innerHeight) / plate.offsetWidth) * (innerWidth < 768 ? 1.35 : 1.08);
  const ht = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true } });
  ht.to('.hero-copy, .hero-side, .hero-scroll', { y: -60, opacity: 0, ease: 'none', duration: 0.3 }, 0)
    .to(cap, { opacity: 0, duration: 0.1 }, 0)
    .to('.mq', { opacity: 0, duration: 0.4 }, 0.1)
    .to(plate, { scale: cover, ease: 'power2.in', duration: 0.9 }, 0)
    .to('.plate-fill', { opacity: 1, duration: 0.25 }, 0.75);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    /* Del campo: scroll horizontal + línea que se dibuja */
    const track = $('.h-track'); const campo = $('#campo');
    const dist = () => track.scrollWidth - innerWidth;
    const svg = $('.h-line'); const path = $('path', svg); let len = 1;
    const drawPath = () => {
      const W = track.scrollWidth; svg.setAttribute('width', W); svg.style.width = `${W}px`;
      let d = 'M0 60'; for (let x = 0; x < W; x += 640) d += ` C${x + 160} -10 ${x + 480} 130 ${x + 640} 60`;
      path.setAttribute('d', d); len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    };
    drawPath();
    const tw = gsap.to(track, { x: () => -dist(), ease: 'none' });
    const st = ScrollTrigger.create({
      trigger: campo, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, animation: tw, invalidateOnRefresh: true,
      onRefresh: drawPath, onUpdate: (s) => { path.style.strokeDashoffset = len * (1 - s.progress); },
    });
    $$('.h-panel:not(.h-intro)').forEach((p) => {
      gsap.fromTo($('.h-img img', p), { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
      gsap.from($('.h-num', p), { yPercent: 60, opacity: 0, ease: 'power2.out', scrollTrigger: { trigger: p, containerAnimation: tw, start: 'left 80%', end: 'left 30%', scrub: true } });
    });
    return () => { st.kill(); tw.kill(); gsap.set(track, { x: 0 }); };
  });

  /* Familias: tarjetas que se apilan */
  const fams = $$('.fam');
  fams.forEach((f, i) => {
    gsap.fromTo($('.fam-img img', f), { rotate: -14, scale: 0.9 }, { rotate: 10, scale: 1, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
    if (i < fams.length - 1) {
      gsap.to(f, { scale: 0.9, '--dim': 0.35, ease: 'none', scrollTrigger: { trigger: fams[i + 1], start: 'top bottom', end: 'top 9%', scrub: true } });
    }
  });

  /* La carta: filas que suben */
  ScrollTrigger.batch('.row', { start: 'top 92%', once: true, onEnter: (b) => gsap.from(b, { y: 40, opacity: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }) });

  /* Contadores */
  $$('[data-count]').forEach((el) => {
    const o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.to(o, { v: +el.dataset.count, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); } }) });
  });
  gsap.from('.ch-grid li', { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.ch-grid', start: 'top 80%' } });

  /* Calidad: sellos que giran */
  gsap.from('.certs li', { rotateY: -100, y: 40, opacity: 0, stagger: 0.15, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: '.certs', start: 'top 82%' } });

  /* ¿Hablamos?: letras una a una */
  gsap.from('.mega .ch', { yPercent: 115, ease: 'none', stagger: 0.06, scrollTrigger: { trigger: '.hablamos', start: 'top 85%', end: 'top 15%', scrub: 1 } });
}

/* ───────── Bucle: marquesinas, banda, plato, barra, menú ───────── */
function setupLoop() {
  const mqA = $('.mq--a .mq-track'); const mqB = $('.mq--b .mq-track'); const band = $('.band-track');
  let a = 0, b = 0, c = 0, skew = 0; const nav = $('.nav'); const bar = $('.progress i');
  const tiltX = gsap.quickTo(plate, 'rotationX', { duration: 0.8, ease: 'power3' }); const tiltY = gsap.quickTo(plate, 'rotationY', { duration: 0.8, ease: 'power3' });
  if (fine) addEventListener('pointermove', (e) => { tiltY((e.clientX / innerWidth - 0.5) * 18); tiltX(-(e.clientY / innerHeight - 0.5) * 14); }, { passive: true });
  gsap.ticker.add((time) => {
    const v = lenis ? lenis.velocity : 0; const sp = 0.6 + Math.min(Math.abs(v) * 0.25, 14);
    const wa = mqA.scrollWidth / 2, wb = mqB.scrollWidth / 2, wc = band.scrollWidth / 2;
    a = (a - sp) % wa; b = (b + sp) % wb; if (b > 0) b -= wb; c = (c - (1 + Math.min(Math.abs(v) * 0.3, 18))) % wc;
    skew += (clamp(v * 0.5, -12, 12) - skew) * 0.1;
    mqA.style.transform = `translate3d(${a}px,0,0)`; mqB.style.transform = `translate3d(${b}px,0,0)`;
    band.style.transform = `translate3d(${c}px,0,0) skewX(${skew}deg)`;
    const y = scrollY; const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (lenis) nav.classList.toggle('hide', lenis.direction === 1 && y > 300);
    nav.classList.toggle('solid', y > innerHeight * 1.6);
    if (plateGL && y < innerHeight * 1.3) plateGL.render(time);
  });
}

/* ───────── Intro «cortina» ───────── */
function runIntro() {
  const count = $('.intro-count'); const o = { v: 0 };
  gsap.set('.hero-title .ln > span', { yPercent: 110 });
  gsap.set(plateWrap, { opacity: 0 }); gsap.set(plate, { scale: 0.5, rotation: -40 });
  const tl = gsap.timeline({ onComplete: () => { $('#intro').remove(); lenis.start(); ScrollTrigger.refresh(); } });
  tl.to(o, { v: 100, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(o.v)).padStart(3, '0'); } })
    .to('.logo--intro, .intro-count, .intro-tag', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
    .to('.curtain--top', { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, '-=0.1')
    .to('.curtain--bottom', { yPercent: 100, duration: 1.1, ease: 'power4.inOut' }, '<')
    .to(plateWrap, { opacity: 1, duration: 0.6 }, '-=0.6')
    .to(plate, { scale: 1, rotation: 0, duration: 1.4, ease: 'power3.out' }, '<')
    .to('.hero-title .ln > span', { yPercent: 0, stagger: 0.1, duration: 1.1, ease: 'power4.out' }, '-=1.2')
    .from('.hero-copy .kicker, .hero-side, .hero-scroll, .nav', { opacity: 0, y: 20, stagger: 0.08, duration: 0.8 }, '-=0.8');
}

/* ───────── Arranque ───────── */
if (STATIC) {
  $$('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });
  document.documentElement.classList.add('no-gl');
  let k = 0; const fb = $('.plate-fallback');
  setInterval(() => { k = (k + 1) % PLATE.length; fb.src = src(PLATE[k][0]); capName.textContent = PLATE[k][1]; capCat.textContent = PLATE[k][2]; }, 4000);
} else {
  plateGL = initPlate();
  if (!plateGL) document.documentElement.classList.add('no-gl');
  setupMotion(); setupLoop();
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2000))]).then(runIntro);
}
