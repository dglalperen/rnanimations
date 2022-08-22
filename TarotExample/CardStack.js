import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { cards, shuffle } from "../CardSliderYT/data";
import { Card } from "./Card";
import { withDelay, withSpring } from "react-native-reanimated";

function getAllIndices(array) {
  let arr = [];
  array.forEach((_, index) => {
    arr.push(index);
  });
  return arr;
}

export const CardStack = () => {
  const rearrange = useSharedValue(false);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card
          card={card}
          key={card.id}
          index={index}
          rearrange={rearrange}
          sizeOfCards={cards.length}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
