import { useState } from 'react';
import { ciclo } from '../content/site';
import { Botao, Print, Revelar, Rotulo, TituloCinema } from './base';
import { Icone } from './Icone';
import { useMedia, useMovimentoReduzido, useProgressoRolagem } from '../hooks/uteis';

const TOTAL = ciclo.etapas.length;

/** Cena presa na tela: a pessoa rola e o ciclo avança etapa por etapa. */
function CenaCiclo() {
  const { ref, progresso } = useProgressoRolagem<HTMLDivElement>();
  const indice = Math.min(TOTAL - 1, Math.floor(progresso * TOTAL * 0.999));
  const etapa = ciclo.etapas[indice];

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${TOTAL * 78 + 60}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="limite w-full">
          <div className="grid items-center gap-[clamp(32px,4vw,72px)] lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.18fr)]">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-[13px] font-bold tracking-[0.12em] text-iris-d">
                  {etapa.n} / {String(TOTAL).padStart(2, '0')}
                </span>
                <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper-2">
                  <span
                    className="block h-full rounded-full transition-[width] duration-300"
                    style={{
                      width: `${((indice + 1) / TOTAL) * 100}%`,
                      background: 'linear-gradient(90deg,#6A5CFF,#4285FF 50%,#00C2A8)',
                    }}
                  />
                </span>
              </div>

              <ol className="flex flex-col gap-[2px]">
                {ciclo.etapas.map((e, i) => {
                  const atual = i === indice;
                  const passou = i < indice;
                  return (
                    <li key={e.n}>
                      <div
                        className="flex items-start gap-4 rounded-[14px] px-4 transition-[background-color,padding] duration-500"
                        style={{
                          background: atual ? 'var(--color-ink)' : 'transparent',
                          paddingBlock: atual ? 18 : 10,
                        }}
                      >
                        <span
                          className="mt-[2px] flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color] duration-500"
                          style={{
                            background: atual ? 'var(--color-lime)' : passou ? 'var(--color-iris)' : 'var(--color-paper-2)',
                            color: atual ? 'var(--color-ink)' : passou ? '#fff' : 'var(--color-txt-3)',
                          }}
                        >
                          <Icone nome={e.icone} tamanho={18} />
                        </span>
                        <div className="min-w-0">
                          <p
                            className="font-display text-[19px] font-bold tracking-[-0.025em] transition-colors duration-500"
                            style={{ color: atual ? '#fff' : passou ? 'var(--color-ink)' : 'var(--color-txt-3)' }}
                          >
                            {e.nome}
                          </p>
                          <div
                            className="overflow-hidden transition-[max-height,opacity] duration-500"
                            style={{ maxHeight: atual ? 130 : 0, opacity: atual ? 1 : 0, visibility: atual ? 'visible' : 'hidden' }}
                            aria-hidden={!atual}
                          >
                            <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-white/70">{e.detalhe}</p>
                            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-[6px] text-[12px] text-white/70">
                              <span className="text-lime"><Icone nome="check" tamanho={13} /></span>
                              substitui {e.substitui}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="relative">
              {ciclo.etapas.map((e, i) => (
                <div
                  key={e.n}
                  className="transition-[opacity,transform] duration-600"
                  style={{
                    position: i === 0 ? 'relative' : 'absolute',
                    inset: i === 0 ? undefined : 0,
                    opacity: i === indice ? 1 : 0,
                    transform: i === indice ? 'none' : 'scale(.985) translateY(14px)',
                    pointerEvents: i === indice ? 'auto' : 'none',
                  }}
                  aria-hidden={i !== indice}
                >
                  <Print nome={e.print} alt={`${e.nome} no Ariuno`} url={`ariuno.com.br · ${e.nome.toLowerCase()}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Versão empilhada: celular, tablet e quem pediu menos movimento. */
function ListaCiclo() {
  const [aberta, setAberta] = useState(0);
  return (
    <div className="limite lg:hidden">
      <ol className="flex flex-col gap-[3px]">
        {ciclo.etapas.map((e, i) => {
          const ativa = aberta === i;
          return (
            <Revelar key={e.n} como="li" atraso={i * 55}>
              <button
                type="button"
                onClick={() => setAberta(i)}
                aria-expanded={ativa}
                className="peca block w-full p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ background: ativa ? 'var(--color-ink)' : 'var(--color-paper-2)', color: ativa ? 'var(--color-lime)' : 'var(--color-iris)' }}
                  >
                    <Icone nome={e.icone} tamanho={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] tracking-[0.12em] text-txt-3">{e.n}</span>
                    <span className="block font-display text-[19px] font-bold tracking-[-0.02em]">{e.nome}</span>
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-txt-2">{ativa ? e.detalhe : e.resumo}</p>
                {ativa && (
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-paper-2 px-3 py-[6px] text-[12px] text-txt-2">
                    <span className="text-iris"><Icone nome="check" tamanho={13} /></span>
                    substitui {e.substitui}
                  </span>
                )}
              </button>
            </Revelar>
          );
        })}
      </ol>
      <div className="mt-6">
        <Print nome={ciclo.etapas[aberta].print} alt={`${ciclo.etapas[aberta].nome} no Ariuno`} url={`ariuno.com.br · ${ciclo.etapas[aberta].nome.toLowerCase()}`} />
      </div>
    </div>
  );
}

export default function Ciclo() {
  const reduzido = useMovimentoReduzido();
  const grande = useMedia('(min-width: 1024px)');

  return (
    <section id="ciclo" className="secao bg-white">
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="03" texto={ciclo.eyebrow} />
            </Revelar>
            <TituloCinema linhas={ciclo.titulo} destaque={ciclo.destaque} />
          </div>
          <Revelar atraso={150}>
            <p className="lead">{ciclo.lead}</p>
          </Revelar>
        </div>
      </div>

      <div className="mt-[clamp(38px,5vw,64px)]">
        {grande && !reduzido ? <CenaCiclo /> : <ListaCiclo />}
      </div>

      <div className="limite mt-[clamp(34px,4vw,56px)] flex flex-wrap items-center gap-4">
        <Botao href="#conversar" icone="foguete">
          Quero esse ciclo rodando na minha empresa
        </Botao>
        <span className="text-[14px] text-txt-2">Go-live entre o dia 15 e o dia 21.</span>
      </div>
    </section>
  );
}
