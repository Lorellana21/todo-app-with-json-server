import { useState } from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import TextField from '@mui/material/TextField';

import TasksListItem from './TaskListItem';
import TaskListAddButton from './TaskListAddButton';

const TasksList = ({ disabled, tasks, onDeleteTask, onCreateTask,
  onToggleDoneTask }) => {

  const [description, setDescription] = useState('');

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const descriptionKeyPress = (event) => {
    if (event.key === 'Enter') {
      processTaskSubmit();
    }
  };

  const processTaskSubmit = () => {
    onCreateTask(description);
    setDescription('');
  };

  const addButton = (
    <TaskListAddButton
      disabled={disabled}
      onClick={processTaskSubmit} />
  );

  return (
    <>
      <List>
        {tasks.map(task => (
          <TasksListItem
            key={task.id}
            description={task.description}
            isDone={task.isDone}
            disabled={disabled}
            onToggleDone={() => onToggleDoneTask(task)}
            onDelete={() => onDeleteTask(task)} />
        ))}
      </List>
      <TextField
        disabled={disabled}
        label="Nueva tarea"
        variant="outlined"
        value={description}
        fullWidth={true}
        InputProps={{ endAdornment: addButton }}
        onChange={descriptionChange}
        onKeyPress={descriptionKeyPress} />
    </>
  );
};

TasksList.defaultProps = {
  disabled: false,
  onDeleteTask: () => { },
  onCreateTask: () => { },
  onToggleDoneTask: () => { }
};

TasksList.propTypes = {
  disabled: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired
  })).isRequired,
  onDeleteTask: PropTypes.func,
  onCreateTask: PropTypes.func,
  onToggleDoneTask: PropTypes.func
};

export default TasksList;