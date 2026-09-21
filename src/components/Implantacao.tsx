import { implantacao } from '../content/site';
import { Revelar, Rotulo, Titulo } from './base';

export default function Implantacao() {
  return (
    <section className="secao escuro bg-ink">
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="10" texto={implantacao.eyebrow} claro />
            </Revelar>
            <Revelar atraso={80}>
              <Titulo linhas={implantacao.titulo} destaque={implantacao.destaque} claro />
            </Revelar>
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
                <div>
                  <p className="font-display text-[20px] font-bold tracking-[-0.02em] text-white">{fase.nome}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-teal">{fase.dias}</p>
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
      </div>
    </section>
  );
}
