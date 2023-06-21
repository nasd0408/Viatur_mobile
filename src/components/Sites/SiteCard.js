import React, { useContext } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { SiteContext } from '../../context/SiteContext';


const SiteCard = ({ site, navigation, onPress }) => {
  const { galeria } = useContext(SiteContext);

  const handlePress = () => {
    onPress(site.id);
  };

  const findImageForSite = (siteId) => {
    const image = galeria.find((img) => img.destinoId === siteId);
    return image ? image.url : null;
  };

  const siteImage = findImageForSite(site.id);

  return (
    <Card onPress={handlePress}>
      {siteImage && <Card.Cover source={{ uri: siteImage }} />}
      <Card.Content>
        <Title>{site.nombre}</Title>
        <Paragraph>{site.descripción}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handlePress}>Detalles</Button>
      </Card.Actions>
    </Card>
  );
};

export default SiteCard;
