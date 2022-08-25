import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
} from "react-native-reanimated";
import { useState } from "react";
import { clamp, SONG_HEIGHT, objectMove } from "./data";
import Song from "./Song";

export default function MovebleSong({
  id,
  artist,
  cover,
  title,
  positions,
  scrollY,
  songsCount,
}) {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previosPosition) => {
      if (currentPosition !== previosPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;
      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });
      const newPosition = clamp(
        Math.floor(positionY / SONG_HEIGHT),
        0,
        songsCount - 1
      );
      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition
        );
      }
    },
    onFinish() {
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value,
      backgroundColor: "white",
      zIndex: moving ? 1 : 0,
      shadowColor: "black",
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={uas}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{ maxWidth: "80%" }}>
          <Song artist={artist} cover={cover} title={title} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}
