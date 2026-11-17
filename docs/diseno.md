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
   │  2. GET /config.js                → Express (URL y clave anon de Supabase)
   │  3. Inicio de sesión y consultas  → directo a Supabase con la clave anon
   ▼                                     y el token de la sesión
Supabase Auth + PostgreSQL (RLS: cada usuario solo accede a sus filas)
```

- La seguridad de los datos la aplica **la base de datos (RLS)**, no el código del navegador.
- La clave `anon` es pública por diseño; solo sirve junto con las políticas RLS. La clave `service_role` **no se usa** en este proyecto.

### Rutas de Express

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/` y archivos de `public/` | `index.html`, `app.js`, `styles.css` |
| GET | `/config.js` | `window.SUPABASE_URL` y `window.SUPABASE_ANON_KEY`, leídos de variables de entorno |

### Operaciones del navegador con Supabase

| Historia | Operación |
|---|---|
| HU-01 | `auth.signInWithPassword()`, `auth.signOut()`, `auth.getSession()` |
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
.env                 ← SUPABASE_URL, SUPABASE_ANON_KEY (no se sube; ya está en .gitignore)
.env.example         ← mismas variables con valores ficticios
```

## Tabla `productos`

```sql
create table productos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nombre      text not null check (length(trim(nombre)) > 0),
  sku         text not null check (length(trim(sku)) > 0),
  cantidad    integer not null default 0 check (cantidad >= 0),
  minimo      integer not null default 0 check (minimo >= 0),
  created_at  timestamptz not null default now(),
  unique (user_id, sku)
);

alter table productos enable row level security;

create policy "ver mis productos" on productos
  for select using (auth.uid() = user_id);

create policy "crear mis productos" on productos
  for insert with check (auth.uid() = user_id);

create policy "actualizar mis productos" on productos
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

| Columna | Tipo | Regla |
|---|---|---|
| `id` | uuid | Generado por la base de datos |
| `user_id` | uuid | Por defecto `auth.uid()` (el usuario de la sesión); RLS impide usar otro |
| `nombre` | text | Obligatorio, no puede quedar vacío ni solo con espacios |
| `sku` | text | Obligatorio; **único por usuario** (`unique (user_id, sku)`) |
| `cantidad` | integer | Obligatorio, entero ≥ 0 |
| `minimo` | integer | Obligatorio, entero ≥ 0 |
| `created_at` | timestamptz | Fecha de registro automática |

No hay política de `delete` porque ninguna historia pide borrar productos.

## Validaciones por capa

| Capa | Qué valida | Para qué |
|---|---|---|
| **HTML** | `required` en los cuatro campos; `type="number"`, `min="0"` y `step="1"` en cantidad y mínimo; `type="email"` en el correo. | Avisar rápido al usuario. Se puede saltar, no es seguridad. |
| **JavaScript del navegador** | Quita espacios al inicio y al final; comprueba que nombre y SKU no queden vacíos y que cantidad y mínimo sean enteros ≥ 0; traduce los errores de Supabase a mensajes claros (por ejemplo, SKU repetido → "Ya tienes un producto con ese SKU"). | Mensajes claros junto al campo. Tampoco es seguridad. |
| **Express** | No recibe datos de productos, así que no los valida. Al arrancar, comprueba que existan `SUPABASE_URL` y `SUPABASE_ANON_KEY`; si falta alguna, no inicia y muestra el error. | Evitar una página que no puede conectarse. |
| **Supabase Auth** | Correo y contraseña; emite el token de sesión. | Identidad del usuario. |
| **PostgreSQL** | `not null`, `check` de texto no vacío, `check (cantidad >= 0)`, `check (minimo >= 0)`, `unique (user_id, sku)`. | Última barrera: los datos inválidos no se guardan aunque alguien se salte el navegador. |
| **RLS** | `auth.uid() = user_id` en `select`, `insert` y `update`. | Nadie ve ni modifica productos de otra cuenta. |

## Regla "bajo mínimo"

Un producto está bajo mínimo cuando **`cantidad < minimo`** (estrictamente menor), como dice el enunciado: "ve cuáles están por debajo del mínimo". Ver la decisión pendiente D-2 en `docs/requisitos.md`.

## Historial de correcciones

Las correcciones a la propuesta inicial (commit `af95cea`) se explican en [`entregas/dia-02/README.md`](../entregas/dia-02/README.md#criterio-propio-correcciones-al-agente).
