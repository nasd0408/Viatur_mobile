import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const RutasContext = createContext();

export const RutasProvider = ({ children }) => {
  const [rutas, setRutas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*const fetchRutas = async () => {
    try {
      const jwt = await SecureStore.getItemAsync('my-jwt');

      if (jwt) {
        console.log('JWT:', jwt);
      } else {
        console.log('No JWT found.');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get('API_URL/rutas');
      setRutas(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching rutas:', error);
      setIsLoading(false);
    }
  };
*/

const fetchRutas= () =>{
    setRutas([
        {
          "id": 1,
          "nombre": "Ruta A",
          "descripcion": "Esta es la Ruta A",
          "sitios": [1, 3, 5],
          "servicios": [1, 2]
        },
        {
          "id": 2,
          "nombre": "Ruta B",
          "descripcion": "Esta es la Ruta B",
          "sitios": [2, 4],
          "servicios": [1]
        },
        {
          "id": 3,
          "nombre": "Ruta C",
          "descripcion": "Esta es la Ruta C",
          "sitios": [1, 2, 3],
          "servicios": [2]
        },
        {
          "id": 4,
          "nombre": "Ruta D",
          "descripcion": "Esta es la Ruta C",
          "sitios": [1, 2, 3],
          "servicios": [2]
        },
        {
          "id": 5,
          "nombre": "Ruta E",
          "descripcion": "Esta es la Ruta C",
          "sitios": [1, 2, 3],
          "servicios": [2]
        },
        {
          "id": 6,
          "nombre": "Ruta F",
          "descripcion": "Esta es la Ruta C",
          "sitios": [1, 2, 3],
          "servicios": [2]
        },
        {
          "id": 7,
          "nombre": "Ruta G",
          "descripcion": "Esta es la Ruta C",
          "sitios": [1, 2, 3],
          "servicios": [2]
        },
        {
          "id": 8,
          "nombre": "Ruta H",
          "descripcion": "Esta es la Ruta C",
          "sitios": [1, 2, 3],
          "servicios": [2]
        },
      ]
      )
}
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
