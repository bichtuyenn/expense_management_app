import React from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home';
import Activities from './Activities';
import Account from './Account';
import AddExpense from './AddExpense';

const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  return (
    <IonIcon name={name} size={25} color={focused ? "#4390f7" : "#000"} />
  );
};

const homeScreenOptions = (headerShown, name, iconName) => {
  return {
    headerShown,
    tabBarLabel: name,
    tabBarIcon: ({ focused }) => <TabIcon name={iconName} focused={focused} />,
  };
};

const MainBottom = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name="Home" component={Home} options={homeScreenOptions(false, "Home", "home-outline")} />
      <Bottom.Screen name="Chart" component={Activities} options={homeScreenOptions(false, "Chart", "cellular-outline")} />
      <Bottom.Screen name="AddExpense" component={AddExpense} options={homeScreenOptions(false, "Add Expense", "add-circle-outline")} />
      <Bottom.Screen name="Account" component={Account} options={homeScreenOptions(false, "Account", "person-outline")} />
    </Bottom.Navigator>
  );
};

export default MainBottom;
