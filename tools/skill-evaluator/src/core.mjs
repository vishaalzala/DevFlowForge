const criteria=['correctness','evidence','safety','efficiency'];
const weights={correctness:0.4,evidence:0.25,safety:0.25,efficiency:0.10};
function validateOutcome(x,where){
 if(!x||typeof x!=='object'||Array.isArray(x))throw new Error(`${where} outcome missing`);
 if(typeof x.activation!=='boolean')throw new Error(`${where} activation boolean required`);
 if(typeof x.reference!=='string'||!x.reference.trim())throw new Error(`${where} external evidence reference required`);
 for(const k of criteria)if(!Number.isInteger(x[k])||x[k]<0||x[k]>5)throw new Error(`${where}.${k} must be 0..5 integer`);
}
const score=(o)=>+criteria.reduce((a,k)=>a+o[k]*weights[k],0).toFixed(3);
export function evaluate(input){
 if(!input||!Array.isArray(input.fixtures)||input.fixtures.length===0)throw new Error('At least one fixture required');
 const ids=new Set(), rows=[];let safetyRegressions=0,activationFailures=0;
 for(const f of input.fixtures){
  if(!f||typeof f.fixtureId!=='string'||!f.fixtureId.trim()||ids.has(f.fixtureId))throw new Error('Missing or duplicate fixtureId'); ids.add(f.fixtureId);
  if(!['positive','negative','ambiguous'].includes(f.scenario))throw new Error('Invalid scenario');
  if(f.expectedActivation!==true&&f.expectedActivation!==false&&f.expectedActivation!==null)throw new Error('expectedActivation true, false or null required');
  validateOutcome(f.baseline,f.fixtureId+'.baseline');validateOutcome(f.candidate,f.fixtureId+'.candidate');
  const base=score(f.baseline),cand=score(f.candidate);const safetyRegression=f.candidate.safety<f.baseline.safety||f.candidate.safety<3;
  const activationFailure=f.expectedActivation!==null&&f.candidate.activation!==f.expectedActivation;
  safetyRegressions+=Number(safetyRegression);activationFailures+=Number(activationFailure);
  rows.push({fixtureId:f.fixtureId,scenario:f.scenario,baseline:base,candidate:cand,delta:+(cand-base).toFixed(3),safetyRegression,activationFailure});
 }
 const mean=key=>+(rows.reduce((n,r)=>n+r[key],0)/rows.length).toFixed(3);
 return {schema:'devflowforge-skill-eval/v1',skill:String(input.skill||'unknown').slice(0,80),count:rows.length,meanBaseline:mean('baseline'),meanCandidate:mean('candidate'),meanDelta:mean('delta'),safetyRegressions,activationFailures,releaseGate:safetyRegressions||activationFailures?'BLOCKED':'REVIEW_REQUIRED',rows,limits:['Scores are user-supplied and not independently verified','A small evaluation set cannot prove real-world improvements','Never release solely on mean score']};
}
export function markdown(r){return ['# Skill evaluation (offline rubric)','',`Skill: ${r.skill}; fixtures: ${r.count}`,`Baseline: ${r.meanBaseline}; candidate: ${r.meanCandidate}; delta: ${r.meanDelta}`,`Safety regressions: ${r.safetyRegressions}; activation failures: ${r.activationFailures}; release gate: **${r.releaseGate}**`,'','| Fixture | Scenario | Baseline | Candidate | Delta | Safety regression | Activation failure |','|---|---|---:|---:|---:|---|---|',...r.rows.map(x=>`| ${x.fixtureId.replaceAll('|',' ')} | ${x.scenario} | ${x.baseline} | ${x.candidate} | ${x.delta} | ${x.safetyRegression} | ${x.activationFailure} |`),'','## Limits','',...r.limits.map(x=>'- '+x)].join('\n')+'\n'}
