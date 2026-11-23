-- 001_create_leads.sql
-- Tabela de leads do admin-imob.
-- Executar manualmente no MySQL Workbench, no database admin_imob.

CREATE TABLE leads (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  imobiliaria_id  INT UNSIGNED NOT NULL,
  nome            VARCHAR(120) NOT NULL,
  telefone        VARCHAR(20) NOT NULL,
  origem          ENUM('instagram','facebook','google','site',
                       'whatsapp','indicacao','placa','outro') NULL,
  origem_outro    VARCHAR(120) NULL,
  interesse       ENUM('comprar','alugar') NOT NULL DEFAULT 'comprar',
  busca_por       VARCHAR(255) NULL,
  valor_min       DECIMAL(12,2) NULL,
  valor_max       DECIMAL(12,2) NULL,
  status          ENUM('novo','em-contato','visita-agendada',
                       'proposta','fechado','perdido') NOT NULL DEFAULT 'novo',
  motivo_perda    VARCHAR(255) NULL,
  proximo_contato DATE NULL,
  observacoes     TEXT NULL,
  criado_em       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                  ON UPDATE CURRENT_TIMESTAMP,
  excluido_em     DATETIME NULL,
  PRIMARY KEY (id),
  KEY idx_leads_tenant_status (imobiliaria_id, status),
  CONSTRAINT chk_leads_valores
    CHECK (valor_min IS NULL OR valor_max IS NULL OR valor_max >= valor_min)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
