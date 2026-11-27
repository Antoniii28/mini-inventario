# Día 6 — Integración continua con GitHub Actions

**Proyecto:** Mini Inventario
**Equipo:** Pchifus
**Responsable:** Luis Ángel Osorio Galicia
**Fecha de trabajo:** 27 de noviembre de 2026
**Rama:** dia-06-ci

## 1. Objetivo

Automatizar la ejecución de pruebas de Mini Inventario
mediante GitHub Actions cada vez que se abra o actualice
un Pull Request hacia main.

## 2. Actividades realizadas

- Instalación de GitHub CLI mediante Homebrew.
- Autenticación con la cuenta de GitHub del responsable.
- Creación de la rama dia-06-ci.
- Creación de .github/workflows/ci.yml.
- Configuración de Node.js 22 y Ubuntu.
- Configuración de npm ci y Playwright con Chromium.
- Uso de secretos de GitHub para las variables de Supabase.
- Configuración del reporte JUnit de Playwright.
- Validación del workflow mediante actionlint.

## 3. Prompt utilizado

Se solicitó crear un workflow que ejecute las pruebas
automáticamente en Pull Requests hacia main, utilizando
Node.js 22, Chromium y secretos de GitHub.

## 4. Revisión y corrección del agente

Se ajustó la ruta del reporte de Playwright para que
GitHub Actions pueda encontrar el archivo generado
y subirlo como artefacto.

Esta corrección se realizó antes de publicar el workflow.

## 5. Comandos y decisiones

Comando aprobado:
actionlint .github/workflows/ci.yml

Motivo:
Permite validar la configuración sin ejecutar el workflow
ni modificar el repositorio remoto.

Resultado:
El comando terminó sin mostrar errores.

## 6. Secretos de GitHub

Comando utilizado:
gh secret list --repo Antoniii28/mini-inventario

Resultado inicial:
no secrets found

Actualización del 27 de noviembre de 2026:

José Antonio confirmó que configuró los cuatro secretos
mediante GitHub CLI.

Luis verificó personalmente con `gh secret list` que
aparecen los siguientes nombres:

- SUPABASE_URL
- SUPABASE_KEY
- TEST_EMAIL
- TEST_PASSWORD

Los valores no fueron consultados ni compartidos.

Estado: secretos registrados. Pendiente comprobar
su funcionamiento en GitHub Actions.

## 7. Pendientes

- Integración de los PR anteriores en main.
- [x] Confirmación de los cuatro secretos de GitHub (verificada por Luis).
- Publicación del Pull Request del Día 6.
- Primera ejecución de CI en verde.
- Introducción temporal de un fallo y ejecución en rojo.
- Diagnóstico con GitHub CLI.
- Restauración del código y ejecución final en verde.
- Capturas de las tres ejecuciones.
- Explicación personal de la causa del fallo.
- Revisión y fusión del Pull Request.

## 8. Evidencias

Las capturas se guardarán en capturas/ conforme
se realicen las ejecuciones.

**Estado:** En desarrollo. Aún no se ha ejecutado
el workflow en GitHub Actions.

## 9. Handoff y coordinación

- José: configuró los cuatro secretos de GitHub Actions.
- Luis: comprobó que los cuatro nombres aparecen en GitHub.
- PR #16: pendiente de integración del Día 4.
- PR #17: pendiente de integración del Día 5.
- Próximo paso: ejecutar el workflow del Día 6.
- Evidencia pendiente: CI verde, rojo y verde.

El handoff principal de Luis se actualizará después
de sincronizar con main, para no crear conflictos
con la documentación del equipo.
