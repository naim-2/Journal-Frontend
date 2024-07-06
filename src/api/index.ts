import axios from 'axios';
import { LOCAL_URL, PRODUCTION_URL } from '../../config';

const api = axios.create({
  baseURL: PRODUCTION_URL,
});

export default api;
