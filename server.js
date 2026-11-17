'use strict';
const express = require('express');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

function createApp(env = process.env) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Faltan SUPABASE_URL y/o SUPABASE_ANON_KEY en el archivo .env');
  let parsed;
  try { parsed = new URL(url); } catch { throw new Error('SUPABASE_URL no es una URL válida'); }
  if (parsed.protocol !== 'https:' && !(parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
    throw new Error('SUPABASE_URL debe utilizar HTTPS');
  }
  const app = express();
  app.disable('x-powered-by');
  app.get('/config.js', (_req, res) => {
    res.type('application/javascript');
    res.set('Cache-Control', 'no-store');
    res.send(`window.SUPABASE_URL = ${JSON.stringify(url)};\nwindow.SUPABASE_ANON_KEY = ${JSON.stringify(key)};\n`);
  });
  app.use(express.static(path.join(__dirname, 'public')));
  return app;
}

if (require.main === module) {
  try {
    const app = createApp();
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`Mini Inventario disponible en http://localhost:${port}`));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
module.exports = { createApp };
