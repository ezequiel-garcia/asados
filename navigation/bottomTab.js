import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
// NEW EVENT
//CHATS

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary400,
        tabBarInactiveTintColor: Colors.primary800,
        // tabBarStyle: {
        //   backgroundColor: Colors.primary600,
        //   borderRadius: 50,
        // },

        tabBarStyle: { position: 'absolute', borderTopWidth: 0 },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#1a262f0f', '#0d1f2d00']}
            // style={{
            //   height: 100,
            // }}
          />
        ),
      }}
      //   tabBar={(props) => {
      //     return (
      //       <LinearGradient
      //         colors={['#0d1f2d1f', '#0d1f2d00']}
      //         start={{ x: 0, y: 0 }}
      //         end={[0, 1]}
      //         style={{ padding: 30 }}
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
        name="New"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: { fontSize: 15 },
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={40} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: { fontSize: 15 },
          tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wechat" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
