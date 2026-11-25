-- Día 4 · Tabla productos con Row Level Security para las 4 operaciones.
-- Diseño: docs/diseno.md. Se aplica una sola vez, en un proyecto donde la tabla aún no existe.
-- Si la tabla ya existe, el "create table" falla a propósito: así no se mezclan reglas viejas con las nuevas.

create table public.productos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nombre      text not null check (length(trim(nombre)) > 0),
  sku         text not null check (length(trim(sku)) > 0),
  cantidad    integer not null default 0 check (cantidad >= 0),
  minimo      integer not null default 0 check (minimo >= 0),
  created_at  timestamptz not null default now()
);

comment on table public.productos is 'Inventario de cada usuario. RLS: cada usuario solo accede a sus filas.';

-- SKU único por usuario sin distinguir mayúsculas y minúsculas (ARR-001 = arr-001).
-- Empieza por user_id, así que también sirve de índice para la llave foránea y para los filtros de RLS.
create unique index productos_user_id_sku_ci_key on public.productos (user_id, lower(sku));

-- RLS activo: sin una política que lo permita, nadie lee ni escribe.
alter table public.productos enable row level security;

-- Desde 2026 los proyectos nuevos no exponen las tablas nuevas a la Data API sin GRANT explícito.
-- Solo se concede acceso al rol authenticated; anon (sin sesión) no recibe ningún permiso.
grant select, insert, update, delete on table public.productos to authenticated;

-- Una política por operación. (select auth.uid()) se evalúa una vez por consulta, no por fila.
create policy "productos_select_propios" on public.productos
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "productos_insert_propios" on public.productos
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "productos_update_propios" on public.productos
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "productos_delete_propios" on public.productos
  for delete to authenticated
  using ((select auth.uid()) = user_id);
