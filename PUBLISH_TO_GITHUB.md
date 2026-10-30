# Publish DevFlowForge to GitHub

1. Sign in to GitHub and create a **Public** repository named `devflowforge` under `vishaalzala`. Leave the repository uninitialized (no initial README, licence or `.gitignore`).
2. Extract the release ZIP into a local folder. Open a terminal at the folder containing `plugin.json`.
3. Run validation and check git changes before pushing:

```bash
python scripts/validate_plugin.py
git init -b main
git add .
git diff --cached --check
git diff --cached --stat
git commit -m "feat: release DevFlowForge v0.4.0"
git remote add origin https://github.com/vishaalzala/devflowforge.git
git push -u origin main
```

Use your GitHub credential manager or browser sign-in; do not embed tokens in files or commands. If the repository is not empty, clone it and merge changes on a feature branch instead of force-pushing. Public publishing is irreversible for content that is indexed, even if deleted later, so inspect all files and git history for secrets first.

Verify the README, 30 skill directories, `.agents/plugins/marketplace.json`, `LICENSE` and green GitHub Actions validation check.

## How others install

Codex users can follow the commands in the README, starting with `codex plugin marketplace add vishaalzala/devflowforge`. Supported ChatGPT desktop clients can add the repository marketplace from their Plugins Directory. ChatGPT web users may create a personal skills-only plugin from the source using a supported creation workflow. GitHub publishing does **not** automatically create a public ChatGPT Plugin Directory listing; that requires a separate submission and platform review.

## Subsequent releases

Create a branch, update both manifests' versions and `CHANGELOG.md`, run validation, review changes and submit a pull request. Updating GitHub does not automatically update any previously created personal ChatGPT plugin.
