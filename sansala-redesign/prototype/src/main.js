/* Sansala · prototipo de rediseño inmersivo (no oficial)
   Un único mundo 3D persistente; la cámara recorre 7 escenas según el scroll. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CATS, RING, PRODUCTS, catById } from './products.js';

gsap.registerPlugin(ScrollTrigger);

/* ───────── utilidades ───────── */
const IMG = window.__IMG || {};
const src = (n) => IMG[n] || `img/w/${n}.webp`;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const TAU = Math.PI * 2;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

const mqMobile = matchMedia('(max-width: 767px)');
const isMobile = () => mqMobile.matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasWebGL = (() => { try { const c = document.createElement('canvas'); return !!c.getContext('webgl2'); } catch { return false; } })();
const STATIC = reduce || !hasWebGL || new URLSearchParams(location.search).has('static');
if (STATIC) document.documentElement.classList.add('is-static');

const PAL = {
  verde: '#1C592A', crema: '#FEFCE9', arena: '#F8EFDE', salvia: '#E3EDD8', texto: '#333333',
};

/* ───────── DOM: imágenes, logo, titulares ───────── */
document.documentElement.style.setProperty('--logo', `url("${src('sansala_logo')}")`);
$$('[data-img]').forEach((el) => { el.src = src(el.dataset.img); el.loading = 'lazy'; el.decoding = 'async'; });
$$('[data-img-href]').forEach((el) => { el.href = src(el.dataset.imgHref); });
$$('[data-split]').forEach((h) => {
  h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((l) => `<span class="line"><span>${l.trim()}</span></span>`).join('');
});

/* ───────── Catálogo ───────── */
const track = $('#track');
const chipsEl = $('.chips');
const catalogEl = $('#productos');
let filter = 'all';
const FILTERS = [
  { id: 'all', name: 'Todos', count: PRODUCTS.length },
  ...CATS.map((c) => ({ id: c.id, name: c.name, count: PRODUCTS.filter((p) => p.c === c.id).length })),
  { id: 'congelados', name: '❄ Congelados', count: PRODUCTS.filter((p) => p.fz).length },
];
chipsEl.innerHTML = FILTERS.map((f) => `<button class="chip" data-f="${f.id}" aria-pressed="${f.id === 'all'}">${f.name}<small>${f.count}</small></button>`).join('');

function renderTrack() {
  const list = PRODUCTS.filter((p) => filter === 'all' || (filter === 'congelados' ? p.fz : p.c === filter));
  track.innerHTML = list.map((p) => {
    const i = PRODUCTS.indexOf(p);
    const cat = catById(p.c);
    return `<li><button class="card" data-i="${i}" style="--bg:${cat.pastel}">
      <div class="card-img"><img src="${src(p.img)}" alt="${p.n}" loading="lazy" decoding="async" width="640" height="640">${p.fz ? '<span class="card-fz">❄ Congelado</span>' : ''}</div>
      <h3>${p.n}</h3><p>${p.d}</p></button></li>`;
  }).join('');
  $$('.chip', chipsEl).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === filter)));
}
function setFilter(f, refresh = true) {
  filter = f; renderTrack();
  if (refresh && !STATIC) { gsap.set(track, { x: 0 }); ScrollTrigger.refresh(); }
}
chipsEl.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (b) setFilter(b.dataset.f); });
renderTrack();

/* Ficha lateral */
const sheet = $('#sheet');
track.addEventListener('click', (e) => {
  const b = e.target.closest('.card'); if (!b) return;
  const p = PRODUCTS[+b.dataset.i]; const cat = catById(p.c);
  sheet.style.setProperty('--bg', cat.pastel);
  $('.sheet-img img', sheet).src = src(p.img); $('.sheet-img img', sheet).alt = p.n;
  $('#sheetCat').textContent = cat.name; $('#sheetTitle').textContent = p.n; $('#sheetDesc').textContent = p.d;
  $('.sheet-tags', sheet).innerHTML = `<span>${cat.name}</span>${p.fz ? '<span>❄ Congelado</span>' : '<span>Fresco · 7 días</span>'}`;
  $('#sheetCta').dataset.product = p.n;
  sheet.showModal();
});
$('.sheet-close').addEventListener('click', () => sheet.close());
sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });
$('#sheetCta').addEventListener('click', (e) => { $('#a-msg').value = `Me interesa: ${e.currentTarget.dataset.product}`; sheet.close(); });

/* Pestañas y formularios (demo: no se envía nada) */
function selectTab(id) {
  $$('.tabs [role=tab]').forEach((t) => {
    const on = t.id === `tab-${id}`; t.setAttribute('aria-selected', String(on));
    $(`#${t.getAttribute('aria-controls')}`).hidden = !on;
  });
}
$('.tabs').addEventListener('click', (e) => { const t = e.target.closest('[role=tab]'); if (t) selectTab(t.id.replace('tab-', '')); });
$$('.demo-form').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = $('.form-msg', f);
  if (!f.checkValidity()) { msg.classList.add('err'); msg.textContent = 'Revisa los campos obligatorios.'; f.reportValidity(); return; }
  msg.classList.remove('err'); msg.textContent = '¡Gracias! Esto es un prototipo: no se ha enviado ningún dato.'; f.reset();
}));

/* Menú móvil */
const burger = $('.nav-burger'); const mnav = $('#mnav');
const setMenu = (open) => { burger.setAttribute('aria-expanded', String(open)); mnav.hidden = !open; open ? lenis?.stop() : lenis?.start(); };
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));

/* ───────── Scroll suave ───────── */
let lenis = null;
if (!STATIC) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const el = document.querySelector(a.getAttribute('href')); if (!el) return;
  e.preventDefault();
  if (a.dataset.tab) selectTab(a.dataset.tab);
  if (a.id === 'ringBtn') setFilter(ring.activeId === 'congelados' ? 'congelados' : ring.activeId);
  if (!mnav.hidden) setMenu(false);
  if (lenis) lenis.scrollTo(el, { duration: 1.8 }); else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
});

/* Catálogo horizontal fijado (escritorio) */
if (!STATIC) {
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  gsap.matchMedia().add('(min-width: 768px)', () => {
    {
      const tw = gsap.to(track, { x: () => -dist(), ease: 'none' });
      const st = ScrollTrigger.create({
        trigger: catalogEl, start: 'top top', end: () => `+=${Math.max(1, dist())}`,
        pin: true, scrub: 0.8, animation: tw, invalidateOnRefresh: true,
      });
      return () => { st.kill(); tw.kill(); gsap.set(track, { x: 0 }); };
    }
  });
}

/* Cursor personalizado */
const cursor = $('.cursor');
if (matchMedia('(pointer: fine)').matches) {
  addEventListener('pointermove', (e) => {
    cursor.style.opacity = 1;
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    cursor.classList.toggle('big', !!e.target.closest('a, button, input, textarea, label'));
  }, { passive: true });
}

/* ───────── Escenas con scroll: maquetación y revelado de textos ───────── */
const scenes = $$('[data-scene]').map((el) => {
  const items = $$('[data-r], .line > span', el).map((node, i) => ({
    node, i, isLine: node.parentElement.classList.contains('line'),
    holdStart: !!node.closest('[data-hold-start]'), holdEnd: !!node.closest('[data-hold-end]'),
    counters: $$('[data-count]', node).map((c) => ({ c, v: +c.dataset.count })),
  }));
  return { el, id: el.id, key: el.dataset.scene, stage: $('.stage', el), items, top: 0, h: 1, t: 0 };
});
const contactEl = $('#contacto');
let vh = innerHeight;
function layout() {
  vh = innerHeight;
  scenes.forEach((s) => { const r = s.el.getBoundingClientRect(); s.top = r.top + scrollY; s.h = r.height; });
}
let intro = STATIC ? 1 : 0;
function updateText(s) {
  const t = s.t;
  let vis = 0;
  for (const it of s.items) {
    const d = it.i * 0.022;
    let a = it.holdStart ? ss(it.i * 0.06, it.i * 0.06 + 0.45, intro) : ss(0.03 + d, 0.15 + d, t);
    if (!it.holdEnd) a = Math.min(a, 1 - ss(0.82, 0.96, t));
    if (STATIC) a = 1;
    vis = Math.max(vis, a);
    if (it.isLine) it.node.style.transform = `translate3d(0, ${(1 - a) * 108}%, 0)`;
    else { it.node.style.opacity = a; it.node.style.transform = `translate3d(0, ${(1 - a) * 36}px, 0)`; }
    for (const c of it.counters) c.c.textContent = Math.round(c.v * ss(0.2, 1, a));
  }
  s.stage.style.setProperty('--vis', vis.toFixed(3));
}

/* Revelado estático (movimiento reducido / sin WebGL) */
if (STATIC) {
  scenes.forEach((s) => { s.t = 0.5; updateText(s); });
  $$('.channels li').forEach((li) => li.classList.add('on'));
  const loader = $('#loader'); loader.remove();
}

/* ───────── Mundo 3D ───────── */
const ring = { activeId: 'sandwiches', active: 0 };
const campoFloat = [];
if (!STATIC) boot();

async function boot() {
  const canvas = $('#world');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile() ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 220);
  const bg = new THREE.Color(PAL.crema);
  scene.fog = new THREE.Fog(bg, 22, 58);
  const U = { uFogColor: { value: bg }, uFogNear: { value: 22 }, uFogFar: { value: 58 } };
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  /* ── carga de imágenes con progreso ── */
  const need = new Set([
    'sansala_comida-fresca_variada_sabrosa-scaled', 'noticias_def_1-scaled', 'noticia_sansala_sandwiches', 'sansala_noticias3-scaled',
    'sansala_conocenos', 'sansala_contacto_comida_fresca-scaled', 'mision_sansala_2-1', 'travel_channel', 'gasolineras',
    'restauracion_aerea_y_ferroviaria', 'colectividades', 'vending_sansala', 'certificacion_ifs_conocenos_sansala',
    'certificacion_sansala_conocenosgarantia_halal_junta_islamica', 'asc_certificacion_sansala_conocenos', 'certificacion_msc',
    ...CATS.map((c) => c.img), ...RING.filter((r) => r.img).map((r) => r.img),
    'SW-BLT_2', 'Bowl-Genovesa_2', 'Wrap-BURRITO_2', 'Postre-1', 'PLANTILLA-FOTOS-WEB-SANSALA-4', 'Bloomer-Jamon_Chedar',
    'Bowl-POKE-ARROZ-salmon', 'SW-SENSACIONAL_2', 'Panini-BBQ_2', '2', 'especiales3', 'PLANTILLA-FOTOS-WEB-SANSALA-6',
  ]);
  const imgs = {}; let done = 0;
  const bar = $('.loader-bar i'); const pct = $('.loader-pct');
  await Promise.all([...need].map((n) => new Promise((res) => {
    const im = new Image();
    im.onload = im.onerror = () => { imgs[n] = im.naturalWidth ? im : null; done++; const p = Math.round((done / need.size) * 100); bar.style.width = `${p}%`; pct.textContent = `${p}%`; res(); };
    im.src = src(n);
  })));
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);

  const tex = (source) => { const t = source instanceof HTMLCanvasElement ? new THREE.CanvasTexture(source) : new THREE.Texture(source); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; t.needsUpdate = true; return t; };
  const canvas2d = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); return c; };
  const drawCover = (g, im, x, y, w, h) => { if (!im) return; const s = Math.max(w / im.naturalWidth, h / im.naturalHeight); const iw = im.naturalWidth * s, ih = im.naturalHeight * s; g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.drawImage(im, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); g.restore(); };
  const drawContain = (g, im, x, y, w, h) => { if (!im) return; const s = Math.min(w / im.naturalWidth, h / im.naturalHeight); const iw = im.naturalWidth * s, ih = im.naturalHeight * s; g.drawImage(im, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); };

  /* ── material de plano-imagen: esquinas redondeadas, niebla y fundido cercano ── */
  const planeMat = (map, aspect, { radius = 0.06, opacity = 1, side = THREE.DoubleSide } = {}) => new THREE.ShaderMaterial({
    uniforms: { map: { value: map }, uAspect: { value: aspect }, uRadius: { value: radius }, uOpacity: { value: opacity }, ...U },
    vertexShader: `varying vec2 vUv; varying float vDepth;
      void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform sampler2D map; uniform float uAspect, uRadius, uOpacity, uFogNear, uFogFar; uniform vec3 uFogColor;
      varying vec2 vUv; varying float vDepth;
      void main(){
        vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
        vec2 q = abs(p) - (vec2(uAspect, 1.0) * 0.5 - uRadius);
        float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
        vec4 c = texture2D(map, vUv);
        float a = c.a * (1.0 - smoothstep(-0.003, 0.003, d)) * uOpacity * smoothstep(0.7, 3.2, vDepth);
        c.rgb = mix(c.rgb, uFogColor, smoothstep(uFogNear, uFogFar, vDepth));
        gl_FragColor = vec4(c.rgb, a);
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, side,
  });
  const imagePlane = (map, w, h, opts) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), planeMat(map, w / h, opts));
  const flat = (m) => { m.rotation.x = -Math.PI / 2; return m; };
  const shadowTex = tex(canvas2d(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 10, 128, 128, 128); r.addColorStop(0, 'rgba(28,60,30,.55)'); r.addColorStop(1, 'rgba(28,60,30,0)'); g.fillStyle = r; g.fillRect(0, 0, 256, 256); }));
  const shadow = (size) => flat(new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })));
  const productCard = (name, size, bgc) => {
    const c = canvas2d(512, 512, (g) => { g.fillStyle = bgc || PAL.arena; g.fillRect(0, 0, 512, 512); drawCover(g, imgs[name], 0, 0, 512, 512); });
    return imagePlane(tex(c), size, size, { radius: 0.09 });
  };

  /* ════ ESCENA 1 · HERO (vista cenital de los bowls) ════ */
  const heroIm = imgs['sansala_comida-fresca_variada_sabrosa-scaled'];
  const heroAsp = heroIm ? heroIm.naturalWidth / heroIm.naturalHeight : 1.47;
  scene.add(flat(imagePlane(tex(heroIm), 16, 16 / heroAsp, { radius: 0.025 })));
  const heroCards = [
    ['SW-BLT_2', 8.8, 2.4, -3.9, 2.3], ['Wrap-SUSHI_2', 7.9, 3.8, 5.7, 2.1], ['Postre-2', -0.9, 2.9, -7.3, 1.8],
    ['bagel-salmon-1', 3.6, 1.4, 6.8, 2.0], ['Panini-BBQ_2', -6.6, 4.3, -6.3, 2.0], ['Bowl-Genovesa_2', 11.6, 1.2, 1.4, 2.2],
  ].map(([n, x, y, z, s], i) => {
    const m = flat(productCard(n, s)); m.position.set(x, y, z); m.rotation.z = (rand() - 0.5) * 0.5;
    m.material.side = THREE.FrontSide; m.userData = { y, ph: i * 1.3 }; scene.add(m); return m;
  });

  /* ════ ESCENA 2 · CAMPO (vuelo rasante entre fotos y hojas) ════ */
  [['noticias_def_1-scaled', -4.6, 2.1, -20, 0.38], ['noticia_sansala_sandwiches', 4.8, 2.5, -27.5, -0.42],
   ['sansala_noticias3-scaled', -4.9, 1.3, -35, 0.42], ['sansala_conocenos', 4.4, 1.7, -43, -0.36],
   ['sansala_contacto_comida_fresca-scaled', -4.2, 2.7, -51, 0.32]].forEach(([n, x, y, z, ry]) => {
    const im = imgs[n]; const a = im ? im.naturalWidth / im.naturalHeight : 1.5; const h = 3.3;
    const m = imagePlane(tex(im), h * a, h, { radius: 0.05 }); m.position.set(x, y, z); m.rotation.y = ry; scene.add(m);
  });
  [['PLANTILLA-FOTOS-WEB-SANSALA-3', -1.4, 4.1, -31, 1.7], ['PLANTILLA-FOTOS-WEB-SANSALA-4', 1.9, -0.2, -39, 1.6], ['Bloomer-Jamon_Chedar', -1.7, 0.0, -47.5, 1.5]]
    .forEach(([n, x, y, z, s]) => { const m = imagePlane(tex(imgs[n]), s, s * 0.975, { radius: 0 }); m.position.set(x, y, z); m.userData.spin = rand(); scene.add(m); campoFloat.push(m); });

  /* Hojas: InstancedMesh */
  const leafTex = tex(canvas2d(128, 256, (g) => {
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(64, 6); g.bezierCurveTo(126, 70, 118, 190, 64, 250); g.bezierCurveTo(10, 190, 2, 70, 64, 6); g.fill();
    g.strokeStyle = 'rgba(0,0,0,.18)'; g.lineWidth = 3; g.beginPath(); g.moveTo(64, 20); g.lineTo(64, 240); g.stroke();
  }));
  const LEAVES = isMobile() ? 70 : 170;
  const leaves = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.34, 0.68), new THREE.MeshBasicMaterial({ map: leafTex, transparent: true, depthWrite: false, side: THREE.DoubleSide }), LEAVES);
  const leafData = []; const greens = ['#1C592A', '#4E7F3A', '#8DBA6A', '#B5CFB6', '#CED3A3', '#6FA552'].map((c) => new THREE.Color(c));
  for (let i = 0; i < LEAVES; i++) {
    const z = 4 - rand() * 72; const side = rand() < 0.5 ? -1 : 1;
    leafData.push({ x: side * (0.8 + rand() * 7.5), y: -0.8 + rand() * 6.5, z, r: rand() * TAU, s: 0.6 + rand() * 0.9, sp: 0.3 + rand() * 0.7 });
    leaves.setColorAt(i, greens[i % greens.length]);
  }
  scene.add(leaves);
  const dummy = new THREE.Object3D();

  /* ════ ESCENA 3 · OBRADOR (el sándwich se monta capa a capa) ════ */
  const S = new THREE.Vector3(0, 1, -75);
  const sandwich = new THREE.Group(); sandwich.position.copy(S); scene.add(sandwich);
  scene.add(new THREE.HemisphereLight(0xfffbe8, 0xd9c7a0, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.4); sun.position.set(5, 13, -67); sun.target = sandwich; scene.add(sun);
  const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.82, ...o });
  const lettuceGeo = () => {
    const g = new THREE.PlaneGeometry(3.75, 3.75, 36, 36); g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); const r = Math.hypot(x, z); p.setY(i, Math.sin(x * 3.1) * 0.06 + Math.cos(z * 3.7) * 0.06 + r * r * 0.012 * Math.sin(Math.atan2(z, x) * 7)); }
    g.computeVertexNormals(); return g;
  };
  const tomato = new THREE.Group();
  [[-0.85, -0.6], [0.92, -0.45], [0.05, 0.88]].forEach(([x, z]) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.74, 0.14, 40), mat('#D84A3B', { roughness: 0.5 })); m.position.set(x, 0, z); tomato.add(m); });
  const layers = [
    [new THREE.Mesh(new RoundedBoxGeometry(3.3, 0.5, 3.3, 4, 0.2), mat('#E9C796')), 0.5],
    [new THREE.Mesh(lettuceGeo(), mat('#8DBA6A', { side: THREE.DoubleSide })), 0.14],
    [tomato, 0.14],
    [(() => { const m = new THREE.Mesh(new THREE.BoxGeometry(3.05, 0.07, 3.05), mat('#F2C450', { roughness: 0.6 })); m.rotation.y = 0.45; return m; })(), 0.08],
    [new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.09, 48), mat('#E7A2A0', { roughness: 0.6 })), 0.1],
    [new THREE.Mesh(lettuceGeo(), mat('#6FA552', { side: THREE.DoubleSide })), 0.14],
    [new THREE.Mesh(new RoundedBoxGeometry(3.3, 0.5, 3.3, 4, 0.2), mat('#E2B57A')), 0.5],
  ];
  let yy = 0;
  const layerData = layers.map(([obj, h], i) => {
    const stackY = yy + h / 2; yy += h;
    sandwich.add(obj);
    return { obj, stack: new THREE.Vector3(0, stackY, 0), ex: new THREE.Vector3(Math.sin(i * 2.1) * 2.4, stackY + (i - 3) * 1.05 + 0.6, Math.cos(i * 1.7) * 1.7), exr: new THREE.Euler(Math.sin(i) * 0.9, i * 0.8, Math.cos(i * 1.3) * 0.7), baseRy: obj.rotation.y };
  });
  const sw = shadow(6.5); sw.position.set(S.x, S.y - 0.45, S.z); scene.add(sw);

  /* ════ ESCENA 4 · ANILLO DE FAMILIAS ════ */
  const R0 = new THREE.Vector3(0, 1.4, -110); const RR = 6.6; const N = RING.length; const STEP = TAU / N;
  const ringAng = (i) => (i + 0.25) * STEP;
  const ringItems = RING.map((r, i) => {
    const c = { ...catById(r.id), ...r };
    const cv = canvas2d(512, 640, (g) => {
      g.fillStyle = c.pastel; g.fillRect(0, 0, 512, 640); drawCover(g, imgs[c.img], 0, 0, 512, 512);
      g.fillStyle = PAL.verde; g.font = '800 44px Poppins, Arial Black, sans-serif'; g.textBaseline = 'middle'; g.fillText(c.name.toUpperCase(), 34, 578);
      g.font = '700 22px Manrope, sans-serif'; g.globalAlpha = 0.6; g.fillText(String(i + 1).padStart(2, '0'), 442, 578);
    });
    const m = imagePlane(tex(cv), 3.0, 3.75, { radius: 0.1 });
    const a = ringAng(i); m.position.set(R0.x + RR * Math.sin(a), R0.y, R0.z - RR * Math.cos(a)); m.rotation.y = -a;
    m.userData = { id: r.id, cat: c }; scene.add(m); return m;
  });
  const dots = $('.ring-dots'); dots.innerHTML = RING.map((r) => `<li>${(catById(r.id).name || r.name)}</li>`).join('');

  /* ════ ESCENA 5 · CANALES (órbita) ════ */
  const C = new THREE.Vector3(0, 0, -150);
  const bowl = flat(imagePlane(tex(imgs['PLANTILLA-FOTOS-WEB-SANSALA-3']), 4.6, 4.49, { radius: 0 })); bowl.position.set(C.x, C.y + 0.05, C.z); scene.add(bowl);
  const bs = shadow(7); bs.position.copy(C); scene.add(bs);
  const orbit = flat(new THREE.Mesh(new THREE.RingGeometry(4.58, 4.62, 160), new THREE.MeshBasicMaterial({ color: PAL.verde, transparent: true, opacity: 0.35, side: THREE.DoubleSide }))); orbit.position.set(C.x, C.y + 1.3, C.z); scene.add(orbit);
  const channels = [['mision_sansala_2-1', 'Retail'], ['travel_channel', 'Travel'], ['gasolineras', 'Gasolineras'], ['restauracion_aerea_y_ferroviaria', 'Restauración'], ['colectividades', 'Colectividades'], ['vending_sansala', 'Vending']]
    .map(([n, label]) => {
      const cv = canvas2d(512, 600, (g) => { g.fillStyle = PAL.arena; g.fillRect(0, 0, 512, 600); drawContain(g, imgs[n], 116, 70, 280, 280); g.fillStyle = PAL.verde; g.font = '800 46px Poppins, Arial Black, sans-serif'; g.textAlign = 'center'; g.fillText(label.toUpperCase(), 256, 470); });
      const m = imagePlane(tex(cv), 1.9, 2.23, { radius: 0.12 }); scene.add(m); return m;
    });
  const chLis = $$('.channels li');

  /* ════ ESCENA 6 · CERTIFICADOS ════ */
  const certs = ['certificacion_ifs_conocenos_sansala', 'certificacion_sansala_conocenosgarantia_halal_junta_islamica', 'asc_certificacion_sansala_conocenos', 'certificacion_msc'].map((n, i) => {
    const cv = canvas2d(640, 400, (g) => { g.fillStyle = '#fff'; g.fillRect(0, 0, 640, 400); drawContain(g, imgs[n], 50, 40, 540, 320); });
    const m = imagePlane(tex(cv), 2.6, 1.625, { radius: 0.1 });
    m.userData = { sp: new THREE.Vector3((rand() - 0.5) * 13, rand() * 5 - 1.4, -184 - rand() * 14), sr: new THREE.Euler((rand() - 0.5) * 1.3, (rand() - 0.5) * 1.6, (rand() - 0.5) * 0.9), i };
    scene.add(m); return m;
  });
  const certFinal = (i, out) => {
    if (isMobile()) return out.set((i % 2 - 0.5) * 2.75, 0.15 - Math.floor(i / 2) * 1.85, -201);
    return out.set((i - 1.5) * 2.95, 0.25, -203);
  };

  /* ════ ESCENA 7 · ATERRIZAJE ════ */
  const F = new THREE.Vector3(0, 0, -232);
  const finIm = imgs['sansala_contacto_comida_fresca-scaled']; const finAsp = finIm ? finIm.naturalWidth / finIm.naturalHeight : 1.27;
  const finPlane = flat(imagePlane(tex(finIm), 13, 13 / finAsp, { radius: 0.025 })); finPlane.position.copy(F); scene.add(finPlane);
  [['Bowl-POKE-ARROZ-salmon', 8.4, 2.6, -236, 2.2], ['SW-SENSACIONAL_2', 7.6, 3.6, -226.5, 2.0], ['2', -7.8, 1.8, -237.5, 2.1], ['especiales3', 1.5, 3.2, -238.6, 1.8], ['PLANTILLA-FOTOS-WEB-SANSALA-6', -6.9, 4.0, -225.8, 2.0]]
    .forEach(([n, x, y, z, s]) => { const m = flat(productCard(n, s)); m.position.set(x, y, z); m.rotation.z = (rand() - 0.5) * 0.5; m.material.side = THREE.FrontSide; scene.add(m); });

  /* ───────── Cámara: una función por escena ───────── */
  const st = () => ({ p: new THREE.Vector3(), tg: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0), bg: new THREE.Color() });
  const cA = st(), cB = st(), cur = st(), goal = st();
  const col = (h) => new THREE.Color(h);
  const C_CREMA = col(PAL.crema), C_ARENA = col(PAL.arena), C_SALVIA = col(PAL.salvia), C_VERDE = col(PAL.verde);
  const pastels = RING.map((r) => col(catById(r.id).pastel || r.pastel).lerp(C_CREMA, 0.45));
  const UP_DOWN = new THREE.Vector3(0, 0, -1), UP = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3();

  const SC = {
    hero: { cam(s, o) {
      const m = isMobile(); const ox = m ? 0 : -4.6; const oz = m ? 5.5 : 0; const y0 = m ? 30 : 16.5; const e = ease(s);
      const k = ease(ss(0.22, 1, s));
      o.p.set(lerp(ox, 0, e), lerp(y0, 1.7, e), lerp(oz, -10, ss(0.25, 1, s)));
      o.tg.set(lerp(ox, 0, k), lerp(0, 1.4, k), lerp(oz - 0.5 * s, -40, k));
      o.up.copy(UP_DOWN).lerp(UP, ss(0.3, 0.92, s)).normalize(); o.bg.copy(C_CREMA);
    } },
    campo: { cam(s, o) {
      const z = -12 - 50 * s; const x = Math.sin(s * TAU) * 1.1 + ss(0.6, 1, s) * 5.4; const y = 1.7 + Math.sin(s * Math.PI) * 0.55;
      o.p.set(x, y, z);
      o.tg.set(x * 0.4, 1.4, z - 18).lerp(new THREE.Vector3(0, 1.2, -75), ss(0.62, 1, s));
      o.up.copy(UP).applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.sin(s * TAU) * 0.04); o.bg.copy(C_CREMA).lerp(C_ARENA, ss(0.2, 0.9, s));
    } },
    obrador: { cam(s, o) {
      const th = lerp(0.55, -0.55, s); const r = lerp(10.5, 7.6, s); const h = lerp(3.4, 1.5, s);
      o.p.set(S.x + r * Math.sin(th), S.y + h, S.z + r * Math.cos(th));
      right.set(Math.cos(th), 0, -Math.sin(th));
      o.tg.copy(S).add(isMobile() ? new THREE.Vector3(0, -1.3, 0) : right.multiplyScalar(2.3)).add(new THREE.Vector3(0, 0.5, 0));
      o.up.copy(UP); o.bg.copy(C_ARENA);
    } },
    ring: { cam(s, o) {
      const u = s * (N - 1); const k = Math.min(N - 2, Math.floor(u)); const f = u - k; const step = k + ss(0.28, 0.72, f);
      const phi = ringAng(0) + step * STEP; ring.step = step;
      o.p.copy(R0); o.p.y += Math.sin(s * TAU * 2) * 0.08;
      const look = phi - (isMobile() ? 0 : 0.3);
      o.tg.set(R0.x + Math.sin(look) * RR, R0.y - (isMobile() ? 1.25 : 0), R0.z - Math.cos(look) * RR);
      o.up.copy(UP);
      const kk = Math.floor(step); o.bg.copy(pastels[kk]).lerp(pastels[Math.min(N - 1, kk + 1)], step - kk);
    } },
    canales: { cam(s, o) {
      const az = lerp(-0.9, 0.95, s); const rad = lerp(10.5, 13, s); const h = lerp(3.0, 7.6, s);
      o.p.set(C.x + Math.sin(az) * rad, C.y + h, C.z + Math.cos(az) * rad);
      right.set(Math.cos(az), 0, -Math.sin(az));
      o.tg.copy(C).add(isMobile() ? new THREE.Vector3(0, -2.4, 0) : right.multiplyScalar(-3.4)).add(new THREE.Vector3(0, 0.6, 0));
      o.up.copy(UP); o.bg.copy(C_CREMA);
    } },
    certs: { cam(s, o) {
      const endZ = isMobile() ? -189 : -194;
      o.p.set(0, 1.3, lerp(-168, endZ, easeOut(s)));
      o.tg.set(0, isMobile() ? 0.2 : 0.9, o.p.z - 20); o.up.copy(UP);
      o.bg.copy(C_CREMA).lerp(C_SALVIA, ss(0, 0.35, s));
    } },
    final: { cam(s, o) {
      const m = isMobile(); const ox = m ? 0 : -4.6; const y1 = m ? 22 : 15.5; const e = ease(s);
      o.p.set(lerp(0, ox, e), lerp(1.4, y1, e), lerp(-212, F.z, e));
      o.tg.set(lerp(0, ox, e), lerp(1.0, 0, e), lerp(-250, F.z, ease(clamp(s * 1.1))));
      o.up.copy(UP).lerp(UP_DOWN, ss(0.25, 0.92, s)).normalize();
      o.bg.copy(C_SALVIA).lerp(C_VERDE, ss(0.3, 0.8, s));
    } },
  };
  const TR = 0.16;
  const evalCam = (i, t, out) => {
    const cfg = SC[scenes[i].key];
    if (i > 0 && t < TR) {
      SC[scenes[i - 1].key].cam(1, cA); cfg.cam(0, cB); const k = ease(t / TR);
      out.p.lerpVectors(cA.p, cB.p, k); out.tg.lerpVectors(cA.tg, cB.tg, k); out.up.lerpVectors(cA.up, cB.up, k).normalize(); out.bg.lerpColors(cA.bg, cB.bg, k);
    } else cfg.cam(i > 0 ? (t - TR) / (1 - TR) : t, out);
  };
  const local = (key) => { const s = scenes.find((x) => x.key === key); const i = scenes.indexOf(s); return i > 0 ? clamp((s.t - TR) / (1 - TR)) : s.t; };

  /* ───────── Bucle ───────── */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => { mouse.tx = e.clientX / innerWidth * 2 - 1; mouse.ty = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  const nav = $('.nav'); const meter = $('.meter'); const meterLis = $$('li', meter);
  const ringName = $('#ringName'); const ringLine = $('#ringLine'); const ringBtn = $('#ringBtn');
  let first = true; let lastActive = -1; let last = performance.now();
  const tmpV = new THREE.Vector3(); const tmpE = new THREE.Euler(); const qa = new THREE.Quaternion(); const qb = new THREE.Quaternion();

  function setRingActive(a) {
    if (a === lastActive) return; lastActive = a;
    const r = RING[a]; const c = { ...catById(r.id), ...r }; ring.activeId = r.id; ring.active = a;
    ringName.classList.add('swap');
    setTimeout(() => { ringName.textContent = c.name; ringLine.textContent = c.line; ringName.classList.remove('swap'); }, 180);
    ringBtn.textContent = `Ver ${c.name.toLowerCase()}`;
    $$('li', dots).forEach((li, i) => li.classList.toggle('on', i === a));
  }

  function frame() {
    const now = performance.now(); const dt = Math.min(0.05, (now - last) / 1000); last = now; const time = now / 1000;
    const y = scrollY;
    for (const s of scenes) { s.t = clamp((y - s.top) / Math.max(1, s.h - vh)); if (y > s.top - vh * 1.2 && y < s.top + s.h + vh * 0.2) updateText(s); }
    let k = 0; for (let i = 0; i < scenes.length; i++) if (y >= scenes[i].top - 1) k = i;
    evalCam(k, scenes[k].t, goal);

    const damp = first ? 1 : 1 - Math.exp(-dt * 7); first = false;
    cur.p.lerp(goal.p, damp); cur.tg.lerp(goal.tg, damp); cur.up.lerp(goal.up, damp).normalize(); cur.bg.lerp(goal.bg, damp);
    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
    camera.position.copy(cur.p); camera.up.copy(cur.up); camera.lookAt(cur.tg);
    camera.translateX(mouse.x * 0.28); camera.translateY(-mouse.y * 0.18);
    bg.copy(cur.bg); renderer.setClearColor(bg);
    document.documentElement.style.setProperty('--scene-bg', `#${bg.getHexString()}`);

    /* animaciones por escena */
    heroCards.forEach((m) => { m.position.y = m.userData.y + Math.sin(time * 0.7 + m.userData.ph) * 0.12; });
    campoFloat.forEach((m, i) => { m.rotation.z = Math.sin(time * 0.5 + i) * 0.15; m.position.y += Math.sin(time + i) * 0.002; });
    for (let i = 0; i < LEAVES; i++) {
      const d = leafData[i];
      dummy.position.set(d.x + Math.sin(time * d.sp + i) * 0.4, d.y + Math.sin(time * d.sp * 0.8 + i * 3) * 0.35, d.z);
      dummy.rotation.set(time * d.sp * 0.6 + d.r, time * d.sp * 0.4 + i, Math.sin(time * d.sp + d.r) * 0.8);
      dummy.scale.setScalar(d.s); dummy.updateMatrix(); leaves.setMatrixAt(i, dummy.matrix);
    }
    leaves.instanceMatrix.needsUpdate = true;

    const so = local('obrador'); const asm = ss(0.02, 0.7, so) * (scenes.find((x) => x.key === 'obrador').t > 0 ? 1 : 0);
    layerData.forEach((L, i) => {
      const a = ease(ss(i * 0.07, 0.42 + i * 0.07, asm));
      L.obj.position.lerpVectors(L.ex, L.stack, a);
      L.obj.position.y += (1 - a) * Math.sin(time * 1.2 + i) * 0.12;
      L.obj.rotation.set(lerp(L.exr.x, 0, a), lerp(L.exr.y, L.baseRy, a) + (1 - a) * time * 0.2, lerp(L.exr.z, 0, a));
    });
    sandwich.rotation.y = time * 0.12 + so * 1.4;
    sw.material.opacity = 0.35 + asm * 0.65;

    const sr = scenes.find((x) => x.key === 'ring');
    if (sr.t > 0 && sr.t < 1) setRingActive(Math.round(ring.step ?? 0));
    else if (sr.t <= 0) setRingActive(0);
    ringItems.forEach((m, i) => {
      const on = Math.max(0, 1 - Math.abs((ring.step ?? 0) - i));
      m.scale.setScalar(lerp(m.scale.x, 0.9 + on * 0.2, 0.1)); m.material.uniforms.uOpacity.value = 0.45 + on * 0.55;
    });

    const sc = local('canales'); const chIdx = Math.min(5, Math.floor(sc * 6));
    channels.forEach((m, i) => {
      const a = i * TAU / 6 + time * 0.07 + sc * 1.6;
      m.position.set(C.x + Math.cos(a) * 4.6, C.y + 1.3 + Math.sin(time * 0.9 + i) * 0.14, C.z + Math.sin(a) * 4.6);
      m.quaternion.copy(camera.quaternion);
      m.scale.setScalar(lerp(m.scale.x, i === chIdx ? 1.22 : 0.92, 0.1));
    });
    chLis.forEach((li, i) => li.classList.toggle('on', i === chIdx));
    bowl.rotation.z = time * 0.05;

    const sct = local('certs'); const arr = ease(ss(0.2, 0.82, sct));
    certs.forEach((m) => {
      const u = m.userData; certFinal(u.i, tmpV);
      m.position.lerpVectors(u.sp, tmpV, arr); m.position.y += (1 - arr) * Math.sin(time + u.i) * 0.2;
      qa.setFromEuler(u.sr); qb.identity(); m.quaternion.slerpQuaternions(qa, qb, arr);
      m.scale.setScalar(isMobile() ? 0.9 : 1);
    });

    /* interfaz */
    const mid = y + vh * 0.5; let curId = null;
    for (const s of scenes) if (mid >= s.top && mid < s.top + s.h) curId = s.id;
    meterLis.forEach((li) => li.classList.toggle('on', li.dataset.for === curId));
    const fin = scenes[scenes.length - 1];
    const dark = curId === 'hablamos' && fin.t > 0.45;
    nav.classList.toggle('on-dark', dark); meter.classList.toggle('on-dark', dark);
    meter.classList.toggle('hide', !curId);

    renderer.render(scene, camera);
  }

  /* ───────── Arranque ───────── */
  layout();
  ScrollTrigger.addEventListener('refresh', layout);
  ScrollTrigger.refresh();
  let rz; addEventListener('resize', () => {
    clearTimeout(rz); rz = setTimeout(() => {
      renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile() ? 1.5 : 2));
      renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); ScrollTrigger.refresh();
    }, 150);
  });
  if (isMobile()) { U.uFogNear.value = 28; U.uFogFar.value = 64; scene.fog.near = 28; scene.fog.far = 64; }

  /* clic sobre una tarjeta del anillo → catálogo filtrado */
  const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2();
  addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, label, dialog, .catalog, .contact, footer, header')) return;
    const sr = scenes.find((x) => x.key === 'ring'); if (sr.t <= 0 || sr.t >= 1) return;
    ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(ringItems)[0]; if (!hit) return;
    setFilter(hit.object.userData.id); lenis.scrollTo(catalogEl, { duration: 1.6 });
  });

  gsap.ticker.add(frame);
  frame();

  /* salida del preloader e intro */
  const loader = $('#loader');
  gsap.to(loader, { autoAlpha: 0, duration: 0.8, delay: 0.35, ease: 'power2.out', onComplete: () => loader.remove() });
  gsap.to({ v: 0 }, { v: 1, duration: 1.8, delay: 0.5, ease: 'power3.out', onUpdate() { intro = this.targets()[0].v; } });
  lenis.start();
  if (location.hash) { const el = document.querySelector(location.hash); if (el) setTimeout(() => lenis.scrollTo(el, { immediate: true }), 50); }
}
