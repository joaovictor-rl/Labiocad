#!/usr/bin/env bash
# Sobe o site com um único comando: ./scripts/run.sh
# Na primeira vez instala as dependências; nas próximas só inicia.
set -e
cd "$(dirname "$0")/.."

command -v npm >/dev/null || { echo "npm não encontrado. Instale o Node.js 18+."; exit 1; }

[ -d node_modules ] || npm install
npm run dev
