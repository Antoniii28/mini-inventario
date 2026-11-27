# Día 10 · Resuelve un incidente de principio a fin

> Fuente oficial: [`actividad-dia-10.html`](actividad-dia-10.html) · [`actividad-dia-10.pdf`](actividad-dia-10.pdf).
> Las secciones 1 a 11 copian la actividad oficial. La sección 12 son **notas del equipo**.

| Dato | Valor |
|---|---|
| Duración oficial | 60 minutos |
| Modalidad oficial | **Individual** |
| Responsable asignado (equipo) | Jose Antonio · `Antoniii28` |
| Rama oficial | `dia-10-incidente` |

## 1. Objetivo
"Hoy das una vuelta completa al ciclo de vida: un reporte llega desde producción, lo investigas, escribes una prueba, lo corriges y verificas la solución publicada."

## 2. Requisitos previos
- La app publicada en Render.
- El MCP de Supabase, el MCP de Render, las pruebas y el CI funcionando.

## 3. Herramientas
Claude Code o Codex · Git, GitHub y `gh` · Supabase (plan Free) y su MCP · Render (instancia Free) y su MCP · playwright-cli · Playwright Test · GitHub Actions (gratis en repositorio público).

## 4. Instrucciones obligatorias
**Reporte recibido:** «Pude guardar un producto con cantidad -5. La lista lo muestra como si nada y el inventario queda mal.» *Si tu app ya lo bloquea, usa este reporte:* «Pude registrar dos productos con el mismo SKU».
1. **Lee el reporte (5 min):** abre la URL pública con un minuto de anticipación para despertar el servicio. **Escribe qué crees que ocurre antes de pedir ayuda.**
2. **Reproduce e investiga (10 min):** confirma el problema en producción y guarda la captura.
3. **Abre el issue (5 min):** pide crear el issue con `gh`. Debe incluir pasos para reproducir, causa y criterios de aceptación.
4. **Escribe primero la prueba (10 min):** en la rama `dia-10-incidente`, pide una prueba de Playwright que reproduzca el reporte. Córrela y guarda la evidencia de que falla.
5. **Corrige en la web y en la base (15 min):** la protección debe estar en ambos lugares. Revisa el SQL y qué ocurre con los datos incorrectos ya guardados.
6. **Publica y verifica (10 min):** abre el pull request que cierre el issue. Haz merge cuando el CI pase, espera el despliegue y repite el caso en la URL pública para confirmar que ya no ocurre.
7. **Cierra el ciclo (5 min):** escribe qué aprendió el sistema con este incidente y cuál sería el siguiente requisito. Anota también qué le delegarías a un agente y qué seguirías revisando tú.

## 5. Prompts oficiales
```text
Tenemos este reporte de producción: [pega el reporte]. Usa playwright-cli en la URL pública para reproducirlo y toma una captura. Revisa los logs recientes con el MCP de Render y consulta los datos con Supabase en solo lectura. Explica la causa. No cambies nada todavía.
```
```text
Corrige el issue validando el dato en la web y agregando una restricción en la base con una migración mediante el MCP de Supabase. Primero muéstrame cuántas filas incumplen la regla y propón qué hacer con ellas. Espera mi aprobación antes de modificar datos o aplicar el SQL. Después corre las pruebas.
```

## 6. Comandos
| Tema | Claude Code | Codex |
|---|---|---|
| Cuidar el contexto | `/context` para ver el uso, `/compact` para resumir y `/clear` para empezar de nuevo. | `/status`, `/compact` y `/new`. |

## 7. Archivos solicitados
- La prueba de Playwright que reproduce el reporte.
- La corrección en la web y la migración con la restricción en la base.
- `entregas/dia-10/README.md`.

## 8. Evidencias
- Captura de producción y causa respaldada por logs o datos.
- El issue con pasos, causa y criterios de aceptación.
- La prueba fallando antes de corregir y pasando después.
- El CI en verde y la URL pública rechazando el caso.

## 9. Rúbrica (100 puntos)
| Criterio | Qué debe verse | Puntos |
|---|---|---|
| Reproducción | Hay captura de producción y causa respaldada por logs o datos. | 15 |
| Issue | Incluye pasos, causa y criterios de aceptación. | 10 |
| Prueba | Muestras que falla antes de corregir y pasa después. | 20 |
| Corrección | Valida en la web y en la base, y explica qué pasó con las filas incorrectas. | 15 |
| Producción | El CI está en verde y la URL pública ya rechaza el caso. | 20 |
| Bitácora y cierre | Incluye la bitácora completa, el siguiente requisito y qué seguirías revisando. | 20 |

## 10. Criterios de aceptación (derivados de la rúbrica)
- [ ] Hipótesis personal escrita por Jose antes de investigar.
- [ ] Captura de la reproducción en la URL pública y causa respaldada por logs de Render o datos de Supabase.
- [ ] Issue creado con `gh` con pasos, causa y criterios.
- [ ] Prueba de Playwright en `dia-10-incidente` que falla antes de la corrección.
- [ ] Validación en la web y restricción en la base (migración aprobada); filas incorrectas tratadas y explicadas.
- [ ] PR que cierra el issue, CI en verde, despliegue y caso rechazado en la URL pública.
- [ ] Reflexión de cierre escrita por Jose.

## 11. Entrega final
"Enlaces al issue, al pull request y a la URL pública, con `entregas/dia-10/README.md`." Más los 4 elementos de la bitácora.
*Si te atoras:* si la restricción falla, probablemente aún existen filas incorrectas. Resuelve esas filas primero.
*Si terminas antes:* si usas Claude Code, crea un mod de barra de estado con la rama y los cambios pendientes.

## 12. Notas del equipo (no oficiales)
| # | Nota |
|---|---|
| N-1 | **Los dos reportes oficiales ya se bloquean** en la base desde el Día 4: `check (cantidad >= 0)` y el índice único `(user_id, lower(sku))`, además de la validación en la web. Antes de elegir, hay que comprobarlo en la URL pública y documentar las pruebas reales. |
| N-2 | No se quitan validaciones ni restricciones para "fabricar" el incidente. |
| N-3 | **Candidato real a revisar (sin confirmar en producción):** la base solo compara `lower(sku)`, sin quitar espacios. La web recorta los espacios, pero un cliente que llame directamente a la API con la llave publishable y una sesión válida podría guardar `"ARR-001 "` junto a `"ARR-001"`, y la lista mostraría dos productos con "el mismo SKU". Si se confirma, encaja con el segundo reporte oficial; si no, se consulta al profesor qué incidente usar. |
| N-4 | La hipótesis inicial y la reflexión final las escribe Jose; el agente solo ayuda a ordenarlas. |
| N-5 | Cualquier migración o cambio de datos: contar antes las filas afectadas, mostrar el SQL completo y esperar la aprobación de Jose. |
