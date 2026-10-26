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

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});