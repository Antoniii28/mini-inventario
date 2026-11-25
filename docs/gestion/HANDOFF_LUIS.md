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

## Ahora mismo
1. Revisar y aprobar en GitHub el PR #15 (documentación) y el PR #16 (Día 4).
2. Comprobar que `node --version` sea **22.20 o superior** (T-03).
3. Recibir de Jose, por un canal privado, la llave publishable y la contraseña de `pchifus.prueba2@example.com`.

## Día 5
| Tema | Detalle |
|---|---|
| Empieza cuando | El PR #16 esté en `main` y tengas la llave y la contraseña de prueba |
| Preparación | `git switch main && git pull --ff-only && git switch -c dia-05-pruebas` · `npm ci` · copiar `.env.example` a `.env` · `npm test` (13 pruebas) · `npm start` |
| `.env` | `SUPABASE_URL=` · `SUPABASE_KEY=` · `PORT=` · `TEST_EMAIL=pchifus.prueba2@example.com` · `TEST_PASSWORD=`. Nunca se sube; `git check-ignore .env` lo confirma |
| Leer | `docs/gestion/CONTEXTO_COMPARTIDO.md`, `docs/actividades-oficiales/dia-05/GUIA.md` |
| Puede modificar | `tests/*.spec.*`, `playwright.config.*`, `package.json`, `package-lock.json`, `entregas/dia-05/**`, `.claude/skills/playwright-cli/**` y el archivo de `public/` que tenga el problema real que elijas |
| No tocar en simultáneo | `mcp-inventario/**`, `entregas/dia-08/**` y `supabase/**` (de Jose) |
| Acciones personales | Revisar tú mismo las capturas y elegir el problema; cambiar **a mano** `cantidad < minimo` para provocar la falla |
| Comandos | `npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli -a claude-code -y` · `npm init playwright@latest` · `npx playwright test` · si faltan navegadores, `npx playwright install --with-deps chromium` |
| Ojo | `npm test` ejecuta `node --test` sobre `tests/*.test.mjs`. Usa `*.spec.*` para Playwright y comprueba que `npm test` siga pasando. Cada prueba usa un SKU único y borra solo lo que creó (la política `delete` ya existe). El SKU no distingue mayúsculas |
| Observación previa | A 1280 px, la columna "Acciones" de la tabla queda cortada por el scroll horizontal. Viene del Día 3 y es un candidato a "problema real" si tú lo confirmas en tus capturas |
| Evidencias | Capturas 1280x800 y 390x844 en `entregas/dia-05/`; reporte de consola; el problema y su corrección; 4 pruebas en verde; la salida roja provocada y la verde al revertir |
| PR | Revisor `Antoniii28`; `Refs #11` |

## Día 6
| Tema | Detalle |
|---|---|
| Empieza cuando | El Día 5 esté en `main` |
| Rama | `dia-06-ci` |
| Secretos | **B4:** los crea Jose con `gh secret set` (`SUPABASE_URL`, `SUPABASE_KEY`, `TEST_EMAIL` y `TEST_PASSWORD`, con los valores del proyecto oficial y de `pchifus.prueba2`). **Nunca** pegues valores en el chat |
| Puede modificar | `.github/workflows/ci.yml`, `entregas/dia-06/**` y el cambio temporal que rompe una prueba (después se revierte) |
| Acciones personales | Capturas en verde, rojo y verde del **mismo** PR; pedir el diagnóstico sin dar pistas; explicar la causa **con tus palabras**; merge después de la revisión de Jose |
| Comandos | `gh secret list` · `gh pr checks` · `gh run list` · `gh run view --log-failed` |
| PR | Revisor `Antoniii28`; `Refs #12` |

## Día 7
| Tema | Detalle |
|---|---|
| Empieza cuando | El Día 6 esté en `main` y el CI esté en verde |
| Rama | `dia-07-skill` |
| Puede modificar | `.claude/skills/pruebas-inventario/SKILL.md`, `.claude/agents/revisor-pr.md`, `entregas/dia-07/**` |
| Acciones personales | Abrir **2 conversaciones limpias**; guardar el código sin skill en la bitácora y **descartar** el archivo; escribir la comparación |
| Pruebas | Ejecutar `revisor-pr` y comprobar con `git status` que no cambió nada |
| PR | Revisor `Antoniii28`; `Refs #13` |

## Necesitas de Jose
Llave publishable y contraseña de prueba por un canal privado · secretos de Actions (B4) · revisión de tus PR.

## Al terminar cada día
Completar `entregas/dia-0X/Pchifus_Evidencia_Dia_0X.md` y subir la carpeta a Drive cuando el PR esté fusionado.
