# Handoff · Luis Angel (`dosientos77-web`)

## Actividades
- **Día 5 · Playwright** (issue [#11](https://github.com/Antoniii28/mini-inventario/issues/11)).
- **Día 6 · GitHub Actions** (issue [#12](https://github.com/Antoniii28/mini-inventario/issues/12)).
- **Día 7 · Skill y subagente** (issue [#13](https://github.com/Antoniii28/mini-inventario/issues/13)).
- Apoyo: revisar los PR de Jose (documentación, Día 4 y Día 8).

## Estado del Día 4 (2026-11-25)
- **En revisión: [PR #16](https://github.com/Antoniii28/mini-inventario/pull/16)** (rama `dia-04-supabase`). Verificado contra Supabase real; los detalles están en `entregas/dia-04/README.md`.
- Proyecto Supabase: `mini-inventario` de Jose (ref `snefrzzosulngvootger`). La tabla `productos` ya existe, con RLS y 4 políticas. **No hay que ejecutar ningún SQL.**
- Usuario de prueba para ti: `pchifus.prueba1@example.com`, confirmado. Ya tiene 3 productos: Aceite 2/5 y Refresco 1/6 bajo el mínimo, y Arroz blanco 10/5. Está también `pchifus.prueba2@example.com`.
- Cambios que te afectan:
  - La variable se llama `SUPABASE_KEY` (antes `SUPABASE_ANON_KEY`).
  - `server.js` no arranca con una llave `sb_secret_` o `service_role`.
  - `npm test` ejecuta 13 pruebas (`tests/*.test.mjs`).
  - El SKU no distingue mayúsculas.
  - Hay política de `delete`, así que tus pruebas pueden borrar lo que crean.
- Observación para tu revisión visual: a 1280 px, la columna "Acciones" de la tabla queda cortada por el scroll horizontal (viene del Día 3).

## Ahora mismo
1. Revisar y aprobar en GitHub el PR #15 (documentación) y el **PR #16 (Día 4)**.
2. Comprobar que `node --version` sea **22.20 o superior**.
3. Recibir de Jose, **por un canal privado**, `SUPABASE_URL`, `SUPABASE_KEY`, `TEST_EMAIL` y `TEST_PASSWORD`.
4. Cuando Jose fusione el PR #16:
   - `git switch main && git pull && git switch -c dia-05-pruebas`
   - `npm ci`
   - Crear `.env` desde `.env.example` y agregar `TEST_EMAIL` y `TEST_PASSWORD`.
   - `npm start`
   - Seguir `docs/actividades-oficiales/dia-05/GUIA.md`.

## Día 5
| Tema | Detalle |
|---|---|
| Empieza cuando | El PR #16 (Día 4) esté en `main` y Jose te haya pasado, por un canal privado, `SUPABASE_URL`, `SUPABASE_KEY`, `TEST_EMAIL` y `TEST_PASSWORD` |
| `.env` | `SUPABASE_URL=` · `SUPABASE_KEY=` (publishable) · `PORT=` · `TEST_EMAIL=` · `TEST_PASSWORD=`. Nunca se sube; `git check-ignore .env` lo confirma |
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
