import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import CommentSection from '../components/CommentSection/CommentSection';
import { SiteContext } from '../context/SiteContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';


const DetailScreen = ({ route, navigation }) => {
  const [destino, setdestino] = useState([])
  const [loading, setLoading] = useState(true)
  const { destinoId } = route.params;
  useEffect(() => {
    fetchDestinoById();
  }, []);

  const fetchDestinoById = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/destinos/search/${destinoId}`);
      setdestino(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
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
      <Text style={styles.title}>{destino.nombre}</Text>
      <View style={styles.galleryContainer}>
        <Text style={styles.label}>Galeria de imagenes </Text>
        <ScrollView horizontal={true}>
          {destino.galerias.map((photo) => (
            <Image key={photo.id} source={{ uri: `${API_BASE_URL}/galeria-destino/${photo.archivo}` }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ciudad:</Text>
        <Text style={styles.value}>{destino.ciudad}</Text>

        <Text style={styles.label}>Municipio:</Text>
        <Text style={styles.value}>{destino.municipio}</Text>

        <Text style={styles.label}>Direccion:</Text>
        <Text style={styles.value}>{destino.direccion}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{destino.descripcion}</Text>

        {destino.bioma && (
          <>
            <Text style={styles.label}>Este lugar se encuentra en:</Text>
            <Text style={styles.value}>{destino.bioma.descripcion}</Text>
          </>
        )}

        {destino.clima && (
          <>
            <Text style={styles.label}>Disfruta de un clima:</Text>
            <Text style={styles.value}>{destino.clima.descripcion}</Text>
          </>
        )}

        {destino.gastronomia && (
          <>
            <Text style={styles.label}>Degusta la deliciosa gastronomía local:</Text>
            <Text style={styles.value}>{destino.gastronomia.descripcion}</Text>
          </>
        )}

        {destino.diversidadBiologica && (
          <>
            <Text style={styles.label}>Explora la rica diversidad biológica:</Text>
            <Text style={styles.value}>{destino.diversidadBiologica.descripcion}</Text>
          </>
        )}

        {destino.temporadas && (
          <>
            <Text style={styles.label}>Visita en la temporada:</Text>
            <Text style={styles.value}>{destino.temporadas.descripcion}</Text>
          </>
        )}

        <CommentSection EntidadId={destino.id} TipoEntidad="Destino" />
      </View> 

      <Button onPress={handleGoBack} style={styles.button}>
        Go Back
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    marginBottom: 12,
  },
  button: {
    marginTop: 24,
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  galleryContainer: {
    marginTop: 16,
  },
  galleryImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    marginRight: 8,
  },
});

export default DetailScreen;
