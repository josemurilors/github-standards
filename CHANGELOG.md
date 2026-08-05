# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project structure
- Bilingual README support (EN/PT-BR)
- CI/CD pipeline with GitHub Actions
- Conventional Commits enforcement
- Markdown linting and link checking
- Branch protection rules documentation
- Contributor Covenant Code of Conduct
- Security policy and vulnerability reporting process
- Automated semantic-release configuration
- All-contributors bot integration

### Changed

- N/A

### Deprecated

- N/A

### Removed

- N/A

### Fixed

- N/A

### Security

- N/A

---

## [1.0.0] - Initial Release

### Added

- Original project documentation
- Setup and planning guide
- Coding and prompting guide
- Testing and debugging guide
- Version and deployment guide

---

## Versioning Scheme

This project uses [Semantic Versioning](https://semver.org/):

- **MAJOR** version: Incompatible API changes or breaking changes to contribution process
- **MINOR** version: Backward-compatible functionality additions (new features)
- **PATCH** version: Backward-compatible bug fixes

### What Constitutes Each Version Type

#### MAJOR (2.0.0, 3.0.0, etc.)

- Breaking changes to contribution workflow
- Removal of supported features
- Changes to commit convention that break existing commits
- Major restructuring of documentation

#### MINOR (2.1.0, 2.2.0, etc.)

- New documentation sections
- Additional language support
- New CI/CD checks
- New contribution types
- Backward-compatible improvements

#### PATCH (2.0.1, 2.0.2, etc.)

- Bug fixes in documentation
- Link corrections
- Typo fixes
- Minor clarifications
- Security patches

## Release Process

Releases are automated via [semantic-release](https://github.com/semantic-release/semantic-release):

1. Commits are analyzed for Conventional Commits format
2. Version is determined based on commit types
3. CHANGELOG.md is automatically updated
4. GitHub Release is created with release notes
5. Tags are created automatically

### Commit Types and Their Impact

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `feat` | MINOR | `feat: Add Spanish translation` |
| `fix` | PATCH | `fix: Correct broken links` |
| `docs` | PATCH | `docs: Update installation guide` |
| `refactor` | PATCH | `refactor: Simplify CI workflow` |
| `perf` | PATCH | `perf: Optimize link checker` |
| `test` | PATCH | `test: Add parity check tests` |
| `chore` | PATCH | `chore: Update dependencies` |
| `ci` | PATCH | `ci: Add new validation job` |
| `feat!` or `BREAKING CHANGE:` | MAJOR | `feat!: Remove Portuguese support` |

## How to Update This File

**Note**: This file is automatically maintained by semantic-release. Do not edit manually except for the `[Unreleased]` section when documenting upcoming changes.

For manual updates during development:

1. Add changes under `[Unreleased]`
2. Use the appropriate category (Added, Changed, Deprecated, Removed, Fixed, Security)
3. Keep entries concise but descriptive
4. Reference issues/PRs where applicable: `- Added feature X (#123)`

## Previous Releases

For releases prior to v2.0.0, please see the [GitHub Releases](../../releases) page.

---

**Last Updated**: 2026-01-XX (Manual entry for initial v2.0.0 setup)
