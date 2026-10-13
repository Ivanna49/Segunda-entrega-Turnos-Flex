# Turnos-Flex

Turnos-Flex es una aplicación web desarrollada como proyecto académico para la asignatura Desarrollo Web Backend.

El sistema permite gestionar turnos mediante una interfaz web y una API REST construida con Node.js y Express. La información se almacena en MongoDB utilizando Mongoose para el modelado de datos.

El proyecto aplica conceptos fundamentales de desarrollo backend tales como:

Arquitectura MVC Middleware Rutas dinámicas Motor de plantillas Pug Persistencia de datos con MongoDB API REST

El objetivo es desarrollar una aplicación web con Node.js y Express. Implementar un sistema de gestión de turnos. Utilizar MongoDB como base de datos. Aplicar buenas prácticas de programación. Trabajar con una estructura modular y escalable. Realizar pruebas funcionales mediante Postman o Thunder Client.

## Requisitos

- Node.js y npm
- Una base de datos MongoDB

## Instalación y ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz y configurar la conexión:

   ```env
   MONGODB_URI=mongodb://localhost:27017/turnos-flex
   ```

3. Iniciar la aplicación:

   ```bash
   npm start
   ```

   Abrir `http://localhost:3000`.

## Rutas

- `GET /` muestra la página de inicio.
- `GET /turnos` muestra los turnos ordenados por fecha y hora.
- `POST /turnos` crea un turno. Enviar JSON con `cliente`, `fecha` (`YYYY-MM-DD`) y `hora` (`HH:mm`).
- `GET /turnos/:id` consulta un turno por su ID de MongoDB.
- `DELETE /turnos/:id` elimina un turno por su ID de MongoDB.

Ejemplo para crear un turno:

```json
{
  "cliente": "Ana Pérez",
  "fecha": "2026-10-20",
  "hora": "10:30"
}
```


