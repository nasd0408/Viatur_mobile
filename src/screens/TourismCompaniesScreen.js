import React, { useState, useEffect } from 'react';
import { FlatList, View, Text} from 'react-native';
import { Card, Avatar, List, ActivityIndicator, Button, Dialog, Portal } from 'react-native-paper';
import axios from 'axios';
import { isLoggedIn } from '../utils/dev';

const TourismCompaniesScreen = ({ navigation }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('https://647e6a75c246f166da8f110c.mockapi.io/PrestadorDeServicio');
      setCompanies(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching companies:', error);
      setLoading(false);
    }
  };

  const handleCompanyPress = (company) => {
    if (isLoggedIn) {
      navigation.navigate('CompanyDetail', { company });
    } else {
      setSelectedCompany(company);
      setShowDialog(true);
    }
  };
  const handleCancel = () => {
    setShowDialog(false);
  };
  const handleNavigateToAuth = () => {
    navigation.navigate('AuthFlow');
    setShowDialog(false);
  };

  const renderCompanyCard = ({ item }) => (
    <Card style={{ margin: 10 }} onPress={() => handleCompanyPress(item) }>
      
      <Card.Title
        title={item.Nombre}
        left={() => <Avatar.Image source={{ uri: item.FotoDePerfil }} />}
        titleStyle={{marginLeft:20, }}
      />
      <Card.Content>
        <List.Item
          title="Dirección"
          description={item.Direccion}
          left={(props) => <List.Icon {...props} icon="map-marker" />}
        />
        <List.Item
          title="Teléfono"
          description={item.Telefono}
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

  return (
    <>
    <FlatList
      data={companies}
      keyExtractor={(item) => item.PrestadorDeServicioID}
      renderItem={renderCompanyCard}
    />
    <Portal>
        <Dialog visible={showDialog} onDismiss={handleCancel}>
          <Dialog.Title>Login Required</Dialog.Title>
          <Dialog.Content>
            <Text>
              To access more information about this company, please log in.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleNavigateToAuth}>Log In</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </>
  );
};

export default TourismCompaniesScreen;
