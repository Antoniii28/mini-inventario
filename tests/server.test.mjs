import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { createApp, isPrivateKey } = require('../server.js');

// Valores ficticios: no son llaves reales.
const URL_OK = 'https://ejemplo.supabase.co';
const KEY_OK = 'sb_publishable_valor_de_prueba';
const jwt = (payload) => ['e30', Buffer.from(JSON.stringify(payload)).toString('base64url'), 'firma'].join('.');

test('exige SUPABASE_URL y SUPABASE_KEY', () => {
  assert.throws(() => createApp({ SUPABASE_URL: URL_OK }), /SUPABASE_KEY/);
  assert.throws(() => createApp({ SUPABASE_KEY: KEY_OK }), /SUPABASE_URL/);
});

test('rechaza URL sin HTTPS fuera de localhost', () => {
  assert.throws(() => createApp({ SUPABASE_URL: 'http://ejemplo.supabase.co', SUPABASE_KEY: KEY_OK }), /HTTPS/);
});

test('rechaza llaves secret y service_role; acepta publishable y anon', () => {
  assert.equal(isPrivateKey('sb_secret_valor_de_prueba'), true);
  assert.equal(isPrivateKey(jwt({ role: 'service_role' })), true);
  assert.equal(isPrivateKey(jwt({ role: 'anon' })), false);
  assert.equal(isPrivateKey(KEY_OK), false);
  assert.throws(() => createApp({ SUPABASE_URL: URL_OK, SUPABASE_KEY: 'sb_secret_valor_de_prueba' }), /nunca la secret/);
});

test('/config.js entrega solo SUPABASE_URL y SUPABASE_KEY', async () => {
  const server = createApp({ SUPABASE_URL: URL_OK, SUPABASE_KEY: KEY_OK }).listen(0);
  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const res = await fetch(`http://127.0.0.1:${server.address().port}/config.js`);
    const body = await res.text();
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /javascript/);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    assert.equal(body, `window.SUPABASE_URL = "${URL_OK}";\nwindow.SUPABASE_KEY = "${KEY_OK}";\n`);
  } finally {
    server.close();
  }
});
