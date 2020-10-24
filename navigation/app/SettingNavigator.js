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
import MyAccountScreen, {
  screenOptions as myAccountScreenOptions
} from "../../screens/app/MyAccountScreen";
import SettingNotificationScreen, {
  screenOptions as settingNotificationScreenOptions
} from "../../screens/app/SettingNotificationScreen";
import SettingLanguagesScreen, {
  screenOptions as settingLanguagesScreenOptions
} from "../../screens/app/SettingLanguagesScreen";
import SettingThemeScreen, {
  screenOptions as settingThemeScreenOptions
} from "../../screens/app/SettingThemeScreen";
import AboutScreen, {
  screenOptions as aboutScreenOptions
} from "../../screens/app/AboutScreen";
import HelpScreen, {
  screenOptions as helpScreenOptions
} from "../../screens/app/HelpScreen";

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
