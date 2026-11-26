# Prompt maestro · Jose Antonio (`Antoniii28`)

Copia el bloque en una conversación nueva de tu agente, abierta en la carpeta del repositorio. Cambia `<DÍA>` por `8` (el Día 4 está en el PR #16).

```text
Trabajas en el repositorio Antoniii28/mini-inventario (equipo Pchifus). Soy Jose Antonio Flores Cuamatzi (GitHub: Antoniii28) y hoy hago la actividad oficial del Día <DÍA>.

Antes de actuar:
1. Ejecuta git fetch, git switch main y git pull --ff-only, y muéstrame git status y git log --oneline -5.
2. Lee completos: CLAUDE.md, docs/gestion/CONTEXTO_COMPARTIDO.md, docs/gestion/HANDOFF_JOSE.md, docs/gestion/PLAN_TRABAJO_DIAS_04_A_08.md y docs/actividades-oficiales/dia-0<DÍA>/GUIA.md (más el HTML o PDF original de esa carpeta).
3. Comprueba las dependencias del día en el plan. Si no se cumplen, detente y dime cuál falta.

Reglas:
- Sigue la actividad oficial paso a paso; las "notas del equipo" de la guía son adaptaciones, no instrucciones del profesor.
- Trabaja en la rama oficial del día (dia-04-supabase o dia-08-mcp). Nunca hagas commit en main, ni force push, ni borres archivos sin mi autorización.
- Usa solo el proyecto Supabase oficial (ref snefrzzosulngvootger); no crees otros proyectos.
- No me pidas ni escribas secretos en el chat. Usa solo la llave publishable o anon en el navegador. Nunca uses service_role.
- Muéstrame el SQL completo y espera mi aprobación explícita antes de aplicar cualquier migración o consulta que modifique la base de datos.
- Detente cuando yo deba hacer algo personalmente (crear el proyecto, autorizar un MCP en el navegador, crear usuarios, ejecutar SQL en el editor, tomar capturas, rechazar una escritura).
- Para el Día 8: el MCP oficial va en solo lectura; mis herramientas no aceptan SQL libre ni escriben; analiza el alcance de la política lector_ve_productos (using true) y usa solo datos de prueba.
- Usa git add con rutas explícitas. No subas material-profesor/ ni actividad-dia-* de la raíz.
- Bitácora entregas/dia-0<DÍA>/README.md: prompts clave, un error o mala decisión real de la IA y cómo se detectó, un comando aprobado o rechazado y por qué, y cómo se comprobó. No inventes capturas, resultados ni aprobaciones; atribuye cada acción a quien la hizo.
- Al terminar: actualiza el estado en docs/gestion/PLAN_TRABAJO_DIAS_04_A_08.md y CONTEXTO_COMPARTIDO.md, completa entregas/dia-0<DÍA>/Pchifus_Evidencia_Dia_0<DÍA>.md con datos reales, haz push y abre el PR hacia main con revisor dosientos77-web y "Refs #10" (Día 4) o "Refs #14" (Día 8). No hagas merge.

Empieza por el paso 1 de "Antes de actuar" y dime qué necesitas de mí.
```
