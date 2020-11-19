import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";

import MyPostsScreen, {
  screenOptions as myPostsScreenOptions,
} from "../../../screens/app/main/MyPostsScreen";

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
  title: i18n.t("myPostsNavigator.headerTitle"),
  tabBarIcon: ({ color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"}
      size={25}
      color={color}
    />
  ),
};

export default MyPostsNavigator;
