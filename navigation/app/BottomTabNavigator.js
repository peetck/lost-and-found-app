import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../../screens/app/HomeScreen";
import MyPostScreen, {
  screenOptions as myPostScreenOptions,
} from "../../screens/app/MyPostScreen";
import MyProfileScreen, {
  screenOptions as myProfileScreenOptions,
} from "../../screens/app/MyProfileScreen";

const BottomTabNavigator = createBottomTabNavigator();

const AppNavigator = (props) => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <BottomTabNavigator.Screen
        name="MyPost"
        component={MyPostScreen}
        options={myPostScreenOptions}
      />
      <BottomTabNavigator.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={myProfileScreenOptions}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default AppNavigator;
