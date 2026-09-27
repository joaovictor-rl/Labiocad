// Ícones simples em traço (sem preenchimento, sem clichê de mascote) para identificar
// cada linha de pesquisa nos cartões da Home — a cor vem do CSS var --area-color do cartão.
export default function AreaIcon({ tipo }: { tipo: 'Bioinformática' | 'HPC' }) {
  return (
    <span className="area-icon" aria-hidden="true">
      {tipo === 'Bioinformática' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M7.5 3c0 4.5 9 4.5 9 9s-9 4.5-9 9" />
          <path d="M16.5 3c0 4.5-9 4.5-9 9s9 4.5 9 9" />
          <path d="M8.4 7.2h7.2M8.4 16.8h7.2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <rect x="10" y="10" width="4" height="4" rx="0.5" />
          <path d="M9.5 3v2.3M12 3v2.3M14.5 3v2.3M9.5 18.7V21M12 18.7V21M14.5 18.7V21M3 9.5h2.3M3 12h2.3M3 14.5h2.3M18.7 9.5H21M18.7 12H21M18.7 14.5H21" />
        </svg>
      )}
    </span>
  );
}
