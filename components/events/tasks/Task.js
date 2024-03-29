import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CheckBox from '../../ui/CheckBox';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEventTasks } from '../../../store/redux/eventsSlice';
import {
  deleteTasksFromDB,
  setTasks,
} from '../../../store/redux/eventsActions';

const Task = ({ task, setCurrentTask, setModalVisible }) => {
  // const [task, setTask] = useState();
  // const [inCharge, setInCharge] = useState()

  const tasks = useSelector((state) => state.events.currentEvent.tasks);
  const { eid } = useSelector((state) => state.events.currentEvent.eventInfo);
  const dispatch = useDispatch();

  function handlePress() {
    //TIENE QUE CAMBIAR EL ISDONE del task
    const isDoneTasks = tasks.map((item) => {
      if (item.id != task.id) {
        return item;
      } else {
        return {
          id: item.id,
          title: item.title,
          inCharge: item.inCharge,
          isDone: !item.isDone,
        };
      }
    });

    dispatch(setTasks(eid, isDoneTasks));
  }

  function onEdit() {
    setCurrentTask(task);
    setModalVisible(true);
  }

  function handleDelete() {
    const newTasks = tasks.filter((item) => item.id != task.id);

    dispatch(setTasks(eid, newTasks));

    //CHECK IF IS EMPTY NOW TO UPDATE THE DB FOR NOTHING
    // if (newTasks.length == 0) {
    //   dispatch(deleteTasksFromDB(eid));
    // }
  }

  return (
    <View style={{ marginVertical: 5 }}>
      <View
        style={{
          flexDirection: 'row',

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
        <View style={{ flex: 2 }}>
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
