import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';
import TasksContainer from './TasksContainer';
import Background from '../../ui/Background';
import Button from '../../ui/Button';
import ModalTask from './ModalTask';

const TasksScreen = () => {
  // const [tasks, setTasks] = useState(tasksStam);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  return (
    <Background>
      <View style={styles.container}>
        <ModalTask
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          // setTasks={setTasks}
        />

        {/* receive all this stuff so from the task i can open the modal with edit and delete */}
        <TasksContainer
          // tasks={tasks}
          setCurrentTask={setCurrentTask}
          setModalVisible={setModalVisible}
          // setTasks={setTasks}
        />

        <Button
          personalStyle={styles.button}
          onPress={() => setModalVisible(true)}
        >
          ADD TASK
        </Button>
      </View>
    </Background>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    // alignItems: 'center',
  },
  button: {
    width: '40%',
  },
});
