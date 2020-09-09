import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileScreen from "../../screens/app/UserProfileScreen";

const SettingStackNavigator = createStackNavigator();

const SettingNavigator = (props) => {
  return (
    <SettingStackNavigator.Navigator headerMode="none">
      <SettingStackNavigator.Screen
        name="UserProfile"
        component={UserProfileScreen}
      />
    </SettingStackNavigator.Navigator>
  );
};

export default SettingNavigator;
