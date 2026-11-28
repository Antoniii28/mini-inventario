# Bitácora — Día 9 · Docker, Render y diagnóstico de un despliegue fallido

**Equipo:** Pchifus  
**Responsable:** Jose Antonio Flores Cuamatzi (`Antoniii28`)  
**Rama:** `dia-09-render` (worktree `mini-inventario-dia09`) · **Pull Request:** _borrador_  
**Instrucciones oficiales:** [`docs/actividades-oficiales/dia-09/GUIA.md`](../../docs/actividades-oficiales/dia-09/GUIA.md)

> ⚠️ **BORRADOR.** Las secciones con ⏳ se completan solo con resultados reales.

## Objetivo
"Hoy empaquetas tu aplicación, la publicas en Render con una URL real y usas el MCP de Render para leer una falla como lo harías en producción." (actividad oficial)

## Avance verificado
| Paso | Quién | Resultado |
|---|---|---|
| `Dockerfile` y `.dockerignore` con el prompt oficial | Agente | ✅ `node:22.23.5-alpine`, `npm ci --omit=dev`, usuario `node` y `CMD ["node","server.js"]`, sin `.env` en la imagen |
| El servidor escucha en `0.0.0.0` y en `process.env.PORT` | Agente | ✅ Verificado sin Docker: `node server.js` sin `.env`, con las variables en el entorno y `PORT=10000` → escucha en `0.0.0.0:10000`; `/` 200; `/config.js` con llave publishable |
| `signUp` con `emailRedirectTo: window.location.origin` | Agente | ✅ La confirmación vuelve al mismo sitio (localhost o Render) |
| `npm test` | Agente | ✅ 13/13 |
| Plugin oficial de Render (`render@claude-plugins-official`) | Jose lo instaló y autorizó con OAuth; el agente revisó antes su `.mcp.json` y su *hook* | ✅ `/mcp` → "Signed in and connected to plugin:render:render" |
| `list_workspaces` y `list_services` con el MCP | Agente | ✅ Solo lectura. Espacio de trabajo "JoseAntonio's workspace"; solo existen `jafora-web` y `jafora-api` (no se tocaron); todavía no hay servicio `mini-inventario` |
| `.wslconfig` (`memory=2GB`, `processors=2`, `swap=4GB`) y `wsl --shutdown` | Jose lo autorizó; el agente comprobó que en Ubuntu no había trabajos activos | ✅ Docker Desktop arrancó (motor 29.8.2) con unos 0,7 GB libres de 7,6 GB |
| `docker build -t mini-inventario .` | Agente | ✅ Pasos `[1/6]` a `[6/6]` sin errores; imagen de 248 MB |
| Contenido de la imagen | Agente | ✅ `/app` = `server.js`, `public/`, `package*.json` y `node_modules`. Sin `.env`, `tests`, `entregas` ni `.git`. Usuario `node` (uid 1000). `node_modules/@playwright` es una carpeta vacía: `--omit=dev` funcionó |
| `docker run --env-file .env -e PORT=3000 -p 3000:3000 mini-inventario` | Agente | ✅ Log "Mini Inventario escuchando en http://0.0.0.0:3000"; `GET /` 200; `/config.js` solo con la URL oficial y la llave publishable (ninguna variable `TEST_*`) |
| `npx playwright test` contra el contenedor (`prueba2`) | Agente | ✅ **4 passed** (18.4 s) |
| Captura | Agente | ✅ [`capturas/01-contenedor-local.png`](capturas/01-contenedor-local.png): sesión de `prueba2` servida por el contenedor. Salida de los comandos en [`evidencias/docker-local.txt`](evidencias/docker-local.txt) |

## Explicación del Dockerfile
| Instrucción | Para qué |
|---|---|
| `FROM node:22.23.5-alpine` | Imagen oficial y ligera de Node 22, la misma versión que en desarrollo |
| `ENV NODE_ENV=production` | Express y npm trabajan en modo producción |
| `WORKDIR /app` | Carpeta de trabajo dentro del contenedor |
| `COPY package.json package-lock.json ./` | Primero los manifiestos, para reutilizar la capa de dependencias si no cambian |
| `RUN npm ci --omit=dev && npm cache clean --force` | Instala las versiones exactas del lockfile, sin Playwright ni otras herramientas de desarrollo |
| `COPY server.js ./` y `COPY public ./public` | Solo lo necesario para ejecutar; nunca `.env` |
| `USER node` | No ejecutar como root |
| `EXPOSE 3000` | Puerto de referencia para la prueba local; Render inyecta su propio `PORT` (10000) |
| `CMD ["node", "server.js"]` | Arranca sin `--env-file`: las variables llegan de `docker run --env-file` o del panel de Render |

## Error o mala decisión de la IA (en revisión)
- **Falsa alarma revisada antes de reportar:** una búsqueda rápida dentro de la imagen encontró "playwright" en `node_modules` y pareció que `--omit=dev` había fallado. Antes de dar el resultado, el agente revisó el lockfile (los paquetes de Playwright tienen `dev=true`) y el tamaño de la carpeta: `@playwright` está vacía (4 KB). La conclusión correcta es que Playwright **no** está en la imagen.

## Pendiente
1. ⏳ PR listo; se fusiona cuando exista el CI del Día 6 y pase (decisión de Jose).
3. ⏳ Servicio Render `mini-inventario` (Web Service, Docker, Free, Auto-Deploy *On Commit*) creado por Jose en el panel, con `SUPABASE_URL` y `SUPABASE_KEY` publishable.
4. ⏳ URL pública en *Authentication → URL Configuration* de Supabase; inicio de sesión en la URL pública y captura.
5. ⏳ Falla con `RUN npm run no-existe` (PR aparte, autorizado), diagnóstico con el MCP, reparación y nueva verificación.
