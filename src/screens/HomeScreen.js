import React, {useState, useEffect, useContext} from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../utils/ColorScheme';
import styles from '../styles/HomeScreenStyles';
import { Button, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SiteContext } from '../context/SiteContext';
import GeneralCarousel from '../components/shared/Carousel';
import { ServicioTuristicoContext } from '../context/ServiciosContext';
import { useAuth } from '../context/AuthContext';
import MapView, { Marker }from 'react-native-maps';





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
  const {authState} = useAuth()
  const [markerCoordinate, setMarkerCoordinate] = useState({}); // Latitud y longitud inicial del marcador

  const initialRegion = {
    latitude: 9.925858,
    longitude: -69.429599,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,};

  const safeParseFloat = (str) => {
    const value = parseFloat(str);
    return Number.isNaN(value) ? 0 : value;
  };
  
  const handleMarkerUpdate = (coordinate) => {
    const { latitud, longitud } = coordinate;
  
    const latitude = safeParseFloat(latitud);
    const longitude = safeParseFloat(longitud);
  
    setMarkerCoordinate({ latitude, longitude });
    console.log(latitude, longitude);
  };
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

  useEffect(() => {
    handleMarkerUpdate({ latitude:  9.925858, longitude: -69.429599 })
  }, [])
  

  return (
    <ScrollView style={styles.container}>
      <ImageBackground  source={imageSources[imageIndex]}>
        <View style={styles.overlay}>

      <View style={styles.welcomeContainer}>
        <Ionicons name='leaf-outline' size={50} color={colors.OffWhite}/>
        <Text style={styles.title}  variant='displaySmall'>Bienvenido a LARAVENTUR</Text>
        <Text style={styles.subtitle}>Explora y Descubre</Text>
        <Text style={styles.description}>
          ¡Comienza tu aventura y descubre lugares increíbles con LARAVENTUR. Prepárate para un viaje inolvidable!
        </Text>
      </View>
        </View>
      </ImageBackground>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Sitios Turísticos de Interés</Text>
        <View style={{flex:1}}>
      <MapView
        style={{height: Dimensions.get('window').height/2}}
        initialRegion={initialRegion}
        scrollEnabled={false}

      >
        <Marker
          coordinate={{
            latitude: markerCoordinate.latitude,
            longitude: markerCoordinate.longitude,
          }}

        />
      </MapView>
    </View>
      <GeneralCarousel data={sites} navigation={navigation} onMarkerUpdate={handleMarkerUpdate} cardType={'sites'} isLoading={siteLoading}/>
      </View>
    
      <View style={styles.comoViajarContainer}>
        <Text style={styles.comoViajarTitle}>¿Cómo viajar con nosotros?</Text>
        <Text style={styles.comoViajarDescription}>
          En nuestra aplicación, te brindamos la oportunidad de disfrutar de increíbles promociones de viajes. Para ponerse en contacto con las empresas prestadoras de servicio y obtener más información sobre un viaje planeado, sigue estos pasos:
        </Text>
        <Text style={styles.comoViajarStep}>1. Selecciona una de nuestras promociones disponibles.</Text>
        <Text style={styles.comoViajarStep}>2. En la pantalla de detalles de la promoción, encontrarás información sobre la empresa que ofrece el viaje.</Text>
        <Text style={styles.comoViajarStep}>3. Utiliza los datos de contacto proporcionados, como número de teléfono o correo electrónico, para comunicarte directamente con la empresa y hacer consultas o reservas.</Text>
      </View>
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Nuestros afiliados te ofrencen los siguientes servicios</Text>
        <GeneralCarousel navigation={navigation} cardType={'servicios'} data={servicioTuristico} isLoading={servicioLoading} /> 
      </View>
      {authState.authenticated?
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Aprovecha nuestras promociones!</Text>
        <GeneralCarousel navigation={navigation} cardType={'servicios'} data={servicioTuristico} isLoading={servicioLoading} /> 
      </View>:
      <View  style={styles.comoViajarContainer}>
        <Text style={styles.comoViajarTitle}>Inicia Sesion para ver las promociones disponibles</Text>
        <Button mode='contained' onPress={()=>navigation.navigate('AuthFlow')}>Iniciar sesion</Button>

      </View>
}
      
    </ScrollView>
  );
};

export default HomeScreen;
