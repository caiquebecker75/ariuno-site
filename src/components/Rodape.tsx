import { contato, nav, rodape, site } from '../content/site';
import { Marca } from './base';
import { Icone } from './Icone';

export default function Rodape() {
  return (
    <footer className="bg-ink pb-10 pt-[clamp(44px,5vw,72px)] text-white">
      <div className="limite">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Marca tamanho={34} />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/50">{rodape.frase}</p>
            <a
              href={site.plataforma}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[14px] font-bold transition-colors duration-300 hover:bg-white/20"
            >
              Entrar na plataforma
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <nav aria-label="Rodapé">
            <p className="rotulo mb-4 text-white/55">Navegar</p>
            <ul className="flex flex-col gap-[10px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[15px] text-white/60 transition-colors duration-300 hover:text-white">
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li>
                <a href="#conversar" className="text-[15px] text-white/60 transition-colors duration-300 hover:text-white">
                  Agendar conversa
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="rotulo mb-4 text-white/55">Contato</p>
            <ul className="flex flex-col gap-[10px] text-[15px]">
              <li>
                <a href={`mailto:${contato.email}`} className="flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-white">
                  <Icone nome="email" tamanho={16} />
                  {contato.email}
                </a>
              </li>
              {contato.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${contato.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    <Icone nome="whatsapp" tamanho={16} />
                    WhatsApp
                  </a>
                </li>
              )}
              <li className="text-white/55">{contato.cidade}</li>
              <li>
                <a
                  href={contato.empresaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {contato.empresa}
                </a>
              </li>
              <li>
                <a
                  href={site.deck}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  Apresentação comercial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 pb-[76px] pt-6 sm:pb-[72px] text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{rodape.legal}</p>
          <p className="flex gap-5">
            <a href="./privacidade.html" className="transition-colors duration-300 hover:text-white/70">
              Política de privacidade
            </a>
            <a href="#topo" className="transition-colors duration-300 hover:text-white/70">
              Voltar ao topo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
