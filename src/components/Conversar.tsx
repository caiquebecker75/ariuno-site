import { useState, type FormEvent } from 'react';
import { contato, conversar } from '../content/site';
import { Botao, Revelar, Rotulo, Titulo } from './base';

type Estado = 'parado' | 'enviando' | 'enviado' | 'email' | 'erro';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const campoBase =
  'w-full rounded-[12px] bg-paper px-4 py-[14px] text-[16px] text-ink placeholder:text-txt-3 transition-[background-color] duration-300 focus:bg-paper-2';

export default function Conversar() {
  const [estado, setEstado] = useState<Estado>('parado');
  const [erros, setErros] = useState<Record<string, string>>({});

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

  return (
    <section id="conversar" className="secao escuro bg-ink">
      <div className="limite">
        <div className="grid gap-[clamp(32px,4vw,64px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
          <div>
            <Revelar>
              <Rotulo n="12" texto={conversar.eyebrow} claro />
            </Revelar>
            <Revelar atraso={80}>
              <Titulo linhas={conversar.titulo} destaque={conversar.destaque} claro classe="titulo-2" />
            </Revelar>
            <Revelar atraso={140}>
              <p className="lead mt-6">{conversar.lead}</p>
            </Revelar>

            <Revelar atraso={200}>
              <div className="mt-9 flex flex-col gap-3 text-[15px]">
                <a href={`mailto:${contato.email}`} className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 7l9 6 9-6M3 7v10h18V7H3z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {contato.email}
                </a>
                {contato.whatsapp && (
                  <a
                    href={`https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(contato.whatsappMensagem)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 20l1.4-4A8 8 0 1112 20a8 8 0 01-4-1L4 20z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Falar no WhatsApp
                  </a>
                )}
              </div>
            </Revelar>
          </div>

          <Revelar atraso={180}>
            <div className="rounded-[var(--radius-peca)] bg-white p-[clamp(22px,2.6vw,40px)]">
              {estado === 'enviado' || estado === 'email' ? (
                <div role="status" className="py-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12.5l5 5L20 6.5" stroke="#0B0D1E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-[24px] font-bold tracking-[-0.03em] text-ink">
                    {estado === 'email' ? 'Abrimos o seu e-mail' : 'Recebemos o seu pedido'}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-txt-2">
                    {estado === 'email'
                      ? `Seu programa de e-mail abriu com a mensagem pronta para ${contato.email}. Se nada acontecer, escreva para esse endereço.`
                      : conversar.sucesso}
                  </p>
                </div>
              ) : (
                <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nome" className="mb-2 block text-[14px] font-medium text-txt-2">
                        {conversar.campos.nome}
                      </label>
                      <input id="nome" name="nome" type="text" autoComplete="name" className={campoBase} aria-invalid={!!erros.nome} aria-describedby={erros.nome ? 'erro-nome' : undefined} />
                      {erros.nome && <p id="erro-nome" className="mt-2 text-[13px] text-alerta">{erros.nome}</p>}
                    </div>
                    <div>
                      <label htmlFor="empresa" className="mb-2 block text-[14px] font-medium text-txt-2">
                        {conversar.campos.empresa}
                      </label>
                      <input id="empresa" name="empresa" type="text" autoComplete="organization" className={campoBase} aria-invalid={!!erros.empresa} aria-describedby={erros.empresa ? 'erro-empresa' : undefined} />
                      {erros.empresa && <p id="erro-empresa" className="mt-2 text-[13px] text-alerta">{erros.empresa}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-[14px] font-medium text-txt-2">
                        {conversar.campos.email}
                      </label>
                      <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={campoBase} aria-invalid={!!erros.email} aria-describedby={erros.email ? 'erro-email' : undefined} />
                      {erros.email && <p id="erro-email" className="mt-2 text-[13px] text-alerta">{erros.email}</p>}
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
                    {erros.aceite && <p className="mt-2 text-[13px] text-alerta">{erros.aceite}</p>}
                  </div>

                  {estado === 'erro' && (
                    <p role="alert" className="rounded-[12px] bg-[#FDECEA] px-4 py-3 text-[14px] leading-snug text-alerta">
                      {conversar.erro}{' '}
                      <a href={`mailto:${contato.email}`} className="font-bold underline">
                        {contato.email}
                      </a>
                    </p>
                  )}

                  <div className="mt-2">
                    <Botao submit carregando={estado === 'enviando'}>
                      {estado === 'enviando' ? conversar.enviando : conversar.enviar}
                    </Botao>
                  </div>
                </form>
              )}
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
