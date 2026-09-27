import { projetos } from '../data/publicacoes';
import { COR_AREA } from '../utils/areaColor';

const LINHAS = [
  'Computação de Alto Desempenho',
  'Programação Paralela',
  'Bioinformática',
  'Biologia Computacional',
  'Computação Forense',
  'Inteligência Artificial',
];

export default function Pesquisa() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pesquisa</span>
          <h1>Linhas e projetos</h1>
          <p className="lead">
            Do genoma da Mycobacterium leprae ao cupuaçu, passando por otimização de algoritmos em
            arquiteturas paralelas.
          </p>
          <div className="chips">
            {LINHAS.map((l) => <span className="chip" key={l}>{l}</span>)}
          </div>
        </div>

        <h2 style={{ marginBottom: 20 }}>Projetos</h2>
        <ul className="projects">
          {projetos.map((p) => (
            <li key={p.id}>
              <span className="area-label">
                <span className="dot" style={{ background: COR_AREA[p.area] }} />
                {p.area}
              </span>
              <span>{p.titulo}</span>
              <span className="code-pill">{`LB-${String(p.id).padStart(3, '0')}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
