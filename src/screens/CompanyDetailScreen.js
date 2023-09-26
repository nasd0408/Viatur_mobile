import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Avatar, Card, List } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { API_BASE_URL } from '../utils/dev';
import CompanyDetails from '../components/ContactosPrestador/CompanyDetails';

const CompanyDetailScreen = ({ route }) => {
  const { companyId } = route.params;
  const [loading, setLoading] = useState(true);
  const [prestador, setPrestador] = useState({});

  useEffect(() => {
    fetchPrestadorById();
  }, []);

  const fetchPrestadorById = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/prestadores/${companyId}`);
      setPrestador(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
          title={prestador.nombre}
          subtitle="Detalles del prestador"
          left={() => <Avatar.Image source={{ uri: prestador.FotoDePerfil }} />}
          titleStyle={{ marginLeft: 20 }}
          subtitleStyle={{ marginLeft: 20 }}
        />
        <Card.Content>
          <List.Item
            title="Dirección"
            description={prestador.direccion}
            left={(props) => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title="Teléfono"
            description={prestador.telefono}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
          {/* Agrega más detalles del prestador según sea necesario */}
        </Card.Content>
      </Card>
      <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold' }}>Servicios Ofrecidos:</Text>

      {prestador.servicios.length > 0 ? (
        prestador.servicios.map((servicio) => (
          <Card key={servicio.id} style={{ marginHorizontal: 10, marginBottom: 10 }}>
            <Card.Title
              title={servicio.nombre}
              subtitle={servicio.direccion}
            />
            <Card.Content>
              <Text>{servicio.descripcion}</Text>
              <Text>Categoría: {servicio.precio}</Text>
              {/* Agrega más detalles del servicio según sea necesario */}
            </Card.Content>
          </Card>
        ))
      ) : (
        <View style={{ margin: 10 }}>
          <Text>No hay servicios ofrecidos por este prestador.</Text>
        </View>
      )}
      <View style={{paddingHorizontal:20}}>

      <CompanyDetails
        companyName={prestador.nombre}
        contactNumber={prestador.telefono}
        prestadorId={prestador.id}
        />
        </View>
    </ScrollView>
  );
};

export default CompanyDetailScreen;
