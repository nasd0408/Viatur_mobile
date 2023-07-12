import React, { useContext } from 'react'
import { Button, Card, Paragraph, Text, Title, TouchableRipple } from 'react-native-paper'
import { PromocionContext } from '../../context/PromocionContext';

const PromocionesCard = ({promocion, navigation, onPress}) => {

const handleCardPress= ()=>{
    onPress(promocion.id)
}
const {galeria} = useContext(PromocionContext)

const findImageForPromocion = (id)=>{
    const image = galeria.find((img)=> img.promocionId === id);
    return image? image.url : "https://source.unsplash.com/random"
}

const siteImage=findImageForPromocion(promocion.id)
  return (
    <TouchableRipple>
        <Card>
            {siteImage && <Card.Cover source={{uri: siteImage}}/>}
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

