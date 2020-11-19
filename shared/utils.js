import React from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Toast } from "popup-ui";
import i18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "./colors";

export const takeImageActionSheetOptions = {
  options: ["Take Picture", "Choose from gallery", "Cancel"],
  cancelButtonIndex: 2,
  icons: [
    <Ionicons name="md-camera" size={23} color="black" />,
    <Ionicons name="md-image" size={23} color="black" />,
    <Ionicons name="md-backspace" size={23} color="black" />,
  ],
  title: "Please select an option.",
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

export const getCurrentLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant location permissions to use this app.",
      [{ text: "Retry", onPress: getCurrentLocation }]
    );
    return;
  } else {
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      return {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again later.", [
        { text: "Okay" },
      ]);
    }
  }
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

export const showError = (
  title,
  text,
  duration = 2000,
  icon = "md-close-circle"
) => {
  showToast(
    title,
    text,
    colors.error,
    duration,
    <Ionicons name={icon} color="white" size={24} />
  );
};

export const getCurrentLanguage = () => {
  return i18n.currentLocale();
};

export const loadLanguageSetting = async () => {
  const language = await AsyncStorage.getItem("language");
  if (language !== null) {
    i18n.locale = language;
  } else {
    await saveLanguageSetting("en");
  }
};

export const saveLanguageSetting = async (language) => {
  await AsyncStorage.setItem("language", language);
  i18n.locale = language;
};
