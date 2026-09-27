import { useEffect, useState } from 'react';
import { membros } from '../data/membros';
import type { Membro, Nivel } from '../types';

const GRUPOS: Nivel[] = ['Coordenação', 'Mestrado', 'Iniciação Científica', 'Orientação TCC'];

const iniciais = (nome: string) =>
  nome
    .replace(/^(Prof(a)?\.|Dr(a)?\.)\s*/g, '')
    .replace(/(Prof(a)?\.|Dr(a)?\.)\s*/g, '')
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

function Avatar({ membro }: { membro: Membro }) {
  const [erro, setErro] = useState(false);
  if (!membro.foto || erro) return <div className="avatar" aria-hidden="true">{iniciais(membro.nome)}</div>;
  return <img className="avatar" src={membro.foto} alt="" onError={() => setErro(true)} loading="lazy" />;
}

export default function Equipe() {
  const [aberto, setAberto] = useState<Membro | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Equipe</span>
          <h1>Quem faz o LaBioCAD</h1>
          <p className="lead">Clique em um nome para ver a trajetória e o currículo Lattes.</p>
        </div>

        {GRUPOS.map((grupo) => {
          const lista = membros.filter((m) => m.nivel === grupo);
          if (!lista.length) return null;
          return (
            <div className="team-group" key={grupo}>
              <h3>
                {grupo} <span className="count">{String(lista.length).padStart(2, '0')}</span>
              </h3>
              <div className="team">
                {lista.map((m) => (
                  <button className="member" key={m.id} onClick={() => setAberto(m)}>
                    <Avatar membro={m} />
                    <div>
                      <strong>{m.nome}</strong>
                      <span>{m.areas.slice(0, 2).join(' · ')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {aberto && (
        <div className="modal-backdrop" onClick={() => setAberto(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-nome" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <Avatar membro={aberto} />
              <div>
                <span className="eyebrow">{aberto.nivel}</span>
                <h2 id="modal-nome" style={{ fontSize: '1.4rem' }}>{aberto.nome}</h2>
              </div>
              <button className="close" onClick={() => setAberto(null)} aria-label="Fechar" autoFocus>
                ×
              </button>
            </div>
            <div className="chips">
              {aberto.areas.map((a) => <span className="chip" key={a}>{a}</span>)}
            </div>
            <p>{aberto.bio}</p>
            {aberto.lattes ? (
              <a className="btn" href={aberto.lattes} target="_blank" rel="noreferrer" style={{ justifySelf: 'start' }}>
                Currículo Lattes ↗
              </a>
            ) : (
              <span className="mono" style={{ color: 'var(--faint)', fontSize: '0.85rem' }}>Lattes pendente</span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
