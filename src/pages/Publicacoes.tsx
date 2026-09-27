import { useMemo, useState } from 'react';
import { publicacoes } from '../data/publicacoes';
import type { TipoPublicacao } from '../types';

type Filtro = 'Todos' | TipoPublicacao;
const FILTROS: Filtro[] = ['Todos', 'Periódico', 'Anais de congresso'];

// remove acentos para a busca achar "genomica" em "Genômica"
const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Publicacoes() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('Todos');

  const lista = useMemo(() => {
    const termo = normalizar(busca);
    return publicacoes
      .filter((p) => filtro === 'Todos' || p.tipo === filtro)
      .filter((p) => normalizar(`${p.titulo} ${p.autores} ${p.veiculo}`).includes(termo))
      .sort((a, b) => b.ano - a.ano);
  }, [busca, filtro]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Publicações</span>
          <h1>Artigos e trabalhos</h1>
          <p className="lead">Produção do grupo em periódicos e anais de congressos.</p>
        </div>

        <div className="toolbar">
          <label htmlFor="busca" className="sr-only" style={{ position: 'absolute', left: -9999 }}>
            Buscar publicações
          </label>
          <input
            id="busca"
            className="search"
            type="search"
            placeholder="Buscar por título, autor ou revista"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="seg" role="group" aria-label="Filtrar por tipo">
            {FILTROS.map((f) => (
              <button key={f} aria-pressed={filtro === f} onClick={() => setFiltro(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <p className="mono" style={{ color: 'var(--faint)', fontSize: '0.8rem', marginBottom: 12 }}>
          {lista.length} de {publicacoes.length} resultados
        </p>

        <div className="pubs">
          {lista.map((p) => (
            <article className="pub" key={p.id}>
              {p.imagem && <img src={p.imagem} alt="" loading="lazy" />}
              <div className="pub-body">
                <div className="pub-meta">
                  <span>{p.ano}</span>·<span>{p.tipo}</span>·<span>{p.area}</span>
                </div>
                <h3>{p.titulo}</h3>
                <p className="venue">{p.veiculo}</p>
                <p className="authors">{p.autores}</p>
                {p.link && (
                  <a className="text-link" href={p.link} target="_blank" rel="noreferrer">
                    Ver publicação ↗
                  </a>
                )}
              </div>
            </article>
          ))}
          {lista.length === 0 && (
            <p className="empty">Nenhuma publicação encontrada. Tente outro termo ou limpe o filtro.</p>
          )}
        </div>
      </div>
    </section>
  );
}
