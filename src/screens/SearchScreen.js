import React, { useContext, useState, useEffect } from 'react';
import { FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SiteContext } from '../context/SiteContext';
import SiteCard from '../components/Sites/SiteCard';
import { Searchbar, SegmentedButtons } from 'react-native-paper';

const SearchScreen = () => {
  const { sites } = useContext(SiteContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredSites, setFilteredSites] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    const filtered = sites.filter(
      (site) =>
        site.nombre.toLowerCase().includes(searchText.toLowerCase()) 
    );
    setFilteredSites(filtered);
  };

 
  const handleSitePress = (itemId) => {
    const item = sites.find((item) => item.id === itemId);
    navigation.navigate('DetailSite', { item });
  };

  const renderItem = ({ item }) => {
    return (
      <SiteCard
        site={item}
        navigation={navigation}
        onPress={()=>handleSitePress(item.id)}
      />
    );
  };
  const keyExtractor = (item) => {
    return item.id.toString(); // Assuming id is a string or can be converted to a string
  };

  return (
    <>
      <Searchbar
      placeholder='Busca por nombre'
      value={searchText}
      onChangeText={setSearchText}
      />
        <SegmentedButtons

        value={searchText}
        onValueChange={setSearchText}
        buttons={[
          {
            value: 'nature',
            label: 'Naturaleza',
            icon:'leaf'
          },
          {
            value: 'cities',
            label: 'Ciudades',
            icon:'city'
          },
          { 
            value: 'culture', 
            label: 'Cultural',
            icon:'cross'
          },
         
        ]}
      />
      <FlatList
        data={filteredSites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </>
  );
};

export default SearchScreen;
