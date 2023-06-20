import React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import SiteCard from './SiteCard';

const SiteCarousel = ({ navigation, sites, isLoading }) => {
  const width = Dimensions.get('window').width;

  const handleSiteDetail = (siteId) => {
    const site = sites.find((s) => s.id === siteId);
    navigation.navigate('DetailSite', { site });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  const renderSiteCard = ({ item: site }) => {
    return (
      <SiteCard
        site={site}
        navigation={navigation}
        onPress={handleSiteDetail}
      />
    );
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
      data={sites}
      scrollAnimationDuration={1000}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 100,
      }}
      renderItem={renderSiteCard}
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

export default SiteCarousel;
