import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProduct, parseNonnegativeInteger, isLowStock, filterProducts, friendlyError, validateCredentials, friendlyAuthError } from '../public/logic.mjs';

test('acepta producto correcto y quita espacios en extremos', () => {
  assert.deepEqual(validateProduct({ nombre: ' Arroz ', sku: ' A-1 ', cantidad: '5', minimo: '3' }), { valid: true, value: {nombre:'Arroz', sku:'A-1', cantidad:5, minimo:3}, errors:{} });
});
test('rechaza nombre o SKU vacíos', () => {
  const result = validateProduct({nombre:'  ',sku:' ',cantidad:0,minimo:0});
  assert.equal(result.valid,false);assert.ok(result.errors.nombre);assert.ok(result.errors.sku);
});
test('rechaza negativos, decimales, valores vacíos y fuera de rango', () => {
  for(const value of ['-1','2.5','',' ','Infinity','2147483648','1e3']) assert.throws(()=>parseNonnegativeInteger(value,'Cantidad'));
});
test('acepta cero y límite entero de PostgreSQL', () => {assert.equal(parseNonnegativeInteger('0','Cantidad'),0);assert.equal(parseNonnegativeInteger('2147483647','Cantidad'),2147483647)});
test('bajo mínimo es estrictamente menor', () => {
  assert.equal(isLowStock({cantidad:4,minimo:5}),true);
  assert.equal(isLowStock({cantidad:5,minimo:5}),false);
  assert.equal(isLowStock({cantidad:6,minimo:5}),false);
});
test('ordena productos y aplica filtro de bajo mínimo', () => {
  const items=[{nombre:'Zanahoria',cantidad:1,minimo:3},{nombre:'Arroz',cantidad:4,minimo:4},{nombre:'Bebida',cantidad:0,minimo:1}];
  assert.deepEqual(filterProducts(items,false).map(p=>p.nombre),['Arroz','Bebida','Zanahoria']);
  assert.deepEqual(filterProducts(items,true).map(p=>p.nombre),['Bebida','Zanahoria']);
});
test('traduce error de SKU duplicado',()=>assert.equal(friendlyError({code:'23505'}),'Ya tienes un producto con ese SKU'));

// Día 4: registro e inicio de sesión
test('valida correo y contraseña; el registro exige al menos 6 caracteres', () => {
  assert.equal(validateCredentials('a@b.co', 'x'), null);
  assert.ok(validateCredentials('sin-arroba', 'secreto1'));
  assert.ok(validateCredentials('a@b.co', ''));
  assert.match(validateCredentials('a@b.co', '12345', { forSignUp: true }), /al menos 6/);
  assert.equal(validateCredentials(' a@b.co ', '123456', { forSignUp: true }), null);
});
test('traduce errores de Supabase Auth sin exponer detalles', () => {
  assert.equal(friendlyAuthError({ code: 'invalid_credentials' }), 'Correo o contraseña incorrectos');
  assert.equal(friendlyAuthError({ code: 'user_already_exists' }), 'Ya existe una cuenta con ese correo');
  assert.match(friendlyAuthError({ code: 'weak_password' }), /débil/);
  assert.match(friendlyAuthError({ code: 'otro', message: 'detalle interno' }), /^No fue posible/);
});
