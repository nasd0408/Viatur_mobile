import React, { useContext } from 'react';
import { Card, Title, Paragraph, TouchableRipple, Button } from 'react-native-paper';
import { ServicioTuristicoContext } from '../../context/ServiciosContext';

const ServicioTuristicoCard = ({ servicioTuristico, navigation, onPress }) => {
  const {id, destinoId, nombre, descripción } = servicioTuristico;

  const handleCardPress = () => {
    onPress(id)
  };
  const { galeria } = useContext(ServicioTuristicoContext);

 
  const findImageForService = (servicioId) => {
    const image = galeria.find((img) => img.serviciosId === servicioId);
    return image ? image.url : "https://source.unsplash.com/random";
  };

  const siteImage = findImageForService(id);

  return (
    <TouchableRipple onPress={handleCardPress}>
      <Card>
      {siteImage && <Card.Cover source={{ uri: siteImage }} />}
        <Card.Content>
          <Title>{nombre}</Title>
          <Paragraph>{descripción}</Paragraph>
        </Card.Content>
        <Card.Actions>
        <Button onPress={handleCardPress}>Detalles</Button>
      </Card.Actions>
      </Card>
    </TouchableRipple>
  );
};

export default ServicioTuristicoCard;
