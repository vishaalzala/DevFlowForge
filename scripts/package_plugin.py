#!/usr/bin/env python3
"""Create a complete, validated plugin archive from the current git index."""
import argparse
import json
import os
from pathlib import Path
import re
import subprocess
import zipfile

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--expected-skills', type=int, default=108)
    args = parser.parse_args()
    root = args.root.resolve()
    raw = subprocess.run(['git', '-C', str(root), 'ls-files', '-z'], check=True, capture_output=True).stdout
    files = sorted(Path(os.fsdecode(p)) for p in raw.split(b'\0') if p)
    available = {p.as_posix() for p in files}
    required = {'plugin.json', '.codex-plugin/plugin.json', '.agents/plugins/marketplace.json'}
    if not required.issubset(available):
        raise SystemExit(f'Missing required manifest files: {sorted(required - available)}')
    root_manifest = json.loads((root / 'plugin.json').read_text())
    codex = json.loads((root / '.codex-plugin/plugin.json').read_text())
    if root_manifest.get('name') != codex.get('name') or root_manifest.get('version') != codex.get('version'):
        raise SystemExit('Root and Codex manifests disagree')
    if not isinstance(codex.get('interface', {}).get('capabilities'), list):
        raise SystemExit('interface.capabilities must be a list')
    skills = [p for p in files if re.fullmatch(r'skills/[^/]+/SKILL\.md', p.as_posix())]
    if len(skills) != args.expected_skills:
        raise SystemExit(f'Expected {args.expected_skills} skills, found {len(skills)}')
    for p in files:
        actual = root / p
        if actual.is_symlink() or not actual.is_file() or root not in actual.resolve().parents:
            raise SystemExit(f'Unsafe tracked entry: {p}')
        if any(part in {'.git', 'node_modules', '__pycache__', '.next', '.env'} for part in p.parts):
            raise SystemExit(f'Unsafe tracked path: {p}')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(args.output, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for p in files:
            zf.write(root / p, p.as_posix())
    with zipfile.ZipFile(args.output) as zf:
        if zf.testzip() is not None or set(zf.namelist()) != available:
            raise SystemExit('Archive integrity failed')
        if len([n for n in zf.namelist() if re.fullmatch(r'skills/[^/]+/SKILL\.md', n)]) != args.expected_skills:
            raise SystemExit('Packaged skill count differs')
    print(json.dumps({'archive': str(args.output), 'version': root_manifest['version'], 'skills': len(skills), 'files': len(files)}))

if __name__ == '__main__':
    main()
