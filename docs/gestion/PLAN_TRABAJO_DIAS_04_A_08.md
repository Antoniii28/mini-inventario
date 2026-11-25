# Plan de trabajo · Días 4 a 8

Actualizado: 2026-11-25 · Equipo Pchifus · Fuente de las instrucciones: [`docs/actividades-oficiales/`](../actividades-oficiales/README.md)

> Estados permitidos: Pendiente · En progreso · Bloqueado · En revisión · Completado.
> Una tarea solo pasa a **Completado** cuando sus entregables se verificaron (archivos en `main`, PR fusionado y evidencia real).

## 1. Estado real

| Día | Estado | Evidencia verificable |
|---|---|---|
| 1 | Completado | PR #1 y #2 fusionados |
| 2 | Completado | PR #8 fusionado (`420446a`) |
| 3 | Completado | PR #9 de Luis (commit `43e2441`), aprobado por Jose y fusionado el 2026-11-24 (`c0abc7d`). Verificado por el agente en una copia temporal: `npm test` 7/7 y el servidor sirve `/` y `/config.js`. La conexión con Supabase **no se demostró en el Día 3**: la bitácora del Día 3 dice que no se conectó y la descripción del PR afirma lo contrario (ver la nota 1). Ese mismo código se probó contra Supabase real en el Día 4. |
| 4 | En revisión | [PR #16](https://github.com/Antoniii28/mini-inventario/pull/16). Proyecto oficial `snefrzzosulngvootger` (ver DT-8 en el contexto compartido). Migraciones aprobadas por Jose y aplicadas con el MCP. 13/13 pruebas unitarias, 27 comprobaciones en un navegador real y aislamiento verificado (cada usuario ve 0 productos ajenos; `anon` → 42501). Falta: el registro completo con correo real (en curso), la aprobación de Luis y la fusión. |
| 5 a 8 | Pendiente | Issues #11 a #14 |

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
| T-00 | — | Documentación y plan | Agente para Jose | `docs/actividades-oficiales-04-08` | — | Luis revisa y aprueba | En revisión | — | #15 |
| T-03 | — | Node 22 ≥ 22.20 | Luis | — | — | `node --version` ≥ v22.20 | Pendiente (Jose ✅) | — | — |
| T-04 | — | Consultar al profesor la modalidad individual y los secretos (B4, B5) | Jose y Luis | — | — | Respuesta registrada | Pendiente | — | — |
| T-10 | 4 | Proyecto, MCP, skills, migración, RLS, registro, inicio de sesión y aislamiento | Jose | `dia-04-supabase` | — | [Guía §10](../actividades-oficiales/dia-04/GUIA.md) | En revisión | [#10](https://github.com/Antoniii28/mini-inventario/issues/10) | [#16](https://github.com/Antoniii28/mini-inventario/pull/16) |
| T-11 | 4 | Compartir con Luis, **por un canal privado**, `SUPABASE_URL`, `SUPABASE_KEY` y las credenciales del usuario de pruebas del Día 5 | Jose | — | T-10 | Luis inicia sesión en la app | Pendiente | #10 | — |
| T-12 | 4 | Revisar el PR #16 | Luis | — | T-10 | Revisión aprobada | En revisión (observaciones atendidas) | #10 | #16 |
| T-20 | 5 | Exploración con playwright-cli, problema real, 4 pruebas, falla provocada y recuperación | Luis | `dia-05-pruebas` | #16 en `main`, T-11, T-03 | [Guía §10](../actividades-oficiales/dia-05/GUIA.md) | Pendiente | [#11](https://github.com/Antoniii28/mini-inventario/issues/11) | — |
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
| Mié 25 | Atender las observaciones de los PR #15 y #16; prueba de registro con correo real; fusionar #15 y #16 tras la aprobación; T-11; empezar el Día 8 | Aprobar #15 y #16; T-03; empezar el **Día 5** en cuanto #16 esté en `main` | **Día 4 en `main`** |
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
| 4 | Jose | `entregas/dia-04/Pchifus_Evidencia_Dia_04.md` (completo en el PR #16) | No subido |
| 5 | Luis | [`entregas/dia-05/Pchifus_Evidencia_Dia_05.md`](../../entregas/dia-05/Pchifus_Evidencia_Dia_05.md) | No subido |
| 6 | Luis | [`entregas/dia-06/Pchifus_Evidencia_Dia_06.md`](../../entregas/dia-06/Pchifus_Evidencia_Dia_06.md) | No subido |
| 7 | Luis | [`entregas/dia-07/Pchifus_Evidencia_Dia_07.md`](../../entregas/dia-07/Pchifus_Evidencia_Dia_07.md) | No subido |
| 8 | Jose | [`entregas/dia-08/Pchifus_Evidencia_Dia_08.md`](../../entregas/dia-08/Pchifus_Evidencia_Dia_08.md) | No subido |

"Subido" solo se marca cuando el responsable confirma que subió la carpeta.
