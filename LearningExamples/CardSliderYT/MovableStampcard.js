import React from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Stampcard from "./Stampcard";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";

const HORIZONTAL_SWIPE_THRESHOLD = 40;
const SCROLL_DISABLE_THRESHOLD = 5;
const CLICK_THRESHOLD = 10;
const SWIPE_ANIM_DURATION = 300;

const MovableStampcard = ({ id, title, color, positions }) => {
  const dimensions = useWindowDimensions();

  const [moving, setMoving] = useState(false);
  const zIndexCard = useSharedValue(positions.value[id] + 1);
  const topOffset = useSharedValue(zIndexCard.value * 30);
  const leftOffset = useSharedValue((dimensions.width - 350) / 2);
  const resetTopOffset = zIndexCard.value * 30;
  const resetLeftOffset = (dimensions.width - 350) / 2;

  const [visibleCards, setVisibleCards] = useState([]);
  const [indexC, setIndexC] = useState(3);

  // useEffect(() => {
  //   var arr = [];
  //   cardsData.forEach((card, index) => {
  //     if (index < indexC) {
  //       arr.push(card);
  //     }
  //   });
  //   setVisibleCards(arr);
  // }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx) {
      ctx.x = x.value;
      ctx.y = y.value;
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const transformX = event.translationX;
      const transformY = event.translationY;
      // console.log(`x: ${event.absoluteX}`);
      // console.log(`y: ${event.absoluteY}`);

      if (moving) {
        topOffset.value = withSpring(transformY + 100);
        leftOffset.value = withSpring(transformX);
      }
    },
    onFinish(event) {
      runOnJS(setMoving)(false);
      if (
        event.absoluteX < 20 ||
        event.absoluteX > 330 ||
        event.absoluteY < 300 ||
        event.absoluteY > 520
      ) {
        topOffset.value = withSpring((zIndexCard.value - 1) * 30);
        //zIndexCard.vallue -= 1;
        leftOffset.value = withSpring(resetLeftOffset);
        console.log("moving back");
      } else {
        topOffset.value = withSpring(resetTopOffset);
        leftOffset.value = withSpring(resetLeftOffset);
      }
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      zIndex: zIndexCard.value,
      position: "absolute",
      top: topOffset.value,
      left: leftOffset.value,
    };
  }, [moving]);
  return (
    <Animated.View style={uas}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <Stampcard title={title} color={color} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default MovableStampcard;
