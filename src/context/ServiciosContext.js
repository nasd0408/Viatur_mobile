import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';


// Create the context
export const ServicioTuristicoContext = createContext();

// Create a context provider component
export const ServicioTuristicoProvider = ({ children }) => {
  // Define the state for your servicio turistico
  const [servicioTuristico, setServicioTuristico] = useState([]);
  const [galeria, setGaleria] = useState([])
  const [isLoading, setIsLoading] = useState(true);

 const fetchServicioTuristico = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servicios`);
      setServicioTuristico(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchServicioTuristico();
  }, []);

  // Function to reload data
  const reloadData = () => {
    setIsLoading(true);
    fetchServicioTuristico();
  };

  // Create the context value object
  const contextValue = {
    servicioTuristico,
    isLoading,
    galeria,
    reloadData, // Add the reloadData function to the context value
  };

  // Render the children components within the context provider
  return (
    <ServicioTuristicoContext.Provider value={contextValue}>
      {children}
    </ServicioTuristicoContext.Provider>
  );
};
