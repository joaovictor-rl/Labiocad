import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Logo from './Logo';

const LINKS = [
  { to: '/', label: 'Início' },
  { to: '/pesquisa', label: 'Pesquisa' },
  { to: '/publicacoes', label: 'Publicações' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/sobre', label: 'Sobre' },
];

export default function Layout() {
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();

  // fecha o menu e volta ao topo quando muda de página
  useEffect(() => {
    setAberto(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="edge-bar edge-bar-l" aria-hidden="true" />
      <div className="edge-bar edge-bar-r" aria-hidden="true" />

      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="LaBioCAD, página inicial">
            <Logo />
            <small>UFPA</small>
          </Link>
          <button className="menu-btn" aria-expanded={aberto} aria-controls="nav" onClick={() => setAberto(!aberto)}>
            Menu
          </button>
          <nav id="nav" className={`nav ${aberto ? 'open' : ''}`}>
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main key={pathname} className="page">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <p className="footer-tagline">
            Ciência aberta,
            <br />
            feita na Amazônia.
          </p>
        </div>
        <div className="container footer-inner">
          <div>
            <strong>LaBioCAD</strong> · Laboratório de Bioinformática e Computação de Alto Desempenho
            <br />
            Faculdade de Computação · ICEN · Universidade Federal do Pará
          </div>
          <div className="mono">
            Belém, PA · desde 2016
            <br />
            <a href="https://dgp.cnpq.br/dgp/espelhogrupo/8335164582156933" target="_blank" rel="noreferrer">
              Grupo no CNPq ↗
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
