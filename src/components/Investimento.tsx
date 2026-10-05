import { useMemo, useState } from 'react';
import { investimento } from '../content/site';
import { faixaDe, mensalidade, type Ciclo } from '../lib/preco';
import { Botao, Revelar, Rotulo, Selo, TituloCinema } from './base';
import { Icone, type NomeIcone } from './Icone';

const ICONES_CONDICAO: NomeIcone[] = ['pessoas', 'camadas', 'etiqueta', 'foguete', 'escudo', 'check'];
import { brl } from '../hooks/uteis';

const MAIOR = investimento.faixas[0].prazo;

export default function Investimento() {
  const [usuarios, setUsuarios] = useState(10);
  const [ciclo, setCiclo] = useState<Ciclo>('prazo');
  const plano = useMemo(() => mensalidade(usuarios, ciclo), [usuarios, ciclo]);
  const faixaAtual = faixaDe(usuarios);

  return (
    <section id="investimento" className="secao bg-paper">
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="09" texto={investimento.eyebrow} />
            </Revelar>
            <TituloCinema linhas={investimento.titulo} destaque={investimento.destaque} />
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
                  min={1}
                  max={200}
                  step={1}
                  value={usuarios}
                  onChange={(e) => setUsuarios(Number(e.target.value))}
                  className="mt-6 h-[26px] w-full appearance-none bg-transparent"
                  style={{ ['--preenchido' as string]: `${((usuarios - 1) / 199) * 100}%` }}
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-txt-3">
                  <span>1</span>
                  <span>200+</span>
                </div>

                {/* Com prazo sai mais barato; no mensal não há fidelidade */}
                <div className="mt-7 inline-flex rounded-[12px] bg-paper p-[4px]" role="group" aria-label="Como contratar">
                  {investimento.modalidades.map((m) => {
                    const ativo = ciclo === m.chave;
                    return (
                      <button
                        key={m.chave}
                        type="button"
                        onClick={() => setCiclo(m.chave as Ciclo)}
                        aria-pressed={ativo}
                        className="rounded-[9px] px-4 py-[10px] text-left transition-colors duration-300"
                        style={{ background: ativo ? 'var(--color-ink)' : 'transparent', color: ativo ? '#fff' : 'var(--color-txt-2)' }}
                      >
                        <span className="block font-display text-[15px] font-bold tracking-[-0.02em]">{m.rotulo}</span>
                        <span className="mt-[2px] block font-mono text-[10px] uppercase tracking-[0.1em]" style={{ opacity: 0.62 }}>
                          {m.nota}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                  <div>
                    <p className="rotulo text-txt-3">Por usuário</p>
                    <p className="mt-2 font-display text-[28px] font-bold tracking-[-0.03em]">{brl(plano.porUsuario)}</p>
                  </div>
                  <div>
                    <p className="rotulo text-txt-3">Por mês</p>
                    <p className="mt-2 font-display text-[28px] font-bold tracking-[-0.03em] text-iris">{brl(plano.total)}</p>
                  </div>
                  <div>
                    <p className="rotulo text-txt-3">{ciclo === 'prazo' ? 'Economia por mês' : 'Com prazo ficaria'}</p>
                    <p className="mt-2 font-display text-[28px] font-bold tracking-[-0.03em]">
                      {ciclo === 'prazo' ? brl(plano.economiaMes) : brl(plano.totalOutro)}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-[14px] text-txt-2">
                  {ciclo === 'prazo'
                    ? `Faixa ${faixaAtual.rotulo}: ${brl(faixaAtual.prazo)} por usuário com prazo de 6 meses ou mais. No mensal, ${brl(faixaAtual.mensal)}.`
                    : `Faixa ${faixaAtual.rotulo}: ${brl(faixaAtual.mensal)} por usuário sem fidelidade. Fechando 6 meses ou mais, ${brl(faixaAtual.prazo)}.`}
                </p>
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
                <div className="flex flex-col gap-3">
                  <Botao href="#conversar" tipo="claro" icone="etiqueta" grande>
                    Quero a proposta para {usuarios} usuários
                  </Botao>
                  <div className="flex flex-wrap gap-2">
                    <Selo icone="escudo" claro>{ciclo === 'prazo' ? 'Prazo de 6 meses' : 'Sem fidelidade'}</Selo>
                    <Selo icone="relogio" claro>Resposta em 1 dia útil</Selo>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Revelar>

        {/* A escada de preço: quanto mais gente, menor o valor por pessoa */}
        <div className="mt-[clamp(38px,4.4vw,64px)]">
          <ul className="grid gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
            {investimento.faixas.map((f, i) => {
              const dentroDaFaixa = usuarios >= f.de && usuarios <= f.ate;
              const altura = 26 + (f.prazo / MAIOR) * 92;
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
                      className="mb-4 max-h-[26px] w-[30px] rounded-[4px] transition-[height] duration-500 lg:max-h-none"
                      style={{
                        height: altura,
                        background: dentroDaFaixa ? 'linear-gradient(180deg,#8E82FF,#00C2A8)' : 'rgb(106 92 255 / 0.22)',
                      }}
                      aria-hidden="true"
                    />
                    <p className="font-display text-[26px] font-extrabold tracking-[-0.03em]">{brl(f.prazo)}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ opacity: 0.6 }}>
                      com prazo · {brl(f.mensal)} no mensal
                    </p>
                    <p className="mt-2 text-[13px] leading-snug" style={{ opacity: 0.66 }}>
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
            <Revelar key={c.titulo} atraso={i * 50} className="peca-viva flex items-start gap-4 rounded-[14px] bg-white p-5">
              <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-paper text-iris">
                <Icone nome={ICONES_CONDICAO[i]} tamanho={20} />
              </span>
              <span>
                <span className="block font-display text-[17px] font-bold tracking-[-0.02em]">{c.titulo}</span>
                <span className="mt-1 block text-[15px] leading-snug text-txt-2">{c.texto}</span>
              </span>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
