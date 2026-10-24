import express from 'express';

const app = express();
const PORTA = 3000;

app.get('/', (req, res) => {
  res.json({ ok: true, mensagem: 'Servidor do admin-imob rodando' });
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});