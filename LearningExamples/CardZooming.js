import { Animated, useWindowDimensions, PanResponder } from "react-native";
import { useRef } from "react";

const pointsDistance = ([xA, yA], [xB, yB]) => {
  return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
};

const IMAGE_URI =
  "https://i.pinimg.com/736x/95/2c/91/952c91c13a7dfaf50c1c4a5116b51013.jpg";

export default function CardZooming() {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const scale = useRef(new Animated.Value(1)).current;

  const dimensions = useWindowDimensions();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTouches = evt.nativeEvent.changedTouches.length;

        if (activeTouches === 1) {
          pan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
        } else if (activeTouches >= 2) {
          const touches = evt.nativeEvent.changedTouches;

          const touchA = touches[0];
          const touchB = touches[1];

          const distance = pointsDistance(
            [touchA.pageX, touchA.pageY],
            [touchB.pageX, touchB.pageY]
          );

          const screenMovedPercents = distance / dimensions.width;

          scale.setValue(1 + screenMovedPercents * 3);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  return (
    <Animated.Image
      source={{ uri: IMAGE_URI }}
      {...panResponder.panHandlers}
      style={{
        height: 200,
        width: "80%",
        top: 350,
        left: 50,
        backgroundColor: "purple",
        borderRadius: 10,
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
      }}
    />
  );
}
