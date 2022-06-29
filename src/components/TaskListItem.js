import PropTypes from 'prop-types';

import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';

const TasksListItem = ({ disabled, description, isDone,
                         onDelete, onToggleDone }) => (
  <ListItem
    button
    disabled={disabled}
    style={{
      textDecoration : isDone ? 'line-through' : ''
    }}
    onClick={onToggleDone}>
    <ListItemIcon>
      <Checkbox
        edge="start"
        color="primary"
        checked={isDone}/>
    </ListItemIcon>
    <ListItemText
      primary={description}/>
    <ListItemSecondaryAction>
      <IconButton
        disabled={disabled}
        edge="end"
        aria-label="delete"
        onClick={onDelete}>
        <DeleteIcon
          color={disabled ? 'disabled' : 'error'}/>
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

TasksListItem.defaultProps = {
  disabled: false
};

TasksListItem.propTypes = {
  disabled: PropTypes.bool,
  description: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func
};

export default TasksListItem;