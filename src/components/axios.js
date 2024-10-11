// src/axios.js

import axios from 'axios';
import { useHistory } from 'react-router-dom'; // If you're using react-router-dom for routing

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "http://localhost:8080",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken'); // or get it from any other storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response, // pass through any successful responses
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 405)) {
      localStorage.removeItem('authToken');
      if(error.config.url !="/hello")
      window.location.href = '/login'; // or use useHistory() to push to the login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
