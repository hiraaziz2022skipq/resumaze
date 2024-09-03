// lib/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000, // Optional timeout for requests
  headers: {
    'Content-Type': 'application/json',    
    
  },
});

export default axiosInstance;