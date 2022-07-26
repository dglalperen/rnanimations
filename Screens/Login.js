import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => console.log("login send")}>
        <Text style={styles.text}>Login</Text>
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
    backgroundColor: "blue",
    color: "white",
  },
});

export default Login;
