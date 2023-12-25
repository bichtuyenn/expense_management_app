import React, { useState,  useContext  } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, ScrollView, Button } from 'react-native';
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from './AuthContext';

const Account = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const {setisAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation();
  const changMoneyPressHandler = () => {
      navigation.navigate('ChangeMoney')
  }
  const premiumHandler = () => {
    navigation.navigate('Premium')
}
  const handleLogout = () => {
    setisAuthenticated(false);
    console.log('Logged Out!');
  };
  return (
<ScrollView>
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/cute3.png')}
          style={styles.avatar}
        />
        <View style={styles.ratingContainer}>
          <Text style={styles.phone}>tuyen@gmail.com</Text>
        </View>
      </View>
      <View style={styles.separator} />
      {/* <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setNotificationEnabled(!isNotificationEnabled)}
        />
      </View> */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => premiumHandler()}
      >
        <Image source={require('../assets/crown.png')} style= {styles.images}/>
        <Text style={[styles.menuText, { fontWeight: 'bold' }]}>Premium</Text>
      </TouchableOpacity>

      <View style={styles.menuItem}>
        <IonIcon name="wallet-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}> My vallet</Text>
      </View>
      <View style={styles.menuItem}>
        <IonIcon name="document-text-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}> Bill</Text>
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => changMoneyPressHandler()}
      >
        <IonIcon name="card-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}> Change money</Text>
      </TouchableOpacity>


      <View style={styles.menuItem}>
        <IonIcon name="settings-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}> Setting</Text>
      </View>

      <TouchableOpacity
          style={[styles.menuItem, styles.logoutButton]}
          onPress={handleLogout}
        >
        <Text style={styles.menuText}>LOG OUT</Text>
      </TouchableOpacity>

    </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  images:{
    width: 32,
    height: 32,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#88AB8E',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
  },
  phone: {
    fontSize: 17,
    paddingTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  notificationText: {
    fontSize: 18,
    color: 'black', 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: 'center',
    alignSelf: 'center',
    // color: '#FFC436'
  },
  logoutButton: {
    backgroundColor: '#88AB8E',
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center', 
    justifyContent: 'center',  
    padding: 15,
    width: 200,
    height: 50,
     marginBottom: 20
  },
   
  buttonText: {
    color: 'white',              
    fontSize: 18,               
    textAlign: 'center',
            
  },
});

export default Account;