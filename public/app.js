import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2/+esm';
import { validateProduct, parseNonnegativeInteger, isLowStock, filterProducts, friendlyError, validateCredentials, friendlyAuthError } from './logic.mjs';

const $ = (id) => document.getElementById(id);
const supabase = createClient(window.SUPABASE_URL, window.SUPABASE_KEY);
let products = [];
let activeUser = null;
let requestVersion = 0;
const display = (id, message = '') => { $(id).textContent = message; $(id).hidden = !message; };
function showLoggedIn(user) {
  activeUser = user;
  $('auth-view').hidden = !!user;
  $('inventory-view').hidden = !user;
  $('user-email').textContent = user?.email || '';
  if (!user) { products = []; requestVersion++; renderProducts(); }
}
function renderProducts() {
  const rows = filterProducts(products, $('low-filter').checked);
  $('total-products').textContent = products.length;
  $('low-products').textContent = products.filter(isLowStock).length;
  const list = $('product-list');
  list.replaceChildren();
  $('empty-state').hidden = products.length !== 0;
  $('filter-empty').hidden = !($('low-filter').checked && products.length > 0 && rows.length === 0);
  for (const product of rows) {
    const tr = document.createElement('tr');
    const cell = (value) => { const td = document.createElement('td'); td.textContent = String(value); tr.append(td); return td; };
    const title = cell(product.nombre); title.className = 'product-name';
    cell(product.sku).className = 'sku-cell'; cell(product.cantidad); cell(product.minimo);
    const status = cell(isLowStock(product) ? 'Bajo mínimo' : 'En orden');
    status.className = isLowStock(product) ? 'status low' : 'status good';
    const actions = document.createElement('td');
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'button small'; button.textContent = 'Editar';
    button.addEventListener('click', () => startEdit(product));
    actions.append(button); tr.append(actions); list.append(tr);
  }
}
async function loadProducts() {
  if (!activeUser) return;
  const version = ++requestVersion;
  display('list-error');
  const { data, error } = await supabase.from('productos').select('*').order('nombre', { ascending: true });
  if (version !== requestVersion || !activeUser) return;
  if (error) { display('list-error', friendlyError(error)); return; }
  products = data || []; renderProducts();
}
const setAuthBusy = (busy) => { $('login-button').disabled = busy; $('signup-button').disabled = busy; };
$('login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); display('login-error'); display('login-info');
  const email = $('email').value.trim(); const password = $('password').value;
  const invalid = validateCredentials(email, password);
  if (invalid) { display('login-error', invalid); return; }
  setAuthBusy(true);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) { display('login-error', error?.code === 'email_not_confirmed' ? friendlyAuthError(error) : 'Correo o contraseña incorrectos'); return; }
    showLoggedIn(data.user); await loadProducts();
  } catch { display('login-error', 'No fue posible conectar con el servicio de autenticación'); }
  finally { setAuthBusy(false); }
});
$('signup-button').addEventListener('click', async () => {
  display('login-error'); display('login-info');
  const email = $('email').value.trim(); const password = $('password').value;
  const invalid = validateCredentials(email, password, { forSignUp: true });
  if (invalid) { display('login-error', invalid); return; }
  setAuthBusy(true);
  try {
    // El enlace de confirmación vuelve al mismo sitio (localhost o la URL pública de Render).
    const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    if (error) { display('login-error', friendlyAuthError(error)); return; }
    if (data.session?.user) { showLoggedIn(data.session.user); await loadProducts(); return; }
    // Con "Confirm email" activo no hay sesión hasta confirmar. Supabase tampoco revela si el correo ya existía.
    $('password').value = '';
    display('login-info', 'Si el correo es válido, recibirás un enlace para confirmar la cuenta. Después inicia sesión.');
  } catch { display('login-error', 'No fue posible conectar con el servicio de autenticación'); }
  finally { setAuthBusy(false); }
});
$('logout-button').addEventListener('click', async () => {
  $('logout-button').disabled = true;
  try {
    const { error } = await supabase.auth.signOut();
    if (error) { display('list-error', 'No se pudo cerrar sesión. Intenta nuevamente.'); return; }
    showLoggedIn(null); $('password').value = '';
  } catch { display('list-error', 'No se pudo cerrar sesión. Intenta nuevamente.'); }
  finally { $('logout-button').disabled = false; }
});
$('product-form').addEventListener('submit', async (event) => {
  event.preventDefault(); if (!activeUser) return;
  display('product-error'); display('product-success');
  for (const field of ['nombre', 'sku', 'cantidad', 'minimo']) $(field + '-error').textContent = '';
  const input = Object.fromEntries(new FormData(event.currentTarget).entries());
  const validation = validateProduct(input);
  if (!validation.valid) {
    for (const [field, message] of Object.entries(validation.errors)) $(field + '-error').textContent = message;
    return;
  }
  $('save-product').disabled = true;
  try {
    const { error } = await supabase.from('productos').insert(validation.value);
    if (error) { display('product-error', friendlyError(error)); return; }
    $('product-form').reset(); display('product-success', 'Producto registrado correctamente');
    await loadProducts();
  } catch { display('product-error', 'No se pudo conectar con la base de datos'); }
  finally { $('save-product').disabled = false; }
});
$('low-filter').addEventListener('change', renderProducts);
async function startEdit(product) {
  const cantidad = window.prompt(`Nueva cantidad para ${product.nombre}`, String(product.cantidad));
  if (cantidad === null) return;
  const minimo = window.prompt(`Nueva cantidad mínima para ${product.nombre}`, String(product.minimo));
  if (minimo === null) return;
  let values;
  try { values = { cantidad: parseNonnegativeInteger(cantidad, 'La cantidad'), minimo: parseNonnegativeInteger(minimo, 'La cantidad mínima') }; }
  catch (error) { display('list-error', error.message); return; }
  display('list-error');
  const { data, error } = await supabase.from('productos').update(values).eq('id', product.id).select('id');
  if (error || !data?.length) { display('list-error', error ? friendlyError(error) : 'No se pudo actualizar ese producto'); return; }
  await loadProducts();
}
async function initialize() {
  const { data, error } = await supabase.auth.getSession();
  if (error) { display('login-error', 'No se pudo comprobar la sesión'); return; }
  showLoggedIn(data.session?.user ?? null);
  if (data.session?.user) await loadProducts();
}
initialize().catch(() => display('login-error', 'No se pudo conectar con Supabase'));
