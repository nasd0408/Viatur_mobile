import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import SiteCard from '../Sites/SiteCard';
import { ActivityIndicator } from 'react-native-paper';
import ServicioTuristicoCard from '../Servicios/ServiciosCard';

const GeneralCarousel = ({ navigation, data, isLoading, cardType }) => {
  const width = Dimensions.get('window').width;

  const handleClickDetail = (itemId, cardType) => {
    const item = data.find((item) => item.id === itemId);
    if (cardType === 'sites') {
      navigation.navigate('DetailScreen', { item, cardType });
    } else if (cardType === 'servicios') {
      navigation.navigate('DetailScreen', { item, cardType}); 
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
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
    <Carousel
      width={width}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      height={width}
      autoPlay={true}
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
    />
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
