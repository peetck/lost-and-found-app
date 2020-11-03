import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import SettingList from "../../../components/app/settings/SettingList";
import colors from "../../../shared/colors";

const SettingsScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ ...styles.container, paddingTop: 0 }}>
        <MyText style={styles.title}>Account settings</MyText>
        <SettingList
          label="Personal Information"
          iconName="md-contact"
          onPress={() => props.navigation.navigate("ProfileSetting")}
        />
        <SettingList
          label="Account"
          iconName="md-card"
          onPress={() => props.navigation.navigate("AccountSetting")}
        />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>General settings</MyText>
        <SettingList label="Themes" iconName="md-color-wand" />
        <SettingList label="Language" iconName="md-globe" />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>Others</MyText>
        <SettingList label="About us" iconName="md-information-circle" />
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
  title: {
    fontSize: 18,
    paddingBottom: 10,
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
