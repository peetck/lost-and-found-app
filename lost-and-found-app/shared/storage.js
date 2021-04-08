import i18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const loadIdToken = async () => {
  const idToken = await AsyncStorage.getItem("idToken");
  return idToken;
};

export const saveIdToken = async (idToken) => {
  await AsyncStorage.setItem("idToken", idToken);
};

export const removeIdToken = async () => {
  await AsyncStorage.removeItem("idToken");
};

export const loadRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  return refreshToken;
}

export const saveRefreshToken = async (refreshToken) => {
  await AsyncStorage.setItem("refreshToken", refreshToken);
};

export const removeRefreshToken = async () => {
  await AsyncStorage.removeItem("refreshToken");
};
