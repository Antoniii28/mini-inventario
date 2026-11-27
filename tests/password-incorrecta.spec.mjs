import { test, expect } from '@playwright/test';

test('Día 5 - Contraseña incorrecta', async ({ page }) => {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!email || !password) {
    throw new Error('Faltan TEST_EMAIL o TEST_PASSWORD en .env');
  }

  await page.goto('/');

  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña').fill(password + '-incorrecta');

  await page.getByRole('button', { name: 'Ingresar' }).click();

  await expect(page.getByRole('alert')).toContainText(
    'Correo o contraseña incorrectos'
  );

  await expect(
    page.getByRole('heading', { name: 'Iniciar sesión' })
  ).toBeVisible();
});
