import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Divider, Title, Text, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';
import CompanyDetails from '../components/ContactosPrestador/CompanyDetails';

  const DetailRutaScreen = ({ route, navigation }) => {
    const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1488489153583-89ce18dd4968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

    const { item } = route.params;
    const [ruta, setRuta] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageServicioUrls, setImageServicioUrls] = useState([]);
  
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    useEffect(() => {
      fetchRutaById();
    }, []);
  
    const fetchRutaById = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/rutas-turisticas/${item.id}`);
        setRuta(response.data.data);
        setLoading(false);
  
        // Llamar a getServicioImage para cada servicio turístico
        const servicioImagePromises = response.data.data.serviciosTuristicos.map((servicio) =>
          getServicioImage(servicio.id)
        );
        
        // Esperar a que se completen todas las llamadas y obtener las imágenes
        const servicioImages = await Promise.all(servicioImagePromises);
        
        // Establecer las imágenes para cada servicio turístico
        setImageServicioUrls(servicioImages);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  
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
  
        return imageServicioUrls;
      } catch (e) {
        return [DEFAULT_IMAGE_URL];
      }
    };
  
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <Text variant='displaySmall' >{ruta.nombre}</Text>
      <Text variant='bodyLarge'>{ruta.descripcion}</Text>
      {ruta.serviciosTuristicos && 
      <Text variant='headlineSmall' style={{marginVertical:20}}>En esta ruta te ofreceremos los siguientes servicios</Text >
      }
      {ruta.serviciosTuristicos &&
      ruta.serviciosTuristicos.map((servicio, index) => (
        <View key={index}>
          <Divider ></Divider>
          <Text variant='headlineMedium' >{servicio.nombre}</Text>
          <Paragraph>{servicio.descripcion}</Paragraph>
          <View style={styles.sectionContainer}>
            <Text variant='bodyMedium' style={{marginTop:20}}>Un vistaso a esta oferta :</Text>
            <Divider style={styles.divider} />
            <ScrollView horizontal>
              {imageServicioUrls[index] && imageServicioUrls[index].map((imageUrl, i) => (
                <View key={i} style={{ marginRight: 10 }}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      ))}
      <Divider/>
      <Text variant='headlineMedium'>En esta ruta podras contar con los servicios de:</Text>
      {ruta.prestadoresDeServicio &&
        ruta.prestadoresDeServicio.map((prestador, index) => (
          <View key={index}>
            <CompanyDetails companyName={prestador.nombre} contactNumber={prestador.telefono} prestadorId={prestador.id} />
          </View>
        ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 18,
    marginBottom: 16,
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  galleryContainer: {
    marginBottom: 16,
  },
  galleryTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  galleryImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default DetailRutaScreen;
