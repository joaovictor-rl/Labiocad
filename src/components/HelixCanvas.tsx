import { useEffect, useRef } from 'react';

// Trecho de sequência usado para colorir os pares de base da hélice.
const SEQUENCIA = 'ATGCGTACCGATTGCAAGTCCGATAGCTTACGGATCCATG';
const PAR: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };

function corDaBase(base: string): string {
  const css = getComputedStyle(document.documentElement);
  return css.getPropertyValue(`--base-${base.toLowerCase()}`).trim() || '#888';
}

/** Dupla hélice de DNA girando lentamente, desenhada em canvas. */
export default function HelixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cores = Object.fromEntries(['A', 'T', 'C', 'G'].map((b) => [b, corDaBase(b)]));
    const estiloRaiz = getComputedStyle(document.documentElement);
    const linha = estiloRaiz.getPropertyValue('--line').trim();
    const no = estiloRaiz.getPropertyValue('--node').trim() || '#16241c';
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let raf = 0;

    const desenhar = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas;
      if (canvas.width !== w * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const vertical = w < h * 1.2; // no celular a hélice fica deitada
      const comprimento = vertical ? h : w;
      const largura = vertical ? w : h;
      const passos = SEQUENCIA.length;
      const amplitude = Math.min(largura * 0.3, 120);
      const fase = frame * 0.012;

      for (let i = 0; i < passos; i++) {
        const t = i / (passos - 1);
        const pos = 16 + t * (comprimento - 32);
        const ang = t * Math.PI * 3 + fase;
        const a1 = Math.sin(ang) * amplitude;
        const a2 = Math.sin(ang + Math.PI) * amplitude;
        const profundidade = (Math.cos(ang) + 1) / 2; // 0 = atrás, 1 = na frente
        const centro = largura / 2;

        const p = (off: number): [number, number] => (vertical ? [centro + off, pos] : [pos, centro + off]);
        const [x1, y1] = p(a1);
        const [x2, y2] = p(a2);
        const base = SEQUENCIA[i];

        // degrau (par de bases) com as duas metades coloridas
        const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.25 + profundidade * 0.6;
        ctx.strokeStyle = cores[base];
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(mx, my); ctx.stroke();
        ctx.strokeStyle = cores[PAR[base]];
        ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(x2, y2); ctx.stroke();

        // nós das duas fitas
        ctx.globalAlpha = 1;
        const r1 = 2.5 + profundidade * 2.5;
        const r2 = 2.5 + (1 - profundidade) * 2.5;
        ctx.fillStyle = linha;
        ctx.beginPath(); ctx.arc(x2, y2, r2 + 1, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = no;
        ctx.globalAlpha = 0.35 + (1 - profundidade) * 0.5;
        ctx.beginPath(); ctx.arc(x2, y2, r2, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.35 + profundidade * 0.65;
        ctx.beginPath(); ctx.arc(x1, y1, r1, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame++;
      if (!reduzirMovimento) raf = requestAnimationFrame(desenhar);
    };

    desenhar();
    const aoRedimensionar = () => reduzirMovimento && desenhar();
    window.addEventListener('resize', aoRedimensionar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, []);

  return <canvas ref={ref} aria-label="Ilustração animada de uma dupla hélice de DNA" role="img" />;
}
