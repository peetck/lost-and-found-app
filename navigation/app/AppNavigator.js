import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator, {
  screenOptions as tabNavigatorScreenOptions,
} from "./TabNavigator";
import SearchScreen from "../../screens/app/SearchScreen";
import PostDetailScreen from "../../screens/app/PostDetailScreen";

const AppStackNavigator = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <AppStackNavigator.Navigator>
      <AppStackNavigator.Screen
        name="Tab"
        component={TabNavigator}
        options={tabNavigatorScreenOptions}
      />
      <AppStackNavigator.Screen name="Search" component={SearchScreen} />
      <AppStackNavigator.Screen
        name="PostDetail"
        component={PostDetailScreen}
      />
    </AppStackNavigator.Navigator>
  );
};

export default AppNavigator;
