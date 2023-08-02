import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { SiteContext } from '../../context/SiteContext';
import SiteCard from './SiteCard';
import { useNavigation } from '@react-navigation/native';
import { ServicioTuristicoContext } from '../../context/ServiciosContext';
import { useAuth } from '../../context/AuthContext';
import { Portal, Snackbar } from 'react-native-paper';

const SiteList = () => {
  const {sites, isLoading: siteLoading, reloadData: reloadSiteData} = useContext(SiteContext);
  const {servicioTuristico, isLoading: servicioLoading, reloadData: reloadServicioData} =useContext(ServicioTuristicoContext)
  const {authState} = useAuth()
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false)


  const handleSitePress = (itemId) => {
    if(authState.authenticated === null){
      setVisible(!visible)
    }
    else{
    
      
        navigation.navigate('DetailScreen', { destinoId:itemId, cardType:"sites" });
    }
  };

  const renderSiteCard = ({ item }) => {
    return (
      <SiteCard
        site={item}
        navigation={navigation}
        onPress={()=>handleSitePress(item.id)}
      />
    );
  };
  const keyExtractor = (item) => {
    return item.id; // Assuming DestinoTuristicoID is a string or can be converted to a string
  };

  return (
    <>
    <FlatList
      data={sites}
      keyExtractor={keyExtractor}
      renderItem={renderSiteCard}
      />
       <Portal>

<Snackbar
  visible={visible}
  onDismiss={()=> setVisible(false)}
  action={{
    label: 'Iniciar sesion',
    onPress: () => {
      navigation.navigate('AuthFlow')
    },
  }}>
  Para ver detalles, inicia sesion
</Snackbar>
    </Portal>
      </>
  );
};

export default SiteList;
