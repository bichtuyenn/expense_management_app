import User from './User'
import { createStackNavigator } from '@react-navigation/stack'
import ChangeMoney from './ChangeMoney';
import Premium from './Premium';
import VnPayWebView from './VnPayWebView';
const Stack = createStackNavigator()
const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
      />
      <Stack.Screen
        name="ChangeMoney"
        component={ChangeMoney}
      />
      <Stack.Screen
        name="Premium"
        component={Premium}
      />
      <Stack.Screen
        name="VnPayWebView"
        component={VnPayWebView}
      />
    </Stack.Navigator>
  );
}
export default AccountStack;