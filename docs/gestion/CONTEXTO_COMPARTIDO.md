# Contexto compartido · Mini Inventario

> Fuente de contexto para cualquier agente (Claude Code, Codex u otro) que trabaje en este repositorio.
> **Léelo completo antes de actuar.** Si algo aquí contradice una actividad oficial en `docs/actividades-oficiales/`, gana la actividad oficial; repórtalo.
> Actualizado: 2026-11-24.

## 1. Proyecto
- Aplicación web para administrar el inventario de productos de un establecimiento de comida.
- Repositorio público: https://github.com/Antoniii28/mini-inventario
- Equipo Pchifus:
  - Jose Antonio Flores Cuamatzi (`Antoniii28`, propietario y admin).
  - Luis Angel Osorio Galicia (`dosientos77-web`, permiso write).

## 2. Arquitectura vigente
```
Navegador (HTML + CSS + JS sin framework + supabase-js desde CDN)
  │  GET /, /app.js, /logic.mjs, /styles.css  → Express (estáticos)
  │  GET /config.js                           → Express (SUPABASE_URL + llave publishable/anon)
  └─ Auth y consultas a productos             → Supabase directo (RLS por usuario)
```
- Express **no** tiene API de productos. La seguridad de los datos la aplica **RLS** en PostgreSQL.
- Archivos (Día 3, PR #9): `server.js`, `public/index.html`, `public/app.js`, `public/logic.mjs`, `public/styles.css`, `supabase/schema.sql`, `tests/logic.test.mjs` (con `node --test`).
- Día 8 agrega `mcp-inventario/server.py` (Python 3.12 + FastMCP + psycopg) con el rol `inventario_lector`.

## 3. Tecnologías (no sustituir)
Node.js 22 · Express · HTML, CSS y JavaScript sin framework · Supabase (Auth + PostgreSQL) · Git, GitHub y `gh` · Playwright (playwright-cli + Playwright Test) · GitHub Actions · Python 3.12 (`python3`) + FastMCP.
**No** usar MongoDB, ORMs, frameworks de frontend ni API propia de productos.

## 4. Decisiones técnicas vigentes
| ID | Decisión | Origen |
|---|---|---|
| DT-1 | Stock bajo = `cantidad < minimo` (estrictamente menor) | Día 2 (D-2), confirmado en el plan maestro |
| DT-2 | SKU único **por usuario y sin distinguir mayúsculas y minúsculas**: índice único `(user_id, lower(sku))` | Plan maestro (reemplaza D-3 del Día 2) |
| DT-3 | Registro público con correo y contraseña | Actividad oficial del Día 4 (reemplaza D-1 del Día 2) |
| DT-4 | RLS con políticas `select`, `insert`, `update` y `delete` (`auth.uid() = user_id`) | Actividad oficial del Día 4 |
| DT-5 | Variables de entorno: `SUPABASE_URL` y `SUPABASE_KEY` (publishable o anon), más `TEST_EMAIL` y `TEST_PASSWORD` para pruebas | Actividades oficiales de los Días 4 a 6 (el Día 3 usaba `SUPABASE_ANON_KEY`) |
| DT-6 | Express solo sirve estáticos y `/config.js` | Día 2 (corrección C-1) |
| DT-7 | `python3`, nunca `python` ni `py` | Día 1 |

## 5. Estado de cada día
| Día | Responsable | Rama | Issue | PR | Estado |
|---|---|---|---|---|---|
| 1 | Jose | `docs/dia-01-*` | — | #1, #2 | Completado |
| 2 | Jose | `dia-02-planeacion` | HU #3 a #7 | #8 | Completado |
| 3 | Luis | `feature/dia-03-desarrollo` | HU #3 a #7 | #9 | **En revisión** (no integrado) |
| 4 | Jose | `dia-04-supabase` | #10 | — | Pendiente |
| 5 | Luis | `dia-05-pruebas` | #11 | — | Pendiente |
| 6 | Luis | `dia-06-ci` | #12 | — | Pendiente |
| 7 | Luis | `dia-07-skill` | #13 | — | Pendiente |
| 8 | Jose | `dia-08-mcp` | #14 | — | Pendiente |

El estado detallado está en [`PLAN_TRABAJO_DIAS_04_A_08.md`](PLAN_TRABAJO_DIAS_04_A_08.md). Actualízalo en el PR de cada día.

## 6. Dependencias
Día 3 → Día 4 → Día 5 → Día 6 → Día 7. El Día 8 depende solo del Día 4 (más 3 productos, uno bajo el mínimo) y puede ir en paralelo a los Días 5 a 7.

## 7. Reglas de seguridad (obligatorias)
- Nunca publicar ni escribir en el chat: contraseñas, `.env`, tokens, cadenas de conexión ni claves `service_role`.
- En el navegador solo se usa la llave **publishable o anon**. RLS siempre habilitado.
- **No ejecutar SQL ni migraciones sin aprobación explícita** del responsable, después de mostrarle el SQL completo.
- Los MCP se limitan al `project_ref` del proyecto `mini-inventario`. En el Día 8, el MCP oficial va con `read_only=true`.
- Las herramientas MCP propias no aceptan SQL libre ni escriben datos; usan consultas parametrizadas.
- Las verificaciones de seguridad e inyección se hacen **solo con datos de prueba**.
- Sin acciones destructivas, sin `push --force`, sin borrar archivos sin autorización y sin commits directos a `main`.
- `git add` con rutas explícitas. No subir `material-profesor/` ni `actividad-dia-*` de la raíz.
- No fusionar un PR sin la revisión del otro integrante.

## 8. Bloqueos actuales
B1 PR #9 sin integrar · B2 no hay actividad oficial del Día 3 · B3 Node < 22.20 · B4 secretos solo del propietario · B5 modalidad individual · B6 política del lector `using (true)` · B7 nombre de la variable de la llave. Ver el detalle en la sección 2 del plan.

## 9. Próximo paso de cada integrante
- **Jose:** revisar y fusionar el PR de documentación; actualizar Node; revisar y fusionar el PR #9; empezar el Día 4 ([`HANDOFF_JOSE.md`](HANDOFF_JOSE.md)).
- **Luis:** revisar el PR de documentación; corregir la descripción del PR #9; actualizar Node; preparar el entorno del Día 5 sin tocar archivos del Día 4 ([`HANDOFF_LUIS.md`](HANDOFF_LUIS.md)).

## 10. Cómo trabaja un agente aquí
1. `git fetch` y `git switch main` y `git pull --ff-only`. Crear o usar la rama del día.
2. Leer este archivo, la guía del día y el handoff del integrante.
3. Hacer solo lo que pide la actividad oficial; si hay que desviarse, documentarlo como "nota del equipo".
4. Detenerse para: credenciales, autorización de MCP, SQL o migraciones, decisiones personales exigidas por el profesor y merges.
5. Bitácora honesta: no inventar capturas, errores, aprobaciones ni resultados. Atribuir cada acción a quien la hizo.
