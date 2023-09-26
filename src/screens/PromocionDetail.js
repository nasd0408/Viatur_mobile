import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';
import { Divider, List, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import CommentSection from '../components/CommentSection/CommentSection';

const PromocionDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [isLoading, setIsLoading] = useState(true)
  const [promocion, setPromocion] = useState({})
  const [galeriaPromocionUrls, setGaleriaPromocionUrls] = useState([])
  const [imageServicioUrls, setImageServicioUrls] = useState([])
  // Primer useEffect para obtener datos de promoción e imágenes de promoción
  useEffect(() => {
    const fetchPromocionData = async () => {
      try {
        // Obtener los datos de la promoción
        const promocionResponse = await axios.get(`${API_BASE_URL}/promociones/${item.id}`);
        setPromocion(promocionResponse.data.data);

        // Obtener las imágenes de la promoción
        const promocionImagesResponse = await axios.get(
          `${API_BASE_URL}/galeria-promocion/${item.id}/promocion`
        );
        const imagePromocionUrls = promocionImagesResponse.data.data.map((image) => {
          return image ? `${API_BASE_URL}/galeria-promocion/${image.archivo}` : DEFAULT_IMAGE_URL;
        });
        setGaleriaPromocionUrls(imagePromocionUrls);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchPromocionData();
  }, [item.id]);

  // Segundo useEffect para obtener imágenes del servicio (solo cuando promocion.servicio existe)
  useEffect(() => {
    if (promocion && promocion.servicio) {
      const fetchServicioImages = async () => {
        try {
          const servicioImagesResponse = await axios.get(
            `${API_BASE_URL}/galeria-servicio/${promocion.servicio.id}/servicio`
          );
          const imageServicioUrls = servicioImagesResponse.data.data.map((image) => {
            return image
              ? `${API_BASE_URL}/galeria-servicio/${image.archivo}`
              : DEFAULT_IMAGE_URL;
          });
          setImageServicioUrls(imageServicioUrls);
        } catch (error) {
          console.error(error);
        }
      };

      fetchServicioImages();
    }
  }, [promocion]);

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
    <>
      <ScrollView style={styles.container}>
        <Image source={{ uri: galeriaPromocionUrls[0] }} style={styles.bannerImage} />

        <View style={styles.sectionContainer}>
          <Title>{promocion.nombre}</Title>
          <Divider style={styles.divider} />
          <List.Section>
            <List.Item title="Ofrecido por" description={promocion.servicio?.prestador.nombre} />
            <List.Item title="Para su servicio de" description={promocion.servicio?.nombre} />
          </List.Section>
          <Title>Detalles del promocion</Title>
          <Divider style={styles.divider} />
          <List.Section>

            <List.Item title="Descripción" description={promocion.descripcion} />
            <List.Item title="Descuento" description={`$${promocion.descuento}`} />
          </List.Section>
        </View>

        <View style={styles.sectionContainer}>
          <Title>Galería de la promoción</Title>
          <Divider style={styles.divider} />
          <ScrollView horizontal>
            {galeriaPromocionUrls.map((imageUrl, index) => (
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
        <CommentSection EntidadId={item.id} TipoEntidad="Promocion" />
      </ScrollView>
    </>
  )
}

export default PromocionDetail


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
