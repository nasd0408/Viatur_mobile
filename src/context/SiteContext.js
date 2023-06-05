import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const SiteContext = createContext();

// Create a context provider component
export const SiteProvider = ({ children }) => {
  // Define the state for your sites
  const [sites, setSites] = useState([]);

  // Fetch the sites data using useEffect
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get('https://62918ba8cd0c91932b646bdc.mockapi.io/api/v1/Sitio');
        setSites(response.data);
      } catch (error) {
        console.log('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, []);

  // Create the context value object
  const contextValue = {
    sites,
  };

  // Render the children components within the context provider
  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
};
