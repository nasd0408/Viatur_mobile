import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Title, Divider, IconButton, Text, Portal, Snackbar, ActivityIndicator } from 'react-native-paper';
import axios from 'axios'; // Asegúrate de importar axios si no lo has hecho
import { API_BASE_URL } from '../../utils/dev';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CompanyDetails = ({ companyName, contactNumber, prestadorId }) => {
  const [sociales, setSociales] = useState([]);
  const [isLoadingURL, setIsLoadingURL] = useState(false)
  const [errorURL, setErrorURL] = useState(null)
  const [successURL, setSuccessURL] = useState(null)

  const handleSocialMediaClick = async (item) => {
    setIsLoadingURL(true)
    // Realiza una solicitud axios para contar la visita
    try {
      await axios.get(`${API_BASE_URL}/contactos/${item.id}`);
    } catch (error) {
      console.error('Error al contar la visita:', error);
      setIsLoadingURL(false)
    }

    // Redirige al URL correspondiente
    if (item.url) {
      // Si el item tiene una URL, redirige a esa URL
      Linking.openURL(item.url).then(() => {
        setIsLoadingURL(false)
        setSuccessURL("URL abierto exitosamente")
        setErrorURL(null)
      }).catch(e => {
        setErrorURL("Error al abrir el URL")
        setSuccessURL(null)
        setIsLoadingURL(false)
      });

    } else {
      // Puedes manejar el caso en el que el item no tenga URL
      setErrorURL('El item no tiene URL.');
      setIsLoadingURL(false)
      setSuccessURL(null)
      // O puedes redirigir a una URL predeterminada, si lo deseas
    }
  };

  useEffect(() => {
    const getSocials = async (prestadorId) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/contactos/${prestadorId}/prestador`
        );
        setSociales(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getSocials(prestadorId);
  }, [prestadorId]);

  return (
    <View style={styles.sectionContainer}>
      <Title>Detalles de la Empresa</Title>
      <Divider style={styles.divider} />

      <View style={styles.companyDetailsContainer}>
        <View style={styles.companyInfoContainer}>
          <Text style={styles.companyLabel}>Nombre de la Empresa:</Text>
          <Text style={styles.companyValue}>{companyName}</Text>
        </View>

        <View style={styles.companyInfoContainer}>
          <Text style={styles.companyLabel}>Número de Contacto:</Text>
          <Text style={styles.companyValue}>{contactNumber}</Text>
        </View>

        <View >
          <Text style={styles.companyLabel}>Redes Sociales:</Text>
          <ScrollView horizontal contentContainerStyle={styles.socialMediaContainer}>
            {sociales.map((social) => (
              <View key={social.id} style={styles.socialItemContainer}>
                <IconButton
                  icon={getIconForType(social.tipo)}
                  iconColor={getColorForType(social.tipo)}
                  size={24}
                  onPress={() => handleSocialMediaClick(social)}

                />
                <Text style={styles.socialItemLabel}>{social.descripcion}</Text>
                <Text style={styles.socialItemLabel}>{social.tipo}</Text>

              </View>
            ))}

          </ScrollView>
          {isLoadingURL && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} size="small" />
            </View>
          )}
        </View>
      </View>
      <Portal>
        <Snackbar
          visible={successURL}
          onDismiss={() => setSuccessURL(null)}
          action={{
            label: 'OK',
            onPress: () => setSuccessURL(null),
          }}
        >
          {successURL}
        </Snackbar>

        <Snackbar
          visible={errorURL}
          onDismiss={() => setErrorURL(null)}
          action={{
            label: 'OK',
            onPress: () => setErrorURL(null),
          }}
        >
          {errorURL}
        </Snackbar>

      </Portal>
    </View>
  );
};

const getIconForType = (tipo) => {
  switch (tipo) {
    case 'Instagram':
      return 'instagram';
    case 'WhatsApp':
      return 'whatsapp';
    case 'Email':
      return 'email';
    case 'Telefono':
      return 'phone';
    case 'LinkedIn':
      return 'linkedin';
    case 'X':
      return 'twitter'
    default:
      return 'earth';
  }
};

const getColorForType = (tipo) => {
  switch (tipo) {
    case 'Instagram':
      return '#E4405F'; // Cambiar el color para Instagram
    case 'WhatsApp':
      return '#25D366'; // Cambiar el color para WhatsApp
    case 'Email':
      return '#128C7E'; // Cambiar el color para Email
    case 'Teléfono':
      return '#007ACC'; // Cambiar el color para Teléfono
    case 'LinkedIn':
      return '#0077B5'; // Cambiar el color para LinkedIn
    default:
      return '#000000'; // Color predeterminado para otros tipos
  }
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
    alignContent: 'space-around',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width
  },
  socialItemContainer: {
    margin: 10,
    alignItems: 'center'
  }
});

export default CompanyDetails;
