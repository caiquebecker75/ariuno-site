import { useState, type FormEvent } from 'react';
import { contato, conversar } from '../content/site';
import { Botao, BotaoWhatsapp, Revelar, Rotulo, Selo, TituloCinema } from './base';
import { Icone, type NomeIcone } from './Icone';
import { brl, usarValorEmRisco } from '../hooks/uteis';

type Estado = 'parado' | 'enviando' | 'enviado' | 'email' | 'erro';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const campoBase =
  'w-full rounded-[12px] bg-paper px-4 py-[14px] text-[16px] text-ink placeholder:text-txt-3 transition-[background-color] duration-300 focus:bg-paper-2';

const DEPOIS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'email', titulo: 'Respondemos em 1 dia útil', texto: 'Com uma agenda de 30 minutos, sem apresentação genérica.' },
  { icone: 'busca', titulo: 'Olhamos a sua operação', texto: 'Entendemos o fluxo que você já usa e onde ele trava hoje.' },
  { icone: 'foguete', titulo: 'Montamos o piloto', texto: 'Um quadro real, com o seu time dentro, medido por 30 dias.' },
];

export default function Conversar() {
  const [estado, setEstado] = useState<Estado>('parado');
  const [erros, setErros] = useState<Record<string, string>>({});
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
    if (!EMAIL_VALIDO.test(dados.email ?? '')) novosErros.email = 'Confira o e-mail, parece incompleto.';
    if (!dados.aceite) novosErros.aceite = 'Precisamos do seu aceite para responder.';
    setErros(novosErros);
    if (Object.keys(novosErros).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(novosErros)[0]}"]`)?.focus();
      return;
    }

    setEstado('enviando');

    // evento pronto para analytics, sem nenhuma ferramenta instalada por padrão
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
      event: 'lead_enviado',
      formulario: 'piloto_30_dias',
      tamanho_time: dados.time,
    });

    if (!ENDPOINT) {
      const corpo = [
        `Nome: ${dados.nome}`,
        `Empresa: ${dados.empresa}`,
        `E-mail: ${dados.email}`,
        `Telefone: ${dados.telefone || 'não informado'}`,
        `Tamanho do time: ${dados.time}`,
        '',
        dados.mensagem || '',
      ].join('\n');
      window.location.href = `mailto:${contato.email}?subject=${encodeURIComponent(
        `Piloto do Ariuno · ${dados.empresa}`,
      )}&body=${encodeURIComponent(corpo)}`;
      setEstado('email');
      return;
    }

    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...dados, origem: 'site ariuno' }),
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      form.reset();
      setEstado('enviado');
    } catch {
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
                        <input id="nome" name="nome" type="text" autoComplete="name" className={campoBase} aria-invalid={!!erros.nome} aria-describedby={erros.nome ? 'erro-nome' : undefined} />
                        {erros.nome && <p id="erro-nome" className="mt-2 flex items-center gap-1 text-[13px] text-alerta-d"><Icone nome="alerta" tamanho={14} />{erros.nome}</p>}
                      </div>
                      <div>
                        <label htmlFor="empresa" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.empresa}
                        </label>
                        <input id="empresa" name="empresa" type="text" autoComplete="organization" className={campoBase} aria-invalid={!!erros.empresa} aria-describedby={erros.empresa ? 'erro-empresa' : undefined} />
                        {erros.empresa && <p id="erro-empresa" className="mt-2 flex items-center gap-1 text-[13px] text-alerta-d"><Icone nome="alerta" tamanho={14} />{erros.empresa}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.email}
                        </label>
                        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={campoBase} aria-invalid={!!erros.email} aria-describedby={erros.email ? 'erro-email' : undefined} />
                        {erros.email && <p id="erro-email" className="mt-2 flex items-center gap-1 text-[13px] text-alerta-d"><Icone nome="alerta" tamanho={14} />{erros.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="telefone" className="mb-2 block text-[14px] font-medium text-txt-2">
                          {conversar.campos.telefone}
                        </label>
                        <input id="telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel" className={campoBase} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="time" className="mb-2 block text-[14px] font-medium text-txt-2">
                        {conversar.campos.time}
                      </label>
                      <select id="time" name="time" className={campoBase} defaultValue={conversar.tamanhos[2]}>
                        {conversar.tamanhos.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="mb-2 block text-[14px] font-medium text-txt-2">
                        {conversar.campos.mensagem}
                      </label>
                      <textarea id="mensagem" name="mensagem" rows={3} className={`${campoBase} resize-y`} />
                    </div>

                    {/* campo isca, invisível para pessoas */}
                    <input type="text" name="assunto_extra" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px opacity-0" />

                    <div>
                      <label htmlFor="aceite" className="flex items-start gap-3 text-[14px] leading-snug text-txt-2">
                        <input id="aceite" name="aceite" type="checkbox" className="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[#6A5CFF]" aria-invalid={!!erros.aceite} />
                        <span>
                          Autorizo o contato da 75 LAB sobre o Ariuno e li a{' '}
                          <a href="./privacidade.html" className="text-iris-d underline underline-offset-2">
                            política de privacidade
                          </a>
                          .
                        </span>
                      </label>
                      {erros.aceite && <p className="mt-2 flex items-center gap-1 text-[13px] text-alerta-d"><Icone nome="alerta" tamanho={14} />{erros.aceite}</p>}
                    </div>

                    {estado === 'erro' && (
                      <p role="alert" className="flex items-start gap-2 rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[14px] leading-snug text-alerta-d">
                        <span className="mt-[2px] shrink-0"><Icone nome="alerta" tamanho={16} /></span>
                        <span>
                          {conversar.erro}{' '}
                          <a href={`mailto:${contato.email}`} className="font-bold underline">
                            {contato.email}
                          </a>
                        </span>
                      </p>
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
