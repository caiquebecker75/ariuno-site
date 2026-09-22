import { useEffect, useState } from 'react';
import { nav, site } from '../content/site';
import { Botao, Marca } from './base';

export default function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [secao, setSecao] = useState('');

  useEffect(() => {
    const aoRolar = () => {
      const altura = document.body.scrollHeight - innerHeight;
      setProgresso(altura > 0 ? Math.min(1, scrollY / altura) : 0);
      setRolou(scrollY > 24);
    };
    aoRolar();
    addEventListener('scroll', aoRolar, { passive: true });
    return () => removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    const alvos = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => Boolean(el));
    if (!alvos.length) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setSecao(`#${visivel.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    addEventListener('keydown', tecla);
    return () => {
      document.body.style.overflow = '';
      removeEventListener('keydown', tecla);
    };
  }, [aberto]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-iris focus:px-5 focus:py-3 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,padding] duration-500"
        style={{
          backgroundColor: rolou ? 'rgb(11 13 30 / 0.92)' : 'transparent',
          backdropFilter: rolou ? 'blur(14px)' : 'none',
          paddingBlock: rolou ? 12 : 20,
        }}
      >
        <div className="limite flex items-center justify-between gap-6">
          <a href="#topo" aria-label="Ariuno, início da página">
            <Marca />
          </a>

          <nav aria-label="Seções do site" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={secao === item.href ? 'true' : undefined}
                className="text-[14px] font-medium transition-colors duration-300"
                style={{ color: secao === item.href ? '#fff' : 'rgb(255 255 255 / 0.66)' }}
              >
                {item.rotulo}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.plataforma}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[14px] font-medium text-white/70 transition-colors duration-300 hover:text-white sm:block"
            >
              Entrar
            </a>
            <div className="hidden sm:block">
              <Botao href="#conversar" tipo="claro" icone="foguete">
                Agendar piloto
              </Botao>
            </div>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 lg:hidden"
            >
              <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {aberto ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{
            transform: `scaleX(${progresso})`,
            background: 'linear-gradient(90deg, #6A5CFF, #4285FF 45%, #00C2A8)',
          }}
        />
      </header>

      <div
        id="menu-mobile"
        hidden={!aberto}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 lg:hidden"
      >
        <nav aria-label="Menu principal" className="flex flex-col gap-1">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className="font-display text-[34px] font-extrabold tracking-[-0.03em] text-white"
              style={{ opacity: aberto ? 1 : 0, transition: `opacity .4s ${80 + i * 55}ms` }}
            >
              {item.rotulo}
            </a>
          ))}
        </nav>
        <div className="mt-10 flex flex-col gap-4">
          <Botao href="#conversar" tipo="claro" icone="foguete" grande onClick={() => setAberto(false)}>
            Agendar o piloto de 30 dias
          </Botao>
          <a href={site.plataforma} target="_blank" rel="noopener noreferrer" className="text-white/60">
            Entrar na plataforma
          </a>
        </div>
      </div>
    </>
  );
}
