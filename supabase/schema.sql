-- HISTÓRICO (Día 3). Desde el Día 4 el esquema vigente es supabase/migrations/20261124120000_crear_productos.sql
-- (4 políticas, SKU sin distinguir mayúsculas y GRANT a authenticated). No ejecutar este archivo en un proyecto nuevo.
-- Ejecutar una vez en SQL Editor de Supabase. Diseño aprobado del Día 2.
create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nombre text not null check (length(trim(nombre)) > 0),
  sku text not null check (length(trim(sku)) > 0),
  cantidad integer not null default 0 check (cantidad >= 0),
  minimo integer not null default 0 check (minimo >= 0),
  created_at timestamptz not null default now(),
  unique (user_id, sku)
);
alter table public.productos enable row level security;
-- La creación inicial no debe ejecutarse varias veces sin revisar políticas existentes.
create policy "ver mis productos" on public.productos for select to authenticated using (auth.uid() = user_id);
create policy "crear mis productos" on public.productos for insert to authenticated with check (auth.uid() = user_id);
create policy "actualizar mis productos" on public.productos for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
