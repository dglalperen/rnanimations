import { Text, SafeAreaView, StyleSheet } from "react-native";

import React from "react";

const DetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{navigation.params.title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 20,
    backgroundColor: "red",
    color: "white",
  },
});

export default DetailsScreen;
