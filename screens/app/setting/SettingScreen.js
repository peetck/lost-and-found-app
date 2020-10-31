import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import SettingList from "../../../components/app/setting/SettingList"

const SettingScreen = (props) => {
  return (
    <View style={styles.screen}>
      <MyText style={{ color: "#0084ff", paddingTop: 15, fontSize: 13, fontFamily: "kanit-bold" }}>My Profile</MyText>
      <View style={[styles.contentContainer, { flex: 1 }]}>
        <SettingList onPress={() => { props.navigation.navigate("MyProfile"); }}
          IconName="ios-person"
          SettingLabel="My profile" />
        <SettingList onPress={() => { props.navigation.navigate("MyAccount"); }}
          IconName="md-clipboard"
          SettingLabel="Account" />
      </View>

      <View style={[styles.contentContainer, { flex: 1.7, paddingTop: 25 }]}>
        <MyText style={{ color: "#0084ff", fontSize: 13, fontFamily: "kanit-bold" }}>App</MyText>
        <SettingList onPress={() => { props.navigation.navigate("SettingNotification"); }}
          IconName="ios-notifications"
          SettingLabel="Notification" />
        <SettingList onPress={() => { props.navigation.navigate("SettingTheme"); }}
          IconName="ios-color-palette"
          SettingLabel="Theme" />
        <SettingList onPress={() => { props.navigation.navigate("SettingLanguages"); }}
          IconName="ios-flag"
          SettingLabel="Languages" />
      </View>

      <View style={{ flex: 4, paddingTop: 25 }}>
        <MyText style={{ color: "#0084ff", fontSize: 13, fontFamily: "kanit-bold" }}>Lost & Found info</MyText>
        <SettingList onPress={() => { props.navigation.navigate("Help"); }}
          IconName="ios-help-circle-outline"
          SettingLabel="Help Center" />
        <SettingList onPress={() => { props.navigation.navigate("About"); }}
          IconName="ios-information-circle-outline"
          SettingLabel="About Lost & Found" />
      </View>

    </View>
  );
};

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Setting",
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          color="black"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5
  }
})

export default SettingScreen;
