export function parseNonnegativeInteger(value, label) {
  const input = String(value ?? '').trim();
  if (!/^\d+$/.test(input)) throw new Error(`${label} debe ser un número entero mayor o igual a 0`);
  const result = Number(input);
  if (!Number.isSafeInteger(result) || result > 2147483647) throw new Error(`${label} supera el límite permitido`);
  return result;
}
export function validateProduct(input) {
  const result = {};
  const errors = {};
  for (const field of ['nombre', 'sku']) {
    const value = String(input[field] ?? '').trim();
    if (!value) errors[field] = `${field === 'nombre' ? 'El nombre' : 'El SKU'} es obligatorio`;
    else result[field] = value;
  }
  for (const [field, label] of [['cantidad', 'La cantidad'], ['minimo', 'La cantidad mínima']]) {
    try { result[field] = parseNonnegativeInteger(input[field], label); }
    catch (error) { errors[field] = error.message; }
  }
  return { valid: Object.keys(errors).length === 0, value: result, errors };
}
export const isLowStock = (product) => product.cantidad < product.minimo;
export const sortProducts = (products) => [...products].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
export const filterProducts = (products, onlyLow) => sortProducts(onlyLow ? products.filter(isLowStock) : products);
export const MIN_PASSWORD_LENGTH = 6;
export function validateCredentials(email, password, { forSignUp = false } = {}) {
  const value = String(email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || !password) return 'Ingresa un correo válido y una contraseña';
  if (forSignUp && String(password).length < MIN_PASSWORD_LENGTH) return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`;
  return null;
}
export function friendlyAuthError(error) {
  switch (error?.code) {
    case 'invalid_credentials': return 'Correo o contraseña incorrectos';
    case 'email_not_confirmed': return 'Confirma tu correo antes de iniciar sesión';
    case 'user_already_exists': case 'email_exists': return 'Ya existe una cuenta con ese correo';
    case 'weak_password': return `La contraseña es demasiado débil; usa al menos ${MIN_PASSWORD_LENGTH} caracteres`;
    case 'signup_disabled': return 'El registro de cuentas está desactivado';
    case 'over_email_send_rate_limit': case 'over_request_rate_limit': return 'Demasiados intentos; espera unos minutos';
    default: return 'No fue posible completar la operación. Inténtalo de nuevo.';
  }
}
export function friendlyError(error) {
  if (error?.code === '23505') return 'Ya tienes un producto con ese SKU';
  if (error?.code === '23514' || error?.code === '23502') return 'Revisa los datos del producto';
  return 'No se pudo completar la operación. Revisa tu conexión e inténtalo de nuevo.';
}
