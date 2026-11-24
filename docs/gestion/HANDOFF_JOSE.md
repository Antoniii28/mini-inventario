# Handoff · Jose Antonio (`Antoniii28`)

## Actividades
- **Día 4 · Supabase** (issue [#10](https://github.com/Antoniii28/mini-inventario/issues/10)).
- **Día 8 · MCP** (issue [#14](https://github.com/Antoniii28/mini-inventario/issues/14)).
- Apoyo: revisar los PR de Luis (Días 5, 6 y 7) y crear los secretos de Actions si así se decide (B4).

## Antes de empezar (en este orden)
1. Revisar y fusionar el PR de documentación (`docs/actividades-oficiales-04-08`) **después** de la revisión de Luis.
2. Actualizar Node.js 22 a **22.20 o superior** (`node --version` muestra hoy v22.18.0).
3. Revisar el PR #9 (Día 3):
   - El 2026-11-24 se verificó en una copia temporal: 7/7 pruebas y servidor correcto.
   - Pedir a Luis que corrija la descripción del PR, que afirma pruebas con Supabase que su bitácora niega.
   - Aprobarlo en GitHub y fusionarlo.

## Día 4
| Tema | Detalle |
|---|---|
| Rama | `dia-04-supabase`, creada desde `main` actualizado con el Día 3 |
| Leer | `docs/gestion/CONTEXTO_COMPARTIDO.md`, `docs/actividades-oficiales/dia-04/GUIA.md`, `docs/diseno.md`, `docs/requisitos.md` |
| Puede modificar | `supabase/migrations/*` (nuevo), `supabase/schema.sql`, `public/app.js`, `public/index.html`, `public/logic.mjs`, `server.js`, `.env.example`, `docs/requisitos.md`, `docs/diseno.md`, `tests/logic.test.mjs`, `entregas/dia-04/**`, `.mcp.json` y `.claude/skills/**` (si decide versionarlos) |
| No tocar en simultáneo | `tests/*.spec.*`, `playwright.config.*` y `entregas/dia-05/**` (de Luis) |
| Acciones personales | Crear el proyecto `mini-inventario` en Supabase; autorizar el MCP en el navegador; **leer y aprobar el SQL**; crear 2 usuarios confirmados; tomar 2 capturas |
| Comandos | `claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=TU_REF"` · `npx skills add supabase/agent-skills --skill supabase supabase-postgres-best-practices -a claude-code -y` · `npm test` · `npm start` · `git status` · `git check-ignore .env` |
| Cambios técnicos | Migración con RLS para las 4 operaciones; índice único `(user_id, lower(sku))`; registro con `auth.signUp`; renombrar `SUPABASE_ANON_KEY` → `SUPABASE_KEY` en `server.js`, `.env.example` y las pruebas; `.env.example` **sin valores** |
| Pruebas | `npm test`; iniciar sesión con cada usuario y comprobar que ninguno ve los productos del otro; intentar un SKU repetido con distintas mayúsculas; `git check-ignore .env` |
| Evidencias | `entregas/dia-04/` con 2 capturas (una por usuario) y `README.md` con los 4 elementos y el SQL explicado |
| PR | Al terminar las pruebas; revisor `dosientos77-web`; usar `Refs #10` |
| Necesita de Luis | Revisión del PR |
| Entrega a Luis | `SUPABASE_URL`, la llave publishable o anon y el correo y la contraseña del usuario de prueba, **por un canal privado**. Además, dejar en Supabase al menos 3 productos (uno bajo el mínimo) para el Día 8 |

## Día 8 (en paralelo a los Días 5 a 7 de Luis)
| Tema | Detalle |
|---|---|
| Rama | `dia-08-mcp`, desde `main` con el Día 4 integrado |
| Leer | `docs/actividades-oficiales/dia-08/GUIA.md` (sobre todo N-2 y N-3: alcance de `using (true)`) |
| Puede modificar | `mcp-inventario/server.py`, `mcp-inventario/requirements.txt`, `.gitignore` (`.venv/`), `entregas/dia-08/**` |
| No tocar en simultáneo | `.github/workflows/**`, `tests/**`, `.claude/skills/pruebas-inventario/**` y `.claude/agents/**` (de Luis) |
| Acciones personales | Ejecutar el SQL del lector con una contraseña propia; guardar `DATABASE_URL` en `mcp-inventario/.env`; registrar `supabase-lectura` e `inventario`; crear el producto de inyección desde la web; **rechazar** las escrituras |
| Comandos | `python3 -m venv .venv` · `.venv\Scripts\Activate.ps1` · `pip install fastmcp "psycopg[binary]" python-dotenv` · `claude mcp add --transport http supabase-lectura "https://mcp.supabase.com/mcp?project_ref=TU_REF&read_only=true"` · `claude mcp add inventario -- .venv\Scripts\python.exe mcp-inventario\server.py` |
| Pruebas | Insertar `prueba-escritura` falla; las 2 herramientas responden; la misma pregunta con ambos servidores; inyección documentada; `git check-ignore mcp-inventario/.env` |
| Antes del PR | `git merge origin/main` (sin rebase forzado); `npm test` y `npx playwright test` en verde |
| PR | Revisor `dosientos77-web`; `Refs #14` |

## Siguiente actividad
Después del Día 8: revisar el Día 7 de Luis y completar `entregas/dia-04/Pchifus_Evidencia_Dia_04.md` y `entregas/dia-08/Pchifus_Evidencia_Dia_08.md`.
