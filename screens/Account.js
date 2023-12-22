import User from './User'
import { createStackNavigator } from '@react-navigation/stack'
import ChangeMoney from './ChangeMoney';

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
    </Stack.Navigator>
  );
}
export default AccountStack;
