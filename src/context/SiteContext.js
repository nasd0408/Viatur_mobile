import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../utils/dev';


// Create the context
export const SiteContext = createContext();

// Create a context provider component
export const SiteProvider = ({ children }) => {
  // Define the state for your sites
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [galeria, setGaleria] = useState([])


  const fetchSites = async () => {
    try {
      // Check if the JWT exists in SecureStore
      const jwt = await SecureStore.getItemAsync('my-jwt');
  
      const response = await axios.get(`${API_BASE_URL}/destinos`);
      setSites(response.data.data);
      setGaleria([ {
        "id": 1,
        "destinoId": 1,
        "url": "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
      {
        "id": 2,
        "destinoId": 1,
        "url": "https://images.unsplash.com/photo-1464131065363-9e30e13470f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
      {
        "id": 3,
        "destinoId": 1,
        "url": "https://images.unsplash.com/photo-1497384401032-2182d2687715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "tipo": "actividad",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
      {
        "id": 4,
        "destinoId": 2,
        "url": "https://plus.unsplash.com/premium_photo-1676517028705-5dddae9ab1d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 5,
        "destinoId": 2,
        "url": "https://images.unsplash.com/photo-1598105729174-32b798d63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 6,
        "destinoId": 2,
        "url": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 7,
        "destinoId": 3,
        "url": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 8,
        "destinoId": 3,
        "url": "https://images.unsplash.com/photo-1542662565-7e4b66bae529?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 9,
        "destinoId": 3,
        "url": "https://plus.unsplash.com/premium_photo-1664353833827-5687c58b033b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 10,
        "destinoId": 4,
        "url": "https://images.unsplash.com/photo-1513038630932-13873b1a7f29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 11,
        "destinoId": 5,
        "url": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 12,
        "destinoId": 5,
        "url": "https://images.unsplash.com/photo-1584706368162-73c7dab84d68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 13,
        "destinoId": 5,
        "url": "https://images.unsplash.com/photo-1574031493536-05e45f214ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      {
        "id": 14,
        "destinoId": 5,
        "url": "https://images.unsplash.com/photo-1524272332618-3a94122bb0c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "tipo": "actividad",
        "creado": "2023-06-19T10:30:00Z",
        "actualizado": "2023-06-19T10:30:00Z",
        "eliminado": null
      },
      ])
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
    galeria,
    reloadData, // Add the reloadData function to the context value
  };

  // Render the children components within the context provider
  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
};