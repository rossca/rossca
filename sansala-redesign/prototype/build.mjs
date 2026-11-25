// Compila el prototipo en un único HTML autocontenido (JS, CSS e imágenes incrustados).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';

const js = await build({ entryPoints: ['src/main.js'], bundle: true, minify: true, format: 'iife', target: 'es2020', write: false, legalComments: 'none' });
const css = await build({ entryPoints: ['src/styles.css'], minify: true, write: false, loader: { '.css': 'css' } });
const imgs = {};
for (const f of readdirSync('img/w')) imgs[f.replace(/\.webp$/, '')] = `data:image/webp;base64,${readFileSync(`img/w/${f}`).toString('base64')}`;
const esc = (s) => s.replace(/<\/script/gi, '<\\/script');
let html = readFileSync('src/index.html', 'utf8')
  .replace('<!--STYLE-->', () => `<style>${css.outputFiles[0].text}</style>`)
  .replace('<!--IMAGES-->', () => `<script>window.__IMG=${esc(JSON.stringify(imgs))};</script>`)
  .replace('<!--SCRIPT-->', () => `<script>${esc(js.outputFiles[0].text)}</script>`);
mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
console.log(`dist/index.html  ${(html.length / 1024 / 1024).toFixed(2)} MB`);
