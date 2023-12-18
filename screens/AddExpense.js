import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Messages from './Messages';
import Notification from './Notification';

const Stack = createStackNavigator();
const AddExpense = ()  => {
  return (
    <Stack.Navigator>
         <Stack.Screen 
            name="Messages" 
            component={Messages} 
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="Notification" 
            component={Notification} 
            options={{headerShown:false}}
        />
    </Stack.Navigator>
  );
}
export default AddExpense;