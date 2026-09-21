import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { useMovimentoReduzido, useRevelar, urlPublica } from '../hooks/uteis';

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
};

/** Botão com leve atração pelo cursor no desktop. Some no toque e no movimento reduzido. */
export function Botao({ children, href, tipo = 'principal', externo, onClick, submit, carregando, className = '' }: BotaoProps) {
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
      : `inline-flex items-center justify-center gap-2 rounded-full px-[26px] py-[15px] text-[15px] font-bold leading-none transition-[background-color,transform] duration-300 will-change-transform ${estilos[tipo]} ${className}`;

  const conteudo = (
    <>
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
}: {
  nome: string;
  alt: string;
  url?: string;
  prioridade?: boolean;
  className?: string;
}) {
  return (
    <figure className={`moldura ${className}`}>
      <div className="moldura-barra" aria-hidden="true">
        <i /><i /><i />
        {url && <span className="moldura-url">{url}</span>}
      </div>
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
    </figure>
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
