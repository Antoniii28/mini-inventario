# Bitácora — Día 4 · Datos reales e inicio de sesión con Supabase

**Equipo:** Pchifus  
**Responsable:** Jose Antonio Flores Cuamatzi (`Antoniii28`)  
**Rama:** `dia-04-supabase` · **Issue:** #10 · **Pull Request:** _pendiente_  
**Instrucciones oficiales:** [`docs/actividades-oficiales/dia-04/`](../../docs/actividades-oficiales/dia-04/GUIA.md) (incluidas en el PR #15)

> ⚠️ **BORRADOR.** Las secciones marcadas con ⏳ dependen del proyecto Supabase y se completan solo con resultados reales.

## Objetivo
"Hoy reemplazas el almacenamiento temporal por una base de datos real. El agente trabaja mediante el MCP de Supabase y tú apruebas cada cambio." (actividad oficial)

## Punto de partida
- El Día 3 (PR #9, commit `c0abc7d`) ya usaba Supabase desde `public/app.js`: inicio de sesión, alta, consulta y edición de productos.
- La actividad oficial menciona `public/productos.js` y `localStorage`. Este proyecto no tiene ese archivo: **se adaptó `public/app.js`**, sin rehacer el Día 3.

## Prompts clave
1. Prompt de ejecución del Día 4 de Jose Antonio (auditoría, base de datos, web, pruebas, evidencias y PR), basado en los dos prompts oficiales.
2. Prompt oficial de base de datos: "Usa el MCP de Supabase solo en este proyecto y sigue las skills supabase y supabase-postgres-best-practices. Crea una migración con la tabla productos según docs/diseno.md. Activa Row Level Security y crea políticas para que cada usuario solo pueda leer, crear, editar y borrar sus propios productos. Muéstrame el SQL antes de aplicarlo."
3. Prompt oficial de la web: "Cambia public/productos.js para usar Supabase en lugar de localStorage. Agrega registro e inicio de sesión con correo y contraseña. Lee SUPABASE_URL y SUPABASE_KEY del archivo .env y entrégalas al navegador desde la ruta /config.js. Usa solo la llave publishable o anon, nunca la service_role. Crea un .env.example sin valores."

## Cambios realizados
| Archivo | Cambio |
|---|---|
| `supabase/migrations/20261124120000_crear_productos.sql` | Nuevo. Tabla `productos`, índice único `(user_id, lower(sku))`, RLS, `GRANT` a `authenticated` y 4 políticas. |
| `supabase/schema.sql` | Marcado como histórico (Día 3); no se borró. |
| `server.js` | `SUPABASE_ANON_KEY` → `SUPABASE_KEY`. Se niega a arrancar si la llave es `sb_secret_...` o una JWT con rol `service_role`. |
| `public/app.js` | Usa `window.SUPABASE_KEY`; botón **Crear cuenta** con `auth.signUp`; `supabase-js` fijado en `2.119.2`. |
| `public/index.html` | Botón "Crear cuenta" y mensaje informativo; textos actualizados. |
| `public/logic.mjs` | `validateCredentials` y `friendlyAuthError` (mensajes de Auth sin detalles internos). |
| `tests/logic.test.mjs`, `tests/server.test.mjs` | 6 pruebas nuevas (de 7 a 13). |
| `.env.example` | Sin valores: `SUPABASE_URL=`, `SUPABASE_KEY=`, `PORT=`. |
| `docs/requisitos.md`, `docs/diseno.md`, `README.md` | Decisiones D-1 a D-4, registro, SKU sin mayúsculas, 4 políticas y configuración local. |
| `.claude/skills/`, `skills-lock.json` | Skills oficiales `supabase` y `supabase-postgres-best-practices`. |

## Decisiones
| Decisión | Motivo |
|---|---|
| Adaptar `public/app.js` en lugar de crear `public/productos.js` | El Día 3 ya funciona con Supabase; la actividad supone un `localStorage` que no existe aquí. |
| SKU único sin distinguir mayúsculas (`lower(sku)`) | Decisión de Jose Antonio; reemplaza la D-3 del Día 2. |
| Política de `delete` sin botón de borrar en la interfaz | La actividad pide políticas para las 4 operaciones; ninguna historia pide borrar desde la web. |
| `GRANT` solo a `authenticated` | Sin él, un proyecto nuevo responde `42501 permission denied`. `anon` no necesita acceso porque la app exige sesión. |
| El servidor bloquea llaves secretas | Criterio "Secretos": aunque alguien pegue la llave equivocada en `.env`, no llega al navegador. |

## SQL aprobado y su explicación
⏳ Pendiente de la aprobación de Jose Antonio. Archivo: `supabase/migrations/20261124120000_crear_productos.sql`.

Explicación de la política de `update`:
```sql
create policy "productos_update_propios" on public.productos
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
```
- `to authenticated`: solo aplica a usuarios con sesión; sin sesión no hay acceso.
- `using`: solo se pueden *elegir* para editar las filas propias; las de otra cuenta son invisibles.
- `with check`: el resultado de la edición también debe ser propio. Sin esta línea, alguien podría cambiar el `user_id` de su producto para "regalárselo" a otra cuenta.
- `(select auth.uid())`: Postgres calcula el usuario una sola vez por consulta y no una vez por fila (recomendación de la skill `supabase-postgres-best-practices`).

## Error o mala decisión de la IA
**Faltaba el `GRANT` en el SQL de la tabla.** El SQL del diseño del Día 2, propuesto por la IA, y el `supabase/schema.sql` del Día 3 crean la tabla y sus políticas, pero no dan permisos al rol `authenticated`.

**Cómo se detectó.** La skill `supabase` advierte que las tablas nuevas pueden no exponerse a la Data API, y su primera regla pide revisar el changelog. Ahí aparece el cambio incompatible del 2026-04-28, "Tables not exposed to Data and GraphQL API automatically", que es el comportamiento por defecto en los proyectos nuevos desde el 2026-05-30. Sin el `GRANT`, la web habría fallado con `42501 permission denied` aunque las políticas estuvieran bien.

**Corrección.** Se agregó `grant select, insert, update, delete … to authenticated` en la migración, antes de aplicarla.

## Comando o herramienta aprobada o rechazada
- **Aprobado:** `npx skills add supabase/agent-skills --skill supabase supabase-postgres-best-practices -a claude-code -y`. Es el comando oficial. Antes de usar las skills se comprobó que solo instalaron archivos Markdown (40 archivos, sin scripts) en `.claude/skills/`, porque el instalador advierte que "run with full agent permissions".
- ⏳ Aprobación o rechazo de la operación del MCP que aplica la migración.

## Pruebas realizadas y resultados
| Prueba | Resultado |
|---|---|
| `npm test` (Node v22.23.5) | ✅ 13/13 correctas (7 del Día 3 + 6 nuevas) |
| Servidor con valores ficticios: `/config.js` | ✅ entrega solo `window.SUPABASE_URL` y `window.SUPABASE_KEY`, `Cache-Control: no-store` |
| Servidor con una llave `sb_secret_...` | ✅ no arranca; muestra el error y sale con código 1 |
| `supabase-js@2.119.2` en jsDelivr | ✅ 200, exporta `createClient` |
| Migración aplicada; RLS y 4 políticas visibles | ⏳ |
| Registro, inicio y cierre de sesión con Supabase real | ⏳ |
| Alta, consulta, edición y persistencia tras recargar | ⏳ |
| SKU repetido con distintas mayúsculas → "Ya tienes un producto con ese SKU" | ⏳ |
| Stock bajo (`cantidad < minimo`) | ⏳ |
| Aislamiento entre los 2 usuarios | ⏳ |
| `git status` y `git check-ignore .env` | ⏳ |

## Capturas
⏳ `capturas/01-usuario-1.png` y `capturas/02-usuario-2.png`: una sesión por usuario; ninguna muestra los productos de la otra.
