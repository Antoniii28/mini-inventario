import { test, expect } from '@playwright/test';

test('Día 5 - Inicio de sesión correcto', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Faltan TEST_EMAIL o TEST_PASSWORD en .env');
  }

  await page.goto('/');

  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña').fill(password);
  await page.getByRole('button', { name: 'Ingresar' }).click();

  await expect(
    page.getByRole('heading', { name: 'Mi almacén' })
  ).toBeVisible();

  await expect(page.locator('#user-email')).toHaveText(email);
});
