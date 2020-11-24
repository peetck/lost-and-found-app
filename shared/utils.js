import React from "react";
import { Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Toast } from "popup-ui";
import i18n from "i18n-js";
import * as Updates from "expo-updates";

import colors from "./colors";
import { saveLanguageSetting } from "./storage";

export const changeLanguageActionSheetOptions = {
  options: ["English", "ภาษาไทย", i18n.t("utils.cancel")],
  cancelButtonIndex: 2,
  icons: [
    <Ionicons
      name={
        Platform.OS === "android" ? "md-arrow-forward" : "ios-arrow-forward"
      }
      size={23}
      color="black"
    />,
    <Ionicons
      name={
        Platform.OS === "android" ? "md-arrow-forward" : "ios-arrow-forward"
      }
      size={23}
      color="black"
    />,
    <Ionicons
      name={Platform.OS === "android" ? "md-backspace" : "ios-backspace"}
      size={23}
      color="black"
    />,
  ],
  title: i18n.t("utils.changeLanguageTitle"),
  titleTextStyle: {
    fontFamily: "kanit-light",
    fontSize: 20,
  },
  textStyle: {
    fontFamily: "kanit-light",
  },
};

export const takeImageActionSheetOptions = {
  options: [
    i18n.t("utils.takePicture"),
    i18n.t("utils.chooseFromGallery"),
    i18n.t("utils.cancel"),
  ],
  cancelButtonIndex: 2,
  icons: [
    <Ionicons
      name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
      size={23}
      color="black"
    />,
    <Ionicons
      name={Platform.OS === "android" ? "md-image" : "ios-image"}
      size={23}
      color="black"
    />,
    <Ionicons
      name={Platform.OS === "android" ? "md-backspace" : "ios-backspace"}
      size={23}
      color="black"
    />,
  ],
  title: i18n.t("utils.takeImageTitle"),
  titleTextStyle: {
    fontFamily: "kanit-light",
    fontSize: 20,
  },
  textStyle: {
    fontFamily: "kanit-light",
  },
};

export const takeImage = async (index) => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    Alert.alert(
      i18n.t("utils.permissionErrorTitle"),
      i18n.t("utils.permissionErrorMsg"),
      [{ text: "Okay" }]
    );
    return;
  }

  let image;

  switch (index) {
    case 0: // Take Picture
      image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      break;
    case 1: // Choose from gallery
      image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      break;
    case 2:
      return;
  }

  return image.uri;
};

const showToast = (title, text, color, duration, icon) => {
  Toast.show({
    title: title,
    text: text,
    color: color,
    timing: duration,
    icon: icon,
  });
};

export const showSuccess = (
  title,
  text,
  duration = 2000,
  icon = Platform.OS === "android"
    ? "md-checkmark-circle"
    : "ios-checkmark-circle"
) => {
  showToast(
    title,
    text,
    colors.success,
    duration,
    <Ionicons name={icon} color="white" size={24} />
  );
};

export const showError = (
  text,
  duration = 2000,
  icon = Platform.OS === "android" ? "md-close-circle" : "ios-close-circle"
) => {
  showToast(
    i18n.t("utils.error"),
    text,
    colors.error,
    duration,
    <Ionicons name={icon} color="white" size={24} />
  );
};

export const changeLanguage = async (index) => {
  await saveLanguageSetting(index === 0 ? "en" : "th");
  Alert.alert(i18n.t("utils.alertTitle"), i18n.t("utils.alertMsg"), [
    {
      text: i18n.t("utils.restart"),
      onPress: () => Updates.reloadAsync(),
    },
    { text: i18n.t("utils.later") },
  ]);
};

export const getCurrentLanguage = () => {
  return i18n.currentLocale();
};
