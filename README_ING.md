# POKECARD STORE


### Instalación 🔧
A continuación, se presenta una guía paso a paso para configurar el entorno de desarrollo y realizar la instalación de todas las dependencias necesarias:

Clona este repositorio:

```bash
git clone https://github.com/Deimonlay13/PokeCardStore.git
```
Accede a la carpeta del proyecto:
```bash
cd PokeCardStore
```
Instala las dependencias:
```bash
npm install
```
Inicia el servidor de desarrollo:
```bash
npm run dev
```

El proyecto estara disponible en:
- http://localhost:5173/



### Estrategia de branching 🛠️

Utilizamos Trunk-Based Development porque se trata de un proyecto pequeño, con un equipo reducido, por lo tanto no es necesario manejar multiples ramas ni procesos de release complejos.

Este enfoque nos permite trabajar de forma más ágil, integrar cambios rápidamente y mantener  un desarrollo simple.


## Contributing

Gracias por tu interés en contribuir 😊

### Flujo de trabajo
- Usamos Trunk-Based Development.
- Crear ramas cortas desde `main` (ej: `feature/nombre-feature` o `fix/nombre-bug`).
- Mantener las ramas pequeñas y hacer merge frecuente.

### Convenciones de commits
- Usamos commits claros y descriptivos.
- Formato sugerido:
  - `feat: agregar login`
  - `fix: corregir error en validación`
  - `docs: actualizar README`

### Pull Requests
- Explicar brevemente los cambios realizados.
- Asegurarse de que el código funcione correctamente.
- Solicitar revisión antes de hacer merge.

### Código
- Mantener el código limpio y legible.
- Seguir las convenciones del proyecto.