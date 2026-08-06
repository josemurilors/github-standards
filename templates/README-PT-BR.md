# GitHub Standards Skill

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README-PT-BR.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Secret Scanning](https://img.shields.io/badge/Secret%20Scanning-Gitleaks-brightgreen)](SECURITY.md)

## Visão Geral

Esta skill padroniza repositórios GitHub com documentação bilíngue (EN/PT-BR), pipelines CI/CD seguros, governança open-source, validação de código e **proteção de secrets em 4 camadas para Vibe Coding**.

## Funcionalidades

- **Documentação Bilíngue**: README EN/PT-BR com validação de paridade e **modos de idioma alternáveis**
- **Pipeline CI/CD**: GitHub Actions para linting, verificação de links, validação de commits e **scan de secrets**
- **Segurança Vibe Coding**: Defesa em 4 camadas contra vazamento de secrets em desenvolvimento assistido por IA
- **Conventional Commits**: Padrões de mensagens de commit com husky + commitlint
- **Segurança**: Dependabot, Gitleaks, GitHub Push Protection e regras de proteção de branch
- **Automação**: semantic-release para versionamento automático e geração de changelog

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

### 4. Executar Validação Localmente

```bash
npm run lint:md          # Lint Markdown
npm run lint:links       # Verificar links
npm run lint:secrets     # Escanear secrets
npm test                 # Executar todas as validações
```

## Segurança Vibe Coding: Defesa em 4 Camadas

Esta skill implementa uma estratégia de **defesa em profundidade** para prevenir vazamento de secrets em desenvolvimento assistido por IA:

| Camada | Defesa | Ferramenta | Função |
|--------|--------|------------|--------|
| 1 | Local | husky + gitleaks | Bloqueia commits com secrets na máquina do dev |
| 2 | Repositório | .gitignore + .env.example | Evita rastreio de arquivos sensíveis |
| 3 | Nuvem | GitHub Push Protection | Bloqueia pushes contendo secrets |
| 4 | IA | .cursorrules + SECURITY.md | Instrui IA a nunca gerar código inseguro |

### Padrões de Detecção de Secrets

O Gitleaks detecta 15+ tipos de secrets incluindo:

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

Veja [SECURITY.md](SECURITY.md) para detalhes completos.

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
├── README.md                   # Documentação em inglês
├── README-PT-BR.md             # Documentação em português
├── CONTRIBUTING.md             # Diretrizes de contribuição
├── CODE_OF_CONDUCT.md          # Padrões da comunidade
├── SECURITY.md                 # Política de segurança + defesa 4 camadas
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

## Modos de Idioma

A skill suporta dois modos para documentação bilíngue:

### Modo EN-First (Padrão)

- `README.md` é a fonte da verdade (Inglês)
- `README-PT-BR.md` é a tradução (Português)
- Use para: Projetos internacionais, open-source

### Modo PT-BR-First

- `README-PT-BR.md` é a fonte da verdade (Português)
- `README.md` é a tradução (Inglês)
- Use para: Projetos locais, empresas brasileiras

Alterne modos com:

```bash
npm run mode:en    # Inglês primeiro
npm run mode:pt    # Português primeiro
```

## Convenção de Commits

Todos os commits devem seguir o [Conventional Commits](https://conventionalcommits.org):

```text
<tipo>(<escopo opcional>): <descrição>
```

### Tipos

- `feat`: Nova funcionalidade (incrementa versão MINOR)
- `fix`: Correção de bug (incrementa versão PATCH)
- `docs`: Alterações na documentação
- `security`: Correções de segurança
- `style`: Alterações de estilo de código
- `refactor`: Refatoração de código
- `test`: Adição ou atualização de testes
- `chore`: Tarefas de manutenção
- `ci`: Alterações na configuração de CI/CD
- `revert`: Reversão de commits anteriores

## Regras de Proteção de Branch

A branch `main` requer:

- ✅ Pull request com no mínimo 1 aprovação
- ✅ Verificações de status devem passar (workflow CI)
- ✅ Branches devem estar atualizadas antes do merge
- ✅ Commits assinados
- ✅ Histórico linear (squash ou rebase merge)
- ❌ Sem force pushes
- ❌ Sem exclusões

## Contribuindo

Acolhemos contribuições! Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

### Tipos de Contribuição

- 📝 `doc` - Documentação e traduções
- 💡 `ideas` - Sugestões de conteúdo e guias
- 🐛 `bug` - Correções de links e erratas
- 🔧 `tool` - CI/CD, scripts e automações
- 🔍 `review` - Revisões de pull requests

## Segurança

Por favor, leia [SECURITY.md](SECURITY.md) para:

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

⭐️ Se você encontrar este repositório útil, considere dar uma estrela!
