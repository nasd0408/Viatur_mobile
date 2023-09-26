import React, { useEffect, useState } from 'react'
import { Button, Card, Paragraph, Title, TouchableRipple } from 'react-native-paper'
import axios from 'axios';
import { API_BASE_URL } from '../../utils/dev';

const PromocionesCard = ({promocion, onPress}) => {

const handleCardPress= ()=>{
    onPress(promocion.id)
}
const [imageUrl, setImageUrl] = useState(null);
  const DEFAULT_IMAGE_URL =
    "https://images.unsplash.com/photo-1488489153583-89ce18dd4968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";
    useEffect(() => {
      const getpromocionImage = async (promocionId) => {
        try {
          const response  = await axios.get(
            `${API_BASE_URL}/galeria-promocion/${promocionId}/promocion`
          );      

          // Get the first image from the array
          const image =  response.data.data[0];
          // Construct the URL using the archivo property
          const imageUrl = image
            ? `${API_BASE_URL}/galeria-promocion/${image.archivo}`
            : DEFAULT_IMAGE_URL;
          setImageUrl(imageUrl);
        } catch (e) {
          // Handle the error here, e.g., display a default image or error message.
          setImageUrl(DEFAULT_IMAGE_URL);
        }
      };
      getpromocionImage(promocion.id);
    }, [promocion.id]);
  return (
    <TouchableRipple>
        <Card>
        <Card.Cover source={{ uri: imageUrl }} />
            <Card.Content>
                <Title>{promocion.nombre}</Title>
                <Paragraph>{promocion.descripcion}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={handleCardPress}> Detalles </Button>
            </Card.Actions>
        </Card>
    </TouchableRipple>
    )
}

export default PromocionesCard

