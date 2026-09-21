import { useState } from 'react';
import { ciclo } from '../content/site';
import { Revelar, Rotulo, Titulo } from './base';

export default function Ciclo() {
  const [ativa, setAtiva] = useState(0);
  const etapa = ciclo.etapas[ativa];
  const progresso = (ativa / (ciclo.etapas.length - 1)) * 100;

  return (
    <section id="ciclo" className="secao bg-white">
      <div className="limite">
        <div className="max-w-[720px]">
          <Revelar>
            <Rotulo n="03" texto={ciclo.eyebrow} />
          </Revelar>
          <Revelar atraso={80}>
            <Titulo linhas={ciclo.titulo} destaque={ciclo.destaque} />
          </Revelar>
          <Revelar atraso={150}>
            <p className="lead mt-6">{ciclo.lead}</p>
          </Revelar>
        </div>

        {/* A linha do ciclo: seis nós ligados pelo traço da marca */}
        <div className="mt-[clamp(44px,6vw,76px)]">
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-[26px] h-[3px] rounded-full bg-paper-2" aria-hidden="true" />
            <div
              className="absolute left-0 top-[26px] h-[3px] rounded-full transition-[width] duration-600"
              style={{ width: `${progresso}%`, background: 'linear-gradient(90deg,#6A5CFF,#4285FF 50%,#00C2A8)' }}
              aria-hidden="true"
            />
            <ul className="relative grid grid-cols-6 gap-3">
              {ciclo.etapas.map((e, i) => {
                const atual = i === ativa;
                const passada = i < ativa;
                return (
                  <li key={e.n}>
                    <button
                      type="button"
                      onClick={() => setAtiva(i)}
                      onMouseEnter={() => setAtiva(i)}
                      aria-pressed={atual}
                      className="group w-full text-left"
                    >
                      <span
                        className="flex h-[54px] w-[54px] items-center justify-center rounded-full font-mono text-[14px] font-bold transition-[background-color,color,transform] duration-400"
                        style={{
                          background: atual ? 'var(--color-ink)' : passada ? 'var(--color-iris)' : 'var(--color-paper-2)',
                          color: atual || passada ? '#fff' : 'var(--color-txt-3)',
                          transform: atual ? 'scale(1.06)' : 'none',
                        }}
                      >
                        {e.n}
                      </span>
                      <span
                        className="mt-4 block font-display text-[18px] font-bold tracking-[-0.02em] transition-colors duration-300"
                        style={{ color: atual ? 'var(--color-ink)' : 'var(--color-txt-3)' }}
                      >
                        {e.nome}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-txt-3">{e.resumo}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Painel de detalhe, desktop */}
          <div className="peca mt-10 hidden overflow-hidden md:block">
            <div className="grid md:grid-cols-[minmax(0,1fr)_260px]">
              <div className="p-[clamp(24px,2.6vw,40px)]">
                <p className="rotulo text-iris">Etapa {etapa.n}</p>
                <h3 className="mt-3 font-display text-[clamp(22px,2.4vw,32px)] font-bold tracking-[-0.025em]">{etapa.nome}</h3>
                <p key={etapa.n} className="lead revelar dentro mt-4 text-[17px]">
                  {etapa.detalhe}
                </p>
              </div>
              <div className="flex flex-col justify-center bg-paper-2 p-[clamp(24px,2.6vw,40px)]">
                <p className="rotulo text-txt-2">Substitui</p>
                <p className="mt-3 font-display text-[19px] font-bold leading-tight tracking-[-0.02em] text-ink">
                  {etapa.substitui}
                </p>
              </div>
            </div>
          </div>

          {/* Versão do celular: a jornada vira lista vertical, sem clique obrigatório */}
          <ol className="flex flex-col gap-3 md:hidden">
            {ciclo.etapas.map((e, i) => (
              <Revelar key={e.n} como="li" atraso={i * 60} className="peca p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#6A5CFF,#00C2A8)' }}
                  >
                    {e.n}
                  </span>
                  <h3 className="font-display text-[19px] font-bold tracking-[-0.02em]">{e.nome}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-txt-2">{e.detalhe}</p>
                <p className="mt-3 text-[13px] text-txt-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-iris">substitui</span>{' '}
                  {e.substitui}
                </p>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
