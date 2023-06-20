import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Avatar, Card, List } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const CompanyDetailScreen = ({ route }) => {
  const { company } = route.params;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`https://647e6a75c246f166da8f110c.mockapi.io/PrestadorDeServicio/${company.PrestadorDeServicioID}/ServicioTuristico`);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching services:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Card style={{ margin: 10 }}>
        <Card.Title
          title={company.Nombre}
          subtitle="Company Details"
          left={() => <Avatar.Image source={{ uri: company.FotoDePerfil }} />}
          titleStyle={{marginLeft:20}}
          subtitleStyle={{marginLeft:20}}
        />
        <Card.Content>
          <List.Item
            title="Dirección"
            description={company.Direccion}
            left={(props) => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title="Teléfono"
            description={company.Telefono}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
          {/* Add more company details as needed */}
        </Card.Content>
      </Card>
      <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Services Offered:</Text>
      {services.map((service) => (
        <Card key={service.ServicioTuristicoID} style={{ marginHorizontal: 10, marginBottom: 10 }}>
          <Card.Title
            title={service.Nombre}
            subtitle={service.Tipo}
          />
          <Card.Content>
            <Text>{service.Descripcion}</Text>
            <Text>Categoria: {service.Categoria}</Text>
            {/* Add more service details as needed */}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default CompanyDetailScreen;
