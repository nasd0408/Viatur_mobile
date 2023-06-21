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
  const [galeria, setGaleria] = useState([])


 /* const fetchSites = async () => {
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
  

  */
 const fetchSites =()=>{
  setSites([ {
    "id": 1,
    "areaGeograficaId": 1,
    "nombre": "Lomas de Cubiro",
    "ciudad": "Barquisimeto",
    "municipio": "Jiménez",
    "estado": "Lara",
    "dirección": "Barquisimeto, Lara, Venezuela",
    "descripción": "Las Lomas de Cubiro son una hermosa formación montañosa ubicada en el estado Lara, Venezuela. Es un destino turístico popular debido a su paisaje pintoresco y agradable clima de montaña.",
    "horario": "Abierto todos los días, las 24 horas",
    "mejorEpoca": "La mejor época para visitar es durante la temporada seca, de noviembre a abril, cuando el clima es más agradable.",
    "historiaCultura": "Las Lomas de Cubiro son conocidas por su rica historia cultural. La zona ha sido habitada por indígenas y ha sido escenario de importantes eventos históricos.",
    "gastronomía": "La gastronomía local ofrece platos tradicionales como la arepa, la hallaca y el pabellón criollo, que son delicias para los visitantes.",
    "latitud": "9.787000",
    "longitud": "-69.583917",
    "estado2": "Activo",
    "creado": "2023-06-18T09:15:00Z",
    "actualizado": "2023-06-18T09:15:00Z",
    "eliminado": null
  },
  {
    "id": 2,
    "areaGeograficaId": 1,
    "nombre": "La Olla",
    "ciudad": "Carora",
    "municipio": "Torres",
    "estado": "Lara",
    "dirección": "Carora, Lara, Venezuela",
    "descripción": "La Olla es un lugar turístico muy popular en el estado Lara, conocido por sus hermosas piscinas naturales y cascadas. Es un destino perfecto para disfrutar de la naturaleza y refrescarse en días calurosos.",
    "horario": "Abierto todos los días de 8:00 am a 6:00 pm",
    "mejorEpoca": "La mejor época para visitar La Olla es durante la temporada de lluvias, de mayo a octubre, cuando las cascadas están en su máximo esplendor.",
    "historiaCultura": "La Olla ha sido un lugar histórico y cultural importante para la región. Los indígenas locales consideraban este lugar sagrado y se realizaban rituales en sus alrededores.",
    "gastronomía": "En los alrededores de La Olla se pueden encontrar restaurantes que ofrecen platos típicos de la región, como asados, pescados y platos a base de maíz.",
    "latitud": "9.842674",
    "longitud": "-69.216661",
    "estado2": "Activo",
    "creado": "2023-06-19T10:30:00Z",
    "actualizado": "2023-06-19T10:30:00Z",
    "eliminado": null
  }
],
)
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
}])
  setIsLoading(false)
 }
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