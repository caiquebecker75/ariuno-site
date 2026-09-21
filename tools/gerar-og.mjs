/**
 * Gera a imagem de compartilhamento (og.jpg, 1200x630) com as fontes da marca.
 * Uso: node tools/gerar-og.mjs   (precisa do site rodando em npm run dev)
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const SAIDA = fileURLToPath(new URL('../public/og.jpg', import.meta.url));
// o print vem do servidor de desenvolvimento (file:// e bloqueado nesta pagina)
const PRINT = process.env.PRINT_URL || 'http://localhost:5178/produto/kanban.webp';

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Space+Grotesk:wght@400;500&family=Space+Mono:wght@700&display=block">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0B0D1E; font-family: 'Space Grotesk', sans-serif; overflow: hidden; position: relative; }
  .traco { position: absolute; right: -120px; top: -60px; width: 760px; height: 760px; opacity: .16; }
  .scrim { position: absolute; left: 0; top: 0; width: 760px; height: 630px; background: linear-gradient(90deg,#0B0D1E 58%, rgba(11,13,30,0)); z-index: 2; }
  .caixa { z-index: 3; position: absolute; inset: 0; padding: 64px 68px; display: flex; flex-direction: column; justify-content: space-between; }
  .marca { display: flex; align-items: center; gap: 12px; }
  .marca span { font-family: 'Archivo'; font-weight: 800; font-size: 30px; color: #fff; letter-spacing: -.045em; }
  h1 { font-family: 'Archivo'; font-weight: 800; font-size: 70px; line-height: 1.02; letter-spacing: -.035em; color: #fff; max-width: 600px; }
  h1 em { font-style: normal; background: linear-gradient(96deg,#8E82FF,#4285FF 46%,#00C2A8); -webkit-background-clip: text; background-clip: text; color: transparent; }
  p { color: rgba(255,255,255,.62); font-size: 22px; margin-top: 20px; max-width: 560px; line-height: 1.45; }
  .pe { display: flex; align-items: center; gap: 14px; font-family: 'Space Mono'; font-size: 14px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.45); }
  .pe i { width: 7px; height: 7px; border-radius: 50%; background: #C0EE4E; display: inline-block; }
  .print { z-index: 1; position: absolute; right: -120px; bottom: 46px; width: 640px; border-radius: 14px; box-shadow: 0 40px 90px -30px rgba(0,0,0,.7); transform: rotate(-3deg); }
</style></head><body>
<svg class="traco" viewBox="0 0 100 100" fill="none"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6A5CFF"/><stop offset="45%" stop-color="#4285FF"/><stop offset="100%" stop-color="#00C2A8"/></linearGradient></defs>
<path d="M25,80 C10,80 15,55 30,55 C42,55 45,68 40,80 L75,15 L95,75" stroke="url(#g)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
<div class="scrim"></div><img class="print" src="${PRINT}" alt="">
<div class="caixa">
  <div class="marca">
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none"><defs><linearGradient id="m" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6A5CFF"/><stop offset="45%" stop-color="#4285FF"/><stop offset="100%" stop-color="#00C2A8"/></linearGradient></defs>
    <path d="M25,80 C10,80 15,55 30,55 C42,55 45,68 40,80 L75,15 L95,75" stroke="url(#m)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M40,80 L95,75" stroke="url(#m)" stroke-width="12" stroke-linecap="round"/></svg>
    <span>ariuno</span>
  </div>
  <div>
    <h1>Uma plataforma.<br>Toda a sua <em>operação.</em></h1>
    <p>Do briefing à nota fiscal num sistema só.</p>
  </div>
  <div class="pe"><i></i> plataforma de gestão · feita pela 75 LAB</div>
</div>
</body></html>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await pagina.setContent(html, { waitUntil: 'networkidle' });
await pagina.waitForTimeout(1500);
await pagina.screenshot({ path: SAIDA, type: 'jpeg', quality: 86 });
await navegador.close();
console.log('og.jpg gerado em public/');
