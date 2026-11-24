# Handoff · Luis Angel (`dosientos77-web`)

## Actividades
- **Día 5 · Playwright** (issue [#11](https://github.com/Antoniii28/mini-inventario/issues/11)).
- **Día 6 · GitHub Actions** (issue [#12](https://github.com/Antoniii28/mini-inventario/issues/12)).
- **Día 7 · Skill y subagente** (issue [#13](https://github.com/Antoniii28/mini-inventario/issues/13)).
- Apoyo: revisar los PR de Jose (documentación, Día 4 y Día 8).

## Ahora mismo (mientras Jose hace el Día 4)
1. Revisar el PR de documentación (`docs/actividades-oficiales-04-08`) y aprobarlo en GitHub.
2. **PR #9 (Día 3):** corregir la descripción. Dice "Inicio de sesión probado" y "Registro de productos verificado en Supabase", pero `entregas/dia-03/README.md` dice "Aún no se ejecutó el servidor Express ni se conectó la app con Supabase". Debe decir solo lo que realmente se probó.
3. `node --version` debe ser **22.20 o superior** (lo requiere la skill de playwright-cli).
4. Preparar el entorno, **sin crear archivos del proyecto**:
   - `npm install -g @playwright/cli@latest`
   - `playwright-cli --help`
   - Leer `docs/actividades-oficiales/dia-05/GUIA.md`.
   - **No** simular pruebas que requieren Supabase.

## Día 5
| Tema | Detalle |
|---|---|
| Empieza cuando | El Día 4 esté en `main` y Jose te haya pasado, por un canal privado, `SUPABASE_URL`, `SUPABASE_KEY` y el usuario de prueba |
| Rama | `dia-05-pruebas`, desde `main` actualizado |
| Leer | `docs/gestion/CONTEXTO_COMPARTIDO.md`, `docs/actividades-oficiales/dia-05/GUIA.md` |
| Puede modificar | `tests/*.spec.*`, `playwright.config.*`, `package.json`, `package-lock.json`, `entregas/dia-05/**`, `.claude/skills/playwright-cli/**`, y el archivo de `public/` que tenga el problema real que elijas |
| No tocar en simultáneo | `mcp-inventario/**`, `entregas/dia-08/**` y `supabase/**` (de Jose) |
| Acciones personales | Escribir `TEST_EMAIL` y `TEST_PASSWORD` en tu `.env`; revisar tú mismo las capturas y elegir el problema; cambiar **a mano** `cantidad < minimo` para provocar la falla |
| Comandos | `npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli -a claude-code -y` · `npm init playwright@latest` · `npx playwright test` · si faltan navegadores, `npx playwright install --with-deps chromium` |
| Ojo | Las pruebas del Día 3 (`tests/logic.test.mjs`, `node --test`) conviven con Playwright. Separa los patrones (`*.spec.*` para Playwright) y comprueba que `npm test` siga pasando |
| Evidencias | Capturas 1280x800 y 390x844 en `entregas/dia-05/`; reporte de consola; el problema y su corrección; 4 pruebas en verde; la salida roja provocada y la verde al revertir |
| PR | Revisor `Antoniii28`; `Refs #11` |

## Día 6
| Tema | Detalle |
|---|---|
| Empieza cuando | El Día 5 esté en `main` |
| Rama | `dia-06-ci` |
| Secretos | **Bloqueo B4:** en un repositorio personal, solo el propietario (Jose) puede crear secretos. Coordina con Jose: él ejecuta `gh secret set` × 4, o el profesor indica otra cosa. **Nunca** pegues valores en el chat |
| Puede modificar | `.github/workflows/ci.yml`, `entregas/dia-06/**` y el cambio temporal que rompa una prueba (después se revierte) |
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
Credenciales de prueba por un canal privado · secretos de Actions (B4) · revisión de tus PR.

## Al terminar cada día
Completar `entregas/dia-0X/Pchifus_Evidencia_Dia_0X.md` y subir la carpeta a Drive cuando el PR esté fusionado.
