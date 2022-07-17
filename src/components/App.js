import { useState, useCallback, useEffect } from "react";

import TasksList from "./TaskList";
import TaskListService from "../services/TaskListService";

import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//Máquina de estados: transiciones de estados de la app con Constantes
const UiState = {
  None: 0,
  Ready: 1,
  Loading: 2,
  ErrorLoading: 3,
  Processing: 4,
  ErrorProcessing: 5,
};

const App = () => {
  const [uiState, setUiState] = useState(UiState.None); //estado global del componente con valor inicial INIT
  const [tasks, setTasks] = useState([]);

  //implementamos la carga inicial
  const fetchAllTasks = async () => {
    setUiState(UiState.Loading);
    try {
      const res = await TaskListService.getAll();
      setTasks(res.data);
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorLoading);
    }
  };
  //handlers
  const createTaskHandler = async (description) => {
    setUiState(UiState.Processing);
    try {
      const res = await TaskListService.create(description);
      setTasks((prevTasks) => [...prevTasks, res.data]);
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorProcessing);
    }
  };

  const toggleDoneTaskHandler = async (task) => {
    setUiState(UiState.Processing);
    try {
      const res = await TaskListService.toggleDone(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? res.data : t))
      );
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorProcessing);
    }
  };

  const deleteTaskHandler = async (task) => {
    setUiState(UiState.Processing);
    try {
      await TaskListService.delete(task);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      setUiState(UiState.Ready);
    } catch {
      setUiState(UiState.ErrorProcessing);
    }
  };

  const snackbarCloseHandler = () => {
    if (uiState === UiState.ErrorProcessing) {
      setUiState(UiState.Ready);
    }
  };

  const isTasksListVisible = [
    UiState.Ready,
    UiState.Processing,
    UiState.ErrorProcessing,
  ].includes(uiState);

  /*Haciéndolo con useCallback*/
  /*si no lo ponemos, las referencias, cada vez que 
  cambie el estado de la función, van a cambiar, y se van a estar 
  creando las referencias de la función continuamente. Esto se 
  lo estamos pasando a otro componente*/
  // const createTask = useCallback((description) => {}, []);
  // const toggleDoneTask = useCallback((task) => {}, []);
  // const deleteTask = useCallback((task) => {}, []);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Lista de tareas</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {/* solo se ejecuta si es verdadero */}
        {uiState === UiState.Loading && (
          <Box my={10} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}
        {uiState === UiState.ErrorLoading && (
          <Box my={5}>
            <Alert
              severity="error"
              action={<Button onClick={fetchAllTasks}>Reintentar</Button>}
            >
              No se pudo cargar la lista de tareas
            </Alert>
          </Box>
        )}

        {isTasksListVisible && (
          <TasksList
            tasks={tasks}
            disabled={uiState === UiState.Processing}
            //operaciones que se pueden hacer sobre las tareas
            onDeleteTask={deleteTaskHandler}
            onCreateTask={createTaskHandler}
            onToggleDoneTask={toggleDoneTaskHandler}
          />
        )}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3000}
          open={uiState === UiState.ErrorProcessing}
          onClose={snackbarCloseHandler}
        >
          <Alert severity="error">
            Ocurrió un error al procesar la solicitud
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default App;
