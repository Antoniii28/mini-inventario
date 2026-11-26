# Día 4 · Conecta datos reales e inicio de sesión con Supabase

> Fuente oficial: [`actividad-dia-04.html`](actividad-dia-04.html) · [`actividad-dia-04.pdf`](actividad-dia-04.pdf).
> Las secciones 1 a 11 copian la actividad oficial. La sección 12 son **notas del equipo** y no forman parte de la instrucción del profesor.

| Dato | Valor |
|---|---|
| Duración oficial | 60 minutos |
| Modalidad oficial | **Individual** |
| Responsable asignado (equipo) | Jose Antonio · `Antoniii28` |
| Rama oficial | `dia-04-supabase` |
| Issue de seguimiento | Ver [`docs/gestion/PLAN_TRABAJO_DIAS_04_A_08.md`](../../gestion/PLAN_TRABAJO_DIAS_04_A_08.md) |

## 1. Objetivo
"Hoy reemplazas el almacenamiento temporal por una base de datos real. El agente trabaja mediante el MCP de Supabase y tú apruebas cada cambio."

## 2. Requisitos previos
- La primera versión de la web en la rama principal.
- Una cuenta gratuita de Supabase.

## 3. Herramientas
| Herramienta | Para qué sirve | Costo |
|---|---|---|
| Claude Code o Codex | El agente con el que haces toda la actividad. | Codex viene en ChatGPT Free |
| Git y GitHub | Guardar versiones y publicar tu repositorio. | Gratis |
| GitHub CLI (gh) | Que el agente trabaje con GitHub desde la terminal. | Gratis |
| Node.js 22 | Ejecutar la web. | Gratis |
| Supabase (plan Free) | Base de datos PostgreSQL e inicio de sesión. | Gratis, 2 proyectos activos |
| MCP de Supabase | Que el agente trabaje con tu proyecto de Supabase. | Gratis |
| Skills de Supabase | Buenas prácticas de Supabase, Postgres y RLS. Se instalan desde skills.sh. | Gratis, **requiere Node.js 22.20 o superior** |

## 4. Instrucciones obligatorias
1. **Crea tu proyecto (10 min):** en Supabase crea un proyecto llamado `mini-inventario` y copia su Project Ref desde la configuración. Crea en tu repositorio la rama `dia-04-supabase`.
2. **Conecta el MCP y las skills (10 min):**
   - Conecta el MCP solo a tu proyecto y autoriza desde el navegador.
   - Mantén la aprobación manual: el MCP actúa con tus permisos de desarrollador.
   - Instala las skills `supabase` y `supabase-postgres-best-practices` y reinicia la sesión del agente.
3. **Crea la tabla y sus reglas (15 min):** lee el SQL completo antes de aprobarlo.
4. **Conecta la web (15 min):** en Supabase, ve a *Authentication → Users* y crea 2 usuarios confirmados para no depender de correos.
5. **Comprueba la seguridad y abre el PR (10 min):**
   - Entra con cada usuario y confirma que ninguno ve los productos del otro.
   - Toma una captura de cada sesión.
   - Comprueba que `.env` no se sube y abre el pull request.

## 5. Prompts oficiales
```text
Usa el MCP de Supabase solo en este proyecto y sigue las skills supabase y supabase-postgres-best-practices. Crea una migración con la tabla productos según docs/diseno.md. Activa Row Level Security y crea políticas para que cada usuario solo pueda leer, crear, editar y borrar sus propios productos. Muéstrame el SQL antes de aplicarlo.
```
```text
Cambia public/productos.js para usar Supabase en lugar de localStorage. Agrega registro e inicio de sesión con correo y contraseña. Lee SUPABASE_URL y SUPABASE_KEY del archivo .env y entrégalas al navegador desde la ruta /config.js. Usa solo la llave publishable o anon, nunca la service_role. Crea un .env.example sin valores.
```

## 6. Comandos
| Para | Claude Code | Codex |
|---|---|---|
| Conectar el MCP | `claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=TU_REF"` y después `/mcp` → `supabase` → autenticarse | `codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=TU_REF"` y después `codex mcp login supabase` |
| Instalar las skills | `npx skills add supabase/agent-skills --skill supabase supabase-postgres-best-practices -a claude-code -y` (quedan en `.claude/skills/`) | `npx skills add supabase/agent-skills --skill supabase supabase-postgres-best-practices -a codex -y` (quedan en `.agents/skills/`) |

Verificación final:
```bash
git status
git check-ignore .env
```

## 7. Archivos solicitados
- La migración SQL de la tabla `productos` con RLS y políticas para las 4 operaciones.
- `public/productos.js` modificado. En este repositorio es `public/app.js`; ver la nota N-2.
- La ruta `/config.js` que entrega `SUPABASE_URL` y `SUPABASE_KEY`.
- `.env.example` **sin valores**.
- `entregas/dia-04/README.md` y las capturas.

## 8. Evidencias
- Una captura de cada sesión (2 usuarios), donde ninguno ve los productos del otro.
- Explicación de un SQL que aprobaste.
- La salida de `git status` y `git check-ignore .env`.

## 9. Rúbrica (100 puntos)
| Criterio | Qué debe verse | Puntos |
|---|---|---|
| Tabla y políticas | La tabla existe, tiene RLS activo y políticas para las 4 operaciones. | 25 |
| Aislamiento | Las capturas muestran que un usuario no ve los datos del otro. | 25 |
| Secretos | `.env` no está en el repositorio y no se usa la llave `service_role`. | 15 |
| Uso del MCP | Está limitado a tu proyecto y explicas un SQL que aprobaste. | 15 |
| Bitácora | Incluye prompts clave, un error de la IA, un comando aprobado o rechazado y cómo comprobaste el resultado. | 20 |

## 10. Criterios de aceptación (derivados de la rúbrica)
- [ ] Existe un proyecto Supabase `mini-inventario` y el MCP apunta solo a su `project_ref`.
- [ ] Las skills `supabase` y `supabase-postgres-best-practices` están instaladas.
- [ ] La tabla `productos` existe con RLS activo y políticas de `select`, `insert`, `update` y `delete` limitadas a `auth.uid() = user_id`.
- [ ] La web permite registro e inicio de sesión con correo y contraseña.
- [ ] `/config.js` entrega `SUPABASE_URL` y `SUPABASE_KEY` (publishable o anon). No se usa `service_role` en ninguna parte.
- [ ] `.env.example` existe sin valores; `git check-ignore .env` confirma que `.env` se ignora.
- [ ] Hay 2 capturas, una por usuario, que demuestran el aislamiento.
- [ ] La bitácora incluye los 4 elementos obligatorios.

## 11. Entrega final
"Enlace al pull request, con capturas y `entregas/dia-04/README.md`." Debe incluir:
- Los prompts clave que usaste.
- Un error o una mala decisión de la IA, y cómo lo detectaste.
- Un comando o herramienta que aprobaste o rechazaste, y por qué.
- Cómo comprobaste que funciona.

*Si te atoras:* si un usuario no ve ni sus propios datos, revisa que cada producto se guarde con su `user_id`.
*Si terminas antes:* agrega una búsqueda por nombre o SKU que respete las mismas políticas.

## 12. Notas del equipo (no oficiales)
| # | Nota |
|---|---|
| N-1 | **Dependencia:** el Día 3 (PR #9) debe estar integrado en `main`. ✅ Fusionado el 2026-11-24. |
| N-2 | La actividad menciona `public/productos.js` y `localStorage`, pero el Día 3 del equipo ya usa Supabase desde `public/app.js`. Se adapta ese archivo y se documenta la diferencia en la bitácora. |
| N-3 | **Cambios de requisitos del Día 4:** <br>• Registro público con correo y contraseña. Reemplaza la decisión D-1 del Día 2, "sin registro público". <br>• Política de `delete`. El Día 2 no la tenía. <br>Hay que actualizar `docs/requisitos.md` y `docs/diseno.md` en esta rama. |
| N-4 | Nombre de variable: el Día 3 usa `SUPABASE_ANON_KEY`; los Días 4 y 6 usan `SUPABASE_KEY`. Se adopta `SUPABASE_KEY`. |
| N-5 | Decisión vigente: SKU único por usuario **sin distinguir mayúsculas y minúsculas**, con un índice único en `(user_id, lower(sku))`. Reemplaza la D-3 del Día 2. |
| N-6 | Regla vigente: stock bajo = `cantidad < minimo`. |
| N-7 | Las skills requieren Node 22.20 o superior. ✅ Jose actualizó de v22.18.0 a v22.23.5. |
| N-8 | El SQL **solo se aplica con aprobación explícita** de Jose, después de leerlo completo (regla de `CLAUDE.md` y de la actividad). |
