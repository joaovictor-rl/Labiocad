export default function Sobre() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Sobre</span>
          <h1>Laboratório de Bioinformática e Computação de Alto Desempenho</h1>
        </div>
        <div className="about">
          <div className="about-text">
            <p>
              O grupo de pesquisa <strong>LaBioCAD</strong> foi fundado em 2016 e está localizado no Instituto de
              Ciências Exatas e Naturais (ICEN) da Universidade Federal do Pará, vinculado à Faculdade de Computação.
            </p>
            <p>
              O grupo reúne pesquisadores e estudantes de graduação, mestrado e doutorado. As pesquisas envolvem
              Computação de Alto Desempenho, Bioinformática e Computação Forense.
            </p>
            <p>
              <strong>Linhas de pesquisa:</strong> Computação de Alto Desempenho, Programação Paralela,
              Bioinformática, Biologia Computacional, Computação Forense e Inteligência Artificial.
            </p>
          </div>
          <aside className="facts">
            <dl>
              <div><dt>Fundação</dt><dd>2016</dd></div>
              <div><dt>Vínculo</dt><dd>Faculdade de Computação · ICEN · UFPA</dd></div>
              <div>
                <dt>Responsáveis</dt>
                <dd>
                  Prof. Dr. Josivaldo de Souza Araújo
                  <br />Profa. Dra. Regiane Silva Kawasaki Francês
                  <br />Prof. Dr. Vinícius Augusto Carvalho de Abreu
                </dd>
              </div>
              <div>
                <dt>Diretório de grupos</dt>
                <dd>
                  <a href="https://dgp.cnpq.br/dgp/espelhogrupo/8335164582156933" target="_blank" rel="noreferrer">
                    Espelho do grupo no CNPq ↗
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
