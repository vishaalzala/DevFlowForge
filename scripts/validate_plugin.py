#!/usr/bin/env python3
"""Validate portable plugin metadata, skill discovery, frontmatter and basic secret hygiene."""
from pathlib import Path
import json,re,sys
p=Path(__file__).resolve().parents[1]
m=json.loads((p/'plugin.json').read_text(encoding='utf-8'))
assert m['$schema']=='https://agent-plugins.org/schemas/1.0.0/plugin.schema.json'
assert re.fullmatch(r'\d+\.\d+\.\d+',m['version'])
assert re.fullmatch(r'[a-z0-9](?:[a-z0-9.-]{0,62}[a-z0-9])?',m['name'])
assert len(m['extensions']['com.openai']['interface']['shortDescription'])<=30
skills=list((p/'skills').glob('*/SKILL.md'))
assert len(skills)==86, len(skills)
for f in skills:
    t=f.read_text(encoding='utf-8')
    assert t.startswith('---\n'), f
    front=t.split('---\n',2)[1]
    assert re.search(r'^name:\s*'+re.escape(f.parent.name)+r'\s*$',front,re.M), f
    assert re.search(r'^description:\s*\S+',front,re.M), f
    assert len(t.encode())<1024*1024, f
    assert re.search(r'^#\s+',t,re.M), f
assert (p/'.codex-plugin/plugin.json').exists()
legacy=json.loads((p/'.codex-plugin/plugin.json').read_text())
assert legacy['name']==m['name'] and legacy['version']==m['version']
market=json.loads((p/'.agents/plugins/marketplace.json').read_text(encoding='utf-8'))
assert len(market['plugins'])==1 and market['plugins'][0]['name']==m['name']
assert m['author']['name']=='Vishaal Zala'
for f in p.rglob('*'):
    if not f.is_file() or '.git' in f.parts: continue
    assert not f.name.startswith('.env') or f.name=='.env.example', f
    if f.suffix.lower() in {'.md','.json','.yaml','.yml','.py'}:
        txt=f.read_text(encoding='utf-8')
        assert not re.search(r'(?i)(sk-[a-zA-Z0-9_-]{24,}|ghp_[a-zA-Z0-9]{30,}|xox[baprs]-[a-zA-Z0-9-]{25,})',txt),f

assert len({f.parent.name for f in skills})==len(skills), 'Duplicate skill folder'
for f in skills:
    body=f.read_text(encoding='utf-8')
    assert len(body.split())>=77, f'Skill too short: {f}'
assert len(re.findall(r'\| \[`[^`]+`\]\(skills/',(p/'SKILLS.md').read_text(encoding='utf-8')))==86, 'Skill catalog incomplete'
for f in p.rglob('*.md'):
    txt=f.read_text(encoding='utf-8')
    assert not re.search(r'(?i)everything[- ]claude[- ]code|\bECC-inspired\b|workshophq|open-search\s+project',txt), f'Stale project or branding reference: {f}'

compression=(p/'skills/adaptive-http-compression/SKILL.md').read_text(encoding='utf-8')
for required in ('Accept-Encoding','Content-Encoding','Vary: Accept-Encoding','zstd','Brotli','Gzip','identity','q=0','User-Agent','streaming','cache','security'):
    assert required.lower() in compression.lower(), f'Compression skill missing: {required}'
assert (p/'references/http-compression-compatibility.md').exists(), 'Missing compression compatibility matrix'
assert 'adaptive-http-compression' in (p/'references/skill-routing.md').read_text(encoding='utf-8')
# Website QA Auditor adds an optional runnable local tool, not an automatic browser agent.
qa = p/'tools/website-qa-auditor'
assert (p/'skills/website-qa-auditor/SKILL.md').exists()
assert (p/'references/website-qa-audit-playbook.md').exists()
for relative in ['package.json','src/audit.mjs','src/policy.mjs','src/report.mjs','src/workflows.mjs', 'config/audit.example.json','tests/policy.test.mjs','tests/browser-smoke.mjs','README.md']:
    assert (qa/relative).is_file(), f'Missing QA tool: {relative}'
qa_manifest=json.loads((qa/'package.json').read_text(encoding='utf-8'))
assert 'playwright' in qa_manifest['dependencies']
assert '@axe-core/playwright' in qa_manifest['dependencies']
assert 'website-qa-auditor' in (p/'references/skill-routing.md').read_text(encoding='utf-8')

# Design Intelligence module: instruction files, local-only runner and safeguards.
for skill in ('design-quality-auditor','visual-direction-engine','design-preservation-verification'):
    assert (p/f'skills/{skill}/SKILL.md').is_file(), skill
    assert skill in (p/'SKILLS.md').read_text(encoding='utf-8'), skill
    assert skill in (p/'references/skill-routing.md').read_text(encoding='utf-8'), skill
assert (p/'references/design-intelligence-quality.md').is_file()
design = p/'tools/design-intelligence'
for file in ['package.json','README.md','config/audit.example.json','config/brief.example.json','src/policy.mjs','src/analyze.mjs','src/audit.mjs','src/directions.mjs','tests/policy.test.mjs','tests/browser-smoke.mjs']:
    assert (design/file).is_file(), f'Missing Design Intelligence tool: {file}'
manifest_design = json.loads((design/'package.json').read_text(encoding='utf-8'))
assert all(dep in manifest_design.get('dependencies',{}) for dep in ('playwright','pixelmatch','pngjs'))




# Weekly improvement suite (v0.10.0): zero additional SKILL.md files by design.
for reference in ('nextjs-tenant-security-review.md','mcp-version-compatibility.md','background-job-observability.md','skill-evaluation-methodology.md'):
    assert (p/'references'/reference).is_file(), reference
for tool in ('skill-evaluator','qa-report-aggregator'):
    for fname in ('package.json','src/core.mjs','src/cli.mjs','README.md'):
        assert (p/'tools'/tool/fname).is_file(), f'Missing tool: {tool}/{fname}'
    manifest=json.loads((p/'tools'/tool/'package.json').read_text())
    assert manifest['engines']['node']=='>=22'
for pkg in ('website-qa-auditor','design-intelligence'):
    manifest=json.loads((p/'tools'/pkg/'package.json').read_text())
    assert manifest['engines']['node']=='>=22'
    assert manifest['dependencies']['playwright']=='^1.65.0'

# Mandatory architecture connection / impact mapping (v0.11.0).
impact_skill = p/'skills/architecture-connection-impact-analysis/SKILL.md'
assert impact_skill.exists()
for rel in ('references/architecture-connection-impact-playbook.md', 'tools/architecture-impact-checker/package.json', 'tools/architecture-impact-checker/src/core.mjs', 'tools/architecture-impact-checker/src/cli.mjs', 'tools/architecture-impact-checker/tests/check.test.mjs', 'tools/architecture-impact-checker/examples/connected-release.json'):
    assert (p/rel).is_file(), rel
for rel in ('skills/cto-orchestration/SKILL.md', 'skills/root-cause-debugging/SKILL.md', 'skills/repository-architecture-audit/SKILL.md', 'skills/test-strategy-release-gates/SKILL.md', 'skills/website-qa-auditor/SKILL.md', 'references/skill-routing.md', 'references/quality-gates.md'):
    assert 'architecture-connection-impact-analysis' in (p/rel).read_text(encoding='utf-8'), rel

print(f'Validated {len(skills)} skills and plugin v{m["version"]}')
