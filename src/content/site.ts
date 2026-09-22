/**
 * Conteudo do site do Ariuno.
 * Tudo que e texto, numero, link ou imagem mora aqui. Para atualizar o site
 * no dia a dia voce nao precisa abrir nenhum componente: edite este arquivo,
 * rode `npm run build` e publique.
 */

export const site = {
  url: 'https://conheca.ariuno.com.br',
  nome: 'Ariuno',
  titulo: 'Ariuno · a plataforma que leva sua operação do briefing à nota fiscal',
  descricao:
    'Briefing, planejamento, execução, horas, aprovação do cliente e financeiro no mesmo sistema. O Ariuno nasceu dentro de uma operação real e substitui a pilha de assinaturas que sua empresa mantém hoje.',
  plataforma: 'https://ariuno.com.br',
  deck: 'https://projetos.75lab.com.br/ariuno-plataforma/',
  /** A demonstração pública existe, mas por decisão comercial fica fora do site.
   *  Para ligar o botão, troque para true e confira o link em `demoUrl`. */
  mostrarDemo: false,
  demoUrl: 'https://ariuno.com.br/?demo=1',
} as const;

export const contato = {
  email: 'contato@setecincolab.com.br',
  /** Opcional. Preencha com o número no formato 5511999999999 para ligar o botão de WhatsApp. */
  whatsapp: '',
  whatsappMensagem: 'Olá! Vim pelo site do Ariuno e quero conhecer a plataforma.',
  empresa: '75 LAB',
  empresaUrl: 'https://75lab.com.br',
  cidade: 'São Paulo, Brasil',
};

export const nav = [
  { href: '#operacao', rotulo: 'O problema' },
  { href: '#ciclo', rotulo: 'Como funciona' },
  { href: '#produto', rotulo: 'O produto' },
  { href: '#comparativo', rotulo: 'Comparativo' },
  { href: '#investimento', rotulo: 'Investimento' },
  { href: '#perguntas', rotulo: 'Perguntas' },
];

export const hero = {
  eyebrow: 'Plataforma de gestão de operação',
  titulo: ['Uma plataforma.', 'Toda a sua', 'operação.'],
  destaque: 'operação.',
  lead:
    'Do briefing à nota fiscal num sistema só: o mesmo que roda a 75 LAB todos os dias, com carteira de cliente de verdade.',
  ctaPrimario: { rotulo: 'Agendar o piloto de 30 dias', href: '#conversar' },
  ctaSecundario: { rotulo: 'Ver por dentro', href: '#produto' },
  pilulas: [
    { texto: 'Kanban, Gantt e calendário', icone: 'quadro' },
    { texto: 'Horas e capacidade', icone: 'cronometro' },
    { texto: 'Aprovações com histórico', icone: 'aprovacao' },
    { texto: 'Portal do cliente', icone: 'link' },
    { texto: 'Financeiro e margem', icone: 'financeiro' },
    { texto: 'Ariuno IA', icone: 'ia' },
  ] as const,
  /** Números da operação real da 75 LAB dentro do Ariuno, medidos em agosto de 2026. */
  provas: [
    { valor: 19, rotulo: 'pessoas usando todo dia', sufixo: '' },
    { valor: 97, rotulo: 'clientes na carteira', sufixo: '' },
    { valor: 1372, rotulo: 'tarefas em circulação', sufixo: '' },
  ],
  provaFonte: 'Operação da 75 LAB dentro do Ariuno, medida em agosto de 2026.',
};

export const manifesto = {
  eyebrow: 'O diagnóstico',
  titulo: ['Sua operação não', 'roda num sistema.', 'Roda em 14 abas.'],
  destaque: 'Roda em 14 abas.',
  lead:
    'Ninguém decidiu trabalhar assim. Foi acontecendo: uma ferramenta para cada dor, um combinado por fora para cada exceção. O preço disso não aparece em nenhuma fatura.',
  abas: [
    { onde: 'WhatsApp', o: 'o briefing chegou aqui' },
    { onde: 'Planilha', o: 'o prazo mora aqui' },
    { onde: 'E-mail', o: 'a aprovação ficou aqui' },
    { onde: 'Drive', o: 'o arquivo final está aqui' },
    { onde: 'Bloco de notas', o: 'as horas, quando alguém anota' },
    { onde: 'Cabeça de alguém', o: 'o histórico do cliente' },
  ],
  fecho: 'No Ariuno, esses seis lugares viram um.',
};

export const calculadora = {
  eyebrow: 'A conta que ninguém faz',
  titulo: ['O caro nunca foi', 'a assinatura.'],
  destaque: 'a assinatura.',
  lead:
    'É a hora que seu time gasta procurando informação que já existe. Mexa nos números abaixo com a realidade da sua empresa.',
  padroes: { pessoas: 20, horasDia: 1, valorHora: 45, diasUteis: 21 },
  limites: {
    pessoas: { min: 5, max: 150, passo: 1 },
    horasDia: { min: 0.25, max: 3, passo: 0.25 },
    valorHora: { min: 20, max: 200, passo: 5 },
  },
  nota:
    'Estimativa: pessoas × horas perdidas por dia × 21 dias úteis × valor da hora. Troque pelos números do seu time, a conclusão costuma ser a mesma.',
};

export const ciclo = {
  eyebrow: 'O ciclo completo',
  titulo: ['Entra briefing.', 'Sai relatório,', 'e nota fiscal.'],
  destaque: 'e nota fiscal.',
  lead:
    'Toda ferramenta promete organizar tarefa. O Ariuno fecha o ciclo até a hora virar fatura, e é por isso que ele substitui cinco assinaturas, não uma.',
  etapas: [
    {
      n: '01',
      print: 'formularios',
      icone: 'formulario' as const,
      nome: 'Briefing',
      resumo: 'Formulário público ou solicitação interna. Vira tarefa sozinho.',
      detalhe:
        'Você publica um link de formulário para o cliente ou abre solicitações internas por área. A resposta chega como tarefa no quadro certo, com responsável e prazo.',
      substitui: 'formulário avulso e briefing por WhatsApp',
    },
    {
      n: '02',
      print: 'gantt',
      icone: 'gantt' as const,
      nome: 'Planejamento',
      resumo: 'Projeto, prazo, responsável e checklist a partir de modelo.',
      detalhe:
        'Modelos de projeto e de tarefa montam o escopo em segundos. Gantt e calendário mostram o mês inteiro, com dependência e folga de cada entrega.',
      substitui: 'planilha de cronograma',
    },
    {
      n: '03',
      print: 'kanban',
      icone: 'quadro' as const,
      nome: 'Execução',
      resumo: 'Kanban, timer por tarefa, comentários e menções.',
      detalhe:
        'O time trabalha no quadro e aperta play na tarefa. Comentário, anexo e menção ficam no card, então o histórico não depende de ninguém lembrar.',
      substitui: 'quadro de tarefas e apontamento de horas',
    },
    {
      n: '04',
      print: 'solicitacoes',
      icone: 'aprovacao' as const,
      nome: 'Aprovação',
      resumo: 'Interna e do cliente, com registro de quem aprovou o quê.',
      detalhe:
        'Cada pedido tem fila, aprovador e comprovante. O cliente aprova pelo portal dele e a decisão fica gravada com data e nome.',
      substitui: 'a thread de e-mail que ninguém acha',
    },
    {
      n: '05',
      print: 'projetos',
      icone: 'camadas' as const,
      nome: 'Entrega',
      resumo: 'Anexos, link de entrega e portal do cliente.',
      detalhe:
        'A entrega sai com arquivo, link e status visíveis para o cliente, sem precisar montar apresentação de status a cada semana.',
      substitui: 'pasta compartilhada solta',
    },
    {
      n: '06',
      print: 'financeiro',
      icone: 'financeiro' as const,
      nome: 'Cobrança',
      resumo: 'Horas × contrato, relatório e faturamento no mesmo lugar.',
      detalhe:
        'As horas apontadas viram consumo por cliente, comparado com o contrato. O financeiro fecha o mês com margem por cliente e nota emitida a partir do mesmo dado.',
      substitui: 'a conferência manual antes de faturar',
    },
  ],
};

/** Cada item aponta para um print real do produto em `public/produto/`. */
export const funcionalidades = [
  {
    id: 'quadros',
    icone: 'quadro' as const,
    nome: 'Quadro Kanban',
    url: 'ariuno.com.br · quadros',
    print: 'kanban',
    alt: 'Quadro Kanban do Ariuno com colunas de status e cards de tarefa',
    descricao: 'Cada card carrega cliente, prazo, responsável, horas apontadas e o estado da aprovação.',
    retorno: 'Ninguém mais pergunta “em que pé está?”',
  },
  {
    id: 'gantt',
    icone: 'gantt' as const,
    nome: 'Gantt e prazos',
    url: 'ariuno.com.br · gantt',
    print: 'gantt',
    alt: 'Linha do tempo em Gantt com as entregas do mês no Ariuno',
    descricao: 'O mês inteiro na régua: início, entrega, dependência e atraso de uma vez só.',
    retorno: 'O atraso aparece antes de virar problema',
  },
  {
    id: 'visao',
    icone: 'painel' as const,
    nome: 'Visão geral do time',
    url: 'ariuno.com.br · visão geral',
    print: 'visao-geral',
    alt: 'Painel de visão geral do Ariuno com indicadores do time',
    descricao: 'Horas, entregas no prazo, atrasos e ranking do time atualizados em tempo real.',
    retorno: 'Decisão no meio do mês, não no fechamento',
  },
  {
    id: 'produtividade',
    icone: 'cronometro' as const,
    nome: 'Horas e capacidade',
    url: 'ariuno.com.br · produtividade',
    print: 'produtividade',
    alt: 'Relatório de produtividade e capacidade do time no Ariuno',
    descricao: 'Quem está sobrecarregado, quem tem folga e quanto cada entrega realmente consumiu.',
    retorno: 'Hora trabalhada deixa de ser hora perdida',
  },
  {
    id: 'relatorio',
    icone: 'relatorio' as const,
    nome: 'Relatório do cliente',
    url: 'ariuno.com.br · relatório do cliente',
    print: 'relatorio-cliente',
    alt: 'Relatório do cliente no Ariuno com horas consumidas e contratadas',
    descricao: 'Horas consumidas × contratadas e evolução de 12 meses, em link público ou PDF.',
    retorno: 'A renovação para de depender de simpatia',
  },
  {
    id: 'aprovacoes',
    icone: 'aprovacao' as const,
    nome: 'Aprovações e pedidos',
    url: 'ariuno.com.br · solicitações',
    print: 'solicitacoes',
    alt: 'Fila de solicitações e aprovações no Ariuno',
    descricao: 'Pedido, aprovação, comprovante e histórico na mesma esteira, por área da empresa.',
    retorno: 'Acabou o “eu aprovei por WhatsApp”',
  },
  {
    id: 'formularios',
    icone: 'formulario' as const,
    nome: 'Formulário de briefing',
    url: 'ariuno.com.br · formulários',
    print: 'formularios',
    alt: 'Construtor de formulários públicos do Ariuno',
    descricao: 'O cliente preenche o link e a resposta entra como tarefa no quadro certo.',
    retorno: 'Briefing entra pronto, com menos ida e volta',
  },
  {
    id: 'financeiro',
    icone: 'financeiro' as const,
    nome: 'Financeiro',
    url: 'ariuno.com.br · financeiro',
    print: 'financeiro',
    alt: 'Módulo financeiro do Ariuno com orçamento, despesas e margem',
    descricao: 'Orçamento, despesa por tarefa, contas a pagar e receber, DRE e margem por cliente.',
    retorno: 'Você descobre qual cliente dá lucro',
  },
  {
    id: 'ia',
    icone: 'ia' as const,
    nome: 'Ariuno IA',
    url: 'ariuno.com.br · ariuno ia',
    print: 'ia',
    alt: 'Assistente de inteligência artificial do Ariuno respondendo sobre a operação',
    descricao: 'Pergunte em português: o que está em risco, quem está sobrecarregado, como está o caixa.',
    retorno: 'Status da semana sem ninguém montar',
  },
  {
    id: 'arena',
    icone: 'trofeu' as const,
    nome: 'Arena, adoção do time',
    url: 'ariuno.com.br · arena',
    print: 'arena',
    alt: 'Arena de gamificação do Ariuno com ranking e missões',
    descricao: 'Entrega vira ponto, ranking e prêmio configurado pela própria empresa.',
    retorno: 'O time alimenta o sistema e o dado fica confiável',
  },
];

export const funcionalidadesExtras = 'e ainda calendário, mural, portal do time, social mídia, modelos e anexos';

export const horas = {
  eyebrow: 'O argumento que fecha contrato',
  titulo: ['Aperte play.', 'O resto vira', 'dinheiro.'],
  destaque: 'dinheiro.',
  lead:
    'Timer dentro da tarefa vira hora. Hora vira capacidade do time. Capacidade vira horas × contrato. E aí você descobre, ainda no meio do mês, qual cliente está consumindo mais do que paga.',
  linhas: [
    { k: 'Timer por tarefa, com várias tarefas ao mesmo tempo', v: 'play e pausa' },
    { k: 'Horas do cliente × horas contratadas', v: 'automático' },
  ],
  alerta: { titulo: 'Cliente consumindo além do contrato', valor: 119, rodape: 'o alerta aparece dentro do mês, não na renovação' },
  print: 'produtividade',
  printAlt: 'Painel de produtividade do time no Ariuno',
};

export const cliente = {
  eyebrow: 'O que vende a renovação',
  titulo: ['Um link.', 'Toda a prova', 'de valor.'],
  destaque: 'Toda a prova',
  lead:
    'Projetos entregues, horas consumidas × contratadas, entregas no prazo e evolução de 12 meses. Em link público ou PDF, num clique. A reunião de resultado deixa de ser conversa de achismo.',
  selos: [
    { titulo: 'Link público', texto: 'O cliente abre no navegador, sem instalar nada e sem login.' },
    { titulo: 'PDF num clique', texto: 'O mesmo relatório vira anexo de e-mail na hora da reunião.' },
    { titulo: 'Aprovação com histórico', texto: 'Quem aprovou, o quê e quando fica registrado.' },
  ],
  destaqueSelo: {
    titulo: 'O cliente entra de graça',
    texto: 'Usuário do tipo “cliente” é ilimitado, acompanha e aprova sem ocupar assento na sua conta.',
  },
  print: 'relatorio-cliente',
  printAlt: 'Relatório do cliente gerado pelo Ariuno',
};

export const operacoes = {
  eyebrow: 'Possibilidades de uso',
  titulo: ['Não é um software', 'de agência. É um', 'sistema de operação.'],
  destaque: 'sistema de operação.',
  itens: [
    {
      id: 'agencia',
      icone: 'maleta' as const,
      nome: 'Agência e trade',
      texto:
        'Briefing do cliente, produção, aprovação, entrega e horas × contrato, com portal para o cliente acompanhar sem pedir status.',
      passos: ['Briefing por link', 'Produção no quadro', 'Relatório e faturamento'],
      retorno: 'Contrato estourado aparece no meio do mês, não na renovação.',
    },
    {
      id: 'industria',
      icone: 'fabrica' as const,
      nome: 'Indústria',
      texto:
        'Pedidos de filiais, regionais e áreas viram uma fila só, com responsável, prazo e aprovação de compras documentada.',
      passos: ['Pedido da filial', 'Aprovação de compras', 'Execução e comprovante'],
      retorno: 'Fim do pedido por e-mail que ninguém achou.',
    },
    {
      id: 'varejo',
      icone: 'loja' as const,
      nome: 'Varejo e PDV',
      texto:
        'Implantação de loja, enxoval de PDV e cronograma por praça, com checklist e foto de execução anexada na tarefa.',
      passos: ['Cronograma por praça', 'Checklist na loja', 'Foto de execução'],
      retorno: 'Abertura sem surpresa de prazo na véspera.',
    },
    {
      id: 'servicos',
      icone: 'relogio' as const,
      nome: 'Serviços por hora',
      texto:
        'Jurídico, contábil, arquitetura e TI: hora por cliente, aprovação documentada e relatório de consumo para anexar na fatura.',
      passos: ['Hora por cliente', 'Aprovação documentada', 'Relatório de consumo'],
      retorno: 'Hora trabalhada vira hora faturada.',
    },
    {
      id: 'internos',
      icone: 'predio' as const,
      nome: 'Times internos',
      texto:
        'RH, compras e financeiro recebem solicitações com aprovação, comprovante e histórico de quem decidiu o quê.',
      passos: ['Solicitação com formulário', 'Aprovação por alçada', 'Histórico auditável'],
      retorno: 'Auditoria pronta, sem caçar e-mail.',
    },
  ],
  areas: ['Comercial', 'Financeiro', 'Compras', 'Criação', 'Tráfego', 'Social Mídia', 'Marketing', 'RH', 'Diretoria'],
};

export const comparativo = {
  eyebrow: 'Comparativo de funcionalidades',
  titulo: ['Não é o mesmo produto', 'com preço diferente.'],
  destaque: 'com preço diferente.',
  colunas: ['ARIUNO', 'monday', 'Asana', 'ClickUp', 'Runrun.it', 'Operand'],
  linhas: [
    { recurso: 'Quadros, lista, Gantt e calendário', marcas: ['sim', 'sim', 'sim', 'sim', 'sim', 'meio'] },
    { recurso: 'Timer na tarefa e apontamento de horas', marcas: ['sim', 'meio', 'meio', 'sim', 'sim', 'sim'] },
    { recurso: 'Horas consumidas × horas contratadas', marcas: ['sim', 'nao', 'nao', 'nao', 'meio', 'meio'] },
    { recurso: 'Aprovação com histórico, interna e do cliente', marcas: ['sim', 'meio', 'meio', 'meio', 'nao', 'meio'] },
    { recurso: 'Relatório do cliente em link público e PDF', marcas: ['sim', 'meio', 'nao', 'meio', 'meio', 'meio'] },
    { recurso: 'Usuário “cliente” ilimitado e sem custo', marcas: ['sim', 'nao', 'meio', 'meio', 'nao', 'meio'] },
    { recurso: 'Financeiro: orçamento, despesa e faturamento', marcas: ['sim', 'nao', 'nao', 'nao', 'nao', 'sim'] },
    { recurso: 'Módulos prontos por área da empresa', marcas: ['sim', 'meio', 'nao', 'meio', 'nao', 'meio'] },
    { recurso: 'Gamificação para o time querer usar', marcas: ['sim', 'nao', 'nao', 'nao', 'nao', 'nao'] },
    { recurso: 'IA que lê o dado da sua empresa', marcas: ['sim', 'meio', 'meio', 'meio', 'nao', 'nao'] },
    { recurso: 'White-label: sua marca e seu domínio', marcas: ['sim', 'nao', 'nao', 'nao', 'nao', 'nao'] },
  ],
  preco: {
    recurso: 'Preço por usuário/mês, faixa de 20 a 39 pessoas',
    valores: ['R$ 87', 'R$ 105', '≈ R$ 137', '≈ R$ 66', 'R$ 59', 'R$ 70'],
  },
  legenda: [
    { marca: 'sim', texto: 'entrega de fábrica' },
    { marca: 'meio', texto: 'parcial, por aplicativo ou plano superior' },
    { marca: 'nao', texto: 'não faz' },
  ],
  fonte: 'Planos públicos dos fabricantes consultados em agosto de 2026. Asana e ClickUp cotados em dólar.',
};

export const investimento = {
  eyebrow: 'Investimento',
  titulo: ['Quanto mais gente entra,', 'menos custa cada pessoa.'],
  destaque: 'menos custa cada pessoa.',
  lead: 'Preço por usuário ativo, em tabela progressiva. O valor da faixa vale para todos os usuários da conta.',
  faixas: [
    { de: 5, ate: 9, preco: 119, rotulo: '5 a 9 usuários' },
    { de: 10, ate: 19, preco: 99, rotulo: '10 a 19 usuários' },
    { de: 20, ate: 39, preco: 87, rotulo: '20 a 39 usuários', selo: 'faixa mais contratada' },
    { de: 40, ate: 79, preco: 75, rotulo: '40 a 79 usuários' },
    { de: 80, ate: 149, preco: 64, rotulo: '80 a 149 usuários' },
    { de: 150, ate: 9999, preco: 54, rotulo: '150 usuários ou mais', sobConsulta: true },
  ],
  condicoes: [
    { titulo: 'Usuário cliente é grátis', texto: 'Ilimitados. Acompanham e aprovam sem ocupar assento.' },
    { titulo: 'Todos os módulos incluídos', texto: 'Sem funcionalidade trancada em plano superior.' },
    { titulo: 'Plano anual à vista', texto: 'Desconto de 15% no valor do ano.' },
    { titulo: 'Implantação e treinamento', texto: 'R$ 3.900, isenta no anual a partir de 20 usuários.' },
    { titulo: 'White-label', texto: 'Sua marca e seu domínio por R$ 690 por mês.' },
    { titulo: 'Sem fidelidade', texto: 'Mínimo de 5 usuários. Suporte em português com quem construiu a plataforma.' },
  ],
};

export const implantacao = {
  eyebrow: 'Do contrato ao go-live',
  titulo: ['Seu time dentro', 'em 21 dias.'],
  destaque: 'em 21 dias.',
  lead: 'A implantação é feita com você, sobre a sua operação real, não sobre um modelo genérico.',
  fases: [
    { nome: 'Descoberta', dias: 'dias 1 a 3', texto: 'Mapeamos o fluxo que você já usa e onde ele trava hoje.' },
    { nome: 'Configuração', dias: 'dias 4 a 9', texto: 'Quadros, campos, modelos, áreas e permissões montados para a sua operação.' },
    { nome: 'Migração', dias: 'dias 8 a 14', texto: 'Clientes, projetos e tarefas em andamento entram na plataforma.' },
    { nome: 'Treinamento', dias: 'dias 12 a 18', texto: 'Time treinado por função, com material gravado para quem entrar depois.' },
    { nome: 'Go-live', dias: 'dias 15 a 21', texto: 'A operação passa a rodar no Ariuno, com acompanhamento no primeiro fechamento.' },
  ],
};

export const perguntas = {
  eyebrow: 'Perguntas que sempre aparecem',
  titulo: ['O que costuma', 'segurar a decisão.'],
  destaque: 'segurar a decisão.',
  itens: [
    {
      p: 'Meu time já usa outra ferramenta. Dá para migrar?',
      r: 'Dá. Na implantação levamos clientes, projetos e tarefas em andamento para dentro do Ariuno, e o time entra com o trabalho do dia já montado. O histórico antigo pode ficar arquivado na ferramenta anterior, sem custo de assinatura nova.',
    },
    {
      p: 'Meu cliente vai precisar pagar licença para acompanhar?',
      r: 'Não. O usuário do tipo cliente é ilimitado e gratuito. Ele acompanha o andamento, aprova entregas e abre solicitações sem ocupar assento na sua conta.',
    },
    {
      p: 'Em quanto tempo a empresa está rodando de verdade?',
      r: 'O piloto é de 30 dias e o go-live acontece entre o dia 15 e o dia 21. O primeiro fechamento de mês é acompanhado por nós.',
    },
    {
      p: 'O time realmente aponta as horas?',
      r: 'Esse é o ponto mais sensível de qualquer implantação, por isso o timer fica dentro da tarefa, não numa tela separada, e a Arena transforma a entrega em ponto e ranking. Na 75 LAB o apontamento virou hábito porque ele nasce do trabalho, não de um formulário no fim do dia.',
    },
    {
      p: 'Posso usar com a minha marca?',
      r: 'Sim. O white-label coloca sua marca, suas cores e seu domínio na plataforma por R$ 690 por mês. É o caminho de quem revende a operação para os próprios clientes.',
    },
    {
      p: 'E a segurança dos dados?',
      r: 'Cada empresa é isolada no banco por regras de acesso no servidor, e não apenas na tela. Usuário só enxerga a própria empresa, e o administrador controla quais áreas cada pessoa acessa. A infraestrutura roda em Google Cloud e Firebase.',
    },
    {
      p: 'Tem contrato de fidelidade?',
      r: 'Não. O mínimo é de 5 usuários e a cobrança é mensal por usuário ativo. O desconto de 15% existe para quem opta pelo plano anual à vista.',
    },
    {
      p: 'Quem dá suporte?',
      r: 'A mesma equipe que construiu a plataforma e a usa todos os dias, em português. Você não fala com um suporte de produto importado.',
    },
  ],
};

export const conversar = {
  eyebrow: 'Próximo passo',
  titulo: ['Comece pelo piloto', 'de 30 dias.'],
  destaque: 'de 30 dias.',
  lead:
    'Configuramos um quadro real da sua operação, colocamos o seu time dentro e medimos o resultado. Se não mudar o seu dia, você não continua.',
  campos: {
    nome: 'Seu nome',
    empresa: 'Empresa',
    email: 'E-mail corporativo',
    telefone: 'Telefone ou WhatsApp',
    time: 'Tamanho do time',
    mensagem: 'O que mais dói hoje na sua operação?',
  },
  tamanhos: ['5 a 9 pessoas', '10 a 19 pessoas', '20 a 39 pessoas', '40 a 79 pessoas', '80 pessoas ou mais'],
  enviar: 'Quero o piloto de 30 dias',
  enviando: 'Enviando...',
  sucesso: 'Recebemos. Respondemos em até um dia útil com uma agenda para conversar.',
  erro: 'Não conseguimos enviar agora. Fale com a gente pelo e-mail abaixo que resolvemos na hora.',
};

export const rodape = {
  frase: 'Ariuno é a plataforma de gestão criada e usada pela 75 LAB.',
  legal: `© ${new Date().getFullYear()} Ariuno. Plataforma desenvolvida pela 75 LAB.`,
};
