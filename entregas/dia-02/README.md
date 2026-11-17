# Bitácora — Día 2 · Planeación, requisitos y diseño

| Campo | Valor |
|---|---|
| Equipo | Pchifus |
| Responsable del Día 2 | Jose Antonio Flores Cuamatzi |
| Fecha | 2026-11-16 |
| Repositorio | [Antoniii28/mini-inventario](https://github.com/Antoniii28/mini-inventario) |
| Rama | `dia-02-planeacion` (creada desde `main` en `86a35db`) |
| Agente | Claude Code (modelo Claude Opus 5.5) |
| Actividad oficial | `actividad-dia-02.html` (referencia local; no se sube al repositorio) |

> Esta bitácora registra solo hechos verificables con comandos, commits o issues.
> Lo que **Jose Antonio todavía debe revisar o decidir** está marcado con 🔎.

---

## Entregables

| Entregable | Dónde |
|---|---|
| 5 historias de usuario con criterios comprobables | [`docs/requisitos.md`](../../docs/requisitos.md) |
| Diseño técnico: tecnología, tabla `productos` y validaciones por capa | [`docs/diseno.md`](../../docs/diseno.md) |
| 5 issues creados con `gh`, con los criterios como tareas | [#3](https://github.com/Antoniii28/mini-inventario/issues/3) · [#4](https://github.com/Antoniii28/mini-inventario/issues/4) · [#5](https://github.com/Antoniii28/mini-inventario/issues/5) · [#6](https://github.com/Antoniii28/mini-inventario/issues/6) · [#7](https://github.com/Antoniii28/mini-inventario/issues/7) |
| 2 o más correcciones al agente, con su justificación | [Criterio propio](#criterio-propio-correcciones-al-agente) |
| Bitácora | Este archivo |

| Historia | Issue | Criterios |
|---|---|---|
| HU-01 · Iniciar y cerrar sesión | [#3](https://github.com/Antoniii28/mini-inventario/issues/3) | 4 |
| HU-02 · Registrar un producto | [#4](https://github.com/Antoniii28/mini-inventario/issues/4) | 6 |
| HU-03 · Ver mis productos | [#5](https://github.com/Antoniii28/mini-inventario/issues/5) | 4 |
| HU-04 · Actualizar la cantidad de un producto | [#6](https://github.com/Antoniii28/mini-inventario/issues/6) | 4 |
| HU-05 · Ver productos por debajo del mínimo | [#7](https://github.com/Antoniii28/mini-inventario/issues/7) | 4 |

---

## Cómo se siguió la actividad

| Paso oficial | Qué se hizo realmente |
|---|---|
| 1. Modo de solo planear | 🔎 **No se usó el modo plan.** La sesión estaba en modo automático y Jose autorizó al agente a trabajar de forma autónoma. Para que la planeación quedara separada y verificable, la propuesta inicial se guardó en un commit propio (`af95cea`) antes de corregirla. |
| 2. Historias de usuario | El agente no hizo preguntas interactivas. Las dudas quedaron como decisiones pendientes D-1 a D-3 en `docs/requisitos.md`, para que Jose las confirme. |
| 3. Diseño | `docs/diseno.md` con Node.js + Express, HTML + JavaScript sin framework y Supabase (Auth + PostgreSQL). |
| 4. Issues | Un issue por historia con `gh issue create`. Los cuerpos se generaron desde `docs/requisitos.md` y se revisó una vista previa antes de crearlos. |
| 5. Corregir al agente y subir | 4 correcciones (C-1 a C-4) en el commit `7b52360`; rama `dia-02-planeacion` y Pull Request hacia `main`. |

---

## Prompts clave

**De Jose Antonio al agente** (resumen con citas textuales):

1. *Encargo del Día 2:* "Vamos a completar de principio a fin la actividad oficial del Día 2 de Mini Inventario." Incluía: 5 historias en `docs/requisitos.md`, `docs/diseno.md` con "Node.js, Express, HTML, JavaScript sin framework y Supabase", la tabla `productos` "con id, user_id, nombre, sku, cantidad, minimo y created_at", 5 issues con `gh` y "al menos dos propuestas de diseño que deban corregirse o mejorarse". También pedía: "No inventes errores ni afirmes que yo hice revisiones que no ocurrieron".
2. *Archivo oficial:* "Ya coloqué el archivo oficial `actividad-dia-02.html` en la raíz del proyecto. […] Lee primero el archivo completo". También: "El archivo oficial es solo una referencia de trabajo: no lo incluyas en el commit".

**Prompts oficiales usados como referencia.** No se enviaron uno por uno; su contenido se cubrió dentro del encargo anterior.

- "…registra productos con nombre, SKU, cantidad y cantidad mínima, y ve cuáles están por debajo del mínimo. No escribas código. Hazme preguntas… y luego propone 5 historias de usuario…"
- "Propón el diseño técnico… Usa Node.js con Express para servir la página, HTML y JavaScript sin framework, y Supabase… Explica qué valida cada capa."
- "Crea un issue en GitHub por cada historia de docs/requisitos.md usando gh. Pon los criterios de aceptación como lista de tareas."

---

## Criterio propio: correcciones al agente

La **propuesta original** es el commit [`af95cea`](https://github.com/Antoniii28/mini-inventario/commit/af95cea). Las **correcciones** están en el commit [`7b52360`](https://github.com/Antoniii28/mini-inventario/commit/7b52360). Se pueden comparar con `git diff af95cea 7b52360 -- docs/`.

🔎 La revisión que encontró estos problemas la hizo **el agente**, comparando su propia propuesta con la actividad oficial. **Jose Antonio todavía no ha revisado estas correcciones.**

### C-1 · Express tenía una API innecesaria con la clave `service_role`
- **Propuesta original:** Express exponía `/api/productos` (GET, POST, PATCH), verificaba el token y consultaba Supabase con la clave `service_role`, filtrando por `user_id` en el código.
- **Corrección:** Express solo sirve la página, los estáticos y `/config.js`. El navegador usa `supabase-js` con la clave `anon`, y la base aplica **Row Level Security** (`auth.uid() = user_id`).
- **Por qué:**
  - La actividad dice "Express para servir la página" y "Comprueba que el diseño no agregue piezas innecesarias". La API eran 4 rutas y una verificación de tokens que no pide ninguna historia.
  - La clave `service_role` se salta las políticas de seguridad: un solo filtro olvidado mostraría productos de otras cuentas. Con RLS, la base lo impide aunque el código falle.

### C-2 · El SKU era único en toda la base
- **Propuesta original:** `sku text not null unique`.
- **Corrección:** `unique (user_id, sku)`, más un criterio nuevo en HU-02: "Otra cuenta sí puede usar un SKU que yo ya usé".
- **Por qué:** cada cuenta tiene su propio inventario. Con `unique` global, si otro establecimiento ya usó `HAR-001`, yo no podría usarlo. Además, el mensaje de error revelaría que existe un producto ajeno.

### C-3 · La base no validaba lo que el diseño decía que validaba
- **Propuesta original:** la tabla de validaciones decía que PostgreSQL validaba, pero `cantidad` y `minimo` no tenían `check`, y `nombre` y `sku` aceptaban texto vacío.
- **Corrección:** `check (cantidad >= 0)`, `check (minimo >= 0)` y `check (length(trim(...)) > 0)`. También `user_id default auth.uid()`.
- **Por qué:** después de C-1, el navegador escribe directo en Supabase. Las validaciones de HTML y JavaScript se pueden saltar, así que la base debe ser la última barrera.

### C-4 · La regla "bajo mínimo" no coincidía con el enunciado
- **Propuesta original:** `cantidad <= minimo`.
- **Corrección:** `cantidad < minimo`, con un ejemplo comprobable en HU-05 (4 y 5 sí; 5 y 5 no).
- **Por qué:** el enunciado dice "ve cuáles están **por debajo** del mínimo". 🔎 Es una decisión de negocio (D-2); Jose debe confirmarla.

---

## Errores y malas decisiones de la IA

### E-1 · Mala decisión de diseño (es la corrección C-1)
- **Qué pasó:** el agente propuso una API en Express con la clave `service_role`.
- **Cómo se detectó:** al revisar `docs/diseno.md` contra la frase de la actividad "Comprueba que el diseño no agregue piezas innecesarias" y contra "Express para servir la página".
- **Evidencia:** `git diff af95cea 7b52360 -- docs/diseno.md`.

### E-2 · Error del agente en el script que generó los issues
- **Qué pasó:** en el script de PowerShell que arma el cuerpo de cada issue, el agente escribió `` `docs/requisitos.md` `` dentro de una cadena con comillas dobles. En PowerShell, el acento grave (`` ` ``) es el carácter de escape, así que la vista previa salió como `[docs/requisitos.md](…)`, sin formato de código. Además, el enlace era relativo (`../blob/…`).
- **Cómo se detectó:** en la **vista previa** del cuerpo de HU-02, antes de crear cualquier issue.
- **Solución:** comillas simples y enlaces absolutos. Se regeneraron los cuerpos y se volvió a revisar la vista previa. Los 5 issues se crearon ya corregidos.

---

## Comando aprobado: `gh issue create`

Comando ejecutado (uno por historia):

```powershell
gh issue create --repo Antoniii28/mini-inventario --title "HU-02 · Registrar un producto" --body-file HU-02.md --label enhancement
```

- **Por qué se aprobó:**
  - Jose autorizó expresamente crear los issues ("Tienes autorización para trabajar de forma autónoma… crear la rama, documentación, issues…").
  - Antes de ejecutarlos, el agente mostró en la sesión los 5 comandos y la vista previa del cuerpo.
  - Comprobó que no hubiera issues previos (`gh issue list --state all` vacío) para no crear duplicados.
- **Qué hace (explicación del agente):** crea un issue nuevo en el repositorio `Antoniii28/mini-inventario`.
  - El título es el de la historia.
  - El texto sale del archivo `HU-02.md`, generado desde `docs/requisitos.md`. Ese archivo trae la historia y los criterios en formato `- [ ]`, que GitHub muestra como casillas de una lista de tareas.
  - `--label enhancement` marca el issue como funcionalidad nueva.
  - Devuelve la URL del issue creado (#4).
- 🔎 **Pendiente para Jose:** la actividad pide que la explicación esté "con tus palabras". El texto anterior es del agente; Jose debe reescribirlo o confirmarlo.

**Decisión del agente: no subir los archivos de la actividad.** `actividad-dia-02.html` y `actividad-dia-02.pdf` quedaron sin rastrear, como pidió Jose ("no lo incluyas en el commit"). Siempre se usó `git add` con rutas explícitas, nunca `git add .`.

---

## Cómo se comprobó el resultado

| Verificación | Resultado |
|---|---|
| Script que compara `docs/requisitos.md` con los issues en GitHub (`gh issue list --json`) | ✅ 5 historias = 5 issues; los criterios de cada issue son **idénticos** a los del documento (4, 6, 4, 4, 4); los títulos coinciden |
| El diseño menciona las 5 historias (HU-01 a HU-05) | ✅ |
| `create table productos` incluye `id`, `user_id`, `nombre`, `sku`, `cantidad`, `minimo` y `created_at` | ✅ las 7 columnas |
| El diseño menciona Express, HTML, JavaScript, Supabase, validaciones por capa y RLS | ✅ |
| Regla "bajo mínimo" igual en requisitos (`menor que`) y diseño (`cantidad < minimo`), sin restos de `<=` | ✅ |
| Issues duplicados antes de crearlos | ✅ ninguno (`gh issue list --state all` vacío) |
| Archivos de la actividad fuera del commit | ✅ `actividad-dia-02.html` y `.pdf` sin rastrear |
| Búsqueda de secretos (tokens, claves, contraseñas, correos) en los archivos nuevos | ✅ sin coincidencias |

Resultado del script: `RESULTADO: COHERENTE`.

> Hoy no se escribió código, así que no hay pruebas de ejecución. Los criterios de aceptación de los issues son las pruebas del Día 3.

---

## 🔎 Pendiente de revisión por Jose Antonio

- [ ] Confirmar o cambiar las decisiones **D-1** (cuentas creadas desde el panel de Supabase), **D-2** (`cantidad < minimo`) y **D-3** (el SKU distingue mayúsculas y minúsculas) de `docs/requisitos.md`.
- [ ] Revisar las correcciones **C-1 a C-4**.
- [ ] Reescribir con sus palabras la explicación del comando `gh issue create`.
- [ ] Revisar el Pull Request (revisor asignado: Luis Angel, `dosientos77-web`). No se fusiona sin su revisión.

No se hizo el extra opcional "Si terminas antes" (diagrama Mermaid), para priorizar la actividad obligatoria.
