import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { cards, shuffle } from "../LearningExamples/CardSliderYT/data";
import { Card } from "./Card";
import { withDelay, withSpring } from "react-native-reanimated";

export const CardStack = () => {
  const rearrange = useSharedValue(false);
  const arr = useSharedValue(cards);

  const moveToBack = (index, card) => {
    const array = [...arr.value];
    array.splice(index, 1);
    array.unshift(card);
    arr.value = array;
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {arr.value.map((card, index) => (
        <Card
          card={card}
          key={card.id}
          index={index}
          moveToBack={moveToBack}
          rearrange={rearrange}
          sizeOfCards={cards.length}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
