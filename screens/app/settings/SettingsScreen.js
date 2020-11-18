import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { saveLanguageSetting } from "../../../store/actions/storage";
import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";

const en = {
  header1: "Account settings",
  header2: "General settings",
  item1: "Account",
  item2: "Language",
};

const th = {
  header1: "ตั้งค่าบัญชี",
  header2: "ตั้งค่าทั่วไป",
  item1: "บัญชี",
  item2: "เปลี่ยนถาษา",
};

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
  const dispatch = useDispatch();
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ ...styles.container, paddingTop: 0 }}>
        <MyText style={styles.title}>Account settings</MyText>
        <Setting
          label="Account"
          iconName="md-card"
          onPress={() => props.navigation.navigate("AccountSetting")}
        />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>General settings</MyText>
        <Setting label="Language" iconName="md-globe" onPress={() => {}} />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>Dev Temporary settings</MyText>
        <Setting
          label="Language -> en"
          iconName="md-globe"
          onPress={() => {
            dispatch(saveLanguageSetting("en"));
          }}
        />
        <Setting
          label="Language -> th"
          iconName="md-globe"
          onPress={() => {
            dispatch(saveLanguageSetting("th"));
          }}
        />
      </View>
      {/* Temporary */}
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
