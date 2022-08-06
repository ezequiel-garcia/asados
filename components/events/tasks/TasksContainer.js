import { StyleSheet, Text, View, FlatList } from 'react-native';
import Task from './Task';

const TasksContainer = ({
  tasks,
  setCurrentTask,
  setModalVisible,
  setTasks,
}) => {
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
