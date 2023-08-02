import React, { useContext } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Text, Button, Divider, List, Title, IconButton } from 'react-native-paper';
import { SiteContext } from '../context/SiteContext';
import { ServicioTuristicoContext } from '../context/ServiciosContext';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { item: service } = route.params;

  const { galeria: galeriaSitio } = useContext(SiteContext);
  const siteGalleryImages = galeriaSitio.filter((img) => img.destinoId === service.destinoId);

  const { galeria: galeriaServicio } = useContext(ServicioTuristicoContext);
  const serviceGalleryImages = galeriaServicio.filter((img) => img.serviciosId === service.id);

  const findImageForService = (servicioId) => {
    const image = galeriaServicio.find((img) => img.serviciosId === servicioId);
    return image ? image.url : 'https://source.unsplash.com/random';
  };

  const serviceImage = findImageForService(service.id);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: serviceImage }} style={styles.bannerImage} />

      <View style={styles.sectionContainer}>
        <Title>{service.nombre}</Title>
        <Divider style={styles.divider} />
        <List.Section>
          <List.Item title="Ofrecido por" description={service.prestador.nombre} />
          <List.Item title="Con destino a" description={service.destino.nombre} />
        </List.Section>
        <Title>Detalles del Servicio</Title>
        <Divider style={styles.divider} />
        <List.Section>
          
          <List.Item title="Dirección" description={service.direccion} />
          <List.Item title="Descripción" description={service.descripcion} />
          <List.Item title="Precio" description={`$${service.precio}`} />
          {/* Mostrar otros atributos del servicio */}
        </List.Section>
      </View>

      <View style={styles.sectionContainer}>
        <Title>Galería del Destino</Title>
        <Divider style={styles.divider} />
        <ScrollView horizontal>
          {siteGalleryImages.map((image, index) => (
            <Image key={index} source={{ uri: image.url }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Title>Galería del Servicio</Title>
        <Divider style={styles.divider} />
        <ScrollView horizontal>
          {serviceGalleryImages.map((image, index) => (
            <Image key={index} source={{ uri: image.url }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Title>Detalles de la Empresa</Title>
        <Divider style={styles.divider} />

        <View style={styles.companyDetailsContainer}>
          <View style={styles.companyInfoContainer}>
            <Text style={styles.companyLabel}>Nombre de la Empresa:</Text>
            <Text style={styles.companyValue}>Empresa Ejemplo S.A.</Text>
          </View>

          <View style={styles.companyInfoContainer}>
            <Text style={styles.companyLabel}>Número de Contacto:</Text>
            <Text style={styles.companyValue}>+1 234 567 890</Text>
          </View>

          <View style={styles.companyInfoContainer}>
            <Text style={styles.companyLabel}>Redes Sociales:</Text>
            <View style={styles.socialMediaContainer}>
              <IconButton
                icon="facebook"
                color="#4267B2"
                size={24}
                onPress={() => {}}
              />
              <IconButton
                icon="instagram"
                color="#C13584"
                size={24}
                onPress={() => {}}
              />
              <IconButton
                icon="twitter"
                color="#1DA1F2"
                size={24}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
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
