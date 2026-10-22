# CLAUDE.md

## Commits

- Nunca incluir a linha `Co-Authored-By: Claude` nas mensagens de commit deste projeto.

## Stack e estrutura

- HTML, CSS e JS puro, sem framework e sem build.
- `index.html` (login) na raiz, telas internas em `pages/`, estilos em `css/app.css`, scripts em `js/app.js`.

## CSS

- Tudo em `css/app.css`, organizado em seções comentadas. Não criar arquivos CSS novos.
- Cores sempre pelas variáveis do `:root`. Nunca hexadecimal fora dele.
- Antes de criar classe nova, conferir se já existe equivalente.
- `transition` vai na regra base do elemento, nunca na classe que muda o valor.
- Evitar `!important`. A única exceção são classes utilitárias como `.escondido`, cuja função é sempre vencer o `display` do componente.

## Padrão de tela

- Sidebar idêntica em todas as páginas, trocando só o item com classe `ativo`.
- `.topo-pagina` com h1 e botões à direita.
- Lista em `.card-lista` com tabela.
- Cadastro em modal (`class="modal escondido"`), posicionada fora da `div.app`, antes do `<script>`.

## Formulários

- Todo `<form>` leva `class="form-grid"` além do `id`. Nunca estilizar formulário por `id`.
- Formulário com mais de um assunto usa `<h3 class="form-secao">` a partir do segundo bloco; o primeiro não leva `h3`. Assunto único não usa seção.
- `name` igual à chave que o objeto terá no JS; `label` com `for` apontando para o `id`; `select` com `value` minúsculo e sem acento.
- Três campos relacionados na mesma linha vão dentro de `<div class="form-linha-tres">`: três colunas iguais, que viram uma só até 700px.

## JavaScript

- O JS deste projeto é escrito pela Raquelle. Não escrever JS, nem mesmo pequenos trechos para completar uma tela. Fazer só o HTML e o CSS, deixar os `id` necessários e dizer na descrição do PR qual comportamento falta implementar.

## Git

- Uma branch por tarefa, commits pequenos.
- `git checkout main && git pull` antes de criar a branch.
- PR com título e descrição, aberto com `gh pr create`.
- Logo depois de cada push para uma branch com PR aberto, conferir com `gh pr view <n> --json commits` se o PR aponta para o último commit. Se não apontar, avisar a Raquelle.
- Nunca fazer merge pelo terminal — a Raquelle revisa e mergeia pelo site.
- Parar e avisar depois de abrir o PR; não começar a próxima tarefa antes do merge.
