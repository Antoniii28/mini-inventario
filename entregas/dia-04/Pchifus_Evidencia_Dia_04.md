# Pchifus · Evidencia Día 4

> **Estado: ENTREGADO.** PR #16 fusionado en `main` el 27/11/2026 (`3524021`, aprobado por Luis). Carpeta subida a Drive por Jose el 27/11/2026.

| Campo | Valor |
|---|---|
| Actividad | Día 4 · Conecta datos reales e inicio de sesión con Supabase |
| Responsable real (hace y sube la entrega) | Jose Antonio Flores Cuamatzi (`Antoniii28`) |
| Issue | [#10](https://github.com/Antoniii28/mini-inventario/issues/10) |
| Pull Request | [#16](https://github.com/Antoniii28/mini-inventario/pull/16) |
| Bitácora | [`entregas/dia-04/README.md`](README.md) |
| Proyecto Supabase | `mini-inventario` (ref `snefrzzosulngvootger`), organización `Pchifus-Jose` |
| Subido a Google Drive | ☑ Sí, confirmado por Jose el 27/11/2026: [Dia 4 - Mini Inventario](https://drive.google.com/drive/folders/1-2oOgVLFxT0y6G4c3lKfQkGciYth_8_V), dentro de [Equipo-PChifus](https://drive.google.com/drive/folders/1J9en4MIlL_VQNVOLTgt5q7tbEHxnMAC7) |

## Qué pide el profesor (texto oficial)
Enlace al pull request, con capturas y `entregas/dia-04/README.md`.

La bitácora debe incluir:
- [x] Los prompts clave que usaste. (sección "Prompts clave")
- [x] Un error o una mala decisión de la IA, y cómo lo detectaste. (3 casos: `GRANT` faltante, prueba RLS con escrituras y mensaje de registro; más 2 malas decisiones asociadas: cupo de correos y caducidad del enlace)
- [x] Un comando o herramienta que aprobaste o rechazaste, y por qué. (prueba RLS **rechazada**; 2 migraciones aprobadas)
- [x] Cómo comprobaste que funciona. (13 pruebas unitarias, 27 comprobaciones en navegador real, registro con correo real confirmado y verificación de solo lectura en la base de datos)

## Archivos para la carpeta de Drive `Pchifus_Dia_04`
- [x] Este archivo (`Pchifus_Evidencia_Dia_04.md`) con el enlace al PR.
- [x] `README.md` (bitácora)
- [x] `capturas/01-usuario-1.png`: sesión del usuario 1 (solo ve sus 3 productos)
- [x] `capturas/02-usuario-2.png`: sesión del usuario 2 (solo ve sus 2 productos)
- [x] `capturas/03-registro-cuenta-nueva.png`: cuenta registrada desde la web y confirmada por correo (solo ve su producto; correo difuminado)

## Revisión contra la rúbrica oficial (antes de subir)
- [x] **Tabla y políticas** (25 pts): la tabla existe, RLS = `true` y hay 4 políticas (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) verificadas en `pg_policies`.
- [x] **Aislamiento** (25 pts): las 3 capturas, más la verificación en la BD: las 4 cuentas ven 0 productos ajenos.
- [x] **Secretos** (15 pts): `git check-ignore -v .env` → `.gitignore:17`. `.env` tiene 0 commits en el historial y no se usa `service_role`; el servidor rechaza esas llaves.
- [x] **Uso del MCP** (15 pts): `.mcp.json` con `project_ref=snefrzzosulngvootger` y explicación de la política `update` aprobada.
- [x] **Bitácora** (20 pts): prompts, errores de la IA, comando rechazado y pruebas.

## Verificación final
- [x] El PR está fusionado en `main` y el enlace funciona: https://github.com/Antoniii28/mini-inventario/pull/16
- [x] Ningún archivo o captura muestra contraseñas, tokens, `.env` ni cadenas de conexión.
- [x] Todo lo descrito ocurrió realmente. La bitácora distingue lo que hizo Jose personalmente de lo que hizo el agente.
