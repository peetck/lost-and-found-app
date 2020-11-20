import React from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Toast } from "popup-ui";
import i18n from "i18n-js";
import * as Updates from "expo-updates";

import colors from "./colors";
import { saveLanguageSetting } from "./storage";

export const changeLanguageActionSheetOptions = {
  options: ["English", "Thai", i18n.t("utils.cancel")],
  cancelButtonIndex: 2,
  icons: [
    <Ionicons name="md-arrow-forward" size={23} color="black" />,
    <Ionicons name="md-arrow-forward" size={23} color="black" />,
    <Ionicons name="md-backspace" size={23} color="black" />,
  ],
  title: i18n.t("utils.changeLanguageTitle"),
  titleTextStyle: {
    fontFamily: "kanit-light",
    fontSize: 20,
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
    <Ionicons name="md-camera" size={23} color="black" />,
    <Ionicons name="md-image" size={23} color="black" />,
    <Ionicons name="md-backspace" size={23} color="black" />,
  ],
  title: i18n.t("utils.takeImageTitle"),
  titleTextStyle: {
    fontFamily: "kanit-light",
    fontSize: 20,
  },
};

export const takeImage = async (index) => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant camera permissions to use this app.",
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
  icon = "md-checkmark-circle"
) => {
  showToast(
    title,
    text,
    colors.success,
    duration,
    <Ionicons name={icon} color="white" size={24} />
  );
};

export const showError = (text, duration = 2000, icon = "md-close-circle") => {
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
  Alert.alert("Information", "You have to restart the app to see the change.", [
    {
      text: "Restart",
      onPress: () => Updates.reloadAsync(),
    },
    { text: "Later" },
  ]);
};

export const getCurrentLanguage = () => {
  return i18n.currentLocale();
};
