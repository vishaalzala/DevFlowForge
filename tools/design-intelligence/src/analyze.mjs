import path from 'node:path';

export function normalizeSnapshot(snapshot) {
  // Stable, semantic inventory; do not treat a changed pixel as automatically broken.
  return {
    headings: [...(snapshot.headings||[])].sort(),
    links: [...(snapshot.links||[])].sort(),
    controls: [...(snapshot.controls||[])].sort(),
    fields: [...(snapshot.fields||[])].sort(),
    formCount: snapshot.formCount||0,
  };
}
function multisetDiff(before, after) {
  const counts = new Map();for(const item of after)counts.set(item,(counts.get(item)||0)+1);
  return before.filter(item=>{const n=counts.get(item)||0;if(n){counts.set(item,n-1);return false}return true});
}
export function compareInventories(before, after) {
  const a=normalizeSnapshot(before),b=normalizeSnapshot(after);
  return {
    removedHeadings:multisetDiff(a.headings,b.headings),
    removedLinks:multisetDiff(a.links,b.links),
    removedControls:multisetDiff(a.controls,b.controls),
    removedFields:multisetDiff(a.fields,b.fields),
    removedForms: Math.max(0,a.formCount-b.formCount),
    addedHeadings:multisetDiff(b.headings,a.headings),
    addedControls:multisetDiff(b.controls,a.controls),
  };
}
export function assessFindings(raw) {
  const findings=[];
  if(raw.scrollWidth > raw.viewportWidth+8)findings.push({severity:'issue',code:'horizontal-overflow',details:`document width ${raw.scrollWidth}px exceeds ${raw.viewportWidth}px viewport`});
  if(raw.h1Count===0)findings.push({severity:'review',code:'missing-primary-heading',details:'No visible h1; verify heading hierarchy for this route'});
  if(raw.h1Count>1)findings.push({severity:'review',code:'multiple-primary-headings',details:'Multiple visible h1 elements; verify information hierarchy'});
  if(raw.duplicateCards>=7)findings.push({severity:'craft',code:'repetitive-card-grid',details:'Many matching card-like surfaces; confirm that repetition suits this use case'});
  if(raw.clippedHeadings>0)findings.push({severity:'review',code:'possibly-clipped-heading',details:`${raw.clippedHeadings} heading(s) may be visually clipped; inspect screenshots`});
  return findings;
}
export function diffReport(base,now){
  if(base.origin!==now.origin)throw Error('Baseline and current audit must be on the same origin');
  const old=new Map((base.pages||[]).map(p=>[`${p.path}|${p.viewport}`,p]));
  const current=new Map((now.pages||[]).map(p=>[`${p.path}|${p.viewport}`,p]));
  const diffs=[];
  for(const [key,prior] of old){const next=current.get(key);if(!next){diffs.push({key,missingPage:true});continue;}
    diffs.push({key,missingPage:false,...compareInventories(prior.inventory,next.inventory)});
  }
  return diffs;
}
export function safeSlug(s) {return String(s).replace(/[^a-z0-9-]+/gi,'-').replace(/^-+|-+$/g,'').slice(0,85)||'index';}
export function markdownReport(report){
  const lines=['# Design Intelligence — observed audit','',`Environment: ${report.environment} · Origin: ${report.origin}`,'',`Pages/viewport samples: ${report.pages.length}`,'', '> This is a bounded passive inspection. Style suggestions are not objective failures. Business actions and WCAG certification were not tested.','', '## Findings',''];
  for(const p of report.pages){lines.push(`### ${p.path} · ${p.viewport}`);lines.push(`- Title: ${p.title||'(not available)'}`);lines.push(`- Controls: ${p.inventory.controls.length}, links: ${p.inventory.links.length}, fields: ${p.inventory.fields.length}`);for(const f of (p.findings||[]))lines.push(`- ${f.severity.toUpperCase()}: ${f.code} — ${f.details}`);if(p.screenshot)lines.push(`- Local screenshot: ${p.screenshot}`);lines.push('');}
  if(report.comparison){lines.push('## Preservation comparison','');for(const d of report.comparison){lines.push(`### ${d.key}`);if(d.missingPage){lines.push('- FAIL: expected page is missing');continue;}for(const k of ['removedHeadings','removedLinks','removedControls','removedFields'])if(d[k]?.length)lines.push(`- REVIEW ${k}: ${d[k].join('; ')}`);if(d.removedForms)lines.push(`- REVIEW removedForms: ${d.removedForms}`);if(d.visualChangeRatio!==undefined)lines.push(`- Screenshot pixel-change ratio: ${(d.visualChangeRatio*100).toFixed(1)}% (review only)`);lines.push('');}}
  lines.push('## Limits','','- Not checked: user journeys, API/database state, interactive handlers, payment flows, real-device compatibility, manual design review.','- Screenshots and design changes require explicit approval and stable synthetic test data.','');return lines.join('\n');
}
