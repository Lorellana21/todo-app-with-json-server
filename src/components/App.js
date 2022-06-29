import { useState, useCallback, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getAll } from '../services/taskService'
import TasksList from './TaskList';

const KO = 'Error';
const OK = 'ok';
const LOADING = 'loading';
const INIT = 'init';


const App = () => {

  const [tasks, setTasks] = useState([]);
  const [appState, setAppState] = useState(INIT);
  const [counter, setCounter] = useState(0)


  useEffect(() => {
    setAppState(LOADING);
    getAll()
      .then(response => {
        setTasks(response.data);
        setAppState(OK);
      })
      .catch(error => {
        console.error(error);
        setAppState(KO)
      })
  }, [counter])

  const retry = () => {
    setCounter(counter + 1)
  }

  const createTask = useCallback((description) => {

  }, []);

  const toggleDoneTask = useCallback((task) => {

  }, []);

  const deleteTask = useCallback((task) => {

  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">
            Lista de tareas
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {appState === LOADING && <Box
          my={10}
          display="flex"
          justifyContent="center">
          <CircularProgress />
        </Box>}
        {appState === KO && <Box my={5}>
          <Alert
            severity="error"
            action={
              <Button onClick={retry}>
                Reintentar
              </Button>
            }>
            No se pudo cargar la lista de tareas
          </Alert>
        </Box>}

        {appState === OK && <TasksList
          tasks={tasks}
          disabled={true}
          onDeleteTask={deleteTask}
          onCreateTask={createTask}
          onToggleDoneTask={toggleDoneTask} />
        }

        {appState === KO && <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={3000}
          open={true}
          onClose={() => { }}>
          <Alert severity="error">
            Ocurrió un error al procesar la solicitud
          </Alert>
        </Snackbar>}
      </Container>
    </>
  );
};

export default App;