import { useState, type FormEvent } from 'react';
import { contato, conversar } from '../content/site';
import { Botao, BotaoWhatsapp, Revelar, Rotulo, Selo, TituloCinema } from './base';
import { Icone, type NomeIcone } from './Icone';
import { brl, usarValorEmRisco } from '../hooks/uteis';
import { dadosDeAtribuicao, novoEventId } from '../lib/atribuicao';
import { rastrear } from '../lib/pixel';

type Estado = 'parado' | 'enviando' | 'enviado' | 'email' | 'erro';

/** O servidor do Ariuno recebe o lead, cria o card no comercial e avisa a Meta. */
const ENDPOINT =
  (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || 'https://www.ariuno.com.br/api/leads/site';
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Mesma regra do servidor: DDD válido, 10 dígitos (fixo) ou 11 começando com 9 (celular). */
function whatsappValido(valor: string) {
  let d = valor.replace(/\D+/g, '');
  if ((d.length === 12 || d.length === 13) && d.startsWith('55')) d = d.slice(2);
  if (d.length !== 10 && d.length !== 11) return false;
  if (Number(d.slice(0, 2)) < 11 || d[1] === '0') return false;
  return d.length === 10 || d[2] === '9';
}

/** Máscara leve enquanto digita: (11) 98765-4321. */
function mascaraWhatsapp(valor: string) {
  const d = valor.replace(/\D+/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const rotuloDe = (lista: readonly { valor: string; rotulo: string }[], valor: string) =>
  lista.find((x) => x.valor === valor)?.rotulo || valor;

const campoBase =
  'w-full rounded-[12px] bg-paper px-4 py-[14px] text-[16px] text-ink placeholder:text-txt-3 transition-[background-color] duration-300 focus:bg-paper-2';

const DEPOIS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'email', titulo: 'Respondemos em 1 dia útil', texto: 'Com uma agenda de 30 minutos, sem apresentação genérica.' },
  { icone: 'busca', titulo: 'Olhamos a sua operação', texto: 'Entendemos o fluxo que você já usa e onde ele trava hoje.' },
  { icone: 'foguete', titulo: 'Montamos o piloto', texto: 'Um quadro real, com o seu time dentro, medido por 30 dias.' },
];

function Erro({ id, texto }: { id: string; texto?: string }) {
  if (!texto) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1 text-[13px] text-alerta-d">
      <Icone nome="alerta" tamanho={14} />
      {texto}
    </p>
  );
}

export default function Conversar() {
  const [estado, setEstado] = useState<Estado>('parado');
  const [erros, setErros] = useState<Record<string, string>>({});
  const [linkEmail, setLinkEmail] = useState('');
  const valorEmRisco = usarValorEmRisco();

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const form = evento.currentTarget;
    const dados = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // armadilha simples contra robô: campo invisível que só um robô preenche
    if (dados.assunto_extra) {
      setEstado('enviado');
      return;
    }

    const novosErros: Record<string, string> = {};
    if (!dados.nome?.trim()) novosErros.nome = 'Escreva o seu nome.';
    if (!dados.empresa?.trim()) novosErros.empresa = 'Escreva o nome da empresa.';
    if (!whatsappValido(dados.whatsapp ?? '')) novosErros.whatsapp = 'Confira o WhatsApp, com DDD.';
    if (!EMAIL_VALIDO.test(dados.email ?? '')) novosErros.email = 'Confira o e-mail, parece incompleto.';
    if (!dados.faixaUsuarios) novosErros.faixaUsuarios = 'Escolha uma faixa.';
    if (!dados.ferramentaAtual) novosErros.ferramentaAtual = 'Escolha uma opção.';
    if (!dados.consentimento) novosErros.consentimento = 'Precisamos do seu aceite para responder.';
    setErros(novosErros);
    if (Object.keys(novosErros).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(novosErros)[0]}"]`)?.focus();
      return;
    }

    setEstado('enviando');
    const eventId = novoEventId();
    const payload = {
      nome: dados.nome.trim(),
      empresa: dados.empresa.trim(),
      whatsapp: dados.whatsapp,
      email: dados.email.trim(),
      faixaUsuarios: dados.faixaUsuarios,
      ferramentaAtual: dados.ferramentaAtual,
      consentimento: true,
      ...(valorEmRisco > 0 ? { valorSimulado: Math.round(valorEmRisco) } : {}),
      ...dadosDeAtribuicao(),
      eventId,
      origem: 'site ariuno',
    };

    // O Apps Script do Google não responde à checagem prévia do navegador, então o
    // envio para ele vai como texto puro (o corpo continua sendo JSON).
    const paraAppsScript = ENDPOINT.includes('script.google.com');

    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: paraAppsScript
          ? { 'Content-Type': 'text/plain;charset=utf-8' }
          : { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });
      if (resposta.status === 400) {
        // O servidor recusou algum campo: mostra no próprio campo, sem cair no e-mail.
        const corpo = await resposta.json().catch(() => null);
        const campos = (corpo?.campos || {}) as Record<string, string>;
        if (Object.keys(campos).length) {
          setErros(campos);
          setEstado('parado');
          form.querySelector<HTMLElement>(`[name="${Object.keys(campos)[0]}"]`)?.focus();
          return;
        }
      }
      if (!resposta.ok) throw new Error(String(resposta.status));

      rastrear('Lead', { content_name: 'Piloto 30 dias', ...(payload.valorSimulado ? { value: payload.valorSimulado, currency: 'BRL' } : {}) }, eventId);
      // evento pronto para analytics, sem nenhuma ferramenta instalada por padrão
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: 'lead_enviado',
        formulario: 'piloto_30_dias',
        faixa_usuarios: payload.faixaUsuarios,
        ferramenta_atual: payload.ferramentaAtual,
        event_id: eventId,
      });
      form.reset();
      setEstado('enviado');
    } catch {
      // Só aqui o e-mail entra: o envio falhou e o lead não pode se perder.
      const corpo = [
        `Nome: ${payload.nome}`,
        `Empresa: ${payload.empresa}`,
        `WhatsApp: ${payload.whatsapp}`,
        `E-mail: ${payload.email}`,
        `Quantas pessoas usariam: ${rotuloDe(conversar.faixasUsuarios, payload.faixaUsuarios)}`,
        `Onde a operação roda hoje: ${rotuloDe(conversar.ferramentas, payload.ferramentaAtual)}`,
        ...(payload.valorSimulado ? [`Perda simulada: ${brl(payload.valorSimulado)} por mês`] : []),
        ...(payload.utm_campaign ? [`Campanha: ${payload.utm_campaign}`] : []),
      ].join('\n');
      setLinkEmail(
        `mailto:${contato.email}?subject=${encodeURIComponent(`Piloto do Ariuno · ${payload.empresa}`)}&body=${encodeURIComponent(corpo)}`,
      );
      setEstado('erro');
    }
  }

  const rotuloEnvio =
    valorEmRisco > 0 ? `Quero recuperar ${brl(valorEmRisco)} por mês` : conversar.enviar;

  return (
    <section id="conversar" className="escuro relative overflow-hidden bg-ink py-[clamp(68px,9vw,132px)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 hidden h-[420px] w-[420px] rounded-full opacity-[0.13] lg:block"
        style={{ background: 'radial-gradient(circle,#6A5CFF,transparent 66%)' }}
      />
      <div className="limite relative">
        <div className="grid gap-[clamp(32px,4vw,64px)] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1fr)]">
          <div>
            <Revelar>
              <Rotulo n="12" texto={conversar.eyebrow} claro />
            </Revelar>
            <TituloCinema linhas={conversar.titulo} destaque={conversar.destaque} claro classe="titulo-2" />
            <Revelar atraso={140}>
              <p className="lead mt-6">{conversar.lead}</p>
            </Revelar>

            {contato.whatsapp && (
              <Revelar atraso={170}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <BotaoWhatsapp numero={contato.whatsapp} mensagem={contato.whatsappMensagem} grande />
                  <span className="text-[14px] leading-snug text-white/55">
                    Prefere conversar agora?
                    <span className="block text-white/40">{contato.whatsappVisivel}</span>
                  </span>
                </div>
              </Revelar>
            )}

            <Revelar atraso={200}>
              <ol className="mt-9 flex flex-col gap-[2px]">
                {DEPOIS.map((passo, i) => (
                  <li key={passo.titulo} className="flex items-start gap-4 rounded-[14px] bg-white/[0.06] px-5 py-4">
                    <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-lime">
                      <Icone nome={passo.icone} tamanho={20} />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 font-display text-[17px] font-bold tracking-[-0.02em] text-white">
                        <span className="font-mono text-[11px] text-teal">{String(i + 1).padStart(2, '0')}</span>
                        {passo.titulo}
                      </span>
                      <span className="mt-1 block text-[15px] leading-snug text-white/60">{passo.texto}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Revelar>

            <Revelar atraso={260}>
              <div className="mt-8 flex flex-col gap-3 text-[15px]">
                <a
                  href={`mailto:${contato.email}`}
                  className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Icone nome="email" tamanho={19} />
                  </span>
                  {contato.email}
                </a>

              </div>
            </Revelar>
          </div>

          <Revelar atraso={180}>
            <div className="overflow-hidden rounded-[var(--radius-peca)] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-paper-2 px-[clamp(22px,2.6vw,40px)] py-4">
                <p className="flex items-center gap-2 font-display text-[16px] font-bold tracking-[-0.02em] text-ink">
                  <span className="text-iris"><Icone nome="foguete" tamanho={19} /></span>
                  Piloto de 30 dias
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-txt-2">sem fidelidade</p>
              </div>

              <div className="p-[clamp(22px,2.6vw,40px)]">
                {estado === 'enviado' || estado === 'email' ? (
                  <div role="status" className="py-6">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime" aria-hidden="true">
                      <Icone nome="check" tamanho={26} />
                    </span>
                    <h3 className="mt-5 font-display text-[26px] font-bold tracking-[-0.03em] text-ink">
                      {estado === 'email' ? 'Abrimos o seu e-mail' : 'Recebemos o seu pedido'}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-txt-2">
                      {estado === 'email'
                        ? `Seu programa de e-mail abriu com a mensagem pronta para ${contato.email}. Se nada acontecer, escreva para esse endereço.`
                        : conversar.sucesso}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Selo icone="relogio">Resposta em 1 dia útil</Selo>
                      <Selo icone="pessoas">Você fala com quem construiu</Selo>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="nome" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.nome}
                        </label>
                        <input id="nome" name="nome" type="text" autoComplete="name" maxLength={120} className={campoBase} aria-invalid={!!erros.nome} aria-describedby={erros.nome ? 'erro-nome' : undefined} />
                        <Erro id="erro-nome" texto={erros.nome} />
                      </div>
                      <div>
                        <label htmlFor="empresa" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.empresa}
                        </label>
                        <input id="empresa" name="empresa" type="text" autoComplete="organization" maxLength={160} className={campoBase} aria-invalid={!!erros.empresa} aria-describedby={erros.empresa ? 'erro-empresa' : undefined} />
                        <Erro id="erro-empresa" texto={erros.empresa} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="whatsapp" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.whatsapp}
                        </label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          placeholder="(11) 90000-0000"
                          className={campoBase}
                          onInput={(e) => {
                            const el = e.currentTarget;
                            el.value = mascaraWhatsapp(el.value);
                          }}
                          aria-invalid={!!erros.whatsapp}
                          aria-describedby={erros.whatsapp ? 'erro-whatsapp' : undefined}
                        />
                        <Erro id="erro-whatsapp" texto={erros.whatsapp} />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.email}
                        </label>
                        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={200} className={campoBase} aria-invalid={!!erros.email} aria-describedby={erros.email ? 'erro-email' : undefined} />
                        <Erro id="erro-email" texto={erros.email} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="faixaUsuarios" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.faixaUsuarios}
                        </label>
                        <select id="faixaUsuarios" name="faixaUsuarios" className={campoBase} defaultValue="" aria-invalid={!!erros.faixaUsuarios} aria-describedby={erros.faixaUsuarios ? 'erro-faixaUsuarios' : undefined}>
                          <option value="" disabled>
                            {conversar.escolha}
                          </option>
                          {conversar.faixasUsuarios.map((f) => (
                            <option key={f.valor} value={f.valor}>
                              {f.rotulo}
                            </option>
                          ))}
                        </select>
                        <Erro id="erro-faixaUsuarios" texto={erros.faixaUsuarios} />
                      </div>
                      <div>
                        <label htmlFor="ferramentaAtual" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.ferramentaAtual}
                        </label>
                        <select id="ferramentaAtual" name="ferramentaAtual" className={campoBase} defaultValue="" aria-invalid={!!erros.ferramentaAtual} aria-describedby={erros.ferramentaAtual ? 'erro-ferramentaAtual' : undefined}>
                          <option value="" disabled>
                            {conversar.escolha}
                          </option>
                          {conversar.ferramentas.map((f) => (
                            <option key={f.valor} value={f.valor}>
                              {f.rotulo}
                            </option>
                          ))}
                        </select>
                        <Erro id="erro-ferramentaAtual" texto={erros.ferramentaAtual} />
                      </div>
                    </div>

                    {/* campo isca, invisível para pessoas */}
                    <input type="text" name="assunto_extra" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />

                    <div>
                      <label htmlFor="consentimento" className="flex items-start gap-3 text-[14px] leading-snug text-txt-2">
                        <input id="consentimento" name="consentimento" type="checkbox" className="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[#6A5CFF]" aria-invalid={!!erros.consentimento} aria-describedby={erros.consentimento ? 'erro-consentimento' : undefined} />
                        <span>
                          Autorizo a 75 LAB a me contatar sobre o Ariuno pelo WhatsApp e por e-mail, e li a{' '}
                          <a href="./privacidade.html" className="text-iris-d underline underline-offset-2">
                            política de privacidade
                          </a>
                          , que explica o uso dos meus dados e do Pixel da Meta.
                        </span>
                      </label>
                      <Erro id="erro-consentimento" texto={erros.consentimento} />
                    </div>

                    {estado === 'erro' && (
                      <div role="alert" className="flex flex-col gap-3 rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[14px] leading-snug text-alerta-d">
                        <p className="flex items-start gap-2">
                          <span className="mt-[2px] shrink-0"><Icone nome="alerta" tamanho={16} /></span>
                          <span>{conversar.erro}</span>
                        </p>
                        <a
                          href={linkEmail}
                          onClick={() => setEstado('email')}
                          className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 font-bold text-white"
                        >
                          <Icone nome="email" tamanho={16} />
                          {conversar.erroBotao}
                        </a>
                      </div>
                    )}

                    <div className="mt-2">
                      <Botao submit carregando={estado === 'enviando'} icone="foguete" grande className="w-full sm:w-auto">
                        {estado === 'enviando' ? conversar.enviando : rotuloEnvio}
                      </Botao>
                      <p className="mt-3 flex items-center gap-2 text-[13px] text-txt-3">
                        <Icone nome="escudo" tamanho={15} />
                        Seus dados ficam com a gente. Sem disparo de propaganda.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
