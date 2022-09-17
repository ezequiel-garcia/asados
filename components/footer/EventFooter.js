import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TabElement from './TabElement';

const EventFooter = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#354d5f6c', '#0d1f2d06']}
        style={styles.tabsContainer}
      >
        <TabElement icon="home" label="Home" size={27} />
        <TabElement icon="plus" label="" size={40} />
        <TabElement icon="wechat" label="Chats" size={27} />
      </LinearGradient>
    </View>
  );
};

export default EventFooter;

const styles = StyleSheet.create({
  container: { height: 90 },
  tabsContainer: {
    height: 100,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
