/**
 * Atribuição da visita: de onde a pessoa veio, para o lead chegar ao comercial
 * com a campanha e o anúncio certos, e para a API de Conversões da Meta casar o
 * lead com o clique.
 *
 * Na primeira página da sessão guardamos utm_*, fbclid, página de entrada e
 * referrer em sessionStorage. Se a visita veio de campanha, guardamos também em
 * localStorage, para quem volta dias depois (sem utm) ainda levar a origem.
 * Tudo em try/catch: navegador em modo privado ou com armazenamento bloqueado
 * simplesmente segue sem atribuição.
 */

const CHAVE = 'ariuno_atribuicao';
const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export type Atribuicao = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  fbclid: string;
  /** fb.1.<timestamp>.<fbclid>, montado no primeiro clique quando o cookie _fbc não existe. */
  fbcMontado: string;
  pagina: string;
  referrer: string;
};

const vazia = (): Atribuicao => ({
  utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '',
  fbclid: '', fbcMontado: '', pagina: '', referrer: '',
});

function ler(armazem: () => Storage): Atribuicao | null {
  try {
    const txt = armazem().getItem(CHAVE);
    return txt ? { ...vazia(), ...JSON.parse(txt) } : null;
  } catch {
    return null;
  }
}

function gravar(armazem: () => Storage, dados: Atribuicao) {
  try {
    armazem().setItem(CHAVE, JSON.stringify(dados));
  } catch {
    /* armazenamento bloqueado: segue sem guardar */
  }
}

const sessao = () => window.sessionStorage;
const local = () => window.localStorage;

/** Roda uma vez, no carregamento do site. */
export function iniciarAtribuicao() {
  if (typeof window === 'undefined') return;
  if (ler(sessao)) return; // a sessão já tem a página de entrada

  const url = new URL(window.location.href);
  const atual = vazia();
  UTMS.forEach((k) => (atual[k] = (url.searchParams.get(k) || '').slice(0, 200)));
  atual.fbclid = (url.searchParams.get('fbclid') || '').slice(0, 500);
  if (atual.fbclid) atual.fbcMontado = `fb.1.${Date.now()}.${atual.fbclid}`;
  atual.pagina = window.location.href.slice(0, 500);
  // referrer do próprio site não é origem
  atual.referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer.slice(0, 500) : '';

  gravar(sessao, atual);
  const veioDeCampanha = UTMS.some((k) => atual[k]) || !!atual.fbclid;
  if (veioDeCampanha) gravar(local, atual);
}

function cookie(nome: string) {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${nome}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : '';
  } catch {
    return '';
  }
}

/** Dados que vão junto com o formulário. */
export function dadosDeAtribuicao() {
  const daSessao = ler(sessao);
  const campanhaDaSessao = daSessao && (UTMS.some((k) => daSessao[k]) || daSessao.fbclid);
  // Sessão sem campanha usa a última campanha guardada (quem volta direto depois do anúncio).
  const a = (campanhaDaSessao ? daSessao : ler(local) || daSessao) || vazia();
  return {
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_term: a.utm_term,
    utm_content: a.utm_content,
    fbclid: a.fbclid,
    fbc: cookie('_fbc') || a.fbcMontado,
    fbp: cookie('_fbp'),
    pagina: daSessao?.pagina || a.pagina || window.location.href.slice(0, 500),
    referrer: daSessao?.referrer || a.referrer,
  };
}

/** Id curto do evento, o mesmo no Pixel e no servidor, para a Meta deduplicar. */
export function novoEventId() {
  try {
    return `ev_${crypto.randomUUID().replace(/-/g, '').slice(0, 24)}`;
  } catch {
    return `ev_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
}
