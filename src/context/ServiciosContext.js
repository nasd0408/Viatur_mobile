import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Create the context
export const ServicioTuristicoContext = createContext();

// Create a context provider component
export const ServicioTuristicoProvider = ({ children }) => {
  // Define the state for your servicio turistico
  const [servicioTuristico, setServicioTuristico] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServicioTuristico = async () => {
    try {
      // Check if the JWT exists in SecureStore
      const jwt = await SecureStore.getItemAsync('my-jwt');
  
      if (jwt) {
        // If the JWT exists, log the token
        console.log('JWT:', jwt);
      } else {
        // If the JWT doesn't exist, log a message
        console.log('No JWT found.');
      }
  
      // Simulate a 1-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const response = await axios.get('https://648a115a5fa58521cab0bbc8.mockapi.io/ServiciosTuristicos');
      setServicioTuristico(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching servicio turistico:', error);
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
    reloadData, // Add the reloadData function to the context value
  };

  // Render the children components within the context provider
  return (
    <ServicioTuristicoContext.Provider value={contextValue}>
      {children}
    </ServicioTuristicoContext.Provider>
  );
};
