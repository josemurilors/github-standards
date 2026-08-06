# GitHub Standards Skill v2.0.0 - Execution Plan

## Project Overview

This document outlines the execution plan for implementing the GitHub Standards Skill v2.0.0, based on the analysis of the `awesome-vibe-coding-guide` repository and the refined specifications from Platão's review.

---

## Decision Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Translation Scope | README only (v2.0.0) | Avoid technical debt; internal guides translated gradually |
| Cloud Provider / OIDC | None | Documentation-only repo; GitHub Pages not needed |
| Initial Version | v2.0.0 (breaking) | Conventional Commits + husky change contribution workflow |
| Contributors Section | Yes (all-contributors) | Essential for community-driven curation repos |
| Branching Strategy | `feat/github-standards-v2` | Isolated development branch |
| Language Mode | Configurable (EN/PT-BR first) | Supports international and local projects |
| Secret Protection | 4-layer defense-in-depth | Prevents Vibe Coding credential leaks |

---

## Implementation Phases

### Phase 1: Scaffolding & Governance ✅ COMPLETED

**Status**: All files created

#### Files Created

- [x] `README.md` - English documentation with language selector
- [x] `README-PT-BR.md` - Portuguese documentation (structural parity)
- [x] `CONTRIBUTING.md` - Contribution guidelines with branch protection rules
- [x] `CODE_OF_CONDUCT.md` - Contributor Covenant v2.1
- [x] `SECURITY.md` - Security policy and vulnerability reporting
- [x] `CHANGELOG.md` - Initial changelog with versioning scheme
- [x] `LICENSE` - MIT License

#### Key Features

- ✅ Language selector badges at top of READMEs
- ✅ Identical heading structure (EN ↔ PT-BR)
- ✅ Branch protection rules documented
- ✅ 5 contribution types defined (doc, ideas, bug, tool, review)
- ✅ Conventional Commits specification

---

### Phase 2: CI/CD Pipeline ✅ COMPLETED

**Status**: All workflows created

#### Files Created

- [x] `.github/workflows/ci.yml` - CI validation pipeline with secret scanning
- [x] `.github/workflows/release.yml` - Automated semantic-release
- [x] `.github/workflows/all-contributors.yml` - Contributor recognition
- [x] `.github/dependabot.yml` - Dependency updates

#### CI Jobs

1. **lint-markdown**: Validates Markdown files with `markdownlint-cli2-action@v16`
2. **check-links**: Validates links with `lychee-action@v2`
3. **validate-commits**:
   - PR title validation with `action-semantic-pull-request@v5`
   - Commit message validation with `commitlint-github-action@v6`
4. **parity-check**: Validates structural parity between EN and PT-BR READMEs (mode-aware)
5. **secret-scan**: Gitleaks secret detection
6. **security-audit**: Checks for .env files, private keys, hardcoded secrets

#### Release Workflow

- Triggers on push to `main`
- Uses `semantic-release` for automated versioning
- Updates CHANGELOG.md automatically
- Creates GitHub releases

---

### Phase 3: Local Automation ✅ COMPLETED

**Status**: All configuration files created

#### Files Created

- [x] `package.json` - Dependencies and scripts
- [x] `.commitlintrc.json` - Commit linting rules
- [x] `.markdownlint.json` - Markdown linting rules
- [x] `.releaserc.json` - Semantic release configuration
- [x] `.lychee.toml` - Link checker configuration
- [x] `.husky/commit-msg` - Git hook for commit validation
- [x] `.husky/pre-commit` - Git hook for Gitleaks + Markdown linting
- [x] `.gitignore` - Ignore patterns (secrets-blindado)

#### NPM Scripts

```bash
npm run lint:md          # Lint Markdown files
npm run lint:md:fix      # Auto-fix Markdown issues
npm run lint:links       # Check links
npm run lint:links:verbose  # Check links with verbose output
npm run lint:secrets     # Scan for secrets (gitleaks)
npm run lint:secrets:staged  # Scan only staged files
npm run prepare          # Setup husky hooks
npm run mode:en          # Set English as source of truth
npm run mode:pt          # Set Portuguese as source of truth
npm test                 # Run all validations
```

---

### Phase 4: Language Mode System ✅ COMPLETED

**Status**: Configurable mode system implemented

#### Files Created

- [x] `.github/mode.json` - Mode configuration (en-first or pt-br-first)
- [x] `scripts/set-mode.sh` - Script to switch modes

#### Modes

**EN-First Mode** (default):

- `README.md` is the source of truth (English)
- `README-PT-BR.md` is the translation (Portuguese)
- Use for: International projects, open-source

**PT-BR-First Mode**:

- `README-PT-BR.md` is the source of truth (Portuguese)
- `README.md` is the translation (English)
- Use for: Local projects, Brazilian companies

#### Usage

```bash
npm run mode:en    # English first
npm run mode:pt    # Portuguese first
```

---

### Phase 5: Vibe Coding Security (4-Layer Defense) ✅ COMPLETED

**Status**: All security layers implemented

#### Layer 1: Local Defense (Pre-Commit Block)

**Files**:

- [x] `.gitleaks.toml` - Secret detection rules (15+ patterns)
- [x] `.husky/pre-commit` - Gitleaks integration

**Patterns Detected**:

- AWS Access Keys (`AKIA*`)
- OpenAI API Keys (`sk-proj-*`)
- GitHub PATs (`ghp_*`)
- Stripe Keys (`sk_live_*`)
- JWT Tokens
- Private Keys (PEM, PFX)
- Database Connection Strings

#### Layer 2: Repository Defense

**Files**:

- [x] `.gitignore` - Comprehensive secret ignore patterns
- [x] `.env.example` - Environment variable template

**Protected Patterns**:

```gitignore
.env, .env.* (except .env.example)
*.pem, *.key, *.pfx, *.p12
credentials.json, service-account*.json
.cursor/, .claude/, .clinerules
```

#### Layer 3: Cloud Defense

**Configuration** (Admin must enable):

- GitHub Push Protection
- Secret Scanning
- Dependabot Alerts

**Documentation**:

- [x] `SECURITY.md` - Instructions for enabling cloud defenses

#### Layer 4: AI Hygiene

**Files**:

- [x] `.cursorrules` - AI security rules
- [x] `SECURITY.md` - AI security guidelines

**Rules**:

- NEVER hardcode API keys, tokens, passwords
- ALWAYS use environment variables
- ALWAYS reference .env.example
- Detect and flag common secret patterns

#### Contingency Plan

**Documented in SECURITY.md**:

1. Revoke immediately at provider (not delete Git commit)
2. Rewrite Git history with git-filter-repo or BFG
3. Rotate all related credentials
4. Post-incident review

---

## File Structure

```text
awesome-vibe-coding-guide/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # CI validation + secret scanning
│   │   ├── release.yml               # Automated releases
│   │   └── all-contributors.yml      # Contributor recognition
│   ├── dependabot.yml                # Dependency updates
│   └── mode.json                     # Language mode configuration
├── .husky/
│   ├── commit-msg                    # Commit message validation
│   └── pre-commit                    # Gitleaks + Markdown linting
├── scripts/
│   └── set-mode.sh                   # Language mode switcher
├── assets/                           # Images and media
├── README.md                         # English documentation
├── README-PT-BR.md                   # Portuguese documentation
├── CONTRIBUTING.md                   # Contribution guidelines
├── CODE_OF_CONDUCT.md                # Community standards
├── SECURITY.md                       # Security policy + 4-layer defense
├── CHANGELOG.md                      # Version history
├── LICENSE                           # MIT License
├── .cursorrules                      # AI security rules
├── .gitleaks.toml                    # Secret detection config
├── .env.example                      # Environment template
├── package.json                      # Dependencies and scripts
├── .commitlintrc.json                # Commit linting rules
├── .markdownlint.json                # Markdown linting rules
├── .releaserc.json                   # Semantic release config
├── .lychee.toml                      # Link checker config
├── .gitignore                        # Git ignore patterns (secrets-blindado)
├── plan.md                           # This file
└── DECISIONS.md                      # Architectural decisions (14 ADRs)
```

---

## Validation Checklist

### Pre-Commit (Local)

- [ ] `npm run lint:md` passes
- [ ] `npm run lint:links` passes
- [ ] `npm run lint:secrets` passes
- [ ] Commit message follows Conventional Commits format
- [ ] No hardcoded secrets in code

### Pre-Merge (CI)

- [ ] Markdown linting passes
- [ ] All links are valid
- [ ] PR title follows Conventional Commits format
- [ ] All commit messages follow Conventional Commits format
- [ ] README structural parity (EN ↔ PT-BR) is maintained
- [ ] Gitleaks scan passes (no secrets detected)
- [ ] Security audit passes (no .env files, private keys, hardcoded secrets)
- [ ] At least 1 approval from maintainer
- [ ] All status checks pass

### Post-Merge (Release)

- [ ] semantic-release analyzes commits
- [ ] CHANGELOG.md is updated automatically
- [ ] GitHub release is created
- [ ] Tags are created automatically
- [ ] Contributors list is updated (if README changed)

---

## Contribution Workflow

### For Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes following the guidelines
4. Test locally: `npm run lint:md && npm run lint:links && npm run lint:secrets`
5. Commit with Conventional Commits: `git commit -m "feat: Add X"`
6. Push to fork: `git push origin feat/your-feature`
7. Open Pull Request

### For Maintainers

1. Review PR for:
   - Content accuracy
   - Documentation quality
   - Adherence to standards
   - Security compliance
   - CI checks passing
2. Request changes if needed
3. Approve PR
4. Merge using squash or rebase
5. Release is automated via semantic-release

---

## Security Incident Response

### If a Secret Leaks

**Step 1: Revoke Immediately** (DO THIS FIRST)

- OpenAI: Dashboard → API Keys → Revoke
- AWS: IAM → Users → Security credentials → Deactivate
- GitHub: Settings → Developer settings → Personal access tokens → Delete
- Stripe: Dashboard → Developers → API keys → Roll key

**Step 2: Rewrite Git History**

```bash
# Option A: git-filter-repo (Recommended)
pip install git-filter-repo
git filter-repo --path .env --force

# Option B: BFG Repo-Cleaner
java -jar bfg.jar --delete-files .env
```

**Step 3: Rotate All Related Credentials**

- Generate new credentials at the provider
- Update `.env` files locally (never commit)
- Update GitHub Secrets if used in CI/CD
- Update any production systems using the old credentials

**Step 4: Post-Incident Review**

- Document what happened in a private security advisory
- Identify the root cause (which layer failed?)
- Update detection rules if needed
- Train team on the incident (without blame)

---

## Future Enhancements (v2.1.0+)

### Planned Features

- [ ] Translate internal guides (4 guides) to PT-BR
- [ ] Add more languages (Spanish, French)
- [ ] Implement reusable workflows for multi-repo management
- [ ] Add CodeQL security scanning
- [ ] Implement OIDC for cloud deployments (if needed)
- [ ] Add automated accessibility checks
- [ ] Create project templates for different repo types

### Backlog

- [ ] Add spell checker (cspell)
- [ ] Add automated screenshot testing
- [ ] Add performance monitoring for links
- [ ] Create CLI tool for scaffolding new repos
- [ ] Add Discord/Slack integration for notifications
- [ ] Support additional AI tool formats (.windsurfrules, .clinerules)

---

## Troubleshooting

### Common Issues

#### Issue: Husky hooks not running

**Solution**:

```bash
npm run prepare
chmod +x .husky/*
```

#### Issue: Gitleaks not found

**Solution**:

```bash
# macOS
brew install gitleaks

# Linux
wget https://github.com/gitleaks/gitleaks/releases/download/v8.18.1/gitleaks_8.18.1_linux_x64.tar.gz
tar -xzf gitleaks_8.18.1_linux_x64.tar.gz
sudo mv gitleaks /usr/local/bin/

# Windows
scoop install gitleaks
```

#### Issue: markdownlint fails on line length

**Solution**: MD013 is disabled in `.markdownlint.json`. If still failing, check the config file.

#### Issue: lychee fails on GitHub issue links

**Solution**: GitHub rate-limits unauthenticated requests. Add a `GITHUB_TOKEN` to `.lychee.toml` or exclude GitHub issue URLs.

#### Issue: parity-check fails

**Solution**: Ensure both README files have identical heading structure (same number of H1, H2, H3 in the same order).

#### Issue: commitlint rejects valid commits

**Solution**: Check `.commitlintrc.json` for the allowed types. Use one of: `feat`, `fix`, `docs`, `security`, `style`, `refactor`, `test`, `chore`, `ci`, `revert`.

#### Issue: Gitleaks false positive

**Solution**: Add the pattern to the allowlist in `.gitleaks.toml`:

```toml
[allowlist]
regexes = [
  '''your_pattern_here''',
]
```

---

## Resources

### Documentation

- [Conventional Commits](https://conventionalcommits.org)
- [Semantic Versioning](https://semver.org)
- [semantic-release](https://github.com/semantic-release/semantic-release)
- [markdownlint](https://github.com/DavidAnson/markdownlint)
- [lychee](https://github.com/lycheeverse/lychee)
- [husky](https://typicode.github.io/husky/)
- [commitlint](https://commitlint.js.org/)
- [gitleaks](https://github.com/gitleaks/gitleaks)

### Tools

- [Shields.io](https://shields.io) - Badges
- [All-Contributors](https://allcontributors.org/) - Contributor recognition
- [Dependabot](https://docs.github.com/en/code-security/dependabot) - Dependency updates
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning) - Secret detection

### GitHub Features

- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-a-branch-protection-rule)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Security Features](https://docs.github.com/en/code-security)
- [GitHub Push Protection](https://docs.github.com/en/code-security/secret-scanning/push-protection-for-secrets)

---

## Contact

For questions or support:

- **GitHub Issues**: [Open an issue](../../issues)
- **Email**: [INSERT EMAIL]
- **Twitter**: [@_rohit_tiwari_](https://twitter.com/_rohit_tiwari_)

---

**Last Updated**: 2026-01-XX  
**Version**: 2.0.0  
**Status**: Ready for deployment  
**Security**: 4-layer defense implemented ✅
