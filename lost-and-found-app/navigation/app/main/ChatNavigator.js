import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
};

export default chatNavigator;
