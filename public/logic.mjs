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
export function friendlyError(error) {
  if (error?.code === '23505') return 'Ya tienes un producto con ese SKU';
  if (error?.code === '23514' || error?.code === '23502') return 'Revisa los datos del producto';
  return 'No se pudo completar la operación. Revisa tu conexión e inténtalo de nuevo.';
}
