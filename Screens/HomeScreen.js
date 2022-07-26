import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const SIZE = 100.0;

const handleRotation = (progress) => {
  "worklet";
  return `${180 * progress.value}deg`;
};

const HomeScreen = () => {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: handleRotation(scale) }],
    };
  }, []);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
    });
    scale.value = withTiming(2, {
      duration: 2000,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: "tomato" },
          reanimatedStyle,
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 20,
    backgroundColor: "blue",
    color: "white",
  },
});

export default HomeScreen;
