# SecurityForge offline triage helper

This tool converts a supplied JSON findings export into a normalized, redacted JSON summary. It does **not** connect to Aikido, GitHub, Supabase, production data, or any host.

Run:

```bash
python tools/securityforge/triage.py --input tools/securityforge/examples/findings.example.json --output /tmp/securityforge-result.json
python -m unittest discover -s tools/securityforge/tests -v
```

The output is evidence for further review, not a penetration test or proof of exploitation. A real provider API integration requires separate authenticated authorization, scopes and privacy protections. Existing output files are never overwritten.
