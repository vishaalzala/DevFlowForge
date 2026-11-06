#!/usr/bin/env node
/** Passive local/staging design inspection. Never clicks, fills, submits, or mutates. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validateConfig, verifyFinalUrl, isSafePath, safeText} from './policy.mjs';
import {assessFindings, diffReport, markdownReport, safeSlug} from './analyze.mjs';

const arg=(flag)=>{const i=process.argv.indexOf(flag);return i>=0?process.argv[i+1]:undefined};
const configFile=arg('--config');
if(!configFile){console.error('Usage: npm run audit -- --config config/audit.json [--baseline /path/to/report.json]');process.exit(2)}
const configPath=path.resolve(configFile);
const config=JSON.parse(await fs.readFile(configPath,'utf8'));
const {origin,viewports}=validateConfig(config);
const output=path.resolve(path.dirname(configPath),config.outputDir||'../results/design-audit');
await fs.mkdir(output,{recursive:true,mode:0o700});
const {chromium}=await import('playwright');
const browser=await chromium.launch({headless:true});
const report={tool:'devflowforge-design-intelligence',mode:'passive',environment:config.environment,origin,startedAt:new Date().toISOString(),pages:[]};
let failures=0;
try{
 for(const viewport of viewports){
  const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},reducedMotion:'reduce',serviceWorkers:'block'});
  for(const urlPath of config.paths){
   const page=await context.newPage();
   // Prevent document navigation to unapproved hosts or mutation-like paths before any redirected page loads.
   await page.route('**/*',route=>{
     const req=route.request();
     if(req.isNavigationRequest()){
       try{const u=new URL(req.url());if(u.origin!==origin||u.search||!isSafePath(u.pathname))return route.abort('blockedbyclient')}
       catch{return route.abort('blockedbyclient')}
     }
     return route.continue();
   });
   const messages=[];const push=(type,msg)=>{if(messages.length<25)messages.push({type,message:safeText(msg,160)})};
   page.on('pageerror',e=>push('pageerror',e.message));
   page.on('console',m=>{if(m.type()==='error')push('console-error',m.text())});
   page.on('requestfailed',req=>push('request-failed',`${new URL(req.url()).pathname}: ${req.failure()?.errorText||'request failed'}`));
   try{
    const response=await page.goto(new URL(urlPath,origin).href,{waitUntil:'domcontentloaded',timeout:20000});
    verifyFinalUrl(page.url(),origin);
    await page.evaluate(()=>document.fonts?.ready).catch(()=>{});
    const raw=await page.evaluate(()=>{
     const visible=(e)=>{const st=getComputedStyle(e);return st.display!=='none'&&st.visibility!=='hidden'&&e.getClientRects().length>0};
     const label=(e)=>String(e.getAttribute('aria-label')||e.getAttribute('data-testid')||e.innerText||e.textContent||'').trim().replace(/\s+/g,' ').slice(0,120);
     const h=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible);
     const headings=h.map(e=>`${e.tagName.toLowerCase()}:${label(e)}`);
     const links=[...document.querySelectorAll('a[href]')].filter(visible).map(e=>{try{return `${label(e)} → ${(new URL(e.getAttribute('href'),location.href)).pathname}`}catch{return `${label(e)} → [invalid href]`}}).slice(0,250);
     const controls=[...document.querySelectorAll('button,[role="button"],input[type="submit"],input[type="button"]')].filter(visible).map(e=>`${e.tagName.toLowerCase()}:${e.getAttribute('data-testid')||label(e)||e.getAttribute('type')||'(unnamed)'}`).slice(0,250);
     const fields=[...document.querySelectorAll('input,textarea,select')].filter(visible).map(e=>`${e.tagName.toLowerCase()}:${e.getAttribute('data-testid')||e.getAttribute('aria-label')||e.getAttribute('name')||e.id||e.type||'(unnamed)'}`).slice(0,250);
     const clippedHeadings=h.filter(e=>{const s=getComputedStyle(e);return s.overflowX==='hidden'&&e.scrollWidth>e.clientWidth+3}).length;
     const cards=[...document.querySelectorAll('[class*="card"],[class*="Card"]')].filter(visible);
     const cardShapes=new Map();for(const c of cards){const s=getComputedStyle(c);const key=[s.borderRadius,s.backgroundColor,s.padding].join('|');cardShapes.set(key,(cardShapes.get(key)||0)+1)}
     return {title:document.title,scrollWidth:Math.max(document.documentElement.scrollWidth,document.body?.scrollWidth||0),viewportWidth:innerWidth,h1Count:h.filter(e=>e.tagName.toLowerCase()==='h1').length,duplicateCards:Math.max(0,...cardShapes.values()),clippedHeadings,headings,links,controls,fields,formCount:[...document.querySelectorAll('form')].filter(visible).length};
    });
    const inventory={headings:raw.headings.map(s=>safeText(s)),links:raw.links.map(s=>safeText(s)),controls:raw.controls.map(s=>safeText(s)),fields:raw.fields.map(s=>safeText(s)),formCount:raw.formCount};
    const findings=assessFindings(raw);
    if((response?.status()||200)>=400)findings.push({severity:'issue',code:'http-error',details:`HTTP ${response.status()} on requested page`});
    for(const m of messages)if(m.type==='pageerror')findings.push({severity:'issue',code:'browser-exception',details:m.message});
    const entry={path:urlPath,viewport:viewport.name,title:safeText(raw.title),responseStatus:response?.status()||null,inventory,findings,messages};
    if(config.screenshots){
      const relative=`screenshots/${safeSlug(urlPath)}--${viewport.name}.png`;
      const screenshotFile=path.join(output,relative);
      await fs.mkdir(path.dirname(screenshotFile),{recursive:true,mode:0o700});
      await page.screenshot({path:screenshotFile,fullPage:false,animations:'disabled'});
      entry.screenshot=relative;
    }
    report.pages.push(entry);
   }catch(e){failures++;report.pages.push({path:urlPath,viewport:viewport.name,title:'',inventory:{headings:[],links:[],controls:[],fields:[],formCount:0},findings:[{severity:'issue',code:'navigation-failed',details:safeText(e.message,220)}],messages:[],failed:true})}
   finally{await page.close()}
  }
  await context.close();
 }
}finally{await browser.close()}
const baselinePath=arg('--baseline');
if(baselinePath){
 const before=JSON.parse(await fs.readFile(baselinePath,'utf8'));
 report.comparison=diffReport(before,report);
 if(config.screenshots){
  const {PNG}=await import('pngjs'),{default:pixelmatch}=await import('pixelmatch');
  const old=new Map(before.pages.map(p=>[`${p.path}|${p.viewport}`,p]));
  const now=new Map(report.pages.map(p=>[`${p.path}|${p.viewport}`,p]));
  for(const d of report.comparison){const a=old.get(d.key),b=now.get(d.key);if(!a?.screenshot||!b?.screenshot)continue;
   try{
    const pa=PNG.sync.read(await fs.readFile(path.join(path.dirname(path.resolve(baselinePath)),a.screenshot)));
    const pb=PNG.sync.read(await fs.readFile(path.join(output,b.screenshot)));
    if(pa.width!==pb.width||pa.height!==pb.height){d.visualNote='Screenshot dimensions differ; compare manually';continue}
    const diff=new PNG({width:pa.width,height:pa.height});const changed=pixelmatch(pa.data,pb.data,diff.data,pa.width,pa.height,{threshold:0.12,includeAA:false});
    d.visualChangeRatio=changed/(pa.width*pa.height);const relative=`diffs/${safeSlug(d.key)}.png`;await fs.mkdir(path.join(output,'diffs'),{recursive:true});await fs.writeFile(path.join(output,relative),PNG.sync.write(diff));d.diffImage=relative;
   }catch(e){d.visualNote=`Image comparison not available: ${safeText(e.message)}`}
  }
 }
}
report.finishedAt=new Date().toISOString();
await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2)+'\n',{mode:0o600});
await fs.writeFile(path.join(output,'report.md'),markdownReport(report)+'\n',{mode:0o600});
console.log(`Design quality inspection: ${report.pages.length} page/viewport samples, ${failures} navigation failure(s). Results: ${output}`);
if(failures)process.exitCode=1;
