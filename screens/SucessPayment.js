import React, {useContext} from 'react';
import { View, Image, StyleSheet, Text ,  Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');

const SucessPayment = ({ navigation }) => {
  return (
    <View style = {styles.container}>
      <Image source={require('../assets/sucess2.png')} style={[styles.image, { resizeMode: 'cover' }]}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: '100%',
  }
});

export default SucessPayment;