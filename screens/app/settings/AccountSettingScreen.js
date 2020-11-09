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

import SettingItem from "../../../components/app/settings/SettingItem";

const AccountSettingScreen = (props) => {
  return (

    <View style = {styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false} >

        <SettingItem HeaderText = 'Telephone' title = '081 000 0000' color = 'default' type = 'text' />
        <SettingItem HeaderText = 'Change Email' title = 'Registered' color = 'default' type = 'text' />
        <SettingItem HeaderText = 'Change Password' title = 'Registered' color = 'default' type = 'text' />
        <SettingItem HeaderText = 'Delete Account' title = '' color = 'red' type = 'single' />

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
  },
});

export const screenOptions = {
  title: "Account",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default AccountSettingScreen;
