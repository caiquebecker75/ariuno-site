import { useMemo, useState } from 'react';
import { investimento } from '../content/site';
import { faixaDe, mensalidade } from '../lib/preco';
import { Botao, Revelar, Rotulo, Titulo } from './base';
import { brl } from '../hooks/uteis';

const MAIOR = investimento.faixas[0].preco;

export default function Investimento() {
  const [usuarios, setUsuarios] = useState(30);
  const plano = useMemo(() => mensalidade(usuarios), [usuarios]);
  const faixaAtual = faixaDe(usuarios);
  const anual = plano.total * 12 * 0.85;

  return (
    <section id="investimento" className="secao bg-paper">
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="09" texto={investimento.eyebrow} />
            </Revelar>
            <Revelar atraso={80}>
              <Titulo linhas={investimento.titulo} destaque={investimento.destaque} />
            </Revelar>
          </div>
          <Revelar atraso={140}>
            <p className="lead">{investimento.lead}</p>
          </Revelar>
        </div>

        {/* Simulador: arraste o tamanho do time e veja a conta */}
        <Revelar atraso={160}>
          <div className="peca mt-10 overflow-hidden">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]">
              <div className="p-[clamp(24px,3vw,46px)]">
                <label htmlFor="usuarios" className="rotulo text-txt-3">
                  Tamanho do time
                </label>
                <div className="mt-3 flex items-baseline gap-3">
                  <output htmlFor="usuarios" className="font-display text-[clamp(44px,6vw,72px)] font-extrabold leading-none tracking-[-0.04em]">
                    {usuarios}
                  </output>
                  <span className="text-[17px] text-txt-2">usuários</span>
                </div>
                <input
                  id="usuarios"
                  type="range"
                  min={5}
                  max={200}
                  step={1}
                  value={usuarios}
                  onChange={(e) => setUsuarios(Number(e.target.value))}
                  className="mt-6 h-[26px] w-full appearance-none bg-transparent"
                  style={{ ['--preenchido' as string]: `${((usuarios - 5) / 195) * 100}%` }}
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-txt-3">
                  <span>5</span>
                  <span>200+</span>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                  <div>
                    <p className="rotulo text-txt-3">Por usuário</p>
                    <p className="mt-2 font-display text-[28px] font-bold tracking-[-0.03em]">
                      {faixaAtual.sobConsulta ? 'sob consulta' : brl(plano.porUsuario)}
                    </p>
                  </div>
                  <div>
                    <p className="rotulo text-txt-3">Por mês</p>
                    <p className="mt-2 font-display text-[28px] font-bold tracking-[-0.03em] text-iris">{brl(plano.total)}</p>
                  </div>
                  <div>
                    <p className="rotulo text-txt-3">Anual à vista</p>
                    <p className="mt-2 font-display text-[28px] font-bold tracking-[-0.03em]">{brl(anual)}</p>
                  </div>
                </div>
                {faixaAtual.sobConsulta && (
                  <p className="mt-5 text-[14px] text-txt-2">
                    Acima de 150 usuários o valor é fechado na proposta, a partir de {brl(54)} por usuário.
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-between gap-6 bg-ink escuro p-[clamp(24px,3vw,46px)]">
                <div>
                  <p className="rotulo text-white/55">Já está incluído</p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {['Todos os módulos, sem plano trancado', 'Usuários cliente ilimitados e gratuitos', 'Suporte em português com quem construiu'].map(
                      (t) => (
                        <li key={t} className="flex items-start gap-3 text-[15px] leading-snug text-white/75">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden="true">
                            <path d="M4 12.5l5 5L20 6.5" stroke="#00C2A8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {t}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <Botao href="#conversar" tipo="claro">
                  Fazer uma proposta para {usuarios} usuários
                </Botao>
              </div>
            </div>
          </div>
        </Revelar>

        {/* A escada de preço: quanto mais gente, menor o valor por pessoa */}
        <div className="mt-[clamp(38px,4.4vw,64px)]">
          <ul className="grid gap-[3px] sm:grid-cols-2 lg:grid-cols-6">
            {investimento.faixas.map((f, i) => {
              const dentroDaFaixa = usuarios >= f.de && usuarios <= f.ate;
              const altura = 28 + (f.preco / MAIOR) * 62;
              return (
                <Revelar key={f.rotulo} como="li" atraso={i * 60}>
                  <div
                    className="flex h-full flex-col justify-end rounded-[14px] p-5 transition-[background-color] duration-400"
                    style={{
                      background: dentroDaFaixa ? 'var(--color-ink)' : 'var(--color-paper-2)',
                      color: dentroDaFaixa ? '#fff' : 'var(--color-txt)',
                    }}
                  >
                    <div
                      className="mb-4 max-h-[26px] w-[62px] rounded-[5px] transition-[height] duration-500 lg:max-h-none"
                      style={{
                        height: altura,
                        background: dentroDaFaixa ? 'linear-gradient(180deg,#8E82FF,#00C2A8)' : 'rgb(106 92 255 / 0.22)',
                      }}
                      aria-hidden="true"
                    />
                    <p className="font-display text-[26px] font-extrabold tracking-[-0.03em]">
                      {f.sobConsulta ? `${brl(f.preco)}+` : brl(f.preco)}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug" style={{ opacity: 0.66 }}>
                      {f.rotulo}
                    </p>
                    {f.selo && (
                      <p className="mt-3 inline-block rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
                        {f.selo}
                      </p>
                    )}
                  </div>
                </Revelar>
              );
            })}
          </ul>
        </div>

        <div className="mt-[3px] grid gap-[3px] sm:grid-cols-2 lg:grid-cols-3">
          {investimento.condicoes.map((c, i) => (
            <Revelar key={c.titulo} atraso={i * 50} className="rounded-[14px] bg-white p-5">
              <p className="font-display text-[17px] font-bold tracking-[-0.02em]">{c.titulo}</p>
              <p className="mt-1 text-[15px] leading-snug text-txt-2">{c.texto}</p>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
