import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const SiteCard = ({ site, navigation, onPress }) => {
  const handlePress = () => {
    onPress(site.id);
  };

  return (
    <Card onPress={handlePress}>
      <Card.Cover source={{ uri: site.foto }} />
      <Card.Content>
        <Title>{site.nombre}</Title>
        <Paragraph>{site.descripcion}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handlePress}>Detalles</Button>
      </Card.Actions>
    </Card>
  );
};

export default SiteCard;
