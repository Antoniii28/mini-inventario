# Diseño técnico — Mini Inventario

## Tecnología

| Pieza | Uso |
|---|---|
| **Node.js 22 + Express** | Solo sirve la página, los archivos estáticos y la configuración pública de Supabase. **No tiene API de productos.** |
| **HTML + JavaScript sin framework** | Interfaz: inicio de sesión, formulario de productos, lista y filtro. Usa la librería `@supabase/supabase-js` cargada como módulo ES desde CDN (sin bundler). |
| **Supabase** | Inicio de sesión (Supabase Auth, correo y contraseña) y base de datos PostgreSQL con Row Level Security (RLS). |

No se agregan otras piezas: sin framework de frontend, sin ORM, sin API propia y sin otra base de datos.

## Arquitectura

```
Navegador (HTML + JS + supabase-js)
   │  1. GET /, /app.js, /styles.css   → Express (archivos estáticos)
   │  2. GET /config.js                → Express (URL y llave publishable/anon de Supabase)
   │  3. Registro, sesión y consultas  → directo a Supabase con la llave publishable
   ▼                                     y el token de la sesión
Supabase Auth + PostgreSQL (RLS: cada usuario solo accede a sus filas)
```

- La seguridad de los datos la aplica **la base de datos (RLS)**, no el código del navegador.
- La llave publishable (`sb_publishable_...`) o la `anon` heredada es pública por diseño; solo sirve junto con las políticas RLS. Las llaves `secret`/`service_role` **no se usan**: `server.js` se niega a arrancar si `SUPABASE_KEY` es una de ellas.

### Rutas de Express

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/` y archivos de `public/` | `index.html`, `app.js`, `styles.css` |
| GET | `/config.js` | `window.SUPABASE_URL` y `window.SUPABASE_KEY`, leídos de variables de entorno (Día 4: antes `SUPABASE_ANON_KEY`) |

### Operaciones del navegador con Supabase

| Historia | Operación |
|---|---|
| HU-01 | `auth.signUp()` (Día 4), `auth.signInWithPassword()`, `auth.signOut()`, `auth.getSession()` |
| HU-02 | `from('productos').insert({ nombre, sku, cantidad, minimo })` |
| HU-03 | `from('productos').select('*').order('nombre')` |
| HU-04 | `from('productos').update({ cantidad, minimo }).eq('id', id)` |
| HU-05 | Mismo `select` de HU-03; el filtro y la marca "Bajo mínimo" se calculan en el navegador con `cantidad < minimo` |

## Estructura de archivos propuesta

```
server.js            ← Express: estáticos + /config.js
public/
  index.html
  app.js
  styles.css
.env                 ← SUPABASE_URL, SUPABASE_KEY (no se sube; ya está en .gitignore)
.env.example         ← mismas variables, sin valores
supabase/migrations/ ← migraciones SQL (Día 4)
```

## Tabla `productos`

Desde el Día 4, el esquema vigente es la migración [`supabase/migrations/20261124120000_crear_productos.sql`](../supabase/migrations/20261124120000_crear_productos.sql). Resumen:

```sql
create table public.productos (
  id, user_id (default auth.uid(), FK a auth.users on delete cascade),
  nombre, sku (texto no vacío), cantidad, minimo (enteros >= 0), created_at
);
create unique index productos_user_id_sku_ci_key on public.productos (user_id, lower(sku));
alter table public.productos enable row level security;
grant select, insert, update, delete on table public.productos to authenticated;
-- 4 políticas "to authenticated": select, insert, update (using + with check) y delete,
-- todas con (select auth.uid()) = user_id
```

| Columna | Tipo | Regla |
|---|---|---|
| `id` | uuid | Generado por la base de datos |
| `user_id` | uuid | Por defecto `auth.uid()` (el usuario de la sesión); RLS impide usar otro |
| `nombre` | text | Obligatorio, no puede quedar vacío ni solo con espacios |
| `sku` | text | Obligatorio; **único por usuario sin distinguir mayúsculas** (`unique (user_id, lower(sku))`) |
| `cantidad` | integer | Obligatorio, entero ≥ 0 |
| `minimo` | integer | Obligatorio, entero ≥ 0 |
| `created_at` | timestamptz | Fecha de registro automática |

Cambios respecto al Día 2 (pedidos por la actividad oficial del Día 4 o por decisión de Jose Antonio):
- Política de `delete`: la actividad pide políticas para las 4 operaciones. La interfaz aún no borra productos.
- SKU sin distinguir mayúsculas (decisión D-3 reemplazada).
- `GRANT` explícito solo a `authenticated`: los proyectos nuevos de Supabase ya no exponen las tablas nuevas a la Data API sin él. `anon` no recibe permisos.
- `(select auth.uid())` en las políticas, como recomienda la skill `supabase-postgres-best-practices` (se evalúa una vez por consulta).
- El índice único empieza por `user_id`, así que también cubre la llave foránea y los filtros de RLS.

## Validaciones por capa

| Capa | Qué valida | Para qué |
|---|---|---|
| **HTML** | `required` en los cuatro campos y en correo y contraseña; `type="number"`, `min="0"` y `step="1"` en cantidad y mínimo; `type="email"` en el correo. | Avisar rápido al usuario. Se puede saltar, no es seguridad. |
| **JavaScript del navegador** | Quita espacios al inicio y al final; comprueba que nombre y SKU no queden vacíos y que cantidad y mínimo sean enteros ≥ 0; traduce los errores de Supabase a mensajes claros (por ejemplo, SKU repetido → "Ya tienes un producto con ese SKU"). | Mensajes claros junto al campo. Tampoco es seguridad. |
| **Express** | No recibe datos de productos, así que no los valida. Al arrancar, comprueba que existan `SUPABASE_URL` (HTTPS) y `SUPABASE_KEY`, y que la llave no sea `secret` ni `service_role`; si algo falla, no inicia y muestra el error. | Evitar una página que no puede conectarse o que filtra una llave privada. |
| **Supabase Auth** | Correo y contraseña; emite el token de sesión. | Identidad del usuario. |
| **PostgreSQL** | `not null`, `check` de texto no vacío, `check (cantidad >= 0)`, `check (minimo >= 0)`, índice único `(user_id, lower(sku))`. | Última barrera: los datos inválidos no se guardan aunque alguien se salte el navegador. |
| **RLS** | `(select auth.uid()) = user_id` en `select`, `insert`, `update` y `delete`, solo para el rol `authenticated`. | Nadie ve ni modifica productos de otra cuenta. |

## Regla "bajo mínimo"

Un producto está bajo mínimo cuando **`cantidad < minimo`** (estrictamente menor), como dice el enunciado: "ve cuáles están por debajo del mínimo". Decisión D-2 confirmada (ver `docs/requisitos.md`).

## Historial de correcciones

Las correcciones a la propuesta inicial (commit `af95cea`) se explican en [`entregas/dia-02/README.md`](../entregas/dia-02/README.md#criterio-propio-correcciones-al-agente).
