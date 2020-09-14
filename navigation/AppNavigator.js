import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostNavigator from "./post/PostNavigator";
import ChatNavigator from "./chat/ChatNavigator";
import Colors from "../constants/Colors";

const AppBottomTabNavigator = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case "Post":
        iconName = "ios-home";
        break;
      case "Chat":
        iconName = "ios-chatbubbles";
        break;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const AppNavigator = (props) => {
  return (
    <AppBottomTabNavigator.Navigator screenOptions={screenOptions}>
      <AppBottomTabNavigator.Screen name="Post" component={PostNavigator} />
      <AppBottomTabNavigator.Screen name="Chat" component={ChatNavigator} />
    </AppBottomTabNavigator.Navigator>
  );
};

export default AppNavigator;
