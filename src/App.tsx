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
import { Cursor } from './components/base';

export default function App() {
  return (
    <>
      <Cursor />
      <span className="grao" aria-hidden="true" />
      <Cabecalho />
      <main>
        <Hero />
        <Manifesto />
        <Calculadora />
        <Ciclo />
        <Produto />
        <Horas />
        <Operacoes />
        <Comparativo />
        <Investimento />
        <Implantacao />
        <Perguntas />
        <Conversar />
      </main>
      <Rodape />
    </>
  );
}
