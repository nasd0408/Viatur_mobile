import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
 const [data, setData] = useState({
  "serviciosTuristicos": [
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
      "prestadorId": 2,
      "destinoId": 2,
      "nombre": "Tour de Aventura",
      "dirección": "456 Adventure Avenue",
      "descripción": "Una emocionante aventura llena de adrenalina",
      "precio": 75.00,
      "estado": "Activo",
      "creado": "2023-06-20T10:00:00Z",
      "actualizado": "2023-06-20T10:00:00Z",
      "eliminado": null
    },
    {
      "id": 3,
      "prestadorId": 3,
      "destinoId": 3,
      "nombre": "Restaurante XYZ",
      "dirección": "789 Food Street",
      "descripción": "Deliciosa comida local con un ambiente acogedor",
      "precio": 30.00,
      "estado": "Activo",
      "creado": "2023-06-20T11:00:00Z",
      "actualizado": "2023-06-20T11:00:00Z",
      "eliminado": null
    },
    {
      "id": 4,
      "prestadorId": 4,
      "destinoId": 4,
      "nombre": "Spa Paradise",
      "dirección": "987 Relaxation Road",
      "descripción": "Un lugar tranquilo para relajarse y rejuvenecer",
      "precio": 100.00,
      "estado": "Activo",
      "creado": "2023-06-20T12:00:00Z",
      "actualizado": "2023-06-20T12:00:00Z",
      "eliminado": null
    },
    {
      "id": 5,
      "prestadorId": 5,
      "destinoId": 5,
      "nombre": "Tour Histórico",
      "dirección": "321 History Lane",
      "descripción": "Un recorrido por los lugares históricos de la ciudad",
      "precio": 50.00,
      "estado": "Activo",
      "creado": "2023-06-20T13:00:00Z",
      "actualizado": "2023-06-20T13:00:00Z",
      "eliminado": null
    }
  ],
  "destinosTuristicos": [
    {
      "id": 1,
      "areaGeograficaId": 1,
      "nombre": "Playa ABC",
      "ciudad": "Ciudad ABC",
      "municipio": "Municipio ABC",
      "estado": "Estado ABC",
      "dirección": "123 Beach Street",
      "descripción": "Hermosa playa con aguas cristalinas",
      "horario": "9:00 AM - 6:00 PM",
      "mejorEpoca": "Verano",
      "historiaCultura": "Rica historia y cultura local",
      "gastronomía": "Platos tradicionales y mariscos frescos",
      "latitud": "12.345678",
      "longitud": "-87.654321",
      "estado2": "Activo",
      "creado": "2023-06-20T09:00:00Z",
      "actualizado": "2023-06-20T09:00:00Z",
      "eliminado": null
    },
    {
      "id": 2,
      "areaGeograficaId": 2,
      "nombre": "Montaña XYZ",
      "ciudad": "Ciudad XYZ",
      "municipio": "Municipio XYZ",
      "estado": "Estado XYZ",
      "dirección": "456 Mountain Road",
      "descripción": "Impresionantes paisajes de montaña para excursionistas",
      "horario": "8:00 AM - 5:00 PM",
      "mejorEpoca": "Primavera y otoño",
      "historiaCultura": "Rica historia y cultura de la población indígena",
      "gastronomía": "Platos autóctonos y comida campesina",
      "latitud": "12.345678",
      "longitud": "-87.654321",
      "estado2": "Activo",
      "creado": "2023-06-20T10:00:00Z",
      "actualizado": "2023-06-20T10:00:00Z",
      "eliminado": null
    },
    {
      "id": 3,
      "areaGeograficaId": 1,
      "nombre": "Pueblo Histórico",
      "ciudad": "Ciudad Histórica",
      "municipio": "Municipio Histórico",
      "estado": "Estado Histórico",
      "dirección": "789 Historical Street",
      "descripción": "Un encantador pueblo lleno de historia y arquitectura colonial",
      "horario": "10:00 AM - 6:00 PM",
      "mejorEpoca": "Todo el año",
      "historiaCultura": "Importante patrimonio histórico y cultural",
      "gastronomía": "Platos tradicionales y postres típicos",
      "latitud": "12.345678",
      "longitud": "-87.654321",
      "estado2": "Activo",
      "creado": "2023-06-20T11:00:00Z",
      "actualizado": "2023-06-20T11:00:00Z",
      "eliminado": null
    },
    {
      "id": 4,
      "areaGeograficaId": 3,
      "nombre": "Ruta Vinícola",
      "ciudad": "Ciudad del Vino",
      "municipio": "Municipio del Vino",
      "estado": "Estado del Vino",
      "dirección": "987 Vineyard Street",
      "descripción": "Recorrido por las mejores bodegas y degustación de vinos",
      "horario": "11:00 AM - 7:00 PM",
      "mejorEpoca": "Otoño",
      "historiaCultura": "Tradiciones vitivinícolas centenarias",
      "gastronomía": "Maridaje con platos gourmet y productos locales",
      "latitud": "12.345678",
      "longitud": "-87.654321",
      "estado2": "Activo",
      "creado": "2023-06-20T12:00:00Z",
      "actualizado": "2023-06-20T12:00:00Z",
      "eliminado": null
    },
    {
      "id": 5,
      "areaGeograficaId": 2,
      "nombre": "Parque Nacional",
      "ciudad": "Ciudad Nacional",
      "municipio": "Municipio Nacional",
      "estado": "Estado Nacional",
      "dirección": "321 National Park Road",
      "descripción": "Reserva natural con diversidad de flora y fauna",
      "horario": "7:00 AM - 6:00 PM",
      "mejorEpoca": "Invierno",
      "historiaCultura": "Lugares sagrados para las comunidades indígenas",
      "gastronomía": "Platos típicos de la región y comidas al aire libre",
      "latitud": "12.345678",
      "longitud": "-87.654321",
      "estado2": "Activo",
      "creado": "2023-06-20T13:00:00Z",
      "actualizado": "2023-06-20T13:00:00Z",
      "eliminado": null
    }
  ],
  "clasificaciones": [
    {
      "servicioTuristicoId": 1,
      "categoriaId": 1,
      "areaGeograficaId": 1,
      "tipoProdServ": 1
    },
    {
      "servicioTuristicoId": 2,
      "categoriaId": 2,
      "areaGeograficaId": 2,
      "tipoProdServ": 2
    },
    {
      "servicioTuristicoId": 3,
      "categoriaId": 3,
      "areaGeograficaId": 1,
      "tipoProdServ": 3
    },
    {
      "servicioTuristicoId": 4,
      "categoriaId": 4,
      "areaGeograficaId": 3,
      "tipoProdServ": 4
    },
    {
      "servicioTuristicoId": 5,
      "categoriaId": 5,
      "areaGeograficaId": 2,
      "tipoProdServ": 5
    }
  ],
  "areasGeograficas": [
    {
      "id": 1,
      "descripcion": "Playas"
    },
    {
      "id": 2,
      "descripcion": "Montañas"
    },
    {
      "id": 3,
      "descripcion": "Valles"
    },
    {
      "id": 4,
      "descripcion": "Bosques"
    },
    {
      "id": 5,
      "descripcion": "Islas"
    }
  ],
  "categorias": [
    {
      "id": 1,
      "descripcion": "Recreativa"
    },
    {
      "id": 2,
      "descripcion": "Aventura"
    },
    {
      "id": 3,
      "descripcion": "Gastronómica"
    },
    {
      "id": 4,
      "descripcion": "Religiosa"
    },
    {
      "id": 5,
      "descripcion": "Cultural"
    }
  ],
  "tipoProdServ": [
    {
      "id": 1,
      "descripcion": "Transporte",
      "tipo": "Servicio"
    },
    {
      "id": 2,
      "descripcion": "Alojamiento",
      "tipo": "Servicio"
    },
    {
      "id": 3,
      "descripcion": "Restaurante",
      "tipo": "Producto"
    },
    {
      "id": 4,
      "descripcion": "Spa",
      "tipo": "Servicio"
    },
    {
      "id": 5,
      "descripcion": "Tour",
      "tipo": "Servicio"
    }
  ],
  "galeriaDestinos": [
    {
      "id": 1,
      "destinoId": 1,
      "url": "https://example.com/imagen1.jpg",
      "tipo": "Foto",
      "creado": "2023-06-20T09:00:00Z",
      "actualizado": "2023-06-20T09:00:00Z",
      "eliminado": null
    },
    {
      "id": 2,
      "destinoId": 1,
      "url": "https://example.com/imagen2.jpg",
      "tipo": "Foto",
      "creado": "2023-06-20T10:00:00Z",
      "actualizado": "2023-06-20T10:00:00Z",
      "eliminado": null
    },
    {
      "id": 3,
      "destinoId": 2,
      "url": "https://example.com/imagen3.jpg",
      "tipo": "Foto",
      "creado": "2023-06-20T11:00:00Z",
      "actualizado": "2023-06-20T11:00:00Z",
      "eliminado": null
    }
  ],
  "galeriaServicios": [
    {
      "id": 1,
      "serviciosId": 1,
      "url": "https://example.com/imagen4.jpg",
      "tipo": "Foto",
      "creado": "2023-06-20T09:00:00Z",
      "actualizado": "2023-06-20T09:00:00Z",
      "eliminado": null
    },
    {
      "id": 2,
      "serviciosId": 2,
      "url": "https://example.com/imagen5.jpg",
      "tipo": "Foto",
      "creado": "2023-06-20T10:00:00Z",
      "actualizado": "2023-06-20T10:00:00Z",
      "eliminado": null
    },
    {
      "id": 3,
      "serviciosId": 3,
      "url": "https://example.com/imagen6.jpg",
      "tipo": "Foto",
      "creado": "2023-06-20T11:00:00Z",
      "actualizado": "2023-06-20T11:00:00Z",
      "eliminado": null
    }
  ],
  "promociones": [
    {
      "id": 1,
      "servicioTuristicoId": 1,
      "nombre": "Promoción Playa ABC",
      "descripción": "Disfruta de nuestras mejores playas con descuentos especiales",
      "precio": 50.0,
      "fechaInicio": "2023-06-20",
      "fechaFin": "2023-06-30",
      "estado": "Activa",
      "creado": "2023-06-20T09:00:00Z",
      "actualizado": "2023-06-20T09:00:00Z",
      "eliminado": null
    },
    {
      "id": 2,
      "servicioTuristicoId": 2,
      "nombre": "Promoción Montaña XYZ",
      "descripción": "Explora las maravillas de la montaña con tarifas reducidas",
      "precio": 75.0,
      "fechaInicio": "2023-06-20",
      "fechaFin": "2023-06-30",
      "estado": "Activa",
      "creado": "2023-06-20T10:00:00Z",
      "actualizado": "2023-06-20T10:00:00Z",
      "eliminado": null
    },
    {
      "id": 3,
      "servicioTuristicoId": 3,
      "nombre": "Promoción Pueblo Histórico",
      "descripción": "Descubre la magia del pueblo histórico con precios especiales",
      "precio": 30.0,
      "fechaInicio": "2023-06-20",
      "fechaFin": "2023-06-30",
      "estado": "Activa",
      "creado": "2023-06-20T11:00:00Z",
      "actualizado": "2023-06-20T11:00:00Z",
      "eliminado": null
    },
    {
      "id": 4,
      "servicioTuristicoId": 4,
      "nombre": "Promoción Ruta Vinícola",
      "descripción": "Disfruta de catas y recorridos por bodegas a precios especiales",
      "precio": 60.0,
      "fechaInicio": "2023-06-20",
      "fechaFin": "2023-06-30",
      "estado": "Activa",
      "creado": "2023-06-20T12:00:00Z",
      "actualizado": "2023-06-20T12:00:00Z",
      "eliminado": null
    },
    {
      "id": 5,
      "servicioTuristicoId": 5,
      "nombre": "Promoción Parque Nacional",
      "descripción": "Descubre la belleza natural del parque con precios promocionales",
      "precio": 40.0,
      "fechaInicio": "2023-06-20",
      "fechaFin": "2023-06-30",
      "estado": "Activa",
      "creado": "2023-06-20T13:00:00Z",
      "actualizado": "2023-06-20T13:00:00Z",
      "eliminado": null
    }
  ]
}
)

  const appContextValue = {
    data,
    setData
    // You can add more context values here
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
