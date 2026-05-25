# Evaluación Parcial N°2 – Ingeniería DevOps

## Integrantes

- Luis Guillermo Muñoz Soto
- Geraldine Becerra

---

# Proyecto

**PokeCardStore** es una aplicación web desarrollada con React, TypeScript y Vite, orientada a la visualización y gestión de cartas Pokémon.

Para esta evaluación se incorporaron prácticas DevOps mediante la implementación de contenedores Docker, orquestación con Docker Compose, automatización CI/CD mediante GitHub Actions, análisis de dependencias y ejecución de pruebas automatizadas.

---

# Objetivos

- Contenerizar la aplicación utilizando Docker.
- Implementar orquestación mediante Docker Compose.
- Automatizar procesos de integración continua.
- Ejecutar pruebas automatizadas dentro del pipeline.
- Incorporar herramientas de análisis de dependencias.
- Garantizar un entorno reproducible y fácil de desplegar.

---

# Desarrollo de la Solución

## 1. Creación de rama de trabajo

Para desarrollar esta evaluación se creó una rama independiente denominada:

```text
luisDevops
```

Esta rama permitió implementar y validar todas las configuraciones DevOps sin afectar el desarrollo principal del proyecto.

### Evidencia

**[![Rama de trabajo luisDevops](image.png)]**

---

## 2. Validación inicial del proyecto

Antes de comenzar las modificaciones se verificó el correcto funcionamiento de la aplicación.

### Comandos ejecutados

```bash
npm install
npm run build
npm test
```

Estas validaciones permitieron confirmar que el proyecto compilaba correctamente y que los tests existentes funcionaban sin errores.

### Evidencia

**[![Validación de compilación del proyecto](image-1.png)]**

---

# Dockerización de la Aplicación

## Dockerfile

Se creó un Dockerfile multi-stage que permite:

- Construir la aplicación React.
- Generar archivos optimizados para producción.
- Servir el contenido mediante Nginx.

### Beneficios

- Menor tamaño de imagen final.
- Separación entre compilación y ejecución.
- Entorno reproducible.

### Evidencia

**[![Dockerfile utilizado para la contenerización de la aplicación](image-2.png)]**

---

## Configuración de Nginx

Se incorporó un archivo de configuración Nginx para servir correctamente la aplicación React y soportar el enrutamiento SPA.

### Evidencia

**[![Configuración Nginx](image-3.png)]**

---

## Archivo .dockerignore

Se configuró un archivo `.dockerignore` para excluir archivos innecesarios durante la construcción de imágenes.

### Evidencia

**[![Archivo .dockerignore](image-4.png)]**

---

# Docker Compose

Se creó un archivo `docker-compose.yml` para representar un entorno completo de ejecución local.

La configuración implementada incluye:

- Servicio frontend.
- Imagen personalizada.
- Variables de entorno.
- Healthcheck.
- Red personalizada.
- Política de reinicio automática.
- Exposición de puertos.

### Características implementadas

| Característica | Implementada |
|---------------|-------------|
| Servicios | Sí |
| Variables de entorno | Sí |
| Redes personalizadas | Sí |
| Healthcheck | Sí |
| Restart Policy | Sí |
| Puertos expuestos | Sí |
| Imagen propia | Sí |

### Evidencia

**[![Archivo docker-compose](image-5.png)]**

---

# Pipeline CI/CD

## GitHub Actions

Se configuró un pipeline automatizado mediante GitHub Actions.

Cada vez que se realiza un push al repositorio se ejecutan automáticamente diversas validaciones.

### Etapas implementadas

#### Instalación de dependencias

```bash
npm install
```

#### Análisis de código

```bash
npm run lint
```

#### Ejecución de pruebas

```bash
npm test
```

#### Construcción del proyecto

```bash
npm run build
```

#### Construcción de imagen Docker

```bash
docker build
```

#### Validación Docker Compose

```bash
docker compose config
```

#### Levantamiento del stack

```bash
docker compose up
```

#### Verificación de contenedores

```bash
docker ps
```

#### Detención del entorno

```bash
docker compose down
```

### Evidencia

**[![Pipeline GitHub Actions ejecutado correctamente](image-8.png)]**

---

# Seguridad

## Dependabot

Se implementó Dependabot para el monitoreo automático de dependencias del proyecto.

Las revisiones configuradas incluyen:

- Dependencias NPM.
- Dependencias GitHub Actions.

Esto permite detectar versiones desactualizadas y vulnerabilidades conocidas de forma automática.

### Evidencia

**[![Configuración Dependabot](image-6.png)]**

---

## SonarCloud

Se dejó preparada la configuración base para la futura integración con SonarCloud, permitiendo incorporar análisis estático de código y métricas de calidad.

### Evidencia

**[![Configuración SonarCloud](image-7.png)]**

---

# Pruebas Automatizadas

Durante el desarrollo de la evaluación se incorporaron nuevos casos de prueba para aumentar la cobertura del proyecto.

Se desarrollaron pruebas para los siguientes componentes:

- Login
- Registro
- Perfil
- Compras

Estas pruebas permitieron validar distintos escenarios funcionales de la aplicación y aumentar significativamente la cobertura de código.

---

## Cobertura Inicial

Antes de incorporar nuevas pruebas la cobertura obtenida era:

| Métrica | Resultado |
|----------|----------|
| Statements | 35.60% |
| Branches | 21.11% |
| Functions | 29.83% |
| Lines | 37.58% |

### Evidencia

**[![Covertura inicial](<covertura antes.png>)]**
**[![Covertura inicial (terminal)](<covertura antes 2.png>)]**

---

## Cobertura Final

Luego de implementar las pruebas adicionales se obtuvo:

| Métrica | Resultado |
|----------|----------|
| Statements | 54.79% |
| Branches | 35.55% |
| Functions | 50.00% |
| Lines | 57.54% |

### Evidencia

**[![Covertura actual](<test despues.png>)]**
**[![Covertura actual (terminal)](<test despues 2.png>)]**

---

# Resultados Obtenidos

| Elemento | Estado |
|-----------|---------|
| Docker | Implementado |
| Docker Compose | Implementado |
| Redes personalizadas | Implementado |
| Variables de entorno | Implementado |
| Healthcheck | Implementado |
| GitHub Actions | Implementado |
| Build automatizado | Implementado |
| Pruebas automatizadas | Implementado |
| Análisis de dependencias (SCA) | Implementado |
| SonarCloud preparado | Implementado |
| Cobertura de pruebas mejorada | Implementado |

---

# Conclusión

Durante esta evaluación se logró incorporar exitosamente prácticas DevOps al proyecto PokeCardStore mediante la implementación de contenedores Docker, orquestación con Docker Compose y automatización de procesos a través de GitHub Actions. Además, se integraron mecanismos de análisis de dependencias y se fortaleció la calidad del software mediante la creación de nuevas pruebas automatizadas que permitieron aumentar significativamente la cobertura del proyecto.

La solución desarrollada proporciona un entorno reproducible, automatizado y fácilmente desplegable, facilitando futuras tareas de integración, mantenimiento y evolución de la aplicación. Asimismo, la estructura implementada constituye una base sólida para continuar incorporando herramientas de calidad y seguridad dentro del ciclo de desarrollo.