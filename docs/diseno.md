# Diseño técnico — Mini Inventario

## Tecnología

| Pieza | Uso |
|---|---|
| **Node.js 22 + Express** | Servidor web que entrega la página y los archivos estáticos. |
| **HTML + JavaScript sin framework** | Interfaz: inicio de sesión, formulario de productos, lista y filtro. |
| **Supabase** | Base de datos PostgreSQL e inicio de sesión (Supabase Auth con correo y contraseña). |

## Arquitectura

```
Navegador (HTML + JS)
   │  1. GET /            → Express entrega index.html, app.js, styles.css
   │  2. /api/productos    → Express (API REST)
   ▼
Servidor Express ──(clave service_role)──► Supabase (Auth + PostgreSQL)
```

- El navegador inicia sesión con Supabase Auth y envía el token de sesión a Express en la cabecera `Authorization`.
- Express verifica el token, obtiene el `user_id` y consulta Supabase con la clave `service_role`, filtrando por ese `user_id`.

### Endpoints de Express

| Método | Ruta | Uso | Historia |
|---|---|---|---|
| GET | `/` | Página principal | HU-01 |
| GET | `/api/productos` | Lista de productos del usuario (`?bajoMinimo=true` para filtrar) | HU-03, HU-05 |
| POST | `/api/productos` | Registrar producto | HU-02 |
| PATCH | `/api/productos/:id` | Actualizar cantidad y mínimo | HU-04 |

## Estructura de archivos propuesta

```
server.js            ← Express: estáticos + API
public/
  index.html
  app.js
  styles.css
.env                 ← SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (no se sube)
.env.example
```

## Tabla `productos`

```sql
create table productos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  nombre      text not null,
  sku         text not null unique,
  cantidad    integer not null default 0,
  minimo      integer not null default 0,
  created_at  timestamptz not null default now()
);
```

| Columna | Tipo | Regla |
|---|---|---|
| `id` | uuid | Generado por la base de datos |
| `user_id` | uuid | Dueño del producto (usuario de Supabase Auth) |
| `nombre` | text | Obligatorio |
| `sku` | text | Obligatorio y único |
| `cantidad` | integer | Obligatorio |
| `minimo` | integer | Obligatorio |
| `created_at` | timestamptz | Fecha de registro automática |

## Validaciones por capa

| Capa | Qué valida |
|---|---|
| **HTML** | `required` en los cuatro campos; `type="number"`, `min="0"` y `step="1"` en cantidad y mínimo. |
| **JavaScript del navegador** | Quita espacios al inicio y al final, comprueba que nombre y SKU no queden vacíos y que cantidad y mínimo sean enteros ≥ 0. Muestra el error junto al campo. |
| **Express** | Rechaza peticiones sin token válido (401). Repite las validaciones de los campos y responde 400 si fallan. Asigna `user_id` desde el token, nunca desde el cuerpo de la petición. |
| **Supabase (PostgreSQL)** | `not null` en las columnas obligatorias, `unique` en `sku` y la llave foránea a `auth.users`. |

## Regla "bajo mínimo"

Un producto está bajo mínimo cuando `cantidad <= minimo`.
