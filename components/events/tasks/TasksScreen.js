import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TasksContainer from './TasksContainer';
import Background from '../../ui/Background';
import Button from '../../ui/Button';

const tasksStam = [
  {
    id: 1,
    title: 'Comprar carne',
    inCharge: 'Ezequiel',
  },
  {
    id: 2,
    title: 'Alcohol',
    inCharge: 'Pepe',
  },
  {
    id: 3,
    title: 'Comprar verduras, papa, tomatte, cebolla',
    inCharge: 'Pepe',
  },
];

const TasksScreen = () => {
  const [tasks, setTasks] = useState(tasksStam);

  return (
    <Background>
      <View style={styles.container}>
        <TasksContainer tasks={tasks} />
        <Button personalStyle={styles.button}>ADD TASK</Button>
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
