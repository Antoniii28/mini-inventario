# Día 5 · Prueba tu app con los ojos del agente

> Fuente oficial: [`actividad-dia-05.html`](actividad-dia-05.html) · [`actividad-dia-05.pdf`](actividad-dia-05.pdf).
> Las secciones 1 a 11 copian la actividad oficial. La sección 12 son **notas del equipo**.

| Dato | Valor |
|---|---|
| Duración oficial | 60 minutos |
| Modalidad oficial | **Individual** |
| Responsable asignado (equipo) | Luis Angel · `dosientos77-web` |
| Rama oficial | `dia-05-pruebas` |

## 1. Objetivo
"Primero el agente usa tu aplicación en un navegador real, toma capturas y reporta problemas. Después conviertes ese recorrido en pruebas que se pueden repetir."

## 2. Requisitos previos
- La web conectada a Supabase.
- Un usuario confirmado para pruebas.

## 3. Herramientas
| Herramienta | Para qué sirve | Costo |
|---|---|---|
| Claude Code o Codex | El agente con el que haces toda la actividad. | Codex viene en ChatGPT Free |
| Git y GitHub | Guardar versiones y publicar tu repositorio. | Gratis |
| GitHub CLI (gh) | Que el agente trabaje con GitHub desde la terminal. | Gratis |
| Node.js 22 | Ejecutar la web. | Gratis |
| Supabase (plan Free) | Base de datos PostgreSQL e inicio de sesión. | Gratis |
| playwright-cli | Que el agente abra tu app, la use y tome capturas. | Gratis |
| Skill playwright-cli | Le enseña al agente a usar playwright-cli. Se instala desde skills.sh. | Gratis, **requiere Node.js 22.20 o superior** |
| Playwright Test | Pruebas automáticas que se guardan en el proyecto. | Gratis |

## 4. Instrucciones obligatorias
1. **Instala las herramientas (10 min):**
   - Crea la rama `dia-05-pruebas`.
   - Agrega `TEST_EMAIL` y `TEST_PASSWORD` a tu `.env`.
   - Instala playwright-cli y su skill, y reinicia la sesión del agente.
2. **Deja que el agente explore (15 min):** comandos útiles: `open`, `resize`, `screenshot` y `console`.
3. **Elige un problema (5 min):** revisa las capturas **tú mismo**. Elige un problema real, sea funcional o visual, y pide corregirlo.
4. **Crea pruebas permanentes (20 min):** instala Playwright Test con `npm init playwright@latest` y después pide las pruebas.
5. **Demuestra que detectan errores (10 min):**
   - Cambia **a mano** la comparación del producto bajo el mínimo, corre las pruebas y confirma que fallan.
   - Revierte el cambio, confirma que pasan y abre el pull request.

## 5. Prompts oficiales
```text
Arranca la app. Usa playwright-cli para abrir http://localhost:3000, iniciar sesión con TEST_EMAIL y TEST_PASSWORD de .env sin mostrarlos, y agregar un producto con cantidad menor al mínimo. Toma capturas en 1280x800 y en 390x844, y revisa los errores de consola. Guarda las capturas en entregas/dia-05/ y reporta lo que encontraste. No corrijas nada todavía.
```
```text
Escribe pruebas de Playwright en tests/ para: iniciar sesión, rechazar una contraseña incorrecta, agregar un producto y marcar un producto bajo el mínimo. Lee TEST_EMAIL y TEST_PASSWORD del entorno. Cada prueba usa un SKU único y borra lo que creó. Configura webServer para arrancar la app. Corre las pruebas y muéstrame el resultado.
```

## 6. Comandos
```bash
npm install -g @playwright/cli@latest
playwright-cli --help
npm init playwright@latest
npx playwright test
```
| Para | Claude Code | Codex |
|---|---|---|
| Instalar la skill | `npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli -a claude-code -y` | `npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli -a codex -y` |
| Dónde queda | `.claude/skills/playwright-cli/` (comprobar con `/skills`) | `.agents/skills/playwright-cli/` |

*Si te atoras:* `npx playwright install --with-deps chromium`.

## 7. Archivos solicitados
- Capturas en `entregas/dia-05/` (1280x800 y 390x844).
- Pruebas de Playwright en `tests/`.
- Configuración de Playwright con `webServer`.
- `entregas/dia-05/README.md`.

## 8. Evidencias
- Capturas de escritorio y móvil, y el reporte de la consola.
- Descripción de un problema real y de su corrección.
- La salida de las 4 pruebas pasando, sin dejar datos de prueba.
- La falla provocada a mano y el resultado después de revertirla.

## 9. Rúbrica (100 puntos)
| Criterio | Qué debe verse | Puntos |
|---|---|---|
| Exploración | Hay capturas en escritorio y móvil, y un reporte de consola. | 20 |
| Problema real | Describes un problema encontrado y su corrección. | 15 |
| Pruebas | Las 4 pruebas pasan y no dejan datos de prueba. | 20 |
| Detección de errores | Muestras la falla provocada y el resultado después de revertirla. | 25 |
| Bitácora | Incluye prompts clave, un error de la IA, un comando aprobado o rechazado y cómo comprobaste el resultado. | 20 |

## 10. Criterios de aceptación
- [ ] Capturas reales 1280x800 y 390x844 en `entregas/dia-05/`.
- [ ] Reporte de los errores de consola.
- [ ] Un problema real elegido por Luis, corregido y documentado.
- [ ] 4 pruebas en `tests/`: iniciar sesión, contraseña incorrecta, agregar producto y bajo mínimo.
- [ ] Cada prueba usa un SKU único y borra lo que creó.
- [ ] `webServer` configurado; `npx playwright test` pasa.
- [ ] Evidencia de la falla provocada a mano y de la recuperación.
- [ ] Las credenciales solo están en `.env`; nunca en el código ni en las capturas.

## 11. Entrega final
"Enlace al pull request, con capturas y `entregas/dia-05/README.md`." Más los 4 elementos de la bitácora.
*Si terminas antes:* agrega una prueba de edición y otra para campos vacíos.

## 12. Notas del equipo (no oficiales)
| # | Nota |
|---|---|
| N-1 | **Dependencia:** el Día 4 debe estar integrado en `main`. Hacen falta el proyecto Supabase, la política `delete` (las pruebas borran lo que crean) y un usuario confirmado. |
| N-2 | El proyecto Supabase lo crea Jose. Jose comparte con Luis, por un canal privado y **nunca por el repositorio**: `SUPABASE_URL`, la llave publishable o anon y el correo y la contraseña del usuario de prueba. |
| N-3 | Bloqueo B3: las skills requieren Node 22.20 o superior. Luis debe comprobarlo con `node --version`. |
| N-4 | `tests/logic.test.mjs` (Día 3) usa `node --test`. Hay que evitar que Playwright tome esos archivos o que `node --test` tome las pruebas de Playwright. Por ejemplo: `testMatch` de Playwright en `*.spec.*` y `node --test tests/*.test.mjs`. |
| N-5 | Mientras se hace el Día 4, Luis solo puede preparar su entorno: instalar herramientas y leer esta guía. No debe simular pruebas que requieren Supabase. |
