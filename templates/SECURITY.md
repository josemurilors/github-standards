# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

### Private Vulnerability Reporting (Preferred)

1. Go to the [Security tab](../../security/advisories/new) of this repository
2. Click "Report a vulnerability"
3. Fill out the form with as much detail as possible

### Email

If private vulnerability reporting is not available, email the maintainers directly:

- **Primary**: [INSERT EMAIL]
- **Secondary**: [INSERT EMAIL]

## What to Include

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting)
- Full paths of source file(s) related to the manifestation of the issue
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Response Timeline

- **Initial Response**: Within 48 hours of submission
- **Status Update**: Within 7 days with details on the vulnerability and planned fix
- **Resolution**: Timeline depends on severity and complexity

## Disclosure Policy

- We follow **Coordinated Vulnerability Disclosure**
- We will work with you to understand and reproduce the issue
- We will notify you when a fix is deployed
- We will credit you in the security advisory (unless you prefer to remain anonymous)
- Public disclosure will be made after a fix is available

---

## Vibe Coding Security: 4-Layer Defense

This repository implements a **4-layer defense-in-depth** strategy to prevent secret leaks in AI-assisted development (Vibe Coding).

### Layer 1: Local Defense (Pre-Commit Block)

**Goal**: Prevent secrets from being written to Git history.

**Tools**:

- **Gitleaks** + **Husky** pre-commit hook

**How it works**:

```bash
# Every git commit triggers gitleaks scan
git commit → husky pre-commit → gitleaks detect → PASS/FAIL
```

**Configuration**:

- `.gitleaks.toml` - Detection rules for AWS, OpenAI, Stripe, JWT, etc.
- `.husky/pre-commit` - Hook that runs gitleaks before every commit

**Local validation**:

```bash
npm run lint:secrets          # Scan entire repo
npm run lint:secrets:staged   # Scan only staged files
```

### Layer 2: Repository Defense (.gitignore & Templates)

**Goal**: Prevent sensitive files from being tracked by Git.

**Files**:

- `.gitignore` - Comprehensive ignore patterns for secrets
- `.env.example` - Template with placeholder values

**Protected patterns**:

```gitignore
# Environment files
.env
.env.*
!.env.example

# Keys and certificates
*.pem
*.key
*.pfx
*.p12
credentials.json
service-account*.json

# AI tool local data
.cursor/
.clinerules
.claude/
```

### Layer 3: Cloud Defense (GitHub Push Protection)

**Goal**: Block secrets at the GitHub server level before they're saved.

**Features to enable** (Admin access required):

1. **GitHub Push Protection**:
   - Navigate to: `Settings → Code security and analysis`
   - Enable: "Push protection"
   - GitHub will reject pushes containing known secret patterns

2. **Secret Scanning**:
   - Enable: "Secret scanning"
   - GitHub continuously scans for secrets and alerts admins

3. **Dependabot Alerts**:
   - Enable: "Dependabot"
   - Automatic notifications for vulnerable dependencies

**Supported patterns** (GitHub native detection):

- `sk-proj-*` (OpenAI)
- `AKIA*` (AWS Access Keys)
- `ghp_*` (GitHub PATs)
- `sk_live_*` (Stripe)
- And 200+ more patterns

### Layer 4: AI Hygiene (Prompt Rules)

**Goal**: Instruct AI tools to never generate insecure code.

**File**: `.cursorrules`

**Key rules**:

```text
NEVER DO:
- Hardcode API keys, tokens, passwords in source code
- Commit .env files with real credentials
- Log sensitive information
- Include secrets in error messages

ALWAYS DO:
- Use environment variables: process.env (Node), os.getenv (Python)
- Reference .env.example for required variables
- Use GitHub Secrets for CI/CD
- Use secret managers in production (Vault, AWS Secrets Manager)
```

**AI Agent behavior**:

1. Before generating code: Check if task requires external APIs
2. If yes: Use environment variables exclusively
3. If user provides a key: Store in .env (not in code)
4. Remind user to add key to .env.example

---

## Contingency Plan (If a Secret Leaks)

If a secret is accidentally committed despite all defenses:

### Step 1: Revoke Immediately (DO THIS FIRST)

**The first action is NEVER to delete the Git commit.** The first action is to **invalidate the key at the provider**.

- **OpenAI**: Dashboard → API Keys → Revoke
- **AWS**: IAM → Users → Security credentials → Deactivate
- **GitHub**: Settings → Developer settings → Personal access tokens → Delete
- **Stripe**: Dashboard → Developers → API keys → Roll key

### Step 2: Rewrite Git History

A simple `git rm` does NOT remove the secret from previous commits. You must rewrite history:

**Option A: git-filter-repo (Recommended)**

```bash
# Install
pip install git-filter-repo

# Remove specific file from all history
git filter-repo --path .env --force

# Remove specific string from all history
git filter-repo --replace-text expressions.txt --force
# Where expressions.txt contains:
# literal:sk-proj-abc123...==>REMOVED
```

**Option B: BFG Repo-Cleaner**

```bash
# Download BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Remove file
java -jar bfg.jar --delete-files .env

# Remove password
java -jar bfg.jar --replace-text passwords.txt
```

**After rewriting**:

```bash
# Force push (DANGEROUS - coordinate with team)
git push --force --all
git push --force --tags

# Notify all contributors to re-clone
```

### Step 3: Rotate All Related Credentials

Even if you removed the secret, assume it's compromised:

1. Generate new credentials at the provider
2. Update `.env` files locally (never commit)
3. Update GitHub Secrets if used in CI/CD
4. Update any production systems using the old credentials
5. Audit logs for unauthorized usage

### Step 4: Post-Incident Review

1. Document what happened in a private security advisory
2. Identify the root cause (which layer failed?)
3. Update detection rules if needed
4. Train team on the incident (without blame)

---

## Security Best Practices

### Secrets Management

- **Never** commit secrets, API keys, tokens, or passwords
- Use environment variables (`.env` files) for local development
- Add sensitive files to `.gitignore`
- Use GitHub Secrets for CI/CD workflows
- Use secret managers in production (AWS Secrets Manager, HashiCorp Vault, Infisical)

### Dependencies

- Keep dependencies up to date (Dependabot is enabled)
- Review dependency updates before merging
- Use `npm audit` to check for known vulnerabilities

### Code Review

- All changes must go through pull request review
- Security-sensitive changes require additional review
- CI runs secret scanning automatically

### Authentication

- Use OIDC (OpenID Connect) for cloud provider authentication when possible
- Avoid long-lived static credentials
- Rotate secrets regularly (every 90 days recommended)

---

## Security Features

This repository implements the following security features:

- ✅ **Gitleaks**: Secret detection in pre-commit hooks and CI
- ✅ **Dependabot**: Automated dependency updates
- ✅ **Secret Scanning**: GitHub native secret detection
- ✅ **Push Protection**: Block secrets before they're pushed
- ✅ **Branch Protection**: Prevents unauthorized changes to `main`
- ✅ **Code Review**: Required approvals before merge
- ✅ **Signed Commits**: Ensures commit authenticity
- ✅ **AI Rules**: .cursorrules for secure AI-assisted development

## Security Updates

Security updates are announced via:

- GitHub Security Advisories
- Release notes in [CHANGELOG.md](CHANGELOG.md)
- GitHub Releases

## Acknowledgments

We appreciate the responsible disclosure of security vulnerabilities. Contributors who report security issues will be acknowledged in our security advisories (unless they prefer to remain anonymous).

## Contact

For security-related questions, please contact:

- **Email**: [INSERT EMAIL]
- **GitHub Security Advisory**: [New Advisory](../../security/advisories/new)

Thank you for helping keep this project secure!
