import test from 'node:test';import assert from 'node:assert/strict';
import {aggregate,markdown} from '../src/core.mjs';
const qa={origin:'http://localhost:3000',environment:'staging',pages:[{path:'/invoices',viewport:'desktop',controls:[{},{}],findings:[{type:'http-error',severity:'high',message:'404'}]}],workflows:[{name:'Quote to Invoice',status:'pass'},{name:'Payments',status:'not-run'}]};
const design={origin:'http://localhost:3000',environment:'staging',pages:[{path:'/invoices',findings:[{code:'same-card-grid',severity:'craft',details:'Repetitive'}]}],comparison:[]};
test('combines sources preserving fail, review and no-run status',()=>{let r=aggregate(qa,design);assert.equal(r.counts.fail,1);assert.equal(r.counts.review,1);assert.equal(r.counts.workflowPass,1);assert.equal(r.counts.workflowNotRun,1);assert.equal(r.coverage.qaPagesVisited,1);assert.match(markdown(r),/untested|fully tested/i);});
test('rejects mismatched origins',()=>assert.throws(()=>aggregate(qa,{...design,origin:'https://attacker.example'}),/different origins/));
test('cannot substitute invalid report structure',()=>assert.throws(()=>aggregate({pages:'all',origin:'http://localhost:3000'},null),/Invalid QA/));
test('does not call absence of findings comprehensive coverage',()=>{const r=aggregate({...qa,pages:[],workflows:[]},null);assert.equal(r.coverage.assertedWorkflows,0);assert.equal(r.coverage.unverifiedRoutes,'unknown without repository route inventory')});
test('redacts bearer and email in markdown',()=>{const r=aggregate({...qa,pages:[{path:'/a',findings:[{type:'error',message:'Bearer abcdefghi user@test.com'}]}]},null);const m=markdown(r);assert.doesNotMatch(m,/abcdefghi|user@test.com/);});

test('identifies missing pages and controls from actual preservation schema',()=>{const d={...design,comparison:[{key:'/invoices|desktop',removedControls:['button:Download'],removedForms:1},{key:'/billing|desktop',missingPage:true}]};const r=aggregate(qa,d);assert.equal(r.counts.fail,4);assert.equal(r.counts.review,1);assert.equal(r.counts.bySeverity.high,4);});
