import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

const Stampcard = ({ navigation }) => {
  console.log(navigation.params);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details");
        }}
      >
        <Text>Stampcard: </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stampcard;
