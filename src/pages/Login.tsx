import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  sequence,
  EasingNode,
} from 'react-native-reanimated';

import heroImg from '../assets/hero.png';

const Login: React.FC = () => {
  const titlePosition = useSharedValue(30);
  const imagePosition = useSharedValue(-30);

  useEffect(() => {
    imagePosition.value = withTiming(
      0,
      {
        duration: 500,
        easing: Easing.linear,
      },
      () => {
        titlePosition.value = sequence(
          withTiming(0, {
            duration: 1000,
            easing: Easing.bounce,
          }),
          withTiming(-300, {
            duration: 400,
            easing: Easing.ease,
          })
        );
      }
    );
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titlePosition.value }],
    opacity: interpolate(
      titlePosition.value,
      [30, 0],
      [1, 1],
      Extrapolate.CLAMP
    ),
  }));

  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: imagePosition.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131a" />

      <Animated.Image style={[styles.hero, heroStyle]} source={heroImg} />

      <Animated.Text style={[styles.title, titleStyle]}>
        Bem vindo ao app
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hero: {
    width: 288,
    height: 200,
    marginBottom: 40,
  },

  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 32,
  },
});

export default Login;
