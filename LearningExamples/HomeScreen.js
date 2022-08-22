import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withRepeat,
  withSpring,
  Easing,
  withSequence,
} from "react-native-reanimated";

const HomeScreen = () => {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset.value * -255) }],
    };
  });

  const rotationAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(offset.value * -255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Animated.View
          style={[
            styles.container,
            customSpringStyles,
            styles.box,
            { backgroundColor: "lightgreen" },
          ]}
        />
        <Animated.View
          style={[styles.container, rotationAnimationStyle, styles.box]}
        />
      </View>
      <View style={{ backgroundColor: "purple", padding: 10 }}>
        <TouchableOpacity
          onPress={() =>
            (rotation.value = withSequence(
              withTiming(-10, { duration: 50 }),
              withRepeat(withTiming(10, { duration: 100 }), 6, true),
              withTiming(0, { duration: 50 })
            ))
          }
        >
          <Text style={styles.text}>Animate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 10,
    backgroundColor: "white",
    color: "red",
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "lightpink",
    borderRadius: "20%",
    margin: 10,
  },
});

export default HomeScreen;
