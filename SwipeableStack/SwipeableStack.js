import { Text, View } from "react-native";
import React, { Component } from "react";
import ReactNativeSwipeableViewStack from "react-native-swipeable-view-stack";
import { cards } from "../CardSliderYT/data";
import Stampcard from "../CardSliderYT/Stampcard";

const SwipeableStack = () => {
  return (
    <ReactNativeSwipeableViewStack
      data={cards}
      renderItem={(card) => (
        <Stampcard
          color={card.color}
          title={card.title}
          favicon={card.favicon}
        />
      )}
      onItemClicked={(card) => console.log(card.title)}
      onSwipe={(index) => console.log(index)}
      stackSpacing={35}
    />
  );
};

export default SwipeableStack;
