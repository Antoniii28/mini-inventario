# Handoff · Jose Antonio (`Antoniii28`)

> Punto de reanudación: **27/11/2026**, antes de reiniciar el equipo para liberar memoria para Docker (Día 9).

## Estado de las actividades de Jose
| Día | Estado | Dónde |
|---|---|---|
| 4 · Supabase | **Completado y entregado** (PR #16 `3524021`; Drive confirmado por Jose el 27/11) | [Carpeta Drive Día 4](https://drive.google.com/drive/folders/1-2oOgVLFxT0y6G4c3lKfQkGciYth_8_V) |
| 8 · MCP | **En revisión**: [PR #21](https://github.com/Antoniii28/mini-inventario/pull/21). Todo verificado; falta la aprobación de Luis, la fusión y Drive | Worktree `C:\Users\josea\Documents\mini-inventario-dia08`, rama `dia-08-mcp` |
| 9 · Docker y Render | **En progreso**: [PR #20](https://github.com/Antoniii28/mini-inventario/pull/20) en borrador | Worktree `C:\Users\josea\Documents\mini-inventario-dia09`, rama `dia-09-render` |
| 10 · Incidente | **Bloqueado**: los 2 reportes oficiales ya están bloqueados; esperando la respuesta del profesor | `docs/actividades-oficiales/dia-10/GUIA.md` (en el PR #20) |

Carpeta oficial del equipo en Drive: [Equipo-PChifus](https://drive.google.com/drive/folders/1J9en4MIlL_VQNVOLTgt5q7tbEHxnMAC7). Cada día va en su propia subcarpeta.

## Autorizaciones vigentes (dadas por Jose)
- Fusionar los **PR #21 y #19** cuando Luis los apruebe, siempre que las pruebas pasen y no haya conflictos. Después, preparar la carpeta del Día 8 para Drive (en `C:\Users\josea\Documents\Entregas-Drive-Pchifus\`).
- Drive: el agente prepara las carpetas y Jose sube los archivos (no hay integración oficial con Drive en Claude Code). Un día se marca "entregado" solo cuando Jose lo confirma.
- Render: usar la cuenta de Jose para un servicio nuevo `mini-inventario` en el **plan Free**. **No tocar `jafora-web` ni `jafora-api`.** No cambiar variables de entorno desde el MCP.

## Retomar después del reinicio (en este orden)
1. **Memoria:** comprobar que haya unos 2 GB libres. Arrancar Docker Desktop y esperar `docker version` con servidor.
2. **Día 9, contenedor**, en `mini-inventario-dia09`:
   - `docker build -t mini-inventario .`
   - `docker run --env-file C:\Users\josea\Documents\mini-inventario\.env -e PORT=3000 -p 3000:3000 mini-inventario`
   - Captura de la app en `localhost:3000` con el contenedor en marcha.
   - Detener el contenedor. Antes, cerrar el `npm start` de la ventana de Jose si ocupa el puerto 3000.
3. **Día 9, PR #20:** quitar el borrador y fusionar cuando el CI esté en verde (llega con el Día 6 de Luis) y Jose lo autorice.
4. **Día 9, Render** (Jose en el panel):
   - *New → Web Service* con `mini-inventario`, *Language: Docker*, plan Free, rama `main` y Auto-Deploy *On Commit*.
   - Variables `SUPABASE_URL` y `SUPABASE_KEY` (publishable).
   - Agregar la URL pública en Supabase, en *Authentication → URL Configuration*.
5. **Día 9, falla controlada:** PR con `RUN npm run no-existe`, diagnóstico con el MCP de Render (`list_deploys` y `list_logs`), PR de reparación y verificación de la URL.
6. **Día 10:** con la respuesta del profesor, reproducir en la URL pública, issue, prueba roja, corrección (web y migración aprobada), PR, producción y reflexión de Jose.

## Datos técnicos que no hay que repetir
- **Supabase oficial (DT-8):** `snefrzzosulngvootger`, organización `Pchifus-Jose`.
- **Usuarios:**
  - `prueba1`: datos del Día 4 y del Día 8, más el producto de inyección `INY-001`.
  - `prueba2`: pruebas automáticas y secretos de Actions.
  - La cuenta real de Jose, confirmada en el Día 4, tiene 1 producto.
- **`inventario_lector`:** ya creado, con 3 mitigaciones. `DATABASE_URL` está en `mini-inventario-dia08\mcp-inventario\.env`, que se ignora.
- **MCP registrados:** `supabase` (escritura, con aprobación manual), `supabase-lectura` (`read_only=true`), `inventario` (FastMCP) y `plugin:render:render` (OAuth).
- **Secretos de Actions:** existen los 4 desde el 27/11 (`prueba2`). No se vuelven a crear.
- **Estado del código:** Día 4 y Día 5 en `main`. Issue #18 (bitácora del Día 5) asignado a Luis.

## Proyecto Supabase oficial (DT-8)
`mini-inventario` · ref `snefrzzosulngvootger` · organización `Pchifus-Jose`. Jose es el propietario: autoriza los MCP, aprueba el SQL y gestiona los usuarios. Implicaciones por día: `docs/diseno.md` § "Proyecto Supabase oficial".
