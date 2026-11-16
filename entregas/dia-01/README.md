# Bitácora — Día 1 · Mini Inventario

| Campo | Valor |
|---|---|
| Equipo | Pchifus |
| Integrantes | Jose Antonio Flores Cuamatzi · Luis Angel Osorio Galicia |
| Fecha | 2026-11-12 (trabajo del día) · 2026-11-16 (revisión final de la entrega) |
| Repositorio | [Antoniii28/mini-inventario](https://github.com/Antoniii28/mini-inventario) (público) |
| Stack definido | Node.js 22 · Python 3.12 |
| Asistente utilizado | Claude Code (modelo Claude Opus 5.5) |
| Alcance del día | Configuración del repositorio y documentación. **La aplicación no se ha desarrollado.** |

> Esta bitácora solo registra hechos verificados con la salida de comandos ejecutados durante la sesión.
> Las capturas originales están en [`capturas/`](capturas/README.md): 2 principales y 1 complementaria.

---

## 0. Requisitos del Día 1

> **Aviso:** el documento oficial del profesor con los requisitos del Día 1 **no está en el repositorio** y no se ha consultado.
> Esta tabla solo recoge los requisitos que el equipo indicó en sus instrucciones. Se debe contrastar con el documento oficial.

| Requisito (según las instrucciones del equipo) | Estado | Dónde se comprueba |
|---|---|---|
| Repositorio público `Antoniii28/mini-inventario` | ✅ | §5 |
| `README.md` del proyecto | ✅ | Raíz del repositorio |
| `.gitignore` para Node.js, Python y secretos | ✅ | Raíz del repositorio |
| `CLAUDE.md` de 20 líneas o menos, con reglas de ramas y PR, secretos y autorización antes de borrar o desplegar | ✅ 19 líneas | §5 |
| Stack Node.js 22 y Python 3.12 verificado, sin instalar nada | ✅ | §4 · P1 |
| Trabajo mediante ramas y Pull Requests después del commit inicial | ✅ Rama `docs/dia-01-evidencias` → [PR #1](https://github.com/Antoniii28/mini-inventario/pull/1), fusionado en `main` | §9 |
| Colaborador del equipo con acceso al repositorio | ✅ | §7 |
| Clonación del repositorio y verificación | ✅ 7/7 · ✅ captura 06 | §6 |
| Bitácora en Markdown con prompts, comandos, errores, pruebas y resultados | ✅ | Este documento |
| Capturas originales | ✅ 2 principales (03 y 06) + 1 complementaria | [`capturas/`](capturas/README.md) |
| Entrega en GitHub y en Google Drive (sin documentos Word) | ✅ GitHub (PR #1 fusionado) · ✅ Drive (según el equipo) | §9 |
| Sin secretos ni tokens en el repositorio | ✅ | §5 |

---

## 1. Resumen de actividades

| # | Actividad | Resultado |
|---|---|---|
| 1 | Verificación inicial del entorno (solo lectura) | ✅ Carpeta vacía, GitHub CLI autenticado |
| 2 | Propuesta de `README.md`, `.gitignore` y `CLAUDE.md` | ✅ Aprobada por el equipo |
| 3 | Comprobación de los ejecutables de Python (solo lectura) | ✅ `python3` → 3.12.10 · ⚠️ ver problema P1 |
| 4 | Creación de archivos, commit inicial y publicación del repositorio | ✅ Commit `6ea9164` publicado (con un intento fallido previo, ver P3) |
| 5 | Invitación de colaborador a Luis Angel | ✅ Enviada y **aceptada** (permiso de escritura) |
| 6 | Clonación y verificación en una carpeta independiente | ✅ 7 de 7 comprobaciones correctas |
| 7 | Preparación de esta bitácora en la rama `docs/dia-01-evidencias` | ✅ Preparada |
| 8 | Revisión final del estado y de la entrega (solo lectura, 2026-11-16) | ✅ Sin cambios en `main`; colaborador confirmado |
| 9 | Revisión de las capturas originales agregadas por el equipo (2026-11-16) | ✅ 2 principales (03 y 06) y 1 complementaria |
| 10 | Publicación de la bitácora (2026-11-16) | ✅ Commit `e0a9841`, push de `docs/dia-01-evidencias` y [PR #1](https://github.com/Antoniii28/mini-inventario/pull/1) con `dosientos77-web` como revisor |
| 11 | Fusión del PR #1 en `main` | ✅ Fusionado por `Antoniii28` el 2026-11-16 19:11:59 UTC (merge `0ff46cf`) |
| 12 | Entrega en Google Drive | ✅ Subida por el equipo (README.md y las 3 capturas) |
| 13 | Corrección final de la documentación en la rama `docs/dia-01-correccion-final` | ✅ Esta versión de la bitácora |

---

## 2. Prompts del equipo (resumen)

El equipo trabajó por etapas: cada instrucción pedía primero un plan y solo después autorizaba cambios.

| # | Instrucción del equipo | Condiciones clave (citas textuales) |
|---|---|---|
| 1 | Preparar el Día 1: verificar la carpeta y GitHub CLI y proponer el repositorio y los archivos base | "No crees archivos ni ejecutes comandos que modifiquen el proyecto todavía." · "Primero presenta tu plan y espera mi aprobación." |
| 2 | Aprobar los archivos y verificar qué ejecutable usa `python3` y si existe `py -3.12` | "No instales Python ni cambies el requisito del proyecto a 3.13." |
| 3 | Autorizar la creación de archivos, el commit inicial y la publicación | "Si el repositorio remoto ya existe, detente y solicita instrucciones antes de continuar." · "Este será el único commit inicial directamente en main." |
| 4 | Invitar a Luis Angel (`dosientos77-web`) con permiso de escritura | "No realices operaciones adicionales." |
| 5 | Planear la clonación de verificación | "No ejecutes todavía la clonación." |
| 6 | Autorizar la clonación y las 7 comprobaciones | "No borres la carpeta de verificación después de terminar." |
| 7 | Planear y preparar esta bitácora | "No inventes errores, pruebas ni capturas." · "NO autorizo todavía git add, commit, push, crear Pull Requests…" |
| 8 | Revisar las capturas existentes antes de publicar | "Comprueba que la bitácora no afirme que hay capturas que aún no existen." |
| 9 | Comprobar la aceptación de la invitación y actualizar la bitácora | "Comprueba mediante GitHub CLI si `dosientos77-web` ya aparece como colaborador con acceso de escritura." |
| 10 | Cambiar la evidencia 05 a "colaborador aceptado" | "No inventar evidencias ni afirmar que existen capturas que todavía no tenemos." |
| 11 | Cerrar el Día 1 para GitHub y Drive | "Verifica los requisitos oficiales del Día 1 que estén disponibles. No inventes requisitos." · "sin crear documentos Word" |
| 12 | Revisar las capturas incorporadas y actualizar la bitácora | "No inventes evidencias ni marques como completadas las que falten." |
| 13 | Publicar: `git add` de `entregas/dia-01/`, commit, push, PR y revisor | "No hagas merge ni modifiques directamente `main`." |
| 14 | Corrección final después de la fusión y la entrega en Drive | "No inventes nuevas pruebas ni modifiques las capturas originales." · "Trabaja en una rama nueva creada desde main actualizada" |

---

## 3. Comandos y operaciones

### 3.1 Comandos ejecutados con éxito

| Comando | Propósito | Tipo |
|---|---|---|
| `Get-Location`, `Get-ChildItem -Force` | Confirmar la ubicación y que la carpeta estaba vacía | Lectura |
| `gh auth status` | Confirmar la sesión de GitHub CLI (cuenta `Antoniii28`) | Lectura |
| `node --version`, `python --version`, `python3 --version`, `git --version` | Versiones instaladas | Lectura |
| `Get-Command python3 -All`, `Get-Command python -All`, `py --list-paths` | Identificar los ejecutables de Python | Lectura |
| `gh repo view Antoniii28/mini-inventario` | Confirmar que el repositorio remoto **no** existía antes de crearlo | Lectura |
| `git init -b main` | Inicializar Git con la rama `main` | Autorizado |
| `git add README.md .gitignore CLAUDE.md` | Preparar solo los tres archivos aprobados | Autorizado |
| `git grep --cached -E "<patrones de secretos>"` | Buscar tokens o claves en los archivos preparados | Lectura |
| `git config --local user.email "<correo noreply de GitHub>"` | Corregir el correo del autor **solo en este repositorio** (ver P2) | Autorizado |
| `git commit -m "Día 1: estructura inicial del proyecto" -m "Co-Authored-By: …"` | Commit inicial | Autorizado |
| `gh repo create Antoniii28/mini-inventario --public --source=. --remote=origin --push` | Crear y publicar el repositorio | Autorizado |
| `gh api repos/Antoniii28/mini-inventario/contents` | Confirmar los tres archivos en GitHub | Lectura |
| `gh api users/dosientos77-web` | Confirmar que la cuenta de Luis Angel existe | Lectura |
| `gh api -X PUT repos/Antoniii28/mini-inventario/collaborators/dosientos77-web -f permission=push` | Enviar la invitación con permiso de escritura | Autorizado |
| `gh api repos/Antoniii28/mini-inventario/invitations` | Consultar el estado de la invitación | Lectura |
| `gh api repos/Antoniii28/mini-inventario/collaborators[/dosientos77-web/permission]` | Confirmar que Luis Angel es colaborador con permiso de escritura | Lectura |
| `gh pr list --repo Antoniii28/mini-inventario --state all` | Confirmar que aún no hay Pull Requests (2026-11-16) | Lectura |
| `git ls-remote …`, `git fetch --dry-run` | Comprobar el acceso al remoto y la sincronización | Lectura |
| `git clone https://github.com/Antoniii28/mini-inventario.git ../mini-inventario-verificacion` | Clonar en una carpeta independiente | Autorizado |
| `git switch -c docs/dia-01-evidencias` | Crear la rama de esta bitácora | Autorizado |
| `git add -- entregas/dia-01/` | Preparar solo los archivos de la entrega (6 archivos) | Autorizado |
| `git commit -m "docs: bitácora y evidencias del Día 1" -m "Co-Authored-By: …"` | Commit `e0a9841` | Autorizado |
| `git push -u origin docs/dia-01-evidencias` | Publicar la rama en GitHub | Autorizado |
| `gh pr create --base main --head docs/dia-01-evidencias --reviewer dosientos77-web` | Crear el PR #1 y pedir la revisión de Luis Angel | Autorizado |
| `gh pr view 1` | Confirmar que el PR #1 está fusionado (`MERGED`, merge `0ff46cf`) | Lectura |
| `git switch main`, `git pull --ff-only` | Actualizar `main` local con avance rápido hasta `0ff46cf` | Autorizado |
| `git switch -c docs/dia-01-correccion-final` | Crear la rama de la corrección final | Autorizado |

### 3.2 Comandos fallidos

| Comando | Error real | Detalle |
|---|---|---|
| `py -3.12 --version` | `No suitable Python runtime found` | Ver P1 |
| `git commit -F -` (mensaje pasado con un here-string de PowerShell) | `error: pathspec 'Día 1: …' did not match any file(s) known to git` | Ver P3 |
| `gh repo create … --push` (primer intento) | `` `--push` enabled but no commits found `` | Falló porque el commit anterior no se creó. **No se creó ningún repositorio remoto.** Ver P3 |

### 3.3 Operaciones aplazadas (se hicieron después, con autorización)

| Operación | Motivo del aplazamiento | Estado |
|---|---|---|
| Invitar a Luis Angel como colaborador | Faltaba confirmar su usuario de GitHub | Invitación enviada y aceptada |
| Clonar el repositorio para verificarlo | El equipo pidió revisar el plan primero | Hecho, 7/7 correctas |
| Crear archivos y publicar el repositorio | El equipo pidió revisar el contenido primero | Hecho |
| Commit, push y Pull Request de la bitácora | El equipo pidió revisar el diff y las capturas primero | Hecho (PR #1) |

### 3.4 Operaciones no autorizadas (no se hicieron)

| Operación | Motivo |
|---|---|
| Instalar Python o cambiar el requisito a 3.13 | El equipo lo prohibió expresamente |
| Cambiar el correo **global** de Git | Se eligió la configuración local para no afectar a otros proyectos |
| Fusionar el PR #1 por parte del asistente | No autorizado; la fusión la hizo el equipo desde GitHub |
| Borrar la carpeta de verificación | El equipo pidió conservarla |
| Acceder o modificar otros proyectos (p. ej. ÑamFod) | Fuera del alcance de este proyecto |

> Ningún comando fue rechazado por el sistema de permisos de la herramienta. Las operaciones pendientes se detuvieron porque el asistente pidió autorización antes de ejecutarlas.

---

## 4. Problemas encontrados y soluciones

### P1 · `python` y `python3` ejecutan versiones distintas
- **Evidencia:**

  | Comando | Ejecutable | Versión |
  |---|---|---|
  | `python3` | `%USERPROFILE%\scoop\apps\python312\current\python.exe` (vía Scoop) | 3.12.10 |
  | `python` | `C:\Python313\python.exe` (primero en el PATH) | 3.13.6 |
  | `py --list-paths` | Solo detecta `C:\Python313\python.exe` | 3.13 |
  | `py -3.12` | — | ❌ `No suitable Python runtime found` |

- **Riesgo:** quien escriba `python` usará sin aviso la 3.13 en lugar de la 3.12 requerida.
- **Solución:** usar siempre `python3`. La regla quedó en `CLAUDE.md`: *"usar `python3`, no `python` ni `py`"*. No se instaló ni se desinstaló nada.

### P2 · El correo global de Git era un texto de ejemplo
- **Evidencia:** `git config --global user.email` devolvía `TU_CORREO_DE_GITHUB`.
- **Riesgo:** el commit no quedaría ligado a la cuenta de GitHub.
- **Solución:** el asistente se detuvo antes del commit y preguntó. El equipo eligió el correo noreply de GitHub **solo para este repositorio** (`git config --local`).
- **Pendiente:** la configuración global sigue con el texto de ejemplo.

### P3 · Primer intento de commit fallido por la sintaxis de PowerShell
- **Evidencia:** se usó `git commit -F -` con el mensaje en un here-string de PowerShell. El mensaje no llegó a Git por la entrada estándar y Git lo interpretó como una ruta de archivo:
  `error: pathspec 'Día 1: estructura inicial del proyecto …' did not match any file(s) known to git`.
  En la misma ejecución, `gh repo create --push` falló con `` `--push` enabled but no commits found ``.
- **Comprobación posterior:** `gh repo view` confirmó que el repositorio remoto **no** se había creado y `git log` confirmó que no había commits.
- **Solución:** se repitió con `git commit -m "…" -m "…"` y la publicación funcionó.

### Nota · Línea adicional en el commit inicial
El mensaje del commit `6ea9164` lleva, además del texto pedido, la línea
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, que el asistente agrega a sus commits.
Se conserva porque quitarla obligaría a reescribir el historial (`push --force`), algo que `CLAUDE.md` prohíbe.

---

## 5. Hechos confirmados

| Hecho | Evidencia |
|---|---|
| Repositorio `Antoniii28/mini-inventario` creado como **público** | `gh repo view` → `PUBLIC`, rama por defecto `main` · 📷 [`03-repo-github.png`](capturas/Evidencias_Dia1_Pchifus/capturas/03-repo-github.png) |
| Commit inicial `6ea9164` — `Día 1: estructura inicial del proyecto` | `git log -1` (2026-11-12 15:27:10 -0600) · `git ls-remote` → `refs/heads/main` = `6ea9164…` |
| `README.md`, `.gitignore` y `CLAUDE.md` en GitHub | `gh api …/contents` → 750, 350 y 1058 bytes |
| `CLAUDE.md` con 19 líneas (máximo 20) | `(Get-Content CLAUDE.md).Count` → 19 |
| Sin secretos en el commit inicial | `git grep --cached` con patrones de tokens, claves y contraseñas → sin coincidencias |
| Repositorio clonado en `../mini-inventario-verificacion` | `git clone` terminó con código de salida 0 |

---

## 6. Pruebas de verificación del clon

Repositorio clonado por HTTPS público en una carpeta independiente (`../mini-inventario-verificacion`).

📷 Evidencia: [`06-clonacion-verificacion.png`](capturas/Evidencias_Dia1_Pchifus/capturas/06-clonacion-verificacion.png), con el resumen de las 7 comprobaciones que dio el asistente en la sesión del 2026-11-12.

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Clonación desde `https://github.com/Antoniii28/mini-inventario.git` | ✅ Sin errores |
| 2 | Existen `README.md`, `.gitignore` y `CLAUDE.md` | ✅ Los tres `True` |
| 3 | Rama `main` sincronizada con `origin/main` | ✅ 0 adelante · 0 atrás |
| 4 | El último commit es `6ea9164` | ✅ |
| 5 | Sin cambios pendientes | ✅ `git status` limpio |
| 6 | Archivos iguales al repositorio original | ✅ Mismos hashes de Git (ver abajo) |
| 7 | `CLAUDE.md` con 20 líneas o menos | ✅ 19 líneas |

Hashes de los archivos versionados (`git ls-files -s`), idénticos en el clon y en el original:

```
100644 abeadd0571c4058bc6abe91b2b72c04511de5d03 0  .gitignore
100644 84001870e803041ab3a30f3ea0295d82d459a1a9 0  CLAUDE.md
100644 0250e97278611cf2c80eb4528c6146a7e2703941 0  README.md
```

---

## 7. Colaboración

| Integrante | Cuenta de GitHub | Estado |
|---|---|---|
| Jose Antonio Flores Cuamatzi | `Antoniii28` | Propietario (admin) |
| Luis Angel Osorio Galicia | `dosientos77-web` | ✅ Colaborador con permiso de **escritura** (`write`) |

Historial de la invitación:
1. Se envió con `gh api -X PUT …/collaborators/dosientos77-web -f permission=push`.
2. Las consultas posteriores la mostraban **pendiente** (no caducada).
3. Luis Angel avisó que la había aceptado. Se comprobó el 2026-11-12:
   - `gh api …/invitations` → no quedan invitaciones pendientes.
   - `gh api …/collaborators` → `dosientos77-web` con rol `write` (`push: true`, `admin: false`).
   - `gh api …/collaborators/dosientos77-web/permission` → `write`.

---

## 8. Pendientes

- [x] Que Luis Angel acepte la invitación al repositorio (comprobado con `gh api`; confirmado de nuevo el 2026-11-16).
- [x] Captura de clonación (`06-clonacion-verificacion.png`).
- [x] Commit, push y Pull Request de la bitácora ([PR #1](https://github.com/Antoniii28/mini-inventario/pull/1)).
- [x] Fusión del PR #1 en `main` (merge `0ff46cf`).
- [x] Entrega en Google Drive (según el equipo).
- [ ] Contrastar la sección 0 con el documento oficial de requisitos del profesor.
- [ ] Opcional: corregir el correo global de Git (P2).

> **Nota sobre la revisión:** el PR #1 pidió la revisión de `dosientos77-web`, pero `gh pr view 1` no muestra ninguna revisión registrada en GitHub antes de la fusión. Para los próximos PR conviene que Luis Angel apruebe desde GitHub, como pide `CLAUDE.md`.

---

## 9. Entrega

### GitHub ✅
- Repositorio: https://github.com/Antoniii28/mini-inventario
- Pull Request: [#1 `docs/dia-01-evidencias` → `main`](https://github.com/Antoniii28/mini-inventario/pull/1), **fusionado** el 2026-11-16 (merge `0ff46cf`).
- Estructura publicada en `main`:

```
entregas/dia-01/
├── README.md                          ← esta bitácora
└── capturas/
    ├── README.md                      ← lista de evidencias
    └── Evidencias_Dia1_Pchifus/
        ├── LEEME.txt                  ← nota del equipo sobre el origen de las capturas
        └── capturas/
            ├── 03-repo-github.png
            ├── 06-clonacion-verificacion.png
            └── extra-inicio-claude-code.png
```

### Evidencias
| Tipo | Captura |
|---|---|
| Principal | [`03-repo-github.png`](capturas/Evidencias_Dia1_Pchifus/capturas/03-repo-github.png) |
| Principal | [`06-clonacion-verificacion.png`](capturas/Evidencias_Dia1_Pchifus/capturas/06-clonacion-verificacion.png) |
| Complementaria | [`extra-inicio-claude-code.png`](capturas/Evidencias_Dia1_Pchifus/capturas/extra-inicio-claude-code.png) |

### Google Drive ✅ (sin documentos Word)
Según el equipo, la entrega en Drive tiene 4 archivos:

```
README.md
03-repo-github.png
06-clonacion-verificacion.png
extra-inicio-claude-code.png
```

> En Drive las imágenes están junto al `README.md`, así que los enlaces relativos de esta bitácora (que siguen la estructura del repositorio) no se abren desde Drive. La versión de referencia es la del repositorio.
