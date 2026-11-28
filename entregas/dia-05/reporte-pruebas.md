# Día 5 — Reporte de pruebas con Playwright

**Proyecto:** Mini Inventario
**Equipo:** Pchifus
**Periodo de ejecución:** 25 y 26 de noviembre de 2026

## 1. Objetivo

Evaluar el funcionamiento de Mini Inventario mediante
pruebas exploratorias y automatizadas con Playwright,
identificar problemas de usabilidad y verificar las
correcciones realizadas.

## 2. Herramientas utilizadas

- Node.js 22
- Express
- Supabase
- Playwright CLI
- Playwright Test
- Chromium

## 3. Exploración de la interfaz

Se realizaron capturas en dos resoluciones:

- Escritorio: 1280 x 800 píxeles.
- Móvil: 390 x 844 píxeles.

Durante la exploración se identificaron problemas
de visualización en la interfaz:

1. En escritorio, la columna "Acciones" de la tabla
   aparece parcialmente recortada.
2. En móvil, el formulario de registro presentaba
   desbordamiento horizontal.

Se modificaron los estilos responsivos en
`public/styles.css` para adaptar el formulario móvil.

La captura posterior permitió verificar que los
campos "Cantidad" y "Cantidad mínima", así como el
botón "Registrar producto", aparecen completos.

El problema de la tabla de escritorio queda registrado
como observación pendiente de revisión.

## 4. Revisión de consola

En la revisión inicial mediante Playwright CLI se obtuvo:

- Errores: 0
- Advertencias: 0

Este resultado corresponde a la sesión explorada
al momento de consultar la consola.

## 5. Pruebas automatizadas

Se implementaron cuatro pruebas con Playwright Test:

| Prueba | Resultado |
|---|---|
| Inicio de sesión correcto | Aprobada |
| Contraseña incorrecta | Aprobada |
| Registro de producto | Aprobada |
| Alerta de existencias bajas | Aprobada |

Las pruebas usan la cuenta de prueba 2 y generan
identificadores SKU únicos para los productos temporales.

Los productos creados durante las pruebas se eliminan
mediante operaciones limitadas a sus propios SKU.

**Resultado de ejecución conjunta:**
4 pruebas aprobadas en 10.0 segundos.

## 6. Demostración rojo-verde

Se introdujo temporalmente un error en la función
`isLowStock`, sustituyendo la comparación `<` por `<=`.

Con este cambio, un producto con cantidad igual a
su mínimo fue clasificado incorrectamente como
"Bajo mínimo".

**Fase roja:**
Playwright detectó el error y reportó 1 prueba fallida.

**Restauración:**
En este primer intento, un script recuperó
automáticamente `public/logic.mjs`.

> Actualización 27/11: la demostración se repitió con el
> cambio y la restauración hechos **a mano** por Luis
> (1 failed → 4 passed). Ver `README.md`, sección 4.

**Fase verde:**
Se ejecutaron nuevamente las cuatro pruebas,
obteniendo 4 aprobadas.

Esto demuestra que las pruebas permiten detectar
regresiones en la lógica de existencias bajas.

## 7. Evidencias

Capturas:
- `capturas/escritorio-1280x800.png`
- `capturas/movil-390x844.png`
- `capturas/movil-corregido-390x844.png`

Resultados:
- `evidencias/prueba-roja.txt`
- `evidencias/fallo-rojo.png`
- `evidencias/prueba-verde.txt`
- `evidencias/prueba-roja-manual.txt` (27/11, cambio a mano)
- `evidencias/prueba-verde-manual.txt` (27/11, restauración a mano)

La traza de la prueba fallida se conserva localmente
y no se incluye en GitHub por precaución.

## 8. Conclusión

Se completó la exploración inicial de la aplicación,
se corrigió y verificó un problema del formulario móvil,
se implementaron cuatro pruebas automatizadas y se
demostró el ciclo rojo-verde.

La ejecución final de Playwright terminó con
4 pruebas aprobadas y ninguna fallida.
