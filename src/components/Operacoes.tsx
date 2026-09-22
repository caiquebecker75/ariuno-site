import { useState } from 'react';
import { operacoes } from '../content/site';
import { Botao, Revelar, Rotulo, TituloCinema } from './base';
import { Icone } from './Icone';

export default function Operacoes() {
  const [ativa, setAtiva] = useState(0);
  const op = operacoes.itens[ativa];

  return (
    <section className="secao overflow-hidden bg-paper">
      <div className="limite">
        <div className="max-w-[760px]">
          <Revelar>
            <Rotulo n="07" texto={operacoes.eyebrow} />
          </Revelar>
          <TituloCinema linhas={operacoes.titulo} destaque={operacoes.destaque} />
        </div>

        <Revelar atraso={140}>
          <div role="tablist" aria-label="Tipos de operação" className="mt-10 flex flex-wrap gap-2">
            {operacoes.itens.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === ativa}
                aria-controls="painel-operacao"
                id={`aba-op-${item.id}`}
                tabIndex={i === ativa ? 0 : -1}
                onClick={() => setAtiva(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') setAtiva((ativa + 1) % operacoes.itens.length);
                  if (e.key === 'ArrowLeft') setAtiva((ativa - 1 + operacoes.itens.length) % operacoes.itens.length);
                }}
                className="flex items-center gap-[10px] rounded-full px-5 py-[11px] text-[15px] font-medium transition-[background-color,color] duration-300"
                style={{
                  background: i === ativa ? 'var(--color-ink)' : 'var(--color-paper-2)',
                  color: i === ativa ? '#fff' : 'var(--color-txt-2)',
                }}
              >
                <span style={{ color: i === ativa ? 'var(--color-lime)' : 'var(--color-iris)' }}>
                  <Icone nome={item.icone} tamanho={18} />
                </span>
                {item.nome}
              </button>
            ))}
          </div>
        </Revelar>

        <Revelar atraso={180}>
          <div id="painel-operacao" role="tabpanel" aria-labelledby={`aba-op-${op.id}`} className="peca mt-4 overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
              <div className="p-[clamp(24px,3vw,46px)]">
                <h3 className="flex items-center gap-3 font-display text-[clamp(24px,2.8vw,36px)] font-bold tracking-[-0.03em]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-paper-2 text-iris">
                    <Icone nome={op.icone} tamanho={24} />
                  </span>
                  {op.nome}
                </h3>
                <p key={op.id} className="lead mt-4 text-[17px]">
                  {op.texto}
                </p>

                {/* O fluxo daquela operação, em três passos ligados */}
                <ol className="mt-8 flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-0">
                  {op.passos.map((passo, i) => (
                    <li key={passo} className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:items-start sm:gap-2">
                      <span className="flex items-center gap-3 sm:w-full">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-bold text-white"
                          style={{ background: i === 2 ? 'var(--color-teal)' : 'var(--color-iris)' }}
                        >
                          {i + 1}
                        </span>
                        {i < op.passos.length - 1 && (
                          <span className="hidden h-[2px] flex-1 rounded-full bg-paper-2 sm:block" aria-hidden="true" />
                        )}
                      </span>
                      <span className="block py-2 pr-4 text-[15px] font-medium leading-snug sm:py-0">{passo}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col justify-center bg-ink p-[clamp(24px,3vw,46px)]">
                <p className="rotulo flex items-center gap-2 text-white/55">
                  <span className="text-lime"><Icone nome="grafico" tamanho={15} /></span>
                  O retorno
                </p>
                <p className="mt-4 font-display text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.15] tracking-[-0.025em] text-white">
                  {op.retorno}
                </p>
                <div className="mt-6">
                  <Botao href="#conversar" tipo="claro">
                    Ver isso na minha operação
                  </Botao>
                </div>
              </div>
            </div>
          </div>
        </Revelar>
      </div>

      {/* Faixa com as áreas que usam a mesma plataforma */}
      <div className="relative mt-[clamp(40px,5vw,72px)] overflow-hidden bg-ink py-5">
        <div
          className="flex w-max gap-10 whitespace-nowrap"
          style={{ animation: 'desliza 38s linear infinite' }}
          aria-hidden="true"
        >
          {[...operacoes.areas, ...operacoes.areas].map((area, i) => (
            <span key={`${area}-${i}`} className="flex items-center gap-10 font-display text-[19px] font-bold tracking-[-0.02em] text-white/70">
              {area}
              <span className="h-[6px] w-[6px] rounded-full bg-teal" />
            </span>
          ))}
        </div>
        <p className="sr-only">Áreas que usam a mesma plataforma: {operacoes.areas.join(', ')}.</p>
      </div>
    </section>
  );
}
