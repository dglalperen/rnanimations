import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Platform,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import Stampcard from "../CardSliderYT/Stampcard";

const { width: wWidth, height } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const CARD_WIDTH = 350;

const CARD_HEIGHT = 200;
const DURATION = 250;

// THRESHOLDS
const HORIZONTAL_SWIPE_THRESHOLD = 40;
const VERTICAL_SWIPE_THRESHOLD = 80;

export const Card = ({ card, rearrange, index, sizeOfCards }) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const delay = index * DURATION;
  const theta = -10 + Math.random() * 20;
  const zIndex = useSharedValue(index);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
    );
    rotateZ.value = withDelay(delay, withSpring(theta));
  }, [delay, index, rotateZ, theta, translateY]);

  useAnimatedReaction(
    () => rearrange.value,
    (v) => {
      if (v) {
        const duration = 150 * index;

        zIndex.value = index + 1;
        if (zIndex.value > sizeOfCards - 1) {
          zIndex.value = 0;
        }
        // translateY.value = withDelay(
        //   duration,
        //   withSpring(zIndex.value * 20, {}, () => {
        //     rearrange.value = false;
        //   })
        // );
        translateY.value = withSpring(-zIndex.value * 20, {}, () => {
          rearrange.value = false;
        });
        //rotateZ.value = withDelay(duration, withSpring(theta));
      }
    },
    [rearrange]
  );

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value.x = translateX.value;
      offset.value.y = translateY.value;
      rotateZ.value = withTiming(0);
      //scale.value = withTiming(1.1);
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      //const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      if (
        translateY.value > VERTICAL_SWIPE_THRESHOLD ||
        translateY.value < -VERTICAL_SWIPE_THRESHOLD ||
        translateX.value > HORIZONTAL_SWIPE_THRESHOLD ||
        translateX.value < -HORIZONTAL_SWIPE_THRESHOLD
      ) {
        rearrange.value = true;
      }
      console.log(zIndex.value);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0, { velocity: velocityY });

      // scale.value = withTiming(1, {}, () => {
      //   const isLast = index === 0;
      //   const isSwipedLeftOrRight = dest !== 0;

      // });
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value + index * 20 },
      { scale: scale.value },
    ],
    zIndex: zIndex.value,
    elevation: Platform.OS === "android" ? zIndex.value : 0,
    //display: visibleCards.includes(index) ? "flex" : "none",
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.card,
            style,
            { backgroundColor: card.color !== null ? card.color : "white" },
          ]}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {card.title}
          </Text>
          <Image source={card.favicon} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
