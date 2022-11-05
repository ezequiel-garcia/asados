import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EventInfo from '../components/events/EventInfo';
import ParticipantsStack from './participantsStack';

const Stack = createNativeStackNavigator();

export default function InfoAndParticipants() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InfoScreen"
        component={EventInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ParticipantsScreen"
        component={ParticipantsStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
