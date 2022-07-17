# todo-app-with-json-server


## Main concepts

- API Rest, [json-server](https://github.com/typicode/json-server) y [Postman](https://www.postman.com/)

- React app backend calls

- Hook **useCallback**: it leaves the function reference frozen. When it's a function that parent component passes to a child component, we don't want it to be rendered on the child every time the parent changes. "Functions also have a reference".
[Example here](https://www.w3schools.com/react/react_usecallback.asp)


## How to use it?

- Run the local mocks server ([json-server](https://github.com/typicode/json-server)) en una nueva consola:
  ```
  cd mocks-server
  npm i
  npm start
  ```

- In [Postman](https://www.postman.com/) test the Rest API of tasks that exposes the local mocks server:

    - `GET /tasks`: Gets the task list.
    - `GET /tasks/:id`: Gets the task with id `id`.
    - `POST /tasks + body`: Create a new task (the `body` goes without `id`). 
    - `PUT /tasks/:id + body`: Update the task with id `id`(mashes the whole object)
    - `PATCH /tasks/:id + body`: Modifies certain properties of the task with id `id`.
    - `DELETE /tasks/:id`: Delete the task with id `id`.
    - `COPY`
    - `HEAD`
    - `OPTIONS`: related to CORS, it does not give you information from JavaScript.

## React app backend calls, with load and error feedback.

- The _App_ component is prepared to display the appropriate visual components according to the different states that the interface may have:
  
  - Loading the task list
  - An error occurred while loading the task list.
  - Processing a request (add, delete or toggle if a task is done).
  - An error occurred while processing a request.

- To make calls to the backend from the frontend, I use [axios](https://github.com/axios/axios):
  ```
  npm i axios --save
  ```

- The services/TaskListService.js file will contain the backend call logic.
  
- The correct place to define the path to the base URL of the backend services is in an environment variable. It is possible to
[define environment variables in a project create-react-app](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env) in the file [.env] of the project root: 

  They must be prefixed with `REACT_APP_`. For example
  ```
  REACT_APP_BASE_URL=http://localhost:3003
  ```
  Then, in the application code it is queried with:
  ```
  process.env.REACT_APP_BASE_URL
  ```


- The result query returning a 
  [Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise),
  which is the type of data returned by the axios functions, must be done using `async` and `await`, along with `try` and `catch`.

- The **initial loading of the task list** is implemented, giving feedback on the loading process, informing about possible errors and offering the possibility to retry.
  
