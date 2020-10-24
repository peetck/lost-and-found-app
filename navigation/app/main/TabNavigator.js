import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator, {
  navigatorOptions as homeNavigatorOptions,
} from "./HomeNavigator";
import MyPostNavigator, {
  navigatorOptions as myPostNavigatorOptions,
} from "./MyPostNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={homeNavigatorOptions}
      />
      <Tab.Screen
        name="MyPostNavigator"
        component={MyPostNavigator}
        options={myPostNavigatorOptions}
      />
    </Tab.Navigator>
  );
};

export const navigatorOptions = {
  title: "Home",
  headerShown: false,
};

export default TabNavigator;
