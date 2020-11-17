import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import MyPostsScreen, {
  screenOptions as myPostsScreenOptions,
} from "../../../screens/app/main/MyPostsScreen";

const en = {
  myPost: "MY POST"
};

const th = {
  myPost: "โพสต์ของคุณ"
};

const Stack = createStackNavigator();

const MyPostsNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={myPostsScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: "My Posts",
  tabBarIcon: ({ color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"}
      size={25}
      color={color}
    />
  ),
};

export default MyPostsNavigator;
