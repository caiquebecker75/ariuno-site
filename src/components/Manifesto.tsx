import { useState } from 'react';
import { manifesto } from '../content/site';
import { Revelar, Rotulo, Titulo } from './base';

export default function Manifesto() {
  const [ativa, setAtiva] = useState(0);

  return (
    <section id="operacao" className="secao relative overflow-hidden bg-paper">
      <div className="limite">
        <div className="grid gap-[clamp(32px,4vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="01" texto={manifesto.eyebrow} />
            </Revelar>
            <Revelar atraso={80}>
              <Titulo linhas={manifesto.titulo} destaque={manifesto.destaque} classe="titulo-2" />
            </Revelar>
          </div>
          <Revelar atraso={160}>
            <p className="lead">{manifesto.lead}</p>
          </Revelar>
        </div>

        {/* As abas: cada informação da operação mora num lugar diferente */}
        <div className="mt-[clamp(38px,5vw,64px)]">
          <ul className="flex flex-col gap-[6px] md:flex-row md:items-end md:gap-2">
            {manifesto.abas.map((aba, i) => {
              const selecionada = ativa === i;
              return (
                <Revelar
                  key={aba.onde}
                  como="li"
                  atraso={i * 70}
                  className="md:flex-1"
                  style={{ ['--atraso' as string]: `${i * 70}ms` }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setAtiva(i)}
                    onFocus={() => setAtiva(i)}
                    onClick={() => setAtiva(i)}
                    aria-pressed={selecionada}
                    className="w-full rounded-[14px] px-5 text-left transition-[background-color,padding,transform] duration-400"
                    style={{
                      background: selecionada ? 'var(--color-ink)' : 'var(--color-paper-2)',
                      color: selecionada ? '#fff' : 'var(--color-txt-2)',
                      paddingBlock: selecionada ? 26 : 18,
                      transform: selecionada ? 'translateY(-6px)' : 'none',
                    }}
                  >
                    <span className="rotulo block text-[10px] opacity-60">aba {String(i + 1).padStart(2, '0')}</span>
                    <span className="mt-[6px] block font-display text-[19px] font-bold tracking-[-0.02em]">{aba.onde}</span>
                    <span
                      className="block overflow-hidden text-[13px] leading-snug transition-[max-height,opacity] duration-400"
                      style={{ maxHeight: selecionada ? 60 : 0, opacity: selecionada ? 0.7 : 0 }}
                    >
                      {aba.o}
                    </span>
                  </button>
                </Revelar>
              );
            })}
          </ul>

          <Revelar atraso={220}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span
                className="inline-flex items-center gap-[10px] rounded-full bg-lime px-5 py-3 font-display text-[17px] font-bold tracking-[-0.02em] text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" stroke="#0B0D1E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {manifesto.fecho}
              </span>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
