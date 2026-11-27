'use strict';
const express = require('express');
const path = require('node:path');

// Solo se acepta la llave publishable (sb_publishable_...) o la anon heredada.
// Una llave secreta (sb_secret_...) o una JWT con rol service_role salta RLS y nunca debe llegar al navegador.
function isPrivateKey(key) {
  if (key.startsWith('sb_secret_')) return true;
  const parts = key.split('.');
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    return payload?.role === 'service_role';
  } catch {
    return false;
  }
}

function createApp(env = process.env) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_KEY;
  if (!url || !key) throw new Error('Faltan SUPABASE_URL y/o SUPABASE_KEY en el archivo .env');
  let parsed;
  try { parsed = new URL(url); } catch { throw new Error('SUPABASE_URL no es una URL válida'); }
  if (parsed.protocol !== 'https:' && !(parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
    throw new Error('SUPABASE_URL debe utilizar HTTPS');
  }
  if (isPrivateKey(key)) {
    throw new Error('SUPABASE_KEY debe ser la llave publishable o anon; nunca la secret ni la service_role');
  }
  const app = express();
  app.disable('x-powered-by');
  app.get('/config.js', (_req, res) => {
    res.type('application/javascript');
    res.set('Cache-Control', 'no-store');
    res.send(`window.SUPABASE_URL = ${JSON.stringify(url)};\nwindow.SUPABASE_KEY = ${JSON.stringify(key)};\n`);
  });
  app.use(express.static(path.join(__dirname, 'public')));
  return app;
}

if (require.main === module) {
  try {
    const app = createApp();
    const port = Number(process.env.PORT) || 3000;
    // 0.0.0.0: necesario dentro de un contenedor para aceptar conexiones desde fuera (Docker y Render).
    const host = process.env.HOST || '0.0.0.0';
    app.listen(port, host, () => console.log(`Mini Inventario escuchando en http://${host}:${port}`));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { createApp, isPrivateKey };
