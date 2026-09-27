// Ilustração estática (sem animação, sem canvas/JS) inspirada em imagens de microscopia —
// células em cultura vistas de perto — usada como arte de destaque do herói.
// Coordenadas fixas: mesma imagem em toda visita, nada gerado em tempo real.
const CELULAS = [
  { cx: 78, cy: 66, r: 46 }, { cx: 182, cy: 44, r: 30 }, { cx: 246, cy: 92, r: 38 },
  { cx: 320, cy: 58, r: 26 }, { cx: 60, cy: 168, r: 34 }, { cx: 150, cy: 142, r: 22 },
  { cx: 224, cy: 178, r: 44 }, { cx: 312, cy: 152, r: 30 }, { cx: 372, cy: 100, r: 22 },
  { cx: 30, cy: 254, r: 26 }, { cx: 118, cy: 232, r: 40 }, { cx: 200, cy: 262, r: 24 },
  { cx: 270, cy: 236, r: 32 }, { cx: 344, cy: 224, r: 40 }, { cx: 88, cy: 320, r: 30 },
  { cx: 172, cy: 336, r: 44 }, { cx: 252, cy: 312, r: 26 }, { cx: 326, cy: 336, r: 32 },
  { cx: 20, cy: 90, r: 18 }, { cx: 380, cy: 300, r: 20 }, { cx: 10, cy: 340, r: 16 },
  { cx: 210, cy: 40, r: 16 }, { cx: 290, cy: 290, r: 18 },
];

export default function BioArt() {
  return (
    <svg
      className="bio-art"
      viewBox="0 0 400 380"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Ilustração de células em cultura, em estilo de microscopia"
    >
      <defs>
        <radialGradient id="bioFundo" cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </radialGradient>
      </defs>
      <rect width="400" height="380" fill="url(#bioFundo)" />
      {CELULAS.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="var(--accent-ink)" opacity={0.08 + (i % 4) * 0.03} />
      ))}
      {CELULAS.filter((_, i) => i % 2 === 0).map((c, i) => (
        <circle
          key={`anel-${i}`}
          cx={c.cx}
          cy={c.cy}
          r={c.r * 0.62}
          fill="none"
          stroke="var(--accent-ink)"
          strokeWidth="1.2"
          opacity="0.22"
        />
      ))}
    </svg>
  );
}
