import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";
import {
  changeLanguageActionSheetOptions,
  changeLanguage,
} from "../../../shared/utils";

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
  const { showActionSheetWithOptions } = useActionSheet();

  const changeLanguageHandler = () => {
    showActionSheetWithOptions(changeLanguageActionSheetOptions, (index) => {
      if (index !== 2) {
        changeLanguage(index);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ ...styles.container, paddingTop: 0 }}>
        <MyText style={styles.title}>{i18n.t("settingsScreen.header1")}</MyText>
        <Setting
          label={i18n.t("settingsScreen.item1")}
          iconName={Platform.OS === "android" ? "md-card" : "ios-card"}
          onPress={() => props.navigation.navigate("AccountSetting")}
        />
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>{i18n.t("settingsScreen.header2")}</MyText>
        <Setting
          label={i18n.t("settingsScreen.item2")}
          iconName={Platform.OS === "android" ? "md-globe" : "ios-globe"}
          onPress={changeLanguageHandler}
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

export const screenOptions = (navData) => {
  return {
    headerTitle: i18n.t("settingsScreen.headerTitle"),
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          color="black"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default connectActionSheet(SettingsScreen);
