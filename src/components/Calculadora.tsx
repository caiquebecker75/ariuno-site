import { useMemo, useState } from 'react';
import { calculadora } from '../content/site';
import { custoRetrabalho, mensalidade } from '../lib/preco';
import { Botao, Revelar, Rotulo, Titulo } from './base';
import { brl, useContador, useRevelar } from '../hooks/uteis';

function Controle({
  rotulo,
  valor,
  min,
  max,
  passo,
  formato,
  aoMudar,
}: {
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  formato: (v: number) => string;
  aoMudar: (v: number) => void;
}) {
  const id = `controle-${rotulo.replace(/\s+/g, '-').toLowerCase()}`;
  const preenchido = ((valor - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium text-txt-2">
          {rotulo}
        </label>
        <output htmlFor={id} className="font-display text-[22px] font-bold tracking-[-0.02em] text-ink">
          {formato(valor)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="mt-3 h-[26px] w-full appearance-none bg-transparent"
        style={{ ['--preenchido' as string]: `${preenchido}%` }}
      />
    </div>
  );
}

export default function Calculadora() {
  const [pessoas, setPessoas] = useState(calculadora.padroes.pessoas);
  const [horasDia, setHorasDia] = useState(calculadora.padroes.horasDia);
  const [valorHora, setValorHora] = useState(calculadora.padroes.valorHora);
  const { ref, dentro } = useRevelar<HTMLDivElement>();

  const conta = useMemo(
    () => custoRetrabalho(pessoas, horasDia, valorHora, calculadora.padroes.diasUteis),
    [pessoas, horasDia, valorHora],
  );
  const plano = useMemo(() => mensalidade(pessoas), [pessoas]);
  const animado = useContador(conta.mes, dentro, 900);
  const proporcao = Math.max(3, Math.min(100, (plano.total / Math.max(conta.mes, 1)) * 100));

  return (
    <section className="secao bg-paper pt-0">
      <div className="limite" ref={ref}>
        <div className="peca overflow-hidden">
          <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
            <div className="p-[clamp(26px,3.4vw,52px)]">
              <Revelar>
                <Rotulo n="02" texto={calculadora.eyebrow} />
              </Revelar>
              <Revelar atraso={80}>
                <Titulo linhas={calculadora.titulo} destaque={calculadora.destaque} classe="titulo-3 sm:text-[clamp(26px,3.2vw,40px)]" />
              </Revelar>
              <Revelar atraso={140}>
                <p className="lead mt-5 text-[16px]">{calculadora.lead}</p>
              </Revelar>

              <div className="mt-9 flex flex-col gap-7">
                <Controle
                  rotulo="Pessoas no time"
                  valor={pessoas}
                  {...calculadora.limites.pessoas}
                  passo={calculadora.limites.pessoas.passo}
                  formato={(v) => `${v}`}
                  aoMudar={setPessoas}
                />
                <Controle
                  rotulo="Horas perdidas por dia, por pessoa"
                  valor={horasDia}
                  {...calculadora.limites.horasDia}
                  passo={calculadora.limites.horasDia.passo}
                  formato={(v) => (v < 1 ? `${v * 60} min` : `${String(v).replace('.', ',')} h`)}
                  aoMudar={setHorasDia}
                />
                <Controle
                  rotulo="Valor da hora do time"
                  valor={valorHora}
                  {...calculadora.limites.valorHora}
                  passo={calculadora.limites.valorHora.passo}
                  formato={(v) => brl(v)}
                  aoMudar={setValorHora}
                />
              </div>
              <p className="mt-7 text-[13px] leading-relaxed text-txt-3">{calculadora.nota}</p>
            </div>

            <div className="bg-ink escuro p-[clamp(26px,3.4vw,52px)]">
              <p className="rotulo text-white/55">Queimado por mês em retrabalho</p>
              <p className="mt-3 font-display text-[clamp(40px,6vw,76px)] font-extrabold leading-[0.96] tracking-[-0.04em] text-white">
                {brl(animado)}
              </p>
              <p className="mt-3 text-[15px] text-white/50">
                {brl(conta.ano)} por ano, com {pessoas} pessoas no time.
              </p>

              <div className="mt-10">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[14px] text-white/60">O retrabalho custa</span>
                  <span className="font-mono text-[15px] font-bold text-white">{brl(conta.mes)}</span>
                </div>
                <div className="mt-2 h-[14px] w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-full rounded-full" style={{ background: 'var(--color-alerta)' }} />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <span className="text-[14px] text-white/60">O Ariuno custa</span>
                  <span className="font-mono text-[15px] font-bold text-lime">{brl(plano.total)}</span>
                </div>
                <div className="mt-2 h-[14px] w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${proporcao}%`, background: 'var(--color-lime)' }}
                  />
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-white/50">
                  {pessoas} usuários na faixa de {brl(plano.porUsuario)} por pessoa ao mês.
                  {conta.mes > plano.total * 1.2 && (
                    <>
                      {' '}
                      A plataforma sai por{' '}
                      <strong className="font-bold text-white">
                        {(conta.mes / Math.max(plano.total, 1)).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}×
                      </strong>{' '}
                      menos do que o problema que ela resolve.
                    </>
                  )}
                </p>
              </div>

              <div className="mt-9">
                <Botao href="#investimento" tipo="claro">
                  Ver a tabela completa
                </Botao>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
