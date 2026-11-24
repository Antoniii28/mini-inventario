# Día 6 · Automatiza las pruebas con GitHub Actions

> Fuente oficial: [`actividad-dia-06.html`](actividad-dia-06.html) · [`actividad-dia-06.pdf`](actividad-dia-06.pdf).
> Las secciones 1 a 11 copian la actividad oficial. La sección 12 son **notas del equipo**.

| Dato | Valor |
|---|---|
| Duración oficial | 60 minutos |
| Modalidad oficial | **Individual** |
| Responsable asignado (equipo) | Luis Angel · `dosientos77-web` |
| Rama oficial | `dia-06-ci` |

## 1. Objetivo
"Hoy logras que cada pull request se pruebe solo. También provocas una falla para que el agente la diagnostique desde la terminal."

## 2. Requisitos previos
- Las pruebas de Playwright en la rama principal.
- Tu repositorio debe seguir público.

## 3. Herramientas
| Herramienta | Para qué sirve | Costo |
|---|---|---|
| Claude Code o Codex | El agente. | Codex viene en ChatGPT Free |
| Git y GitHub | Guardar versiones y publicar tu repositorio. | Gratis |
| GitHub CLI (gh) | Que el agente trabaje con GitHub desde la terminal. | Gratis |
| GitHub Actions | Correr las pruebas en cada pull request. | Gratis en repositorio público |
| Playwright Test | Pruebas automáticas. | Gratis |
| Supabase (plan Free) | Base de datos e inicio de sesión. | Gratis |

## 4. Instrucciones obligatorias
1. **Crea la rama (5 min):** `dia-06-ci`, y confirma que `npx playwright test` pasa en tu computadora.
2. **Guarda los secretos (10 min):** "Ejecuta estos comandos tú mismo y escribe cada valor cuando te lo pida. **No pegues llaves ni contraseñas en la conversación con el agente.**"
3. **Crea el flujo de trabajo (15 min):** revisa que el archivo no contenga valores secretos escritos directamente.
4. **Pasa de verde a rojo y otra vez a verde (20 min):**
   - Espera a que el PR pase.
   - Sube un cambio que rompa una prueba y espera a que falle.
   - Toma captura de ambos estados y pide el diagnóstico **sin dar pistas**.
5. **Explica lo que pasó (10 min):** escribe en tu bitácora la causa de la falla **con tus palabras**. Después haz merge del PR.

## 5. Prompts oficiales
```text
Crea .github/workflows/ci.yml para que en cada pull request hacia main se ejecute en ubuntu-latest con Node 22: npm ci, instalación de Chromium con sus dependencias y las pruebas de Playwright. Pasa como variables de entorno los secretos SUPABASE_URL, SUPABASE_KEY, TEST_EMAIL y TEST_PASSWORD. Sube el reporte de Playwright como artefacto. Después abre un pull request con gh.
```
```text
Las verificaciones de este pull request fallaron. Usa gh pr checks, gh run list y gh run view con --log-failed para encontrar la causa. Explícamela antes de corregir. Cuando la apruebe, corrige, sube el cambio y comprueba que todo pase.
```

## 6. Comandos
```bash
gh secret set SUPABASE_URL
gh secret set SUPABASE_KEY
gh secret set TEST_EMAIL
gh secret set TEST_PASSWORD
gh secret list
npx playwright test
gh pr checks
gh run list
gh run view --log-failed
```

## 7. Archivos solicitados
- `.github/workflows/ci.yml`.
- `entregas/dia-06/README.md` y las capturas.

## 8. Evidencias
- Captura del PR en verde y del mismo PR en rojo (y otra vez en verde).
- Diagnóstico hecho por el agente con `gh`.
- Causa de la falla explicada con palabras del estudiante.
- `gh secret list` mostrando los **nombres** de los secretos, nunca sus valores.

## 9. Rúbrica (100 puntos)
| Criterio | Qué debe verse | Puntos |
|---|---|---|
| Flujo de CI | Se ejecuta en cada pull request hacia main. | 25 |
| Secretos | Están en GitHub y no aparecen en el código. | 15 |
| Rojo y verde | Muestras el mismo PR fallando y luego pasando. | 20 |
| Diagnóstico | El agente usó gh y explicas la causa con tus palabras. | 20 |
| Bitácora | Incluye prompts clave, un error de la IA, un comando aprobado o rechazado y cómo comprobaste el resultado. | 20 |

## 10. Criterios de aceptación
- [ ] `ci.yml` se dispara en `pull_request` hacia `main`, con `ubuntu-latest` y Node 22.
- [ ] Ejecuta `npm ci`, instala Chromium con sus dependencias y corre `npx playwright test`.
- [ ] Usa `${{ secrets.* }}`; no hay valores secretos en el archivo.
- [ ] El reporte de Playwright se sube como artefacto.
- [ ] El mismo PR aparece en verde, luego en rojo y luego en verde (con capturas).
- [ ] La bitácora explica la causa de la falla con palabras de Luis.
- [ ] El PR se fusiona al final; la actividad lo pide.

## 11. Entrega final
"Enlace al pull request, con capturas y `entregas/dia-06/README.md`." Más los 4 elementos de la bitácora.
*Si te atoras:* compara los nombres de los secretos y las variables, y revisa el reporte de Playwright.
*Si terminas antes:* protege `main` para que exija la verificación antes de hacer merge.

## 12. Notas del equipo (no oficiales)
| # | Nota |
|---|---|
| N-1 | **Dependencia:** el Día 5 debe estar integrado en `main` y sus pruebas deben pasar. |
| N-2 | **Bloqueo B4:** según la documentación de GitHub, en un repositorio de cuenta personal solo el **propietario** (`Antoniii28`) puede crear secretos de Actions. Luis tiene permiso `write`. Opciones: <br>(a) Jose ejecuta `gh secret set` en su terminal mientras Luis observa, y se documenta así. <br>(b) Se consulta al profesor. <br>🔎 Decisión pendiente; ver `PLAN_TRABAJO`. |
| N-3 | La protección de `main` del "si terminas antes" también requiere permisos de administrador (Jose). |
| N-4 | El `merge` del final lo pide la actividad. Aun así, `CLAUDE.md` exige revisión del otro integrante: Jose revisa antes de que Luis haga el merge. |
