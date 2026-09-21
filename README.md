# Site do Ariuno

Site institucional da plataforma **Ariuno**, o sistema de gestão de operação criado e usado
pela 75 LAB. A plataforma continua em `ariuno.com.br`; este site vive num endereço próprio
para não disputar espaço com o login.

- **No ar (temporário, para revisão):** https://projetos.75lab.com.br/ariuno-site/
- **Endereço definitivo:** `conheca.ariuno.com.br` (ver *Apontar o domínio*, abaixo)
- **Plataforma:** https://ariuno.com.br
- **Apresentação comercial:** https://projetos.75lab.com.br/ariuno-plataforma/

## A ideia do site

Uma linha só atravessa a página, o mesmo traço do símbolo do Ariuno. Ela abre o site,
some quando a operação está espalhada em 14 abas e volta inteira quando o ciclo fecha,
do briefing à nota fiscal. Cada seção tem um formato próprio, nenhuma repete o molde da
anterior, e as duas calculadoras deixam o visitante fazer a conta com os números dele:
quanto custa o retrabalho hoje e quanto custa o Ariuno para o time dele.

Ordem da narrativa: quem somos → o problema → a conta do problema → o ciclo completo →
o produto por dentro (prints reais) → a hora vira dinheiro → a prova de valor para o cliente
→ cinco operações diferentes → comparativo com a concorrência → investimento → implantação
em 21 dias → objeções → conversão.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5178
npm run build    # gera docs/ para o GitHub Pages
npm run preview  # confere o build
npm run lint     # checagem de tipos
```

Node 18 ou superior. No Mac do Caique, carregue o nvm antes: `source ~/.nvm/nvm.sh`.

## Como editar o conteúdo

**Tudo que é texto, número, preço, pergunta ou link está em `src/content/site.ts`.**
Você não precisa abrir nenhum componente para atualizar o site no dia a dia.

| O que mudar | Onde |
|---|---|
| Título, subtítulo e botões da abertura | `hero` |
| Endereço de e-mail, WhatsApp, cidade | `contato` |
| As seis "abas" do diagnóstico | `manifesto.abas` |
| Números padrão da calculadora de retrabalho | `calculadora.padroes` |
| As seis etapas do ciclo | `ciclo.etapas` |
| As dez funcionalidades e seus prints | `funcionalidades` |
| Matriz contra os concorrentes | `comparativo` |
| Tabela de preços, faixas e condições | `investimento` |
| Fases da implantação | `implantacao` |
| Perguntas e respostas | `perguntas` |
| Textos do formulário | `conversar` |

Para ligar o botão de WhatsApp, preencha `contato.whatsapp` com o número no formato
`5511999999999`. Enquanto estiver vazio, o botão simplesmente não aparece, no rodapé nem
na seção de conversa.

Para mostrar a demonstração pública no site, troque `site.mostrarDemo` para `true`.
Hoje está desligado por decisão comercial: o time usa a demo à parte.

## Prints do produto

As imagens em `public/produto/` foram capturadas da **demonstração pública** do Ariuno
(`ariuno.com.br/?demo=1`), que roda com a Agência Demo e dados fictícios. Nenhum dado de
cliente real aparece no site.

Para atualizar os prints quando o produto mudar:

```bash
npm run shots                 # captura tudo de novo da demonstração
npm run shots -- kanban ia    # captura só alguns
npm run otimizar-imagens      # gera os .webp (1400px e 760px) que o site usa
```

O script `tools/capturar-prints.mjs` abre a demonstração, fecha o tour, navega por cada área
e esconde os elementos que são da demonstração e não do produto. Os PNG originais ficam em
`assets/prints/` e **não vão para o Git**: só os `.webp` otimizados são publicados.

A imagem de compartilhamento (`public/og.jpg`) é gerada por `node tools/gerar-og.mjs`,
com o servidor de desenvolvimento rodando.

## Formulário

Por padrão o formulário monta uma mensagem e abre o programa de e-mail do visitante,
endereçada para `contato@setecincolab.com.br`. Funciona sem nenhuma configuração, mas
depende do visitante concluir o envio.

**Para receber os leads direto na caixa de entrada ou no CRM**, crie um endpoint
(Formspree, Make, n8n, Zapier ou uma Cloud Function) e coloque a URL em `.env`:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/SEU_ID
```

O site envia um `POST` com JSON: `nome`, `empresa`, `email`, `telefone`, `time`,
`mensagem`, `aceite` e `origem`. Existe armadilha contra robô (campo invisível), validação
com mensagens em português, estado de carregando, sucesso e erro, e o erro sempre mostra o
e-mail como saída. O envio dispara um evento `lead_enviado` em `window.dataLayer`, pronto
para Google Tag Manager, GA4 ou Meta Pixel quando você instalar um deles. **Nenhuma
ferramenta de rastreamento está instalada hoje**, e a política de privacidade diz isso.

## Publicar

O build vai para `docs/` e o GitHub Pages serve essa pasta na branch `main`.

```bash
npm run build
git add -A && git commit -m "atualiza o site" && git push
```

### Apontar o domínio conheca.ariuno.com.br

1. No painel de DNS de `ariuno.com.br`, crie um registro **CNAME**:
   `conheca` → `caiquebecker75.github.io`
2. Crie o arquivo `docs/CNAME` com uma linha: `conheca.ariuno.com.br`
   (e adicione a mesma linha em `public/CNAME` para não se perder no próximo build).
3. Faça o push. Em Settings → Pages, confirme o domínio e marque *Enforce HTTPS*.

Atenção: a partir do passo 2 o endereço temporário
`projetos.75lab.com.br/ariuno-site/` deixa de responder, porque o repositório passa a
ter domínio próprio. Faça o DNS primeiro.

O `index.html`, o `sitemap.xml` e a política de privacidade já apontam para
`https://conheca.ariuno.com.br`. Se o endereço final for outro, troque nesses três arquivos.

## Tecnologias

- React 19 + TypeScript
- Vite 7 (build de várias páginas: início, privacidade, 404)
- Tailwind CSS 4, com os tokens da marca em `src/styles/base.css`
- Animações em CSS puro com `IntersectionObserver` (sem biblioteca de animação, para o site
  ficar leve), respeitando `prefers-reduced-motion`
- Playwright para capturar os prints e para os testes de tela
- Pillow (Python) para otimizar as imagens

Peso do site: **90 KB de JavaScript** e 7 KB de CSS, comprimidos. As imagens somam 1,1 MB
no total e entram em carregamento preguiçoso, com versão de 760px para celular.

## Acessibilidade

- HTML semântico, hierarquia de títulos correta e link "pular para o conteúdo"
- Navegação completa por teclado, com foco sempre visível
- Abas do produto e das operações com `role="tablist"`, setas, Home e End
- Acordeão com `aria-expanded` e `aria-controls`
- Contraste conferido texto a texto: **zero falhas** no padrão AA, no desktop e no celular
- `prefers-reduced-motion` desliga a rolagem suave, o carrossel de funcionalidades, a faixa
  deslizante e o cursor próprio
- O cursor customizado só aparece em ponteiro fino, e a experiência inteira funciona no toque

## Conteúdo provisório

- **Política de privacidade** (`privacidade.html`): falta razão social, CNPJ e endereço da
  empresa. Estão marcados como `[PREENCHER]` e há um aviso no topo da página.
- **WhatsApp**: `contato.whatsapp` está vazio. Preencha para o botão aparecer.
- **Endpoint do formulário**: sem ele, o envio vai pelo programa de e-mail do visitante.

Nada além disso é provisório: preços, comparativo, números da operação e funcionalidades
vieram do material comercial do Ariuno e da plataforma real.

## Imagens que ainda ajudariam

1. **Foto do time da 75 LAB trabalhando** (horizontal, 2000px de largura), para a seção de
   implantação ganhar rosto humano.
2. **Logotipos de clientes que aceitem aparecer**, em SVG ou PNG transparente, para uma
   faixa de prova social acima do formulário.
3. **Depoimento em vídeo de 30 segundos** de quem usa o Ariuno hoje, em MP4 vertical e
   horizontal, para entrar depois da seção de prova de valor.
4. **Retrato do responsável comercial** (quadrado, 800px), para dar cara ao formulário.

Enquanto não existirem, o site não finge que existem: não há depoimento inventado, nem
logotipo de cliente, nem número que não seja verificável.

## Sugestões para a segunda fase

1. **Página por tipo de operação** (agência, indústria, varejo, serviços por hora, times
   internos), cada uma com o vocabulário do setor. O conteúdo já está modelado em
   `operacoes.itens`.
2. **Central de ajuda pública** com os artigos de implantação, que também traz busca orgânica.
3. **Comparativos dedicados**: "Ariuno x monday", "Ariuno x Runrun.it". São as buscas que
   trazem quem já está insatisfeito com a ferramenta atual.
4. **Prova social real**: depoimento em vídeo e um case com número aberto, assim que um
   cliente autorizar.
5. **Agenda embutida** (Cal.com ou Google Calendar) para o visitante marcar a conversa sem
   esperar resposta.
6. **Medição**: GA4 ou Plausible, com a meta ligada no evento `lead_enviado` que já existe.
7. **Versão em espanhol**, se a venda para fora do Brasil entrar no plano.
