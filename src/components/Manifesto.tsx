import { useState } from 'react';
import { manifesto } from '../content/site';
import { Botao, Revelar, Rotulo, TituloCinema } from './base';
import { Icone, type NomeIcone } from './Icone';
import { urlPublica } from '../hooks/uteis';

const ICONES: NomeIcone[] = ['whatsapp', 'grafico', 'email', 'camadas', 'formulario', 'busca'];

/** Antes e depois arrastável: 14 abas de um lado, uma plataforma do outro. */
function Comparador() {
  const [corte, setCorte] = useState(52);

  return (
    <div className="relative select-none overflow-hidden rounded-[18px] bg-paper-2" style={{ aspectRatio: '16 / 10' }}>
      {/* antes: a operação espalhada */}
      <div className="absolute inset-0 p-[clamp(14px,2.4vw,30px)]">
        <p className="rotulo mb-3 flex items-center gap-2 text-alerta-d">
          <Icone nome="abas" tamanho={15} /> antes
        </p>
        <div className="grid h-[82%] grid-cols-2 content-start gap-[clamp(6px,1vw,12px)] sm:grid-cols-3">
          {manifesto.abas.map((aba, i) => (
            <div
              key={aba.onde}
              className="rounded-[10px] bg-white p-[clamp(8px,1vw,14px)] shadow-[0_2px_10px_-6px_rgb(11_13_30/0.4)]"
              style={{ transform: `rotate(${(i % 3) - 1}deg)` }}
            >
              <span className="flex items-center gap-2 text-txt-3">
                <Icone nome={ICONES[i]} tamanho={15} />
                <span className="font-mono text-[9px] uppercase tracking-[0.1em]">aba {String(i + 1).padStart(2, '0')}</span>
              </span>
              <p className="mt-1 font-display text-[clamp(12px,1.2vw,16px)] font-bold tracking-[-0.02em]">{aba.onde}</p>
              <p className="mt-[2px] hidden text-[11px] leading-tight text-txt-3 sm:block">{aba.o}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-2 text-[clamp(11px,1.1vw,14px)] font-medium text-alerta-d">
          <Icone nome="alerta" tamanho={15} /> ninguém sabe onde está a informação
        </p>
      </div>

      {/* depois: uma plataforma só */}
      <div className="absolute inset-0 bg-ink" style={{ clipPath: `inset(0 0 0 ${corte}%)` }}>
        <p className="rotulo absolute right-[clamp(14px,2.4vw,30px)] top-[clamp(14px,2.4vw,30px)] flex items-center gap-2 text-lime">
          <Icone nome="raio" tamanho={15} /> depois, no Ariuno
        </p>
        <img
          src={urlPublica('produto/visao-geral.webp')}
          alt="Painel de visão geral do Ariuno com a operação inteira em um lugar"
          className="absolute bottom-[8%] right-[4%] w-[78%] rounded-[10px] shadow-[0_24px_60px_-28px_rgb(0_0_0/0.8)]"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* haste do comparador */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${corte}%` }}>
        <span className="absolute inset-y-0 -left-[1px] w-[2px] bg-lime" />
        <span className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-ink shadow-[0_6px_20px_-6px_rgb(11_13_30/0.6)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <label className="sr-only" htmlFor="comparador">
        Arraste para comparar a operação espalhada com a operação dentro do Ariuno
      </label>
      <input
        id="comparador"
        type="range"
        min={8}
        max={92}
        value={corte}
        onChange={(e) => setCorte(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export default function Manifesto() {
  return (
    <section id="operacao" className="secao relative overflow-hidden bg-paper">
      <div className="limite">
        <div className="grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="01" texto={manifesto.eyebrow} />
            </Revelar>
            <TituloCinema linhas={manifesto.titulo} destaque={manifesto.destaque} />
          </div>
          <Revelar atraso={160}>
            <p className="lead">{manifesto.lead}</p>
          </Revelar>
        </div>

        <Revelar atraso={120}>
          <div className="mt-[clamp(32px,4.4vw,60px)] grid gap-[clamp(20px,2.6vw,44px)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center">
            <Comparador />

            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-txt-3">
                <Icone nome="seta" tamanho={15} /> arraste a barra verde
              </p>
              <p className="mt-4 font-display text-[clamp(22px,2.4vw,32px)] font-bold leading-tight tracking-[-0.03em]">
                De seis lugares para <span className="text-iris">um só</span>.
              </p>
              <p className="lead mt-4 text-[16px]">
                O briefing, o prazo, a aprovação, o arquivo, a hora e o histórico param de morar
                em ferramentas diferentes. Tudo passa a acontecer dentro da tarefa, e o histórico
                deixa de depender de alguém lembrar.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Botao href="#produto" icone="play">
                  Ver o produto rodando
                </Botao>
                <span className="text-[14px] text-txt-2">10 telas reais, em 40 segundos.</span>
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
