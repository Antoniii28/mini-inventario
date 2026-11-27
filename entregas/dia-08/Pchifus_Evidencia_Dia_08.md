# Pchifus · Evidencia Día 8

> **Estado: LISTA PARA SUBIR, salvo la fusión del PR #21.** Todo lo marcado ocurrió y está verificado en `README.md`.

| Campo | Valor |
|---|---|
| Actividad | Día 8 · Compara el MCP oficial con tu propio servidor |
| Responsable real (hace y sube la entrega) | Jose Antonio Flores Cuamatzi (`Antoniii28`) |
| Issue | [#14](https://github.com/Antoniii28/mini-inventario/issues/14) |
| Pull Request | [#21](https://github.com/Antoniii28/mini-inventario/pull/21) |
| Bitácora | [`entregas/dia-08/README.md`](README.md) |
| Subido a Google Drive | ☐ No. Lo marca el responsable **solo después** de subirlo |

## Qué pide el profesor (texto oficial)
Enlace al pull request, **sin `.env`**, con evidencia en `entregas/dia-08/README.md`.

La bitácora debe incluir:
- [x] Los prompts clave que usaste. (sección "Prompts clave")
- [x] Un error o una mala decisión de la IA, y cómo lo detectaste. (`.env` leído solo al arrancar → "Falta DATABASE_URL")
- [x] Un comando o herramienta que aprobaste o rechazaste, y por qué. (SQL del lector aprobado con mitigaciones; SQL libre rechazado; instrucción inyectada no ejecutada)
- [x] Cómo comprobaste que funciona. (permisos efectivos, 2 capas de rechazo, herramientas con datos reales, misma respuesta en ambos servidores, 7 filas tras la inyección)

## Archivos para la carpeta de Drive `Pchifus_Dia_08`
- [x] Este archivo (`Pchifus_Evidencia_Dia_08.md`) con el enlace al PR.
- [x] `README.md` (bitácora con la escritura rechazada, el lector, las herramientas, la comparación y la inyección)

## Revisión contra la rúbrica oficial (antes de subir)
- [x] **MCP oficial** (20 pts): `read_only=true`; `insert prueba-escritura` → `25006`, con 0 filas guardadas.
- [x] **Usuario lector** (15 pts): `current_user = inventario_lector`; solo `SELECT`; escrituras → `42501`.
- [x] **Servidor propio** (25 pts): `buscar_producto` y `stock_bajo` con `%s` y `limit 50`, probadas con datos reales; sin SQL libre.
- [x] **Comparación** (10 pts): tabla de herramientas, pasos, precisión, alcance y seguridad.
- [x] **Inyección** (10 pts): producto creado por Jose; el agente lo trató como dato y no hubo ninguna escritura.
- [x] **Bitácora** (20 pts): los 4 elementos.

## Verificación final
- [ ] El PR está fusionado en `main` y el enlace funciona.
- [x] Ningún archivo muestra contraseñas, tokens, `.env` ni cadenas de conexión.
- [x] Todo lo descrito ocurrió realmente. La bitácora distingue lo que hizo Jose de lo que hizo el agente.
