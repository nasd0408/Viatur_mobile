import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SiteCard from '../components/Sites/SiteCard';
import { ActivityIndicator, Paragraph, Searchbar, SegmentedButtons, Text } from 'react-native-paper';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { API_BASE_URL } from '../utils/dev';



const SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [biomas, setBiomas] = useState([]);
  const [climas, setClimas] = useState([]);
  const [diversidad, setDiversidad] = useState([]);
  const [gastronomia, setGastronomia] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  
  const fetchPossibleValues = async (endpoint) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
      return response.data.data;
    } catch (error) {
      console.log(`Error fetching ${endpoint} values:`, error);
      return [];
    }
  };

  useEffect(() => {
    fetchPossibleValues('biomas').then((biomasData) => setBiomas(biomasData));
    fetchPossibleValues('climas').then((climasData) => setClimas(climasData));
    fetchPossibleValues('diversidad').then((diversidadData) => setDiversidad(diversidadData));
    fetchPossibleValues('gastronomia').then((gastronomiaData) => setGastronomia(gastronomiaData));
    fetchPossibleValues('temporada').then((temporadasData) => setTemporadas(temporadasData));
    
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/destinos/search`, {
        params: {
          gastronomiaId: searchText.gastronomiaId || '',
          climaId: searchText.climaId || '',
          biomaId: searchText.biomaId || '',
          diversidadId: searchText.diversidadId || '',
          temporadaId: searchText.temporadaId || '',
        },
      });
      setSearchResults(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
      } else {
        console.log('Error fetching search results:', error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchText]);

  const handleSitePress = (item) => {
    console.log(item);
    navigation.navigate('DetailScreen', { destinoId:item ,cardType:"sites"  });
  };

  const renderItem = ({ item }) => {
    return (
      <SiteCard
        site={item}
        navigation={navigation}
        onPress={()=>handleSitePress(item.id)}
        key={item.id}
      />
    );
  };
  
  const handleValueChange = (param, value) => {
    setSearchText((prev) => {
      // If the selected value is already the same as the current value, set it to null (unselect)
      const updatedValue = prev[param] === value ? null : value;
      return { ...prev, [param]: updatedValue };
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Bienvenido a la Búsqueda de Destinos
      </Text>
      <Paragraph>
        Utiliza los siguientes filtros para personalizar tu búsqueda de destinos turísticos. Selecciona los atributos que más te interesen y obtén resultados que se adapten a tus preferencias. Puedes elegir entre diferentes opciones de biomas, climas, diversidad, gastronomía y temporadas para encontrar el destino perfecto para tu próximo viaje.
      </Paragraph>
      <Paragraph>
        Para seleccionar una opción, simplemente toca el botón correspondiente en cada sección. Si deseas deseleccionar una opción, basta con tocar nuevamente el botón ya seleccionado. Luego, presiona "Buscar" para obtener los destinos que coincidan con tus criterios.
      </Paragraph>
      <Paragraph>
        ¡Disfruta explorando una amplia variedad de destinos y descubre nuevas experiencias en cada rincón del mundo!
      </Paragraph>
    </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bioma:</Text>
        <SegmentedButtons
          value={searchText.biomaId || ''}
          onValueChange={(value) => handleValueChange('biomaId', value)}
          buttons={biomas.map((bioma) => ({
            value: bioma.id,
            label: bioma.descripcion, 
          }))}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clima:</Text>
        <SegmentedButtons
          value={searchText.climaId || ''}
          onValueChange={(value) => handleValueChange('climaId', value)}
          buttons={climas.map((clima) => ({
            value: clima.id,
            label: clima.descripcion, 
          }))}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diversidad:</Text>
        <SegmentedButtons
          value={searchText.diversidadId || ''}
          onValueChange={(value) => handleValueChange('diversidadId', value)}
          buttons={diversidad.map((diversidad) => ({
            value: diversidad.id,
            label: diversidad.descripcion, 
          }))}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gastronomia:</Text>
        <SegmentedButtons
          value={searchText.gastronomiaId || ''}
          onValueChange={(value) => handleValueChange('gastronomiaId', value)}
          buttons={gastronomia.map((gastronomia) => ({
            value: gastronomia.id,
            label: gastronomia.descripcion, 
          }))}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temporadas:</Text>
        <SegmentedButtons
          value={searchText.temporadaId || ''}
          onValueChange={(value) => handleValueChange('temporadaId', value)}
          buttons={temporadas.map((temporada) => ({
            value: temporada.id,
            label: temporada.descripcion, 
          }))}
        />
      </View>

      {/* Render other sections for Gastronomia, Temporada, and other parameters similarly */}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        // Use map to render the searchResults array
        searchResults.map((item) => renderItem({ item })) // Pass each item to the renderItem function
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width,
  },
});

export default SearchScreen;