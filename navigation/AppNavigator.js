import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostNavigator from "./post/PostNavigator";
import Colors from "../constants/Colors";

const AppBottomTabNavigator = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case "Lost":
        iconName = "ios-home";
        break;
      case "Found":
        iconName = "ios-chatbubbles";
        break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const AppNavigator = (props) => {
  return (
    <AppBottomTabNavigator.Navigator screenOptions={screenOptions}>
      <AppBottomTabNavigator.Screen name="Lost" component={PostNavigator} />
      <AppBottomTabNavigator.Screen name="Found" component={PostNavigator} />
    </AppBottomTabNavigator.Navigator>
  );
};

export default AppNavigator;
