import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card, Avatar, List, ActivityIndicator, Snackbar, Portal } from 'react-native-paper';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../utils/dev';

const TourismCompaniesScreen = ({ navigation }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const { authState } = useAuth();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/prestadores`);
      setCompanies(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching companies:', error);
      setLoading(false);
    }
  };

  const handleSnackbarDismiss = () => {
    setVisibleSnackbar(false);
  };

  const handleCompanyPress = (companyId) => {
    if (authState.authenticated === null) {
      setVisible(!visible);
    } else {
      navigation.navigate('CompanyDetail', { companyId });
    }
  };

  const renderCompanyCard = ({ item }) => (
    <Card style={{ margin: 10 }} onPress={() => handleCompanyPress(item.id) }>
      
      <Card.Title
        title={item.nombre}
        left={() => <Avatar.Image source={{ uri: item.FotoDePerfil }} />}
        titleStyle={{marginLeft:20, }}
      />
      <Card.Content>
        <List.Item
          title="Dirección"
          description={item.direccion}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
        />
        <List.Item
          title="Teléfono"
          description={item.telefono}
          left={(props) => <List.Icon {...props} icon="phone" />}
        />
      </Card.Content>
    </Card>
  );
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (companies.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se encontraron empresas disponibles.</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={companies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCompanyCard}
      />
      <Portal>
        <Snackbar
          visible={visibleSnackbar}
          onDismiss={handleSnackbarDismiss}
          action={{
            label: 'Iniciar Sesión',
            onPress: () => {
              navigation.navigate('AuthFlow');
            },
          }}
        >
          Para ver más detalles, inicia sesión.
        </Snackbar>
      </Portal>
    </>
  );
};

export default TourismCompaniesScreen;