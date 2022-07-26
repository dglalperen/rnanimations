import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => console.log("Settings")}>
        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>
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
    backgroundColor: "green",
    color: "white",
  },
});

export default SettingsScreen;
