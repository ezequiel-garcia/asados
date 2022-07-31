import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../components/settings/Settings';

import BottomTabNavigator from './bottomTab';
import TopTabsNavigator from './topTab';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabBarHome"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TopTabs"
          component={TopTabsNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ animation: 'fade_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
