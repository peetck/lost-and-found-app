import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostNavigator from "./PostNavigator";
import SettingNavigator from "./SettingNavigator";

const AppBottomTabNavigator = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Post") {
      iconName = focused
        ? "ios-information-circle"
        : "ios-information-circle-outline";
    } else if (route.name === "Chat") {
      iconName = focused ? "ios-list-box" : "ios-list";
    } else if (route.name === "Setting") {
      iconName = focused ? "ios-list-box" : "ios-list";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const AppNavigator = (props) => {
  return (
    <AppBottomTabNavigator.Navigator screenOptions={screenOptions}>
      <AppBottomTabNavigator.Screen name="Post" component={PostNavigator} />
      <AppBottomTabNavigator.Screen name="Chat" component={SettingNavigator} />
      <AppBottomTabNavigator.Screen
        name="Setting"
        component={SettingNavigator}
      />
    </AppBottomTabNavigator.Navigator>
  );
};

export default AppNavigator;
