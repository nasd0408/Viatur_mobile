import React from 'react';
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';

const ServicioTuristicoCard = ({ servicioTuristico, navigation, onPress }) => {
  const { id, nombre, descripcion, foto, tipo } = servicioTuristico;

  const handleCardPress = () => {
    onPress(id)
  };

  return (
    <TouchableRipple onPress={handleCardPress}>
      <Card>
        <Card.Cover source={{ uri: foto }} />
        <Card.Content>
          <Title>{nombre}</Title>
          <Paragraph>{descripcion}</Paragraph>
          <Paragraph>Tipo: {tipo}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

export default ServicioTuristicoCard;
