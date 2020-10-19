import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator, {
  screenOptions as tabNavigatorScreenOptions,
} from "./TabNavigator";

const AppStackNavigator = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <AppStackNavigator.Navigator>
      <AppStackNavigator.Screen
        name="Tab"
        component={TabNavigator}
        options={tabNavigatorScreenOptions}
      />
    </AppStackNavigator.Navigator>
  );
};

export default AppNavigator;
