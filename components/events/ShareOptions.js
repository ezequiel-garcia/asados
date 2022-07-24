import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '../ui/CheckBox';

const ShareOptions = ({
  shareBills,
  shareTasks,
  setShareBills,
  setShareTasks,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 100 }}>
        <CheckBox
          onPress={setShareTasks}
          checkBoxState={shareTasks}
          text="Share Tasks"
        />
      </View>
      <View style={{ width: 80, marginRight: 12 }}>
        <CheckBox
          onPress={setShareBills}
          checkBoxState={shareBills}
          text="Share Bills"
        />
      </View>
    </View>
  );
};

export default ShareOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
