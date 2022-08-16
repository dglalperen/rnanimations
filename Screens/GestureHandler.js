import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import {
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const GestureHandler = () => {
  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      //   ctx.startX = x.value;
      //   ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const ballStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: withSpring(pressed.value ? 1.1 : 1) },
      ],
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, ballStyle]} />
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    backgroundColor: "tomato",
    height: 150,
    width: 250,
    borderRadius: "20%",
  },
});

export default GestureHandler;
