import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Paragraph, ActivityIndicator} from 'react-native-paper';
import CommentSection from '../components/CommentSection/CommentSection';

const DetailScreen = ({ route, navigation }) => {
    const { item, cardType } = route.params;
    console.log(item);
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
  
    return (
      <ScrollView style={styles.container}>
        <Paragraph style={styles.title}>{item.nombre}</Paragraph>
        <Image source={{ uri: item.foto }} style={styles.image} />
  
        <View style={styles.infoContainer}>
          <Paragraph style={styles.label}>City:</Paragraph>
          <Paragraph style={styles.value}>{item.ciudad}</Paragraph>
  
          <Paragraph style={styles.label}>Municipality:</Paragraph>
          <Paragraph style={styles.value}>{item.municipio}</Paragraph>
  
          {cardType === 'servicios' && (
            <>
              <Paragraph style={styles.label}>Location:</Paragraph>
              <Paragraph style={styles.value}>
                Latitude: {item.mapaLatitude}, Longitude: {item.mapaLongitude}
              </Paragraph>
            </>
          )}
  
          <Paragraph style={styles.label}>Status:</Paragraph>
          <Paragraph style={styles.value}>{item.estado ? 'Active' : 'Inactive'}</Paragraph>
  
          <Paragraph style={styles.label}>Address:</Paragraph>
          <Paragraph style={styles.value}>{item.direccion}</Paragraph>
  
          <Paragraph style={styles.label}>Description:</Paragraph>
          <Paragraph style={styles.value}>{item.descripcion}</Paragraph>
  
          <Paragraph style={styles.label}>Type:</Paragraph>
          <Paragraph style={styles.value}>{item.tipo}</Paragraph>
  
          <Paragraph style={styles.label}>Category:</Paragraph>
          <Paragraph style={styles.value}>{item.categoria}</Paragraph>
  
          {cardType === 'sites' && (
            <>
              <Paragraph style={styles.label}>Schedule:</Paragraph>
              <Paragraph style={styles.value}>{item.horario}</Paragraph>
  
              <Paragraph style={styles.label}>Best Time to Visit:</Paragraph>
              <Paragraph style={styles.value}>{item.mejorEpoca}</Paragraph>
  
              <Paragraph style={styles.label}>Culture and History:</Paragraph>
              <Paragraph style={styles.value}>{item.historiaCultura}</Paragraph>
  
              <Paragraph style={styles.label}>Gastronomy:</Paragraph>
              <Paragraph style={styles.value}>{item.gastronomia}</Paragraph>
            </>
          )}
  
          <Paragraph style={styles.label}>Tourist Destination ID:</Paragraph>
          <Paragraph style={styles.value}>{item.id}</Paragraph>
            {cardType==='sites' && (

                <CommentSection siteId={item.id} />
            )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});

export default DetailScreen;
