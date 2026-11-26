import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

test('Día 5 - Alerta de existencias bajas', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Faltan TEST_EMAIL o TEST_PASSWORD en .env');
  }

  const skuBajo = `D5-BAJO-${randomUUID()}`;
  const skuNormal = `D5-NORMAL-${randomUUID()}`;
  let pruebaCompleta = false;

  await page.goto('/');
  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Ingresar' }).click();

  await expect(
    page.getByRole('heading', { name: 'Mi inventario' })
  ).toBeVisible();

  async function registrar(nombre, sku, cantidad, minimo) {
    await page.getByLabel('Nombre del producto').fill(nombre);
    await page.getByLabel('Código SKU').fill(sku);
    await page.getByLabel('Cantidad', { exact: true }).fill(cantidad);
    await page.getByLabel('Cantidad mínima').fill(minimo);

    await page.getByRole('button', { name: /Registrar producto/ }).click();

    await expect(
      page.getByRole('cell', { name: sku, exact: true })
    ).toBeVisible();
  }

  try {
    // Caso 1: cantidad menor al mínimo.
    await registrar('Prueba stock bajo', skuBajo, '2', '5');

    const filaBaja = page.locator('#product-list tr')
      .filter({ has: page.getByRole('cell', { name: skuBajo, exact: true }) });

    await expect(filaBaja).toContainText('Bajo mínimo');

    const alertasAntes = await page.locator('#low-products').innerText();

    // Caso 2: cantidad igual al mínimo, NO debe activar la alerta.
    await registrar('Prueba stock normal', skuNormal, '5', '5');

    const filaNormal = page.locator('#product-list tr')
      .filter({ has: page.getByRole('cell', { name: skuNormal, exact: true }) });

    await expect(filaNormal).toContainText('En orden');
    await expect(page.locator('#low-products')).toHaveText(alertasAntes);

    // Comprobar el filtro de existencias bajas.
    await page.getByRole('checkbox', { name: 'Solo bajo mínimo' }).check();

    await expect(filaBaja).toBeVisible();
    await expect(filaNormal).toHaveCount(0);

    pruebaCompleta = true;
  } finally {
    // Borrar exclusivamente los dos SKU generados por esta prueba.
    const limpieza = await page.evaluate(async (skus) => {
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
        .in('sku', skus)
        .select('id');

      return {
        eliminados: data?.length ?? 0,
        error: error?.message ?? null
      };
    }, [skuBajo, skuNormal]);

    expect(limpieza.error).toBeNull();

    if (pruebaCompleta) {
      expect(limpieza.eliminados).toBe(2);
    }
  }
});
