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
import { contato } from './content/site';

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
            texto="No piloto, o primeiro relatório sai com os dados da sua operação, não com dados de exemplo."
            botao="Quero o piloto de 30 dias"
            selo="Sem fidelidade, mínimo de 5 usuários."
          />
        </div>

        <Operacoes />
        <Comparativo />

        <div className="bg-white pb-[clamp(30px,4vw,60px)]">
          <CtaFaixa
            icone="etiqueta"
            titulo="Uma assinatura no lugar de cinco"
            texto="Antes de comparar preço, compare o que cada uma resolve. Fazemos essa conta com você, com os números da sua empresa."
            botao="Pedir a minha proposta"
            selo="Resposta em 1 dia útil."
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
