import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Equipe from './pages/Equipe';
import Home from './pages/Home';
import Pesquisa from './pages/Pesquisa';
import Publicacoes from './pages/Publicacoes';
import Sobre from './pages/Sobre';

// HashRouter funciona direto no GitHub Pages, sem configurar redirecionamento no servidor.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pesquisa" element={<Pesquisa />} />
          <Route path="publicacoes" element={<Publicacoes />} />
          <Route path="equipe" element={<Equipe />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
