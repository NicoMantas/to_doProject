import axios from 'axios';
import { API_CONFIG } from '../config/api.config.js';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: API_CONFIG.CORS.credentials,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskService = {
  // Obtener todas las tareas
  getAllTasks: async () => {
    try {
      const response = await api.get('/Tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Obtener una tarea por ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/Tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Crear una nueva tarea
  createTask: async (taskData) => {
    try {
      // Preparar los datos para enviar al backend
      const taskToSend = {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const response = await api.post('/Tasks', taskToSend);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Actualizar una tarea
  updateTask: async (id, taskData) => {
    try {
      // Primero obtener la tarea actual para preservar datos existentes
      const currentTask = await api.get(`/Tasks/${id}`);
      const updatedTask = {
        ...currentTask.data,
        ...taskData,
        updatedAt: new Date().toISOString()
      };
      
      const response = await api.put(`/Tasks/${id}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTask: async (id) => {
    try {
      await api.delete(`/Tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Marcar tarea como completada/pendiente
  toggleTaskCompletion: async (id, currentStatus) => {
    try {
      // Primero obtener la tarea actual
      const currentTask = await api.get(`/Tasks/${id}`);
      const updatedTask = {
        ...currentTask.data,
        completed: !currentStatus,
        updatedAt: new Date().toISOString()
      };
      
      const response = await api.put(`/Tasks/${id}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  }
};

export default api;