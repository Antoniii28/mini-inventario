-- Día 4 · Mínimo privilegio en public.productos.
-- Los privilegios por defecto del proyecto daban TRUNCATE, TRIGGER y REFERENCES a anon y authenticated.
-- La app no los usa (la Data API no los expone) y TRUNCATE ignora RLS, así que se retiran.
-- No borra datos, tablas ni políticas: solo quita permisos.
revoke truncate, trigger, references on table public.productos from anon, authenticated;
