## Conceptos

- API Rest, [json-server](https://github.com/typicode/json-server) y   [Postman](https://www.postman.com/)

- Llamadas al backend de una app React

- Formularios, con validación

## API Rest, json-server, Postman

- ¿Qué es una API Rest?

- Ejecutar el servidor local de mocks
  ([json-server](https://github.com/typicode/json-server))
  en una nueva consola:
  ```
  cd mocks-server
  npm i
  npm start
  ```

- Instalar [Postman](https://www.postman.com/) y probar la API Rest de tareas que expone el servidor local de mocks:

    - `GET /tasks`: Obtiene la lista de tareas.
    - `GET /tasks/:id`: Obtiene la tarea con id `id`.
    - `POST /tasks + body`: Crea una nueva tarea (el `body` va sin `id`).
    - `PUT /tasks/:id + body`: Actualiza la tarea con id `id`.
    - `PATCH /tasks/:id + body`: Actualiza determinadas propiedades de la tarea
      con id `id`.
    - `DELETE /tasks/:id`: Elimina la tarea con id `id`.

## Llamadas al backend de una app React, con feedback de cargas y errores ([demo](https://at-react-course.herokuapp.com/tasks)) ([explanation-1](explanation-1))

- Partiremos de la estructura base de aplicación de lista de tareas que se ofrece en [explanation-1-base](explanation-1-base). Integraremos la app con un backend para que funcione como se observa en esta [demo](https://at-react-course.herokuapp.com/tasks).

- Preparemos el componente _App_ para mostrar los componentes visuales apropiados según los diferentes estados que puede tener la interfaz:
  
  - Cargando la lista de tareas
  - Ocurrió un error al cargar la lista de tareas
  - Procesando una petición (añadir, borrar o alternar si está hecha una tarea).
  - Ocurrió un error al procesar una petición.

- Para hacer las llamadas al backend desde el frontend, usaremos
  [axios](https://github.com/axios/axios):
  ```
  npm i axios
  ```
  
- Crear un archivo services/TaskListService.js que contendrá la lógica de llamadas al backend.
  
- El lugar correcto para definir la ruta de la URL base de los servicios de backend es en una variable de entorno. Puedes
  [definir variables de entorno en un proyecto create-react-app](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env)
  en el archivo [.env](../../.env) de la raíz del proyecto.
  
- Deben estar prefijadas con `REACT_APP_`. Por ejemplo:
  ```
  REACT_APP_BASE_URL=http://localhost:3003
  ```
  Luego en el código de la aplicación se consulta con:
  ```
  process.env.REACT_APP_BASE_URL
  ```

- Definamos en el servicio el método `getAll()` que invoca al backend para obtener la lista de tareas.

- La consulta del resultado que devuelve una 
  [Promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise),
  que es el tipo de datos que devuelven las funciones de axios, se debe hacer
  usando: `async` y `await`, junto con `try` y `catch`.

- Implementar la carga inicial de la lista de tareas dando feedback del proceso de carga, informar del posible error que se produzca y, en tal caso, ofrecer la posibilidad de reintentarlo.
  
- Para el resto de operaciones con la lista, deshabilitarla mientras se esté ejecutando un procesamiento y mostrar el Snackbar de error en el caso de que haya ocurrido algún error.