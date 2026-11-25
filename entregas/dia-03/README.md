# Bitácora — Día 3 · Desarrollo de la aplicación

**Equipo:** Pchifus  
**Responsable:** Luis Angel Osorio Galicia  
**Repositorio:** https://github.com/Antoniii28/mini-inventario  
**Dependencia:** PR #8 (Día 2) fusionado a `main` el 17 de noviembre de 2026.
**Rama prevista:** `feature/dia-03-desarrollo` (la integración en GitHub se realiza desde el clon local del equipo).

## Avance realizado
- Servidor Node.js 22 / Express: estáticos y `/config.js` (configuración pública).
- Interfaz accesible y adaptable para inicio de sesión, registro y consulta de productos.
- Lógica de Supabase Auth, insertar, listar y editar productos desde el navegador.
- Filtro y etiqueta de existencias bajas siguiendo `cantidad < minimo`.
- Validación de campos, mensajes de errores y manejo de SKU duplicado.
- Esquema SQL de referencia con RLS para separar productos por usuario.
- Pruebas unitarias de validación, filtro y ordenamiento.

## Evidencia reproducible
- 17/11/2026: `npm test` en Node.js 22.16.0 → **7 pruebas correctas, 0 fallidas**.
- 17/11/2026: `node --check server.js`, `node --check public/app.js`, `node --check public/logic.mjs` → sin errores.
- Aún no se ejecutó el servidor Express ni se conectó la app con Supabase: faltan dependencias y configuración del entorno de prueba.

## Evidencia y limitaciones
La ejecución de `npm test` valida funciones puras del navegador. Sin acceso a las credenciales de prueba y a un proyecto Supabase, no se puede certificar un flujo integrado de registro ni las políticas RLS. La instalación de dependencias y el arranque HTTP deben confirmarse al disponer de internet/npm.

## Lista de pruebas manuales pendientes
1. Sin sesión, solo se ve inicio de sesión; autenticación correcta e incorrecta.
2. Registrar producto válido, observarlo sin recargar y bloquear SKU duplicado.
3. Probar cantidades inválidas, vacías, decimales y negativas.
4. Probar productos de dos cuentas diferentes para confirmar separación por RLS.
5. Editar cantidad y mínimo; filtrar y quitar etiqueta cuando cantidad alcanza el mínimo.
6. Cerrar sesión y recargar: el inventario no se muestra.

## Política de equipo
No subir `.env`, no usar claves `service_role`, no fusionar sin revisión y no cambiar directamente `main`.
