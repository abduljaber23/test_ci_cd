const express = require('express');
const app = express();

app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API Demo CI/CD !', status: 'ok' });
});

// Route santé (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Route addition (pour tester)
app.get('/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Les paramètres a et b doivent être des nombres' });
  }

  res.json({ result: a + b });
});

// Route pour saluer
app.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Le nom est requis' });
  }
  res.json({ message: `Bonjour, ${name} !` });
});

module.exports = app;
