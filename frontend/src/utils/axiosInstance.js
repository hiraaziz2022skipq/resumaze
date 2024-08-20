// lib/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000, // Optional timeout for requests
  headers: {
    'Content-Type': 'application/json',    
    
  },
});

export default axiosInstance;