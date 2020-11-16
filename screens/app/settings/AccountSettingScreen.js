import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  AppHeader,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useSelector } from "react-redux";

import SettingItem from "../../../components/app/settings/SettingItem";
import firebase from "firebase";

const AccountSettingScreen = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingItem title="Email" text={user.email} type="text" />
        <SettingItem
          title="Change Password"
          text="Registered"
          type="text"
          onPress={() => {
            props.navigation.navigate("ChangePasswordSetting");

          }}
        />
        <SettingItem
          title="Delete Account"
          text=""
          color="red"
          type="single"
          onPress={() => {
            // firebase.auth().currentUser.delete();
          }}
        />
      </ScrollView>
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
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export const screenOptions = {
  title: "Account",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default AccountSettingScreen;
