import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PromocionDetail = ({route, navigation}) => {
const {item}=route.params;
const handleGoBack = () => {
  navigation.goBack();
};
if (!item) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} />
    </View>
  );
}

  return (
    <View>
      <Text>PromocionDetail</Text>
    </View>
  )
}

export default PromocionDetail

const styles = StyleSheet.create({})