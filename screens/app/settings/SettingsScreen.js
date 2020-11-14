import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";

const Setting = (props) => {
  return (
    <TouchableOpacity
      style={styles.settingContainer}
      onPress={props.onPress}
      activeOpacity={0.6}
    >
      <Ionicons name={props.iconName} size={25} color="black" />
      <MyText style={styles.label}>{props.label}</MyText>
    </TouchableOpacity>
  );
};

const SettingsScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ ...styles.container, paddingTop: 0 }}>
        <MyText style={styles.title}>Account settings</MyText>
        <Setting
          label="Personal Information"
          iconName="md-contact"
          onPress={() => props.navigation.navigate("ProfileSetting")}
        />
        <Setting
          label="Account"
          iconName="md-card"
          onPress={() => props.navigation.navigate("AccountSetting")}
        />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>General settings</MyText>
        <Setting label="Themes" iconName="md-color-wand" />
        <Setting label="Language" iconName="md-globe" />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>Others</MyText>
        <Setting label="About us" iconName="md-information-circle" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 25,
    backgroundColor: "white",
  },
  container: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightGrey,
  },
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 19,
    paddingBottom: 10,
  },
  label: {
    fontSize: 15,
    paddingLeft: 15,
  },
});

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Settings",
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

export default SettingsScreen;
