import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../utils/dev';

// Crear el contexto
export const AlgoritmoContext = createContext();

// Crear el proveedor del contexto
export const AlgoritmoProvider = ({ children }) => {
  const { authState } = useAuth(); // Access the outer context

  const [DestinosRecomendados, setDestinosRecomendados] = useState([]);
  const [ServiciosRecomendados, setServiciosRecomendados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para realizar el fetch de destinos recomendados
  const fetchDestinosRecomendados = async () => {
    try {
      // Realizar la solicitud solo si el authState está en true
      if (authState) {
        // Realizar el fetch y actualizar el estado
        const response = await axios.get(`${API_BASE_URL}/destinos/algoritmo`);
        setDestinosRecomendados(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setDestinosRecomendados([])
      setIsLoading(false);
    }
  };

  // Función para realizar el fetch de servicios recomendados
  const fetchServiciosRecomendados = async () => {
    try {
      // Realizar la solicitud solo si el authState está en true
      if (authState) {
        // Realizar el fetch y actualizar el estado
        const response = await axios.get(`${API_BASE_URL}/servicios/algoritmo`);
        setServiciosRecomendados(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setDestinosRecomendados([])
      setIsLoading(false);
    }
  };

  async function fetchAlgoritmo() {
    fetchDestinosRecomendados();
    fetchServiciosRecomendados();
  }
  // Usar useEffect para realizar los fetch cuando el authState cambie
  useEffect(() => {
    if (authState) {
      fetchAlgoritmo()
    }
  }, [authState]);

  // Context value
  const contextValue = {
    DestinosRecomendados,
    ServiciosRecomendados,
    isLoading,
    fetchAlgoritmo,
  };

  return (
    <AlgoritmoContext.Provider value={contextValue}>
      {children}
    </AlgoritmoContext.Provider>
  );
};
