# Architectural Decisions Record (ADR)

This document records all architectural decisions made for the GitHub Standards Skill v2.0.0.

---

## ADR-001: Bilingual Documentation Strategy

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

The `awesome-vibe-coding-guide` repository needed to support multiple languages to improve accessibility for the local community while maintaining international reach.

### Decision

Implement a bilingual documentation strategy with English (EN) as the primary language and Portuguese (PT-BR) as the secondary language.

**Approach**: Separate files

- `README.md` - English (source of truth)
- `README.pt-BR.md` - Portuguese (translation)

**Scope**: README only for v2.0.0. Internal guides will be translated gradually based on community demand.

### Consequences

**Positive**:

- ✅ Optimizes loading time (no bloated single file)
- ✅ Easier to scan and navigate
- ✅ Simplifies third-party contributions
- ✅ English as the lingua franca of open-source

**Negative**:

- ❌ Requires maintaining two files in sync
- ❌ Risk of translation drift over time

**Mitigation**:

- CI parity-check job validates structural consistency
- Both files must be updated in the same PR
- Automated link checking prevents broken links in either version

---

## ADR-002: CI/CD Tool Selection

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to select tools for Markdown linting, link checking, and commit validation.

### Decision

**Markdown Linting**: `DavidAnson/markdownlint-cli2-action@v16`

- Industry standard
- Actively maintained
- Configurable via `.markdownlint.json`

**Link Checking**: `lycheeverse/lychee-action@v2`

- Fast and reliable
- Supports complex exclusion patterns
- Configurable via `.lychee.toml`

**Commit Validation**: `wagoid/commitlint-github-action@v6`

- Validates Conventional Commits format
- Integrates with `.commitlintrc.json`

**PR Title Validation**: `amannn/action-semantic-pull-request@v5`

- Ensures PR titles follow Conventional Commits
- Prevents invalid PRs from being merged

### Consequences

**Positive**:

- ✅ All tools are industry standards
- ✅ Well-documented and widely used
- ✅ Active community support

**Negative**:

- ❌ Additional dependencies to maintain
- ❌ Learning curve for contributors

**Mitigation**:

- Clear documentation in CONTRIBUTING.md
- Local validation scripts (`npm run lint:*`)
- Automated error messages guide contributors

---

## ADR-003: Parity Check Implementation

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to ensure structural consistency between EN and PT-BR README files.

### Initial Approach (Rejected)

```bash
EN_COUNT=$(grep -E '^#{1,3} ' README.md | wc -l)
PT_COUNT=$(grep -E '^#{1,3} ' README.pt-BR.md | wc -l)
if [ "$EN_COUNT" -ne "$PT_COUNT" ]; then exit 1; fi
```

**Problem**: If EN has 10 H2 headings and PT-BR has 8 H2 + 2 H3, the count matches (10 = 10) but the hierarchy is broken.

### Final Approach (Accepted)

```bash
EN_STRUCT=$(grep -E '^#{1,3} ' README.md | sed 's/^#* //')
PT_STRUCT=$(grep -E '^#{1,3} ' README.pt-BR.md | sed 's/^#* //')
if [ "$EN_STRUCT" != "$PT_STRUCT" ]; then exit 1; fi
```

**Solution**: Compare the sequence of heading levels (structure), not just the count.

### Consequences

**Positive**:

- ✅ Catches hierarchy mismatches
- ✅ Ensures identical document structure
- ✅ Prevents translation drift

**Negative**:

- ❌ Requires manual translation of headings
- ❌ False positives if headings are intentionally different

**Mitigation**:

- Clear documentation in CONTRIBUTING.md
- CI provides detailed error messages showing the mismatch
- Maintainers can override if justified

---

## ADR-004: OIDC Exclusion

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

GitHub Standards Skill specification included OIDC (OpenID Connect) for cloud provider authentication.

### Decision

**Exclude OIDC from this repository.**

### Rationale

The `awesome-vibe-coding-guide` repository is a documentation-only project (100% Markdown). There is no infrastructure to deploy to (no AWS, GCP, Azure, Vercel, etc.).

**When to use OIDC**:

- Web applications deploying to cloud providers
- APIs with backend infrastructure
- Services requiring cloud authentication

**When NOT to use OIDC**:

- Documentation repositories
- Static sites hosted on GitHub Pages
- Repositories without deployment targets

### Consequences

**Positive**:

- ✅ Simpler CI/CD pipeline
- ✅ No unnecessary complexity
- ✅ Faster workflow execution

**Negative**:

- ❌ Not applicable if repo evolves to include deployment

**Mitigation**:

- If deployment is needed in the future, add OIDC at that time
- Document OIDC best practices in CONTRIBUTING.md for other projects

---

## ADR-005: Version Strategy (v2.0.0)

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to determine the initial version number for the GitHub Standards Skill implementation.

### Decision

**Start with v2.0.0** (breaking change from v1.0.0).

### Rationale

The implementation introduces breaking changes to the contribution workflow:

1. **Conventional Commits**: All commits must follow the specification
2. **Husky Hooks**: Local validation before commit
3. **Branch Protection**: Strict rules for merging to `main`
4. **CI Requirements**: All checks must pass before merge

These changes fundamentally alter how contributors interact with the repository, warranting a MAJOR version bump.

### Consequences

**Positive**:

- ✅ Clear signal of breaking changes
- ✅ Aligns with Semantic Versioning
- ✅ Sets expectations for contributors

**Negative**:

- ❌ May confuse existing contributors
- ❌ Requires migration effort

**Mitigation**:

- Comprehensive CONTRIBUTING.md with migration guide
- Clear communication in PR description
- Grace period for existing contributors to adapt

---

## ADR-006: Contribution Types

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to define contribution types for the all-contributors bot.

### Decision

**5 core contribution types** for documentation/curation repositories:

| Type | Emoji | Description |
|------|-------|-------------|
| Documentation | 📝 `doc` | Writing or improving documentation, translations |
| Ideas | 💡 `ideas` | Suggesting content, guides, or improvements |
| Bug Fixes | 🐛 `bug` | Fixing broken links, typos, or errors |
| Tools | 🔧 `tool` | CI/CD, scripts, automations, tooling |
| Reviews | 🔍 `review` | Reviewing pull requests, providing feedback |

### Rationale

These types cover the most common contributions to documentation repositories without overwhelming contributors with too many options.

### Consequences

**Positive**:

- ✅ Clear recognition for different contribution types
- ✅ Encourages diverse contributions
- ✅ Automated via all-contributors bot

**Negative**:

- ❌ May not cover all contribution types
- ❌ Requires manual categorization

**Mitigation**:

- Can add more types in future versions
- Maintainers can manually assign types
- Clear documentation in CONTRIBUTING.md

---

## ADR-007: GitHub Pages Exclusion

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Consider whether to enable GitHub Pages for rendering the documentation as a website.

### Decision

**Do NOT enable GitHub Pages.**

### Rationale

1. **Rendering .md files directly in the repository** meets 100% of the use case
2. **GitHub Pages requires a static site generator** (Jekyll, Astro, etc.), adding maintenance overhead
3. **Documentation repositories** are typically accessed via GitHub, not standalone websites
4. **Simplicity** is a core principle of this project

### Consequences

**Positive**:

- ✅ No additional infrastructure to maintain
- ✅ Simpler repository structure
- ✅ Faster CI/CD pipeline

**Negative**:

- ❌ No standalone website
- ❌ Less professional appearance for some use cases

**Mitigation**:

- If a website is needed in the future, can add GitHub Pages with a static site generator
- GitHub's native Markdown rendering is sufficient for most users

---

## ADR-008: Semantic Release Configuration

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to automate versioning and changelog generation.

### Decision

**Use semantic-release** with the following configuration:

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### Rationale

1. **Automated versioning** based on Conventional Commits
2. **Automated changelog** generation
3. **Automated GitHub releases** with release notes
4. **Industry standard** for open-source projects

### Consequences

**Positive**:

- ✅ No manual version management
- ✅ Consistent release process
- ✅ Clear changelog for users

**Negative**:

- ❌ Requires strict adherence to Conventional Commits
- ❌ Automated releases can be confusing if not understood

**Mitigation**:

- Clear documentation in CONTRIBUTING.md
- CI validates commit messages before merge
- Release notes are automatically generated and reviewed

---

## ADR-009: Branch Protection Rules

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to define branch protection rules for the `main` branch.

### Decision

**Strict branch protection** with the following rules:

- ✅ Require pull request before merging (1 approval minimum)
- ✅ Require status checks to pass (CI workflow)
- ✅ Require branches to be up to date before merging
- ✅ Require signed commits
- ✅ Require linear history (squash or rebase merge)
- ❌ No force pushes
- ❌ No deletions

### Rationale

1. **Quality assurance**: All changes must be reviewed
2. **CI validation**: All checks must pass
3. **Security**: Signed commits ensure authenticity
4. **Traceability**: Linear history is easier to understand and debug

### Consequences

**Positive**:

- ✅ High code quality
- ✅ Prevents accidental breakage
- ✅ Clear audit trail

**Negative**:

- ❌ Slower merge process
- ❌ Requires more discipline from contributors

**Mitigation**:

- Clear documentation in CONTRIBUTING.md
- Automated CI provides fast feedback
- Maintainers can expedite urgent fixes if needed

---

## ADR-010: Local Validation Scripts

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to enable contributors to validate changes locally before pushing.

### Decision

**Provide npm scripts** for local validation:

```bash
npm run lint:md          # Lint Markdown files
npm run lint:md:fix      # Auto-fix Markdown issues
npm run lint:links       # Check links
npm run lint:links:verbose  # Check links with verbose output
npm test                 # Run all validations
```

### Rationale

1. **Fast feedback**: Contributors can catch issues before pushing
2. **Reduced CI load**: Fewer failed builds
3. **Better contributor experience**: Clear error messages
4. **Consistency**: Same validation locally and in CI

### Consequences

**Positive**:

- ✅ Faster development cycle
- ✅ Fewer CI failures
- ✅ Better contributor experience

**Negative**:

- ❌ Requires Node.js and npm
- ❌ Additional setup step

**Mitigation**:

- Clear setup instructions in CONTRIBUTING.md
- Husky hooks automate validation
- Can run validation in CI if local setup fails

---

## ADR-011: Language Mode System

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to support repositories that prioritize Portuguese over English (local projects, Brazilian companies) without duplicating the entire skill.

### Decision

**Implement a configurable language mode system** with two modes:

1. **EN-First Mode** (default): English is the source of truth
2. **PT-BR-First Mode**: Portuguese is the source of truth

**Configuration**: `.github/mode.json`

```json
{
  "mode": "en-first",
  "source_of_truth": "README.md",
  "translation_file": "README.pt-BR.md"
}
```

**Switching**: `npm run mode:en` or `npm run mode:pt`

### Rationale

1. **Flexibility**: Supports both international and local projects
2. **Single source of truth**: Clear ownership of documentation
3. **CI adaptation**: Parity check reads mode and validates accordingly
4. **No duplication**: Same skill serves both use cases

### Consequences

**Positive**:

- ✅ Adaptable to different project needs
- ✅ Clear documentation ownership
- ✅ CI automatically adjusts validation

**Negative**:

- ❌ Additional configuration file
- ❌ Contributors must understand mode concept

**Mitigation**:

- Clear documentation in CONTRIBUTING.md
- Simple npm scripts for switching
- Default mode (en-first) works for most cases

---

## ADR-012: 4-Layer Secret Protection for Vibe Coding

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

In Vibe Coding (AI-assisted development), the risk of credential leaks increases dramatically because AI models often hardcode API keys, create local .env files, or generate test scripts with credentials that end up committed by oversight.

### Decision

**Implement 4-layer defense-in-depth** for secret protection:

| Layer | Defense | Tool | Function |
|-------|---------|------|----------|
| 1 | Local | husky + gitleaks | Blocks commits with secrets on dev machine |
| 2 | Repository | .gitignore + .env.example | Prevents tracking of sensitive files |
| 3 | Cloud | GitHub Push Protection | Blocks pushes containing secrets |
| 4 | AI | .cursorrules + SECURITY.md | Instructs AI to never generate insecure code |

### Rationale

1. **Shift-left security**: Catch secrets before they enter Git history
2. **Defense-in-depth**: Multiple layers ensure no single point of failure
3. **AI-specific**: Addresses unique risks of Vibe Coding
4. **Industry standard**: Gitleaks is the standard for secret detection

### Consequences

**Positive**:

- ✅ Prevents secret leaks at multiple points
- ✅ Catches AI-generated secrets automatically
- ✅ Clear contingency plan if leak occurs
- ✅ Industry-standard tools

**Negative**:

- ❌ Additional setup (gitleaks installation)
- ❌ Potential false positives
- ❌ Learning curve for contributors

**Mitigation**:

- Clear documentation in SECURITY.md
- Allowlist configuration in .gitleaks.toml
- Local validation scripts for fast feedback
- Contingency plan documented in SECURITY.md

---

## ADR-013: Gitleaks Configuration

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

Need to configure secret detection rules that catch common API keys without generating excessive false positives.

### Decision

**Custom .gitleaks.toml** with:

- 15+ specific rules for common secret types (AWS, OpenAI, GitHub, Stripe, JWT, etc.)
- Allowlist for false positives (.env.example, test keys, placeholders)
- Integration with both local (husky) and CI (gitleaks-action)

### Rationale

1. **Specificity**: Custom rules catch more real secrets than generic patterns
2. **False positive reduction**: Allowlist prevents blocking legitimate code
3. **Dual integration**: Works locally and in CI
4. **Maintainability**: Single configuration file

### Consequences

**Positive**:

- ✅ Catches 15+ secret types
- ✅ Minimal false positives
- ✅ Works in both local and CI environments

**Negative**:

- ❌ Requires maintenance as new secret types emerge
- ❌ May miss novel secret formats

**Mitigation**:

- Regular review of detection rules
- Community contributions for new patterns
- GitHub Secret Scanning as backup

---

## ADR-014: AI Security Rules (.cursorrules)

**Date**: 2026-01-XX  
**Status**: Accepted  
**Deciders**: Platão, OpenCode

### Context

AI coding assistants (Cursor, Claude, Copilot) often generate code with hardcoded secrets or insecure patterns. Need to instruct AI to follow security best practices.

### Decision

**Create .cursorrules file** with explicit security rules:

- NEVER hardcode API keys, tokens, passwords
- ALWAYS use environment variables (process.env, os.getenv)
- ALWAYS reference .env.example for required variables
- Detect common secret patterns and flag them

### Rationale

1. **Prevention**: Stop AI from generating insecure code
2. **Consistency**: Same rules applied across all AI tools
3. **Education**: Teaches AI (and developers) secure patterns
4. **Automation**: Rules are applied automatically by AI tools

### Consequences

**Positive**:

- ✅ Prevents AI-generated secret leaks
- ✅ Consistent security practices
- ✅ Educational for developers

**Negative**:

- ❌ Additional file to maintain
- ❌ Not all AI tools support .cursorrules

**Mitigation**:

- Document rules in SECURITY.md for manual reference
- Support multiple AI tool formats in future
- Regular review and update of rules

---

## Decision Review Process

All architectural decisions are reviewed:

1. **Quarterly**: Review all ADRs for relevance
2. **After major incidents**: Check if decisions contributed to the issue
3. **Before major changes**: Ensure new changes align with existing decisions

### How to Propose a New ADR

1. Copy this template
2. Fill in all sections
3. Submit as a PR with label `adr`
4. Discuss with maintainers
5. Merge when approved

### How to Supersede an ADR

1. Create a new ADR with status "Superseded"
2. Reference the original ADR
3. Explain the rationale for the change
4. Update the original ADR status to "Superseded by ADR-XXX"

---

**Last Updated**: 2026-01-XX  
**Version**: 2.0.0  
**Total ADRs**: 14
