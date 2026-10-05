import { investimento } from '../content/site';

export type Ciclo = 'prazo' | 'mensal';

/** Menor preço da tabela, usado como chamada de "a partir de". */
export const MENOR_PRECO = Math.min(...investimento.faixas.map((f) => f.prazo));

/** Devolve a faixa de preço vigente para uma quantidade de usuários. */
export function faixaDe(usuarios: number) {
  const n = Math.max(1, usuarios);
  return investimento.faixas.find((f) => n >= f.de && n <= f.ate) ?? investimento.faixas[investimento.faixas.length - 1];
}

/** Mensalidade para um time, no ciclo com prazo ou no mensal sem fidelidade. */
export function mensalidade(usuarios: number, ciclo: Ciclo = 'prazo') {
  const faixa = faixaDe(usuarios);
  const pessoas = Math.max(1, usuarios);
  const porUsuario = ciclo === 'prazo' ? faixa.prazo : faixa.mensal;
  const outro = ciclo === 'prazo' ? faixa.mensal : faixa.prazo;
  return {
    faixa,
    porUsuario,
    total: porUsuario * pessoas,
    porUsuarioOutro: outro,
    totalOutro: outro * pessoas,
    /** Quanto o prazo economiza por mês em relação ao mensal. */
    economiaMes: (faixa.mensal - faixa.prazo) * pessoas,
  };
}

/** Custo estimado do retrabalho, o número que a calculadora do site mostra. */
export function custoRetrabalho(pessoas: number, horasDia: number, valorHora: number, diasUteis: number) {
  const mes = pessoas * horasDia * diasUteis * valorHora;
  return { mes, ano: mes * 12 };
}
