import type { Projeto } from '../types';

// Mesmo mapa de cor usado na linha FASTA do topo da Home: reaproveitar essas cores para
// identificar áreas de pesquisa em vez de números (01, 02…) ou ícones genéricos mantém
// um único sistema visual coerente pelo site inteiro.
export const COR_AREA: Record<Projeto['area'], string> = {
  Bioinformática: 'var(--base-a)',
  HPC: 'var(--base-c)',
  'Computação Forense': 'var(--base-t)',
  Sistemas: 'var(--base-g)',
  Educação: 'var(--muted)',
};
