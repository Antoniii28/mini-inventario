# Handoff · Luis Angel (`dosientos77-web`)

## Actividades
- **Día 5 · Playwright** (issue [#11](https://github.com/Antoniii28/mini-inventario/issues/11)).
- **Día 6 · GitHub Actions** (issue [#12](https://github.com/Antoniii28/mini-inventario/issues/12)).
- **Día 7 · Skill y subagente** (issue [#13](https://github.com/Antoniii28/mini-inventario/issues/13)).
- Apoyo: revisar los PR de Jose (#15, #16 y Día 8).

## Proyecto Supabase oficial (DT-8)
| Dato | Valor |
|---|---|
| Proyecto | `mini-inventario` · ref `snefrzzosulngvootger` · organización `Pchifus-Jose` (propietario: Jose) |
| `SUPABASE_URL` | `https://snefrzzosulngvootger.supabase.co` (no es secreta) |
| `SUPABASE_KEY` | Llave **publishable** (`sb_publishable_...`). Te la pasa Jose por un canal privado |
| Tabla | `productos` con RLS y 4 políticas, ya creada. **No ejecutes SQL ni crees otro proyecto** |
| Usuario para tus pruebas | `pchifus.prueba2@example.com`, confirmado. Jose te pasa la contraseña por un canal privado |
| Usuario reservado | `pchifus.prueba1@example.com`: sus 3 productos son la evidencia del Día 4 y los datos del Día 8. No los borres ni los modifiques |

No necesitas acceso al panel de Supabase para los Días 5 a 7: solo la URL, la llave publishable y el usuario de prueba.

Detalles e implicaciones por día: `docs/diseno.md` § "Proyecto Supabase oficial" (PR #16).

## Estado (27/11)
- Día 5 **integrado** en `main` (PR #17, `2a4c370`). Verificado sobre `main`: `npm test` 13/13 y `npx playwright test` 4/4 con `CI=1` y sin `.env`; 0 residuos.
- Pendiente del Día 5: **issue [#18](https://github.com/Antoniii28/mini-inventario/issues/18)**: falla roja hecha **a mano**, prompts reales, `Pchifus_Evidencia_Dia_05.md` y sección de pendientes. Se corrige en un PR aparte (`docs/dia-05-bitacora`, con `Refs #11`) **antes** de subir el Día 5 a Drive.
- Día 6 **desbloqueado**: los 4 secretos de Actions existen desde el 27/11 (`gh secret list` muestra `SUPABASE_KEY`, `SUPABASE_URL`, `TEST_EMAIL` y `TEST_PASSWORD`; proyecto oficial y `prueba2`).

## Ahora mismo
1. Día 6, desde `main`: `git switch main && git pull --ff-only && git switch -c dia-06-ci`.
2. En paralelo, el issue #18 en su propia rama, sin mezclarlo con `dia-06-ci`.

## Día 5 (referencia)
| Tema | Detalle |
|---|---|
| `.env` | `SUPABASE_URL=` · `SUPABASE_KEY=` · `PORT=` · `TEST_EMAIL=pchifus.prueba2@example.com` · `TEST_PASSWORD=`. Nunca se sube; `git check-ignore .env` lo confirma |
| Acciones personales pendientes | Cambiar **a mano** `<` por `<=` en `public/logic.mjs`, correr las pruebas (rojo), revertir y correrlas de nuevo (verde). No hacer commit del cambio roto |
| PR de la bitácora | Revisor `Antoniii28`; `Refs #11` y `Closes #18` |

## Día 6
| Tema | Detalle |
|---|---|
| Empieza cuando | **Ya**: el Día 5 está en `main` y los secretos existen |
| Rama | `dia-06-ci`, desde `main` |
| Secretos | Ya creados por Jose (B4). No los vuelvas a crear ni pegues valores en el chat |
| Puntos clave del flujo | Node 22; `npm ci`; `npx playwright install --with-deps chromium`; `npx playwright test` con `env:` tomado de `${{ secrets.* }}`; subir `playwright-report/` con `actions/upload-artifact` (y `if: always()` para tenerlo también cuando falle). La configuración de `main` ya arranca sin `.env` y genera el reporte HTML |
| Puede modificar | `.github/workflows/ci.yml`, `entregas/dia-06/**` y el cambio temporal que rompe una prueba (después se revierte) |
| Acciones personales | Capturas en verde, rojo y verde del **mismo** PR; pedir el diagnóstico sin dar pistas; explicar la causa **con tus palabras**; merge después de la revisión de Jose |
| Comandos | `gh secret list` · `gh pr checks` · `gh run list` · `gh run view --log-failed` |
| PR | Revisor `Antoniii28`; `Refs #12` |

## Día 7
| Tema | Detalle |
|---|---|
| Empieza cuando | El Día 6 esté en `main` y el CI esté en verde |
| Rama | `dia-07-skill`, desde `main` |
| Puede modificar | `.claude/skills/pruebas-inventario/SKILL.md`, `.claude/agents/revisor-pr.md`, `entregas/dia-07/**` |
| Acciones personales | Abrir **2 conversaciones limpias**; guardar el código sin skill en la bitácora y **descartar** el archivo; escribir la comparación |
| Pruebas | Ejecutar `revisor-pr` y comprobar con `git status` que no cambió nada |
| PR | Revisor `Antoniii28`; `Refs #13` |

## Necesitas de Jose
Llave publishable y contraseña de prueba por un canal privado · secretos de Actions (B4) · revisión de tus PR.

## Al terminar cada día
Completar `entregas/dia-0X/Pchifus_Evidencia_Dia_0X.md` y subir la carpeta a Drive cuando el PR esté fusionado.
