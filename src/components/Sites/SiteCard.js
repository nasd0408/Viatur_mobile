import React, { useState, useEffect } from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/dev';
const SiteCard = ({ site, navigation, onPress }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const handlePress = () => {
    onPress(site.id);
  };
  const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1488489153583-89ce18dd4968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
    useEffect(() => {
      const getDestinationImage = async (siteId) => {
        try {
          const { data } = await axios.get(
            `${API_BASE_URL}/galeria-destino/${siteId}/destino`
          );      

          // Get the first image from the array
          const image =  data.data[0];
          // Construct the URL using the archivo property
          const imageUrl = image
            ? `${API_BASE_URL}/galeria-destino/${image.archivo}`
            : DEFAULT_IMAGE_URL;
          setImageUrl(imageUrl);
        } catch (e) {
          // Handle the error here, e.g., display a default image or error message.
          setImageUrl(DEFAULT_IMAGE_URL);
        }
      };
      getDestinationImage(site.id);
    }, [site.id]);
  return (
    <Card onPress={handlePress}>
      <Card.Cover source={{ uri: imageUrl }} />
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
