import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../../../screens/app/main/HomeScreen";


const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: "Home",
  tabBarIcon: ({ color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-home" : "ios-home"}
      size={25}
      color={color}
    />
  ),
};

export default HomeNavigator;
