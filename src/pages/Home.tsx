import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import BioArt from '../components/BioArt';
import AreaIcon from '../components/AreaIcon';
import { COR_AREA } from '../utils/areaColor';
import { membros } from '../data/membros';
import { projetos, publicacoes } from '../data/publicacoes';

const AREAS = [
  {
    nome: 'Bioinformática' as const,
    titulo: 'Bioinformática',
    texto:
      'Área interdisciplinar que combina biologia, ciência da computação e matemática para analisar, ' +
      'interpretar e gerenciar dados biológicos em larga escala, especialmente genômicos e moleculares.',
    chips: ['Genômica comparativa', 'Metagenômica', 'Transcriptômica', 'Redes de regulação gênica'],
  },
  {
    nome: 'HPC' as const,
    titulo: 'Computação de Alto Desempenho',
    texto:
      'Também chamada de supercomputação, usa um conjunto de computadores para processar tarefas ' +
      'complexas que levariam tempo demais ou exigiriam poder demais de uma única máquina.',
    chips: ['Programação paralela', 'Multicore e manycore', 'Sistemas distribuídos', 'Computação forense'],
  },
];

export default function Home() {
  const recentes = [...publicacoes].sort((a, b) => b.ano - a.ano).slice(0, 3);

  const fatos = [
    ['fundado em', '2016'],
    ['membros', String(membros.length)],
    ['projetos', String(projetos.length)],
    ['publicações', String(publicacoes.length)],
  ];

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="fasta" aria-hidden="true">
            &gt;LaBioCAD|ICEN|UFPA|2016 <b style={{ color: 'var(--base-a)' }}>ATG</b>
            <b style={{ color: 'var(--base-c)' }}>CGT</b>
            <b style={{ color: 'var(--base-g)' }}>ACC</b>
            <b style={{ color: 'var(--base-t)' }}>GAT</b>
          </p>
          <h1 className="hero-title">
            Bioinformática
            <br />
            de alto desempenho
          </h1>

          <div className="hero-art">
            <BioArt />
            <p className="hero-art-caption">
              Genomas geram volumes enormes de dados — processá-los exige paralelismo.
            </p>
          </div>

          <div className="hero-foot">
            <p className="lead">
              Laboratório da Faculdade de Computação da UFPA que une genômica, biologia computacional e
              processamento paralelo para analisar dados biológicos em larga escala.
            </p>
            <dl className="facts-inline">
              {fatos.map(([rotulo, valor]) => (
                <div key={rotulo}>
                  <dt>{rotulo}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
            <div className="actions">
              <Link className="btn primary" to="/pesquisa">Conheça as pesquisas</Link>
              <Link className="text-link" to="/publicacoes">Ver publicações →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Linhas de pesquisa</span>
            <h2>Duas áreas que se alimentam</h2>
            <p className="lead">Genomas geram volumes enormes de dados. Processá-los exige paralelismo.</p>
          </div>
          <div className="areas">
            {AREAS.map((area) => (
              <article
                className="area"
                key={area.nome}
                style={{ ['--area-color' as string]: COR_AREA[area.nome] }}
              >
                <AreaIcon tipo={area.nome} />
                <h3>{area.titulo}</h3>
                <p>{area.texto}</p>
                <div className="chips">
                  {area.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Painel</span>
            <h2>O laboratório em dados</h2>
          </div>
          <Dashboard publicacoes={publicacoes} membros={membros} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Mais recentes</span>
            <h2>Publicações</h2>
          </div>
          <div className="pubs">
            {recentes.map((p) => (
              <article className="pub" key={p.id}>
                {p.imagem && <img src={p.imagem} alt="" loading="lazy" />}
                <div className="pub-body">
                  <div className="pub-meta"><span>{p.ano}</span>·<span>{p.tipo}</span></div>
                  <h3>{p.titulo}</h3>
                  <p className="venue">{p.veiculo}</p>
                  {p.link && (
                    <a className="text-link" href={p.link} target="_blank" rel="noreferrer">
                      Ver publicação ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="actions" style={{ marginTop: 24 }}>
            <Link className="text-link" to="/publicacoes">Todas as publicações →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
