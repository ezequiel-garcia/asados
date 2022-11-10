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

import EventFooter from '../components/footer/EventFooter';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const eventInfo = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );

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
        {/* Check if in the event tasks and bills are shared */}
        {currentUser.uid == eventInfo?.admin || eventInfo?.shareTasks ? (
          <Tab.Screen name="Tasks" component={TasksScreen} />
        ) : null}
        {currentUser.uid == eventInfo?.admin || eventInfo?.Bills == true ? (
          <Tab.Screen name="Bills" component={BillsStack} />
        ) : null}
        <Tab.Screen name="Chat" component={EventChatScreen} />
      </Tab.Navigator>
      <EventFooter />
    </>
  );
}
