# Mini Inventario · imagen de producción (Día 9)
# Imagen base oficial de Node.js 22, fijada a la misma versión que se usa en desarrollo.
FROM node:22.23.5-alpine

# Modo producción: Express y npm omiten herramientas de desarrollo.
ENV NODE_ENV=production

# Carpeta de trabajo dentro del contenedor.
WORKDIR /app

# Primero solo los manifiestos: si no cambian, Docker reutiliza la capa de dependencias.
COPY package.json package-lock.json ./

# Instala exactamente las versiones del lockfile, sin dependencias de desarrollo (Playwright).
RUN npm ci --omit=dev && npm cache clean --force

# Copia solo lo que la app necesita para ejecutarse. Nunca se copia .env (también lo excluye .dockerignore).
COPY server.js ./
COPY public ./public

# No ejecutar como root: el usuario "node" ya existe en la imagen oficial.
USER node

# Puerto de referencia para pruebas locales; Render inyecta su propio PORT (10000 por defecto).
EXPOSE 3000

# Arranca sin --env-file: las variables llegan del entorno (docker run --env-file o el panel de Render).
CMD ["node", "server.js"]
