/**
 * Ícones autorais do Ariuno.
 * Traço de 1,8, pontas arredondadas, desenhados sobre a mesma grade de 24 para
 * que a família inteira pareça uma coisa só. Nada de biblioteca genérica.
 */
export type NomeIcone =
  | 'quadro' | 'gantt' | 'painel' | 'cronometro' | 'relatorio' | 'aprovacao'
  | 'formulario' | 'financeiro' | 'ia' | 'trofeu' | 'calendario' | 'mural'
  | 'seta' | 'check' | 'mais' | 'alerta' | 'escudo' | 'pessoas' | 'link'
  | 'pdf' | 'email' | 'whatsapp' | 'foguete' | 'abas' | 'camadas' | 'busca'
  | 'relogio' | 'grafico' | 'play' | 'etiqueta' | 'fabrica' | 'loja'
  | 'maleta' | 'predio' | 'engrenagem' | 'raio';

const traco = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const desenhos: Record<NomeIcone, React.ReactNode> = {
  quadro: <><rect x="3" y="4" width="5.5" height="16" rx="1.5" {...traco} /><rect x="9.5" y="4" width="5.5" height="11" rx="1.5" {...traco} /><rect x="16" y="4" width="5" height="7" rx="1.5" {...traco} /></>,
  gantt: <><path d="M3 6h9M6 12h12M4 18h8" {...traco} /><circle cx="12" cy="6" r="1.6" {...traco} /><circle cx="18" cy="12" r="1.6" {...traco} /></>,
  painel: <><rect x="3" y="3" width="18" height="18" rx="2.5" {...traco} /><path d="M7 15.5v-3M12 15.5v-7M17 15.5v-5" {...traco} /></>,
  cronometro: <><circle cx="12" cy="13" r="7.5" {...traco} /><path d="M12 9.5V13l2.5 1.8M9.5 2.5h5" {...traco} /></>,
  relatorio: <><path d="M6 3h8l4 4v14H6z" {...traco} /><path d="M14 3v4h4" {...traco} /><path d="M9.5 17v-3.5M12.5 17v-6M15.5 17v-2" {...traco} /></>,
  aprovacao: <><path d="M4 12.5l4.5 4.5L20 6" {...traco} /><path d="M4 6.5h8" {...traco} opacity=".5" /></>,
  formulario: <><rect x="4" y="3" width="16" height="18" rx="2.5" {...traco} /><path d="M8 8h8M8 12h8M8 16h4" {...traco} /></>,
  financeiro: <><circle cx="12" cy="12" r="8.5" {...traco} /><path d="M14.5 9.2c-.6-.9-1.6-1.3-2.7-1.3-1.6 0-2.6.8-2.6 2 0 2.8 5.6 1.3 5.6 4.2 0 1.3-1.2 2.2-2.9 2.2-1.3 0-2.4-.5-3-1.5M12 6.2v11.6" {...traco} /></>,
  ia: <><path d="M12 3l1.8 4.4L18 9.2l-4.2 1.8L12 15.4l-1.8-4.4L6 9.2l4.2-1.8z" {...traco} /><path d="M18 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" {...traco} /></>,
  trofeu: <><path d="M7 4h10v5a5 5 0 01-10 0z" {...traco} /><path d="M7 5.5H4.5V7A3.5 3.5 0 007.6 10.5M17 5.5h2.5V7a3.5 3.5 0 01-3.1 3.5M9.5 20h5M12 14v6" {...traco} /></>,
  calendario: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...traco} /><path d="M3.5 10h17M8 3v4M16 3v4" {...traco} /><rect x="7" y="13" width="3.5" height="3" rx=".8" {...traco} /></>,
  mural: <><rect x="3.5" y="4.5" width="17" height="13" rx="2.5" {...traco} /><path d="M8 21l4-3.5 4 3.5M8 9h8M8 13h5" {...traco} /></>,
  seta: <path d="M5 12h13M12 5l7 7-7 7" {...traco} />,
  check: <path d="M4.5 12.5l5 5L20 6.5" {...traco} strokeWidth="2.4" />,
  mais: <path d="M12 5v14M5 12h14" {...traco} strokeWidth="2.2" />,
  alerta: <><path d="M12 3.5l9 16H3z" {...traco} /><path d="M12 9.5v4.5" {...traco} /><circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" /></>,
  escudo: <><path d="M12 3l7.5 3v6c0 4.2-3 7.7-7.5 9-4.5-1.3-7.5-4.8-7.5-9V6z" {...traco} /><path d="M9 12l2 2 4-4" {...traco} /></>,
  pessoas: <><circle cx="9" cy="8.5" r="3.2" {...traco} /><path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" {...traco} /><path d="M16 6.2a3.2 3.2 0 010 6M17.5 14.9c1.9.6 3.2 2.3 3.2 4.6" {...traco} opacity=".55" /></>,
  link: <><path d="M10.5 13.5a4 4 0 005.7 0l2.6-2.6a4 4 0 00-5.7-5.7l-1.3 1.3" {...traco} /><path d="M13.5 10.5a4 4 0 00-5.7 0l-2.6 2.6a4 4 0 005.7 5.7l1.3-1.3" {...traco} /></>,
  pdf: <><path d="M6 3h8l4 4v14H6z" {...traco} /><path d="M14 3v4h4" {...traco} /><path d="M9 13.5h1.5a1.3 1.3 0 010 2.6H9V18m0-4.5V18M14 13.5v4.5h.8a1.7 1.7 0 001.7-1.7v-1.1a1.7 1.7 0 00-1.7-1.7z" {...traco} strokeWidth="1.5" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2.5" {...traco} /><path d="M3.8 7l7.3 5a1.6 1.6 0 001.8 0l7.3-5" {...traco} /></>,
  whatsapp: <><path d="M3.8 20.2l1.4-4.1a7.7 7.7 0 111.9 2.2z" {...traco} /><path d="M9.2 9.3c.4 2.4 2.2 4.2 4.6 4.7l.8-1.3 1.8.8c-.3 1-1.2 1.6-2.3 1.5-2.9-.3-5.2-2.6-5.5-5.5-.1-1.1.5-2 1.5-2.3l.8 1.8z" {...traco} strokeWidth="1.5" /></>,
  foguete: <><path d="M13.5 3.5c3.4 1 5.9 3.6 7 7l-6.6 6.6-7-7z" {...traco} /><circle cx="14.5" cy="9.5" r="1.8" {...traco} /><path d="M7.5 16.5l-3 4 4-3M4.5 13.5l1-3 2.5-.5M10.5 19.5l3-1 .5-2.5" {...traco} /></>,
  abas: <><path d="M3 8.5h6V5a1.5 1.5 0 011.5-1.5h10A1.5 1.5 0 0122 5v3.5" {...traco} /><rect x="2" y="8.5" width="20" height="12" rx="2" {...traco} /><path d="M9 8.5V20.5" {...traco} opacity=".5" /></>,
  camadas: <><path d="M12 3.5l8.5 4.3-8.5 4.4-8.5-4.4z" {...traco} /><path d="M4.5 12.4l7.5 3.8 7.5-3.8M4.5 16.6l7.5 3.8 7.5-3.8" {...traco} opacity=".65" /></>,
  busca: <><circle cx="11" cy="11" r="6.5" {...traco} /><path d="M16 16l4.5 4.5" {...traco} /></>,
  relogio: <><circle cx="12" cy="12" r="8.5" {...traco} /><path d="M12 7.5V12l3 2" {...traco} /></>,
  grafico: <><path d="M3.5 18.5L9 12l3.5 3.2L20.5 6" {...traco} /><path d="M16 6h4.5v4.5" {...traco} /></>,
  play: <path d="M8 5.5l10 6.5-10 6.5z" {...traco} />,
  etiqueta: <><path d="M3.5 11.4V4.8a1.3 1.3 0 011.3-1.3h6.6a1.3 1.3 0 01.9.4l8 8a1.3 1.3 0 010 1.8l-6.6 6.6a1.3 1.3 0 01-1.8 0l-8-8a1.3 1.3 0 01-.4-.9z" {...traco} /><circle cx="7.8" cy="7.8" r="1.4" {...traco} /></>,
  fabrica: <><path d="M3.5 20.5v-9l5 3v-3l5 3V7l7 3.5v10z" {...traco} /><path d="M7 16.5h1.5M12 16.5h1.5M17 16.5h1.5" {...traco} /></>,
  loja: <><path d="M4 9.5V20h16V9.5" {...traco} /><path d="M3 9.5L5 4h14l2 5.5a3 3 0 01-6 0 3 3 0 01-6 0 3 3 0 01-6 0z" {...traco} /><path d="M9.5 20v-5.5h5V20" {...traco} /></>,
  maleta: <><rect x="3" y="7" width="18" height="13" rx="2.5" {...traco} /><path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 12.5h18" {...traco} /></>,
  predio: <><path d="M4 20.5V5.5a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0114 5.5v15" {...traco} /><path d="M14 10h4.5a1.5 1.5 0 011.5 1.5v9M7.5 8h3M7.5 12h3M7.5 16h3M16.5 14h1M16.5 17.5h1" {...traco} /></>,
  engrenagem: <><circle cx="12" cy="12" r="3.2" {...traco} /><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" {...traco} /></>,
  raio: <path d="M13.5 3L5.5 13.5h5L10 21l8.5-11h-5.3z" {...traco} />,
};

export function Icone({ nome, tamanho = 24, className = '' }: { nome: NomeIcone; tamanho?: number; className?: string }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {desenhos[nome]}
    </svg>
  );
}
