import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Create the context
export const PromocionContext = createContext();

// Create a context provider component
export const PromocionProvider = ({ children }) => {
  // Define the state for your promociones
  const [promociones, setPromociones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [galeria, setGaleria] = useState([])

  /*const fetchPromociones = async () => {
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

      // Fetch promociones from the API
      const response = await axios.get('API_URL/promociones');
      setPromociones(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching promociones:', error);
      setIsLoading(false);
    }
  };
*/
const fetchPromociones = () =>{
    setPromociones([
        {
          "id": 1,
          "servicioTuristicoId": 1,
          "nombre": "Promoción Hotel ABC - Verano",
          "descripcion": "¡Reserva ahora y obtén un 20% de descuento en el Hotel ABC durante el verano!",
          "precio": 120.00,
          "fechaInicio": "2023-07-01",
          "fechaFin": "2023-08-31",
          "estado": "Activa",
          "creado": "2023-06-25T09:00:00Z",
          "actualizado": "2023-06-25T09:00:00Z",
          "eliminado": null
        },
        {
          "id": 2,
          "servicioTuristicoId": 1,
          "nombre": "Promoción Hotel ABC - Fin de semana",
          "descripcion": "¡Reserva ahora y obtén un 10% de descuento en el Hotel ABC para estancias durante los fines de semana!",
          "precio": 135.00,
          "fechaInicio": "2023-07-10",
          "fechaFin": "2023-12-31",
          "estado": "Activa",
          "creado": "2023-06-28T14:00:00Z",
          "actualizado": "2023-06-28T14:00:00Z",
          "eliminado": null
        },
        {
          "id": 3,
          "servicioTuristicoId": 2,
          "nombre": "Promoción Restaurante XYZ - Happy Hour",
          "descripcion": "¡Disfruta de bebidas al 2x1 durante nuestro Happy Hour en el Restaurante XYZ!",
          "precio": 27.00,
          "fechaInicio": "2023-07-01",
          "fechaFin": "2023-07-31",
          "estado": "Activa",
          "creado": "2023-06-30T10:00:00Z",
          "actualizado": "2023-06-30T10:00:00Z",
          "eliminado": null
        },
        {
          "id": 4,
          "servicioTuristicoId": 2,
          "nombre": "Promoción Restaurante XYZ - Cena Romántica",
          "descripcion": "¡Reserva una cena para dos y recibe un postre gratis en el Restaurante XYZ!",
          "precio": 50.00,
          "fechaInicio": "2023-07-15",
          "fechaFin": "2023-08-31",
          "estado": "Activa",
          "creado": "2023-07-02T15:00:00Z",
          "actualizado": "2023-07-02T15:00:00Z",
          "eliminado": null
        }
      ]
      );
      setGaleria([ {
        "id": 1,
        "promocionId": 1,
        "url": "https://images.unsplash.com/photo-1512106374988-c95f566d39ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
      {
        "id": 2,
        "promocionId": 2,
        "url": "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
      {
        "id": 3,
        "promocionId": 3,
        "url": "https://images.unsplash.com/photo-1531303435785-3853ba035cda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
      {
        "id": 4,
        "promocionId": 4,
        "url": "https://images.unsplash.com/photo-1642521113770-11e169c272cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        "tipo": "paisaje",
        "creado": "2023-06-18T09:15:00Z",
        "actualizado": "2023-06-18T09:15:00Z",
        "eliminado": null
      },
    ])
      setIsLoading(false)
}
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
    galeria,
    reloadData, // Add the reloadData function to the context value
  };

  // Render the children components within the context provider
  return (
    <PromocionContext.Provider value={contextValue}>
      {children}
    </PromocionContext.Provider>
  );
};
