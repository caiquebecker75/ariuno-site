import { investimento } from '../content/site';

/** Devolve a faixa de preço vigente para uma quantidade de usuários. */
export function faixaDe(usuarios: number) {
  const n = Math.max(investimento.faixas[0].de, usuarios);
  return investimento.faixas.find((f) => n >= f.de && n <= f.ate) ?? investimento.faixas[investimento.faixas.length - 1];
}

export function mensalidade(usuarios: number) {
  const faixa = faixaDe(usuarios);
  return { faixa, porUsuario: faixa.preco, total: faixa.preco * Math.max(investimento.faixas[0].de, usuarios) };
}

/** Custo estimado do retrabalho, o número que a calculadora do site mostra. */
export function custoRetrabalho(pessoas: number, horasDia: number, valorHora: number, diasUteis: number) {
  const mes = pessoas * horasDia * diasUteis * valorHora;
  return { mes, ano: mes * 12 };
}
