import React, { useState } from 'react';
import { View,  } from 'react-native';
import { Button, Text, Card, List, TouchableRipple, Title, Paragraph, Divider } from 'react-native-paper';
import ColorScheme from '../../utils/ColorScheme';

const ListaRutas = ({ rutas,navigation  }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Calcular el índice de inicio y fin de las rutas para la página actual
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = indiceInicio + elementosPorPagina;

  // Filtrar las rutas para mostrar solo las de la página actual
  const rutasPaginaActual = rutas.slice(indiceInicio, indiceFin);

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handleClickDetail = (itemId) =>{
    const item= rutas.find((item)=> item.id === itemId);

    if(item){
        navigation.navigate('DetailRuta', {item})
    }

  }
  return (
    <View style={{ marginVertical: 10 }}>
    <List.Section>
      {rutasPaginaActual.map((ruta) => (
          <Card
          key={ruta.id}
          style={{ marginVertical:5,  backgroundColor: ColorScheme.Primary }}
          >
          <TouchableRipple rippleColor={ColorScheme.Cambridge} 
          style={{paddingVertical:10,}} 
          onPress={()=>handleClickDetail(ruta.id)}>
          <Card.Content>
          <Title style={{color:ColorScheme.OffWhite}} >{ruta.nombre}</Title>
          <Divider/>
        <Paragraph style={{color:ColorScheme.OffWhite}}>{ruta.descripcion}</Paragraph>
          </Card.Content>
            </TouchableRipple>
        </Card>
      ))}
    </List.Section>
      <View>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Button
            icon={"arrow-left-bold"}
            mode='contained'
            onPress={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            
            >
                Anterior
            </Button>
                <Text style={{alignSelf:'center'}}>Página {paginaActual}</Text>
            <Button
            icon={"arrow-right-bold"}
            mode='contained'
            disabled={paginaActual === Math.ceil(rutas.length / elementosPorPagina)}
            onPress={() => cambiarPagina(paginaActual + 1)}
            >
                Siguiente
            </Button>
        </View>
      </View>
    </View>
  );
};

export default ListaRutas;
