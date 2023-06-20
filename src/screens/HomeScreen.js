import React, {useState, useEffect, useContext} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SiteCarousel from '../components/Sites/SiteCarousel';
import colors from '../utils/ColorScheme';
import styles from '../styles/HomeScreenStyles';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SiteContext } from '../context/SiteContext';
import GeneralCarousel from '../components/shared/Carousel';
import { ServicioTuristicoContext } from '../context/ServiciosContext';




const HomeScreen = ({ navigation }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const imageSources = [
    require('../../assets/SDlandscape1.jpg'),
    require('../../assets/SDlandscape2.jpg'),
    require('../../assets/SDlandscape3.jpg'),
    require('../../assets/SDlandscape4.jpg'),
    require('../../assets/SDlandscape5.jpg'),
    require('../../assets/SDlandscape6.jpg'),
    require('../../assets/SDlandscape7.jpg'),
    require('../../assets/SDlandscape8.jpg'),
    // Add more image paths as needed
  ];
  const {sites, isLoading: siteLoading, reloadData: reloadSiteData} = useContext(SiteContext);
  const {servicioTuristico, isLoading: servicioLoading, reloadData: reloadServicioData} =useContext(ServicioTuristicoContext)

  const hadleReloadData = () =>{
    reloadSiteData();
    reloadServicioData();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the image index to the next index
      setImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
    }, 10000); // Change image every 5 seconds

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground  source={imageSources[imageIndex]}>
        <View style={styles.overlay}>

      <View style={styles.welcomeContainer}>
        <Ionicons name='leaf-outline' size={50} color={colors.OffWhite}/>
        <Text style={styles.title}>Bienvenido a LARAVENTUR</Text>
        <Text style={styles.subtitle}>Explora y Descubre</Text>
        <Text style={styles.description}>
          ¡Comienza tu aventura y descubre lugares increíbles con LARAVENTUR. Prepárate para un viaje inolvidable!
        </Text>
      </View>
        </View>
      </ImageBackground>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Sitios Turísticos de Interés</Text>
      <GeneralCarousel data={sites} navigation={navigation} cardType={'sites'} isLoading={siteLoading}/>
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
        <GeneralCarousel navigation={navigation} cardType={'servicios'} data={servicioTuristico} isLoading={servicioLoading} /> 
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
