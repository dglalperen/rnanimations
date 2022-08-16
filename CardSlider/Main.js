import { useWindowDimensions } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue } from "react-native-reanimated";
import { cards, listToObject } from "./data";
import MovableStampcard from "./MovableStampcard";
import { useEffect } from "react";

const Main = () => {
  const positions = useSharedValue(listToObject(cards));
  const dimensions = useWindowDimensions();

  return (
    <>
      <SafeAreaProvider style={{ justifyContent: "center" }}>
        <SafeAreaView
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: dimensions.width,
            height: dimensions.width * 0.8,
            backgroundColor: "black",
          }}
        >
          {cards.map((card) => (
            <MovableStampcard
              id={card.id}
              key={card.id}
              title={card.title}
              color={card.color}
              positions={positions}
            />
          ))}
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default Main;
