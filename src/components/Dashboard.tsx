import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Membro, Nivel, Publicacao, TipoPublicacao } from '../types';

const TIPOS: { tipo: TipoPublicacao; cor: string }[] = [
  { tipo: 'Periódico', cor: 'var(--series-1)' },
  { tipo: 'Anais de congresso', cor: 'var(--series-2)' },
];
const NIVEIS: Nivel[] = ['Coordenação', 'Mestrado', 'Iniciação Científica', 'Orientação TCC'];

interface DicaProps {
  active?: boolean;
  label?: string | number;
  payload?: { name: string; value: number }[];
}

function Dica({ active, label, payload }: DicaProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip">
      <b>{label}</b>
      {payload.map((p) => (
        <div className="row" key={p.name}>
          <span>{p.name}</span>
          <span>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

const eixo = { fill: 'var(--muted)', fontSize: 12 };

export default function Dashboard({ publicacoes, membros }: { publicacoes: Publicacao[]; membros: Membro[] }) {
  const [tabela, setTabela] = useState(false);

  // publicações agrupadas por ano, com uma coluna por tipo
  const porAno = useMemo(() => {
    const anos = [...new Set(publicacoes.map((p) => p.ano))].sort();
    const inicio = Math.min(...anos);
    const fim = Math.max(...anos);
    return Array.from({ length: fim - inicio + 1 }, (_, i) => {
      const ano = inicio + i;
      const linha: Record<string, number | string> = { ano: String(ano) };
      TIPOS.forEach(({ tipo }) => {
        linha[tipo] = publicacoes.filter((p) => p.ano === ano && p.tipo === tipo).length;
      });
      return linha;
    });
  }, [publicacoes]);

  const porNivel = useMemo(
    () => NIVEIS.map((nivel) => ({ nivel, Pessoas: membros.filter((m) => m.nivel === nivel).length })),
    [membros],
  );

  return (
    <div className="dash">
      <section className="panel" aria-labelledby="g1">
        <div className="panel-head">
          <div>
            <h3 id="g1">Publicações por ano</h3>
            <p>Artigos em periódicos e trabalhos em anais</p>
          </div>
          <div className="legend">
            {TIPOS.map((t) => (
              <span key={t.tipo}>
                <i style={{ background: t.cor }} />
                {t.tipo}
              </span>
            ))}
          </div>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={porAno} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke="var(--line)" />
              <XAxis dataKey="ano" tick={eixo} axisLine={{ stroke: 'var(--line)' }} tickLine={false} />
              <YAxis allowDecimals={false} tick={eixo} axisLine={false} tickLine={false} />
              <Tooltip content={<Dica />} cursor={{ fill: 'var(--surface-2)' }} />
              {TIPOS.map((t, i) => (
                <Bar
                  key={t.tipo}
                  dataKey={t.tipo}
                  stackId="pub"
                  fill={t.cor}
                  stroke="var(--surface)"
                  strokeWidth={2}
                  radius={i === TIPOS.length - 1 ? [4, 4, 0, 0] : 0}
                  maxBarSize={48}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel" aria-labelledby="g2">
        <div className="panel-head">
          <div>
            <h3 id="g2">Equipe por nível</h3>
            <p>Pesquisadores e estudantes vinculados</p>
          </div>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={porNivel} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="var(--line)" />
              <XAxis type="number" allowDecimals={false} tick={eixo} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="nivel" width={128} tick={eixo} axisLine={false} tickLine={false} />
              <Tooltip content={<Dica />} cursor={{ fill: 'var(--surface-2)' }} />
              <Bar dataKey="Pessoas" fill="var(--series-1)" radius={[0, 4, 4, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <button className="table-toggle" onClick={() => setTabela(!tabela)} aria-expanded={tabela}>
        {tabela ? 'Ocultar tabela' : 'Ver dados em tabela'}
      </button>
      {tabela && (
        <div className="panel" style={{ gridColumn: '1 / -1', overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Ano</th>
                {TIPOS.map((t) => <th key={t.tipo}>{t.tipo}</th>)}
              </tr>
            </thead>
            <tbody>
              {porAno.map((l) => (
                <tr key={l.ano}>
                  <td>{l.ano}</td>
                  {TIPOS.map((t) => <td key={t.tipo}>{l[t.tipo]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
