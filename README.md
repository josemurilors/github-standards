# GitHub Standards Skill

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-BR.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Secret Scanning](https://img.shields.io/badge/Secret%20Scanning-Gitleaks-brightgreen)](SECURITY.md)

## Overview

This skill standardizes GitHub repositories with bilingual documentation (EN/PT-BR), secure CI/CD pipelines, open-source governance, code validation, and **4-layer secret protection for Vibe Coding**.

## Features

- **Bilingual Documentation**: EN/PT-BR README with parity validation and **switchable language modes**
- **CI/CD Pipeline**: GitHub Actions for linting, link checking, commit validation, and **secret scanning**
- **Vibe Coding Security**: 4-layer defense against secret leaks in AI-assisted development
- **Conventional Commits**: Enforced commit message standards with husky + commitlint
- **Security**: Dependabot, Gitleaks, GitHub Push Protection, and branch protection rules
- **Automation**: semantic-release for automated versioning and changelog generation
- **CLI Tool**: Scaffold new projects or apply standards to existing ones
- **AI Agent Integration**: Install skill globally in OpenCode, Claude Code, Codex, Cursor, and more

## CLI Installation

Install globally to use as a CLI tool:

```bash
npm install -g @josemurilors/github-standards
```

### CLI Commands

```bash
# Initialize a new project with GitHub standards
github-standards init
github-standards init --name my-project --mode pt-br-first

# Apply standards to an existing project
github-standards setup --mode en-first

# Validate current project configuration
github-standards validate

# Install skill globally in AI agents
github-standards install-skill
github-standards install-skill --all
```

## AI Agent Integration

Install the skill globally in supported AI agents to automatically apply GitHub standards in all your projects:

```bash
github-standards install-skill
```

### Supported Agents

| Agent | Status | Directory |
|-------|--------|-----------|
| 🔧 OpenCode | ✅ Supported | `~/.agents/skills/` |
| 🤖 Claude Code | ✅ Supported | `~/.claude/skills/` |
| 📦 Codex | ✅ Supported | `~/.codex/skills/` |
| 🎯 Cursor | ✅ Supported | `~/.cursor/skills/` |
| 🐙 GitHub Copilot | ✅ Supported | `~/.config/github-copilot/skills/` |
| 🦾 OpenClaude | ✅ Supported | `~/.openclaude/skills/` |
| ⚡ Hermes | ✅ Supported | `~/.hermes/skills/` |

After installation, the skill will be automatically available in all projects with git.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Git Hooks

```bash
npm run prepare
```

### 3. Set Language Mode

```bash
# English as source of truth (default)
npm run mode:en

# Portuguese as source of truth
npm run mode:pt
```

### 4. Run Validation Locally

```bash
npm run lint:md          # Lint Markdown
npm run lint:links       # Check links
npm run lint:secrets     # Scan for secrets
npm test                 # Run all validations
```

## Vibe Coding Security: 4-Layer Defense

This skill implements a **defense-in-depth** strategy to prevent secret leaks in AI-assisted development:

| Layer | Defense | Tool | Function |
|-------|---------|------|----------|
| 1 | Local | husky + gitleaks | Blocks commits with secrets on dev machine |
| 2 | Repository | .gitignore + .env.example | Prevents tracking of sensitive files |
| 3 | Cloud | GitHub Push Protection | Blocks pushes containing secrets |
| 4 | AI | .cursorrules + SECURITY.md | Instructs AI to never generate insecure code |

### Secret Detection Patterns

Gitleaks detects 15+ secret types including:

- AWS Access Keys (`AKIA*`)
- OpenAI API Keys (`sk-proj-*`)
- GitHub PATs (`ghp_*`)
- Stripe Keys (`sk_live_*`)
- JWT Tokens
- Private Keys (PEM, PFX)
- Database Connection Strings

### Contingency Plan

If a secret leaks:

1. **Revoke immediately** at the provider (not delete Git commit)
2. **Rewrite Git history** with git-filter-repo or BFG
3. **Rotate all related credentials**
4. **Post-incident review**

See [SECURITY.md](SECURITY.md) for full details.

## Project Structure

```text
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # CI validation + secret scanning
│   │   ├── release.yml         # Automated releases
│   │   └── all-contributors.yml
│   ├── dependabot.yml
│   └── mode.json               # Language mode configuration
├── .husky/
│   ├── commit-msg              # Commit message validation
│   └── pre-commit              # Gitleaks + Markdown linting
├── scripts/
│   └── set-mode.sh             # Language mode switcher
├── README.md                   # English documentation
├── README.pt-BR.md             # Portuguese documentation
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Community standards
├── SECURITY.md                 # Security policy + 4-layer defense
├── CHANGELOG.md                # Version history
├── .cursorrules                # AI security rules
├── .gitleaks.toml              # Secret detection config
├── .env.example                # Environment template
├── package.json                # Dependencies and scripts
├── .commitlintrc.json          # Commit linting rules
├── .markdownlint.json          # Markdown linting rules
├── .releaserc.json             # Semantic release config
└── .lychee.toml                # Link checker config
```

## Language Modes

The skill supports two modes for bilingual documentation:

### EN-First Mode (Default)

- `README.md` is the source of truth (English)
- `README.pt-BR.md` is the translation (Portuguese)
- Use for: International projects, open-source

### PT-BR-First Mode

- `README.pt-BR.md` is the source of truth (Portuguese)
- `README.md` is the translation (English)
- Use for: Local projects, Brazilian companies

Switch modes with:

```bash
npm run mode:en    # English first
npm run mode:pt    # Portuguese first
```

## Commit Convention

All commits must follow [Conventional Commits](https://conventionalcommits.org):

```text
<type>(<scope>): <description>
```

### Types

- `feat`: New feature (MINOR version bump)
- `fix`: Bug fix (PATCH version bump)
- `docs`: Documentation changes
- `security`: Security fixes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD configuration changes
- `revert`: Reverting previous commits

## Branch Protection Rules

The `main` branch requires:

- ✅ Pull request with minimum 1 approval
- ✅ Status checks must pass (CI workflow)
- ✅ Branches must be up to date before merging
- ✅ Signed commits
- ✅ Linear history (squash or rebase merge)
- ❌ No force pushes
- ❌ No deletions

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Contribution Types

- 📝 `doc` - Documentation and translations
- 💡 `ideas` - Content suggestions and guides
- 🐛 `bug` - Link corrections and errata
- 🔧 `tool` - CI/CD, scripts, and automations
- 🔍 `review` - Pull request reviews

## Security

Please read [SECURITY.md](SECURITY.md) for:

- Vulnerability reporting process
- 4-layer secret protection strategy
- Contingency plan for leaked secrets
- AI security rules (.cursorrules)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

Thanks to all the people who have contributed to this project:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

⭐️ If you find this repository helpful, please consider giving it a star!
