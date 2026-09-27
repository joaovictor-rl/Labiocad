# LaBioCAD · site em React + TypeScript

Site do Laboratório de Bioinformática e Computação de Alto Desempenho (UFPA).

**Stack:** React 19 · TypeScript · Vite · React Router · Recharts

## Como rodar

Pré-requisito: **Node.js 18+**.

```bash
./run.sh          # Linux / Mac
run.bat           # Windows (duplo clique ou pelo terminal)
```

Na primeira vez o script instala as dependências; nas próximas só inicia. Abra o endereço
`Local` que aparecer (normalmente http://localhost:5173). `Ctrl+C` encerra.

Sem os scripts, o equivalente manual é:

```bash
npm install
npm run dev
```

## Estrutura

- `src/pages/`: as 5 páginas do site (Início, Pesquisa, Publicações, Equipe, Sobre)
- `src/components/`: layout (cabeçalho/rodapé com o logotipo), ilustração do herói e painel de gráficos
- `src/data/`: os dados do laboratório (equipe, publicações, projetos) — fonte única usada por todas as páginas
- `src/index.css`: estilos do site, com a paleta de cores em variáveis CSS no `:root`

## Publicação (GitHub Pages)

O site é 100% estático (sem back-end): o build gerado por `npm run build` (pasta `dist/`)
pode ser hospedado em qualquer serviço de arquivos estáticos. Este repositório usa
duas branches:

- `main`: código-fonte (este branch)
- `gh-pages`: apenas o conteúdo de `dist/`, publicado pelo GitHub Pages

As rotas usam `HashRouter` (endereços com `/#/`), por isso funcionam direto no GitHub
Pages sem precisar configurar redirecionamento no servidor.
