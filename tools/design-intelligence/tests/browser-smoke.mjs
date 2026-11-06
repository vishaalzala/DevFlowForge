/** Real Chromium smoke against a synthetic local website. Verify a lost button and screenshot difference. */
import http from 'node:http';import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {fileURLToPath} from 'node:url';
const tool=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
let after=false;
const server=http.createServer((_req,res)=>{
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.end(`<!doctype html><html><head><title>Local fixture</title><style>body{font-family:Arial;padding:20px}.card{background:#eee;padding:20px}</style></head><body><h1>Book appointment</h1><a href="/">Home</a><div class="card"><form><label>Contact <input name="contact" /></label><button type="button">Submit</button>${after?'':'<button type="button">Cancel</button>'}</form></div></body></html>`);
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'df-design-'));
async function run(conf,baseline){return new Promise(resolve=>{
 const args=['src/audit.mjs','--config',conf];if(baseline)args.push('--baseline',baseline);
 const child=spawn(process.execPath,args,{cwd:tool,env:{...process.env,DQ_SCREENSHOTS:'1'}});
 let out='',err='';child.stdout.on('data',x=>out+=x);child.stderr.on('data',x=>err+=x);child.on('close',code=>resolve({code,out,err}));
})}
try{
 for(const [id,name] of [['before','baseline'],['after','updated']]){
  after=id==='after';const configPath=path.join(dir,`${id}.json`);
  await fs.writeFile(configPath,JSON.stringify({baseUrl:origin,environment:'local',paths:['/'],viewports:[{name:'desktop',width:1280,height:800},{name:'mobile',width:390,height:844}],maxPages:3,outputDir:`./${id}`,screenshots:true}));
  const r=await run(configPath,after?path.join(dir,'before','report.json'):undefined);assert.equal(r.code,0,r.err+'\n'+r.out);
 }
 const result=JSON.parse(await fs.readFile(path.join(dir,'after','report.json'),'utf8'));
 assert.equal(result.pages.length,2);
 assert.ok(result.comparison.every(d=>d.removedControls.includes('button:Cancel')));
 assert.ok(result.comparison.every(d=>typeof d.visualChangeRatio==='number'));
 console.log('Design browser smoke passed: screenshots, two viewports and removed-control regression evidence.');
}finally{await new Promise(resolve=>server.close(resolve));await fs.rm(dir,{recursive:true,force:true})}
