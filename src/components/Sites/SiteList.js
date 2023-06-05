import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { SiteContext } from '../../context/SiteContext';
import SiteCard from './SiteCard';
import { useNavigation } from '@react-navigation/native';

const SiteList = () => {
  const { sites } = useContext(SiteContext);
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <SiteCard site={item} onPress={handleSitePress} navigation={navigation} />
  );

  const handleSitePress = (site) => {
    navigation.navigate('DetailSite', { site });
  };

  return (
    <FlatList
      data={sites}
      keyExtractor={(item) => item.SitioTuristicoID}
      renderItem={renderItem}
    />
  );
};

export default SiteList;
