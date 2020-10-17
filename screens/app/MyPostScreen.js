import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/app/AppHeader";

const MyPostScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AppHeader title="My Post" />
      <Text>MyPost SCREEN</Text>
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
  title: "My Post",
  tabBarIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"}
      size={size}
      color={color}
    />
  ),
};

export default MyPostScreen;
