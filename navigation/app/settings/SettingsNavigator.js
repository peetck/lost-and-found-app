import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../../../screens/app/settings/SettingsScreen";
import AccountSettingScreen, {
  screenOptions as accountSettingScreenOptions,
} from "../../../screens/app/settings/AccountSettingScreen";
import ChangeNameSettingScreen, {
  screenOptions as ChangeNameSettingScreenOptions,
} from "../../../screens/app/settings/ChangeNameSettingScreen";
import ChangePasswordSettingScreen, {
  screenOptions as ChangePasswordSettingScreenOptions,
} from "../../../screens/app/settings/ChangePasswordSettingScreen";

const Stack = createStackNavigator();

const SettingsNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSettingScreen}
        options={accountSettingScreenOptions}
      />
      <Stack.Screen
        name="ChangeNameSetting"
        component={ChangeNameSettingScreen}
        options={ChangeNameSettingScreenOptions}
      />
      <Stack.Screen
        name="ChangePasswordSetting"
        component={ChangePasswordSettingScreen}
        options={ChangePasswordSettingScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: "Settings",
  drawerIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
      size={size}
      color={color}
    />
  ),
};

export default SettingsNavigator;
