import { useEffect, useState } from 'react';
import { membros } from '../data/membros';
import { projetos, publicacoes } from '../data/publicacoes';
import type { Membro, Projeto, Publicacao } from '../types';

// Endereço da API. Por padrão usa o proxy do Vite (/api, configurado em vite.config.ts),
// que já aponta para a API local — não é preciso criar nenhum .env.
// Para apontar para outro endereço (ex.: uma API publicada), defina VITE_API_URL.
const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';

const fallback = {
  '/membros': membros,
  '/publicacoes': publicacoes,
  '/projetos': projetos,
};

type Rota = keyof typeof fallback;
type Resposta<R extends Rota> = (typeof fallback)[R];

async function buscar<R extends Rota>(rota: R): Promise<Resposta<R>> {
  try {
    const res = await fetch(`${API_URL}${rota}`, { signal: AbortSignal.timeout(2500) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dados = (await res.json()) as Resposta<R>;
    // Banco vazio (primeira execução antes do seed, ou API ainda sem dados): usa os dados locais.
    if (Array.isArray(dados) && dados.length === 0) throw new Error('resposta vazia');
    return dados;
  } catch (erro) {
    console.warn(`API indisponível em ${rota}, usando dados locais.`, erro);
    return fallback[rota];
  }
}

/** Hook genérico: começa com os dados locais e troca pelos da API quando chegam. */
function useRecurso<R extends Rota>(rota: R): Resposta<R> {
  const [dados, setDados] = useState<Resposta<R>>(fallback[rota]);
  useEffect(() => {
    let ativo = true;
    buscar(rota).then((d) => ativo && setDados(d));
    return () => {
      ativo = false;
    };
  }, [rota]);
  return dados;
}

export const useMembros = (): Membro[] => useRecurso('/membros');
export const usePublicacoes = (): Publicacao[] => useRecurso('/publicacoes');
export const useProjetos = (): Projeto[] => useRecurso('/projetos');
