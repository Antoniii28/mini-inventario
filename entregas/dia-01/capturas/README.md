# Capturas — Día 1

En esta carpeta van **solo capturas originales** que el equipo toma manualmente.
No se generan ni se editan con herramientas automáticas.

Antes de agregar una captura, revisa que no muestre tokens completos, correos personales, contraseñas ni datos privados. Si hace falta, recórtala.

Las capturas actuales están en [`Evidencias_Dia1_Pchifus/capturas/`](Evidencias_Dia1_Pchifus/capturas/). Ver también [`Evidencias_Dia1_Pchifus/LEEME.txt`](Evidencias_Dia1_Pchifus/LEEME.txt).

## Evidencias

| Estado | Archivo | Qué debe mostrar | Qué muestra realmente | Sección de la bitácora |
|---|---|---|---|---|
| ⬜ | `01-gh-auth-status.png` | La salida de `gh auth status` con la cuenta `Antoniii28` (el token ya sale enmascarado) | — | 3.1 |
| ⬜ | `02-versiones-python.png` | `python --version`, `python3 --version` y `py -3.12 --version` (el error) | — | 4 · P1 |
| ✅ | [`03-repo-github.png`](Evidencias_Dia1_Pchifus/capturas/03-repo-github.png) | La página principal del repositorio con los 3 archivos y la etiqueta **Public** | Repositorio `Antoniii28/mini-inventario` **Public**, rama `main`, 1 rama, 1 commit; `.gitignore`, `CLAUDE.md` y `README.md`; último commit `6ea9164 Día 1: estructura inicial del proyecto` (autores `Antoniii28` y `claude`); descripción del repositorio | 5 |
| ⬜ | `04-commit-inicial.png` | El historial de commits en GitHub con `6ea9164` | — *(el hash `6ea9164` y "1 Commit" sí se ven en la captura 03)* | 5 |
| ⬜ | `05-colaboradores.png` | *Settings → Collaborators* con `dosientos77-web` como colaborador aceptado (rol **Write**) | — | 7 |
| ✅ | [`06-clonacion-verificacion.png`](Evidencias_Dia1_Pchifus/capturas/06-clonacion-verificacion.png) | La salida de la clonación y de las 7 comprobaciones (**obligatoria**) | La terminal de Claude Code con la tabla de las 7 comprobaciones ✅, los hashes de Git coincidentes y la carpeta clonada `mini-inventario-verificacion`. Es el resumen que dio el asistente en la sesión (marca "done 17:14"), no la salida directa de `git clone` | 6 |
| ⬜ | `07-claude-md.png` | `CLAUDE.md` visto en GitHub | — | 5 |
| ➕ | [`extra-inicio-claude-code.png`](Evidencias_Dia1_Pchifus/capturas/extra-inicio-claude-code.png) | *(complementaria)* | El inicio de la sesión: Claude Code v2.1.322, modelo Opus 5.5, carpeta `~\Documents\mini-inventario` y el primer prompt del equipo. No sustituye a ninguna otra captura | 2 |

**Resumen:** 2 de 7 capturas previstas (03 y 06) y 1 complementaria.
Cuando agregues una captura, cambia ⬜ por ✅ en esta tabla.
