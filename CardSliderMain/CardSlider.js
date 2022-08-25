import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const arr = [
  {
    color: "#E83845",
    id: 0,
    title: "Card 1",
    favicon: require("../assets/favicon.png"),
  },
  {
    color: "#288BA8",
    id: 1,
    title: "Card 2",
    favicon: require("../assets/favicon.png"),
  },
  {
    color: "#FFCE30",
    id: 2,
    title: "Card 3",
    favicon: require("../assets/favicon.png"),
  },
];

const HORIZONTAL_SWIPE_THRESHOLD = 40;
const VERTICAL_SWIPE_THRESHOLD = 80;

function Card({ card, changeIndex, sizeOfCards }) {
  const zIndex = useSharedValue(card.id);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const isFocus = useSharedValue(false);
  const rotateZ = useSharedValue(0);

  useAnimatedReaction(
    () => changeIndex.value,
    (v) => {
      if (v) {
        // if (zIndex.value === 1) {
        //   zIndex.value = withSpring(2, {}, () => {
        //     changeIndex.value = false;
        //   });
        // } else {
        //   zIndex.value = withSpring(1, {}, () => {
        //     changeIndex.value = false;
        //   });
        // }
        zIndex.value += 1;
        if (zIndex.value > sizeOfCards - 1) {
          zIndex.value = withSpring(0, {}, () => {
            changeIndex.value = false;
          });
        }
      }
    },
    [changeIndex]
  );

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value.x = translateX.value;
      offset.value.y = translateY.value;
      isFocus.value = true;
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
      rotateZ.value = translationX;
    })
    .onEnd(({ velocityX, velocityY }) => {
      if (
        translateY.value > VERTICAL_SWIPE_THRESHOLD ||
        translateY.value < -VERTICAL_SWIPE_THRESHOLD ||
        translateX.value > HORIZONTAL_SWIPE_THRESHOLD ||
        translateX.value < -HORIZONTAL_SWIPE_THRESHOLD
      ) {
        changeIndex.value = true;
      }
      translateX.value = withSpring(0);
      translateY.value = withSpring(0, { velocity: velocityY });
      isFocus.value = false;
      rotateZ.value = withTiming(0);
    });

  const style = useAnimatedStyle(
    () => ({
      zIndex: zIndex.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + zIndex.value * 25 },
        { scale: isFocus.value ? withTiming(1.1) : withTiming(1.0) },
        { rotateZ: `${rotateZ.value}deg` },
      ],
    }),
    [zIndex]
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.card, style, { backgroundColor: card.color }]}
      >
        <TouchableOpacity onPress={() => console.log(card.title)}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "900",
              color: "white",
              marginBottom: 10,
            }}
          >
            {card.title}
          </Text>
        </TouchableOpacity>
        <Image source={card.favicon} />
      </Animated.View>
    </GestureDetector>
  );
}

export const CardSlider = () => {
  const changeZIndex = () => {
    "worklet";
    changeIndex.value = true;
  };

  const changeIndex = useSharedValue(false);

  return (
    <View style={styles.container}>
      {arr.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            changeIndex={changeIndex}
            sizeOfCards={arr.length}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20%",
    height: 200,
    width: 300,
  },
});
