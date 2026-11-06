/** End-to-end smoke of the real CLI against an owned local fixture, not a third-party website. */
import http from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const here = path.dirname(fileURLToPath(import.meta.url));
const toolRoot = path.dirname(here);
const server = http.createServer(async (req, res) => {
  const allowed = { '/': 'index.html', '/about.html': 'about.html' };
  const file = allowed[new URL(req.url, 'http://localhost').pathname];
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(await fs.readFile(path.join(here, 'site', file)));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'devflowforge-qa-'));
try {
  const configPath = path.join(temp, 'config.json');
  await fs.writeFile(configPath, JSON.stringify({ baseUrl: origin, environment:'local', browser:'chromium', startPaths:['/'], allowedPathPrefixes:['/'], maxPages:3, maxDepth:2, accessibility:true, viewports:[{name:'desktop',width:1280,height:760}], outputDir:'./results' }));
  const result = await new Promise(resolve => {
    const child = spawn(process.execPath, ['src/audit.mjs','--config',configPath], {cwd:toolRoot,env:{...process.env,QA_SCREENSHOTS:'0'}});
    let stdout = '', stderr = '';
    child.stdout.on('data',c=>stdout+=c);child.stderr.on('data',c=>stderr+=c);
    child.on('close', code=>resolve({code,stdout,stderr}));
  });
  assert.equal(result.code,0,`${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(await fs.readFile(path.join(temp, 'results', 'report.json'),'utf8'));
  assert.equal(report.summary.visitedPages,2);
  assert.ok(report.summary.controlsInventoried>=2);
  assert.ok(report.pages.find(p=>p.path==='/about.html'));
  console.log('Browser smoke passed: two fixture routes, controls and report verified.');
} finally {
  server.close();
  await fs.rm(temp, {recursive:true,force:true});
}
