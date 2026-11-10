/**
 * Checks the completeness and consistency of a human-supplied architecture impact
 * manifest. DOES NOT inspect the repository, prove source evidence, or run tests.
 */
const nonempty = s => typeof s === 'string' && s.trim().length > 0;
const statusValues = ['passed','failed','not-run','not-applicable'];
const own = (x,k) => x != null && Object.prototype.hasOwnProperty.call(x,k);
function relativePath(v, allowDirectory=false) {
  if (!nonempty(v) || v.startsWith('/') || v.includes('\\') || v.includes('://') || /[\x00-\x1F]/.test(v)) return false;
  const parts=(allowDirectory && v.endsWith('/') ? v.slice(0,-1) : v).split('/');
  return parts.length>0 && !parts.some(x => !x || x==='.' || x==='..') && !v.includes('*');
}
function withinScope(path, approved) {
  return approved.some(root => typeof root==='string' && (root.endsWith('/') ? path.startsWith(root) : path===root));
}
function unique(arr) {return new Set(arr).size===arr.length;}
function issue(code,message) {return {code,message};}
const withEvidence = v=>nonempty(v?.evidence) && v.evidence.length>=6;

export function assessImpact(data) {
  const errors=[], warnings=[];
  const fail=(code,msg)=>errors.push(issue(code,msg));
  const warn=(code,msg)=>warnings.push(issue(code,msg));
  if (!data || typeof data!=='object'||Array.isArray(data)) return {ready:false,errors:[issue('invalid-document','Expected JSON object')],warnings};
  const {task,repository,stage,classification}=data;
  if (!nonempty(task))fail('missing-task','task must name the requested change or problem');
  if (!nonempty(repository))fail('missing-repository','repository must identify the actual project');
  if (!['plan','release'].includes(stage))fail('invalid-stage','stage must be plan or release');
  if (!['connected','isolated'].includes(classification?.kind))fail('missing-triage','classification.kind must be connected or isolated');
  if (!nonempty(classification?.reason)||classification.reason.trim().length<20)fail('missing-triage-reason','Provide a reason of at least 20 characters for Connected/Isolated');

  const approved=data.approvedPaths??[], changes=data.changePaths??[];
  if (!Array.isArray(approved)||!approved.every(p=>relativePath(p,true))||!unique(approved))fail('invalid-approved-scope','approvedPaths must be unique repository-relative paths or trailing-slash directories');
  if (!Array.isArray(changes)||!changes.every(relativePath)||!unique(changes))fail('invalid-changes','changePaths must be unique repository-relative paths');
  if (stage==='release' && (!Array.isArray(changes)||changes.length===0))fail('missing-change-paths','Release gate requires actual changePaths');
  if (Array.isArray(changes)&&Array.isArray(approved)) for(const path of changes) if(relativePath(path) && !withinScope(path,approved))fail('out-of-scope',`Change ${path} is not in approvedPaths`);

  const nodes=data.nodes??[],edges=data.edges??[],surfaces=data.surfaces??[],tests=data.tests??[],risk=data.riskChecks??{};
  if (classification?.kind==='connected') {
    if (!Array.isArray(nodes)||nodes.length<2)fail('missing-nodes','Connected changes require at least two architecture nodes');
    const ids=Array.isArray(nodes)?nodes.map(n=>n?.id):[];
    if (!ids.every(nonempty)||!unique(ids))fail('invalid-nodes','Node IDs must be nonempty and unique');
    if(Array.isArray(nodes))for(const n of nodes) if(!nonempty(n?.kind)||!withEvidence(n))fail('unverified-node',`Node ${n?.id||'?'} needs kind and concrete evidence reference`);
    if (!Array.isArray(edges)||edges.length<1)fail('missing-edges','Connected changes need upstream/downstream links');
    if(Array.isArray(edges))for(const e of edges) if(!ids.includes(e?.from)||!ids.includes(e?.to)||e?.from===e?.to||!nonempty(e?.relation)||!withEvidence(e))fail('invalid-edge',`Edge ${e?.from||'?'} → ${e?.to||'?'} needs valid endpoints, relation and evidence`);
    if (!Array.isArray(surfaces)||surfaces.length<1)fail('missing-surfaces','Connected work must list affected consumers/surfaces');
    if(Array.isArray(surfaces))for(const s of surfaces){
      if(!ids.includes(s?.nodeId)||!nonempty(s?.reason))fail('invalid-surface',`Surface ${s?.nodeId||'?'} must reference a mapped node with a reason`);
      else if(Array.isArray(edges)&&!edges.some(e=>e?.from===s.nodeId||e?.to===s.nodeId))fail('disconnected-surface',`Surface ${s.nodeId} has no mapped dependency edge`);
    }
    for (const name of ['authorization','dataIntegrity','downstreamEffects']) {
      const v=risk?.[name];
      if(!v||!statusValues.includes(v.status))fail('missing-risk-check',`riskChecks.${name} must have explicit status`);
      else if(v.status==='passed'&&!withEvidence(v))fail('risk-evidence',`riskChecks.${name} marked passed without evidence`);
      else if(v.status==='not-applicable'&&(!nonempty(v.reason)||v.reason.trim().length<10))fail('risk-not-applicable-reason',`riskChecks.${name} needs a not-applicable reason`);
      else if(stage==='release'&&v.status!=='passed'&&v.status!=='not-applicable')fail('risk-unresolved',`riskChecks.${name} unresolved (${v.status})`);
    }
    // Tenant filtering is required to be considered in multi-tenant contexts, but not a universal requirement in every stack.
    if(!risk||!own(risk,'tenantIsolation'))fail('tenant-not-considered','State whether tenant/company isolation is applicable');
    else if(!statusValues.includes(risk.tenantIsolation?.status))fail('tenant-risk-status','tenantIsolation requires explicit status');
    else if(risk.tenantIsolation.status==='passed'&&!withEvidence(risk.tenantIsolation))fail('tenant-risk-evidence','tenant isolation passed without evidence');
    else if(risk.tenantIsolation.status==='not-applicable'&&(!nonempty(risk.tenantIsolation.reason)||risk.tenantIsolation.reason.trim().length<10))fail('tenant-na-reason','tenant not-applicable requires reason');
    else if(stage==='release'&&!['passed','not-applicable'].includes(risk.tenantIsolation.status))fail('tenant-unresolved','tenant isolation must be resolved before release');
  }

  if (!Array.isArray(tests))fail('invalid-tests','tests must be an array');
  if (stage==='release') {
    if(!Array.isArray(tests)||tests.length===0)fail('missing-tests','Release gate requires test matrix');
    if(Array.isArray(tests))for(const t of tests){
      if(!nonempty(t?.name)||!statusValues.includes(t?.status))fail('invalid-test','Each test needs name and status');
      if(t?.status==='passed'&&!withEvidence(t))fail('test-evidence',`Test ${t?.name||'?'} claims pass without evidence`);
      if(t?.status==='not-applicable'&&(!nonempty(t.reason)||t.reason.trim().length<10))fail('test-na-reason',`Test ${t?.name||'?'} needs N/A reason`);
      if(!['passed','not-applicable'].includes(t?.status))fail('unresolved-test',`Test ${t?.name||'?'} is ${t?.status||'missing'}`);
    }
    if(classification?.kind==='connected'&&Array.isArray(surfaces)&&Array.isArray(tests)){
      for (const s of surfaces){
        const match=tests.filter(t=>Array.isArray(t?.surfaceIds)&&t.surfaceIds.includes(s?.nodeId));
        if(!match.length)fail('untested-consumer',`Affected surface ${s?.nodeId||'?'} has no test`);
        else if(!match.some(t=>t.status==='passed'))fail('unverified-consumer',`Affected surface ${s?.nodeId||'?'} has no passing test`);
      }
    }
  } else if(stage==='plan'&&Array.isArray(tests)&&!tests.length)warn('tests-not-planned','Add a regression test plan for impacted consumers');
  if(classification?.kind==='connected'&&(!Array.isArray(data.unknownConnections)||!data.unknownConnections.every(nonempty)))fail('unrecorded-unknowns','Record unknownConnections explicitly as an array, even when empty');
  if(Array.isArray(data.unknownConnections)&&data.unknownConnections.length) {
    if(stage==='release')fail('unresolved-connections','Uninspected or unknown connections remain: do not claim complete validation');
    else warn('uninspected-connections',`${data.unknownConnections.length} connections remain uninspected`);
  }
  if(data.synthetic===true)warn('synthetic','Synthetic example only; not real project or test evidence');
  return {ready:errors.length===0,errors,warnings,summary:{stage,classification:classification?.kind,architectureNodes:Array.isArray(nodes)?nodes.length:0,connections:Array.isArray(edges)?edges.length:0,affectedSurfaces:Array.isArray(surfaces)?surfaces.length:0,tests:Array.isArray(tests)?tests.length:0}};
}
