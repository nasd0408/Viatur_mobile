import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, Divider, IconButton } from 'react-native-paper';
import axios from 'axios'; // Asegúrate de importar axios si no lo has hecho
import { API_BASE_URL } from '../../utils/dev';

const CompanyDetails = ({ companyName, contactNumber, prestadorId }) => {
  const [sociales, setSociales] = useState([]);

  useEffect(() => {
    const getSocials = async (prestadorId) => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/prestadores/${prestadorId}/contactos`
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

        <View style={styles.companyInfoContainer}>
          <Text style={styles.companyLabel}>Redes Sociales:</Text>
          <View style={styles.socialMediaContainer}>
            {sociales.map((social) => (
              <View key={social.id} style={styles.socialItemContainer}>
                <IconButton
                  icon={getIconForType(social.tipo)}
                  iconColor={getColorForType(social.tipo)}
                  size={24}
                  onPress={() => handleSocialMediaClick(social.url)}
                />
                <Text style={styles.socialItemLabel}>{social.url}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
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
    case 'telefono':
      return 'phone';
    default:
      return 'earth';
  }
};

const getColorForType = (tipo) => {
  switch (tipo) {
    case 'Tiktok':
      return '#FF0000';
    case 'Instagram':
      return '#C13584';
    case 'WhatsApp':
      return '#25D366';
    case 'Email':
      return '#0077B5';
    case 'telefono':
      return '#007ACC';
    default:
      return '#000000';
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
      },
});

export default CompanyDetails;
