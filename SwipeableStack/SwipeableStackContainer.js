import { View, Text } from "react-native";
import React from "react";
import SwipeableStack from "./SwipeableStack";

const SwipeableStackContainer = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SwipeableStack />
    </View>
  );
};

export default SwipeableStackContainer;
