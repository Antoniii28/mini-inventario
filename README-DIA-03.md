# Día 3 — Desarrollo de Mini Inventario

Equipo Pchifus · Jose Antonio Flores Cuamatzi y Luis Angel Osorio Galicia.

Este paquete contiene **archivos nuevos** preparados para incorporarse al repositorio `Antoniii28/mini-inventario` con el PR #8 ya fusionado a `main`. No reemplaza los documentos del Día 2.

## Requisitos
- Node.js 22 y npm.
- Proyecto Supabase con autenticación por correo/contraseña y tabla `productos` protegida con RLS.

## Instrucciones locales
1. Copia estos archivos nuevos al clon del repositorio **después** de actualizar `main` con el Día 2, en una rama `feature/dia-03-desarrollo`.
2. Ejecuta `npm install` (genera `package-lock.json`) y `cp .env.example .env`.
3. Edita `.env` usando `SUPABASE_URL` y **únicamente la clave pública `anon`** de Supabase. No coloques `service_role`.
4. En Supabase SQL Editor ejecuta `supabase/schema.sql` **solo si la tabla/políticas aún no existen**; antes de ejecutarlo verifica qué hay creado para evitar choques de políticas. No compartas claves o cuentas.
5. Crea al menos una cuenta de prueba en Supabase Auth (no hay registro público).
6. Ejecuta `npm test` y después `npm start`; abre `http://localhost:3000`.
7. Comprueba autenticación, registro, listado, edición y filtro de bajo mínimo. Para probar aislamiento RLS usa una segunda cuenta.

## Arquitectura
Express entrega `/` y recursos de `public/`, y genera `/config.js` con configuración pública. No maneja rutas de productos. El navegador utiliza Supabase Auth y consultas directas a `productos`; las políticas RLS aíslan los datos.

## Límites de verificación
Las pruebas automáticas locales cubren reglas de validación, ordenamiento y filtros. El navegador, Express y la integración real con Supabase requieren dependencias instaladas, configuración y cuentas de prueba. No se presentan como verificados sin ejecutar pruebas reales.
