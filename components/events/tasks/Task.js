import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '../../ui/CheckBox';
import React, { useState } from 'react';

const Task = ({ task }) => {
  // const [task, setTask] = useState();
  // const [inCharge, setInCharge] = useState()

  function handlePress() {
    //TIENE QUE CAMBIAR EL ISDONE del task
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
          <Text style={styles.text}>({task.inCharge})</Text>
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
