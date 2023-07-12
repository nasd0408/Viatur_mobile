import React from 'react';
import { useContext } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, Title,Text, Paragraph } from 'react-native-paper';

import { ServicioTuristicoContext } from '../context/ServiciosContext';
import { SiteContext } from '../context/SiteContext';

const DetailRutaScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };

  const { sites, isLoading: siteLoading, galeria: galeriaSitio } = useContext(SiteContext);
  const { servicioTuristico, isLoading: servicioLoading, galeria: galeriaServicio } = useContext(
    ServicioTuristicoContext
  );


  const buscarGaleriasDeSitios = (sitiosIds) => {
    const galerias = [];
    sitiosIds.forEach((sitioId) => {
      const sitio = sites.find((site) => site.id === sitioId);
      const imagenes = galeriaSitio.filter((img) => img.destinoId === sitioId);
      const galeria = imagenes.map((imagen) => imagen.url);
      galerias.push({ sitioId: sitio.id, nombre: sitio.nombre, galeria: galeria });
    });
    return galerias;
  };

  const buscarGaleriasDeServicios = (serviciosIds) => {
    const galerias = [];
    serviciosIds.forEach((servicioId) => {
      const servicio = servicioTuristico.find((servicio) => servicio.id === servicioId);
      const imagenes = galeriaServicio.filter((img) => img.serviciosId === servicioId);
      const galeria = imagenes.map((imagen) => imagen.url);
      galerias.push({ nombre: servicio.nombre, galeria: galeria });
    });
    return galerias;
  };

  const galeriasSitioAsociados = buscarGaleriasDeSitios(item.sitios);
  const galeriasServicioAsociados = buscarGaleriasDeServicios(item.servicios);

  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>{item.nombre}</Title>
      <Text style={styles.description}>{item.descripcion}</Text>

      <Text style={styles.sectionTitle}>Galerías</Text>
      <Text style={styles.sectionDescription}>Las galerías muestran imágenes de los sitios y servicios asociados a esta ruta.</Text>

      <View style={styles.sectionContainer}>
        <Title style={styles.subTitle}>Galería de los Sitios</Title>
        <Paragraph>Aqui encontraras imagenes de los sitios que recorre esta ruta</Paragraph>
        <Divider style={styles.divider} />
        {galeriasSitioAsociados.map((galeria, index) => (
          <View key={index} style={styles.galleryContainer}>
            <Title style={styles.galleryTitle}>{galeria.nombre}</Title>
            <ScrollView horizontal>
              {galeria.galeria.map((imageUrl, imageIndex) => (
                <Image key={imageIndex} source={{ uri: imageUrl }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Title style={styles.subTitle}>Galería de los Servicios</Title>
        <Paragraph>Aqui encontraras los servicios que puedes adquirir en esta ruta</Paragraph>
        <Divider style={styles.divider} />
        {galeriasServicioAsociados.map((galeria, index) => (
          <View key={index} style={styles.galleryContainer}>
            <Title style={styles.galleryTitle}>{galeria.nombre}</Title>
            <ScrollView horizontal>
              {galeria.galeria.map((imageUrl, imageIndex) => (
                <Image key={imageIndex} source={{ uri: imageUrl }} style={styles.galleryImage} />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
  sectionContainer: {
    marginBottom: 16,
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
});

export default DetailRutaScreen;
