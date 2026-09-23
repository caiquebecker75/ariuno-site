import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { ampliarPrint, useMovimentoReduzido, useRevelar, urlPublica } from '../hooks/uteis';
import { Icone, type NomeIcone } from './Icone';

/** Marca do Ariuno: o traço único que atravessa o site inteiro. */
export function Marca({ tamanho = 30, comNome = true, claro = true }: { tamanho?: number; comNome?: boolean; claro?: boolean }) {
  const id = `marca-${claro ? 'c' : 'e'}`;
  return (
    <span className="inline-flex items-center gap-[10px]">
      <svg width={tamanho} height={tamanho} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A5CFF" />
            <stop offset="45%" stopColor="#4285FF" />
            <stop offset="100%" stopColor="#00C2A8" />
          </linearGradient>
        </defs>
        <path
          d="M25,80 C10,80 15,55 30,55 C42,55 45,68 40,80 L75,15 L95,75"
          stroke={`url(#${id})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M40,80 L95,75" stroke={`url(#${id})`} strokeWidth="12" strokeLinecap="round" />
      </svg>
      {comNome && (
        <span
          className="font-display text-[21px] font-extrabold tracking-[-0.045em]"
          style={{ color: claro ? '#fff' : 'var(--color-ink)' }}
        >
          ariuno
        </span>
      )}
    </span>
  );
}

type BotaoProps = {
  children: ReactNode;
  href?: string;
  tipo?: 'principal' | 'claro' | 'contorno' | 'texto';
  externo?: boolean;
  onClick?: () => void;
  submit?: boolean;
  carregando?: boolean;
  className?: string;
  icone?: NomeIcone;
  grande?: boolean;
};

/** Botão com leve atração pelo cursor no desktop. Some no toque e no movimento reduzido. */
export function Botao({ children, href, tipo = 'principal', externo, onClick, submit, carregando, className = '', icone, grande }: BotaoProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduzido = useMovimentoReduzido();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduzido || !window.matchMedia('(pointer: fine)').matches) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.16;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const sair = () => { el.style.transform = 'translate3d(0,0,0)'; };
    el.addEventListener('pointermove', mover);
    el.addEventListener('pointerleave', sair);
    return () => {
      el.removeEventListener('pointermove', mover);
      el.removeEventListener('pointerleave', sair);
    };
  }, [reduzido]);

  const estilos: Record<string, string> = {
    principal: 'bg-iris text-white hover:bg-iris-d',
    claro: 'bg-lime text-ink hover:bg-[#d4ff66]',
    contorno: 'bg-white/10 text-white hover:bg-white/20',
    texto: 'bg-transparent text-inherit underline underline-offset-[6px] decoration-2 decoration-iris hover:decoration-teal px-0 py-0',
  };

  const base =
    tipo === 'texto'
      ? `inline-flex items-center gap-2 font-medium transition-colors duration-300 ${estilos[tipo]} ${className}`
      : `inline-flex items-center justify-center gap-2 rounded-full ${grande ? 'px-[32px] py-[19px] text-[17px]' : 'px-[26px] py-[15px] text-[15px]'} font-bold leading-none transition-[background-color,transform] duration-300 will-change-transform ${estilos[tipo]} ${className}`;

  const conteudo = (
    <>
      {icone && !carregando && <Icone nome={icone} tamanho={grande ? 20 : 18} />}
      {carregando ? '...' : children}
      {tipo !== 'texto' && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={base}
      >
        {conteudo}
      </a>
    );
  }
  return (
    <button ref={ref} type={submit ? 'submit' : 'button'} onClick={onClick} disabled={carregando} className={base}>
      {conteudo}
    </button>
  );
}

/** Rótulo numerado de seção. */
export function Rotulo({ n, texto, claro = false }: { n: string; texto: string; claro?: boolean }) {
  return (
    <p className="rotulo mb-5 flex items-center gap-[10px]" style={{ color: claro ? '#8a90ac' : 'var(--color-txt-3)' }}>
      <span style={{ color: claro ? 'var(--color-teal)' : 'var(--color-iris-d)' }}>({n})</span>
      {texto}
    </p>
  );
}

/** Título display em linhas, com uma linha destacada em cor. */
export function Titulo({
  linhas,
  destaque,
  classe = 'titulo-2',
  claro = false,
  como: Como = 'h2',
}: {
  linhas: readonly string[];
  destaque?: string;
  classe?: string;
  claro?: boolean;
  como?: 'h1' | 'h2';
}) {
  return (
    <Como className={classe} style={{ color: claro ? '#fff' : 'var(--color-ink)' }}>
      {linhas.map((linha) => (
        <span key={linha} className="block">
          {destaque && linha.includes(destaque) ? (
            <>
              {linha.split(destaque)[0]}
              <span style={{ color: claro ? 'var(--color-teal)' : 'var(--color-iris)' }}>{destaque}</span>
              {linha.split(destaque)[1]}
            </>
          ) : (
            linha
          )}
        </span>
      ))}
    </Como>
  );
}

/** Bloco que entra suavemente quando aparece na tela. */
export function Revelar({
  children,
  atraso = 0,
  className = '',
  style,
  como: Como = 'div',
}: {
  children: ReactNode;
  atraso?: number;
  className?: string;
  style?: CSSProperties;
  como?: 'div' | 'li' | 'section';
}) {
  const { ref, dentro } = useRevelar<HTMLDivElement>();
  return (
    <Como
      ref={ref as never}
      className={`revelar ${dentro ? 'dentro' : ''} ${className}`}
      style={{ ...style, ['--atraso' as string]: `${atraso}ms` }}
    >
      {children}
    </Como>
  );
}

/** Print do produto dentro de uma moldura de navegador, com versão leve no celular. */
export function Print({
  nome,
  alt,
  url,
  prioridade = false,
  className = '',
  inclinar = false,
}: {
  nome: string;
  alt: string;
  url?: string;
  prioridade?: boolean;
  className?: string;
  inclinar?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useMovimentoReduzido();

  // leve inclinação seguindo o mouse: dá profundidade sem virar enfeite
  useEffect(() => {
    const el = ref.current;
    if (!el || !inclinar || reduzido || !window.matchMedia('(pointer: fine)').matches) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1400px) rotateY(${x * 3.4}deg) rotateX(${-y * 2.6}deg)`;
    };
    const sair = () => { el.style.transform = 'perspective(1400px)'; };
    el.addEventListener('pointermove', mover);
    el.addEventListener('pointerleave', sair);
    return () => {
      el.removeEventListener('pointermove', mover);
      el.removeEventListener('pointerleave', sair);
    };
  }, [inclinar, reduzido]);

  return (
    <div ref={ref} className="transition-transform duration-300 will-change-transform">
      <button
        type="button"
        onClick={() => ampliarPrint(nome, alt)}
        className={`moldura group block w-full text-left ${className}`}
        aria-label={`Ampliar: ${alt}`}
      >
        <span className="moldura-barra" aria-hidden="true">
          <i /><i /><i />
          {url && <span className="moldura-url">{url}</span>}
          <span className="moldura-lupa">
            <Icone nome="busca" tamanho={13} /> ampliar
          </span>
        </span>
        <picture>
          <source media="(max-width: 640px)" srcSet={urlPublica(`produto/${nome}-sm.webp`)} type="image/webp" />
          <img
            src={urlPublica(`produto/${nome}.webp`)}
            alt={alt}
            width={1400}
            height={875}
            loading={prioridade ? 'eager' : 'lazy'}
            fetchPriority={prioridade ? 'high' : 'auto'}
            decoding="async"
          />
        </picture>
      </button>
    </div>
  );
}

/** Tela cheia para os prints: qualquer print do site abre aqui. */
export function Lightbox() {
  const [aberto, setAberto] = useState<{ nome: string; alt: string } | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const abrir = (e: Event) => setAberto((e as CustomEvent<{ nome: string; alt: string }>).detail);
    window.addEventListener('ampliar-print', abrir);
    return () => window.removeEventListener('ampliar-print', abrir);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null);
    document.body.style.overflow = 'hidden';
    fecharRef.current?.focus();
    window.addEventListener('keydown', tecla);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', tecla);
    };
  }, [aberto]);

  if (!aberto) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={aberto.alt}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={() => setAberto(null)}
      style={{ animation: 'aparecer .25s ease-out' }}
    >
      <button
        ref={fecharRef}
        type="button"
        onClick={() => setAberto(null)}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25 sm:right-8 sm:top-8"
      >
        <span className="sr-only">Fechar</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
      <img
        src={urlPublica(`produto/${aberto.nome}.webp`)}
        alt={aberto.alt}
        className="max-h-full w-auto max-w-full rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/** Cursor próprio em dois tons, só no desktop com ponteiro fino. */
export function Cursor() {
  const pontoRef = useRef<HTMLDivElement>(null);
  const anelRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);
  const reduzido = useMovimentoReduzido();

  useEffect(() => {
    if (reduzido || !window.matchMedia('(pointer: fine)').matches) return;
    setAtivo(true);
    document.documentElement.classList.add('cursor-proprio');

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let ax = x;
    let ay = y;
    let quadro = 0;

    const mover = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const alvo = e.target as HTMLElement;
      const clicavel = !!alvo.closest('a, button, input, select, textarea, [role="tab"], [data-clicavel]');
      anelRef.current?.style.setProperty('--escala', clicavel ? '2.1' : '1');
    };
    const laco = () => {
      ax += (x - ax) * 0.18;
      ay += (y - ay) * 0.18;
      if (pontoRef.current) pontoRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (anelRef.current)
        anelRef.current.style.transform = `translate3d(${ax}px, ${ay}px, 0) translate(-50%, -50%) scale(var(--escala, 1))`;
      quadro = requestAnimationFrame(laco);
    };
    window.addEventListener('pointermove', mover, { passive: true });
    quadro = requestAnimationFrame(laco);
    return () => {
      window.removeEventListener('pointermove', mover);
      cancelAnimationFrame(quadro);
      document.documentElement.classList.remove('cursor-proprio');
    };
  }, [reduzido]);

  if (!ativo) return null;
  return (
    <div aria-hidden="true">
      <div
        ref={anelRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[34px] w-[34px] rounded-full transition-[width,height] duration-200"
        style={{ background: 'rgb(106 92 255 / 0.18)', boxShadow: 'inset 0 0 0 1.5px rgb(255 255 255 / 0.85)' }}
      />
      <div
        ref={pontoRef}
        className="pointer-events-none fixed left-0 top-0 z-[61] h-[7px] w-[7px] rounded-full"
        style={{ background: 'var(--color-ink)', boxShadow: '0 0 0 2px rgb(255 255 255 / 0.9)' }}
      />
    </div>
  );
}

/** Título que sobe linha a linha por trás de uma máscara, como um letreiro. */
export function TituloCinema({
  linhas,
  destaque,
  classe = 'titulo-2',
  claro = false,
  como: Como = 'h2',
  gradiente = false,
}: {
  linhas: readonly string[];
  destaque?: string;
  classe?: string;
  claro?: boolean;
  como?: 'h1' | 'h2';
  gradiente?: boolean;
}) {
  const { ref, dentro } = useRevelar<HTMLHeadingElement>('0px 0px -8% 0px');
  return (
    <Como ref={ref} className={classe} style={{ color: claro ? '#fff' : 'var(--color-ink)' }}>
      {linhas.map((linha, i) => (
        <span key={linha} className="block overflow-hidden pb-[0.06em]">
          <span
            className="block will-change-transform"
            style={{
              transform: dentro ? 'translate3d(0,0,0)' : 'translate3d(0,108%,0)',
              transition: `transform .9s cubic-bezier(.16,1,.3,1) ${i * 110}ms`,
            }}
          >
            {destaque && linha.includes(destaque) ? (
              <>
                {linha.split(destaque)[0]}
                <span
                  style={
                    gradiente
                      ? {
                          background: 'linear-gradient(96deg,#8E82FF,#4285FF 46%,#00C2A8)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }
                      : { color: claro ? 'var(--color-teal)' : 'var(--color-iris)' }
                  }
                >
                  {destaque}
                </span>
                {linha.split(destaque)[1]}
              </>
            ) : (
              linha
            )}
          </span>
        </span>
      ))}
    </Como>
  );
}

/** Selo de confiança: ícone mais uma linha curta. */
export function Selo({ icone, children, claro = false }: { icone: NomeIcone; children: ReactNode; claro?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
      style={{
        background: claro ? 'rgb(255 255 255 / 0.1)' : 'var(--color-paper-2)',
        color: claro ? 'rgb(255 255 255 / 0.8)' : 'var(--color-txt-2)',
      }}
    >
      <span style={{ color: claro ? 'var(--color-teal)' : 'var(--color-iris)' }}>
        <Icone nome={icone} tamanho={16} />
      </span>
      {children}
    </span>
  );
}

/**
 * Faixa de conversão que aparece entre as seções, no momento em que o
 * argumento anterior acabou de convencer.
 */
export function CtaFaixa({
  titulo,
  texto,
  botao,
  href = '#conversar',
  selo,
  icone = 'foguete',
}: {
  titulo: string;
  texto: string;
  botao: string;
  href?: string;
  selo?: string;
  icone?: NomeIcone;
}) {
  return (
    <Revelar>
      <div className="limite">
        <div className="relative overflow-hidden rounded-[22px] bg-ink px-[clamp(22px,3vw,52px)] py-[clamp(26px,3.2vw,46px)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 hidden h-[260px] w-[260px] rounded-full opacity-[0.16] sm:block"
            style={{ background: 'radial-gradient(circle,#6A5CFF,transparent 68%)' }}
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="mt-1 hidden text-lime sm:block">
                <Icone nome={icone} tamanho={30} />
              </span>
              <div>
                <p className="font-display text-[clamp(22px,2.4vw,30px)] font-bold leading-tight tracking-[-0.03em] text-white">
                  {titulo}
                </p>
                <p className="mt-2 max-w-[54ch] text-[15px] leading-snug text-white/60">{texto}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3">
              <Botao href={href} tipo="claro" icone="seta">
                {botao}
              </Botao>
              {selo && <span className="text-[13px] text-white/45">{selo}</span>}
            </div>
          </div>
        </div>
      </div>
    </Revelar>
  );
}

/** Barra fixa de conversão: aparece depois da abertura e não sai mais. */
export function BarraCta({ email, whatsapp, mensagem }: { email: string; whatsapp?: string; mensagem?: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const fim = document.querySelector('#conversar');
      const passouAbertura = window.scrollY > window.innerHeight * 0.9;
      const chegouNoFim = fim ? fim.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setVisivel(passouAbertura && !chegouNoFim);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-[transform,opacity] duration-500 sm:px-5 sm:pb-5"
      style={{ transform: visivel ? 'none' : 'translateY(130%)', opacity: visivel ? 1 : 0 }}
      aria-hidden={!visivel}
    >
      <div className="limite">
        <div className="flex items-center justify-between gap-4 rounded-[18px] bg-ink/95 px-4 py-3 shadow-[0_18px_50px_-20px_rgb(11_13_30/0.7)] backdrop-blur-md sm:px-6 sm:py-4">
          <p className="hidden text-[15px] leading-snug text-white/75 sm:block">
            <strong className="font-bold text-white">Piloto de 30 dias</strong> na sua operação real, sem fidelidade.
          </p>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={visivel ? 0 : -1}
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#25D366] hover:text-ink"
                aria-label="Falar no WhatsApp"
              >
                <Icone nome="whatsapp" tamanho={20} />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              tabIndex={visivel ? 0 : -1}
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Falar por e-mail"
            >
              <Icone nome="email" tamanho={19} />
            </a>
            <a
              href="#conversar"
              tabIndex={visivel ? 0 : -1}
              className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[15px] font-bold text-ink transition-colors hover:bg-[#d4ff66] sm:flex-none"
            >
              Agendar meu piloto
              <Icone nome="seta" tamanho={17} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
