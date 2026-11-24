# Plan de trabajo · Días 4 a 8

Actualizado: 2026-11-24 · Equipo Pchifus · Fuente de las instrucciones: [`docs/actividades-oficiales/`](../actividades-oficiales/README.md)

> Estados permitidos: Pendiente · En progreso · Bloqueado · En revisión · Completado.
> Una tarea solo pasa a **Completado** cuando sus entregables se verificaron (archivos en `main`, PR fusionado y evidencia real).

## 1. Estado real al 2026-11-24

| Día | Estado | Evidencia |
|---|---|---|
| 1 | Completado | PR #1 y #2 fusionados |
| 2 | Completado | PR #8 fusionado (`420446a`) |
| 3 | **En revisión** | PR #9 **abierto**, sin revisor asignado ni aprobación. El 2026-11-24 se verificó en una copia temporal: `npm ci` correcto, `npm test` → 7/7, Express sirve `/`, `/config.js`, `/app.js` y `/logic.mjs`, y sin `.env` no arranca. **No verificado:** la integración con Supabase (el proyecto aún no existe). La descripción del PR dice "inicio de sesión probado" y "registro verificado en Supabase", pero la bitácora del Día 3 dice que no se conectó con Supabase. |
| 4 a 8 | Pendiente | Issues #10 a #14 |

## 2. Bloqueos y decisiones pendientes

| ID | Bloqueo o decisión | Afecta | Quién resuelve | Propuesta |
|---|---|---|---|---|
| B1 | PR #9 (Día 3) sin revisión ni integración; su descripción no coincide con su bitácora | Día 4 en adelante | Luis corrige la descripción; Jose revisa | Corregir el texto del PR, revisar y fusionar |
| B2 | No hay actividad oficial del Día 3. El Día 4 espera `public/productos.js` con `localStorage`, pero el código usa `public/app.js` con Supabase | Día 4 | Jose | Adaptar el Día 4 sobre `app.js` y documentarlo |
| B3 | Node v22.18.0 en la computadora de Jose; las skills (Días 4 y 5) requieren **22.20 o superior** | Días 4 y 5 | Cada integrante en su equipo | 🔎 Actualizar Node 22 (requiere autorización; es una instalación) |
| B4 | Según la documentación de GitHub, solo el **propietario** de un repositorio personal crea secretos de Actions. Luis tiene permiso `write` | Día 6, paso 2 | 🔎 Jose y Luis | Jose ejecuta `gh secret set` y se documenta, o se consulta al profesor |
| B5 | Las 5 actividades dicen **"Modalidad: individual"**. No hay texto oficial que permita repartir los días entre integrantes | Todos | 🔎 Equipo → profesor | Confirmar con el profesor antes de entregar. Cada bitácora nombra solo a su responsable real |
| B6 | La política oficial del lector del Día 8 (`using (true)`) da a `inventario_lector` acceso a productos de **todos** los usuarios | Día 8 | 🔎 Jose | Usar el SQL oficial solo con datos de prueba y documentar el riesgo y las mitigaciones |
| B7 | Variable `SUPABASE_ANON_KEY` (Día 3) frente a `SUPABASE_KEY` (Días 4 y 6) | Días 4 y 6 | Jose en el Día 4 | Renombrar a `SUPABASE_KEY` |
| D-1 | El Día 4 pide **registro** (cambia D-1 del Día 2) y política **delete** | Día 4 | Jose | Actualizar `docs/requisitos.md` y `docs/diseno.md` en `dia-04-supabase` |
| D-3 | SKU único por usuario **sin distinguir mayúsculas y minúsculas** (cambia D-3 del Día 2) | Día 4 | Decidido por Jose en el plan maestro | `create unique index ... on productos (user_id, lower(sku))` |

## 3. Tareas

| ID | Día | Actividad | Responsable | Rama | Archivos | Depende de | Duración | Prioridad | Criterio de aceptación | Evidencia | Estado | Issue | PR |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T-00 | — | Documentación y plan (este PR) | Agente para Jose | `docs/actividades-oficiales-04-08` | `docs/actividades-oficiales/**`, `docs/gestion/**`, `docs/prompts/**`, `README.md`, `CLAUDE.md`, `.gitignore`, `entregas/dia-0{4..8}/Pchifus_Evidencia_*.md` | — | 15 min de revisión | Alta | Luis revisa y aprueba | PR aprobado | En revisión | — | PR de documentación |
| T-01 | 3 | Corregir la descripción del PR #9 para que coincida con lo realmente probado | Luis | `feature/dia-03-desarrollo` | Solo el texto del PR | — | 10 min | Alta | La descripción no afirma pruebas con Supabase que no ocurrieron | Texto del PR | Pendiente | — | #9 |
| T-02 | 3 | Revisar y fusionar el Día 3 | Jose | — | — | T-01 | 20 min | **Crítica** | Revisión aprobada en GitHub y PR #9 fusionado | Revisión registrada | En revisión | #3 a #7 | #9 |
| T-03 | — | Node 22 ≥ 22.20 en ambas computadoras | Jose y Luis (cada uno) | — | — | — | 15 min | Alta | `node --version` ≥ v22.20 | Salida del comando | Bloqueado (B3) | — | — |
| T-04 | — | Consultar al profesor sobre la modalidad individual y los secretos (B4, B5) | Jose y Luis | — | — | — | 10 min | Alta | Respuesta del profesor registrada | Mensaje o captura | Pendiente | — | — |
| T-10 | 4 | Proyecto Supabase, MCP, skills, migración, RLS (4 operaciones), registro e inicio de sesión, aislamiento | Jose | `dia-04-supabase` | `supabase/migrations/*`, `public/app.js`, `server.js`, `.env.example`, `docs/requisitos.md`, `docs/diseno.md`, `entregas/dia-04/**` | T-02, T-03 | 60 a 75 min | **Crítica** | Criterios de la [guía §10](../actividades-oficiales/dia-04/GUIA.md) | 2 capturas de aislamiento, SQL explicado, `git check-ignore .env`, bitácora | Pendiente | [#10](https://github.com/Antoniii28/mini-inventario/issues/10) | — |
| T-11 | 4 | Crear 2 usuarios confirmados y compartir con Luis las credenciales del usuario de prueba **por un canal privado** | Jose | — | — | T-10 | 5 min | Alta | Luis puede iniciar sesión | Confirmación de Luis | Pendiente | #10 | — |
| T-12 | 4 | Revisión del PR del Día 4 | Luis | — | — | T-10 | 15 min | Alta | Revisión aprobada | Revisión en GitHub | Pendiente | #10 | — |
| T-20 | 5 | Exploración con playwright-cli, problema real, 4 pruebas, falla provocada y recuperación | Luis | `dia-05-pruebas` | `tests/*.spec.*`, `playwright.config.*`, `package.json`, `entregas/dia-05/**` | T-10, T-11, T-03 | 60 a 75 min | Alta | [Guía §10](../actividades-oficiales/dia-05/GUIA.md) | Capturas 1280x800 y 390x844, consola, salida roja y verde | Pendiente | [#11](https://github.com/Antoniii28/mini-inventario/issues/11) | — |
| T-21 | 5 | Revisión del PR del Día 5 | Jose | — | — | T-20 | 15 min | Alta | Revisión aprobada | Revisión en GitHub | Pendiente | #11 | — |
| T-30 | 6 | Secretos de Actions (`gh secret set` × 4) | 🔎 Jose (propietario; B4) o Luis si el profesor lo indica | — | — | T-20 | 10 min | Alta | `gh secret list` muestra los 4 nombres | Captura de `gh secret list` (solo nombres) | Bloqueado (B4) | #12 | — |
| T-31 | 6 | `ci.yml`, verde → rojo → verde, diagnóstico con `gh`, merge | Luis | `dia-06-ci` | `.github/workflows/ci.yml`, `entregas/dia-06/**` | T-21, T-30 | 60 min | Alta | [Guía §10](../actividades-oficiales/dia-06/GUIA.md) | Capturas de los 3 estados y explicación propia | Pendiente | [#12](https://github.com/Antoniii28/mini-inventario/issues/12) | — |
| T-40 | 7 | Prueba sin skill, skill `pruebas-inventario`, repetición, subagente `revisor-pr` | Luis | `dia-07-skill` | `.claude/skills/pruebas-inventario/SKILL.md`, `.claude/agents/revisor-pr.md`, `entregas/dia-07/**` | T-31 | 60 min | Media | [Guía §10](../actividades-oficiales/dia-07/GUIA.md) | Ambos códigos, comparación, hallazgo y `git status` | Pendiente | [#13](https://github.com/Antoniii28/mini-inventario/issues/13) | — |
| T-41 | 7 | Revisión del PR del Día 7 | Jose | — | — | T-40 | 10 min | Media | Revisión aprobada | Revisión en GitHub | Pendiente | #13 | — |
| T-50 | 8 | `supabase-lectura`, `inventario_lector`, servidor FastMCP, comparación, inyección | Jose | `dia-08-mcp` | `mcp-inventario/server.py`, `mcp-inventario/requirements.txt`, `.gitignore`, `entregas/dia-08/**` | T-10 (más 3 productos, uno bajo el mínimo) | 60 a 75 min | Alta | [Guía §10](../actividades-oficiales/dia-08/GUIA.md) | Escritura rechazada, conexión con el lector, herramientas, comparación, inyección | Pendiente | [#14](https://github.com/Antoniii28/mini-inventario/issues/14) | — |
| T-51 | 8 | Sincronizar `dia-08-mcp` con `main` (merge) y volver a correr `npm test` y `npx playwright test` | Jose | `dia-08-mcp` | — | T-50 y los días integrados | 10 min | Alta | Las pruebas pasan después de sincronizar | Salida de las pruebas | Pendiente | #14 | — |
| T-52 | 8 | Revisión del PR del Día 8 | Luis | — | — | T-51 | 15 min | Alta | Revisión aprobada | Revisión en GitHub | Pendiente | #14 | — |
| T-60 | 4 a 8 | Completar `Pchifus_Evidencia_Dia_0X.md` y subir a Drive | Responsable de cada día | La rama de su día | `entregas/dia-0X/Pchifus_Evidencia_Dia_0X.md` | PR del día fusionado | 10 min por día | Media | Checklist de la plantilla completo y subida **confirmada por el responsable** | Enlace a Drive | Pendiente | #10 a #14 | — |

## 4. Cronograma acelerado (una jornada de unas 6 horas)

| Hora | Jose (`Antoniii28`) | Luis (`dosientos77-web`) | Punto de integración |
|---|---|---|---|
| 0:00–0:20 | Actualizar Node (T-03). Revisar este PR de documentación. | Actualizar Node (T-03). Corregir la descripción del PR #9 (T-01). Revisar el PR de documentación. | Fusionar el PR de documentación |
| 0:20–0:40 | Revisar y fusionar el PR #9 (T-02) | Instalar playwright-cli y su skill; leer la guía del Día 5 (sin tocar archivos del Día 4) | **Día 3 en `main`** |
| 0:40–1:50 | **Día 4** (T-10, T-11) | Preparar el entorno; consultar al profesor (T-04) | — |
| 1:50–2:05 | Responder a la revisión | Revisar el PR del Día 4 (T-12) | **Día 4 en `main`** |
| 2:05–3:15 | **Día 8** (T-50) en `dia-08-mcp` | **Día 5** (T-20) | — |
| 3:15–3:30 | Revisar el PR del Día 5 (T-21); crear los secretos (T-30, si así se decide) | Responder a la revisión | **Día 5 en `main`** |
| 3:30–4:30 | Terminar el Día 8; abrir el PR | **Día 6** (T-31) | Luis fusiona el Día 6 tras la revisión de Jose |
| 4:30–5:30 | Sincronizar el Día 8 con `main` (T-51); revisar el Día 7 al final | **Día 7** (T-40) | **Día 6 y Día 7 en `main`** |
| 5:30–6:00 | Responder a la revisión del Día 8; completar `Pchifus_Evidencia_Dia_04/08` | Revisar el Día 8 (T-52); completar `Pchifus_Evidencia_Dia_05/06/07` | **Día 8 en `main`**; subidas a Drive |

## 5. Plan alternativo (resto de la semana)

| Fecha | Jose | Luis | Condición para avanzar |
|---|---|---|---|
| Mar 24 | T-02 (fusionar el Día 3), T-03 y el **Día 4** | T-01, T-03, preparar el entorno y T-04 | Día 4 en `main` |
| Mié 25 | **Día 8** (sin integrar) | **Día 5** | Día 5 en `main` |
| Jue 26 | Secretos (T-30); revisar el Día 5 y el Día 6; terminar el Día 8 | **Día 6** | Día 6 en `main` |
| Vie 27 | Sincronizar e integrar el **Día 8**; revisar el Día 7; Drive | **Día 7**; revisar el Día 8; Drive | Todo en `main` |

Si un bloqueo persiste más de 2 horas, se registra en la columna Estado como "Bloqueado", con la causa, y el responsable avanza con la siguiente tarea independiente (por ejemplo, el Día 8 no depende de los Días 5 a 7).

## 6. Acciones personales que el agente no puede hacer

| Día | Acción personal del responsable |
|---|---|
| 4 | Crear la cuenta y el proyecto de Supabase; autorizar el MCP en el navegador; **leer y aprobar el SQL**; crear los usuarios en el panel; tomar las 2 capturas; explicar con sus palabras un SQL aprobado. |
| 5 | Escribir `TEST_EMAIL` y `TEST_PASSWORD` en su `.env`; revisar las capturas **él mismo** y elegir el problema; cambiar **a mano** la comparación de bajo mínimo. |
| 6 | Ejecutar `gh secret set` (ver B4); no pegar secretos en el chat; tomar las capturas de rojo y verde; explicar la falla **con sus palabras**; hacer el merge. |
| 7 | Abrir **conversaciones limpias**; descartar el primer archivo; escribir la comparación. |
| 8 | Ejecutar el SQL del lector con una contraseña propia; guardar `DATABASE_URL`; registrar los MCP y autorizar; crear el producto de inyección desde la web; **rechazar** las escrituras. |

## 7. Entregas a Google Drive

| Día | Responsable de subirlo | Archivo índice | Estado de la subida |
|---|---|---|---|
| 4 | Jose | [`entregas/dia-04/Pchifus_Evidencia_Dia_04.md`](../../entregas/dia-04/Pchifus_Evidencia_Dia_04.md) | No subido |
| 5 | Luis | [`entregas/dia-05/Pchifus_Evidencia_Dia_05.md`](../../entregas/dia-05/Pchifus_Evidencia_Dia_05.md) | No subido |
| 6 | Luis | [`entregas/dia-06/Pchifus_Evidencia_Dia_06.md`](../../entregas/dia-06/Pchifus_Evidencia_Dia_06.md) | No subido |
| 7 | Luis | [`entregas/dia-07/Pchifus_Evidencia_Dia_07.md`](../../entregas/dia-07/Pchifus_Evidencia_Dia_07.md) | No subido |
| 8 | Jose | [`entregas/dia-08/Pchifus_Evidencia_Dia_08.md`](../../entregas/dia-08/Pchifus_Evidencia_Dia_08.md) | No subido |

"Subido" solo se marca cuando el responsable confirma que subió la carpeta.
