# admin-imob

Painel administrativo para uma imobiliária de pequeno porte, construído do
zero em HTML, CSS e JavaScript puro.

O sistema está sendo desenvolvido para uso real: substituir o controle
atual, feito em planilhas e anotações soltas, por um lugar único onde ficam
imóveis, proprietários, leads, negociações, agenda e financeiro.

## Status

Em desenvolvimento. As sete telas estão prontas em HTML e CSS; o
JavaScript está sendo implementado módulo a módulo, começando por Leads.

## Módulos

| Módulo | O que faz |
|---|---|
| **Home** | Resumo do dia: pendências, visitas, financeiro do mês e imóveis em captação |
| **Imóveis** | Cadastro com código próprio, filtro por status e destaque para captação |
| **Proprietários** | Donos dos imóveis e seus contatos |
| **Leads** | Funil de interessados, da entrada ao fechamento |
| **Negociações** | Vendas e locações em andamento, com cálculo de comissão |
| **Agenda** | Visitas, captações, assinaturas e entregas de chave, por responsável |
| **Financeiro** | Entradas e saídas, com resumo do mês |
| **Configurações** | Dados da imobiliária, usuários e lixeira |

## Decisões de projeto

**Sem framework.** O projeto é feito em HTML, CSS e JavaScript puro de
propósito: o objetivo é dominar a base antes de migrar para React e
Node.js com MySQL, que é o destino planejado.

**Exclusão reversível.** Nenhum registro é apagado de verdade. Tudo que é
excluído vai para uma lixeira e pode ser restaurado — decisão tomada por
ser um sistema de uso real, operado por pessoas com níveis diferentes de
familiaridade com tecnologia.

**Três níveis de acesso.** Administrador e corretor têm acesso total;
corretor externo vê apenas os imóveis disponíveis, em modo leitura.

**Dados locais nesta fase.** Enquanto o back-end não existe, os dados ficam
no `localStorage`, com exportação de backup. A modelagem já prevê a
migração para banco relacional.

**CSS sem bibliotecas.** Um único `app.css`, organizado em seções, com
variáveis de cor no `:root` e classes reaproveitadas entre as telas. As
convenções do projeto estão registradas em [CLAUDE.md](CLAUDE.md).

## Estrutura

admin-imob/
├── index.html # login
├── css/app.css # estilos de todo o sistema
├── js/app.js # comportamento
└── pages/ # telas internas

## Como rodar

Não há build nem dependências. Basta abrir o `index.html` no navegador, ou
servir a pasta com qualquer servidor estático (por exemplo, a extensão Live
Server do VS Code).

## Próximos passos

- [ ] JavaScript dos módulos, começando por Leads
- [ ] Back-end em Node.js com MySQL
- [ ] Site público de divulgação dos imóveis
- [ ] Administração de locação (contratos, reajuste, inadimplência)

---

Desenvolvido por [Raquelle Oliveira](https://github.com/raquelleoliveira).
