# Migrations

- Cada arquivo é numerado em sequência (`001_`, `002_`, ...) e nunca é editado depois de executado no banco.
- Qualquer mudança de estrutura (tabela nova, coluna, índice) vira um arquivo novo com o próximo número.
- Por enquanto a execução é manual: abrir o arquivo no MySQL Workbench e rodar no database `admin_imob`, em ordem.
