import { implantacao } from '../content/site';
import { Botao, Revelar, Rotulo, TituloCinema } from './base';
import { Icone, type NomeIcone } from './Icone';

const ICONES: NomeIcone[] = ['busca', 'engrenagem', 'camadas', 'pessoas', 'foguete'];

export default function Implantacao() {
  return (
    <section className="secao escuro bg-ink">
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="10" texto={implantacao.eyebrow} claro />
            </Revelar>
            <TituloCinema linhas={implantacao.titulo} destaque={implantacao.destaque} claro />
          </div>
          <Revelar atraso={140}>
            <p className="lead">{implantacao.lead}</p>
          </Revelar>
        </div>

        {/* Cronograma em degraus: cada fase começa antes da anterior terminar */}
        <ol className="mt-[clamp(38px,4.6vw,64px)] flex flex-col gap-[3px]">
          {implantacao.fases.map((fase, i) => (
            <Revelar key={fase.nome} como="li" atraso={i * 80}>
              <div className="grid items-center gap-4 rounded-[14px] bg-white/[0.06] px-5 py-5 md:grid-cols-[190px_minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white/10 text-teal">
                    <Icone nome={ICONES[i]} tamanho={21} />
                  </span>
                  <span>
                    <span className="block font-display text-[20px] font-bold tracking-[-0.02em] text-white">{fase.nome}</span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-teal">{fase.dias}</span>
                  </span>
                </div>
                <div className="hidden h-[10px] w-full rounded-full bg-white/[0.08] md:block" aria-hidden="true">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${34 + i * 13}%`,
                      marginLeft: `${i * 14}%`,
                      background: `linear-gradient(90deg, #6A5CFF, ${i === implantacao.fases.length - 1 ? '#C0EE4E' : '#00C2A8'})`,
                    }}
                  />
                </div>
                <p className="text-[15px] leading-snug text-white/65">{fase.texto}</p>
              </div>
            </Revelar>
          ))}
        </ol>

        <div className="mt-[clamp(28px,3vw,44px)] flex flex-wrap items-center gap-4">
          <Botao href="#conversar" tipo="claro" icone="foguete" grande>
            Começar o piloto de 30 dias
          </Botao>
          <span className="text-[14px] text-white/60">Se não mudar o seu dia, você não continua.</span>
        </div>
      </div>
    </section>
  );
}
