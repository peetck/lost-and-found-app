import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import MyPostScreen, {
  screenOptions as myPostScreenOptions,
} from "../../../screens/app/main/MyPostsScreen";

const Stack = createStackNavigator();

const MyPostsNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPost"
        component={MyPostScreen}
        options={myPostScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: "My Post",
  tabBarIcon: ({ color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"}
      size={25}
      color={color}
    />
  ),
};

export default MyPostsNavigator;
