import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ForgotPasswordScreen = () => {
  const [markerCoordinate, setMarkerCoordinate] = useState({ latitude: 10.0558, longitude: -69.0891 }); // Latitud y longitud inicial del marcador

  return (
    <View style={{ flex: 1,  }}>
      <MapView
        style={{ height: Dimensions.get('window').width }}
        initialRegion={{
          latitude: 10.0558, // Latitud inicial del mapa
          longitude: -69.0891, // Longitud inicial del mapa
          latitudeDelta: 0.3, // Rango de latitud mostrado en el mapa
          longitudeDelta: 0.3, // Rango de longitud mostrado en el mapa
        }}
      >
        <Marker
          coordinate={markerCoordinate} // Latitud y longitud del marcador
          draggable
          onDragEnd={(e) => setMarkerCoordinate(e.nativeEvent.coordinate)} // Actualiza la posición del marcador al arrastrarlo
        />
      </MapView>
    </View>
  );
};

export default ForgotPasswordScreen

