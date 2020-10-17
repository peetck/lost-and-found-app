import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import AppHeader from "../../components/app/AppHeader";

const MyProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AppHeader title="My Profile" />
      <Text>MyProfile SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});

export const screenOptions = {
  title: "My Profile",
  tabBarIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-contact" : "ios-contact"}
      size={size}
      color={color}
    />
  ),
};

export default MyProfileScreen;
