import Cabecalho from './components/Cabecalho';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Calculadora from './components/Calculadora';
import Ciclo from './components/Ciclo';
import Produto from './components/Produto';
import Horas from './components/Horas';
import Operacoes from './components/Operacoes';
import Comparativo from './components/Comparativo';
import Investimento from './components/Investimento';
import Implantacao from './components/Implantacao';
import Perguntas from './components/Perguntas';
import Conversar from './components/Conversar';
import Rodape from './components/Rodape';
import Capitulos from './components/Capitulos';
import { BarraCta, CtaFaixa, Cursor, Lightbox } from './components/base';
import { contato, site } from './content/site';

export default function App() {
  return (
    <>
      <Cursor />
      <Lightbox />
      <span className="grao" aria-hidden="true" />
      <Cabecalho />
      <main>
        <Hero />
        <Manifesto />
        <Calculadora />
        <Ciclo />
        <Produto />
        <Horas />

        <div className="bg-paper pb-[clamp(20px,3vw,40px)] pt-0">
          <CtaFaixa
            icone="relatorio"
            titulo="Seu cliente merece ver isso na próxima reunião"
            texto="Nos 15 dias de teste, o primeiro relatório já sai com os dados da sua operação, não com dados de exemplo."
            botao="Criar conta e testar 15 dias"
            href={site.cadastroUrl}
            externo
            selo="Sem cartão, sem contrato, mínimo de 5 usuários."
          />
        </div>

        <Operacoes />
        <Comparativo />

        <div className="bg-white pb-[clamp(30px,4vw,60px)]">
          <CtaFaixa
            icone="etiqueta"
            titulo="Uma assinatura no lugar de cinco"
            texto="Antes de comparar preço, compare o que cada uma resolve. Fazemos essa conta com você, com os números da sua empresa."
            botao="Falar com a gente"
            selo="Resposta em 1 dia útil."
            whatsapp={contato.whatsapp}
            mensagem={contato.whatsappMensagem}
          />
        </div>

        <Investimento />
        <Implantacao />
        <Perguntas />
        <Conversar />
      </main>
      <Capitulos />
      <Rodape />
      <BarraCta email={contato.email} whatsapp={contato.whatsapp} mensagem={contato.whatsappMensagem} />
    </>
  );
}
