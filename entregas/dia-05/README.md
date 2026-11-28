# Día 5 — Prueba tu app con los ojos del agente

**Proyecto:** Mini Inventario
**Equipo:** Pchifus
**Responsable:** Luis Angel Osorio Galicia (`dosientos77-web`)
**Issue:** [#11](https://github.com/Antoniii28/mini-inventario/issues/11) · correcciones de la bitácora: [#18](https://github.com/Antoniii28/mini-inventario/issues/18)
**PR del código:** [#17](https://github.com/Antoniii28/mini-inventario/pull/17) (fusionado en `main`, merge `2a4c370`)
**Fechas:** 25 y 26 de noviembre de 2026 (actividad) · 27 de noviembre de 2026 (falla provocada a mano y bitácora final)

Este archivo es la **bitácora oficial** del Día 5. `bitacora.md` y `reporte-pruebas.md` son anexos.

---

## 1. Prompts clave

### 1.1 Prompts reales y verificables (sesión con Claude Code del 27/11/2026)
Copiados tal cual de la conversación con el agente. Con ellos se hizo la demostración rojo-verde a mano y se completó esta bitácora.

> Para la prueba roja, indícame exactamente qué debo cambiar manualmente de `<` a `<=`. Yo haré esa edición.
> Ejecuta las pruebas después de mi edición, guarda la evidencia roja y luego indícame cómo restaurar manualmente el código.

> Listo, ya modifiqué manualmente el archivo public/logic.mjs, cambiando `<` por `<=` en la función isLowStock, y guardé los cambios.
> Verifica con git diff que únicamente haya cambiado esa comparación y que no existan errores de sintaxis.
> Después ejecuta las pruebas de Playwright para comprobar la falla y guarda la salida en entregas/dia-05/evidencias/prueba-roja-manual.txt.
> No hagas commit del código incorrecto y no lo restaures todavía. Cuando termines, indícame cómo devolverlo manualmente a `<` para obtener la evidencia verde.

> Listo, ya restauré manualmente la comparación `<=` a `<` en public/logic.mjs y guardé el archivo.
> Verifica que el código quedó idéntico al original y ejecuta `npm test` y `npx playwright test`.
> Guarda la evidencia verde en `entregas/dia-05/evidencias/prueba-verde-manual.txt`.

### 1.2 Prompts de las sesiones del 25 y 26/11/2026
El texto exacto de los prompts de esas sesiones (exploración con playwright-cli, creación de las 4 pruebas y corrección del CI) **no quedó guardado** en el repositorio, por lo que no se reproduce aquí para no inventarlo. Las tareas que se pidieron al agente fueron:

- Explorar la app con playwright-cli en 1280x800 y 390x844 y revisar la consola.
- Escribir las 4 pruebas (inicio de sesión, contraseña incorrecta, agregar producto y bajo el mínimo) con SKU único y limpieza.
- Corregir el formulario móvil en `public/styles.css`.
- Ajustar `webServer` y el reporte HTML tras la revisión del PR #17.

Los prompts de referencia de la actividad están en `docs/actividades-oficiales/dia-05/GUIA.md`, sección 5.

---

## 2. Error o mala decisión de la IA y cómo lo detecté

**Error 1 — `webServer` dependiente de `.env` (PR #17).**
La primera configuración de Playwright arrancaba la app con `npm start`, que ejecuta `node --env-file=.env server.js`. Sin `.env` (como en GitHub Actions), Node termina con `.env: not found` y código 9. Además, no se generaba el reporte HTML.
- **Cómo se detectó:** en la revisión del PR #17 por José Antonio y su agente, reproduciendo con `CI=1` y sin `.env`.
- **Corrección:** `webServer.command` pasó a `node --env-file-if-exists=.env server.js` y se configuró `reporter: [['list'], ['html', { open: 'never' }]]`.

**Error 2 — la demostración rojo-verde se hizo con un script (primer intento).**
En el primer intento, un script sustituyó `<` por `<=` y restauró el archivo automáticamente. La actividad pide que el cambio sea **a mano**. Lo señaló el issue #18 y se repitió el 27/11 con la edición hecha por mí (sección 4).

**Error 3 — evidencia con un código de salida vacío (27/11).**
Al guardar `prueba-verde-manual.txt`, el agente usó `${PIPESTATUS[0]}`, que no funciona en zsh (el shell de macOS), y la línea quedó como `exit=` sin valor. Se detectó al revisar el contenido del archivo y se corrigió a `exit=0`, respaldado por el resumen `# fail 0` de `npm test` que está en el mismo archivo.

---

## 3. Comando o herramienta que aprobé o rechacé, y por qué

- **Aprobado:** `npx playwright test` con el código roto. Era necesario para comprobar que las pruebas detectan el error.
- **Rechazado:** hacer commit del código con `<=` y que el agente lo restaurara automáticamente. Le pedí explícitamente "No hagas commit del código incorrecto y no lo restaures todavía", porque el cambio y la restauración debían ser manuales y el código roto no debía llegar al repositorio.
- **Aprobado:** `git diff public/logic.mjs` antes y después, para confirmar que solo cambió la comparación y que al final el archivo quedó idéntico a `main`.

---

## 4. Demostración de detección de errores (hecha a mano el 27/11/2026)

| Paso | Quién | Resultado |
|---|---|---|
| 1. Línea base | Agente | `npm test` 13/13 · `npx playwright test` 4/4 |
| 2. Cambio de `cantidad < minimo` a `cantidad <= minimo` en `public/logic.mjs` (línea 22, `isLowStock`) | **Luis, a mano en el editor** | `git diff`: solo esa línea; `node --check` sin errores |
| 3. `npx playwright test` | Agente | **1 failed, 3 passed**, código 1 → [`evidencias/prueba-roja-manual.txt`](evidencias/prueba-roja-manual.txt) |
| 4. Restaurar `<=` a `<` | **Luis, a mano en el editor** | `git diff --exit-code public/logic.mjs` vacío (idéntico a `main`) |
| 5. `npm test` y `npx playwright test` | Agente | 13/13 y **4 passed**, código 0 → [`evidencias/prueba-verde-manual.txt`](evidencias/prueba-verde-manual.txt) |

**Por qué falla:** la prueba `existencias-bajas.spec.mjs` crea un producto con cantidad 5 y mínimo 5. Con `<=`, la app lo marca como **"Bajo mínimo"**, aunque la regla DT-1 (`cantidad < minimo`) dice que está **"En orden"**. Las otras 3 pruebas siguen en verde porque no dependen de esa comparación.

El código roto **nunca se subió**. La prueba borra sus productos en un bloque `finally`, también cuando falla.

Los archivos `evidencias/prueba-roja.txt`, `evidencias/fallo-rojo.png` y `evidencias/prueba-verde.txt` corresponden al primer intento con script (25-26/11). Se conservan como antecedente.

---

## 5. Exploración, consola y problema real

- **Capturas:** [`capturas/escritorio-1280x800.png`](capturas/escritorio-1280x800.png) y [`capturas/movil-390x844.png`](capturas/movil-390x844.png).
- **Consola (playwright-cli):** 0 errores y 0 advertencias en la sesión explorada.
- **Problema real elegido:** en móvil (390x844) el formulario de registro se desbordaba horizontalmente y los campos "Cantidad" y "Cantidad mínima" y el botón "Registrar producto" no se veían completos.
- **Corrección:** estilos responsivos en `public/styles.css`. Verificado en [`capturas/movil-corregido-390x844.png`](capturas/movil-corregido-390x844.png).
- **Observación no corregida:** a 1280 px, la columna "Acciones" de la tabla queda parcialmente recortada por el scroll horizontal. Queda registrada para otra tarea.

---

## 6. Cómo comprobé que funciona

- `npm test` (`node --test`): 13 pruebas aprobadas.
- `npx playwright test`: 4 pruebas aprobadas.
  1. `login.spec.mjs` — inicio de sesión correcto.
  2. `password-incorrecta.spec.mjs` — rechaza una contraseña incorrecta.
  3. `registrar-producto.spec.mjs` — agrega un producto.
  4. `existencias-bajas.spec.mjs` — marca un producto bajo el mínimo.
- Cada prueba usa un SKU único `D5-…` y borra solo lo que creó, con el usuario `pchifus.prueba2`. No se tocaron los datos de `pchifus.prueba1`.
- En la revisión del 27/11 sobre `main` (José): `npx playwright test` 4/4 con `CI=1` y sin `.env`, reporte HTML generado y 0 residuos `D5-`.
- Las credenciales se leen de `.env` (`TEST_EMAIL`, `TEST_PASSWORD`), que está en `.gitignore`. No aparecen en el código, las capturas ni los registros.

---

## 7. Estado de los pendientes anteriores

- [x] Sincronizar con el Día 4 (PR #16 fusionado; PR #17 fusionado sobre `main`).
- [x] Conflicto de `.gitignore` resuelto conservando ambos bloques.
- [x] Playwright en CI sin `.env` (`--env-file-if-exists`) y reporte HTML.
- [x] Revisión del PR #17 por José.
- [x] Falla provocada a mano y recuperación (sección 4).
- [ ] Revisión del PR de esta bitácora por José y subida de la carpeta a Drive.

---

## 8. Archivos

- `README.md` — esta bitácora (oficial).
- `Pchifus_Evidencia_Dia_05.md` — ficha de entrega para Drive.
- `bitacora.md`, `reporte-pruebas.md` — anexos del 25-26/11.
- `capturas/` — exploración en escritorio y móvil.
- `evidencias/` — salidas roja y verde (manuales del 27/11 y antecedente con script).
