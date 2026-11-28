# Handoff · Jose Antonio (`Antoniii28`)

## Actividades
- **Día 4 · Supabase** (issue [#10](https://github.com/Antoniii28/mini-inventario/issues/10)): en revisión, [PR #16](https://github.com/Antoniii28/mini-inventario/pull/16).
- **Día 8 · MCP** (issue [#14](https://github.com/Antoniii28/mini-inventario/issues/14)).
- Apoyo: revisar los PR de Luis (Días 5, 6 y 7) y crear los secretos de Actions (B4).

## Día 4: lo que falta
1. Prueba de registro con un correo real. El correo por defecto de Supabase solo entrega a miembros de la organización `Pchifus-Jose`.
2. Cuando Luis apruebe: fusionar el PR #15, sincronizar `dia-04-supabase` con `main` (`git merge origin/main`; el conflicto conocido está en `entregas/dia-04/Pchifus_Evidencia_Dia_04.md`, donde gana la versión del PR #16), volver a correr las pruebas y fusionar el PR #16.
3. T-11: pasar a Luis, **por un canal privado**, la llave publishable y la contraseña de `pchifus.prueba2@example.com`.
4. Subir a Drive la carpeta `entregas/dia-04/` y luego marcarla como subida.

## Día 6: secretos de Actions (T-30, B4)
Los ejecuta Jose, que es el propietario. Son 4 secretos con la cuenta de prueba 2:
- `SUPABASE_URL`
- `SUPABASE_KEY`, la llave publishable
- `TEST_EMAIL=pchifus.prueba2@example.com`
- `TEST_PASSWORD`

Hay dos formas de crearlos:
- Manual, como en la actividad oficial: `gh secret set NOMBRE --repo Antoniii28/mini-inventario` y escribir el valor cuando se pida.
- Desde `.env`, sin mostrar los valores: pasar cada uno por stdin, `$valor | gh secret set NOMBRE --repo ...`.

Comprobación: `gh secret list` muestra solo nombres. Nunca se pegan valores en el chat ni en GitHub.

## Proyecto Supabase oficial (DT-8)
`mini-inventario` · ref `snefrzzosulngvootger` · organización `Pchifus-Jose`. Jose es el propietario: autoriza los MCP, aprueba el SQL y gestiona los usuarios. Implicaciones por día: `docs/diseno.md` § "Proyecto Supabase oficial" (PR #16).

## Día 8 (en paralelo a los Días 5 a 7 de Luis)
| Tema | Detalle |
|---|---|
| Rama | `dia-08-mcp`, desde `main` con el Día 4 integrado |
| Leer | `docs/actividades-oficiales/dia-08/GUIA.md` (sobre todo N-2 y N-3: alcance de `using (true)`) |
| Datos | Ya existen: `pchifus.prueba1@example.com` tiene Aceite 2/5, Arroz blanco 10/5 y Refresco 1/6 |
| Puede modificar | `mcp-inventario/server.py`, `mcp-inventario/requirements.txt`, `.gitignore` (`.venv/`), `entregas/dia-08/**` |
| No tocar en simultáneo | `.github/workflows/**`, `tests/**`, `.claude/skills/pruebas-inventario/**` y `.claude/agents/**` (de Luis) |
| Acciones personales | Ejecutar el SQL del lector con una contraseña propia; guardar `DATABASE_URL` en `mcp-inventario/.env`; registrar `supabase-lectura` e `inventario`; crear el producto de inyección desde la web; **rechazar** las escrituras |
| Comandos | `python3 -m venv .venv` · `.venv\Scripts\Activate.ps1` · `pip install fastmcp "psycopg[binary]" python-dotenv` · `claude mcp add --transport http supabase-lectura "https://mcp.supabase.com/mcp?project_ref=snefrzzosulngvootger&read_only=true"` · `claude mcp add inventario -- .venv\Scripts\python.exe mcp-inventario\server.py` |
| Pruebas | Insertar `prueba-escritura` falla; las 2 herramientas responden; la misma pregunta con ambos servidores; inyección documentada; `git check-ignore mcp-inventario/.env` |
| Antes del PR | `git merge origin/main` (sin rebase forzado); `npm test` y `npx playwright test` en verde |
| PR | Revisor `dosientos77-web`; `Refs #14` |

## Siguiente actividad
Después del Día 8: revisar el Día 7 de Luis y completar `entregas/dia-08/Pchifus_Evidencia_Dia_08.md`.
