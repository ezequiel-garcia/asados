import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/styles';

const ImagePickerComp = ({ onSetImage }) => {
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);

    if (!pickerResult.cancelled) {
      onSetImage(pickerResult.uri);
    }
  };

  return (
    <TouchableOpacity onPress={openImagePickerAsync} style={styles.addPhoto}>
      <Text style={styles.buttonText}>Change Image</Text>
    </TouchableOpacity>
  );
};

export default ImagePickerComp;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,
  },

  addPhoto: {
    padding: 10,
    backgroundColor: Colors.primary500,
    marginTop: 10,
    width: 150,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  thumbnail: {
    width: 200,
    height: 200,
  },
});
