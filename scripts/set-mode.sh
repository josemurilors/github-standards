#!/bin/bash

# Script para configurar o modo de idioma do repositório
# Uso: ./scripts/set-mode.sh [en-first|pt-br-first]

set -e

MODE=$1

if [ -z "$MODE" ]; then
  echo "❌ Erro: Modo não especificado"
  echo "Uso: ./scripts/set-mode.sh [en-first|pt-br-first]"
  echo ""
  echo "Modos disponíveis:"
  echo "  en-first    - Inglês é a fonte da verdade (padrão)"
  echo "  pt-br-first - Português é a fonte da verdade"
  exit 1
fi

if [ "$MODE" != "en-first" ] && [ "$MODE" != "pt-br-first" ]; then
  echo "❌ Erro: Modo inválido: $MODE"
  echo "Modos válidos: en-first, pt-br-first"
  exit 1
fi

# Atualizar o arquivo de configuração
cat > .github/mode.json << EOF
{
  "mode": "$MODE",
  "description": "Language mode configuration for the repository",
  "primary_language": "$([ "$MODE" = "en-first" ] && echo "en" || echo "pt-BR")",
  "secondary_language": "$([ "$MODE" = "en-first" ] && echo "pt-BR" || echo "en")",
  "source_of_truth": "$([ "$MODE" = "en-first" ] && echo "README.md" || echo "README.pt-BR.md")",
  "translation_file": "$([ "$MODE" = "en-first" ] && echo "README.pt-BR.md" || echo "README.md")",
  "modes": {
    "en-first": {
      "primary": "README.md",
      "secondary": "README.pt-BR.md",
      "description": "English is the source of truth, Portuguese is the translation"
    },
    "pt-br-first": {
      "primary": "README.pt-BR.md",
      "secondary": "README.md",
      "description": "Portuguese is the source of truth, English is the translation"
    }
  }
}
EOF

echo "✅ Modo configurado com sucesso: $MODE"
echo ""
if [ "$MODE" = "en-first" ]; then
  echo "📄 Fonte da verdade: README.md (Inglês)"
  echo "📄 Tradução: README.pt-BR.md (Português)"
else
  echo "📄 Fonte da verdade: README.pt-BR.md (Português)"
  echo "📄 Tradução: README.md (Inglês)"
fi
echo ""
echo "💡 Lembre-se de fazer commit das alterações:"
echo "   git add .github/mode.json"
echo "   git commit -m 'chore: Set language mode to $MODE'"
