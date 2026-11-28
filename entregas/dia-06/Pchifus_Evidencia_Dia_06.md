# Pchifus · Evidencia Día 6

> **Estado: EN REVISIÓN.** Datos reales al 27/11/2026. Falta la causa con las palabras de Luis (README §6), la revisión y el merge de José, y la subida a Drive.

| Campo | Valor |
|---|---|
| Actividad | Día 6 · Automatiza las pruebas con GitHub Actions |
| Responsable real (hace y sube la entrega) | Luis Angel Osorio Galicia (`dosientos77-web`) |
| Issue | [#12](https://github.com/Antoniii28/mini-inventario/issues/12) |
| Pull Request | [#23](https://github.com/Antoniii28/mini-inventario/pull/23) |
| Bitácora | [`entregas/dia-06/README.md`](README.md) |
| Subido a Google Drive | ☐ No. Lo marca el responsable **solo después** de subirlo |

## Qué pide el profesor (texto oficial)
Enlace al pull request, con capturas y `entregas/dia-06/README.md`.

La bitácora debe incluir:
- [x] Los prompts clave que usaste (README §9).
- [x] Un error o una mala decisión de la IA, y cómo lo detectaste (README §7).
- [x] Un comando o herramienta que aprobaste o rechazaste, y por qué (README §8).
- [x] Cómo comprobaste que funciona (README §10).

## Archivos para la carpeta de Drive `Pchifus_Dia_06`
- [x] Este archivo (`Pchifus_Evidencia_Dia_06.md`) con el enlace al PR.
- [ ] `README.md` (bitácora con la causa de la falla explicada por Luis). Falta la sección 6
- [x] Captura del PR en verde: `capturas/01-verde.png` y `01-verde-run.png`
- [x] Captura del mismo PR en rojo: `capturas/02-rojo.png` y `02-rojo-run.png`
- [x] Captura del mismo PR en verde otra vez: `capturas/03-verde.png` y `03-verde-run.png`
- [x] Registros de `gh` (`evidencias/ci-1-verde.txt`, `ci-2-rojo.txt` y `ci-3-verde.txt`) y el reporte final (`reporte-playwright/index.html`)

## Revisión contra la rúbrica oficial (antes de subir)
- [x] **Flujo de CI** (25 pts): `pull_request` hacia `main`, `ubuntu-latest`, Node 22, `npm ci`, Chromium, pruebas y artefacto.
- [x] **Secretos** (15 pts): 4 secretos en GitHub, ninguno en el código. Incidente del artefacto corregido (README §7); falta cambiar la contraseña.
- [x] **Rojo y verde** (20 pts): PR #23, ejecuciones 46092041998 ✅, 46092373479 ❌ y 46092826256 ✅.
- [ ] **Diagnóstico** (20 pts): el agente usó `gh` (✅); **falta** la explicación con tus palabras (README §6).
- [x] **Bitácora** (20 pts): prompts, errores de la IA, comandos aprobados y rechazados, y comprobación.

## Verificación final
- [ ] El PR está fusionado en `main` y el enlace funciona.
- [x] Ningún archivo o captura del repositorio muestra contraseñas, tokens, `.env` ni cadenas de conexión (el artefacto con la traza se borró).
- [ ] Todo lo descrito ocurrió realmente y lo hizo el responsable indicado.
