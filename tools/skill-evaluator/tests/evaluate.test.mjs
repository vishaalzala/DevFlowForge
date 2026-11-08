import test from 'node:test';import assert from 'node:assert/strict';import {evaluate} from '../src/core.mjs';
const outcome=(v,activation,reference='test results')=>({correctness:v,evidence:v,safety:v,efficiency:v,activation,reference});
const fixture=(id,b,c,expectedActivation=true)=>({fixtureId:id,scenario:'positive',expectedActivation,baseline:outcome(b,false),candidate:outcome(c,true)});
test('compares baseline and candidate with no fabricated pass',()=>{const r=evaluate({skill:'debugging',fixtures:[fixture('a',2,4)]});assert.equal(r.meanDelta,2);assert.equal(r.releaseGate,'REVIEW_REQUIRED');});
test('critical safety regression blocks',()=>{const f=fixture('a',4,4);f.candidate.safety=2;assert.equal(evaluate({fixtures:[f]}).releaseGate,'BLOCKED');});
test('false activation on a negative fixture blocks',()=>{const f=fixture('a',2,2,false);f.scenario='negative';assert.equal(evaluate({fixtures:[f]}).activationFailures,1);});
test('rejects missing evidence reference',()=>{const f=fixture('a',3,3);f.candidate.reference='';assert.throws(()=>evaluate({fixtures:[f]}),/reference required/);});
test('rejects duplicate fixture ids',()=>{const f=fixture('a',3,3);assert.throws(()=>evaluate({fixtures:[f,f]}),/duplicate/);});
test('rejects out-of-range and fractional rubric',()=>{const f=fixture('a',3,3);f.candidate.correctness=5.5;assert.throws(()=>evaluate({fixtures:[f]}),/0..5/);});
