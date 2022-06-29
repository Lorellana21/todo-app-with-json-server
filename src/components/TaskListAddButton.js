import PropTypes from 'prop-types';

import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';

const TaskListAddButton = ({ disabled, onClick }) => (
  <IconButton
    disabled={disabled}
    onClick={onClick}>
    <AddBoxIcon
      color={disabled ? 'disabled' : 'primary'}/>
  </IconButton>
);

TaskListAddButton.defaultProps = {
  disabled: false
};

TaskListAddButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default TaskListAddButton;