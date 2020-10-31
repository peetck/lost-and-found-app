import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import SettingScreen, {
  screenOptions as settingScreenOptions,
} from "../../../screens/app/setting/SettingScreen";
import MyProfileScreen, {
  screenOptions as myProfileScreenOptions,
} from "../../../screens/app/setting/MyProfileScreen";
import MyAccountScreen, {
  screenOptions as myAccountScreenOptions,
} from "../../../screens/app/setting/MyAccountScreen";
import SettingNotificationScreen, {
  screenOptions as settingNotificationScreenOptions,
} from "../../../screens/app/setting/SettingNotificationScreen";
import SettingLanguagesScreen, {
  screenOptions as settingLanguagesScreenOptions,
} from "../../../screens/app/setting/SettingLanguagesScreen";
import SettingThemeScreen, {
  screenOptions as settingThemeScreenOptions,
} from "../../../screens/app/setting/SettingThemeScreen";
import AboutScreen, {
  screenOptions as aboutScreenOptions,
} from "../../../screens/app/setting/AboutScreen";
import HelpScreen, {
  screenOptions as helpScreenOptions,
} from "../../../screens/app/setting/HelpScreen";
import NicknameScreen, {
  screenOptions as nicknameScreenOptions,
} from "../../../screens/app/setting/NicknameEdit";
import ChangePasswordScreen, {
  screenOptions as changePasswordScreenOptions,
} from "../../../screens/app/setting/ChangePassword";
import ChangeEmailScreen, {
  screenOptions as ChangeEmailScreenOptions,
} from "../../../screens/app/setting/ChangeEmail";

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
      <Stack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={myAccountScreenOptions}
      />
      <Stack.Screen
        name="SettingNotification"
        component={SettingNotificationScreen}
        options={settingNotificationScreenOptions}
      />
      <Stack.Screen
        name="SettingLanguages"
        component={SettingLanguagesScreen}
        options={settingLanguagesScreenOptions}
      />
      <Stack.Screen
        name="SettingTheme"
        component={SettingThemeScreen}
        options={settingThemeScreenOptions}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={aboutScreenOptions}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={helpScreenOptions}
      />
      <Stack.Screen
      name="NicknameEdit"
      component={NicknameScreen}
      options={nicknameScreenOptions}
      />
      <Stack.Screen
      name="ChangeEmail"
      component={ChangeEmailScreen}
      options={ChangeEmailScreenOptions}
      />
      <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={ChangeEmailScreenOptions}
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
