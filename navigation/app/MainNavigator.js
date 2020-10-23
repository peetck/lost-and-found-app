import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import TabNavigator, {
  navigatorOptions as tabNavigatorOptions,
} from "./TabNavigator";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../../screens/app/SearchScreen";
import PostDetailScreen, {
  screenOptions as postDetailScreenOptions,
} from "../../screens/app/PostDetailScreen";

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={tabNavigatorOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={postDetailScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: "Home",
  drawerIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-home" : "ios-home"}
      size={size}
      color={color}
    />
  ),
};

export default MainNavigator;
