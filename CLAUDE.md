# CLAUDE.md — Mini Inventario (equipo Pchifus)

Aplicación web para administrar el inventario de un establecimiento de comida.
Stack: Node.js 22 y Python 3.12 (usar `python3`, no `python` ni `py`). Proyecto independiente: no acceder ni modificar otros proyectos (p. ej. ÑamFod).
Antes de actuar lee `docs/gestion/CONTEXTO_COMPARTIDO.md`; actividades oficiales en `docs/actividades-oficiales/` y plan en `docs/gestion/PLAN_TRABAJO_DIAS_04_A_08.md`.

## Ramas y Pull Requests
- Nunca hacer commit directo a `main`; crear una rama por tarea: `feature/<tema>`, `fix/<tema>`, `docs/<tema>`.
- Commits pequeños con mensajes claros en español.
- Todo cambio entra a `main` mediante Pull Request revisado por el otro integrante.
- No usar `push --force` ni reescribir el historial de ramas compartidas.

## Secretos
- Nunca subir credenciales, tokens ni archivos `.env`; usar `.env.example` con valores ficticios.
- No mostrar secretos en logs, commits, issues ni Pull Requests.

## Autorización obligatoria
- Pedir confirmación explícita antes de eliminar archivos, ramas, datos o bases de datos.
- Pedir confirmación explícita antes de desplegar o publicar en cualquier entorno.
- Ante la duda, preguntar antes de actuar.
