# Prompt maestro · Luis Angel (`dosientos77-web`)

Copia el bloque en una conversación nueva de tu agente, abierta en la carpeta de tu clon del repositorio. Cambia `<DÍA>` por `5`, `6` o `7`.
Para el Día 7, los dos pedidos de «Escribe una prueba de Playwright para editar un producto» se hacen en **conversaciones limpias aparte**, sin este prompt.

```text
Trabajas en el repositorio Antoniii28/mini-inventario (equipo Pchifus). Soy Luis Angel Osorio Galicia (GitHub: dosientos77-web) y hoy hago la actividad oficial del Día <DÍA>.

Antes de actuar:
1. Ejecuta git fetch, git switch main y git pull --ff-only, y muéstrame git status y git log --oneline -5.
2. Lee completos: CLAUDE.md, docs/gestion/CONTEXTO_COMPARTIDO.md, docs/gestion/HANDOFF_LUIS.md, docs/gestion/PLAN_TRABAJO_DIAS_04_A_08.md y docs/actividades-oficiales/dia-0<DÍA>/GUIA.md (más el HTML o PDF original de esa carpeta).
3. Comprueba las dependencias del día en el plan (Día 5: Día 4 en main; Día 6: Día 5 en main; Día 7: Días 5 y 6 en main con el CI en verde). Si no se cumplen, detente y dime cuál falta.
4. Comprueba node --version (debe ser 22.20 o superior para las skills).

Reglas:
- Sigue la actividad oficial paso a paso; las "notas del equipo" de la guía son adaptaciones, no instrucciones del profesor.
- Trabaja en la rama oficial del día (dia-05-pruebas, dia-06-ci o dia-07-skill). Nunca hagas commit en main, ni force push, ni borres archivos sin mi autorización.
- Lee TEST_EMAIL, TEST_PASSWORD, SUPABASE_URL y SUPABASE_KEY del archivo .env sin mostrarlos. No me pidas ni escribas secretos en el chat. Los secretos de GitHub Actions los crea el propietario del repositorio (ver el bloqueo B4 del plan).
- Detente cuando yo deba hacer algo personalmente: elegir el problema real tras revisar las capturas, cambiar a mano la comparación de bajo mínimo, tomar capturas, aprobar el diagnóstico de CI, explicar con mis palabras, abrir conversaciones limpias.
- No modifiques archivos del Día 8 de Jose (mcp-inventario/**, entregas/dia-08/**).
- Las pruebas de Playwright usan un SKU único por prueba y borran lo que crean. Mantén funcionando npm test (pruebas del Día 3 con node --test).
- Usa git add con rutas explícitas. No subas .env ni capturas que muestren credenciales.
- Bitácora entregas/dia-0<DÍA>/README.md: prompts clave, un error o mala decisión real de la IA y cómo se detectó, un comando aprobado o rechazado y por qué, y cómo se comprobó. No inventes capturas, resultados ni aprobaciones; atribuye cada acción a quien la hizo.
- Al terminar: actualiza el estado en docs/gestion/PLAN_TRABAJO_DIAS_04_A_08.md y CONTEXTO_COMPARTIDO.md, completa entregas/dia-0<DÍA>/Pchifus_Evidencia_Dia_0<DÍA>.md con datos reales, haz push y abre el PR hacia main con revisor Antoniii28 y "Refs #11", "Refs #12" o "Refs #13". En el Día 6, el merge final lo hago yo después de la revisión de Jose; en los demás días no hagas merge.

Empieza por el paso 1 de "Antes de actuar" y dime qué necesitas de mí.
```
