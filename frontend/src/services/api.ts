import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://hd-notes-backend.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data: { name: string; email: string; dateOfBirth?: string }) =>
    api.post('/auth/signup', data),
  
  verifyOTP: (data: { email: string; otp: string }) =>
    api.post('/auth/verify-otp', data),
  
  signin: (data: { email: string }) =>
    api.post('/auth/signin', data),
  
  googleAuth: (data: { token: string }) =>
    api.post('/auth/google', data),
};

export const notesAPI = {
  getNotes: () => api.get('/notes'),
  createNote: (data: { title: string; content: string }) =>
    api.post('/notes', data),
  deleteNote: (id: string) => api.delete(`/notes/${id}`),
};

export default api;