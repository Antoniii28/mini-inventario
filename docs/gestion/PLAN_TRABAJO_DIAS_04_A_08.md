# Plan de trabajo · Días 1 a 10 (detalle de los Días 4 a 8)

Actualizado: 2026-11-27 · Equipo Pchifus · Fuente de las instrucciones: [`docs/actividades-oficiales/`](../actividades-oficiales/README.md)

> Estados permitidos: Pendiente · En progreso · Bloqueado · En revisión · Completado.
> Una tarea solo pasa a **Completado** cuando sus entregables se verificaron (archivos en `main`, PR fusionado y evidencia real).

## 1. Control general de las 10 actividades (2026-11-27)

"Entregado" solo se marca cuando el responsable confirma que subió la carpeta a Drive. Un día solo está **Completado** con el PR fusionado, las evidencias reales y la entrega confirmada.

| Día | Actividad | Responsable | Estado real | Requisitos cumplidos | Requisitos pendientes | Pruebas | Evidencias | Rama y PR | Entrega en Drive |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Repositorio y entorno | Jose | Completado | Repositorio público, `CLAUDE.md`, colaborador, clon verificado | — | Clon de verificación | `entregas/dia-01/` (README y 3 capturas) | `docs/dia-01-*` · #1, #2 | Confirmada por Jose (16/11) |
| 2 | Requisitos y diseño | Jose | Fusionado | 5 historias (#3 a #7), diseño y bitácora | Confirmar la entrega | — | `entregas/dia-02/README.md` | `dia-02-planeacion` · #8 | Por confirmar |
| 3 | Primera versión de la web | Luis | Fusionado | App Express + Supabase, 7 pruebas unitarias | Confirmar la entrega (la conexión con Supabase se probó hasta el Día 4; nota 1) | `npm test` 7/7 | `entregas/dia-03/README.md` | `feature/dia-03-desarrollo` · #9 | Por confirmar |
| 4 | Supabase, RLS e inicio de sesión | Jose | **Completado** | Todos los criterios oficiales; registro con correo real confirmado; 3 capturas | — | `npm test` 13/13 · 27 comprobaciones en navegador · aislamiento en BD | `entregas/dia-04/` | `dia-04-supabase` · #16 (`3524021`) | **Entregado** (confirmado por Jose el 27/11): [carpeta Día 4](https://drive.google.com/drive/folders/1-2oOgVLFxT0y6G4c3lKfQkGciYth_8_V) |
| 5 | Pruebas con Playwright | Luis | **Integrado** (PR #17, `2a4c370`); bitácora pendiente | 4 pruebas con limpieza; `webServer` sin `.env`; reporte HTML; móvil corregido | Issue #18: falla roja **a mano**, prompts reales, evidencia de Drive y sección de pendientes | `npm test` 13/13 + `npx playwright test` 4/4 en `main` con `CI=1` (27/11) | `entregas/dia-05/` | `dia-05-pruebas` · #17 | No entregado (bloqueado por #18) |
| 6 | CI con GitHub Actions | Luis (secretos: Jose) | Pendiente (desbloqueado) | 4 secretos creados por Jose el 27/11 (`gh secret list`); Playwright listo para CI en `main` | `ci.yml`, verde → rojo → verde, artefacto, bitácora | — | — | `dia-06-ci` · — | No entregado |
| 7 | Skill y subagente | Luis | Pendiente | — | Todo; depende del Día 6 | — | — | `dia-07-skill` · — | No entregado |
| 8 | MCP oficial y servidor propio | Jose | **En revisión** (PR #21) | Rol lector con 3 mitigaciones; 2 capas de rechazo verificadas; `supabase-lectura` rechaza `prueba-escritura` (`25006`); 2 herramientas con datos reales; comparación; inyección sin escrituras; bitácora y evidencia | Aprobación de Luis, fusión y Drive | `npm test` 13/13 · Playwright 4/4 · `unittest` 7/7 | `entregas/dia-08/` (README y evidencia) | `dia-08-mcp` · #21 | No entregado |
| 9 | Docker, Render y diagnóstico | Jose | En progreso (PR #20 en borrador) | `Dockerfile` y `.dockerignore`; `0.0.0.0` y `PORT` verificados sin Docker; MCP de Render conectado (solo lectura de servicios); materiales y guía | `docker build`/`run` (falta memoria), CI, servicio Render Free, URL pública, falla y reparación, bitácora, Drive | `npm test` 13/13 | `entregas/dia-09/README.md` (borrador) | `dia-09-render` · #20 | No entregado |
| 10 | Incidente de principio a fin | Jose | Bloqueado | Materiales y guía en el repositorio; los dos reportes oficiales están bloqueados (web y BD); el caso de espacios en el SKU no se reproduce desde la web | Consultar al profesor qué incidente usar; necesita el Día 9 publicado | — | — | `dia-10-incidente` · — | No entregado |

**Nota 1 (Día 3):** la descripción del PR #9 dice "Inicio de sesión probado" y "Registro de productos verificado en Supabase", pero no se corrigió antes de la fusión. Como el PR ya está cerrado, la fuente fiable es [`entregas/dia-03/README.md`](../../entregas/dia-03/README.md). La revisión de Jose lo dejó escrito: "Durante el Día 4 se verificará la conexión con Supabase".

## 2. Bloqueos y decisiones abiertas

| ID | Bloqueo o decisión | Afecta | Quién resuelve | Propuesta |
|---|---|---|---|---|
| B3 | Las skills requieren Node **22.20 o superior**. Jose: v22.23.5 ✅. Luis: sin comprobar | Días 5 y 7 | Luis | `node --version` y, si hace falta, actualizar Node 22 |
| B4 | En un repositorio personal solo el **propietario** crea secretos de Actions; Luis tiene permiso `write` | Día 6, paso 2 | Jose | Jose ejecuta `gh secret set` × 4 con los valores del proyecto oficial |
| B5 | Las 5 actividades dicen **"Modalidad: individual"**, y el equipo reparte los días y comparte un solo proyecto Supabase (DT-8) | Todos | Equipo → profesor | Consultarlo antes de entregar; cada bitácora nombra solo a su responsable real |
| B6 | La política oficial del lector del Día 8 (`using (true)`) da a `inventario_lector` acceso a los productos de **todos** los usuarios del proyecto compartido | Día 8 | Jose | Aplicar el SQL oficial solo con datos de prueba y documentar el riesgo y las mitigaciones |

Resueltos y retirados de esta tabla:
- **B1:** el PR #9 se fusionó.
- **B2:** sin actividad oficial del Día 3; se adaptó `public/app.js`.
- **B7:** la variable es `SUPABASE_KEY`.
- **D-1 y D-3:** decididas en `docs/requisitos.md` del PR #16.

## 3. Tareas

| ID | Día | Actividad | Responsable | Rama | Depende de | Criterio de aceptación | Estado | Issue | PR |
|---|---|---|---|---|---|---|---|---|---|
| T-00 | — | Documentación y plan | Agente para Jose | `docs/actividades-oficiales-04-08` | — | Luis revisa y aprueba | Completado (PR #15 fusionado, `65a7690`) | — | #15 |
| T-03 | — | Node 22 ≥ 22.20 | Luis | — | — | `node --version` ≥ v22.20 | Pendiente (Jose ✅) | — | — |
| T-04 | — | Consultar al profesor la modalidad individual y los secretos (B4, B5) | Jose y Luis | — | — | Respuesta registrada | Pendiente | — | — |
| T-10 | 4 | Proyecto, MCP, skills, migración, RLS, registro, inicio de sesión y aislamiento | Jose | `dia-04-supabase` | — | [Guía §10](../actividades-oficiales/dia-04/GUIA.md) | En revisión | [#10](https://github.com/Antoniii28/mini-inventario/issues/10) | [#16](https://github.com/Antoniii28/mini-inventario/pull/16) |
| T-11 | 4 | Compartir con Luis, **por un canal privado**, `SUPABASE_URL`, `SUPABASE_KEY` y las credenciales del usuario de pruebas del Día 5 | Jose | — | T-10 | Luis inicia sesión en la app | Pendiente | #10 | — |
| T-12 | 4 | Revisar el PR #16 | Luis | — | T-10 | Revisión aprobada | En revisión (observaciones atendidas) | #10 | #16 |
| T-20 | 5 | Exploración con playwright-cli, problema real, 4 pruebas, falla provocada y recuperación | Luis | `dia-05-pruebas` (desde `origin/dia-04-supabase`; merge de `main` tras #16) | T-11, T-03 | [Guía §10](../actividades-oficiales/dia-05/GUIA.md) | Pendiente | [#11](https://github.com/Antoniii28/mini-inventario/issues/11) | — |
| T-21 | 5 | Revisar el PR del Día 5 | Jose | — | T-20 | Revisión aprobada | Pendiente | #11 | — |
| T-30 | 6 | Secretos de Actions (`gh secret set` × 4) | Jose (B4) | — | T-20 | `gh secret list` muestra los 4 nombres | Pendiente | #12 | — |
| T-31 | 6 | `ci.yml` verde → rojo → verde, diagnóstico con `gh`, merge | Luis | `dia-06-ci` | T-21, T-30 | [Guía §10](../actividades-oficiales/dia-06/GUIA.md) | Pendiente | [#12](https://github.com/Antoniii28/mini-inventario/issues/12) | — |
| T-40 | 7 | Prueba sin skill, skill `pruebas-inventario`, repetición y subagente `revisor-pr` | Luis | `dia-07-skill` | T-31 | [Guía §10](../actividades-oficiales/dia-07/GUIA.md) | Pendiente | [#13](https://github.com/Antoniii28/mini-inventario/issues/13) | — |
| T-41 | 7 | Revisar el PR del Día 7 | Jose | — | T-40 | Revisión aprobada | Pendiente | #13 | — |
| T-50 | 8 | `supabase-lectura`, `inventario_lector`, servidor FastMCP, comparación e inyección | Jose | `dia-08-mcp` | #16 en `main` (los 3 productos del usuario 1 ya existen) | [Guía §10](../actividades-oficiales/dia-08/GUIA.md) | Pendiente | [#14](https://github.com/Antoniii28/mini-inventario/issues/14) | — |
| T-51 | 8 | Sincronizar `dia-08-mcp` con `main` (merge) y volver a correr `npm test` y `npx playwright test` | Jose | `dia-08-mcp` | T-50 y los días integrados | Las pruebas pasan después de sincronizar | Pendiente | #14 | — |
| T-52 | 8 | Revisar el PR del Día 8 | Luis | — | T-51 | Revisión aprobada | Pendiente | #14 | — |
| T-60 | 4 a 8 | Completar `Pchifus_Evidencia_Dia_0X.md` y subir la carpeta a Drive | Responsable de cada día | La rama de su día | PR del día fusionado | Subida **confirmada por el responsable** | Pendiente (Día 4: archivos listos en el PR #16) | #10 a #14 | — |

## 4. Cronograma

| Fecha | Jose (`Antoniii28`) | Luis (`dosientos77-web`) | Condición para avanzar |
|---|---|---|---|
| Mié 25 | Atender las observaciones de los PR #15 y #16; prueba de registro con correo real; fusionar #15 y #16 tras la aprobación; T-11; empezar el Día 8 | Aprobar #15 y #16; T-03; empezar **ya** el Día 5 desde `dia-04-supabase` (ver `HANDOFF_LUIS.md`) | **Día 4 en `main`** |
| Jue 26 | T-30 (secretos); revisar el Día 5 (T-21); avanzar el Día 8 | Terminar el **Día 5**; empezar el **Día 6** | Día 5 en `main` |
| Vie 27 | Revisar el Día 7 (T-41); sincronizar e integrar el **Día 8** (T-51); Drive de los Días 4 y 8 | Terminar el **Día 6**; **Día 7**; revisar el Día 8 (T-52); Drive de los Días 5 a 7 | Todo en `main` |

Si un bloqueo dura más de 2 horas, se marca "Bloqueado" con su causa y el responsable sigue con la siguiente tarea independiente. El Día 8 no depende de los Días 5 a 7.

## 5. Acciones personales que el agente no puede hacer

| Día | Acción personal del responsable |
|---|---|
| 4 | ✅ Hechas por Jose: crear el proyecto, autorizar el MCP, aprobar o rechazar el SQL, crear los usuarios y escribir las credenciales en `.env`. Pendiente: confirmar el correo de la prueba de registro. |
| 5 | Escribir `TEST_EMAIL` y `TEST_PASSWORD` en su `.env`; revisar las capturas **él mismo** y elegir el problema; cambiar **a mano** la comparación de bajo mínimo. |
| 6 | Ejecutar `gh secret set` (Jose, B4); no pegar secretos en el chat; tomar las capturas de rojo y verde; explicar la falla **con sus palabras**; hacer el merge. |
| 7 | Abrir **conversaciones limpias**; descartar el primer archivo; escribir la comparación. |
| 8 | Ejecutar el SQL del lector con una contraseña propia; guardar `DATABASE_URL`; registrar los MCP y autorizarlos; crear el producto de inyección desde la web; **rechazar** las escrituras. |

## 6. Entregas a Google Drive

| Día | Responsable de subirlo | Archivo índice | Estado de la subida |
|---|---|---|---|
| 4 | Jose | `entregas/dia-04/Pchifus_Evidencia_Dia_04.md` | **Subido** (confirmado por Jose, 27/11): [Dia 4 - Mini Inventario](https://drive.google.com/drive/folders/1-2oOgVLFxT0y6G4c3lKfQkGciYth_8_V) |
| 5 | Luis | [`entregas/dia-05/Pchifus_Evidencia_Dia_05.md`](../../entregas/dia-05/Pchifus_Evidencia_Dia_05.md) | No subido |
| 6 | Luis | [`entregas/dia-06/Pchifus_Evidencia_Dia_06.md`](../../entregas/dia-06/Pchifus_Evidencia_Dia_06.md) | No subido |
| 7 | Luis | [`entregas/dia-07/Pchifus_Evidencia_Dia_07.md`](../../entregas/dia-07/Pchifus_Evidencia_Dia_07.md) | No subido |
| 8 | Jose | [`entregas/dia-08/Pchifus_Evidencia_Dia_08.md`](../../entregas/dia-08/Pchifus_Evidencia_Dia_08.md) | No subido |

"Subido" solo se marca cuando el responsable confirma que subió la carpeta.

**Carpeta oficial del equipo en Drive** (para todas las entregas): [Equipo-PChifus](https://drive.google.com/drive/folders/1J9en4MIlL_VQNVOLTgt5q7tbEHxnMAC7). Cada día va en su propia subcarpeta, como la del Día 4.
