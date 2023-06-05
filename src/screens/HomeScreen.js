import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon } from '@rneui/base';
import SiteCarousel from '../components/Sites/SiteCarousel';
import colors from '../utils/ColorScheme';
import styles from '../styles/HomeScreenStyles';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Icon name="star" type="material" size={80} color={colors.Primary} />
        <Text style={styles.title}>Bienvenido a LARAVENTUR</Text>
        <Text style={styles.subtitle}>Explora y Descubre</Text>
        <Text style={styles.description}>
          ¡Comienza tu aventura y descubre lugares increíbles con LARAVENTUR. Prepárate para un viaje inolvidable!
        </Text>
      </View>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Sitios Turísticos de Interés</Text>
        <SiteCarousel navigation={navigation} />
      </View>
      <View style={styles.comoViajarContainer}>
        <Text style={styles.comoViajarTitle}>¿Cómo viajar con nosotros?</Text>
        <Text style={styles.comoViajarDescription}>
          En nuestra aplicación, te brindamos la oportunidad de disfrutar de increíbles promociones de viajes. Para ponerse en contacto con las empresas prestadoras de servicio y obtener más información sobre un viaje planeado, sigue estos pasos:
        </Text>
        <Text style={styles.comoViajarStep}>1. Selecciona una de nuestras promociones disponibles.</Text>
        <Text style={styles.comoViajarStep}>2. En la pantalla de detalles de la promoción, encontrarás información sobre la empresa que ofrece el viaje.</Text>
        <Text style={styles.comoViajarStep}>3. Utiliza los datos de contacto proporcionados, como número de teléfono o correo electrónico, para comunicarte directamente con la empresa y hacer consultas o reservas.</Text>
        <Button onPress={()=>navigation.navigate('Promotions')}>Ver Promociones</Button>
      </View>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Promociones que te pueden interesar</Text>
        <SiteCarousel navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
