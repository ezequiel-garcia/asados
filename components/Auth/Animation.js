import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';

import LottieView from 'lottie-react-native';

const Animation = () => {
  const animation = useRef(null);

  const { height, width } = Dimensions.get('window');
  const animationHeight = height < 700 ? 140 : 180;

  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={[styles.animContainer, { height: animationHeight }]}>
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
    alignContent: 'center',

    // height: 180,
    marginBottom: 20,
  },
});
