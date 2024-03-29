import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Task from './Task';

import { setTasks } from '../../../store/redux/eventsActions';
import { useSelector, useDispatch } from 'react-redux';

const TasksContainer = ({ setCurrentTask, setModalVisible }) => {
  const tasks = useSelector((state) => state.events?.currentEvent?.tasks);

  return (
    <View style={styles.container}>
      {tasks?.length == 0 && <Text style={styles.noTasks}>No tasks</Text>}
      <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        keyExtractor={(task) => task.id}
        renderItem={(itemData) => (
          <Task
            task={itemData.item}
            setCurrentTask={setCurrentTask}
            setModalVisible={setModalVisible}
            setTasks={setTasks}
          />
        )}
      />
    </View>
  );
};

export default TasksContainer;

const styles = StyleSheet.create({
  container: {
    height: '90%',
  },
  noTasks: {
    color: '#eeebebb7',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 30,
  },
});
