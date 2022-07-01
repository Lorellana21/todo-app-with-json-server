import { useState, useCallback, useEffect } from "react";

import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { getAll } from "../services/taskListService";
import TasksList from "./TaskList";

//Máquina de estados: transiciones de estados de la app con Constantes
/*Lo ponemos aqui para que solo se ejecute una vez, 
con el primer import que hagamos, este tiene que 
ver con el motor de JavaScript */
const INIT = "init";
const LOADING = "loading";
const OK = "ok";
const KO = "Error";

const App = () => {
  const [appState, setAppState] = useState(INIT); //estado global del componente con valor inicial INIT
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(0);

  //implementamos la carga inicial
  useEffect(() => {
    setAppState(LOADING);
    getAll()
      .then((response) => {
        setTasks(response.data);
        setAppState(OK);
      })
      .catch((error) => {
        console.error(error);
        setAppState(KO);
      });
  }, [counter]);

  const retry = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  /*Si no ponemos el useCallback las referencias, cada vez que 
  cambie el estado de la función, van a cambiar, y se van a estar 
  creando las referencias de la función continuamente. Esto se 
  lo estamos pasando a otro componente*/
  const createTask = useCallback((description) => {}, []);

  const toggleDoneTask = useCallback((task) => {}, []);

  const deleteTask = useCallback((task) => {}, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Lista de tareas</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {/* solo se ejecuta si es verdadero */}
        {appState === LOADING && (
          <Box my={10} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {appState === KO && (
          <Box my={5}>
            <Alert
              severity="error"
              action={<Button onClick={retry}>Reintentar</Button>}
            >
              No se pudo cargar la lista de tareas
            </Alert>
          </Box>
        )}

        {appState === OK && (
          <TasksList
            tasks={tasks}
            disabled={true}
            //operaciones que se pueden hacer sobre las tareas
            onDeleteTask={deleteTask}
            onCreateTask={createTask}
            onToggleDoneTask={toggleDoneTask}
          />
        )}

        {appState === KO && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={3000}
            open={true}
            onClose={() => {}}
          >
            <Alert severity="error">
              Ocurrió un error al procesar la solicitud
            </Alert>
          </Snackbar>
        )}
      </Container>
    </>
  );
};

export default App;
