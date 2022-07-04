import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useRef, useEffect } from 'react';

import LottieView from 'lottie-react-native';

const Animation = () => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.animContainer}>
      <LottieView
        ref={animation}
        // autoPlay
        loop
        resizeMode="contain"
        source={require('../../assets/event-venue.json')}
      />
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({
  animContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});
