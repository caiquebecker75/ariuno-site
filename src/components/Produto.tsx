import { useEffect, useRef, useState } from 'react';
import { funcionalidades, funcionalidadesExtras } from '../content/site';
import { Print, Revelar, Rotulo, Titulo } from './base';
import { useMovimentoReduzido, useRevelar, urlPublica } from '../hooks/uteis';

const INTERVALO = 5200;

export default function Produto() {
  const [ativa, setAtiva] = useState(0);
  const [assumiu, setAssumiu] = useState(false);
  const { ref, dentro } = useRevelar<HTMLDivElement>();
  const reduzido = useMovimentoReduzido();
  const listaRef = useRef<HTMLDivElement>(null);

  // pré-carrega os prints para a troca ser instantânea
  useEffect(() => {
    if (!dentro) return;
    funcionalidades.forEach((f) => {
      const img = new Image();
      img.src = urlPublica(`produto/${f.print}.webp`);
    });
  }, [dentro]);

  // roda sozinho até alguém assumir o controle
  useEffect(() => {
    if (!dentro || assumiu || reduzido) return;
    const t = setInterval(() => setAtiva((v) => (v + 1) % funcionalidades.length), INTERVALO);
    return () => clearInterval(t);
  }, [dentro, assumiu, reduzido]);

  const escolher = (i: number) => {
    setAtiva(i);
    setAssumiu(true);
  };

  const navegarTeclado = (e: React.KeyboardEvent) => {
    const total = funcionalidades.length;
    let proxima: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') proxima = (ativa + 1) % total;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') proxima = (ativa - 1 + total) % total;
    if (e.key === 'Home') proxima = 0;
    if (e.key === 'End') proxima = total - 1;
    if (proxima === null) return;
    e.preventDefault();
    escolher(proxima);
    listaRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[proxima]?.focus();
  };

  const atual = funcionalidades[ativa];

  return (
    <section id="produto" className="secao escuro bg-ink" ref={ref}>
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="04" texto="O produto por dentro" claro />
            </Revelar>
            <Revelar atraso={80}>
              <Titulo linhas={['Dez funcionalidades.', 'Dez coisas que', 'param de doer.']} destaque="param de doer." claro />
            </Revelar>
          </div>
          <Revelar atraso={150}>
            <p className="lead">
              Cada tela abaixo é a plataforma rodando. Clique em uma funcionalidade para ver o que ela
              resolve e o retorno que ela deixa na operação.
            </p>
          </Revelar>
        </div>

        <div className="mt-[clamp(36px,4.6vw,64px)] grid gap-[clamp(20px,2.4vw,40px)] lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="min-w-0">
            <div
              ref={listaRef}
              role="tablist"
              aria-label="Funcionalidades do Ariuno"
              aria-orientation="vertical"
              onKeyDown={navegarTeclado}
              className="flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-[3px] lg:overflow-visible lg:pb-0"
            >
              {funcionalidades.map((f, i) => {
                const sel = i === ativa;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    id={`aba-${f.id}`}
                    aria-selected={sel}
                    aria-controls="painel-produto"
                    tabIndex={sel ? 0 : -1}
                    onClick={() => escolher(i)}
                    className="relative shrink-0 snap-start overflow-hidden rounded-[12px] px-4 py-[13px] text-left text-[15px] font-medium transition-[background-color,color] duration-300 lg:w-full"
                    style={{
                      background: sel ? 'rgb(255 255 255 / 0.1)' : 'transparent',
                      color: sel ? '#fff' : 'rgb(255 255 255 / 0.52)',
                    }}
                  >
                    <span className="flex items-center gap-3 whitespace-nowrap lg:whitespace-normal">
                      <span
                        className="h-[7px] w-[7px] shrink-0 rounded-full transition-colors duration-300"
                        style={{ background: sel ? 'var(--color-teal)' : 'rgb(255 255 255 / 0.22)' }}
                      />
                      {f.nome}
                    </span>
                    {sel && !assumiu && !reduzido && (
                      <span
                        key={`barra-${f.id}`}
                        className="absolute bottom-0 left-0 h-[2px] bg-teal"
                        style={{ animation: `preencher ${INTERVALO}ms linear forwards` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-5 hidden text-[13px] leading-relaxed text-white/55 lg:block">{funcionalidadesExtras}</p>
          </div>

          <div id="painel-produto" className="min-w-0" role="tabpanel" aria-labelledby={`aba-${atual.id}`}>
            <Print key={atual.id} nome={atual.print} alt={atual.alt} url={atual.url} />
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <p key={`d-${atual.id}`} className="max-w-[54ch] text-[17px] leading-relaxed text-white/75">
                {atual.descricao}
              </p>
              <p
                key={`r-${atual.id}`}
                className="inline-flex shrink-0 flex-col gap-1 rounded-[14px] bg-lime px-5 py-4 text-ink sm:max-w-[290px]"
              >
                <span className="rotulo text-[10px] opacity-60">O retorno</span>
                <span className="font-display text-[16px] font-bold leading-snug tracking-[-0.02em]">{atual.retorno}</span>
              </p>
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-white/55 lg:hidden">{funcionalidadesExtras}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
