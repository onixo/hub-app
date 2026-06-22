import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// ✅ CORRIGIDO: Usar '/*' ao invés de '*'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Hub Portal rodando em http://localhost:' + PORT);
});
