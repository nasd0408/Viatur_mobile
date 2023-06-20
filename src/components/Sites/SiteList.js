import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { SiteContext } from '../../context/SiteContext';
import SiteCard from './SiteCard';
import { useNavigation } from '@react-navigation/native';

const SiteList = () => {
  const { sites } = useContext(SiteContext);
  const navigation = useNavigation();

  const handleSitePress = (siteId) => {
    const site = sites.find((s) => s.id === siteId);
    navigation.navigate('DetailSite', { site });
  };

  const renderItem = ({ item }) => (
    <SiteCard site={item} onPress={handleSitePress} navigation={navigation} />
  );

  const keyExtractor = (item) => {
    return item.id.toString(); // Assuming DestinoTuristicoID is a string or can be converted to a string
  };

  return (
    <FlatList
      data={sites}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default SiteList;
