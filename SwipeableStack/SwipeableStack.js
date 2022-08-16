import { Text, View } from "react-native";
import React, { Component } from "react";
import ReactNativeSwipeableViewStack from "react-native-swipeable-view-stack";
import { cards } from "../CardSlider/data";
import Stampcard from "../CardSlider/Stampcard";

const SwipeableStack = () => {
  return (
    <ReactNativeSwipeableViewStack
      data={cards}
      renderItem={(card) => <Stampcard color={card.color} title={card.title} />}
      onItemClicked={(card) => console.log(card.title)}
      onSwipe={(index) => console.log(index)}
    />
  );
};

export default SwipeableStack;
