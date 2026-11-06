import test from 'node:test';import assert from 'node:assert/strict';
import {safeText,isSafePath,validateConfig,verifyFinalUrl} from '../src/policy.mjs';
import {compareInventories,assessFindings,diffReport,markdownReport} from '../src/analyze.mjs';
import {proposeDirections} from '../src/directions.mjs';
const c={baseUrl:'http://127.0.0.1:3000',environment:'local',paths:['/','/about'],screenshots:false};
test('local-only read-only route and origin restrictions',()=>{
 assert.ok(isSafePath('/about'));for(const bad of ['/api/account','/delete/1','/pay-now','//evil.test/x','/index?token=abc','/foo#top','/%2fsecret','/../logout'])assert.equal(isSafePath(bad),false,bad);
 assert.equal(validateConfig(c).origin,'http://127.0.0.1:3000');
 assert.throws(()=>validateConfig({...c,baseUrl:'https://example.com',environment:'local'}),/Local targets/);
 assert.throws(()=>validateConfig({...c,baseUrl:'https://app.example.com',environment:'production'}),/local or staging/);
 assert.throws(()=>verifyFinalUrl('https://evil.example/','http://127.0.0.1:3000'),/origin/);
});
test('staging requires specific approval and no secrets in URLs',()=>{
 const s={...c,baseUrl:'https://staging.example.com',environment:'staging'};
 assert.throws(()=>validateConfig(s,{}),/DQ_APPROVED_ORIGIN/);
 assert.equal(validateConfig(s,{DQ_APPROVED_ORIGIN:'https://staging.example.com'}).origin,'https://staging.example.com');
 assert.throws(()=>validateConfig({...s,baseUrl:'https://user:password@staging.example.com'},{DQ_APPROVED_ORIGIN:'https://staging.example.com'}),/credentials/);
 assert.throws(()=>validateConfig({...s,screenshots:true},{DQ_APPROVED_ORIGIN:'https://staging.example.com'}),/DQ_SCREENSHOTS/);
});
test('responsive and page budget validation',()=>{
 assert.throws(()=>validateConfig({...c,maxPages:1}),/maxPages/);
 assert.throws(()=>validateConfig({...c,viewports:[{name:'invalid name',width:20,height:800}]}),/viewports/);
 assert.deepEqual(validateConfig({...c,viewports:[{name:'wide',width:1280,height:800}]}).viewports,[{name:'wide',width:1280,height:800}]);
});
test('preservation comparison identifies removals, not mere visual choices',()=>{
 const before={headings:['h1:Tasks'],links:['Help → /help'],controls:['button:Submit','button:Cancel'],fields:['input:email'],formCount:1};
 const after={headings:['h1:Tasks'],links:['Help → /help'],controls:['button:Submit'],fields:[],formCount:0};
 assert.deepEqual(compareInventories(before,after).removedControls,['button:Cancel']);
 assert.deepEqual(compareInventories(before,after).removedFields,['input:email']);
 assert.equal(compareInventories(before,after).removedForms,1);
 const base={origin:'http://127.0.0.1:3000',pages:[{path:'/',viewport:'desktop',inventory:before}]};
 const next={origin:'http://127.0.0.1:3000',pages:[{path:'/',viewport:'desktop',inventory:after}]};
 const diffs=diffReport(base,next);assert.equal(diffs.length,1);assert.equal(diffs[0].removedControls.length,1);
 assert.match(markdownReport({...next,environment:'local',comparison:diffs}),/removedControls/);
 assert.throws(()=>diffReport(base,{...next,origin:'https://other.test'}),/same origin/);
});
test('objective defects differ from taste suggestions',()=>{
 const x=assessFindings({scrollWidth:1400,viewportWidth:390,h1Count:1,duplicateCards:9,clippedHeadings:0});
 assert.ok(x.some(z=>z.code==='horizontal-overflow'&&z.severity==='issue'));
 assert.ok(x.some(z=>z.code==='repetitive-card-grid'&&z.severity==='craft'));
 assert.ok(!x.some(z=>z.code==='repetitive-card-grid'&&z.severity==='issue'));
 assert.equal(safeText('help@example.com'), '[email]');
});
test('three direction concepts differ and do not invent proof',()=>{
 const x=proposeDirections({product:'Example',audience:'Users',primaryJob:'Book'});
 assert.equal(x.directions.length,3);assert.equal(new Set(x.directions.map(d=>d.composition)).size,3);
 assert.deepEqual(x.facts,[]);
 assert.throws(()=>proposeDirections({product:'Example'}),/primaryJob|audience/);
});
