import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = 3002;

// Proxy /api → autentique backend (mesma máquina, porta 3001)
app.use('/api', createProxyMiddleware({
  target:       'http://localhost:3001',
  changeOrigin: true,
}));

// Frontend estático
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Hub Portal rodando em http://localhost:${PORT}`);
});
