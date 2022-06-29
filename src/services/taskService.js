import axios from 'axios';
import { BASE_URL } from './serviceUtils';


/**
 * get all Task from backend
 * 
 */
export const getAll = (num) => {
  return  axios.get(`${BASE_URL}/tasks`);
}