# Bitácora — Día 4 · Datos reales e inicio de sesión con Supabase

**Equipo:** Pchifus  
**Responsable:** Jose Antonio Flores Cuamatzi (`Antoniii28`)  
**Rama:** `dia-04-supabase` · **Issue:** #10 · **Pull Request:** [#16](https://github.com/Antoniii28/mini-inventario/pull/16)  
**Fechas:** 24 y 25 de noviembre de 2026  
**Instrucciones oficiales:** `docs/actividades-oficiales/dia-04/` (PR #15)

## Objetivo
"Hoy reemplazas el almacenamiento temporal por una base de datos real. El agente trabaja mediante el MCP de Supabase y tú apruebas cada cambio." (actividad oficial)

## Quién hizo qué
| Jose Antonio, personalmente | Agente (Claude Code), con la aprobación de Jose |
|---|---|
| Creó la organización `Pchifus-Jose` y el proyecto `mini-inventario` (ref `snefrzzosulngvootger`) | Revisó el PR #9 e instaló dependencias y skills |
| Aprobó el servidor MCP y lo autenticó en el navegador (`/mcp`) | Escribió la migración y los cambios de la web y las pruebas |
| Leyó y **aprobó** el SQL de la tabla; **rechazó** la prueba RLS con escrituras; aprobó la revocación | Aplicó las migraciones aprobadas mediante el MCP |
| Creó los 2 usuarios confirmados y escribió la llave publishable y las contraseñas en `.env` | Ejecutó las pruebas reales en Microsoft Edge (Playwright) y tomó las 3 capturas |
| Dio su correo de Supabase en `.env` (`TEST_SIGNUP_EMAIL`, sin mostrarlo) y **pulsó el enlace de confirmación** del registro. Revisa y aprueba el PR y sube la entrega a Drive | Registró la cuenta desde la web, verificó la confirmación, el inicio de sesión y el aislamiento, y redactó esta bitácora |

## Punto de partida
- El Día 3 (PR #9, merge `c0abc7d`) ya tenía en `public/app.js` el código de Supabase (sesión, alta, consulta y edición). Su conexión real **no se había probado**, según la bitácora del Día 3; se probó por primera vez en este día.
- La actividad oficial menciona `public/productos.js` y `localStorage`. Este proyecto no tiene ese archivo: **se adaptó `public/app.js`**, sin rehacer el Día 3.

## Prompts clave
1. Prompt oficial de base de datos: "Usa el MCP de Supabase solo en este proyecto y sigue las skills supabase y supabase-postgres-best-practices. Crea una migración con la tabla productos según docs/diseno.md. Activa Row Level Security y crea políticas para que cada usuario solo pueda leer, crear, editar y borrar sus propios productos. Muéstrame el SQL antes de aplicarlo."
2. Prompt oficial de la web: "Cambia public/productos.js para usar Supabase en lugar de localStorage. Agrega registro e inicio de sesión con correo y contraseña. Lee SUPABASE_URL y SUPABASE_KEY del archivo .env y entrégalas al navegador desde la ruta /config.js. Usa solo la llave publishable o anon, nunca la service_role. Crea un .env.example sin valores."
3. Prompt de ejecución de Jose: auditoría, migración "mostrar el SQL y esperar mi aprobación", web, pruebas y PR.
4. Después del rechazo: "Muéstrame el SQL completo de la prueba RLS y verifica que únicamente afecte datos de prueba, que utilice una transacción con ROLLBACK y que no elimine datos existentes. Continúa con una alternativa no destructiva si es posible."
5. "Realiza tú las pruebas funcionales del Día 4 utilizando un navegador real […] Si necesitas las contraseñas, permite que las introduzca de forma segura."
6. Observaciones de la revisión de Luis: "Establece el proyecto mini-inventario […] como la base de datos compartida oficial" y "Comprueba el registro de una nueva cuenta desde la interfaz web utilizando un correo válido […] No desactives la confirmación por correo ni debilites las políticas de seguridad".

## MCP limitado al proyecto
`.mcp.json`, creado con el comando oficial `claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=snefrzzosulngvootger"`:
```json
{ "mcpServers": { "supabase": { "type": "http", "url": "https://mcp.supabase.com/mcp?project_ref=snefrzzosulngvootger" } } }
```
- `get_project_url` devolvió `https://snefrzzosulngvootger.supabase.co`. Es el único proyecto al que apunta el MCP.
- La aprobación sigue siendo manual: no hay reglas `allow` para `mcp__supabase__*`, así que Claude Code pidió confirmación en cada operación. Una de ellas se rechazó (ver más abajo).
- Skills oficiales instaladas en `.claude/skills/`: `supabase` y `supabase-postgres-best-practices` (Node v22.23.5 ≥ 22.20).

## Cambios realizados
| Archivo | Cambio |
|---|---|
| `supabase/migrations/20261125060419_crear_productos.sql` | Tabla `productos`, índice único `(user_id, lower(sku))`, RLS, `GRANT` a `authenticated` y 4 políticas. |
| `supabase/migrations/20261125061725_revocar_privilegios_innecesarios.sql` | Retira `TRUNCATE`, `TRIGGER` y `REFERENCES` a `anon` y `authenticated`. |
| `supabase/schema.sql` | Marcado como histórico (Día 3); no se borró. |
| `server.js` | `SUPABASE_ANON_KEY` → `SUPABASE_KEY`. No arranca si la llave es `sb_secret_...` o una JWT `service_role`. |
| `public/app.js` | `window.SUPABASE_KEY`; botón **Crear cuenta** con `auth.signUp`; `supabase-js` fijado en `2.119.2`. |
| `public/index.html` | Botón "Crear cuenta", mensaje informativo y favicon vacío (quita un 404). |
| `public/logic.mjs` | `validateCredentials` y `friendlyAuthError`. |
| `tests/logic.test.mjs`, `tests/server.test.mjs` | De 7 a 13 pruebas unitarias. |
| `.env.example` | Sin valores: `SUPABASE_URL=`, `SUPABASE_KEY=`, `PORT=`, `TEST_EMAIL=` y `TEST_PASSWORD=`. |
| `docs/requisitos.md`, `docs/diseno.md`, `README.md` | Decisiones D-1 a D-4, registro, SKU sin distinguir mayúsculas, 4 políticas, proyecto Supabase oficial y configuración local. |
| `.mcp.json`, `.claude/skills/`, `skills-lock.json` | MCP del proyecto y skills oficiales. |

## Decisiones
| Decisión | Motivo |
|---|---|
| Proyecto propio de Jose y no el de Luis | La actividad es individual: "crea tu proyecto" y "conecta el MCP solo a tu proyecto". |
| Ese proyecto es la **base de datos oficial y compartida** del equipo para los Días 4 a 8 (decisión de Jose, 25/11) | Un solo esquema verificado para todos. Implicaciones por día en `docs/diseno.md` § "Proyecto Supabase oficial". `pchifus.prueba1` queda reservado (evidencia del Día 4 y datos del Día 8) y `pchifus.prueba2` es para las pruebas automáticas. |
| Adaptar `public/app.js` | El Día 3 ya funciona con Supabase; la actividad supone un `localStorage` que no existe aquí. |
| SKU único sin distinguir mayúsculas | Decisión de Jose; reemplaza la D-3 del Día 2. |
| Política de `delete` sin botón de borrar | La actividad pide políticas para las 4 operaciones; ninguna historia pide borrar desde la web. |
| `GRANT` solo a `authenticated` y revocación del resto | Mínimo privilegio: `anon` queda sin ningún permiso sobre la tabla. |
| El servidor bloquea llaves secretas | Aunque se pegue la llave equivocada en `.env`, no llega al navegador. |

## SQL aprobado y su explicación
Jose leyó el SQL completo y lo aprobó. El agente lo aplicó con `apply_migration`, y la versión remota quedó como `20261125060419 crear_productos`. Explicación de la política de `update`:
```sql
create policy "productos_update_propios" on public.productos
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
```
- `to authenticated`: solo aplica a usuarios con sesión.
- `using`: solo se pueden *elegir* para editar las filas propias; las de otra cuenta son invisibles.
- `with check`: la fila editada debe seguir siendo propia. Sin esta línea, alguien podría cambiar el `user_id` y "regalar" su producto a otra cuenta.
- `(select auth.uid())`: Postgres calcula el usuario una vez por consulta y no una vez por fila (skill `supabase-postgres-best-practices`).

Verificación posterior (consulta de catálogo con `execute_sql`): RLS `true`; políticas `SELECT`, `INSERT`, `UPDATE` y `DELETE`, todas `to authenticated` con `(select auth.uid()) = user_id`; índice `productos_user_id_sku_ci_key (user_id, lower(sku))`. Tras la revocación, los permisos quedaron así: `authenticated` = `DELETE, INSERT, SELECT, UPDATE`; `anon` = ninguno.

## Errores o malas decisiones de la IA
1. **Faltaba el `GRANT` en el SQL de la tabla.** El SQL del diseño del Día 2, propuesto por la IA, y el `schema.sql` del Día 3 no daban permisos al rol `authenticated`.
   - **Cómo se detectó:** la skill `supabase` exige revisar el changelog. Ahí aparece el cambio incompatible del 2026-04-28, "Tables not exposed to Data and GraphQL API automatically", que aplica por defecto a los proyectos nuevos desde el 2026-05-30. Sin el `GRANT`, la web habría fallado con `42501`.
   - **Corrección:** se agregó el `GRANT` antes de aplicar la migración.
2. **La prueba de RLS escribía datos sin avisarlo claramente.** El agente propuso un bloque con `INSERT`, `UPDATE` y `DELETE` que se deshacía con `raise exception` en lugar de un `ROLLBACK` visible.
   - **Cómo se detectó:** Supabase mostró una advertencia de operaciones destructivas, Jose **rechazó** la operación y pidió el SQL completo.
   - **Corrección:** el agente explicó que solo tocaba la fila creada en la misma transacción y la reemplazó por una verificación **de solo lectura** (`set local transaction_read_only = on`, sin escrituras).
3. **El mensaje de error del registro era inútil.** En la prueba real, `Crear cuenta` con `pchifus.prueba3@example.com` mostró "No fue posible completar la operación".
   - **Cómo se detectó:** los logs de Auth (`query_logs`) mostraron `400 email_address_invalid`: Supabase no acepta correos `@example.com`.
   - **Corrección:** se agregó ese código, y `email_address_not_authorized`, a `friendlyAuthError`, con su prueba unitaria. La reverificación muestra "Supabase no acepta ese correo; usa una dirección real".
   - **Mala decisión asociada (caducidad del enlace):** el agente le dijo a Jose que el enlace de confirmación "caduca a las 24 horas" sin comprobar la configuración del proyecto. Jose lo pulsó unas 9,5 horas después del reenvío y Supabase respondió `email link has expired` (`otp_expired`). **Cómo se detectó:** los logs de Auth no mostraban ningún uso previo del enlace, así que la expiración es más corta que 9,5 h (el valor por defecto, *Email OTP Expiration*, es de 1 hora). En el siguiente reenvío se le pidió pulsarlo de inmediato, y la confirmación llegó a los 6 minutos.
   - **Mala decisión asociada (cupo de correos):** el agente intentó dos registros con un correo ficticio sin revisar antes la documentación del correo por defecto. Ese servicio solo entrega a miembros de la organización y permite 2 correos por hora. Los dos intentos (06:24 y 06:25 UTC) agotaron el cupo, y el registro con un correo real recibió `429 Demasiados intentos` a las 07:02 UTC. Se esperó a que se liberara el límite **sin cambiar la configuración de Auth**.

## Comandos y herramientas aprobados o rechazados
- **Rechazado por Jose:** `execute_sql` con la prueba RLS que hacía `INSERT`, `UPDATE` y `DELETE` dentro de una transacción. Motivo: Supabase advirtió operaciones destructivas y no se veía un `ROLLBACK` explícito. Se sustituyó por una consulta de solo lectura.
- **Aprobados por Jose:** `apply_migration` de `crear_productos` (después de leer el SQL) y de `revocar_privilegios_innecesarios`.
- **Aprobado:** `npx skills add supabase/agent-skills --skill supabase supabase-postgres-best-practices -a claude-code -y`. Antes de usarlas se comprobó que solo instalan Markdown (40 archivos, sin scripts), porque el instalador advierte que se ejecutan "with full agent permissions".

## Pruebas realizadas y resultados
### Pruebas automáticas locales (agente)
| Prueba | Resultado |
|---|---|
| `npm test` (Node v22.23.5) | ✅ 13/13 |
| Servidor con una llave `sb_secret_...` | ✅ no arranca y sale con código 1 |
| `GET /config.js` con el `.env` real | ✅ solo `SUPABASE_URL` y una llave `sb_publishable_` (46 caracteres) |

### Prueba funcional en navegador real (agente, 25/11/2026)
Microsoft Edge sin ventana, controlado con Playwright desde un script **temporal fuera del repositorio**. No son las pruebas permanentes del Día 5, que corresponden a Luis. Las contraseñas se leyeron de `.env` sin imprimirse. Resultado: **26/27 en la primera corrida**. La comprobación que falló es la de "sin errores de consola"; se explica abajo y se corrigió.

| # | Comprobación | Resultado |
|---|---|---|
| 1 | Sin sesión solo se ve el inicio de sesión | ✅ |
| 2 | Contraseña incorrecta → "Correo o contraseña incorrectos" y no entra | ✅ |
| 3 | Usuario 1 inicia sesión y empieza sin productos | ✅ |
| 4 | Formulario vacío → error en los 4 campos; no guarda | ✅ |
| 5 | Cantidad `-1` y mínimo `2.5` → rechazados | ✅ |
| 6 | Registra Arroz blanco (10/5), Aceite (2/5) y Refresco (1/6) sin recargar | ✅ |
| 7 | Aceite y Refresco → "Bajo mínimo"; contadores 3 y 2 | ✅ |
| 8 | SKU `arr-001` (minúsculas) → "Ya tienes un producto con ese SKU" | ✅ |
| 9 | Orden A-Z | ✅ |
| 10 | Editar Aceite a 5/5 → "En orden"; a `abc` → rechazado; a 2/5 → "Bajo mínimo" | ✅ |
| 11 | Filtro "Solo bajo mínimo" → solo Aceite y Refresco | ✅ |
| 12 | Recargar (F5) → siguen la sesión y los 3 productos | ✅ |
| 13 | Cerrar sesión y recargar → sigue sin sesión | ✅ |
| 14 | **Usuario 2 no ve ningún producto del usuario 1** | ✅ |
| 15 | Usuario 2 registra Tortillas (3/10) y Arroz con el **mismo SKU `ARR-001`** | ✅ |
| 16 | **Usuario 1, al volver, sigue viendo solo sus 3 productos** | ✅ |
| 17 | Registro con contraseña de 3 caracteres → "al menos 6 caracteres" | ✅ |
| 18 | Registro de `pchifus.prueba3@example.com` | ⚠️ Supabase responde `email_address_invalid`; el mensaje se corrigió (error 3). El registro completo con un correo real está en la sección siguiente |
| 19 | Errores de consola | ⚠️ 400 (contraseña incorrecta y registro) y 409 (SKU duplicado) son las respuestas esperadas de las pruebas negativas; el 404 era `favicon.ico` y se corrigió. La reverificación da "ninguno" al cargar la página. |

### Verificación en la base de datos (agente, solo lectura, mediante el MCP)
```
Datos reales: u1 tiene 3, u2 tiene 2;
Sesión u1 ve: propios 3, ajenos 0;
Sesión u2 ve: propios 2, ajenos 0;
Sin sesión (anon): 42501 permiso denegado
```
También desde la Data API sin sesión: `GET /rest/v1/productos` → `401`, `42501 permission denied for table productos`.

### Límites conocidos
- **Registro con correo real:** completado el 27/11 (ver la sección "Registro con correo real"). Las 2 cuentas de la actividad se crearon confirmadas desde el panel, como indica la instrucción oficial.
- **Avisos del asesor de seguridad que no vienen de esta migración:**
  - `public.rls_auto_enable()`, `SECURITY DEFINER`, creada por la plataforma con el proyecto.
  - "Leaked Password Protection Disabled", un ajuste de Auth.
  
  No se tocaron. El asesor de rendimiento no reporta nada.
- **A 1280 px, la columna "Acciones" queda cortada** por el scroll horizontal de la tabla. Viene del Día 3; se deja para la revisión visual del Día 5.

### Registro con correo real (27/11/2026)
El correo es el de la cuenta de Supabase de Jose, porque el correo por defecto solo entrega a miembros de la organización. Se leyó de `.env` (`TEST_SIGNUP_EMAIL`) y **no aparece** en el repositorio: en la captura 3 se difuminó solo ese campo. La contraseña de la cuenta es aleatoria y está solo en `.env`.

| # | Paso | Quién | Resultado real |
|---|---|---|---|
| 1 | "Crear cuenta" en la web (25/11, 07:29 UTC) | Agente | "Si el correo es válido, recibirás un enlace…"; cuenta creada **sin confirmar**; sin confirmar no entra al inventario |
| 2 | Reenvío (26/11, 21:08 UTC) y enlace pulsado tarde | Agente / Jose | Logs de Auth (`/verify`): **"email link has expired"** (27/11, 06:39 y 07:05 UTC), que se ve como `otp_expired`. No hubo ningún `/verify` antes: el enlace no lo consumió un escáner. A la vez, `ERR_CONNECTION_REFUSED`: el servidor local estaba detenido |
| 3 | Reenvío desde la web (27/11, 07:34:45 UTC), con la app en marcha | Agente | Mismo mensaje; `confirmation_sent_at` actualizado |
| 4 | Enlace pulsado a los 6 minutos | Jose | Redirigió a `http://localhost:3000/#` y entró al panel con 0 productos |
| 5 | Comprobación en `auth.users` (solo lectura) | Agente | `email_confirmed_at` = 27/11 07:40:57 UTC ✅ |
| 6 | Inicio de sesión con correo y contraseña, en Edge | Agente | ✅ entra; **0 productos ajenos**; registra "Sal de mesa" con el SKU `ARR-001`, que otras cuentas ya usan; cierra sesión |
| 7 | Aislamiento de las 4 cuentas en la BD (solo lectura) | Agente | cuenta registrada: propios 1, ajenos 0 · prueba1: 3 y 0 · prueba2: 2 y 0 |

No se desactivó la confirmación por correo ni se confirmó la cuenta de forma administrativa.

## Secretos
```
$ git check-ignore -v .env
.gitignore:17:.env	.env
```
- `.env` nunca aparece en el historial (`git log --all -- .env` → 0 commits). `.env.example` no tiene valores.
- `service_role` y `sb_secret_` solo aparecen en `server.js`, como el bloqueo que rechaza esas llaves.
- Las capturas se tomaron con la sesión iniciada; no muestran contraseñas ni llaves.

`git status` después del push del PR: `On branch dia-04-supabase` · `Your branch is up to date with 'origin/dia-04-supabase'`; los únicos archivos sin seguimiento son material local del profesor, ignorado o no incluido.

## Capturas
| Archivo | Qué demuestra |
|---|---|
| [`capturas/01-usuario-1.png`](capturas/01-usuario-1.png) | Sesión `pchifus.prueba1@example.com`: Aceite, Arroz blanco y Refresco (2 bajo mínimo). |
| [`capturas/03-registro-cuenta-nueva.png`](capturas/03-registro-cuenta-nueva.png) | Cuenta creada desde "Crear cuenta" y confirmada por correo: solo ve su producto "Sal de mesa" (`ARR-001`). El correo está difuminado. |
| [`capturas/02-usuario-2.png`](capturas/02-usuario-2.png) | Sesión `pchifus.prueba2@example.com`: solo Arroz y Tortillas. No aparece ninguno de los productos del usuario 1, aunque ambos usan el SKU `ARR-001`. |

## Para el Día 5 (Luis)
- Proyecto oficial `snefrzzosulngvootger`. Jose le comparte **por canal privado** la llave publishable y la contraseña de `pchifus.prueba2@example.com` (`TEST_EMAIL` / `TEST_PASSWORD`).
- `.env` de Luis: `SUPABASE_URL`, `SUPABASE_KEY`, `TEST_EMAIL` y `TEST_PASSWORD` (ver `.env.example`), sin subirlo nunca.
- Los 3 productos de `pchifus.prueba1` son la evidencia del Día 4 y los datos del Día 8: no se tocan. Las pruebas del Día 5 crean SKU únicos y borran solo lo que crean; la política de `delete` ya existe.
