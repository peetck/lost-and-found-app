import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import firebase from "firebase";

import AppHeader from "../../components/app/AppHeader";
import MyButton from "../../components/UI/MyButton";

const MyProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AppHeader title="My Profile" />
      <Text>MyProfile SCREEN</Text>
      <MyButton
        title="DUMMY LOGOUT"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
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
