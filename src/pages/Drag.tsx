import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Drag: React.FC = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
      posX.value = ctx.posX + event.translationX;
      posY.value = ctx.posY + event.translationY;
    },
    onEnd() {
      posX.value = withSpring(0);
      posY.value = withSpring(0);
    },
  });

  const positionStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: posX.value }, { translateY: posY.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            { width: 120, height: 120, backgroundColor: 'red' },
            positionStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

export default Drag;
