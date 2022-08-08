import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Input from '../../ui/Input';
import { Colors } from '../../../constants/styles';

const ModalTask = ({
  modalVisible,
  setModalVisible,
  setTasks,
  currentTask,
  setCurrentTask,
}) => {
  const [taskTitle, setTaskTitle] = useState(
    currentTask ? currentTask.title : ''
  );
  const [inCharge, setInCharge] = useState(
    currentTask ? currentTask.inCharge : ''
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (currentTask) {
      setTaskTitle(currentTask.title);
      setInCharge(currentTask.inCharge);
      setError(false);
    }
  }, [modalVisible, currentTask]);

  function handleAdd() {
    if (taskTitle.trim() == '' || inCharge.trim() == '') {
      setError(true);
    } else {
      //HAVE TO ADD TO THE TASKS
      setTasks((prev) => [
        { id: Math.random(), title: taskTitle, inCharge: inCharge },
        ...prev,
      ]);

      onCancel();
    }
  }

  function handleEdit() {
    if (taskTitle.trim() == '' || inCharge.trim() == '') {
      setError(true);
    } else {
      //HAVE TO EDIT THE TASK
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id != currentTask.id) {
            return task;
          } else {
            return { id: task.id, title: taskTitle, inCharge: inCharge };
          }
        })
      );
      onCancel();
    }
  }

  function onCancel() {
    // initializate the inputs
    setTaskTitle('');
    setInCharge('');
    setCurrentTask(null);
    // Close the modal
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalView}>
              {error && (
                <Text style={styles.errorText}>
                  Error. Check your data and try again
                </Text>
              )}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Task Title"
                    inputStyle={styles.inputStyle}
                    onUpdateValue={(e) => {
                      setTaskTitle(e);
                      setError(false);
                    }}
                    value={taskTitle}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="In Charge"
                    inputStyle={styles.inputStyle}
                    onUpdateValue={(e) => {
                      setInCharge(e), setError(false);
                    }}
                    value={inCharge}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                {currentTask ? (
                  <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <Text>SAVE</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text>ADD</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.button} onPress={onCancel}>
                  <Text>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalTask;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'rgba(4, 22, 36, 0.747)',
    margin: 20,
    width: '80%',

    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputStyle: {
    fontSize: 16,
    backgroundColor: Colors.primary600,
    color: 'white',
  },
  button: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.secondary600,
    borderRadius: 10,
  },
  errorText: {
    color: Colors.error50,
    fontFamily: 'Montserrat_300Light',
  },
});
