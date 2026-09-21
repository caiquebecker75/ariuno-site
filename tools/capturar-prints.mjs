/**
 * Captura os prints do produto direto da demonstração pública do Ariuno
 * (dados fictícios, nenhuma informação de cliente real).
 *
 *   npm run shots            captura tudo
 *   npm run shots -- kanban  captura só um alvo
 *
 * Depois rode `npm run otimizar-imagens` para gerar os webp usados no site.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const DEMO = 'https://ariuno.com.br/?demo=1';
const SAIDA = fileURLToPath(new URL('../public/produto/', import.meta.url));
const LARGURA = 1600;
const ALTURA = 1000;

/** nav: item da barra lateral · aba: aba interna · ancora: rola até este texto */
const ALVOS = [
  { id: 'kanban', nav: 'Tarefas' },
  { id: 'lista', nav: 'Tarefas', aba: 'Lista' },
  { id: 'gantt', nav: 'Tarefas', aba: 'Gantt' },
  { id: 'calendario', nav: 'Tarefas', aba: 'Calendário' },
  { id: 'visao-geral', nav: 'Relatórios' },
  { id: 'produtividade', nav: 'Relatórios', ancora: 'Horas registradas por dia' },
  { id: 'relatorio-cliente', nav: 'Relatórios', ancora: 'Horas por cliente' },
  { id: 'planner', nav: 'Planner' },
  { id: 'projetos', nav: 'Projetos' },
  { id: 'clientes', nav: 'Clientes' },
  { id: 'equipe', nav: 'Equipe' },
  { id: 'arena', nav: 'Arena Ariuno' },
  { id: 'solicitacoes', nav: 'Solicitações', aba: 'Recebidas' },
  { id: 'formularios', nav: 'Formulários' },
  { id: 'mural', nav: 'Mural & Recados' },
  { id: 'portal', nav: 'Meu Portal' },
  { id: 'financeiro', nav: 'Financeiro', grupo: 'Departamentos' },
  { id: 'social', nav: 'Social Mídia', grupo: 'Departamentos' },
  { id: 'ia', ia: true },
];

/** Esconde o que é da demonstração, não do produto. */
const LIMPEZA = `
  (function () {
    const lixo = ['Sair da demonstração', 'TOUR DA', 'TOUR COMPLETO', 'Modo demonstração', 'Reunião'];
    document.querySelectorAll('button, div').forEach((el) => {
      const t = (el.textContent || '').trim();
      if (!t || t.length > 60) return;
      if (lixo.some((l) => t.includes(l))) {
        const alvo = el.closest('div[class*="fixed"]') || el;
        alvo.style.display = 'none';
      }
    });
  })();
`;

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

async function capturar() {
  const filtro = process.argv.slice(2);
  const lista = filtro.length ? ALVOS.filter((a) => filtro.includes(a.id)) : ALVOS;
  await mkdir(SAIDA, { recursive: true });

  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({
    viewport: { width: LARGURA, height: ALTURA },
    deviceScaleFactor: 2,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  });

  console.log('abrindo a demonstração...');
  await pagina.goto(DEMO, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await pausa(14000);
  await pagina.keyboard.press('Escape');
  await pausa(1000);

  for (const alvo of lista) {
    try {
      if (alvo.grupo) {
        const aberto = await pagina.$(`aside >> text=${alvo.nav}`);
        if (!aberto) {
          await pagina.click(`aside >> text=${alvo.grupo}`, { timeout: 5000 });
          await pausa(800);
        }
      }
      if (alvo.nav) {
        await pagina.click(`aside >> text=${alvo.nav}`, { timeout: 8000 });
        await pausa(3500);
      }
      if (alvo.aba) {
        await pagina.click(`button:has-text("${alvo.aba}")`, { timeout: 8000 });
        await pausa(3000);
      }
      if (alvo.ia) {
        await pagina.click('button:has-text("Ariuno IA")', { timeout: 8000 });
        await pausa(3500);
      }
      if (alvo.ancora) {
        await pagina.evaluate((texto) => {
          const alvo = [...document.querySelectorAll('h1,h2,h3,h4')].find((h) => h.textContent.includes(texto));
          alvo?.scrollIntoView({ block: 'start' });
        }, alvo.ancora);
        await pausa(1800);
      }
      await pagina.evaluate(LIMPEZA);
      await pausa(400);
      await pagina.screenshot({ path: `${SAIDA}${alvo.id}.png` });
      console.log('capturado:', alvo.id);
    } catch (erro) {
      console.log('falhou:', alvo.id, String(erro.message).slice(0, 90));
    }
  }
  await navegador.close();
  console.log('prints em public/produto/');
}

capturar();
