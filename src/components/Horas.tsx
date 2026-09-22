import { cliente, horas } from '../content/site';
import { Botao, Print, Revelar, Rotulo, Selo, TituloCinema } from './base';
import { Icone, type NomeIcone } from './Icone';
import { useContador, useRevelar } from '../hooks/uteis';

/** Medidor do consumo do contrato: o número que faz o cliente renovar ou renegociar. */
function Medidor({ valor, ativo }: { valor: number; ativo: boolean }) {
  const atual = useContador(valor, ativo, 1500);
  const raio = 88;
  const volta = Math.PI * raio;
  const preenchido = Math.min(1, atual / 140);

  return (
    <div className="relative">
      <svg viewBox="0 0 220 128" className="w-full max-w-[380px]" role="img" aria-label={`Consumo de ${valor}% do contrato`}>
        <defs>
          <linearGradient id="medidor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C2A8" />
            <stop offset="62%" stopColor="#6A5CFF" />
            <stop offset="100%" stopColor="#E0453C" />
          </linearGradient>
        </defs>
        <path d="M22 110 A 88 88 0 0 1 198 110" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="17" strokeLinecap="round" />
        <path
          d="M22 110 A 88 88 0 0 1 198 110"
          fill="none"
          stroke="url(#medidor)"
          strokeWidth="17"
          strokeLinecap="round"
          strokeDasharray={volta}
          strokeDashoffset={volta * (1 - preenchido)}
        />
        <text x="110" y="98" textAnchor="middle" className="font-display" fontSize="44" fontWeight="800" fill="#fff" letterSpacing="-2">
          {Math.round(atual)}%
        </text>
      </svg>
      <p className="mt-1 text-[14px] text-white/50">
        do contrato consumido, com <span className="font-bold text-white">9 dias</span> de mês pela frente
      </p>
    </div>
  );
}

export default function Horas() {
  const { ref, dentro } = useRevelar<HTMLDivElement>();

  return (
    <>
      <section className="secao escuro bg-ink-2" ref={ref}>
        <div className="limite">
          <div className="grid gap-[clamp(32px,4vw,64px)] lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <Revelar>
                <Rotulo n="05" texto={horas.eyebrow} claro />
              </Revelar>
              <TituloCinema linhas={horas.titulo} destaque={horas.destaque} claro />
              <Revelar atraso={140}>
                <p className="lead mt-6">{horas.lead}</p>
              </Revelar>

              <dl className="mt-9 flex flex-col gap-[2px]">
                {horas.linhas.map((l, i) => (
                  <Revelar key={l.k} atraso={160 + i * 70}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-[12px] bg-white/[0.06] px-5 py-4">
                      <dt className="flex items-center gap-3 text-[15px] text-white/70">
                        <span className="text-teal"><Icone nome={i === 0 ? 'play' : 'grafico'} tamanho={18} /></span>
                        {l.k}
                      </dt>
                      <dd className="font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-teal">{l.v}</dd>
                    </div>
                  </Revelar>
                ))}
              </dl>
            </div>

            <Revelar atraso={180}>
              <div className="rounded-[var(--radius-peca)] bg-white/[0.06] p-[clamp(22px,2.6vw,38px)]">
                <p className="rotulo text-white/55">{horas.alerta.titulo}</p>
                <div className="mt-6">
                  <Medidor valor={horas.alerta.valor} ativo={dentro} />
                </div>
                <p className="mt-6 flex items-start gap-3 rounded-[12px] bg-alerta/20 px-4 py-3 text-[14px] leading-snug text-white">
                  <span className="mt-[1px] shrink-0"><Icone nome="alerta" tamanho={17} /></span>
                  {horas.alerta.rodape}
                </p>
                <div className="mt-6">
                  <Botao href="#conversar" tipo="claro" icone="cronometro">
                    Quero ver minhas horas virarem margem
                  </Botao>
                </div>
              </div>
            </Revelar>
          </div>

          <Revelar atraso={220}>
            <div className="mt-[clamp(32px,4vw,58px)]">
              <Print nome={horas.print} alt={horas.printAlt} url="ariuno.com.br · produtividade do time" inclinar />
            </div>
          </Revelar>
        </div>
      </section>

      {/* Prova de valor para o cliente: composição editorial, print sangrando à direita */}
      <section className="secao overflow-hidden bg-white">
        <div className="limite">
          <div className="grid items-center gap-[clamp(32px,4vw,60px)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div>
              <Revelar>
                <Rotulo n="06" texto={cliente.eyebrow} />
              </Revelar>
              <TituloCinema linhas={cliente.titulo} destaque={cliente.destaque} />
              <Revelar atraso={140}>
                <p className="lead mt-6">{cliente.lead}</p>
              </Revelar>

              <ul className="mt-8 flex flex-col gap-[2px]">
                {cliente.selos.map((selo, i) => {
                  const icones: NomeIcone[] = ['link', 'pdf', 'aprovacao'];
                  return (
                    <Revelar key={selo.titulo} como="li" atraso={160 + i * 70} className="flex items-start gap-4 rounded-[12px] bg-paper px-5 py-4">
                      <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white text-iris">
                        <Icone nome={icones[i]} tamanho={20} />
                      </span>
                      <span>
                        <span className="block font-display text-[17px] font-bold tracking-[-0.02em]">{selo.titulo}</span>
                        <span className="mt-1 block text-[15px] leading-snug text-txt-2">{selo.texto}</span>
                      </span>
                    </Revelar>
                  );
                })}
              </ul>

              <Revelar atraso={380}>
                <div className="mt-6 flex items-start gap-4 rounded-[14px] bg-lime px-6 py-5">
                  <span className="mt-[2px] text-ink"><Icone nome="pessoas" tamanho={24} /></span>
                  <span>
                    <span className="block font-display text-[19px] font-bold tracking-[-0.02em] text-ink">
                      {cliente.destaqueSelo.titulo}
                    </span>
                    <span className="mt-1 block text-[15px] leading-snug text-ink/70">{cliente.destaqueSelo.texto}</span>
                  </span>
                </div>
              </Revelar>

              <Revelar atraso={440}>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Botao href="#conversar" icone="relatorio">
                    Quero esse relatório na minha reunião
                  </Botao>
                  <Selo icone="escudo">Sem custo por usuário cliente</Selo>
                </div>
              </Revelar>
            </div>

            <Revelar atraso={200}>
              <div className="lg:-mr-[12vw]">
                <Print nome={cliente.print} alt={cliente.printAlt} url="ariuno.com.br · relatório do cliente" inclinar />
              </div>
            </Revelar>
          </div>
        </div>
      </section>
    </>
  );
}
