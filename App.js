import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import DetailsScreen from "./Screens/DetailsScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const isLoggedIn = true;

const screenOptions = {
  headerShown: false,
};

const SignedInStack = () => (
  <NavigationContainer>
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => {
  return isLoggedIn ? <SignedInStack /> : <SignedOutStack />;
};

export default App;
