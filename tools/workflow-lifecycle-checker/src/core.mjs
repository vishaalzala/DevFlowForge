export const VALID_STATUS = new Set(['Pass', 'Fail', 'Not run', 'Not applicable']);
const STAGES = ['input', 'state', 'save', 'api', 'database', 'reload', 'outputs'];
const isText = (v) => typeof v === 'string' && v.trim().length > 0;

/** This validates a manually supplied evidence report; it does NOT verify code or execute tests. */
export function validateReport(report) {
  const errors = [];
  if (!report || typeof report !== 'object' || Array.isArray(report)) return { ok: false, errors: ['Report must be an object'] };
  if (!['check', 'fix'].includes(report.mode)) errors.push('mode must be check or fix');
  for (const k of ['environment', 'symptom', 'expected', 'actual', 'firstDivergence']) {
    if (!isText(report[k])) errors.push(`${k} is required`);
  }
  if (!['Connected', 'Isolated'].includes(report.connectionClass)) errors.push('connectionClass is required');
  if (!Array.isArray(report.stages)) errors.push('stages must be an array');
  else {
    const names = new Set();
    for (const stage of report.stages) {
      if (!stage || typeof stage !== 'object') { errors.push('invalid stage'); continue; }
      if (!STAGES.includes(stage.name)) errors.push(`unknown stage: ${stage.name}`);
      if (names.has(stage.name)) errors.push(`duplicate stage: ${stage.name}`);
      names.add(stage.name);
      if (!VALID_STATUS.has(stage.status)) errors.push(`invalid status for ${stage.name}`);
      if (!isText(stage.evidence)) errors.push(`stage ${stage.name} requires evidence or a reason`);
    }
    for (const name of STAGES) if (!names.has(name)) errors.push(`missing lifecycle stage: ${name}`);
  }
  if (!Array.isArray(report.consumers) || report.consumers.length === 0) errors.push('consumers must identify at least one affected surface');
  else for (const c of report.consumers) if (!c || !isText(c.name) || !VALID_STATUS.has(c.testStatus) || !isText(c.evidence)) errors.push('each consumer requires name, testStatus and evidence/reason');
  if (report.mode === 'check' && (report.changedFiles?.length || report.ready === true)) errors.push('check-only reports cannot claim code changes or release readiness');
  if (report.ready === true) {
    if (report.mode !== 'fix') errors.push('ready requires fix mode');
    if (!Array.isArray(report.tests) || report.tests.length === 0) errors.push('ready requires executed tests');
    else for (const t of report.tests) if (t.status !== 'Pass' || !isText(t.evidence)) errors.push('ready requires all listed tests to pass with evidence');
    for (const c of report.consumers || []) if (c.testStatus !== 'Pass' && c.testStatus !== 'Not applicable') errors.push(`unverified consumer: ${c.name}`);
    for (const s of report.stages || []) if (s.status === 'Fail' || s.status === 'Not run') errors.push(`unverified lifecycle stage: ${s.name}`);
  }
  return { ok: errors.length === 0, errors };
}
