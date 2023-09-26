import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button, Divider, List, Title, IconButton, ActivityIndicator } from 'react-native-paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';
import CommentSection from '../components/CommentSection/CommentSection';
import { ScrollView } from 'react-native-gesture-handler';
import CompanyDetails from '../components/ContactosPrestador/CompanyDetails';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { item: service } = route.params;

  const [imageServicioUrls, setImageServicioUrls] = useState([]); // Initialize as an empty array
  const [imageDestinoUrls, setImageDestinoUrls] = useState([]); // Initialize as an empty array
  const [servicio, setServicio] = useState({})
  const [isLoading, setisLoading] = useState(true)
  const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1488489153583-89ce18dd4968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

useEffect(() => {
  const getServicioData = async (servicioId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servicios/${servicioId}`);
      setServicio(response.data.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };
  getServicioData(service.id);
}, [service.id]);

useEffect(() => {
  const getServicioImage = async (servicioId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/galeria-servicio/${servicioId}/servicio`
        );
      

      const imageServicioUrls = data.data.map((image) => {
        return image
          ? `${API_BASE_URL}/galeria-servicio/${image.archivo}`
          : DEFAULT_IMAGE_URL;
      });

      setImageServicioUrls(imageServicioUrls);
    } catch (e) {
      setImageServicioUrls([DEFAULT_IMAGE_URL]);
    }
  };
  getServicioImage(service.id);
}, [service.id]);

useEffect(() => {
  const getDestinoImage = async (destinoId) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/galeria-destino/${destinoId}/destino`
        );

      const imageDestinoUrls = data.data.map((image) => {
        return image
          ? `${API_BASE_URL}/galeria-destino/${image.archivo}`
          : DEFAULT_IMAGE_URL;
      });

      setImageDestinoUrls(imageDestinoUrls);
    } catch (e) {
      setImageDestinoUrls([DEFAULT_IMAGE_URL]);
    }
  };
  getDestinoImage(service.destino.id);
}, [service.destino.id]);
if (isLoading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} />
    </View>
  );
}

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageServicioUrls[0] }} style={styles.bannerImage} />

      <View style={styles.sectionContainer}>
        <Title>{servicio.nombre}</Title>
        <Divider style={styles.divider} />
        <List.Section>
          <List.Item title="Ofrecido por" description={servicio.prestador.nombre} />
          <List.Item title="Con destino a" description={servicio.destino.nombre} />
        </List.Section>
        <Title>Detalles del Servicio</Title>
        <Divider style={styles.divider} />
        <List.Section>

          <List.Item title="Dirección" description={servicio.direccion} />
          <List.Item title="Descripción" description={servicio.descripcion} />
          <List.Item title="Precio" description={`$${servicio.precio}`} />
          {/* Mostrar otros atributos del servicio */}
        </List.Section>
      </View>

      <View style={styles.sectionContainer}>
        <Title>Galería del Destino</Title>
        <Divider style={styles.divider} />
        <ScrollView horizontal>
      {imageDestinoUrls.map((imageUrl, index) => (
        <View key={index} style={{ marginRight: 10 }}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      ))}
    </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Title>Galería del Servicio</Title>
        <Divider style={styles.divider} />
        <ScrollView horizontal>
          {imageServicioUrls.map((imageUrl, index) => (
            <View key={index} style={{ marginRight: 10 }}>
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 200, height: 200 }}
              />

            </View>
          ))}
        </ScrollView>
      </View>
      <CommentSection EntidadId={service.id} TipoEntidad="Servicio" />
      <CompanyDetails 
      companyName={servicio.prestador.nombre}
      contactNumber={servicio.prestador.telefono}
      prestadorId={servicio.prestador.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
  galleryImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginRight: 8,
  },
  companyDetailsContainer: {
    marginTop: 8,
  },
  companyInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  companyValue: {
    flex: 1,
  },
  socialMediaContainer: {
    flexDirection: 'row',
  },
});

export default ServiceDetailScreen;
