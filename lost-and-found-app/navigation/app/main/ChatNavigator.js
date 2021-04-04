import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";

import ChatListScreen, {
  screenOptions as chatListScreenOptions,
} from "../../../screens/app/main/ChatListScreen";

const Stack = createStackNavigator();

const chatNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={chatListScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: i18n.t("chatNavigator.headerTitle"),
  tabBarIcon: ({ color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-chatbubbles" : "ios-chatbubbles"}
      size={25}
      color={color}
    />
  ),
};

export default chatNavigator;
