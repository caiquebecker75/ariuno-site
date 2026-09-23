/**
 * Pixel da Meta. Só carrega quando VITE_META_PIXEL_ID existe no build; sem ele,
 * todas as funções daqui viram nada (o site continua igual).
 *
 * Eventos do site:
 *   PageView       ao abrir
 *   ViewContent    quando a seção #investimento aparece na tela (uma vez)
 *   SimulouPerda   quando a pessoa mexe na calculadora (uma vez, com o valor)
 *   Contact        clique em qualquer botão de WhatsApp
 *   Lead           formulário enviado com sucesso, com o mesmo eventID do servidor
 */

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };

const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || '';

const fbq = (...args: unknown[]) => {
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  if (PIXEL_ID && f) f(...args);
};

export const pixelAtivo = () => !!PIXEL_ID;

export function rastrear(evento: string, parametros?: Record<string, unknown>, eventID?: string) {
  if (eventID) fbq('track', evento, parametros || {}, { eventID });
  else fbq('track', evento, parametros || {});
}

export function rastrearPersonalizado(evento: string, parametros?: Record<string, unknown>) {
  fbq('trackCustom', evento, parametros || {});
}

let simulou = false;
/** Chamado pela calculadora quando a pessoa mexe. Vale uma vez por visita. */
export function rastrearSimulacao(valorMes: number) {
  if (simulou) return;
  simulou = true;
  rastrearPersonalizado('SimulouPerda', { value: Math.round(valorMes), currency: 'BRL' });
}

function carregarScript() {
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (w.fbq) return;
  // Mesmo stub do código oficial da Meta: enfileira as chamadas até o script chegar.
  const f: Fbq = function (...args: unknown[]) {
    if (f.callMethod) (f.callMethod as (...a: unknown[]) => void)(...args);
    else f.queue!.push(args);
  } as Fbq;
  f.push = f;
  f.loaded = true;
  f.version = '2.0';
  f.queue = [];
  w.fbq = f;
  w._fbq = f;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);
}

function observarInvestimento() {
  let feito = false;
  const ligar = () => {
    const alvo = document.getElementById('investimento');
    if (!alvo) return false;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !feito) {
          feito = true;
          rastrear('ViewContent', { content_name: 'Investimento', content_category: 'preco' });
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(alvo);
    return true;
  };
  // A seção nasce com o React: tenta de novo até ela existir.
  if (!ligar()) {
    let tentativas = 0;
    const t = window.setInterval(() => {
      if (ligar() || ++tentativas > 40) window.clearInterval(t);
    }, 250);
  }
}

function observarWhatsapp() {
  // Um ouvinte só para o site inteiro: pega barra fixa, faixa de CTA, seção de
  // conversa e rodapé, e qualquer botão novo que aparecer depois.
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="wa.me/"], a[href*="api.whatsapp.com"]');
      if (a) rastrear('Contact', { content_name: 'WhatsApp' });
    },
    { capture: true },
  );
}

export function iniciarPixel() {
  if (!PIXEL_ID || typeof window === 'undefined') return;
  try {
    carregarScript();
    fbq('init', PIXEL_ID);
    rastrear('PageView');
    observarInvestimento();
    observarWhatsapp();
  } catch {
    /* bloqueador de anúncio ou erro de rede: o site segue normal */
  }
}
