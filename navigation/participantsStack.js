import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CurrentParticipants from '../components/events/participants/CurrentParticipants';
import AddParticipants from '../components/events/participants/AddParticipants';

const Stack = createNativeStackNavigator();

export default function ParticipantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CurrentParticipants"
        component={CurrentParticipants}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddParticipants"
        component={AddParticipants}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
