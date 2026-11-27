# Día 5 — Pruebas automatizadas con Playwright

**Proyecto:** Mini Inventario
**Equipo:** Pchifus
**Responsable:** Luis Ángel Osorio Galicia
**PR:** https://github.com/Antoniii28/mini-inventario/pull/17

## 1. Prompts e instrucciones clave

Durante el desarrollo se solicitó ayuda a la IA para:

- Configurar Playwright Test con Chromium.
- Automatizar el inicio de sesión correcto.
- Verificar el rechazo de contraseñas incorrectas.
- Registrar productos con SKU único y limpiarlos después.
- Comprobar las alertas de existencias bajas.
- Corregir el formulario responsivo en dispositivos móviles.
- Documentar las pruebas y el ciclo rojo-verde.

## 2. Error o mala decisión de la IA

La primera configuración de Playwright utilizaba
`npm start` para iniciar el servidor.

El problema era que ese comando requería un archivo
`.env`, que no existe en GitHub Actions.

Además, la configuración inicial no generaba
el reporte HTML solicitado para las evidencias.

Estos problemas fueron identificados durante
la revisión técnica del PR #17 por José Antonio
y su agente.

Correcciones:

- Se cambió el comando del servidor a
  `node --env-file-if-exists=.env server.js`.
- Se configuró el reporte HTML de Playwright.

Después de estas correcciones, las cuatro pruebas
pasaron localmente y se generó `playwright-report/index.html`.

## 3. Comando aprobado o rechazado

**Comando aprobado:** `npx playwright test`

Motivo: ejecuta automáticamente las pruebas y permite
detectar fallos sin modificar manualmente los productos
existentes de otros usuarios.

También se aprobó ejecutar temporalmente una prueba
con una comparación incorrecta para comprobar que
Playwright detectaba el error.

## 4. Cómo comprobé que funciona

Se ejecutaron cuatro pruebas automatizadas:

1. Inicio de sesión correcto.
2. Contraseña incorrecta.
3. Registro de producto.
4. Detección de existencias bajas.

Resultado final: 4 pruebas aprobadas.

También se ejecutó `npm test`, con 13 pruebas aprobadas.

### Demostración rojo-verde

Se ejecutó personalmente desde la terminal un script
que sustituyó temporalmente `<` por `<=` en la función
`isLowStock`.

La modificación la realizó el script, no fue una edición
manual del archivo.

Playwright detectó el problema y mostró `1 failed`.
El script restauró automáticamente el archivo original.

Después se volvió a ejecutar la suite:
`4 passed`.

Las evidencias están en `evidencias/`.

## 5. Exploración de la interfaz

Se tomaron capturas en:

- Escritorio: 1280 x 800 píxeles.
- Móvil: 390 x 844 píxeles.

Se detectó y corrigió el desbordamiento horizontal
del formulario móvil.

Se verificó que los campos de cantidad y el botón
Registrar producto aparecieran completos.

Las capturas se encuentran en `capturas/`.

## 6. Archivos adicionales

- `bitacora.md`: registro de actividades.
- `reporte-pruebas.md`: reporte técnico.
- `capturas/`: evidencia visual.
- `evidencias/`: resultados rojo-verde.

## 7. Pendientes

- Sincronizar la rama con los cambios del Día 4.
- Resolver el conflicto de `.gitignore`.
- Validar Playwright en CI sin archivo `.env`.
- Actualizar el PR #17 y obtener revisión de José.
