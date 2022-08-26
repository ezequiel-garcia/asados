import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Task from './Task';

import { setTasks } from '../../../store/redux/eventsActions';
import { useSelector, useDispatch } from 'react-redux';

const TasksContainer = ({
  //tasks,
  setCurrentTask,
  setModalVisible,
  // setTasks,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.events.currentEvent.tasks);
  const { eid } = useSelector((state) => state.events.currentEvent.eventInfo);
  console.log('current' + JSON.stringify(tasks));

  useEffect(() => {
    if (tasks.length > 0) {
      dispatch(setTasks(eid, tasks));
    }
  }, [tasks]);

  return (
    <View style={styles.container}>
      {tasks?.length == 0 && <Text>No tasks</Text>}
      <FlatList
        data={tasks}
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
});
