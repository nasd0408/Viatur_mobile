import React, { useContext, useState, useEffect } from 'react';
import { FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SiteContext } from '../context/SiteContext';
import SiteCard from '../components/Sites/SiteCard';

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
        site.Nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        site.Tipo.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSites(filtered);
  };

  const renderItem = ({ item }) => (
    <SiteCard site={item} onPress={handleSitePress} navigation={navigation} />
  );

  const handleSitePress = (site) => {
    navigation.navigate('DetailSite', { site });
  };

  return (
    <>
      <TextInput
        placeholder="Search by name or type"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredSites}
        keyExtractor={(item) => item.SitioTuristicoID}
        renderItem={renderItem}
      />
    </>
  );
};

export default SearchScreen;
