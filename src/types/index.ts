export type Nivel = 'Coordenação' | 'Mestrado' | 'Iniciação Científica' | 'Orientação TCC';

export interface Membro {
  id: number;
  nome: string;
  nivel: Nivel;
  bio: string;
  lattes?: string;
  foto?: string;
  areas: string[];
}

export type TipoPublicacao = 'Periódico' | 'Anais de congresso';

export interface Publicacao {
  id: number;
  titulo: string;
  autores: string;
  veiculo: string;
  ano: number;
  tipo: TipoPublicacao;
  area: 'Bioinformática' | 'HPC' | 'Educação';
  imagem?: string;
  link?: string;
}

export interface Projeto {
  id: number;
  titulo: string;
  area: 'Bioinformática' | 'HPC' | 'Computação Forense' | 'Sistemas' | 'Educação';
}

export interface Estatisticas {
  fundacao: number;
  membros: number;
  publicacoes: number;
  projetos: number;
}
