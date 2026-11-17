# Requisitos — Mini Inventario

Aplicación web para que el personal de un establecimiento de comida inicie sesión, registre los productos de su inventario (ingredientes, bebidas, desechables, etc.) con **nombre, SKU, cantidad y cantidad mínima**, y vea cuáles están **por debajo del mínimo** para reabastecerlos a tiempo.

## Alcance

- Cada persona usuaria ve y modifica **solo sus propios productos**.
- Un producto tiene: `nombre`, `sku`, `cantidad` y `minimo`. El sistema agrega `id`, `user_id` y `created_at`.
- Fuera de alcance por ahora: proveedores, precios, caducidades, recetas, varias sucursales y roles.

## Historias de usuario

### HU-01 · Iniciar y cerrar sesión
**Como** encargado del establecimiento, **quiero** iniciar sesión con mi correo y contraseña, **para** que solo yo pueda ver y modificar mi inventario.

Criterios de aceptación:
- [ ] Sin sesión iniciada, la página solo muestra el formulario de inicio de sesión; no se ve ningún producto.
- [ ] Con correo y contraseña correctos, se muestra la pantalla del inventario.
- [ ] Con datos incorrectos, aparece el mensaje "Correo o contraseña incorrectos" y no se entra.
- [ ] Al pulsar "Cerrar sesión" se vuelve al formulario de inicio de sesión y, al recargar la página, sigue sin sesión.

### HU-02 · Registrar un producto
**Como** encargado, **quiero** registrar un producto con nombre, SKU, cantidad y cantidad mínima, **para** llevar el control de lo que tengo en almacén.

Criterios de aceptación:
- [ ] El formulario pide nombre, SKU, cantidad y cantidad mínima; los cuatro son obligatorios.
- [ ] Cantidad y cantidad mínima solo aceptan números enteros mayores o iguales a 0.
- [ ] Si intento guardar con un campo vacío o inválido, se muestra qué campo está mal y no se guarda nada.
- [ ] Al guardar un producto válido, aparece en mi lista sin recargar la página.
- [ ] No puedo registrar dos productos con el mismo SKU en mi inventario; se muestra el mensaje "Ya tienes un producto con ese SKU".
- [ ] Otra cuenta sí puede usar un SKU que yo ya usé (el SKU es único por usuario).

### HU-03 · Ver mis productos
**Como** encargado, **quiero** ver la lista de mis productos, **para** saber qué hay en el inventario.

Criterios de aceptación:
- [ ] La lista muestra nombre, SKU, cantidad y cantidad mínima de cada producto.
- [ ] Solo aparecen los productos registrados por la persona con la sesión iniciada; otra cuenta no los ve.
- [ ] Los productos se ordenan por nombre, de la A a la Z.
- [ ] Si no tengo productos, se muestra el mensaje "Aún no hay productos registrados".

### HU-04 · Actualizar la cantidad de un producto
**Como** encargado, **quiero** cambiar la cantidad y la cantidad mínima de un producto, **para** reflejar entradas, salidas y nuevos niveles de reorden.

Criterios de aceptación:
- [ ] Desde la lista puedo editar la cantidad y la cantidad mínima de un producto.
- [ ] Solo se aceptan números enteros mayores o iguales a 0; si no, se muestra un error y no se guarda.
- [ ] Al guardar, la lista muestra los valores nuevos sin recargar la página.
- [ ] No puedo modificar productos de otra cuenta.

### HU-05 · Ver productos por debajo del mínimo
**Como** encargado, **quiero** ver qué productos están por debajo de su cantidad mínima, **para** saber qué debo pedir.

Criterios de aceptación:
- [ ] Un producto está "por debajo del mínimo" cuando su cantidad es **menor** que su cantidad mínima (por ejemplo, cantidad 4 y mínimo 5 sí; cantidad 5 y mínimo 5 no).
- [ ] Hay un filtro "Solo bajo mínimo" que muestra únicamente esos productos.
- [ ] En la lista completa, esos productos se distinguen visualmente (por ejemplo, con la etiqueta "Bajo mínimo").
- [ ] Al actualizar la cantidad de un producto a un valor igual o mayor que su mínimo, deja de aparecer como bajo mínimo sin recargar la página.

## Decisiones pendientes de revisión

El agente propuso estas decisiones. **Jose Antonio debe confirmarlas o cambiarlas**; todavía no las ha revisado.

| # | Pregunta | Propuesta del agente |
|---|---|---|
| D-1 | ¿Cómo se crean las cuentas? El enunciado solo habla de "iniciar sesión". | No incluir registro público: las cuentas se crean desde el panel de Supabase. Así se mantienen las 5 historias. |
| D-2 | ¿Un producto con cantidad **igual** al mínimo está "bajo mínimo"? | No: se usa `cantidad < minimo`, como dice el enunciado ("por debajo del mínimo"). |
| D-3 | ¿El SKU distingue mayúsculas y minúsculas (`har-001` y `HAR-001`)? | Sí, por ahora se tratan como distintos; no se agrega normalización. |
