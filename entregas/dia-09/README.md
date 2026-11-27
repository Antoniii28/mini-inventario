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

## Pendiente
1. ⏳ `docker build` y `docker run` (hace falta liberar memoria para Docker Desktop) y captura del contenedor funcionando.
2. ⏳ PR listo para revisión y merge cuando el CI pase (el CI llega con el Día 6).
3. ⏳ Servicio Render `mini-inventario` (Web Service, Docker, Free, Auto-Deploy *On Commit*) creado por Jose en el panel, con `SUPABASE_URL` y `SUPABASE_KEY` publishable.
4. ⏳ URL pública en *Authentication → URL Configuration* de Supabase; inicio de sesión en la URL pública y captura.
5. ⏳ Falla con `RUN npm run no-existe` (PR aparte, autorizado), diagnóstico con el MCP, reparación y nueva verificación.
