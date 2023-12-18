import React from 'react'
import IonIcon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home'
import Activities from './Activities'
import Account from './Account'
import AddExpense from './AddExpense';

const Bottom = createBottomTabNavigator();
const TabIcon = ({ name, focused }) => {
    return (
      <IonIcon name={name} size={25} color={focused ? "#4390f7" : "#000"} />
    );
  };
  
const homeScreenOptions = (headerShown, name) => {
    return {
      headerShown,
      tabBarLabel: name,
      tabBarIcon: () => <TabIcon name={name} />,
    };
  };
  
const MainBottom = () => {
    return (
      <Bottom.Navigator>
        <Bottom.Screen name="Home" component={Home} options={homeScreenOptions(false, "home")} />
        <Bottom.Screen name="Activities" component={Activities} options={homeScreenOptions(false, "grid")} />
        <Bottom.Screen name="AddExpense" component={AddExpense} options={homeScreenOptions(false, "add-circle-outline")} />
        <Bottom.Screen name="Account" component={Account} options={homeScreenOptions(false, "person")} />
      </Bottom.Navigator>
    );
  };
  
  export default MainBottom;
  