import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  Children,
} from "react";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  runOnJS,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  clockRunning,
} from "react-native-reanimated";
import Stampcard from "../CardSliderYT/Stampcard";
import { cards } from "../CardSliderYT/data";

const HORIZONTAL_SWIPE_THRESHOLD = 40;
const VERTICAL_SWIPE_THRESHOLD = 80;
const SCROLL_DISABLE_THRESHOLD = 5;
const CLICK_THRESHOLD = 10;
const SWIPE_ANIM_DURATION = 200;

const CardSliderContainer = ({ cardsData }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [indexC, setIndexC] = useState(3);
  const zIndex = useSharedValue(1);

  useEffect(() => {
    var arr = [];
    cardsData.forEach((card, index) => {
      if (index < indexC) {
        arr.push(card);
        console.log(card);
      }
    });
    setVisibleCards(arr);
  }, []);

  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    "worklet";
    active.value = destination !== 0;
    translateY.value = withSpring(
      destination,
      { damping: 50 },
      ({ finished }) => {}
    );
  }, []);

  const slideBack = useCallback(() => {}, []);
  const context = useSharedValue({ x: 0, y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateX.value = event.translationX + context.value.x;

      //   translateY.value = Math.max(translateY.value, FullView);
    })
    .onEnd((event) => {
      //   if ((CurrentY == HalfView && context.value.y - translateY.value) > 100) {
      //     scrollTo(FullView);
      //     runOnJS(setCurrentY)(FullView);
      //     runOnJS(haptic)("normal");
      //   } else if (
      //     CurrentY == HalfView &&
      //     context.value.y - translateY.value < -100
      //   ) {
      //     scrollTo(OutOfView);
      //     runOnJS(haptic)("normal");
      //     runOnJS(setCurrentY)(OutOfView);
      //     runOnJS(closePreview)();
      //   } else if (
      //     CurrentY == FullView &&
      //     context.value.y - translateY.value < -630
      //   ) {
      //     scrollTo(OutOfView);
      //     runOnJS(setCurrentY)(OutOfView);
      //     runOnJS(haptic)("normal");
      //     runOnJS(closePreview)();
      //   } else if (
      //     CurrentY == FullView &&
      //     context.value.y - translateY.value < -100
      //   ) {
      //     scrollTo(HalfView);
      //     runOnJS(setCurrentY)(HalfView);
      //     runOnJS(haptic)("normal");
      //   } else {
      //     scrollTo(CurrentY);
      //   }
    });

  const stackStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  return (
    <Animated.View style={{ flex: 1 }}>
      {visibleCards && (
        <Animated.View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {visibleCards.map((card) => {
            return (
              <Animated.View key={card.id} style={stackStyle}>
                <GestureDetector gesture={gesture}>
                  <Stampcard
                    favicon={card.favicon}
                    title={card.title}
                    color={card.color}
                  />
                </GestureDetector>
              </Animated.View>
            );
          })}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default CardSliderContainer;
