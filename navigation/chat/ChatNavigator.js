import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatOverviewScreen, {
  screenOptions as ChatOverviewScreenOptions,
} from "../../screens/chat/ChatOverviewScreen";

const ChatStackNavigator = createStackNavigator();

const ChatNavigator = (props) => {
  return (
    <ChatStackNavigator.Navigator>
      <ChatStackNavigator.Screen
        name="ChatOverview"
        component={ChatOverviewScreen}
        options={ChatOverviewScreenOptions}
      />
    </ChatStackNavigator.Navigator>
  );
};

export default ChatNavigator;
