import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import SettingScreen, {
  screenOptions as settingScreenOptions,
} from "../../screens/app/SettingScreen";
import MyProfileScreen, {
  screenOptions as myProfileScreenOptions,
} from "../../screens/app/MyProfileScreen";

const Stack = createStackNavigator();

const SettingNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={settingScreenOptions}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={myProfileScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: "Setting",
  drawerIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
      size={size}
      color={color}
    />
  ),
};

export default SettingNavigator;
