import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test('Día 5 - Registrar producto', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Faltan TEST_EMAIL o TEST_PASSWORD en .env');
  }

  const sku = `D5-${randomUUID()}`;
  let intentoRegistro = false;

  await page.goto('/');
  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Ingresar' }).click();

  await expect(
    page.getByRole('heading', { name: 'Mi inventario' })
  ).toBeVisible();

  try {
    await page.getByLabel('Nombre del producto')
      .fill('Producto de prueba Día 5');

    await page.getByLabel('Código SKU').fill(sku);
    await page.getByLabel('Cantidad', { exact: true }).fill('12');
    await page.getByLabel('Cantidad mínima').fill('5');

    intentoRegistro = true;
    await page.getByRole('button', { name: /Registrar producto/ }).click();

    await expect(page.locator('#product-success'))
      .toContainText('Producto registrado correctamente');

    await expect(
      page.locator('#product-list tr').filter({
        has: page.getByRole('cell', { name: sku, exact: true })
      })
    ).toBeVisible();

  } finally {
    if (intentoRegistro) {
      const limpieza = await page.evaluate(async (skuPrueba) => {
        const { createClient } = await import(
          'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.2/+esm'
        );

        const supabase = createClient(
          window.SUPABASE_URL,
          window.SUPABASE_KEY
        );

        const { data, error } = await supabase
          .from('productos')
          .delete()
          .eq('sku', skuPrueba)
          .select('id');

        return {
          eliminados: data?.length ?? 0,
          error: error?.message ?? null
        };
      }, sku);

      expect(limpieza.error).toBeNull();
      expect(limpieza.eliminados).toBe(1);
    }
  }
});
