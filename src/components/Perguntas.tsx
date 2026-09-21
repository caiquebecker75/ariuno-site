import { useState } from 'react';
import { perguntas } from '../content/site';
import { Revelar, Rotulo, Titulo } from './base';

export default function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="perguntas" className="secao bg-paper">
      <div className="limite">
        <div className="grid gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-[120px]">
            <Revelar>
              <Rotulo n="11" texto={perguntas.eyebrow} />
            </Revelar>
            <Revelar atraso={80}>
              <Titulo linhas={perguntas.titulo} destaque={perguntas.destaque} />
            </Revelar>
            <Revelar atraso={140}>
              <p className="lead mt-6">
                Se a sua dúvida não estiver aqui, mande no formulário logo abaixo. Quem responde é
                quem construiu a plataforma.
              </p>
            </Revelar>
          </div>

          <ul className="flex flex-col gap-[3px]">
            {perguntas.itens.map((item, i) => {
              const ativo = aberta === i;
              return (
                <Revelar key={item.p} como="li" atraso={i * 45}>
                  <div className="overflow-hidden rounded-[14px] bg-white">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={ativo}
                        aria-controls={`resposta-${i}`}
                        id={`pergunta-${i}`}
                        onClick={() => setAberta(ativo ? null : i)}
                        className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="font-display text-[17px] font-bold leading-snug tracking-[-0.02em]">{item.p}</span>
                        <span
                          className="mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-400"
                          style={{
                            background: ativo ? 'var(--color-iris)' : 'var(--color-paper-2)',
                            transform: ativo ? 'rotate(45deg)' : 'none',
                          }}
                          aria-hidden="true"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 5v14M5 12h14"
                              stroke={ativo ? '#fff' : 'var(--color-txt-2)'}
                              strokeWidth="2.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`resposta-${i}`}
                      role="region"
                      aria-labelledby={`pergunta-${i}`}
                      hidden={!ativo}
                      className="px-6 pb-6"
                    >
                      <p className="max-w-[62ch] text-[16px] leading-relaxed text-txt-2">{item.r}</p>
                    </div>
                  </div>
                </Revelar>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
