import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import SiteCard from '../Sites/SiteCard';
import { ActivityIndicator, Portal, Snackbar } from 'react-native-paper';
import ServicioTuristicoCard from '../Servicios/ServiciosCard';
import { useAuth } from '../../context/AuthContext';

const GeneralCarousel = ({ navigation, data, isLoading, cardType, onMarkerUpdate }) => {
  const width = Dimensions.get('window').width;
  const [visible, setVisible] = useState(false)
  const { authState } = useAuth();

  const handleClickDetail = (itemId, cardType) => {
    const item = data.find((item) => item.id === itemId);
    if (authState.authenticated === null) {
      setVisible(!visible)
    }
    else {
      if (cardType === 'sites') {
        navigation.navigate('DetailScreen', { item, cardType });
      } else if (cardType === 'servicios') {
        navigation.navigate('DetailService', { item, cardType });
      }
    }
  }
    ;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }
  const handleOnSnap = (index) => {
    console.log(index);
    if (cardType === 'sites') {
      const selectedItem = data[index];
      onMarkerUpdate({
        latitud: selectedItem.latitud,
        longitud: selectedItem.longitud,
      });
    }
    else {
      console.log('not a site');
    }
  }
  const renderCard = ({ item }) => {
    if (cardType === 'sites') {

      return (
        <SiteCard
          site={item}
          navigation={navigation}
          onPress={() => handleClickDetail(item.id, cardType)}
        />
      );
    } else if (cardType === 'servicios') {
      return (
        <ServicioTuristicoCard
          servicioTuristico={item}
          navigation={navigation}
          onPress={() => handleClickDetail(item.id, cardType)}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Carousel
        width={width}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        height={width}
        autoPlay={false}
        autoPlayInterval={1000}
        loop={false}
        data={data}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 100,
        }}
        renderItem={renderCard}
        onSnapToItem={(index)=>handleOnSnap(index)}
/>
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Iniciar sesion',
            onPress: () => {
              navigation.navigate('AuthFlow')
            },
          }}>
          Para ver detalles, inicia sesion
        </Snackbar>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width,
  },
});

export default GeneralCarousel;
