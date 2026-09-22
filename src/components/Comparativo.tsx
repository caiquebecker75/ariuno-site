import { comparativo } from '../content/site';
import { Revelar, Rotulo, TituloCinema } from './base';

function Marca({ tipo, forte = false }: { tipo: string; forte?: boolean }) {
  const rotulos: Record<string, string> = { sim: 'entrega de fábrica', meio: 'parcial', nao: 'não faz' };
  const cor = forte ? '#fff' : tipo === 'sim' ? 'var(--color-ok)' : tipo === 'meio' ? '#B79A2E' : 'var(--color-txt-3)';
  const fundo = forte ? 'rgb(255 255 255 / 0.18)' : tipo === 'sim' ? '#DFF3EC' : tipo === 'meio' ? '#F6EFD6' : 'var(--color-paper-2)';

  return (
    <span
      className="mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full"
      style={{ background: fundo, color: cor }}
      title={rotulos[tipo]}
    >
      <span className="sr-only">{rotulos[tipo]}</span>
      {tipo === 'sim' && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {tipo === 'meio' && <span className="block h-[3px] w-[12px] rounded-full bg-current" aria-hidden="true" />}
      {tipo === 'nao' && <span className="block h-[7px] w-[7px] rounded-full bg-current opacity-45" aria-hidden="true" />}
    </span>
  );
}

export default function Comparativo() {
  return (
    <section id="comparativo" className="secao bg-white">
      <div className="limite">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
          <div>
            <Revelar>
              <Rotulo n="08" texto={comparativo.eyebrow} />
            </Revelar>
            <TituloCinema linhas={comparativo.titulo} destaque={comparativo.destaque} />
          </div>
          <Revelar atraso={140}>
            <p className="lead">
              A primeira linha é empate: organizar tarefa todo mundo organiza. A diferença começa
              quando a operação precisa fechar o mês.
            </p>
          </Revelar>
        </div>

        <Revelar atraso={160}>
          <p className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-txt-3 lg:hidden">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12h16M15 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            arraste a tabela para o lado
          </p>
          <div className="mt-4 min-w-0 overflow-x-auto pb-2 lg:mt-10">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-[14px] sm:min-w-[840px] sm:text-[15px]">
              <caption className="sr-only">
                Comparativo de funcionalidades entre o Ariuno e cinco plataformas de gestão de trabalho
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 w-[150px] bg-white py-4 pr-4 text-left font-medium text-txt-3 sm:w-auto sm:pr-5">
                    O que a sua operação precisa
                  </th>
                  {comparativo.colunas.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className="px-3 py-4 text-center font-display text-[15px] font-bold tracking-[-0.01em]"
                      style={{
                        color: i === 0 ? '#fff' : 'var(--color-txt-2)',
                        background: i === 0 ? 'var(--color-iris)' : 'transparent',
                        borderTopLeftRadius: i === 0 ? 14 : 0,
                        borderTopRightRadius: i === 0 ? 14 : 0,
                      }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.linhas.map((linha, li) => (
                  <tr key={linha.recurso}>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 w-[150px] py-[14px] pr-4 text-left font-normal leading-snug text-txt sm:w-auto sm:pr-5"
                      style={{ background: li % 2 ? 'var(--color-paper)' : '#fff' }}
                    >
                      {linha.recurso}
                    </th>
                    {linha.marcas.map((m, i) => (
                      <td
                        key={`${linha.recurso}-${i}`}
                        className="px-3 py-[14px] text-center"
                        style={{ background: i === 0 ? 'var(--color-iris)' : li % 2 ? 'var(--color-paper)' : '#fff' }}
                      >
                        <Marca tipo={m} forte={i === 0} />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="sticky left-0 z-10 bg-white py-5 pr-5 text-left font-display text-[15px] font-bold tracking-[-0.01em]">
                    {comparativo.preco.recurso}
                  </th>
                  {comparativo.preco.valores.map((v, i) => (
                    <td
                      key={v + i}
                      className="px-3 py-5 text-center font-display text-[17px] font-bold tracking-[-0.02em]"
                      style={{
                        background: i === 0 ? 'var(--color-iris)' : '#fff',
                        color: i === 0 ? '#fff' : 'var(--color-txt-2)',
                        borderBottomLeftRadius: i === 0 ? 14 : 0,
                        borderBottomRightRadius: i === 0 ? 14 : 0,
                      }}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Revelar>

        <Revelar atraso={200}>
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            {comparativo.legenda.map((l) => (
              <span key={l.marca} className="flex items-center gap-[10px] text-[14px] text-txt-2">
                <Marca tipo={l.marca} />
                {l.texto}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-txt-3">{comparativo.fonte}</p>
        </Revelar>
      </div>
    </section>
  );
}
