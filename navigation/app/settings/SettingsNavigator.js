import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";

import SettingsScreen, {
  screenOptions as settingsScreenOptions,
} from "../../../screens/app/settings/SettingsScreen";
import AccountSettingScreen, {
  screenOptions as accountSettingScreenOptions,
} from "../../../screens/app/settings/AccountSettingScreen";
import ChangeNicknameScreen, {
  screenOptions as changeNicknameScreenOptions,
} from "../../../screens/app/settings/ChangeNicknameScreen";

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
        name="ChangeNickname"
        component={ChangeNicknameScreen}
        options={changeNicknameScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = {
  title: i18n.t("settingsNavigator.headerTitle"),
  drawerIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
      size={size}
      color={color}
    />
  ),
};

export default SettingsNavigator;
