# todo-app-with-mocks-server

## What is this for?

## Main concepts

- API Rest, [json-server](https://github.com/typicode/json-server) y [Postman](https://www.postman.com/)

- Llamadas al backend de una app React


## How to use it?

- Ejecutar el servidor local de mocks
  ([json-server](https://github.com/typicode/json-server))
  en una nueva consola:
  ```
  cd mocks-server
  npm i
  npm start
  ```

- En [Postman](https://www.postman.com/) probar la API Rest de tareas que expone el servidor local de mocks:

    - `GET /tasks`: Obtiene la lista de tareas.
    - `GET /tasks/:id`: Obtiene la tarea con id `id`.
    - `POST /tasks + body`: Crea una nueva tarea (el `body` va sin `id`).
    - `PUT /tasks/:id + body`: Actualiza la tarea con id `id`(machaca el objeto entero)
    - `PATCH /tasks/:id + body`: Modifica determinadas propiedades de la tarea con id `id`.
    - `DELETE /tasks/:id`: Elimina la tarea con id `id`.
    - `COPY`
    - `HEAD`
    - `OPTIONS`: relacionado con las CORS, no te da información desde JavaScript.

## Llamadas al backend de una app React, con feedback de cargas y errores ([demo](https://at-react-course.herokuapp.com/tasks)) 

- He integrado la app con un backend para que funcione como se observa en esta [demo](https://at-react-course.herokuapp.com/tasks).

- He preparado el componente _App_ para mostrar los componentes visuales apropiados según los diferentes estados que puede tener la interfaz:
  
  - Cargando la lista de tareas
  - Ocurrió un error al cargar la lista de tareas
  - Procesando una petición (añadir, borrar o alternar si está hecha una tarea).
  - Ocurrió un error al procesar una petición.

- Para hacer las llamadas al backend desde el frontend, uso [axios](https://github.com/axios/axios):
  ```
  npm i axios
  ```
  
- He creado un archivo services/TaskListService.js que contendrá la lógica de llamadas al backend.
  
- El lugar correcto para definir la ruta de la URL base de los servicios de backend es en una variable de entorno. Se puede 
[definir variables de entorno en un proyecto create-react-app](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env) en el archivo [.env] de la raíz del proyecto: 

  Deben estar prefijadas con `REACT_APP_`. Por ejemplo:
  ```
  REACT_APP_BASE_URL=http://localhost:3003
  ```
  Luego en el código de la aplicación se consulta con:
  ```
  process.env.REACT_APP_BASE_URL
  ```

- Defino en el servicio el método `getAll()` que invoca al backend para obtener la lista de tareas.

- La consulta del resultado que devuelve una 
  [Promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise),
  que es el tipo de datos que devuelven las funciones de axios, se debe hacer
  usando: `async` y `await`, junto con `try` y `catch`.

- Hay que implementar la carga inicial de la lista de tareas dando feedback del proceso de carga, informar del posible error que se produzca y, en tal caso, ofrecer la posibilidad de reintentarlo.
  
- Para el resto de operaciones con la lista, deshabilitarla mientras se esté ejecutando un procesamiento y mostrar el Snackbar de error en el caso de que haya ocurrido algún error.
