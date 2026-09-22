import { useEffect, useRef, useState } from 'react';
import { hero, site } from '../content/site';
import { Botao, Print, Revelar, Selo, TituloCinema } from './base';
import { Icone } from './Icone';
import { useContador, useMovimentoReduzido, useRevelar, numero } from '../hooks/uteis';

function Prova({ valor, rotulo, ativo, atraso }: { valor: number; rotulo: string; ativo: boolean; atraso: number }) {
  const atual = useContador(valor, ativo, 1800);
  return (
    <Revelar atraso={atraso} className="flex items-baseline gap-3 sm:block">
      <span className="font-display text-[clamp(34px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.045em] text-white">
        {numero(atual)}
      </span>
      <span className="mt-2 block max-w-[22ch] text-[14px] leading-snug text-white/55">{rotulo}</span>
    </Revelar>
  );
}

export default function Hero() {
  const { ref, dentro } = useRevelar<HTMLDivElement>();
  const reduzido = useMovimentoReduzido();
  const palcoRef = useRef<HTMLDivElement>(null);
  const [desenhou, setDesenhou] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDesenhou(true), 140);
    return () => clearTimeout(t);
  }, []);

  // profundidade: o print, os cartões e o traço andam em velocidades diferentes
  useEffect(() => {
    const palco = palcoRef.current;
    if (!palco || reduzido) return;
    let quadro = 0;
    const aoRolar = () => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        const y = Math.min(scrollY, 1000);
        palco.querySelectorAll<HTMLElement>('[data-camada]').forEach((el) => {
          const fator = Number(el.dataset.camada);
          el.style.transform = `translate3d(0, ${y * fator}px, 0)`;
        });
        quadro = 0;
      });
    };
    aoRolar();
    addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      removeEventListener('scroll', aoRolar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [reduzido]);

  return (
    <section id="topo" className="escuro relative overflow-hidden bg-ink pb-[clamp(48px,5.4vw,80px)] pt-[clamp(104px,11vw,150px)]">
      {/* o traço da marca, desenhado em escala de página */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute -right-[14%] -top-[8%] h-[124%] w-[80%] opacity-[0.15] sm:opacity-[0.2]"
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
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 240,
            strokeDashoffset: desenhou || reduzido ? 0 : 240,
            transition: 'stroke-dashoffset 2.6s cubic-bezier(.16,1,.3,1) .25s',
          }}
        />
      </svg>

      <div className="limite relative" ref={ref}>
        <div ref={palcoRef} className="grid items-center gap-[clamp(38px,4.6vw,68px)] lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)]">
          <div data-camada="-0.03">
            <Revelar>
              <p className="rotulo mb-6 flex items-center gap-[10px] text-white/55">
                <span className="relative flex h-[8px] w-[8px]">
                  <span className="absolute inset-0 rounded-full bg-teal" />
                  {!reduzido && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-teal opacity-60" style={{ animationDuration: '2.4s' }} />
                  )}
                </span>
                {hero.eyebrow}
              </p>
            </Revelar>

            <TituloCinema
              como="h1"
              classe="titulo-1 text-white"
              linhas={hero.titulo}
              destaque={hero.destaque}
              gradiente
              claro
            />
            <span id="conteudo" className="sr-only">
              Conteúdo principal
            </span>

            <Revelar atraso={260}>
              <p className="lead mt-6 text-white/70">{hero.lead}</p>
            </Revelar>

            <Revelar atraso={340}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Botao href={hero.ctaPrimario.href} tipo="claro" icone="foguete" grande>
                  {hero.ctaPrimario.rotulo}
                </Botao>
                <Botao href={hero.ctaSecundario.href} tipo="contorno" icone="play">
                  {hero.ctaSecundario.rotulo}
                </Botao>
                {site.mostrarDemo && (
                  <Botao href={site.demoUrl} tipo="contorno" externo icone="link">
                    Abrir a demonstração
                  </Botao>
                )}
              </div>
            </Revelar>

            <Revelar atraso={420}>
              <div className="mt-6 flex flex-wrap gap-2">
                <Selo icone="escudo" claro>
                  Sem fidelidade
                </Selo>
                <Selo icone="pessoas" claro>
                  Cliente não paga assento
                </Selo>
                <Selo icone="relogio" claro>
                  Resposta em 1 dia útil
                </Selo>
              </div>
            </Revelar>
          </div>

          <div className="relative" data-camada="-0.07">
            <Revelar atraso={220}>
              <Print
                nome="kanban"
                alt="Quadro Kanban do Ariuno com tarefas de clientes, prazos e horas apontadas"
                url="ariuno.com.br · quadros"
                prioridade
                inclinar
              />
            </Revelar>

            {/* provas flutuantes: o timer que vira hora e o alerta de contrato */}
            <Revelar atraso={560}>
              <div className="peca absolute -bottom-8 -left-4 hidden w-[236px] p-4 sm:block lg:-left-14">
                <p className="rotulo flex items-center gap-2 text-txt-3">
                  <span className="text-iris"><Icone nome="cronometro" tamanho={15} /></span>
                  Timer na tarefa
                </p>
                <p className="mt-2 font-mono text-[23px] font-bold text-ink">02:34:00</p>
                <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-paper-2">
                  <div className="h-full rounded-full" style={{ width: '38%', background: 'linear-gradient(90deg,#6A5CFF,#00C2A8)' }} />
                </div>
                <p className="mt-2 text-[13px] text-txt-2">de 06:48:00 contratadas</p>
              </div>
            </Revelar>

            <Revelar atraso={720}>
              <div className="peca absolute -right-3 -top-7 hidden w-[224px] p-4 md:block lg:-right-10">
                <p className="rotulo flex items-center gap-2 text-txt-3">
                  <span className="text-alerta"><Icone nome="alerta" tamanho={15} /></span>
                  Alerta de contrato
                </p>
                <p className="mt-2 font-display text-[26px] font-extrabold tracking-[-0.03em] text-ink">119%</p>
                <p className="mt-1 text-[13px] leading-snug text-txt-2">consumido com 9 dias de mês pela frente</p>
              </div>
            </Revelar>
          </div>
        </div>

        {/* o que a plataforma faz, em uma linha de ícones */}
        <Revelar atraso={480}>
          <ul className="mt-[clamp(40px,5vw,70px)] grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
            {hero.pilulas.map((p) => (
              <li key={p.texto} className="flex items-center gap-[10px] text-[14px] leading-snug text-white/65">
                <span className="text-teal">
                  <Icone nome={p.icone} tamanho={19} />
                </span>
                {p.texto}
              </li>
            ))}
          </ul>
        </Revelar>

        <div className="mt-[clamp(36px,4.4vw,60px)] grid gap-7 sm:grid-cols-3">
          {hero.provas.map((p, i) => (
            <Prova key={p.rotulo} valor={p.valor} rotulo={p.rotulo} ativo={dentro} atraso={140 + i * 120} />
          ))}
        </div>

        <Revelar atraso={460}>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-white/55">{hero.provaFonte}</p>
            <a href="#operacao" className="flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white">
              role para ver a conta que ninguém faz
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10" style={reduzido ? undefined : { animation: 'pulsar 2.6s ease-in-out infinite' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
