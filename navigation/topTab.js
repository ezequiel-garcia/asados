import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventHeader from '../components/header/EventHeader';
import { Colors } from '../constants/styles';
import EventInfo from '../components/events/EventInfo';
import Settings from '../components/settings/Settings';
import TasksScreen from '../components/events/tasks/TasksScreen';
import BillsScreen from '../components/events/bills/BillsScreen';
import BillsStack from './billsStack';
import EventChatScreen from '../components/events/chat/EventChatScreen';
import InfoAndParticipants from './infoAndParticipants';

//PROBANDO
import EventFooter from '../components/footer/EventFooter';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <>
      <EventHeader />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: 'white' },
          tabBarStyle: { backgroundColor: Colors.primary800 },
        }}
      >
        <Tab.Screen name="General" component={InfoAndParticipants} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
        {/* <Tab.Screen name="Bills" component={BillsScreen} /> */}
        <Tab.Screen name="Bills" component={BillsStack} />
        <Tab.Screen name="Chat" component={EventChatScreen} />
      </Tab.Navigator>

      <EventFooter />
    </>
  );
}
