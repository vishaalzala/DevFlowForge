import { safeText } from './policy.mjs';

export function summarise(report) {
  const pages = report.pages ?? [];
  const issues = [...(report.findings ?? []), ...pages.flatMap((p) => p.findings ?? [])];
  const bySeverity = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const issue of issues) {
    const severity = String(issue.severity || 'low').toLowerCase();
    bySeverity[severity] = (bySeverity[severity] || 0) + 1;
  }
  return {
    visitedPages: pages.length,
    controlsInventoried: pages.reduce((n, p) => n + (p.controls?.length || 0), 0),
    formsInventoried: pages.reduce((n, p) => n + (p.forms?.length || 0), 0),
    issues: issues.length,
    bySeverity,
    workflows: { passed: (report.workflows ?? []).filter((x) => x.status === 'pass').length,
      failed: (report.workflows ?? []).filter((x) => x.status === 'fail').length,
      notRun: (report.workflows ?? []).filter((x) => x.status === 'not-run').length },
  };
}

export function markdownReport(report) {
  const summary = summarise(report);
  const lines = [
    '# Website QA Auditor — findings', '',
    `Environment: **${safeText(report.environment)}**`,
    `Origin: **${safeText(report.origin)}**`,
    `Mode: **${safeText(report.mode)}**`,
    `Run: ${report.startedAt}`, '',
    `Pages visited: ${summary.visitedPages} · Controls inventoried: ${summary.controlsInventoried} · Forms inventoried: ${summary.formsInventoried}`,
    `Issues: ${summary.issues} (critical ${summary.bySeverity.critical}, high ${summary.bySeverity.high}, medium ${summary.bySeverity.medium}, low ${summary.bySeverity.low})`,
    `Workflows: ${summary.workflows.passed} passed, ${summary.workflows.failed} failed, ${summary.workflows.notRun} not run`, '',
    '## Findings', '',
  ];
  const issues = [...(report.findings ?? []), ...(report.pages ?? []).flatMap((p) => (p.findings ?? []).map((x) => ({ ...x, path: p.path, viewport: p.viewport })))];
  if (issues.length === 0) lines.push('No automated findings on the inspected pages. This does **not** prove full site coverage or correctness.');
  for (const x of issues) {
    lines.push(`- **${safeText(x.severity || 'low')} · ${safeText(x.type)}** — ${safeText(x.path || '/', 130)} (${safeText(x.viewport || '-', 30)}): ${safeText(x.message, 250)}`);
  }
  lines.push('', '## Visited pages', '');
  for (const p of report.pages ?? []) lines.push(`- ${safeText(p.path, 130)} (${safeText(p.viewport, 30)}): ${p.controls?.length || 0} controls, ${p.forms?.length || 0} forms, ${p.links?.length || 0} links`);
  lines.push('', '## Workflow outcomes', '');
  if (!(report.workflows ?? []).length) lines.push('- Not run: no explicit workflow test file was supplied.');
  for (const s of report.workflows ?? []) lines.push(`- **${safeText(s.status)}** — ${safeText(s.name, 130)}: ${safeText(s.message ?? '', 240)}`);
  lines.push('', '## Limitations', '', '- This is a bounded automated audit, not proof that every workflow works.', '- Navigation exploration does not click buttons or submit forms.', '- Human review and deterministic business-flow assertions remain necessary.', '- Accessibility automation does not replace manual assistive-technology testing.', '- Never publish reports or screenshots containing private application data.');
  return lines.join('\n') + '\n';
}
