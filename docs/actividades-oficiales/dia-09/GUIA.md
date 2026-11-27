# Día 9 · Publica tu app y diagnostica un despliegue fallido

> Fuente oficial: [`actividad-dia-09.html`](actividad-dia-09.html) · [`actividad-dia-09.pdf`](actividad-dia-09.pdf).
> Las secciones 1 a 11 copian la actividad oficial. La sección 12 son **notas del equipo**.

| Dato | Valor |
|---|---|
| Duración oficial | 60 minutos |
| Modalidad oficial | **Individual** |
| Responsable asignado (equipo) | Jose Antonio · `Antoniii28` |
| Rama del equipo | `dia-09-render` (la actividad no fija un nombre) |

## 1. Objetivo
"Hoy empaquetas tu aplicación, la publicas en Render con una URL real y usas el MCP de Render para leer una falla como lo harías en producción."

## 2. Requisitos previos
- La rama principal con pruebas en verde.
- Una cuenta gratuita de Render.
- Docker instalado y en ejecución.

## 3. Herramientas
| Herramienta | Para qué sirve | Costo |
|---|---|---|
| Claude Code o Codex | El agente con el que haces toda la actividad. | Codex viene en ChatGPT Free |
| Git, GitHub y `gh` | Versiones y trabajo con GitHub desde la terminal. | Gratis |
| Docker | Empaquetar la app en un contenedor. | Docker Desktop es gratis para uso personal y educativo |
| Render (instancia Free) | Publicar la web en internet. | Gratis, 750 h al mes |
| MCP de Render | Que el agente consulte despliegues y logs. | Gratis |
| Supabase (plan Free) | Base de datos PostgreSQL e inicio de sesión. | Gratis, 2 proyectos activos |
| playwright-cli | Que el agente abra tu app, la use y tome capturas. | Gratis |

## 4. Instrucciones obligatorias
1. **Prueba el contenedor en local (15 min):** crea el Dockerfile en una rama, pruébalo, abre el PR y haz merge cuando el CI pase.
2. **Crea el servicio en Render (15 min):** *New* → *Web Service*. Conecta tu repositorio, elige *Language: Docker* y el plan *Free*. Agrega `SUPABASE_URL` y `SUPABASE_KEY` y deja *Auto-Deploy* en *On Commit*. Inicia sesión en la URL pública y toma una captura.
3. **Conecta el MCP de Render (5 min):** sigue la sección de tu agente en la documentación del MCP de Render. No cambies variables de entorno desde el MCP: hazlo en el panel y aprueba cada despliegue manualmente.
4. **Provoca y diagnostica una falla (20 min):** agrega a `main` una línea `RUN npm run no-existe` en el Dockerfile y espera el despliegue fallido. Pide el diagnóstico. Si el MCP no conecta, lee los logs en el panel y documenta el error de conexión.
5. **Repara y verifica (5 min):** quita la línea, espera el despliegue correcto y comprueba la URL con el agente. Guarda la evidencia en `entregas/dia-09/`.

## 5. Prompts oficiales
```text
Crea un Dockerfile para Mini Inventario y un .dockerignore que excluya .env, node_modules, tests y entregas. La app debe escuchar en 0.0.0.0 y en process.env.PORT. No copies secretos a la imagen. Explícame cada instrucción.
```
```text
Usa el MCP de Render para listar el último despliegue de mi servicio y leer sus logs. Explícame la causa exacta de la falla y qué línea la provocó. No cambies variables ni lances despliegues sin preguntarme.
```

## 6. Comandos
```bash
docker build -t mini-inventario .
docker run --env-file .env -e PORT=3000 -p 3000:3000 mini-inventario
```
| Tema | Claude Code | Codex |
|---|---|---|
| Configurar Render | Instala el plugin oficial de Render o agrega el servidor con `claude mcp add`, siguiendo la documentación. | Usa la opción de Codex de la documentación oficial y comprueba con `codex mcp list`. |

## 7. Archivos solicitados
- `Dockerfile` y `.dockerignore`.
- `entregas/dia-09/README.md` con capturas.

## 8. Evidencias
- La imagen funcionando localmente con `docker run`.
- La URL pública que abre e inicia sesión.
- `.dockerignore` que excluye `.env`; las llaves están en el panel.
- La causa encontrada con el MCP (o los logs y el error de conexión).

## 9. Rúbrica (100 puntos)
| Criterio | Qué debe verse | Puntos |
|---|---|---|
| Contenedor | La imagen funciona localmente con `docker run`. | 20 |
| Publicación | La URL pública abre e inicia sesión correctamente. | 25 |
| Secretos | `.dockerignore` excluye `.env` y las llaves están en el panel. | 10 |
| Diagnóstico | Muestras la causa encontrada con el MCP, o los logs y el error de conexión. | 25 |
| Bitácora | Incluye prompts clave, un error de la IA, un comando aprobado o rechazado y cómo comprobaste el resultado. | 20 |

## 10. Criterios de aceptación (derivados de la rúbrica)
- [ ] `docker build` y `docker run` funcionan y la app responde en `localhost:3000`.
- [ ] `.dockerignore` excluye `.env`, `node_modules`, `tests` y `entregas`; la imagen no contiene secretos.
- [ ] Servicio Render (Docker, Free) con `SUPABASE_URL` y `SUPABASE_KEY` en el panel y Auto-Deploy *On Commit*.
- [ ] La URL pública abre e inicia sesión; hay captura.
- [ ] Despliegue fallido con `RUN npm run no-existe` y diagnóstico con el MCP (o logs y error de conexión).
- [ ] Despliegue reparado y URL comprobada; evidencia en `entregas/dia-09/`.

## 11. Entrega final
"URL pública y `entregas/dia-09/README.md` con capturas." Más los 4 elementos de la bitácora.
*Si te atoras:* el servicio se duerme tras 15 minutos sin tráfico y tarda cerca de un minuto en despertar. Render asigna el puerto 10000 de forma predeterminada.
*Si terminas antes:* agrega una verificación de salud con la ruta `/health` en la configuración del servicio.

## 12. Notas del equipo (no oficiales)
| # | Nota |
|---|---|
| N-1 | **Dependencia:** el Día 4 (PR #16) en `main`. La rama `dia-09-render` parte de `dia-04-supabase` y se sincroniza con `main` antes del PR. |
| N-2 | **"Agrega a `main` una línea":** las reglas del equipo prohíben los commits directos a `main`. La falla se introduce con un PR pequeño (aprobado y fusionado con autorización) y se repara con otro PR. |
| N-3 | `npm start` usa `node --env-file=.env`; dentro del contenedor no hay `.env`, así que el `CMD` es `node server.js` y las variables llegan de `docker run --env-file` o del panel de Render. |
| N-4 | Supabase Auth: hay que agregar la URL pública de Render en *Authentication → URL Configuration* (Site URL / Redirect URLs) para que los enlaces de confirmación lleguen a producción. `signUp` usa `emailRedirectTo: window.location.origin`. |
| N-5 | **Memoria:** Docker Desktop necesita unos 2 GB libres; la computadora de Jose tiene 7.6 GB y suele quedar con menos de 1 GB. Cerrar programas antes de arrancarlo. |
| N-6 | Ninguna llave `service_role`/`sb_secret_` en Render: `server.js` se niega a arrancar con ellas. |
