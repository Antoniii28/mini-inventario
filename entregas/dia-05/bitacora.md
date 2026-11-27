# Bitácora — Día 5

**Proyecto:** Mini Inventario
**Equipo:** Pchifus
**Fechas:** 25 y 26 de noviembre de 2026
**Actividad:** Pruebas y mejoras con Playwright

## 1. Preparación del entorno

Se preparó la rama de trabajo `dia-05-pruebas`
utilizando como base el avance del Día 4.

Se verificó el funcionamiento de Node.js, Express
y la conexión con Supabase.

Se instaló Playwright Test y el navegador Chromium.

## 2. Exploración de la aplicación

Se utilizó Playwright CLI para explorar la interfaz
en las siguientes resoluciones:

- Escritorio: 1280 x 800 píxeles.
- Móvil: 390 x 844 píxeles.

Se tomaron capturas como evidencia.

En la consulta inicial de consola se registraron
0 errores y 0 advertencias.

## 3. Problemas identificados

Se observaron dos problemas de presentación:

- En escritorio, la columna "Acciones" de la tabla
  no se visualizaba completamente sin desplazamiento.
- En móvil, algunos elementos del formulario
  se desbordaban horizontalmente.

## 4. Corrección realizada

Se modificó `public/styles.css` para mejorar
el comportamiento responsivo del formulario.

La corrección permitió mostrar completos los
campos "Cantidad" y "Cantidad mínima", así como
el botón "Registrar producto".

La revisión de la tabla en escritorio se documentó
como observación pendiente.

## 5. Pruebas automatizadas

Se crearon cuatro pruebas con Playwright Test:

1. Inicio de sesión exitoso.
2. Rechazo de contraseña incorrecta.
3. Registro de un producto.
4. Detección de existencias bajas.

Se usó la cuenta de prueba 2.

Los productos temporales tuvieron SKU únicos
y se implementó su eliminación al finalizar
las pruebas, sin modificar productos ajenos.

**Primera ejecución conjunta:**
4 pruebas aprobadas en 14.8 segundos.

## 6. Demostración rojo-verde

Se modificó temporalmente la comparación de
existencias bajas, cambiando `<` por `<=`.

**Prueba roja:**
Playwright detectó el error y reportó 1 fallo.

**Restauración:**
El archivo `public/logic.mjs` se restauró
automáticamente a su contenido original.

**Prueba verde:**
Se ejecutó nuevamente la suite completa,
con 4 pruebas aprobadas en 10.0 segundos.

Se guardaron los registros y la captura del fallo.

## 7. Organización de evidencias

Se almacenaron las capturas en
`entregas/dia-05/capturas/`.

Se almacenaron los resultados en
`entregas/dia-05/evidencias/`.

Se actualizó `.gitignore` para excluir archivos
temporales, sesiones y trazas de Playwright.

## 8. Resultado y pendientes

Resultados obtenidos:
- Cuatro pruebas automatizadas aprobadas.
- Demostración rojo-verde completada.
- Formulario móvil corregido y verificado.
- Evidencias y reporte elaborados.

Pendientes:
- Revisar la presentación de la tabla en escritorio.
- Preparar commit y Pull Request del Día 5.
- Integrar los cambios con la rama principal
  cuando los avances anteriores estén incorporados.
