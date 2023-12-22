import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch } from 'react-native';
import IonIcon from "react-native-vector-icons/Ionicons";

const User = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/cute3.png')}
          style={styles.avatar}
        />
        <View style={styles.ratingContainer}>
          <Text style={styles.username}>Nguyet Anh</Text>
          <Text style={styles.phone}>anhnguyet23102002@gmail.com</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setNotificationEnabled(!isNotificationEnabled)}
        />
      </View>
      <View style={styles.menuItem}>
        <IonIcon name="wallet-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}>Ví của tôi</Text>
      </View>
      <View style={styles.menuItem}>
        <IonIcon name="document-text-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}>Hóa đơn</Text>
      </View>
      <View style={styles.menuItem}>
        <IonIcon name="card-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}>Sổ nợ</Text>
      </View>
      <View style={styles.menuItem}>
        <IonIcon name="settings-outline" size={25} color="#4390f7" />
        <Text style={styles.menuText}>Cài đặt</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#89CFF3',
    paddingTop: 70, 
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
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
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default User;