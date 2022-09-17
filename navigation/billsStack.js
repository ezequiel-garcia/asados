import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../components/settings/Settings';

import BillsScreen from '../components/events/bills/BillsScreen';
import BalancesContainer from '../components/events/bills/BalancesContainer';
import { Colors } from '../constants/styles';

const Stack = createNativeStackNavigator();

export default function BillsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BillsScreen"
        component={BillsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Balance"
        component={BalancesContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
