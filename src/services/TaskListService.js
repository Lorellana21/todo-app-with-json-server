import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3003";


const TaskListService = {

  getAll: () => (
    axios.get(`${baseUrl}/tasks`)
  ),

  create: (description) => (
    axios.post(`${baseUrl}/tasks`, { description, isDone: false })
  ),

  toggleDone: (task) => (
    axios.patch(`${baseUrl}/tasks/${task.id}`, { isDone: !task.isDone })
  ),

  delete: (task) => (
    axios.delete(`${baseUrl}/tasks/${task.id}`)
  )
};

export default TaskListService;