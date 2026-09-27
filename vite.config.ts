import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' faz os arquivos gerados usarem caminhos relativos, então o site funciona
// em qualquer subpasta — inclusive no GitHub Pages (ex.: usuario.github.io/repositorio/).
export default defineConfig({
  plugins: [react()],
  base: './',
})
