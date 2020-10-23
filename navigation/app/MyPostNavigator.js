import React from "react";
import { Platform } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import MyPostScreen, {
  screenOptions as myPostScreenOptions,
} from "../../screens/app/MyPostScreen";

const Stack = createStackNavigator();

const MyPostNavigator = (props) => {
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
  tabBarIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"}
      size={size}
      color={color}
    />
  ),
};

export default MyPostNavigator;
