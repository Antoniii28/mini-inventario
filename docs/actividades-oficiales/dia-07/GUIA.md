# Día 7 · Enséñale a tu agente cómo trabaja tu proyecto

> Fuente oficial: [`actividad-dia-07.html`](actividad-dia-07.html) · [`actividad-dia-07.pdf`](actividad-dia-07.pdf).
> Las secciones 1 a 11 copian la actividad oficial. La sección 12 son **notas del equipo**.

| Dato | Valor |
|---|---|
| Duración oficial | 60 minutos |
| Modalidad oficial | **Individual** |
| Responsable asignado (equipo) | Luis Angel · `dosientos77-web` |
| Rama oficial | `dia-07-skill` |

## 1. Objetivo
"Hoy escribes una skill con las reglas de pruebas y un subagente que revisa sin modificar. Vas a medir si realmente cambian el resultado."

## 2. Requisitos previos
- Las pruebas y el CI funcionando.

## 3. Herramientas
| Herramienta | Para qué sirve | Costo |
|---|---|---|
| Claude Code o Codex | El agente. | Codex viene en ChatGPT Free |
| Git y GitHub | Guardar versiones y publicar tu repositorio. | Gratis |
| GitHub CLI (gh) | Que el agente trabaje con GitHub desde la terminal. | Gratis |
| Playwright Test | Pruebas automáticas. | Gratis |

## 4. Instrucciones obligatorias
1. **Haz el pedido sin skill (10 min):**
   - Trabaja en la rama `dia-07-skill` y en una **conversación limpia**.
   - Pide: «Escribe una prueba de Playwright para editar un producto».
   - Guarda el código en tu bitácora y **descarta el archivo generado**.
2. **Escribe la skill (15 min):** crea la skill `pruebas-inventario` en la ruta de tu agente. Revísala y deja una descripción que indique cuándo usarla.
3. **Repite el mismo pedido (10 min):**
   - Abre una **conversación limpia** y pide exactamente lo mismo.
   - Compara con el primer resultado: qué mejoró, qué sigue mal y cuánto tuviste que corregir.
4. **Crea un subagente revisor (15 min):**
   - Debe llamarse `revisor-pr`, usar la ruta de tu agente y no modificar archivos.
   - Ejecútalo sobre esta rama y confirma con `git status` que no cambió nada.
5. **Entrega con evidencia (10 min):**
   - Atiende un hallazgo o explica por qué no aplica.
   - Abre el pull request con la skill, el subagente y tu comparación.

## 5. Prompts oficiales
```text
Escribe una prueba de Playwright para editar un producto
```
```text
Crea una skill llamada pruebas-inventario en la ruta correcta para este agente. Debe indicar: usar Playwright en tests/, leer credenciales del entorno, usar un SKU único por prueba, borrar lo creado, seleccionar elementos por rol o etiqueta, y cubrir el caso correcto y un caso de error. La descripción debe activarse cuando se pidan pruebas de Mini Inventario.
```
```text
Crea un subagente llamado revisor-pr en el formato correcto para este agente. Su trabajo es revisar git diff main en busca de secretos, cambios sin pruebas y consultas sin protección por usuario. Debe responder con una lista de hallazgos, archivo y gravedad. No debe modificar archivos ni ejecutar comandos que cambien el proyecto.
```

## 6. Rutas y comandos
| Tema | Claude Code | Codex |
|---|---|---|
| Skill | `.claude/skills/pruebas-inventario/SKILL.md` | `.agents/skills/pruebas-inventario/SKILL.md` |
| Subagente | `.claude/agents/revisor-pr.md`, con `name`, `description` y `tools` | `.codex/agents/revisor-pr.toml`, con `name`, `description` y `developer_instructions` |
| Invocarlos | «Usa el subagente revisor-pr». La skill se activa por su descripción. | `$pruebas-inventario` o `/skills`; subagentes con `/subagents` |

```bash
git status
```

## 7. Archivos solicitados
- La skill `pruebas-inventario` (`SKILL.md`) en la ruta del agente.
- El subagente `revisor-pr` en el formato del agente.
- `entregas/dia-07/README.md` con la comparación.

## 8. Evidencias
- El código de la prueba generada **sin** skill, guardado en la bitácora.
- El código generado **con** la skill y la comparación entre ambos.
- La salida del subagente con al menos un hallazgo (archivo y gravedad).
- `git status` sin cambios causados por el subagente.
- Cómo se atendió un hallazgo, o por qué no aplica.

## 9. Rúbrica (100 puntos)
| Criterio | Qué debe verse | Puntos |
|---|---|---|
| Skill | Está en la ruta correcta, tiene nombre y descripción, y sus reglas son concretas. | 25 |
| Comparación | Muestras diferencias específicas entre ambos resultados. | 20 |
| Subagente | Está en el formato correcto y sus instrucciones son de solo lectura. | 20 |
| Ejecución | Muestras un hallazgo y git status sin cambios causados por él. | 15 |
| Bitácora | Incluye prompts clave, un error de la IA, un comando aprobado o rechazado y cómo comprobaste el resultado. | 20 |

## 10. Criterios de aceptación
- [ ] Los dos pedidos se hicieron en **conversaciones limpias** distintas; el archivo del primero se descartó.
- [ ] `SKILL.md` con `name` y `description`, y las 6 reglas concretas del prompt.
- [ ] Subagente `revisor-pr` con herramientas de solo lectura (por ejemplo, sin `Edit` ni `Write`).
- [ ] Ejecución del subagente con un hallazgo y `git status` limpio después.
- [ ] Comparación específica (qué mejoró, qué sigue mal y cuánto se corrigió).

## 11. Entrega final
"Enlace al pull request, con la comparación en `entregas/dia-07/README.md`." Más los 4 elementos de la bitácora.
*Si te atoras:* si la skill no se activa, mejora su descripción con palabras parecidas a tu pedido.
*Si terminas antes:* agrega una automatización que formatee los archivos tras cada edición, si tu agente la admite, o empaqueta lo creado como plugin.

## 12. Notas del equipo (no oficiales)
| # | Nota |
|---|---|
| N-1 | **Dependencia:** los Días 5 y 6 integrados (pruebas y CI funcionando). |
| N-2 | Las "conversaciones limpias" las abre Luis personalmente. Un agente no puede simularlas dentro de la misma conversación. |
| N-3 | El "Si terminas antes" no es obligatorio. |
