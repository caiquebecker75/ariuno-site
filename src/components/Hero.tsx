import { useEffect, useRef, useState } from 'react';
import { hero, site } from '../content/site';
import { Botao, Print, Revelar } from './base';
import { useContador, useMovimentoReduzido, useRevelar, numero } from '../hooks/uteis';

function Prova({ valor, rotulo, ativo, atraso }: { valor: number; rotulo: string; ativo: boolean; atraso: number }) {
  const atual = useContador(valor, ativo, 1600);
  return (
    <Revelar atraso={atraso} className="flex items-baseline gap-3 sm:block">
      <span className="font-display text-[clamp(34px,4.4vw,52px)] font-extrabold leading-none tracking-[-0.04em] text-white">
        {numero(atual)}
      </span>
      <span className="mt-2 block text-[14px] leading-snug text-white/55">{rotulo}</span>
    </Revelar>
  );
}

export default function Hero() {
  const { ref, dentro } = useRevelar<HTMLDivElement>();
  const reduzido = useMovimentoReduzido();
  const printRef = useRef<HTMLDivElement>(null);
  const [desenhou, setDesenhou] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDesenhou(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = printRef.current;
    if (!el || reduzido) return;
    let quadro = 0;
    const aoRolar = () => {
      quadro = requestAnimationFrame(() => {
        const y = Math.min(scrollY, 900);
        el.style.transform = `translate3d(0, ${y * -0.06}px, 0) rotate(${-1.4 + y * 0.0012}deg)`;
      });
    };
    aoRolar();
    addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      removeEventListener('scroll', aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, [reduzido]);

  return (
    <section id="topo" className="relative overflow-hidden bg-ink escuro pb-[clamp(56px,7vw,96px)] pt-[clamp(120px,14vw,190px)]">
      {/* O traço da marca desenhado em escala de página: o elemento gráfico do Ariuno */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute -right-[12%] -top-[6%] h-[120%] w-[78%] opacity-[0.14] sm:opacity-[0.18]"
      >
        <defs>
          <linearGradient id="traco-hero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A5CFF" />
            <stop offset="45%" stopColor="#4285FF" />
            <stop offset="100%" stopColor="#00C2A8" />
          </linearGradient>
        </defs>
        <path
          d="M25,80 C10,80 15,55 30,55 C42,55 45,68 40,80 L75,15 L95,75"
          stroke="url(#traco-hero)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 240,
            strokeDashoffset: desenhou || reduzido ? 0 : 240,
            transition: 'stroke-dashoffset 2.4s cubic-bezier(.22,1,.36,1) .2s',
          }}
        />
      </svg>

      <div className="limite relative" ref={ref}>
        <div className="grid items-center gap-[clamp(40px,5vw,72px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
          <div>
            <Revelar>
              <p className="rotulo mb-6 flex items-center gap-[10px] text-white/55">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-teal" />
                {hero.eyebrow}
              </p>
            </Revelar>

            <Revelar atraso={90}>
              <h1 className="titulo-1 text-white" id="conteudo">
                {hero.titulo.map((linha) => (
                  <span key={linha} className="block">
                    {linha === hero.destaque ? (
                      <span className="relative inline-block">
                        <span
                          style={{
                            background: 'linear-gradient(96deg, #8E82FF, #4285FF 46%, #00C2A8)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {linha}
                        </span>
                      </span>
                    ) : (
                      linha
                    )}
                  </span>
                ))}
              </h1>
            </Revelar>

            <Revelar atraso={170}>
              <p className="lead mt-7 text-white/70">{hero.lead}</p>
            </Revelar>

            <Revelar atraso={250}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Botao href={hero.ctaPrimario.href} tipo="claro">
                  {hero.ctaPrimario.rotulo}
                </Botao>
                <Botao href={hero.ctaSecundario.href} tipo="contorno">
                  {hero.ctaSecundario.rotulo}
                </Botao>
                {site.mostrarDemo && (
                  <Botao href={site.demoUrl} tipo="contorno" externo>
                    Abrir a demonstração
                  </Botao>
                )}
              </div>
            </Revelar>
          </div>

          <div ref={printRef} className="relative will-change-transform" style={{ transform: 'rotate(-1.4deg)' }}>
            <Revelar atraso={200}>
              <Print
                nome="kanban"
                alt="Quadro Kanban do Ariuno com tarefas de clientes, prazos e horas apontadas"
                url="ariuno.com.br · quadros"
                prioridade
              />
            </Revelar>

            {/* Prova de produto flutuante: o timer que vira hora faturável */}
            <Revelar atraso={520}>
              <div className="peca absolute -bottom-7 -left-4 hidden w-[240px] p-4 sm:block lg:-left-12">
                <p className="rotulo text-txt-3">Timer na tarefa</p>
                <p className="mt-2 font-mono text-[22px] font-bold text-ink">02:34:00</p>
                <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-paper-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '38%', background: 'linear-gradient(90deg,#6A5CFF,#00C2A8)' }}
                  />
                </div>
                <p className="mt-2 text-[13px] text-txt-2">de 06:48:00 contratadas</p>
              </div>
            </Revelar>
          </div>
        </div>

        {/* Faixa de pílulas do produto */}
        <Revelar atraso={330}>
          <ul className="mt-[clamp(44px,6vw,80px)] flex flex-wrap gap-x-7 gap-y-3">
            {hero.pilulas.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[14px] text-white/55">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" stroke="#00C2A8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </Revelar>

        {/* Números reais da operação */}
        <div className="mt-[clamp(34px,4vw,56px)] grid gap-7 sm:grid-cols-3">
          {hero.provas.map((p, i) => (
            <Prova key={p.rotulo} valor={p.valor} rotulo={p.rotulo} ativo={dentro} atraso={120 + i * 110} />
          ))}
        </div>
        <Revelar atraso={400}>
          <p className="mt-5 text-[13px] text-white/55">{hero.provaFonte}</p>
        </Revelar>
      </div>
    </section>
  );
}
