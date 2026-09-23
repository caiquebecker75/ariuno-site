import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/base.css';
import App from './App';
import { iniciarAtribuicao } from './lib/atribuicao';
import { iniciarPixel } from './lib/pixel';

// antes do React: a URL de entrada (utm, fbclid) ainda está intacta
iniciarAtribuicao();
iniciarPixel();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
