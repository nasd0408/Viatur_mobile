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
      console.log('Error fetching servicio turistico:', error);
      setIsLoading(false);
    }
  };
  
/*
  const fetchServicioTuristico = () =>{
    setServicioTuristico([
      {
        "id": 1,
        "prestadorId": 1,
        "destinoId": 1,
        "nombre": "Hotel ABC",
        "dirección": "123 Main Street",
        "descripción": "Un hermoso hotel con vistas al mar",
        "precio": 150.00,
        "estado": "Activo",
        "creado": "2023-06-20T09:00:00Z",
        "actualizado": "2023-06-20T09:00:00Z",
        "eliminado": null
      },
    
      {
        "id": 2,
        "prestadorId": 3,
        "destinoId": 1,
        "nombre": "Restaurante XYZ",
        "dirección": "789 Food Street",
        "descripción": "Deliciosa comida local con un ambiente acogedor",
        "precio": 30.00,
        "estado": "Activo",
        "creado": "2023-06-20T11:00:00Z",
        "actualizado": "2023-06-20T11:00:00Z",
        "eliminado": null
      },
      
    ]
    )
    setGaleria([ {
      "id": 1,
      "serviciosId": 1,
      "url": "https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "tipo": "paisaje",
      "creado": "2023-06-18T09:15:00Z",
      "actualizado": "2023-06-18T09:15:00Z",
      "eliminado": null
    },
    {
      "id": 2,
      "serviciosId": 1,
      "url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "tipo": "paisaje",
      "creado": "2023-06-18T09:15:00Z",
      "actualizado": "2023-06-18T09:15:00Z",
      "eliminado": null
    },
    {
      "id": 3,
      "serviciosId": 1,
      "url": "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
      "tipo": "actividad",
      "creado": "2023-06-18T09:15:00Z",
      "actualizado": "2023-06-18T09:15:00Z",
      "eliminado": null
    },
    {
      "id": 4,
      "serviciosId": 2,
      "url": "https://images.unsplash.com/photo-1479044769763-c28e05b5baa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "tipo": "paisaje",
      "creado": "2023-06-19T10:30:00Z",
      "actualizado": "2023-06-19T10:30:00Z",
      "eliminado": null
    },
    {
      "id": 5,
      "serviciosId": 2,
      "url": "https://images.unsplash.com/photo-1549648184-0d3e8b8684fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "tipo": "actividad",
      "creado": "2023-06-19T10:30:00Z",
      "actualizado": "2023-06-19T10:30:00Z",
      "eliminado": null
    }])
    setIsLoading(false)
  }*/
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
