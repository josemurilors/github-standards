---
name: github-standards
description: Padroniza repositórios GitHub com documentação bilíngue (EN/PT-BR), pipelines de deploy seguro via OIDC, governança open-source, validação de código e segurança de secrets em 4 camadas para Vibe Coding.
version: 2.0.0
tags: [github, git, ci-cd, security, documentation, bilingual, conventional-commits, gitleaks, vibe-coding]
---

# GitHub Standards Skill

## Visão Geral

Esta skill padroniza repositórios GitHub com:

- Documentação bilíngue (EN/PT-BR) com modos configuráveis
- CI/CD pipeline com validação de commits, links e secrets
- Governança open-source (CONTRIBUTING, CODE_OF_CONDUCT, SECURITY)
- Segurança de secrets em 4 camadas para Vibe Coding
- Automação com semantic-release e all-contributors

## Quando Usar

Use esta skill quando:

- Criar novo repositório GitHub com padrões profissionais
- Padronizar repositório existente com boas práticas
- Implementar segurança de secrets em projeto com Vibe Coding
- Configurar CI/CD com GitHub Actions
- Documentar projeto bilíngue (EN/PT-BR)

## Modos de Operação

### EN-First (Padrão)

- `README.md` é a fonte da verdade (Inglês)
- `README-PT-BR.md` é a tradução
- Use para: projetos internacionais, open-source

### PT-BR-First

- `README.md` é a fonte da verdade (Português)
- `README-ENG.md` é a tradução
- Use para: projetos locais, empresas brasileiras

## Estrutura Gerada

```text
projeto/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # CI validation + secret scanning
│   │   ├── release.yml         # Automated releases
│   │   └── all-contributors.yml
│   ├── dependabot.yml
│   └── mode.json               # Language mode config
├── .husky/
│   ├── commit-msg              # Commit validation
│   └── pre-commit              # Gitleaks + Markdown linting
├── scripts/
│   ├── set-mode.sh             # Language mode switcher
│   └── verify-gitignore.sh     # Gitignore verification
├── README.md                   # Source of truth (language depends on mode)
├── README-PT-BR.md             # Portuguese translation (EN-First mode)
├── README-ENG.md               # English translation (PT-BR-First mode)
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE_OF_CONDUCT.md          # Contributor Covenant v2.1
├── SECURITY.md                 # 4-layer secret defense
├── CHANGELOG.md                # Version history
├── .cursorrules                # AI security rules
├── .gitleaks.toml              # Secret detection config
├── .env.example                # Environment template
├── package.json                # Dependencies and scripts
├── .commitlintrc.json          # Commit linting rules
├── .markdownlint.json          # Markdown linting rules
├── .releaserc.json             # Semantic release config
├── .lychee.toml                # Link checker config
└── .gitignore                  # Granular ignore rules
```

## Segurança de Secrets: 4 Camadas

### Camada 1: Defesa Local (Pre-Commit)

- **Gitleaks** + **Husky** pre-commit hook
- Bloqueia commits com secrets na máquina do dev
- Detecta: AWS, OpenAI, GitHub, Stripe, JWT, etc.

### Camada 2: Defesa no Repositório

- **.gitignore** blindado com padrões granulares
- **.env.example** com placeholders
- Ignora apenas dados locais, versiona configs compartilhadas

### Camada 3: Defesa na Nuvem

- **GitHub Push Protection** (bloqueia pushes com secrets)
- **Secret Scanning** (varredura contínua)
- **Dependabot** (atualização de dependências)

### Camada 4: Higiene de IA

- **.cursorrules** com regras de segurança
- Instrui IA a nunca hardcodar secrets
- Sempre usar variáveis de ambiente

## Plano de Contingência

Se um secret vazar:

1. **Revogar imediatamente** no provedor (NÃO deletar commit)
2. **Reescrever histórico** com git-filter-repo ou BFG
3. **Rotacionar credenciais** relacionadas
4. **Revisão pós-incidente**

## Comandos Disponíveis

```bash
# Validação
npm run lint:md              # Lint Markdown
npm run lint:links           # Check links
npm run lint:secrets         # Scan for secrets
npm run verify:gitignore     # Verify .gitignore rules
npm test                     # Run all validations

# Modos de Idioma
npm run mode:en              # English first (default)
npm run mode:pt              # Portuguese first

# Setup
npm install                  # Install dependencies
npm run prepare              # Setup husky hooks
```

## Branch Protection Rules

A branch `main` deve ter:

- ✅ Pull request com mínimo 1 aprovação
- ✅ Status checks devem passar (CI workflow)
- ✅ Branches atualizadas antes do merge
- ✅ Commits assinados
- ✅ Histórico linear (squash ou rebase)
- ❌ Sem force pushes
- ❌ Sem exclusões

## Convenção de Commits

Todos os commits devem seguir Conventional Commits:

```text
<tipo>(<escopo>): <descrição>

feat: Nova funcionalidade (MINOR)
fix: Correção de bug (PATCH)
docs: Documentação
security: Correções de segurança
style: Estilo de código
refactor: Refatoração
test: Testes
chore: Manutenção
ci: CI/CD
revert: Reversão
```

## Arquivos de Referência

Todos os arquivos de template estão em:
`/mnt/sda1/meus-projetos/boas-praticas-github/`

## Fluxo de Implementação

### Para Novo Repositório

1. Copiar todos os arquivos do template
2. Executar `npm install`
3. Executar `npm run prepare`
4. Escolher modo: `npm run mode:en` ou `npm run mode:pt`
5. Personalizar READMEs
6. Configurar Branch Protection Rules (Admin)
7. Habilitar GitHub Security Features (Admin)

### Para Repositório Existente

1. Backup do repositório atual
2. Copiar arquivos de configuração (.github/, .husky/, scripts/)
3. Copiar arquivos de governança (CONTRIBUTING, CODE_OF_CONDUCT, SECURITY)
4. Atualizar READMEs com language selector
5. Executar `npm install`
6. Executar `npm run prepare`
7. Testar com `npm test`
8. Commit e push

## Validação

Antes do push, executar:

```bash
npm test                     # Valida tudo
npm run verify:gitignore     # Verifica .gitignore
```

Todos os 23 testes devem passar.

## Decisões Arquiteturais

Ver `DECISIONS.md` para 14 ADRs (Architectural Decision Records) documentando:

- Estratégia de documentação bilíngue
- Seleção de ferramentas CI/CD
- Implementação de parity check
- Sistema de modos de idioma
- Segurança de secrets em 4 camadas
- Configuração do Gitleaks
- Regras de segurança para IA

## Recursos

- [Conventional Commits](https://conventionalcommits.org)
- [Semantic Versioning](https://semver.org)
- [Gitleaks](https://github.com/gitleaks/gitleaks)
- [markdownlint](https://github.com/DavidAnson/markdownlint)
- [lychee](https://github.com/lycheeverse/lychee)
- [husky](https://typicode.github.io/husky/)
- [commitlint](https://commitlint.js.org/)

## Contato

Para questões ou suporte, abrir issue no repositório de referência.
