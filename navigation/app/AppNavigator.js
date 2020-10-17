import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";

const AppStackNavigator = createStackNavigator();

const bottomTabNavigatorOptions = {
  headerShown: false,
};

const AppNavigator = (props) => {
  return (
    <AppStackNavigator.Navigator>
      <AppStackNavigator.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={bottomTabNavigatorOptions}
      />
    </AppStackNavigator.Navigator>
  );
};

export default AppNavigator;
