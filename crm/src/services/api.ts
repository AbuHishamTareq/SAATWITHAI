import axios from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../constants';

/**
 * Axios-based API service for all backend communication.
 *
 * Standardized response format:
 *   Success: { "status": true, "message": "...", "data": {...} }
 *   Error:   { "status": false, "message": "...", "errors": {...} }
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor: attach admin token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: unwrap standardized format
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
