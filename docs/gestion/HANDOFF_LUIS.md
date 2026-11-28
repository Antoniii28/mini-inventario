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

## Empezar el Día 5 sin esperar la fusión del PR #16
El código del Día 4 ya funciona contra el proyecto oficial, así que puedes partir de su rama:
```bash
git fetch origin
git switch -c dia-05-pruebas origin/dia-04-supabase   # tu rama, con el Día 4 incluido
npm ci
cp .env.example .env        # en PowerShell: Copy-Item .env.example .env
npm test                    # deben pasar 13 pruebas
npm start                   # http://localhost:3000; entra con pchifus.prueba2@example.com
```
- **Guías y prompts** (están en el PR #15, que aún no está en `main`). Léelos sin cambiar de rama:
  - `git show origin/docs/actividades-oficiales-04-08:docs/actividades-oficiales/dia-05/GUIA.md`
  - `git show origin/docs/actividades-oficiales-04-08:docs/prompts/PROMPT_LUIS.md`
  
  También puedes verlos en GitHub, en la pestaña *Files changed* del PR #15. No los copies a tu rama: llegan solos con `main`.
- **No modifiques** archivos del Día 4: `supabase/**`, `server.js`, `public/app.js`, `docs/diseno.md`, `entregas/dia-04/**`. Si encuentras un problema ahí, avísale a Jose.
- **Sincronizar después, sin perder avances:** cuando Jose fusione los PR #15 y #16, ejecuta `git fetch origin && git merge origin/main` en tu rama. Nunca uses `rebase` ni `push --force`. Vuelve a correr `npm test` y `npx playwright test`.
- **Abre tu PR hacia `main` después de esa sincronización.** Si lo abres antes, mostrará también los commits del Día 4.

## Día 5
| Tema | Detalle |
|---|---|
| Empieza cuando | Ya (ver la sección anterior). Necesitas la llave publishable y la contraseña de prueba |
| Preparación | La de la sección anterior. Cuando el #16 esté en `main`: `git merge origin/main` |
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

## PR #17: cambios pedidos en la revisión (26/11)
Verificado por el agente: `npm test` 13/13; `npx playwright test` 4/4 con `prueba2`; 0 residuos `D5-`; `prueba1` intacto.
1. **Falta `entregas/dia-05/README.md`.** Es el archivo que pide la actividad. Debe incluir los 4 elementos de la bitácora, que hoy no están en `bitacora.md`:
   - Prompts clave.
   - Un error o mala decisión de la IA y cómo lo detectaste.
   - Un comando o herramienta que aprobaste o rechazaste, y por qué.
   - Cómo comprobaste el resultado.
   
   Aclara también que **tú** cambiaste `<` por `<=` **a mano**, como pide la actividad. La bitácora dice que la restauración fue "automática".
2. **El `webServer` no arranca sin `.env`** (bloquea el Día 6). `npm start` usa `node --env-file=.env` y, sin ese archivo, Node falla con `.env: not found` y código 9; está reproducido con `CI=1`. Cambia `webServer.command` a `node --env-file-if-exists=.env server.js`.
3. **Reporte para el Día 6.** Usa `reporter: [['list'], ['html', { open: 'never' }]]`. Así se genera `playwright-report/`, que ya se ignora en Git y se sube como artefacto.

   El agente verificó los cambios 2 y 3 con una configuración temporal (sin `.env`, `CI=1`): 4/4 y `playwright-report/index.html` generado.
4. **Sincronización.** `git fetch origin && git merge origin/dia-04-supabase` (o `origin/main` cuando el #16 esté fusionado). El único conflicto es `.gitignore`: **conserva ambos bloques**, el de `material-profesor/` y el tuyo del Día 5. Luego corre `npm test` y `npx playwright test`.
5. Cuando el #16 se fusione, cambia la base del PR #17 a `main` (`gh pr edit 17 --base main`).

## Día 6
| Tema | Detalle |
|---|---|
| Requisitos previos del Día 5 | Los cambios 2 y 3 de la sección anterior; sin ellos el CI falla desde el primer paso |
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
