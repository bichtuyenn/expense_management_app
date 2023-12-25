import User from './User'
import { createStackNavigator } from '@react-navigation/stack'
import ChangeMoney from './ChangeMoney';
import Premium from './Premium';

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
    </Stack.Navigator>
  );
}
export default AccountStack;
