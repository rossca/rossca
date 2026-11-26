const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const types = { '.html': 'text/html', '.js': 'text/javascript' };
const srv = http.createServer((q, r) => { const p = path.join(__dirname, decodeURIComponent(q.url.split('?')[0])); fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }); r.end(d); }); }).listen(8765);
(async () => {
  const shots = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const s of shots) {
    const [name, qs] = s.split(':');
    const p = await b.newPage();
    p.on('console', m => m.type() === 'error' && console.log('ERR', m.text()));
    p.on('pageerror', e => console.log('PAGEERR', e.message));
    const t = Date.now();
    await p.goto(`http://localhost:8765/scene.html?${qs}`);
    await p.waitForFunction('window.__done', null, { timeout: 300000 });
    const data = await p.evaluate('window.__out');
    fs.writeFileSync(`out/${name}.png`, Buffer.from(data.split(',')[1], 'base64'));
    console.log(name, (Date.now() - t) / 1000 + 's');
    await p.close();
  }
  await b.close(); srv.close();
})();
