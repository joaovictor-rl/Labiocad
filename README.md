# LaBioCAD

Site do **Laboratório de Bioinformática e Computação de Alto Desempenho** (UFPA), reconstruído
em React + TypeScript a partir do site original do grupo.

> **Projeto pessoal, sem vínculo oficial com a UFPA ou o LaBioCAD.** Este repositório é um
> exercício de front-end feito para portfólio: recria, com tecnologia própria, o conteúdo público
> já disponível no site do laboratório. Não é mantido, hospedado ou endossado pela universidade
> ou pelo grupo de pesquisa: é trabalho independente de [João Victor R. Lisboa](https://github.com/joaovictor-rl).

**Site no ar:** https://joaovictor-rl.github.io/Labiocad/

![Página inicial do site](docs/preview.png)

## Sobre o projeto

O LaBioCAD já tem um site oficial, mas estático e desatualizado. Como exercício de front-end,
reconstruí o mesmo conteúdo (equipe, publicações, projetos de pesquisa) como uma aplicação React,
organizada em componentes reutilizáveis e com os dados centralizados em um único lugar
(`src/data/`).

**Stack:** React 19 · TypeScript · Vite · React Router · Recharts

## Como rodar

Pré-requisito: **Node.js 18+**.

```bash
./scripts/run.sh          # Linux / Mac
scripts\run.bat           # Windows (duplo clique ou pelo terminal)
```

Na primeira vez o script instala as dependências; nas próximas só inicia. Abra o endereço
`Local` que aparecer (normalmente http://localhost:5173). `Ctrl+C` encerra.

Sem os scripts, o equivalente manual é:

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  pages/       as 5 páginas do site (Início, Pesquisa, Publicações, Equipe, Sobre)
  components/  layout (cabeçalho/rodapé com o logotipo), ilustração do herói, painel de gráficos
  data/        dados do laboratório (equipe, publicações, projetos), fonte única do site inteiro
  index.css    estilos, com a paleta de cores em variáveis CSS no :root
scripts/       run.sh / run.bat, sobem o site com um único comando
docs/          imagens usadas neste README
```

Os demais arquivos (`package.json`, `vite.config.ts`, os `tsconfig*.json`, `index.html`,
`.gitignore`) precisam ficar soltos na raiz do projeto: é ali que npm, Vite, TypeScript e o git
esperam encontrá-los por padrão. Movê-los exigiria configuração extra em cada ferramenta, sem
ganho real.

## Decisões técnicas

- **Sem back-end:** o projeto tinha uma API em FastAPI, mas optei por remover para poder hospedar
  o site inteiro, de graça, no GitHub Pages, que só serve arquivos estáticos. Os dados (equipe,
  publicações, projetos) viraram arquivos TypeScript em `src/data/`, importados direto pelas
  páginas, sem precisar de servidor ou banco de dados para um site deste tamanho.
- **`HashRouter`** (em vez do `BrowserRouter` padrão): gera URLs com `/#/pesquisa`, que funcionam
  em qualquer hospedagem de arquivos estáticos (incluindo o GitHub Pages) sem precisar configurar
  redirecionamento de rotas no servidor.
- **`base: './'`** no `vite.config.ts`: faz o build gerar caminhos relativos para os arquivos,
  então o site funciona tanto na raiz de um domínio quanto em uma subpasta (como
  `usuario.github.io/repositorio/`).

## Publicação (GitHub Pages)

O `npm run build` gera a pasta `dist/` com o site pronto (HTML, CSS e JS estáticos). Este
repositório usa duas branches:

- `main`: código-fonte (este branch)
- `gh-pages`: só o conteúdo de `dist/`, é o que o GitHub Pages publica

Para atualizar o site depois de uma mudança: `npm run build`, depois `git add`, `commit` e
`push` da pasta `dist/` para o branch `gh-pages`.

---

João Victor R. Lisboa · Sistemas de Informação, UFPA · [github.com/joaovictor-rl](https://github.com/joaovictor-rl)
