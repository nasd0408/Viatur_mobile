import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import CommentSection from '../components/CommentSection/CommentSection';
import { SiteContext } from '../context/SiteContext';

const DetailSiteScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };

  if (!item) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  // Find gallery images matching the site ID
  const { galeria } = useContext(SiteContext);
  const siteGalleryImages = galeria.filter((img) => img.destinoId === item.id);

  return (
    <ScrollView style={styles.container}>
      <Text  variant='displaySmall' >{item.nombre}</Text>
      <View style={styles.galleryContainer}>
        <Text style={styles.label}>Galeria de imagenes </Text>
        <ScrollView horizontal={true}>
          {siteGalleryImages.map((photo) => (
            <Image key={photo.id} source={{ uri: photo.url }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ciudad:</Text>
        <Text style={styles.value}>{item.ciudad}</Text>

        <Text style={styles.label}>queloque:</Text>
        <Text style={styles.value}>{item.municipio}</Text>


        <Text style={styles.label}>Direccion:</Text>
        <Text style={styles.value}>{item.dirección}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{item.descripción}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>Aqui ira el tipo</Text>

        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.value}>Aqui ira la categoria</Text>


        <Text style={styles.label}>Horario:</Text>
        <Text style={styles.value}>{item.horario}</Text>

        <Text style={styles.label}>Mejor epoca para visitar:</Text>
        <Text style={styles.value}>{item.mejorEpoca}</Text>

        <Text style={styles.label}>Historia y cultura:</Text>
        <Text style={styles.value}>{item.historiaCultura}</Text>

        <Text style={styles.label}>Gastronomia:</Text>
        <Text style={styles.value}>{item.gastronomía}</Text>





        <CommentSection siteId={item.id} />



      </View>

      <Button onPress={handleGoBack} mode='contained' style={styles.button}>
        Volver
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

export default DetailSiteScreen;
