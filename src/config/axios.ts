import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL, 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
