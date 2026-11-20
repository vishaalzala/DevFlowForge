#!/usr/bin/env python3
"""Offline, read-only security finding triage. Does not fetch data or run scanners."""
import argparse
import json
import re
import sys
from pathlib import Path

ALLOWED_SEVERITY = {"critical", "high", "medium", "low", "informational"}
ALLOWED_STATUS = {"confirmed", "pending_verification", "mitigated", "false_positive", "accepted_risk"}
SENSITIVE_KEY = re.compile(r"(secret|token|password|private.?key|credential|api.?key)", re.I)
SECRET_VALUE = re.compile(r"(?i)(bearer\s+[a-z0-9_.-]{8,}|ghp_[a-z0-9]{20,}|sk-[a-z0-9_-]{20,}|eyJ[a-zA-Z0-9_-]{12,}\.[a-zA-Z0-9_-]{8,}\.[a-zA-Z0-9_-]{8,})")

def safe_text(value, limit=250):
    if not isinstance(value, (str, int, float)):
        return ""
    return SECRET_VALUE.sub("[redacted]", str(value).replace("\x00", "")[:limit])

def normalize(payload):
    if isinstance(payload, list):
        payload = {"findings": payload}
    if not isinstance(payload, dict) or not isinstance(payload.get("findings"), list):
        raise ValueError("Expected a findings list or object with findings array")
    repo = safe_text(payload.get("repository", "unknown-repository"))
    scan_commit = safe_text(payload.get("scan_commit", "unknown-revision"))
    issues = []
    seen = set()
    for idx, raw in enumerate(payload["findings"]):
        if not isinstance(raw, dict):
            raise ValueError("Each finding must be an object")
        provider = safe_text(raw.get("provider", "unspecified"))
        issue_id = safe_text(raw.get("id") or raw.get("finding_id") or f"unidentified-{idx}")
        unique = (provider, repo, issue_id, scan_commit)
        if unique in seen:
            continue
        seen.add(unique)
        severity = str(raw.get("severity", "informational")).lower().strip()
        if severity not in ALLOWED_SEVERITY:
            severity = "informational"
        # Scan alerts alone are unconfirmed; do not assume provider "new" status means verified.
        verification = str(raw.get("verification", "pending_verification")).lower().strip().replace(" ", "_")
        if verification not in ALLOWED_STATUS:
            verification = "pending_verification"
        issues.append({
            "id": issue_id,
            "provider": provider,
            "severity": severity,
            "verification": verification,
            "title": safe_text(raw.get("title") or raw.get("name") or "Untitled finding"),
            "path": safe_text(raw.get("path") or raw.get("location")),
            "source_status": safe_text(raw.get("status")),
        })
    counts = {key: sum(x["severity"] == key for x in issues) for key in sorted(ALLOWED_SEVERITY)}
    # Confirmed critical findings require review; not an autonomous deployment gate.
    blockers = [x["id"] for x in issues if x["severity"] == "critical" and x["verification"] == "confirmed"]
    return {"repository": repo, "scan_commit": scan_commit,
            "finding_count": len(issues), "severity_counts": counts,
            "critical_confirmed_review": blockers, "findings": issues}

def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args(argv)
    if args.input.resolve() == args.output.resolve():
        parser.error("Input and output paths must differ")
    if args.output.exists():
        parser.error("Output already exists; refusing overwrite")
    payload = json.loads(args.input.read_text(encoding="utf-8"))
    result = normalize(payload)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(f"Triaged {result['finding_count']} findings for {result['repository']}")
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"Input error: {exc}", file=sys.stderr)
        sys.exit(2)
