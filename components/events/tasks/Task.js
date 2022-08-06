import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CheckBox from '../../ui/CheckBox';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const Task = ({ task, setCurrentTask, setModalVisible, setTasks }) => {
  // const [task, setTask] = useState();
  // const [inCharge, setInCharge] = useState()

  function handlePress() {
    //TIENE QUE CAMBIAR EL ISDONE del task
  }

  function onEdit() {
    setCurrentTask(task);
    setModalVisible(true);
  }

  function handleDelete() {
    setTasks((prev) => prev.filter((item) => item.id != task.id));
  }

  return (
    <View style={{ marginVertical: 5 }}>
      <View
        style={{
          flexDirection: 'row',
          //   justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 6 }}>
          <CheckBox
            onPress={handlePress}
            checkBoxState={task.isDone}
            text={task.title}
            decoration="line-through"
          />
        </View>
        <View style={{ flex: 2, marginLeft: 10 }}>
          <Text style={styles.text}>( {task.inCharge} )</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={onEdit}>
              <MaterialIcons name="mode-edit" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <MaterialIcons
                name="delete-outline"
                size={24}
                color="#f47777b3"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
});
