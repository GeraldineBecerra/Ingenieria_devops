# Evaluación Parcial N°2 – Ingeniería DevOps

## Integrantes

- Luis Guillermo Muñoz Soto
- Geraldine Becerra

## Proyecto

PokeCardStore es una aplicación web desarrollada utilizando React, TypeScript y Vite, orientada a la visualización y gestión de información relacionada con cartas Pokémon.

El objetivo de esta evaluación consiste en incorporar prácticas DevOps al proyecto mediante la implementación de un pipeline CI/CD, contenerización utilizando Docker, orquestación mediante Docker Compose, ejecución de pruebas automatizadas y aplicación de mecanismos de seguridad y calidad de código.

## Objetivos de la evaluación

- Contenerizar la aplicación utilizando Docker.
- Automatizar procesos mediante GitHub Actions.
- Integrar pruebas automatizadas dentro del pipeline.
- Implementar análisis de seguridad y calidad de código.
- Orquestar servicios utilizando Docker Compose.
- Garantizar trazabilidad y reproducibilidad del despliegue.

---

# Desarrollo

## 1. Preparación del entorno

Para comenzar el desarrollo de la evaluación se creó una rama de trabajo denominada `luisDevops`, derivada desde la rama `dev`.

Esta rama fue utilizada para implementar todas las configuraciones relacionadas con Docker, CI/CD, pruebas automatizadas y herramientas de seguridad, manteniendo aislados los cambios respecto al desarrollo principal del proyecto.

### Validación inicial del proyecto

Antes de iniciar las modificaciones se verificó el correcto funcionamiento de la aplicación ejecutando:

```bash
npm install
npm run build
npm test