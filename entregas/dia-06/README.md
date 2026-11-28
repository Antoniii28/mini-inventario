# Día 6 — Integración continua con GitHub Actions

**Proyecto:** Mini Inventario
**Equipo:** Pchifus
**Responsable:** Luis Ángel Osorio Galicia (`dosientos77-web`)
**Fecha de trabajo:** 27 de noviembre de 2026
**Rama:** `dia-06-ci`
**Issue:** [#12](https://github.com/Antoniii28/mini-inventario/issues/12)
**Pull Request:** [#23](https://github.com/Antoniii28/mini-inventario/pull/23)

---

## 1. Objetivo

Automatizar la ejecución de las pruebas de Mini Inventario con GitHub Actions cada vez que se abra o actualice un Pull Request hacia `main`, y demostrar en el mismo PR el ciclo verde → rojo → verde con un diagnóstico hecho con `gh`.

## 2. Flujo de trabajo (`.github/workflows/ci.yml`)

| Requisito de la actividad | Cómo se cumple |
|---|---|
| En cada `pull_request` hacia `main` | `on: pull_request: branches: [main]` |
| `ubuntu-latest` con Node 22 | `runs-on: ubuntu-latest` · `actions/setup-node@v4` con `node-version: '22'` y caché de npm |
| `npm ci` | Paso *Instalar dependencias* |
| Chromium con sus dependencias | `npx playwright install --with-deps chromium` |
| Pruebas | `npm test` (13 pruebas de `node --test`) y `npx playwright test --trace=off` (4 pruebas) |
| Secretos como variables de entorno | `SUPABASE_URL`, `SUPABASE_KEY`, `TEST_EMAIL` y `TEST_PASSWORD` desde `${{ secrets.* }}`, solo en el paso de Playwright |
| Reporte como artefacto | `actions/upload-artifact@v4` sube `playwright-report/` (nombre `reporte-playwright`, 7 días), también cuando las pruebas fallan (`if: ${{ !cancelled() }}`) |

Permisos mínimos: `permissions: contents: read`. Validado con `actionlint` sin errores.

## 3. Secretos

`gh secret list` (solo nombres, nunca valores):

```
SUPABASE_KEY	2026-11-27T07:15:57Z
SUPABASE_URL	2026-11-27T07:15:57Z
TEST_EMAIL	2026-11-27T07:15:57Z
TEST_PASSWORD	2026-11-27T07:15:58Z
```

- Los creó José (propietario del repositorio, bloqueo B4) con `gh secret set`. Luis comprobó los nombres con `gh secret list`.
- `ci.yml` no contiene valores. En los registros de Actions aparecen como `***`.
- Ver la sección 7: un artefacto llegó a contener la contraseña de prueba. Se detectó, se borró y se corrigió.

## 4. Demostración verde → rojo → verde (mismo PR #23)

| # | Commit | Ejecución | Resultado | Evidencia |
|---|---|---|---|---|
| 1 | `9b6b559` ci: pasar secretos como variables… | [46092041998](https://github.com/Antoniii28/mini-inventario/actions/runs/46092041998) | ✅ success · 13/13 y 4 passed | [`capturas/01-verde.png`](capturas/01-verde.png) · [`01-verde-run.png`](capturas/01-verde-run.png) · [`evidencias/ci-1-verde.txt`](evidencias/ci-1-verde.txt) |
| 2 | `86eeb82` test: cambio temporal que rompe una prueba | [46092373479](https://github.com/Antoniii28/mini-inventario/actions/runs/46092373479) | ❌ failure · 1 failed, 3 passed | [`capturas/02-rojo.png`](capturas/02-rojo.png) · [`02-rojo-run.png`](capturas/02-rojo-run.png) · [`evidencias/ci-2-rojo.txt`](evidencias/ci-2-rojo.txt) |
| 3 | `8cc924c` fix: revertir la prueba rota… | [46092826256](https://github.com/Antoniii28/mini-inventario/actions/runs/46092826256) | ✅ success · 13/13 y 4 passed | [`capturas/03-verde.png`](capturas/03-verde.png) · [`03-verde-run.png`](capturas/03-verde-run.png) · [`evidencias/ci-3-verde.txt`](evidencias/ci-3-verde.txt) · [`reporte-playwright/index.html`](reporte-playwright/index.html) |

- **Capturas:** las tomó el agente con Playwright (Chromium headless) de las páginas públicas del PR en GitHub, a pedido de Luis. Son capturas reales de GitHub, sin sesión iniciada.
- **Cambio que rompió la prueba:** en `tests/login.spec.mjs` el encabezado esperado pasó de `'Mi inventario'` a `'Mi almacén'`. Es una prueba que solo inicia sesión: no crea ni borra datos en Supabase.
- **Nota del equipo:** la guía dice "sube un cambio que rompa una prueba" y "pide el diagnóstico sin dar pistas". Luis pidió al agente que hiciera todo el trabajo técnico de forma autónoma, así que **el agente introdujo la falla y la diagnosticó**. El agente conocía la causa de antemano. Aun así, el diagnóstico se hizo con los comandos `gh` que pide la actividad y está en la sección 5.

## 5. Diagnóstico con `gh` (hecho por el agente)

```
$ gh pr checks 23
Pruebas Node.js y Playwright	fail	58s	…/actions/runs/46092373479/job/140815998841

$ gh run list --branch dia-06-ci --limit 3
completed	failure	…	46092373479	1m2s
completed	success	…	46092041998	41s

$ gh run view 46092373479 --log-failed
  ✓  1 tests/existencias-bajas.spec.mjs … Alerta de existencias bajas
  ✘  2 tests/login.spec.mjs:3:1 › Día 5 - Inicio de sesión correcto
  ✓  3 tests/password-incorrecta.spec.mjs … Contraseña incorrecta
  ✓  4 tests/registrar-producto.spec.mjs … Registrar producto
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('heading', { name: 'Mi almacén' })
    Error: element(s) not found
      > 19 |   ).toBeVisible();
  1 failed · 3 passed
##[error]Process completed with exit code 1.
```

**Explicación del agente (antes de corregir):** los secretos sí llegaron (aparecen como `***`) y el inicio de sesión funciona, porque las otras 3 pruebas también inician sesión y pasan. Lo que falla es la prueba: espera un encabezado "Mi almacén", pero la app muestra "Mi inventario" (`public/index.html:32`). La corrección es devolver el texto esperado a "Mi inventario".

**Aprobación:** Luis aprobó el diagnóstico y la corrección el 27/11. El agente hizo el commit `8cc924c` y el mismo PR volvió a verde.

## 6. Causa de la falla explicada por Luis (con sus palabras)

> ✍️ **Pendiente: lo escribe Luis.** La actividad exige que la causa se explique con las palabras del estudiante. El agente no redacta esta sección.

## 7. Error o mala decisión de la IA y cómo se detectó

**Error 1 — el artefacto publicó la contraseña de prueba (el más grave).**
El agente configuró que se subiera `playwright-report/` completo como artefacto, sin considerar que `playwright.config.mjs` tiene `trace: 'retain-on-failure'`. En la ejecución roja, la traza de la prueba fallida grabó las peticiones de red, y con ellas **`TEST_PASSWORD` en texto plano**, además del correo y la llave publishable. El repositorio es público, así que cualquier usuario con sesión en GitHub podía descargar ese artefacto.
- **Cómo se detectó:** el agente notó que el artefacto rojo pesaba 1 MB frente a 202 KB del verde. Lo descargó en una carpeta temporal y comparó sus bytes con los valores de `.env`, sin imprimirlos. Encontró la contraseña en 3 archivos de la traza y borró la copia descargada de inmediato.
- **Acciones:**
  1. Luis autorizó borrar el artefacto `15241299671` (`gh api -X DELETE …`). La ejecución 2 ya no tiene artefactos.
  2. `ci.yml` ahora ejecuta `npx playwright test --trace=off`. El artefacto de la ejecución 3 se revisó igual: no contiene la contraseña, el correo ni la llave.
- **Pendiente de seguridad:** el artefacto estuvo publicado unos minutos (01:18 a 01:21 UTC del 28/11). Por precaución hay que **cambiar la contraseña de `pchifus.prueba2`** y actualizar el secreto `TEST_PASSWORD` (José, como propietario).

**Error 2 — la primera versión de `ci.yml` escribía un `.env` y quitaba el reporte HTML.**
La primera versión (commit `d9563b5`) creaba un archivo `.env` con los cuatro secretos dentro del runner y ejecutaba `--reporter=list,junit`. Eso reemplazaba el reporte HTML y subía solo un XML. El agente lo detectó al comparar el flujo con la guía oficial y con el handoff: la configuración de `main` ya arranca sin `.env`. Se corrigió en `9b6b559`.

## 8. Comandos o herramientas aprobados y rechazados

- **Aprobado:** `actionlint .github/workflows/ci.yml`. Valida la sintaxis sin ejecutar nada en GitHub. Sin errores.
- **Aprobado:** `gh api -X DELETE repos/Antoniii28/mini-inventario/actions/artifacts/15241299671`. Es destructivo, pero necesario para retirar la contraseña expuesta. Luis lo autorizó explícitamente.
- **Aprobado:** `--trace=off` en CI, para que ninguna falla futura vuelva a publicar trazas.
- **Rechazado:** hacer merge del PR sin la revisión de José (regla de `CLAUDE.md`).

## 9. Prompts clave

**Sesión del 27/11 (texto real, extracto del prompt de Luis al agente):**

> Claude, quiero que completes automáticamente todo el trabajo técnico pendiente del Día 6 de Mini Inventario. […]
> 2. Introduce una falla controlada y reversible en una prueba, sin modificar datos de Supabase ni tocar `main`. […]
> 6. Ejecuta el diagnóstico usando `gh pr checks`, `gh run list` y `gh run view --log-failed`.
> 7. Explícame la causa antes de corregirla, como exige la actividad oficial. No me des pistas falsas ni inventes resultados.
> 8. Cuando apruebe el diagnóstico, restaura el código correcto, haz commit y push. […]
> 13. Deja el PR listo para revisión de José, sin hacer merge.

**Primera versión del flujo (sesión anterior del 27/11):** se pidió "crear un workflow que ejecute las pruebas automáticamente en Pull Requests hacia main, utilizando Node.js 22, Chromium y secretos de GitHub". El texto exacto de esa sesión no se conservó. El prompt oficial de referencia está en `docs/actividades-oficiales/dia-06/GUIA.md`, sección 5.

## 10. Cómo comprobé que funciona

- **Local:** `npm test` 13/13 y `npx playwright test --trace=off` 4/4 (17 pruebas).
- **GitHub Actions:** las ejecuciones 1 y 3 del mismo PR terminaron en `success` y la 2 en `failure` (sección 4).
- **Artefacto final:** `reporte-playwright` de la ejecución 3, revisado sin secretos y guardado en `reporte-playwright/index.html`.
- **Secretos:** solo aparecen como `***` en los registros. `ci.yml` y las evidencias no contienen valores.

## 11. Antecedentes (trabajo de Luis antes del 27/11 por la tarde)

- Instaló GitHub CLI con Homebrew y se autenticó con su cuenta.
- Creó la rama `dia-06-ci` y la primera versión de `ci.yml` (commit `d9563b5`).
- Validó con `actionlint`.
- Verificó los cuatro secretos con `gh secret list`: el resultado inicial fue `no secrets found` y, después de que José los creó, aparecieron los cuatro nombres (commit `a1c9719`).

## 12. Pendientes

- [ ] Sección 6: causa de la falla con las palabras de Luis.
- [ ] Cambiar la contraseña de `pchifus.prueba2` y actualizar `TEST_PASSWORD` (José).
- [ ] Revisión de José y merge del PR #23 (la actividad lo pide al final).
- [ ] Subir la carpeta a Drive después del merge.
- [ ] Opcional ("si terminas antes"): proteger `main` para exigir el check (requiere permisos de administrador: José).
