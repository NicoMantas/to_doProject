// Configuración de la API
export const API_CONFIG = {
  // URL base de la API
  BASE_URL: 'https://localhost:7245/api',
  
  // Timeout para las peticiones (en milisegundos)
  TIMEOUT: 10000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Configuración de CORS
  CORS: {
    credentials: true,
  }
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Función para validar si la API está disponible
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/Tasks`, {
      method: 'GET',
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    return response.ok;
  } catch (error) {
    console.error('API Health Check failed:', error);
    return false;
  }
};
