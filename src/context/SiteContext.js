import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Create the context
export const SiteContext = createContext();

// Create a context provider component
export const SiteProvider = ({ children }) => {
  // Define the state for your sites
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchSites = async () => {
    try {
      // Check if the JWT exists in SecureStore
      const jwt = await SecureStore.getItemAsync('my-jwt');
  
      
      // Simulate a 1-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const response = await axios.get('https://62918ba8cd0c91932b646bdc.mockapi.io/api/v1/Sitio');
      setSites(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching sites:', error);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchSites();
  }, []);

  // Function to reload data
  const reloadData = () => {
    setIsLoading(true);
    fetchSites();
  };

  // Create the context value object
  const contextValue = {
    sites,
    isLoading,
    reloadData, // Add the reloadData function to the context value
  };

  // Render the children components within the context provider
  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
};
