import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventHeader from '../components/header/EventHeader';
import { Colors } from '../constants/styles';
import EventInfo from '../components/events/EventInfo';
import Settings from '../components/settings/Settings';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs({ route }) {
  return (
    <>
      <EventHeader uri={route.params.event.image} />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: 'white' },
          tabBarStyle: { backgroundColor: Colors.primary800 },
        }}
      >
        <Tab.Screen name="General" component={EventInfo} />
        <Tab.Screen name="Tasks" component={Settings} />
        <Tab.Screen name="Bills" component={Settings} />
        <Tab.Screen name="Chat" component={Settings} />
      </Tab.Navigator>
    </>
  );
}
