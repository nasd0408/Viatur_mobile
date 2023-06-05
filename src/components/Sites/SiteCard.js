import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const SiteCard = ({ site, navigation, onPress }) => {
  return (
    <Card onPress={(site)=>navigation.navigate('SiteDetail', site)}>
      <Card.Cover source={{ uri: site.Foto }} />
      <Card.Content>
        <Title>{site.Nombre}</Title>
        <Paragraph>{site.Descripcion}</Paragraph>

      </Card.Content>
      <Card.Actions>

        <Button onPress={() => onPress(site)}>Detalles</Button>
      </Card.Actions>
    </Card>
  );
};

export default SiteCard;
