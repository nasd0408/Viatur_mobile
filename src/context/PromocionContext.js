import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';

// Create the context
export const PromocionContext = createContext();

// Create a context provider component
export const PromocionProvider = ({ children }) => {
  // Define the state for your promociones
  const [promociones, setPromociones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPromociones = async () => {
    try {

  
      // Fetch promociones from the API
      const response = await axios.get(`${API_BASE_URL}/promociones/sin-morosos`)    
      setPromociones(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    fetchPromociones();
  }, []);

  // Function to reload data
  const reloadData = () => {
    setIsLoading(true);
    fetchPromociones();
  };

  // Create the context value object
  const contextValue = {
    promociones,
    isLoading,
    reloadData, // Add the reloadData function to the context value
  };

  // Render the children components within the context provider
  return (
    <PromocionContext.Provider value={contextValue}>
      {children}
    </PromocionContext.Provider>
  );
};
