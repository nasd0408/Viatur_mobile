import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../utils/dev';

export const RutasContext = createContext();

export const RutasProvider = ({ children }) => {
  const [rutas, setRutas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRutas = async () => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/rutas-turisticas`)    
      setRutas(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  
 
useEffect(() => {
    fetchRutas();
  }, []);

  const reloadData = () => {
    setIsLoading(true);
    fetchRutas();
  };

  const contextValue = {
    rutas,
    isLoading,
    reloadData,
  };

  return (
    <RutasContext.Provider value={contextValue}>
      {children}
    </RutasContext.Provider>
  );
};
