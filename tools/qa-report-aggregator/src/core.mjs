const severityList = new Set(['critical', 'high', 'medium', 'low']);
const clamp = (value,max=160) => String(value??'').replace(/[\r\n|]/g,' ').replace(/(?:Bearer\s+)[a-z0-9._~-]+/gi,'Bearer [redacted]').replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi,'[email]').slice(0,max);
export function aggregate(qa, design) {
  if (!qa && !design) throw new Error('Provide at least one report');
  if (qa && (!Array.isArray(qa.pages) || !qa.origin)) throw new Error('Invalid QA report');
  if (design && (!Array.isArray(design.pages) || !design.origin)) throw new Error('Invalid design report');
  if (qa && design && new URL(qa.origin).origin !== new URL(design.origin).origin) throw new Error('Reports have different origins');
  const issues = [];
  for (const f of qa?.findings??[]) issues.push({source:'functional',status:'fail',severity:f.severity??'low',type:f.type??'issue',path:f.path??'',message:f.message??''});
  for (const page of qa?.pages??[]) for (const f of page.findings??[]) issues.push({source:'functional',status:'fail',severity:f.severity??'low',type:f.type??'issue',path:page.path??'',viewport:page.viewport??'',message:f.message??''});
  for (const page of design?.pages??[]) for (const f of page.findings??[]) issues.push({source:'visual',status:['craft','review','suggestion'].includes(f.severity)?'review':'fail',severity:f.severity==='issue'?'medium':'low',type:f.code??'visual',path:page.path??'',viewport:page.viewport??'',message:f.details??''});
  for (const f of design?.comparison??[]) {
    const removed = [...(f.missingControls??[]),...(f.removedControls??[]),...(f.missingFields??[]),...(f.removedFields??[]),...(f.removedLinks??[])];
    for (const name of removed) issues.push({source:'preservation',status:'fail',severity:'high',type:'removed-control-or-link',path:f.key??'',message:`Previously seen control, link or field missing: ${name}`});
    if (f.missingPage) issues.push({source:'preservation',status:'fail',severity:'high',type:'removed-page',path:f.key??'',message:'Previously audited page no longer appears'});
    if (Number(f.removedForms)>0) issues.push({source:'preservation',status:'fail',severity:'high',type:'removed-forms',path:f.key??'',message:`${f.removedForms} form(s) no longer appear`});
  }
  const asserted = (qa?.workflows??[]).filter(x=>x.status==='pass'||x.status==='fail');
  const notRun = (qa?.workflows??[]).filter(x=>x.status==='not-run').length;
  const counts = {fail:issues.filter(i=>i.status==='fail').length,review:issues.filter(i=>i.status==='review').length,bySeverity:{critical:0,high:0,medium:0,low:0},workflowPass:asserted.filter(x=>x.status==='pass').length,workflowFail:asserted.filter(x=>x.status==='fail').length,workflowNotRun:notRun};
  for(const i of issues) {const s=severityList.has(i.severity)?i.severity:'low';counts.bySeverity[s]++;}
  return {schema:'devflowforge-qa-report/v1',origin:qa?.origin??design?.origin,environment:qa?.environment??design?.environment,coverage:{qaPagesVisited:qa?.pages?.length??0,designViewportChecks:design?.pages?.length??0,controlsInventoried:(qa?.pages??[]).reduce((n,p)=>n+(p.controls?.length??0),0),assertedWorkflows:asserted.length,unverifiedRoutes:'unknown without repository route inventory'},counts,issues,limitations:['Only provided reports were combined; missing routes remain untested','A visual difference does not prove a functional defect','Accessibility automation cannot certify WCAG compliance']};
}
export function markdown(report){
 let s=['# DevFlowForge consolidated QA report','',`Origin: ${clamp(report.origin)} | Environment: ${clamp(report.environment)}`,'',`Visited QA pages: ${report.coverage.qaPagesVisited}; visual viewport checks: ${report.coverage.designViewportChecks}; asserted workflows: ${report.coverage.assertedWorkflows}`,`Issues: ${report.counts.fail} failures; ${report.counts.review} design review suggestions; workflows ${report.counts.workflowPass} passed / ${report.counts.workflowFail} failed / ${report.counts.workflowNotRun} not run`,'','## Findings',''];
 if(!report.issues.length)s.push('No findings in the supplied reports. This does **not** mean the site is fully tested.');
 for(const i of report.issues)s.push(`- **${clamp(i.status)} · ${clamp(i.source)} · ${clamp(i.type)}** ${clamp(i.path)} ${clamp(i.viewport)} — ${clamp(i.message,220)}`);
 s.push('','## Coverage limits','',...report.limitations.map(v=>'- '+v));return s.join('\n')+'\n';
}
