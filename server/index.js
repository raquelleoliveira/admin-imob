import express from 'express';
import pool from './db.js';

const app = express();
const PORTA = 3000;

app.get('/', (req, res) => {
  res.json({ ok: true, mensagem: 'Servidor do admin-imob rodando' });
});

app.get('/teste-db', async (req, res) => {
  try {
    const [linhas] = await pool.query('SELECT COUNT(*) AS total FROM leads');
    res.json(linhas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Falha ao consultar o banco' });
  }
});

app.get('/leads', async (req, res) => {
  try {
    // Fixo em 1 por enquanto; passa a vir de req.session quando o login existir.
    const imobiliariaId = 1;
    const [linhas] = await pool.query(
      'SELECT * FROM leads WHERE imobiliaria_id = ? AND excluido_em IS NULL ORDER BY criado_em DESC',
      [imobiliariaId]
    );
    res.json(linhas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Falha ao listar os leads' });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});