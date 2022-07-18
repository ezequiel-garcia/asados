import { useContext } from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Text } from 'react-native';
import { Colors } from '../constants/styles';
import { AuthenticationContext } from '../store/auth/auth-context';

import HomeScreen from '../screens/HomeScreen';
import Settings from '../components/settings/Settings';

const Drawer = createDrawerNavigator();

function Hello() {
  return <Text>Heeloooo</Text>;
}

export default function DrawerNavigator() {
  const authCtx = useContext(AuthenticationContext);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: Colors.primary500 },
        drawerActiveBackgroundColor: Colors.primary800,
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: Colors.secondary400,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              activeBackgroundColor={Colors.primary800}
              inactiveTintColor="white"
              activeTintColor={Colors.secondary400}
              label="Logout"
              onPress={() => authCtx.onLogout()}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        options={{
          drawerLabel: 'Home Screen',
        }}
        component={HomeScreen}
      />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
