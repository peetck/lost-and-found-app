import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../../screens/app/HomeScreen";
import MyPostScreen from "../../screens/app/MyPostScreen";
import MyProfileScreen from "../../screens/app/MyProfileScreen";
import Colors from "../../constants/Colors";

const AppBottomTabNavigator = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ size, color }) => {
    let iconName;
    switch (route.name) {
      case "Home":
        iconName = Platform.OS === "android" ? "md-home" : "ios-home";
        break;
      case "MyPost":
        iconName = Platform.OS === "android" ? "md-bookmark" : "ios-bookmark";
        break;
      case "MyProfile":
        iconName = Platform.OS === "android" ? "md-contact" : "ios-contact";
        break;
      default:
        iconName = "ios-home";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const myPostScreenOptions = {
  title: "My Post",
};

const myProfileScreenOptions = {
  title: "My Profile",
};

const AppNavigator = (props) => {
  return (
    <AppBottomTabNavigator.Navigator screenOptions={screenOptions}>
      <AppBottomTabNavigator.Screen name="Home" component={HomeScreen} />
      <AppBottomTabNavigator.Screen
        name="MyPost"
        component={MyPostScreen}
        options={myPostScreenOptions}
      />
      <AppBottomTabNavigator.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={myProfileScreenOptions}
      />
    </AppBottomTabNavigator.Navigator>
  );
};

export default AppNavigator;
