# Contributing Guide

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples (links, code snippets, screenshots)
- Describe the behavior you observed and what you expected
- Include environment details (OS, browser, version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain the expected behavior
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Make your changes following the guidelines below
4. Test your changes locally:

   ```bash
   npm run lint:md
   npm run lint:links
   npm run lint:secrets
   ```

5. Commit your changes using [Conventional Commits](#commit-convention):

   ```bash
   git commit -m "feat: Add new feature"
   ```

6. Push to your fork:

   ```bash
   git push origin feat/your-feature-name
   ```

7. Open a Pull Request

## Commit Convention

All commits **must** follow the [Conventional Commits](https://conventionalcommits.org) specification. This is enforced automatically by our CI pipeline.

### Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature (increments MINOR version)
- `fix`: Bug fix (increments PATCH version)
- `docs`: Documentation only changes
- `security`: Security fixes (increments PATCH version)
- `style`: Changes that do not affect the meaning of the code (white-space, formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts
- `revert`: Reverts a previous commit

### Examples

```bash
# Good examples
git commit -m "feat: Add bilingual README support"
git commit -m "fix: Correct broken links in documentation"
git commit -m "docs: Update CONTRIBUTING.md with branch protection rules"
git commit -m "security: Add gitleaks pre-commit hook"
git commit -m "ci: Add parity-check job to CI workflow"
git commit -m "refactor: Simplify link checker configuration"

# Bad examples (will be rejected)
git commit -m "Update README"
git commit -m "Fixed stuff"
git commit -m "WIP"
```

## Branch Protection Rules

The `main` branch is protected and requires:

- ✅ **Pull Request**: Minimum 1 approval before merging
- ✅ **Status Checks**: CI workflow must pass
- ✅ **Up to Date**: Branches must be up to date before merging
- ✅ **Signed Commits**: All commits must be signed
- ✅ **Linear History**: Squash or rebase merge only
- ❌ **No Force Push**: Force pushes are not allowed
- ❌ **No Deletions**: Branch cannot be deleted

## Language Modes

This repository supports two language modes for bilingual documentation:

### EN-First Mode (Default)

- `README.md` is the source of truth (English)
- `README-PT-BR.md` is the translation (Portuguese)

### PT-BR-First Mode

- `README-PT-BR.md` is the source of truth (Portuguese)
- `README.md` is the translation (English)

**Switch modes**:

```bash
npm run mode:en    # English first
npm run mode:pt    # Portuguese first
```

**Parity Requirements**:

- Both files must have identical heading structure (H1, H2, H3 hierarchy)
- Code blocks, links, and badges must be identical
- Only the text content should differ between languages

When updating documentation:

1. Update the source of truth file first (based on current mode)
2. Update the translation file to maintain parity
3. Both files must be updated in the same PR

## Documentation Standards

### Markdown Style

All Markdown files must pass `markdownlint` validation:

```bash
npm run lint:md
```

Key rules:

- Line length is not enforced (MD013 disabled)
- HTML tags are allowed (MD033 disabled)
- Use ATX-style headings (`#`, `##`, `###`)
- Use fenced code blocks with language specification
- Use consistent list markers (`-` or `*`)

### Link Validation

All links must be valid and accessible:

```bash
npm run lint:links
```

- Use HTTPS when available
- Avoid link shorteners
- Test all links before submitting PR
- Update broken links immediately

## Security Rules (CRITICAL)

### Never Commit Secrets

**This is a hard rule with zero tolerance.**

#### Forbidden Patterns

```javascript
// ❌ NEVER DO THIS
const apiKey = 'sk-proj-abc123...';
const dbUrl = 'postgresql://admin:password@prod-db:5432/myapp';
```

#### Required Pattern

```javascript
// ✅ ALWAYS DO THIS
const apiKey = process.env.OPENAI_API_KEY;
const dbUrl = process.env.DATABASE_URL;
```

### Secret Detection

Before committing, run:

```bash
npm run lint:secrets
```

This scans for:

- AWS Access Keys (`AKIA*`)
- OpenAI API Keys (`sk-proj-*`)
- GitHub PATs (`ghp_*`)
- Stripe Keys (`sk_live_*`)
- JWT Tokens
- Private Keys (PEM, PFX)
- Database Connection Strings

### Protected Files

These files are automatically ignored by Git:

- `.env`, `.env.*` (except `.env.example`)
- `*.pem`, `*.key`, `*.pfx`, `*.p12`
- `credentials.json`, `service-account*.json`
- `.cursor/`, `.claude/`, `.clinerules`

### Environment Variables

When adding new environment variables:

1. Add to `.env.example` with placeholder value
2. Document in README.md and README-PT-BR.md
3. Never use real credentials in examples

**Example**:

```bash
# .env.example
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Vibe Coding with AI

When using AI tools (Cursor, Claude, Copilot):

1. Ensure `.cursorrules` is present in the project root
2. AI will be instructed to never hardcode secrets
3. Review all AI-generated code for secrets before committing
4. If AI generates a secret, replace with `process.env.VARIABLE_NAME`

See [SECURITY.md](SECURITY.md) for the full 4-layer defense strategy.

## Contribution Types

We recognize the following types of contributions:

| Type | Emoji | Description |
|------|-------|-------------|
| Documentation | 📝 `doc` | Writing or improving documentation, translations |
| Ideas | 💡 `ideas` | Suggesting content, guides, or improvements |
| Bug Fixes | 🐛 `bug` | Fixing broken links, typos, or errors |
| Tools | 🔧 `tool` | CI/CD, scripts, automations, tooling |
| Reviews | 🔍 `review` | Reviewing pull requests, providing feedback |

Contributors are automatically recognized via the [all-contributors](https://allcontributors.org/) bot.

## Review Process

1. **Automated Checks**: CI runs automatically on all PRs
   - Markdown linting
   - Link validation
   - Commit message validation
   - Structural parity check (EN ↔ PT-BR)
   - Secret scanning (gitleaks)
   - Security audit (.env files, private keys, hardcoded secrets)

2. **Human Review**: At least 1 maintainer must approve
   - Content accuracy
   - Documentation quality
   - Adherence to standards
   - Security compliance

3. **Merge**: After approval and all checks pass
   - Maintainer will merge using squash or rebase
   - Release is automated via semantic-release

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git 2.34+ (for Husky hooks)
- Gitleaks (optional, for local secret scanning)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/awesome-vibe-coding-guide.git
cd awesome-vibe-coding-guide

# Install dependencies
npm install

# Setup Git hooks
npm run prepare

# (Optional) Install gitleaks for local secret scanning
brew install gitleaks  # macOS
# or download from https://github.com/gitleaks/gitleaks/releases
```

### Local Development

```bash
# Lint Markdown files
npm run lint:md

# Check links
npm run lint:links

# Scan for secrets
npm run lint:secrets

# Fix auto-fixable Markdown issues
npm run lint:md -- --fix

# Run all validations
npm test

# Switch language mode
npm run mode:en    # English first
npm run mode:pt    # Portuguese first
```

## Questions?

If you have questions about contributing, please:

1. Check existing [issues](../../issues) and [discussions](../../discussions)
2. Open a new issue with the `question` label
3. Reach out to maintainers

Thank you for contributing! 🎉
