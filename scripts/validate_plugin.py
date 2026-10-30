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
assert len(skills)==80, len(skills)
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
assert len(re.findall(r'\| \[`[^`]+`\]\(skills/',(p/'SKILLS.md').read_text(encoding='utf-8')))==80, 'Skill catalog incomplete'
for f in p.rglob('*.md'):
    txt=f.read_text(encoding='utf-8')
    assert not re.search(r'(?i)everything[- ]claude[- ]code|\bECC-inspired\b|workshophq|open-search\s+project',txt), f'Stale project or branding reference: {f}'

print(f'Validated {len(skills)} skills and plugin v{m["version"]}')
