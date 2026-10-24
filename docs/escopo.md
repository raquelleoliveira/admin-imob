# Escopo — admin-imob / Zovva

Inventário do que um sistema de imobiliária completo costuma ter, do HTML às integrações. Serve como mapa do projeto: o que entra no MVP, o que vem depois e o que só faz sentido se virar produto.

Documento vivo — conforme o sistema for construído e usado de verdade, itens mudam de prioridade. Marque o que já estiver pronto e ajuste o que estiver errado.

**Legenda de prioridade:**
- `[MVP]` — precisa existir pro sistema ser usado de verdade pelo corretor e pela corretora externa
- `[V2]` — depois do MVP rodando, ainda dentro do uso da imobiliária
- `[SaaS]` — só faz sentido quando virar produto para outras imobiliárias

---

## 1. Fundação e arquitetura

- `[MVP]` Repositório único com separação clara de pastas (`/public`, `/src`, `/api` ou `/server`, `/db`)
- `[MVP]` Variáveis de ambiente (`.env`) para senhas, chaves de API e string de conexão — nunca commitadas; `.env.example` versionado
- `[MVP]` `.gitignore` cobrindo `node_modules`, `.env`, uploads locais, builds
- `[MVP]` `README.md` com o que é, como rodar local, como subir
- `[MVP]` `CLAUDE.md` com convenções do repositório
- `[MVP]` Estratégia de branches: `main` protegida + `feat/`, `fix/` com merge via PR
- `[V2]` Build/bundler (Vite) quando sair do HTML puro e for pra React
- `[V2]` Separação front/back em dois serviços com API REST entre eles
- `[SaaS]` Ambientes separados: desenvolvimento, homologação (staging) e produção

---

## 2. HTML e estrutura das páginas

- `[MVP]` HTML semântico: `header`, `nav`, `main`, `aside`, `section`, `footer`, `table` para listas tabulares
- `[MVP]` `<form>` de verdade em todos os cadastros, com `label` associado por `for`/`id`
- `[MVP]` Validação nativa como primeira camada: `required`, `type="email"`, `type="tel"`, `min`, `max`, `pattern`, `maxlength`
- `[MVP]` Meta tags básicas: `charset`, `viewport`, `title` e `description` por página
- `[MVP]` Favicon e ícone de app
- `[MVP]` Acessibilidade mínima: contraste adequado, foco visível no teclado, `alt` em toda imagem, `aria-label` em botões que são só ícone (sidebar colapsada, por exemplo)
- `[MVP]` Estados vazios desenhados ("nenhum imóvel cadastrado ainda") — página em branco parece bug
- `[V2]` Navegação 100% possível por teclado (Tab, Enter, Esc fechando modal)
- `[V2]` Skip link ("pular para o conteúdo") e landmarks ARIA

---

## 3. CSS e design system

- `[MVP]` Variáveis CSS para a paleta da marca (cores, espaçamentos, raios, sombras, fontes) em um `:root`
- `[MVP]` Reset/normalize
- `[MVP]` Layout responsivo real — o corretor abre no celular na rua, e a corretora externa também
- `[MVP]` Componentes visuais reutilizáveis: botão (primário/secundário/perigo), input, select, card, tabela, badge de status, modal, toast de confirmação
- `[MVP]` Estados de todos os interativos: hover, focus, active, disabled, loading
- `[MVP]` Skeleton ou spinner enquanto carrega dados
- `[V2]` Tema escuro
- `[V2]` Padronizar nomenclatura das classes (BEM ou similar) e documentar no `CLAUDE.md`
- `[SaaS]` Whitelabel: logo e cores por imobiliária, lendo da tabela de configurações

---

## 4. JavaScript / front-end

- `[MVP]` Camada de acesso a dados isolada (um `api.js` que concentra todos os `fetch`) — nada de `fetch` espalhado nas telas
- `[MVP]` Tratamento de erro visível ao usuário em toda requisição (nunca só `console.log`)
- `[MVP]` Máscaras e formatação: CPF/CNPJ, telefone, CEP, moeda (R$), data (dd/mm/aaaa)
- `[MVP]` Validação no cliente **e** no servidor — a do cliente é conveniência, a do servidor é segurança
- `[MVP]` Busca e filtros nas listagens (status, tipo, bairro, faixa de preço)
- `[MVP]` Ordenação e paginação nas listas
- `[MVP]` Confirmação antes de qualquer ação destrutiva (vai pra lixeira, mas confirma mesmo assim)
- `[V2]` Debounce no campo de busca
- `[V2]` Migração para React (componentes, rotas, estado global do usuário logado)
- `[V2]` Exportar lista para CSV/Excel
- `[V2]` Atalhos de teclado para ações frequentes

---

## 5. Autenticação, permissões e contas

- `[MVP]` Login com e-mail + senha, senha com hash (bcrypt ou argon2) — nunca texto puro
- `[MVP]` Sessão com token (JWT ou sessão em cookie `httpOnly`) e expiração
- `[MVP]` Logout e expiração por inatividade
- `[MVP]` Três papéis: admin, corretor pleno, corretor externo (leitura em Imóveis disponíveis)
- `[MVP]` Permissão verificada **no servidor**, por rota — esconder o botão no front não é permissão
- `[MVP]` Tela de "acesso negado" para rota que o papel não alcança
- `[V2]` Recuperação de senha por e-mail com token de uso único e prazo
- `[V2]` Troca de senha pelo próprio usuário + forçar troca no primeiro acesso
- `[V2]` Convite de usuário por e-mail em vez de cadastro manual
- `[V2]` Log de acesso (quem entrou, quando, de onde)
- `[SaaS]` 2FA
- `[SaaS]` Login social (Google)

---

## 6. Banco de dados

**Tabelas do núcleo** — todas com `id`, `imobiliaria_id` (multi-tenant desde já), `criado_em`, `atualizado_em`, `excluido_em` (soft delete = lixeira):

- `[MVP]` `imobiliarias` — a tenant
- `[MVP]` `usuarios` — nome, e-mail, hash da senha, papel, ativo
- `[MVP]` `imoveis` — código próprio (AP0007), tipo, status (disponível / captação / vendido / alugado / inativo), finalidade (venda/locação/ambos), preço de venda, valor de aluguel, condomínio, IPTU, endereço completo, área, dormitórios, suítes, vagas, descrição, `publicar_no_site`, proprietário, `tem_chave`
- `[MVP]` `imovel_fotos` — arquivo, ordem, legenda, qual é a capa
- `[MVP]` `clientes` — nome, CPF/CNPJ, telefone, e-mail, origem, tipo (comprador / locatário / proprietário), observações
- `[MVP]` `leads` — contato, origem (Meta, Google, indicação, portal), estágio do funil, responsável
- `[MVP]` `agenda` — tipo (visita, captação, assinatura, entrega de chave), data/hora, imóvel, cliente, responsável, status, resultado
- `[MVP]` `pendencias` — título, tipo (operacional/cliente), prazo, vínculo opcional com cliente/imóvel, concluída
- `[MVP]` `negociacoes` — imóvel, cliente, valor proposto, valor fechado, % de comissão, comissão calculada, divisão entre corretores, status
- `[MVP]` `financeiro_lancamentos` — tipo (entrada/saída), categoria, valor, vencimento, pagamento, vínculo com negociação/contrato
- `[V2]` `contratos_locacao` — imóvel, locatário, proprietário, início, fim, valor, índice de reajuste, dia de vencimento, multa, taxa de administração
- `[V2]` `contrato_parcelas` — competência, vencimento, valor, status, data de baixa, juros/multa aplicados
- `[V2]` `auditoria` — tabela, registro, usuário, ação, valores antes/depois
- `[V2]` `anexos` — documentos (matrícula, RG, contrato assinado) vinculados a qualquer entidade
- `[SaaS]` `assinaturas` / `planos` / `faturas` — cobrança das imobiliárias clientes

**Boas práticas de banco:**
- `[MVP]` Chaves estrangeiras com integridade referencial
- `[MVP]` Índices nos campos de busca (código do imóvel, status, telefone, `imobiliaria_id`)
- `[MVP]` Tipo `DECIMAL` para dinheiro — nunca `FLOAT`
- `[MVP]` Migrations versionadas (cada alteração de schema vira arquivo no repositório)
- `[MVP]` Seed com dados de exemplo pra rodar o projeto do zero
- `[V2]` Backup automático diário com teste de restauração

---

## 7. Back-end / API

- `[MVP]` API REST com rotas por recurso (`GET /imoveis`, `POST /imoveis`, `PATCH /imoveis/:id`, `DELETE /imoveis/:id` = soft delete)
- `[MVP]` Códigos HTTP corretos (200, 201, 400, 401, 403, 404, 422, 500)
- `[MVP]` Validação de entrada no servidor (Zod ou similar)
- `[MVP]` Middleware de autenticação + middleware de autorização por papel
- `[MVP]` Tratamento central de erros, sem vazar stack trace pro cliente
- `[MVP]` CORS configurado só para os domínios próprios
- `[V2]` Rate limiting (principalmente no login)
- `[V2]` Paginação padronizada em todas as listagens
- `[V2]` Documentação da API (Swagger/OpenAPI)
- `[V2]` Jobs agendados (cron): gerar pendência de follow-up vencido, lembrete de visita, geração mensal de parcelas de aluguel
- `[SaaS]` Isolamento de tenant garantido em **toda** query, não só por convenção

---

## 8. Módulos funcionais

- `[MVP]` **Home** — saudação, 3 cards de métrica, blocos de Agenda e Pendências
- `[MVP]` **Imóveis** — CRUD, galeria de fotos, status incluindo Captação, código próprio, link para o site, filtro e busca
- `[MVP]` **Clientes** — CRUD, histórico de interações, imóveis de interesse
- `[MVP]` **Leads** — entrada, funil, responsável, conversão em cliente
- `[MVP]` **Agenda** — visita, captação, assinatura, entrega de chave; registro de visita pela corretora externa
- `[MVP]` **Pendências** — lista única, criação manual e automática
- `[MVP]` **Negociações** — proposta, fechamento, cálculo de comissão (venda e locação)
- `[MVP]` **Financeiro** — entradas e saídas, a receber/a pagar, resumo do mês
- `[MVP]` **Configurações** — dados da imobiliária, usuários, categorias, % padrão de comissão
- `[MVP]` **Lixeira** — tudo que foi "excluído", com restaurar
- `[V2]` **Locação** — contratos, reajuste por índice, multa, inadimplência, repasse ao proprietário
- `[V2]` **Relatórios** — imóveis por status, visitas por período, comissão por corretor, DRE simples
- `[V2]` **Proprietários** — área/visão do dono do imóvel
- `[V2]` **Controle de chaves** — tem chave? foto do chaveiro? com quem está?

---

## 9. Mídia e arquivos

- `[MVP]` Upload de múltiplas fotos por imóvel, com reordenação e definição da capa
- `[MVP]` Limite de tamanho e validação de tipo (só imagem) **no servidor**
- `[MVP]` Redimensionamento/compressão automática + geração de thumbnail — foto de celular tem 5 MB
- `[V2]` Storage externo (S3, Cloudflare R2, Supabase Storage) em vez de disco do servidor
- `[V2]` CDN para servir as imagens
- `[V2]` Conversão para WebP
- `[V2]` Marca d'água com a logo
- `[V2]` Upload de documentos (PDF) vinculados a imóvel, cliente ou contrato

---

## 10. Site público de imóveis

- `[V2]` Listagem de imóveis com `publicar_no_site = true`, lendo do mesmo banco
- `[V2]` Página individual do imóvel com galeria, mapa e formulário de contato
- `[V2]` Busca por tipo, bairro, faixa de preço, dormitórios
- `[V2]` Formulário de interesse que cria um **lead** direto no admin
- `[V2]` SEO: título e descrição por imóvel, URL amigável (`/imovel/ap0007-apartamento-centro`), sitemap.xml, robots.txt
- `[V2]` Open Graph e Twitter Card — é o que define a aparência do link quando o corretor manda no WhatsApp
- `[V2]` Dados estruturados Schema.org (`RealEstateListing`) para o Google
- `[V2]` Botão de WhatsApp com mensagem pré-preenchida contendo o código do imóvel

---

## 11. Integrações

### WhatsApp
- `[MVP]` Link `wa.me` com mensagem pré-preenchida (sem API, sem custo) — já resolve 80% do dia a dia
- `[V2]` WhatsApp Business API oficial (via Meta Cloud API ou provedor como Z-API/Twilio) para notificação automática de visita e follow-up — exige número dedicado, verificação do negócio e templates aprovados pela Meta
- `[V2]` Templates de mensagem salvos no admin (confirmação de visita, envio de imóvel)

### Meta (Facebook/Instagram)
- `[V2]` **Lead Ads** — webhook da Graph API recebendo os leads dos anúncios direto no módulo Leads, sem copiar planilha
- `[V2]` **Pixel + Conversions API** no site público, para o tráfego pago medir conversão de verdade
- `[V2]` **Catálogo de imóveis** (Meta Catalog) alimentado por feed, habilitando anúncios dinâmicos de imóveis
- `[SaaS]` **Publicação/agendamento de posts** via Graph API (Instagram Content Publishing + Facebook Pages) — exige app revisado pela Meta, o que é um projeto em si

### Google
- `[V2]` Google Analytics 4 no site público
- `[V2]` Google Maps / Places para o endereço do imóvel e o mapa na página pública
- `[V2]` ViaCEP (gratuito) para preencher endereço a partir do CEP
- `[V2]` Google Calendar sincronizando a agenda do corretor
- `[SaaS]` Google Business Profile API para postagens automáticas

### Portais imobiliários
- `[V2]` Geração de feed XML no padrão **VRSync** (ZAP, Viva Real, OLX) a partir dos imóveis publicáveis
- `[V2]` Importação/exportação em CSV para migrar de planilha ou de outro sistema

### Assinatura e documentos
- `[V2]` Assinatura eletrônica (Clicksign, D4Sign, ZapSign) para contrato de locação e autorização de venda
- `[V2]` Geração de PDF a partir de template (contrato, recibo, ficha do imóvel)

### Consultas e validações
- `[V2]` Validação de CPF/CNPJ por algoritmo (local, sem custo)
- `[SaaS]` Análise de crédito do locatário (Serasa, Boa Vista, CredDefense) — só faz sentido com administração de locação real

### E-mail
- `[V2]` E-mail transacional (Resend, SendGrid, Amazon SES) para recuperação de senha, convite de usuário e aviso de visita

### Automação
- `[V2]` Endpoints/webhooks expostos para o n8n — ex.: lead novo dispara fluxo

---

## 12. Meios de pagamento

Hoje a imobiliária **não faz administração de locação**, então pagamento não é MVP. Entra em dois cenários distintos:

### Cenário A — cobrança de aluguel (se passar a administrar)
- `[V2]` Gateway com boleto + PIX + cartão: **Asaas**, **Pagar.me**, **Mercado Pago** ou **Iugu** (o Asaas é o mais comum em imobiliária pequena por causa do boleto e do split)
- `[V2]` Geração de cobrança recorrente mensal a partir do contrato
- `[V2]` **Webhook de confirmação de pagamento** dando baixa automática na parcela — essa é a parte que realmente importa, não o botão de pagar
- `[V2]` **Split de pagamento**: repasse ao proprietário e retenção da taxa de administração, automático
- `[V2]` Régua de inadimplência: lembrete antes do vencimento, cobrança depois, cálculo de juros e multa
- `[V2]` Conciliação bancária (retorno CNAB ou API do banco)
- `[V2]` Emissão de NFS-e da taxa de administração e da comissão
- ⚠️ Receber dinheiro de terceiros tem implicação fiscal e contratual séria — decidir com contador antes de codar

### Cenário B — Zovva como SaaS
- `[SaaS]` Assinatura recorrente das imobiliárias clientes (Stripe, Asaas ou Mercado Pago)
- `[SaaS]` Planos, trial, upgrade/downgrade, cancelamento
- `[SaaS]` Bloqueio automático por inadimplência
- `[SaaS]` Portal de faturas e emissão de nota

---

## 13. Segurança e LGPD

- `[MVP]` Senhas com hash, nunca em log
- `[MVP]` Queries parametrizadas (prepared statements) contra SQL injection
- `[MVP]` Escapar conteúdo dinâmico no HTML contra XSS — cuidado com `innerHTML` em dado digitado por usuário
- `[MVP]` HTTPS obrigatório em produção
- `[MVP]` Chaves e segredos só em variável de ambiente
- `[V2]` Proteção CSRF nos formulários
- `[V2]` Rate limit no login + bloqueio temporário após N tentativas
- `[V2]` Log de auditoria (quem alterou o quê)
- `[V2]` LGPD: política de privacidade no site, consentimento no formulário, base legal para os dados dos clientes, processo de exclusão a pedido do titular
- `[V2]` Retenção/anonimização de dados de lead antigo
- `[SaaS]` Termos de uso e DPA com as imobiliárias clientes

---

## 14. Qualidade, deploy e operação

- `[MVP]` ESLint + Prettier
- `[MVP]` Commits pequenos e descritivos (Conventional Commits: `feat:`, `fix:`, `refactor:`)
- `[V2]` Testes unitários nas regras de negócio — comissão, reajuste, juros e multa são o lugar óbvio pra começar
- `[V2]` Testes de integração nas rotas da API
- `[V2]` CI no GitHub Actions rodando lint + testes a cada PR
- `[V2]` Deploy: front na Vercel/Netlify, API no Render/Railway/Fly, banco no PlanetScale/Neon/Railway
- `[V2]` Monitoramento de erro (Sentry) e logs estruturados
- `[V2]` Healthcheck e uptime monitor
- `[SaaS]` Ambiente de staging + processo de release

---

## Ordem sugerida de construção

1. Terminar a Home, depois Leads
2. Imóveis completo, com fotos e lixeira
3. Clientes + Agenda (com registro de visita pela corretora externa)
4. Pendências automáticas
5. Negociações + comissão
6. Financeiro básico
7. Regras de locação como funções testadas + tabelas → telas depois
8. Site público + SEO + feed VRSync
9. Meta: Lead Ads + Pixel/CAPI
10. Pagamento, só quando houver locação administrada ou cliente pagante do Zovva
