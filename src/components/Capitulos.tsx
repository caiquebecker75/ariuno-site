import { useEffect, useState } from 'react';

const CAPITULOS = [
  { id: 'topo', nome: 'Abertura' },
  { id: 'operacao', nome: 'O problema' },
  { id: 'ciclo', nome: 'Como funciona' },
  { id: 'produto', nome: 'O produto' },
  { id: 'comparativo', nome: 'Comparativo' },
  { id: 'investimento', nome: 'Investimento' },
  { id: 'perguntas', nome: 'Perguntas' },
  { id: 'conversar', nome: 'Falar com a gente' },
];

/** Trilha de capítulos: mostra onde a pessoa está e leva para qualquer ponto. */
export default function Capitulos() {
  const [ativo, setAtivo] = useState('topo');

  useEffect(() => {
    const alvos = CAPITULOS.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Capítulos da página"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-[10px] xl:flex"
    >
      {CAPITULOS.map((c) => {
        const atual = ativo === c.id;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={atual ? 'true' : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className="rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {c.nome}
            </span>
            <span className="sr-only">{c.nome}</span>
            <span
              aria-hidden="true"
              className="block rounded-full transition-all duration-400"
              style={{
                width: atual ? 10 : 7,
                height: atual ? 10 : 7,
                background: atual ? 'var(--color-iris)' : 'var(--color-txt-3)',
                opacity: atual ? 1 : 0.42,
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
