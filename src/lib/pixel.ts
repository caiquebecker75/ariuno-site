/**
 * Pixel da Meta e Google Analytics 4. Cada um só carrega quando a sua variável
 * existe no build (VITE_META_PIXEL_ID e VITE_GA4_ID); sem elas, as funções daqui
 * viram nada (o site continua igual). Os mesmos momentos vão para os dois.
 *
 * Eventos do site:
 *   PageView       ao abrir
 *   ViewContent    quando a seção #investimento aparece na tela (uma vez)
 *   SimulouPerda   quando a pessoa mexe na calculadora (uma vez, com o valor)
 *   Contact        clique em qualquer botão de WhatsApp
 *   Lead           formulário enviado com sucesso, com o mesmo eventID do servidor
 *
 * No GA4 os nomes seguem o padrão do Google (generate_lead é o evento que vira
 * conversão no Google Ads): ver GA4_NOMES abaixo.
 */

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };

const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || '';

const fbq = (...args: unknown[]) => {
  const f = (window as unknown as { fbq?: Fbq }).fbq;
  if (PIXEL_ID && f) f(...args);
};

const GA4_ID = (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() || '';

const gtag = (...args: unknown[]) => {
  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (GA4_ID && g) g(...args);
};

/** Nome do evento no GA4 para cada evento da Meta. PageView o GA4 já conta sozinho. */
const GA4_NOMES: Record<string, string> = {
  ViewContent: 'view_investimento',
  SimulouPerda: 'simulou_perda',
  Contact: 'contato_whatsapp',
  Lead: 'generate_lead',
};

function paraGa4(evento: string, parametros?: Record<string, unknown>, eventID?: string) {
  const nome = GA4_NOMES[evento];
  if (!nome) return;
  const p: Record<string, unknown> = { ...(parametros || {}) };
  if (eventID) p.lead_id = eventID;
  gtag('event', nome, p);
}

export const pixelAtivo = () => !!PIXEL_ID || !!GA4_ID;

export function rastrear(evento: string, parametros?: Record<string, unknown>, eventID?: string) {
  if (eventID) fbq('track', evento, parametros || {}, { eventID });
  else fbq('track', evento, parametros || {});
  paraGa4(evento, parametros, eventID);
}

export function rastrearPersonalizado(evento: string, parametros?: Record<string, unknown>) {
  fbq('trackCustom', evento, parametros || {});
  paraGa4(evento, parametros);
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

function carregarGa4() {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  if (w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  // Mesmo stub do código oficial do Google: usa `arguments`, não um array.
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
  document.head.appendChild(s);
  w.gtag('js', new Date());
  w.gtag('config', GA4_ID);
}

export function iniciarPixel() {
  if (typeof window === 'undefined' || (!PIXEL_ID && !GA4_ID)) return;
  try {
    if (GA4_ID) carregarGa4();
    if (PIXEL_ID) {
      carregarScript();
      fbq('init', PIXEL_ID);
      fbq('track', 'PageView');
    }
    observarInvestimento();
    observarWhatsapp();
  } catch {
    /* bloqueador de anúncio ou erro de rede: o site segue normal */
  }
}
