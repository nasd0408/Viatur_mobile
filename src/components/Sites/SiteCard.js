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
    return image ? image.url : "https://images.unsplash.com/photo-1488489153583-89ce18dd4968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
  };

  const siteImage = findImageForSite(site.id);

  return (
    <Card onPress={handlePress}>
      {siteImage && <Card.Cover source={{ uri: siteImage }} />}
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
