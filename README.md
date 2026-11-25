# Mini Inventario

Aplicación web para administrar el inventario de productos de un establecimiento de comida.

## Equipo Pchifus
- Jose Antonio Flores Cuamatzi
- Luis Angel Osorio Galicia

## Tecnologías
- Node.js 22
- Python 3.12

## Estado
🚧 Día 1: configuración inicial del repositorio. La aplicación aún no se ha desarrollado.

## Flujo de trabajo
1. Crear una rama desde `main` (`feature/...`, `fix/...`, `docs/...`).
2. Hacer commits pequeños y descriptivos.
3. Abrir un Pull Request y pedir revisión al otro integrante.
4. Fusionar a `main` solo después de la aprobación.

## Configuración local
Requisitos: Node.js 22 (22.20 o superior para las skills).

**Base de datos:** el proyecto Supabase oficial y compartido del equipo, `snefrzzosulngvootger`, que ya tiene las migraciones aplicadas. No hace falta ejecutar SQL; ver [`docs/diseno.md`](docs/diseno.md#proyecto-supabase-oficial).

1. `npm ci`
2. Copia `.env.example` como `.env` (no se sube al repositorio) y completa:
   - `SUPABASE_URL`: `https://snefrzzosulngvootger.supabase.co`
   - `SUPABASE_KEY`: **solo** la llave publishable (`sb_publishable_...`). Jose la comparte por un canal privado. El servidor no arranca con una llave secret o service_role.
   - `PORT`: opcional (3000 por defecto).
   - Para pruebas automáticas (Día 5 en adelante): `TEST_EMAIL` y `TEST_PASSWORD` del usuario de prueba asignado.
3. `npm start` y abre `http://localhost:3000`.
4. `npm test` ejecuta las pruebas unitarias.

Desde el Día 4 la variable se llama `SUPABASE_KEY`; `README-DIA-03.md` describe la versión del Día 3 (`SUPABASE_ANON_KEY`).
