import { StatusBar } from "react-native";
import React, { useRef } from "react";
import { SONGS, SONG_HEIGHT, listToObject } from "./data";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import MovebleSong from "./MovableSong";

const DragSort = () => {
  const positions = useSharedValue(listToObject(SONGS));
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            style={{
              flex: 1,
              position: "relative",
              backgroundColor: "white",
            }}
            contentContainerStyle={{
              height: SONGS.length * SONG_HEIGHT,
            }}
          >
            {SONGS.map((song) => (
              <MovebleSong
                key={song.id}
                id={song.id}
                artist={song.artist}
                cover={song.cover}
                title={song.title}
                positions={positions}
                scrollY={scrollY}
                songsCount={SONGS.length}
              />
            ))}
          </Animated.ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default DragSort;
