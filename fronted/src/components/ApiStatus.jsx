import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../config/api.config.js';

const ApiStatus = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkConnection();
    
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const connected = await checkApiHealth();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="api-status checking">
        <span className="status-indicator checking"></span>
        <span>Verificando conexión...</span>
      </div>
    );
  }

  return (
    <div className={`api-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
      <span>
        {isConnected ? 'Conectado a la API' : 'Desconectado de la API'}
      </span>
      {!isConnected && (
        <button onClick={checkConnection} className="retry-btn">
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ApiStatus;
