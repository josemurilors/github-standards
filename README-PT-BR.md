# GitHub Standards Skill

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README-PT-BR.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Secret Scanning](https://img.shields.io/badge/Secret%20Scanning-Gitleaks-brightgreen)](SECURITY.md)

> Padronize repositórios GitHub com documentação bilíngue, CI/CD seguro e proteção de secrets em 4 camadas para Vibe Coding.

## Sobre

Esta skill implementa padrões profissionais para repositórios GitHub, combinando documentação bilíngue (EN/PT-BR), pipelines CI/CD automatizados, governança open-source e segurança robusta contra vazamento de secrets em desenvolvimento assistido por IA.

## Funcionalidades

- **Documentação Bilíngue** - README EN/PT-BR com validação de paridade e modos de idioma alternáveis
- **Pipeline CI/CD** - GitHub Actions para linting, verificação de links, validação de commits e scan de secrets
- **Segurança Vibe Coding** - Defesa em 4 camadas contra vazamento de secrets
- **Conventional Commits** - Padrões de mensagens de commit com husky + commitlint
- **Automação** - semantic-release para versionamento automático e geração de changelog
- **CLI Tool** - Crie novos projetos ou aplique padrões em projetos existentes
- **Integração com IA** - Instale globalmente no OpenCode, Claude Code, Codex, Cursor e mais

## Instalação

### CLI Global

```bash
npm install -g github-standards-cli
```

### Comandos Disponíveis

```bash
# Inicializar novo projeto
github-standards init
github-standards init --name meu-projeto --mode pt-br-first

# Aplicar padrões em projeto existente
github-standards setup --mode pt-br-first

# Validar configuração atual
github-standards validate

# Instalar skill globalmente em agentes de IA
github-standards install-skill
github-standards install-skill --all
```

## Integração com Agentes de IA

Instale a skill globalmente para aplicar automaticamente os padrões GitHub em todos os seus projetos:

```bash
github-standards install-skill
```

### Agentes Suportados

| Agente | Status | Diretório |
|--------|--------|-----------|
| OpenCode | Suportado | `~/.agents/skills/` |
| Claude Code | Suportado | `~/.claude/skills/` |
| Codex | Suportado | `~/.codex/skills/` |
| Cursor | Suportado | `~/.cursor/skills/` |
| GitHub Copilot | Suportado | `~/.config/github-copilot/skills/` |
| OpenClaude | Suportado | `~/.openclaude/skills/` |
| Hermes | Suportado | `~/.hermes/skills/` |

Após a instalação, a skill estará automaticamente disponível em todos os projetos com git.

## Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Git Hooks

```bash
npm run prepare
```

### 3. Definir Modo de Idioma

```bash
# Inglês como fonte da verdade (padrão)
npm run mode:en

# Português como fonte da verdade
npm run mode:pt
```

### 4. Executar Validação

```bash
npm run lint:md          # Lint Markdown
npm run lint:links       # Verificar links
npm run lint:secrets     # Escanear secrets
npm test                 # Executar todas as validações
```

## Segurança Vibe Coding: Defesa em 4 Camadas

Estratégia de **defesa em profundidade** para prevenir vazamento de secrets em desenvolvimento assistido por IA:

| Camada | Defesa | Ferramenta | Função |
|--------|--------|------------|--------|
| 1 | Local | husky + gitleaks | Bloqueia commits com secrets na máquina do dev |
| 2 | Repositório | .gitignore + .env.example | Evita rastreio de arquivos sensíveis |
| 3 | Nuvem | GitHub Push Protection | Bloqueia pushes contendo secrets |
| 4 | IA | .cursorrules + SECURITY.md | Instrui IA a nunca gerar código inseguro |

### Padrões Detectados

O Gitleaks detecta 15+ tipos de secrets:

- AWS Access Keys (`AKIA*`)
- OpenAI API Keys (`sk-proj-*`)
- GitHub PATs (`ghp_*`)
- Stripe Keys (`sk_live_*`)
- JWT Tokens
- Private Keys (PEM, PFX)
- Database Connection Strings

### Plano de Contingência

Se um secret vazar:

1. **Revogar imediatamente** no provedor (não deletar commit Git)
2. **Reescrever histórico Git** com git-filter-repo ou BFG
3. **Rotacionar todas as credenciais relacionadas**
4. **Revisão pós-incidente**

Consulte [SECURITY.md](SECURITY.md) para detalhes completos.

## Modos de Idioma

A skill suporta dois modos para documentação bilíngue:

### EN-First (Padrão)

- `README.md` é a fonte da verdade (Inglês)
- `README-PT-BR.md` é a tradução (Português)
- **Use para**: Projetos internacionais, open-source

### PT-BR-First

- `README.md` é a fonte da verdade (Português)
- `README-ENG.md` é a tradução (Inglês)
- **Use para**: Projetos locais, empresas brasileiras

Alterne modos com:

```bash
npm run mode:en    # Inglês primeiro
npm run mode:pt    # Português primeiro
```

## Estrutura do Projeto

```text
.
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Validação CI + scan de secrets
│   │   ├── release.yml         # Releases automatizados
│   │   └── all-contributors.yml
│   ├── dependabot.yml
│   └── mode.json               # Configuração do modo de idioma
├── .husky/
│   ├── commit-msg              # Validação de mensagens de commit
│   └── pre-commit              # Gitleaks + linting Markdown
├── scripts/
│   └── set-mode.sh             # Alternador de modo de idioma
├── README.md                   # Documentação em português (fonte da verdade)
├── README-ENG.md               # Documentação em inglês (tradução)
├── CONTRIBUTING.md             # Diretrizes de contribuição
├── CODE_OF_CONDUCT.md          # Padrões da comunidade
├── SECURITY.md                 # Política de segurança
├── CHANGELOG.md                # Histórico de versões
├── .cursorrules                # Regras de segurança para IA
├── .gitleaks.toml              # Configuração de detecção de secrets
├── .env.example                # Template de ambiente
├── package.json                # Dependências e scripts
├── .commitlintrc.json          # Regras de linting de commits
├── .markdownlint.json          # Regras de linting de markdown
├── .releaserc.json             # Configuração do semantic release
└── .lychee.toml                # Configuração do verificador de links
```

## Convenção de Commits

Todos os commits devem seguir o [Conventional Commits](https://conventionalcommits.org):

```text
<tipo>(<escopo opcional>): <descrição>
```

### Tipos Disponíveis

- `feat` - Nova funcionalidade (incrementa versão MINOR)
- `fix` - Correção de bug (incrementa versão PATCH)
- `docs` - Alterações na documentação
- `security` - Correções de segurança
- `style` - Alterações de estilo de código
- `refactor` - Refatoração de código
- `test` - Adição ou atualização de testes
- `chore` - Tarefas de manutenção
- `ci` - Alterações na configuração de CI/CD
- `revert` - Reversão de commits anteriores

## Regras de Proteção de Branch

A branch `main` requer:

- Pull request com no mínimo 1 aprovação
- Verificações de status devem passar (workflow CI)
- Branches devem estar atualizadas antes do merge
- Commits assinados
- Histórico linear (squash ou rebase merge)
- Sem force pushes
- Sem exclusões

## Contribuindo

Acolhemos contribuições! Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

### Tipos de Contribuição

- `doc` - Documentação e traduções
- `ideas` - Sugestões de conteúdo e guias
- `bug` - Correções de links e erratas
- `tool` - CI/CD, scripts e automações
- `review` - Revisões de pull requests

## Segurança

Consulte [SECURITY.md](SECURITY.md) para:

- Processo de reporte de vulnerabilidades
- Estratégia de proteção de secrets em 4 camadas
- Plano de contingência para secrets vazados
- Regras de segurança para IA (.cursorrules)

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contribuidores

Obrigado a todas as pessoas que contribuíram para este projeto:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

Se você encontrar este repositório útil, considere dar uma estrela!
