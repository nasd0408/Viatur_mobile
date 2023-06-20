import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import CommentSection from '../components/CommentSection/CommentSection';

const DetailSiteScreen = ({ route, navigation }) => {
  const { item:site } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{site.Nombre}</Text>
      <Image source={{ uri: site.Foto }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{site.Ciudad}</Text>

        <Text style={styles.label}>Municipality:</Text>
        <Text style={styles.value}>{site.Municipio}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{site.Estado ? 'Active' : 'Inactive'}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{site.Direccion}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{site.Descripcion}</Text>

        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{site.Tipo}</Text>

        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{site.Categoria}</Text>

        <Text style={styles.label}>Schedule:</Text>
        <Text style={styles.value}>{site.Horario}</Text>

        <Text style={styles.label}>Best Time to Visit:</Text>
        <Text style={styles.value}>{site.MejorEpoca}</Text>

        <Text style={styles.label}>Culture and History:</Text>
        <Text style={styles.value}>{site.HistoriaCultura}</Text>

        <Text style={styles.label}>Gastronomy:</Text>
        <Text style={styles.value}>{site.Gstronomia}</Text>

        <Text style={styles.label}>Tourist Destination ID:</Text>
        <Text style={styles.value}>{site.id}</Text>

        <CommentSection siteId={site.id}/>
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

export default DetailSiteScreen;
