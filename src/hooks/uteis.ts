import { useEffect, useRef, useState } from 'react';

/** Marca o elemento quando ele entra na tela, para as animações de entrada. */
export function useRevelar<T extends HTMLElement = HTMLDivElement>(margem = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const revelar = () => {
      setDentro(true);
      obs.disconnect();
      window.removeEventListener('scrollend', conferir);
    };
    // rede de seguranca: numa rolagem muito rapida o observador pode nao ser
    // notificado enquanto o bloco passa pela tela, entao conferimos ao parar.
    const conferir = () => {
      const caixa = el.getBoundingClientRect();
      if (caixa.top < window.innerHeight && caixa.bottom > 0) revelar();
    };
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) revelar();
      },
      { rootMargin: margem, threshold: 0 },
    );
    obs.observe(el);
    window.addEventListener('scrollend', conferir, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener('scrollend', conferir);
    };
  }, [margem]);

  return { ref, dentro };
}

/** Respeita a preferência de movimento reduzido do sistema. */
export function useMovimentoReduzido() {
  const [reduzido, setReduzido] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ouvir = () => setReduzido(mq.matches);
    mq.addEventListener('change', ouvir);
    return () => mq.removeEventListener('change', ouvir);
  }, []);
  return reduzido;
}

/** Consulta de mídia simples, para adaptar a narrativa no celular. */
export function useMedia(consulta: string) {
  const [bate, setBate] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(consulta).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const ouvir = () => setBate(mq.matches);
    mq.addEventListener('change', ouvir);
    setBate(mq.matches);
    return () => mq.removeEventListener('change', ouvir);
  }, [consulta]);
  return bate;
}

/** Conta de 0 até o valor quando o bloco aparece. */
export function useContador(valor: number, ativo: boolean, duracao = 1400) {
  const reduzido = useMovimentoReduzido();
  const [atual, setAtual] = useState(reduzido ? valor : 0);

  useEffect(() => {
    if (!ativo) return;
    if (reduzido) {
      setAtual(valor);
      return;
    }
    let quadro = 0;
    const inicio = performance.now();
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - inicio) / duracao);
      const suave = 1 - Math.pow(1 - t, 3);
      setAtual(valor * suave);
      if (t < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [valor, ativo, duracao, reduzido]);

  return atual;
}

export const brl = (n: number, casas = 0) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: casas, minimumFractionDigits: casas });

export const numero = (n: number) => Math.round(n).toLocaleString('pt-BR');

export const urlPublica = (caminho: string) => `${import.meta.env.BASE_URL}${caminho}`;

/**
 * Progresso da rolagem de um bloco, de 0 a 1.
 * 0 quando o topo do bloco encosta no fim da tela, 1 quando o fim do bloco
 * passa pelo topo. Usado nas cenas que avançam conforme a pessoa rola.
 */
export function useProgressoRolagem<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let quadro = 0;
    const medir = () => {
      const caixa = el.getBoundingClientRect();
      const total = caixa.height - window.innerHeight;
      const andado = -caixa.top;
      setProgresso(total > 0 ? Math.max(0, Math.min(1, andado / total)) : 0);
      quadro = 0;
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar, { passive: true });
    return () => {
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);

  return { ref, progresso };
}

/** Abre um print em tela cheia. Quem escuta é o componente Lightbox, no App. */
export function ampliarPrint(nome: string, alt: string) {
  window.dispatchEvent(new CustomEvent('ampliar-print', { detail: { nome, alt } }));
}

let ultimoValorEmRisco = 0;

/** Guarda o último valor calculado na calculadora para os botões falarem a mesma língua. */
export function usarValorEmRisco() {
  const [valor, setValor] = useState(ultimoValorEmRisco);
  useEffect(() => {
    const ouvir = (e: Event) => setValor((e as CustomEvent<number>).detail);
    window.addEventListener('valor-em-risco', ouvir);
    // quem montou antes do anúncio pega o último valor guardado
    setValor(ultimoValorEmRisco);
    return () => window.removeEventListener('valor-em-risco', ouvir);
  }, []);
  return valor;
}

export function anunciarValorEmRisco(valor: number) {
  ultimoValorEmRisco = valor;
  window.dispatchEvent(new CustomEvent('valor-em-risco', { detail: valor }));
}
