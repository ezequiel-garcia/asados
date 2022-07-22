import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import EventManager from '../components/events/EventManager';
// NEW EVENT
//CHATS

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary300,
        tabBarInactiveTintColor: Colors.primary800,
        headerTintColor: 'white',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: 'Montserrat_500Medium',
          borderBottomWidth: 0,
        },
        tabBarStyle: {
          //   backgroundColor: Colors.primary600,
          //   borderRadius: 50,
          //   backgroundColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: Colors.primary800,
        },
        tabBarStyle: {
          //   position: 'absolute',
          borderTopWidth: 0,

          //   backgroundColor: 'pink',
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#354d5f6c', '#0d1f2d06']}
            style={{
              height: 100,
            }}
          />
        ),
      }}
      //   tabBar={(props) => {
      //     return (
      //       <LinearGradient
      //         colors={['#0d1f2d1f', '#0d1f2d00']}
      //         start={{ x: 0, y: 0 }}
      //         end={[0, 1]}
      //         // style={{ padding: 30 }}
      //       >
      //         <BottomTabBar
      //           {...props}
      //           style={{ backgroundColor: 'transparent' }}
      //         />
      //       </LinearGradient>
      //     );
      //   }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Event"
        component={EventManager}
        options={{
          tabBarLabelStyle: { fontSize: 15 },
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={40} color={color} />
          ),
          headerShadowVisible: false,
        }}
      />

      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: { fontSize: 15 },
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: '#f05555' },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wechat" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
