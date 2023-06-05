import React, { useContext } from 'react';
import {StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SiteContext } from '../../context/SiteContext';
import SiteCard from './SiteCard';

const SiteCarousel = ({ navigation }) => {
  const width = Dimensions.get('window').width;
  const { sites } = useContext(SiteContext);

  const handleSiteDetail = (site) => {
    navigation.navigate('DetailSite', { site });
  };
  

  return (
    <Carousel
      width={width}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      height={width}
      autoPlay={false}
      data={sites}
      scrollAnimationDuration={100}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 100,
      }}
      renderItem={({ item: site }) => {
        return (
          <SiteCard site={site} navigation={navigation} onPress={handleSiteDetail}/>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 8,
    backgroundColor: 'white',
    elevation: 4,
    height:'100%'
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
});

export default SiteCarousel;
